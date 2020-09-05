import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { SchoolYearRepository } from '@academics/repositories/school-year.repository';
import { SchoolYear } from '@academics/docs/school-year.doc';
import { ESchoolYearStatus, activeSchoolYearStatus } from '@academics/constants/academic.constants';
import { In, Connection } from 'typeorm';
import { UpdateSchoolYearStatusDto } from '@academics/dtos/school-year/update-school-year-status.dto';
import { plainToClass } from 'class-transformer';
import { StudentRepository } from '@students/repositories/student.repository';
import { EStudentStatus, nextYearStatuses } from '@students/constants/student.constant';

@Injectable()
export class CloseSchoolYearService {
  constructor(
    private readonly schoolYearRepository: SchoolYearRepository,
    private readonly studentRepository: StudentRepository,
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
        const query =
          `UPDATE "student" SET "status" = '${EStudentStatus['Cursando Año Escolar']}', ` +
          `"current_grade_id" = "current_grade_id" + 1, "updated_at" = CURRENT_TIMESTAMP ` +
          `WHERE "status" IN (${nextYearStatuses})`;
        await this.studentRepository.query(query);
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
}
