import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { SchoolYearRepository } from '@academics/repositories/school-year.repository';
import { SchoolYear } from '@academics/docs/school-year.doc';
import { ESchoolYearStatus, activeSchoolYearStatus } from '@academics/constants/academic.constants';
import { In, Connection } from 'typeorm';
import { UpdateSchoolYearStatusDto } from '@academics/dtos/school-year/update-school-year-status.dto';
import { plainToClass } from 'class-transformer';
import { EStudentStatus, nextYearStatuses } from '@students/constants/student.constant';
import { CycleDetail } from '@academics/docs/cycle-detail.doc';
import { SchoolYearService } from './school-year.service';

@Injectable()
export class CloseSchoolYearService {
  constructor(
    private readonly schoolYearRepository: SchoolYearRepository,
    private readonly schoolYearService: SchoolYearService,
    private connection: Connection,
  ) {}

  async updateSchoolYearStatus(updateSchoolYearStatusDto: UpdateSchoolYearStatusDto): Promise<SchoolYear> {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const activeYear = await this.schoolYearRepository.findOne({ where: { status: In(activeSchoolYearStatus) } });
      if (!activeYear) {
        throw new UnprocessableEntityException(
          'Año escolar no activo. Por favor asegúrese de aperturar un año escolar nuevo antes de tratar de actualizarlo',
        );
      }

      if (updateSchoolYearStatusDto.status === 'En curso') {
        const upgradeApprovedStudentsQuery =
          `UPDATE "student" SET "current_grade_id" = "current_grade_id" + 1 ` +
          `WHERE "status" = '${EStudentStatus.Aprobado}';`;
        await queryRunner.query(upgradeApprovedStudentsQuery);

        const updateStudentStatusQuery =
          `UPDATE "student" SET "status" = '${EStudentStatus['Cursando Año Escolar']}', ` +
          `"updated_at" = CURRENT_TIMESTAMP ` +
          `WHERE "status" IN (${nextYearStatuses});`;
        await queryRunner.query(updateStudentStatusQuery);
      }

      if (updateSchoolYearStatusDto.status === 'Histórico') {
        const { finishedYear } = await this.getCloseSchoolYearStatus();
        if (!finishedYear) {
          throw new UnprocessableEntityException(
            'Por favor asegúrese de cerrar los grados de todos los turnos antes de cerrar el año escolar completo',
          );
        }
      }

      const updatedSchoolYear = await this.schoolYearRepository.save({
        ...activeYear,
        status: ESchoolYearStatus[updateSchoolYearStatusDto.status],
      });

      await queryRunner.commitTransaction();
      await queryRunner.release();
      return plainToClass(
        SchoolYear,
        { ...updatedSchoolYear, status: ESchoolYearStatus[updatedSchoolYear.status] },
        { excludeExtraneousValues: true },
      );
    } catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw err;
    }
  }

  async getCloseSchoolYearStatus(): Promise<any> {
    const { currentAssignation } = await this.schoolYearService.getCurrentAssignation();
    const shifts = Object.keys(currentAssignation.cycleDetails);
    const totalShifts = shifts.length;
    let closedShifts = 0;

    shifts.forEach(shiftId => {
      let totalGrades = 0;
      let closedGrades = 0;

      currentAssignation.cycleDetails[shiftId].forEach((cycleDetail: CycleDetail, indexCycle: string | number) => {
        totalGrades += cycleDetail.gradeDetails.length;

        cycleDetail.gradeDetails.forEach((gradeDetail, indexGrade) => {
          const totalSections = gradeDetail.sectionDetails.length;
          const closedSections = gradeDetail.sectionDetails.filter(sectionDetail => sectionDetail.closed).length;
          const gradePercentage = (closedSections / totalSections) * 100;
          const closedGrade = gradePercentage >= 100;

          if (closedGrade) closedGrades += 1;

          currentAssignation.cycleDetails[shiftId][indexCycle].gradeDetails[
            indexGrade
          ].gradePercentage = +gradePercentage.toFixed(2);
          currentAssignation.cycleDetails[shiftId][indexCycle].gradeDetails[indexGrade].closed = closedGrade;
        });
      });
      const shiftPercentage = totalGrades ? (closedGrades / totalGrades) * 100 : 0;
      const closedShift = shiftPercentage >= 100;

      if (closedShift) closedShifts += 1;

      currentAssignation.cycleDetails[shiftId] = {
        cyclesDetails: currentAssignation.cycleDetails[shiftId],
        shiftPercentage: +shiftPercentage.toFixed(2),
        closed: closedShift,
      };
    });

    const finishedYear = totalShifts === closedShifts;
    return { ...currentAssignation, finishedYear };
  }
}
