/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import { Injectable, NotFoundException, UnprocessableEntityException, BadRequestException } from '@nestjs/common';
import { SchoolYearRepository } from '@academics/repositories/school-year.repository';
import { SchoolYear } from '@academics/docs/school-year.doc';
import { ESchoolYearStatus, activeSchoolYearStatus } from '@academics/constants/academic.constants';
import { StartSchoolYearDto } from '@academics/dtos/school-year/start-school-year.dto';
import { In, Connection } from 'typeorm';
import { mapCycleDetails } from '@academics/utils/school-year.util';
import { SchoolYearResponse } from '@academics/docs/school-year-response.doc';
import { AssignAcademicCataloguesDto } from '@academics/dtos/school-year/assign-academic-catalogues.dto';
import { CycleDetailRepository } from '@academics/repositories/cycle-detail.repository';
import { ShiftRepository } from '@academics/repositories/shift.repository';
import { CycleRepository } from '@academics/repositories/cycle.repository';
import { GradeRepository } from '@academics/repositories/grade.repository';
import { GradeDetailRepository } from '@academics/repositories/grade-detail.repository';
import { SectionDetailRepository } from '@academics/repositories/section-detail.repository';
import { SectionRepository } from '@academics/repositories/section.repository';
import { GradeDetail } from '@academics/entities/grade-detail.entity';
import { CycleDetail } from '@academics/entities/cycle-detail.entity';
import { AssignCycleCoordinatorsDto } from '@academics/dtos/school-year/assign-cycle-coordinators.dto';
import { UserRepository } from '@users/repositories/users.repository';
import { AssignCounselorsDto } from '@academics/dtos/school-year/assign-counselors.dto';
import { AssignTeachersDto } from '@academics/dtos/school-year/assign-teachers.dto';

@Injectable()
export class SchoolYearService {
  constructor(
    private readonly schoolYearRepository: SchoolYearRepository,
    private readonly shiftRepository: ShiftRepository,
    private readonly cycleDetailRepository: CycleDetailRepository,
    private readonly cycleRepository: CycleRepository,
    private readonly gradeDetailRepository: GradeDetailRepository,
    private readonly gradeRepository: GradeRepository,
    private readonly sectionDetailRepository: SectionDetailRepository,
    private readonly sectionRepository: SectionRepository,
    private readonly userRepository: UserRepository,
    private connection: Connection,
  ) {}

  async startSchoolYear(startSchoolYearDto: StartSchoolYearDto): Promise<SchoolYear> {
    const activeYear = await this.schoolYearRepository.findOne({ where: { status: In(activeSchoolYearStatus) } });
    if (activeYear) {
      throw new UnprocessableEntityException(
        'Año escolar activo. Por favor asegúrese de cerrar el año escolar actual antes de aperturar uno nuevo',
      );
    }
    const startedSchoolYear = await this.schoolYearRepository.save(startSchoolYearDto);
    return {
      ...startedSchoolYear,
      status: ESchoolYearStatus[startedSchoolYear.status],
    };
  }

  async getCurrentAssignation(): Promise<SchoolYearResponse> {
    const currentAssignation = await this.schoolYearRepository.getCurrentAssignationOrThrow({});

    const previousAssignation =
      currentAssignation.status === 1
        ? await this.schoolYearRepository.getCurrentAssignation({ status: 'Histórico' })
        : undefined;

    const mappedCurrentCycleDetails = currentAssignation.cycleDetails.reduce(mapCycleDetails(), {} as any);
    const mappedPreviousCycleDetails = previousAssignation
      ? previousAssignation.cycleDetails.reduce(mapCycleDetails(), {} as any)
      : undefined;

    const mappedCurrentAssignation = {
      id: currentAssignation.id,
      year: currentAssignation.year,
      status: ESchoolYearStatus[currentAssignation.status],
      cycleDetails: mappedCurrentCycleDetails,
      startDate: currentAssignation.startDate,
      endDate: currentAssignation.endDate,
      closeDate: currentAssignation.closeDate,
    };

    const mappedPreviousAssignation = previousAssignation
      ? {
          id: previousAssignation.id,
          year: previousAssignation.year,
          status: ESchoolYearStatus[previousAssignation.status],
          cycleDetails: mappedPreviousCycleDetails,
          startDate: previousAssignation.startDate,
          endDate: previousAssignation.endDate,
          closeDate: previousAssignation.closeDate,
        }
      : undefined;

    return { currentAssignation: mappedCurrentAssignation, previousAssignation: mappedPreviousAssignation };
  }

  async assignAcademicCatalogues(assignAcademicCataloguesDto: AssignAcademicCataloguesDto): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const currentAssignation = await this.schoolYearRepository.getCurrentAssignation({
        status: 'En proceso de apertura',
      });
      if (!currentAssignation) {
        throw new NotFoundException('No se encontró año escolar en proceso de apertura');
      }

      const updatedCycleDetails: CycleDetail[] = [];
      for (const [shiftIndex, shiftAssignation] of assignAcademicCataloguesDto.shifts.entries()) {
        const shift = await this.shiftRepository.findById(shiftAssignation.shiftId);
        if (!shift) {
          throw new BadRequestException(`${shiftIndex}.shiftId: El turno seleccionado no existe o no está activo`);
        }
        const cycleIds = shiftAssignation.cycles.map(cycle => cycle.cycleId);
        const cycles = await this.cycleRepository.findByIds(cycleIds);
        if (cycleIds.length !== cycles.length) {
          throw new BadRequestException(`${shiftIndex}.cycles: Ciclos especificados no son válidos`);
        }
        const cycleDetails = shiftAssignation.cycles.length
          ? await this.cycleDetailRepository.findOrCreateCycleDetails(currentAssignation, shift, cycleIds)
          : [];

        if (!cycleDetails.length) {
          await this.cycleDetailRepository.delete({ schoolYear: currentAssignation, shift });
        }

        for (const [cycleIndex, cycleAssignation] of shiftAssignation.cycles.entries()) {
          const cycleDetail = cycleDetails.find(cDetail => cDetail.cycle.id === cycleAssignation.cycleId);
          if (!cycleDetail) {
            throw new UnprocessableEntityException('Error al asignar los detalles de ciclo');
          }
          const gradeIds = cycleAssignation.grades.map(grade => grade.gradeId);
          const grades = await this.gradeRepository.findByIds(gradeIds);
          if (gradeIds.length !== grades.length) {
            throw new BadRequestException(
              `${shiftIndex}.cycles.${cycleIndex}.grades: Grados especificados no son válidos`,
            );
          }
          const gradeDetails = cycleAssignation.grades.length
            ? await this.gradeDetailRepository.findOrCreateGradeDetails(cycleDetails, cycleDetail, gradeIds)
            : [];

          const updatedGradeDetails: GradeDetail[] = [];
          for (const [gradeIndex, gradeAssignation] of cycleAssignation.grades.entries()) {
            const gradeDetail = gradeDetails.find(gDetail => gDetail.grade.id === gradeAssignation.gradeId);
            if (!gradeDetail) {
              throw new UnprocessableEntityException('Error al asignar los detalles de grado');
            }
            const sections = await this.sectionRepository.findByIds(gradeAssignation.sections);
            if (gradeAssignation.sections.length !== sections.length) {
              throw new BadRequestException(
                `${shiftIndex}.cycles.${cycleIndex}.grades.${gradeIndex}.sections: Secciones especificadas no son válidas`,
              );
            }
            const sectionDetails = gradeAssignation.sections.length
              ? await this.sectionDetailRepository.findOrCreateSectionDetails(gradeDetail, gradeAssignation.sections)
              : [];
            gradeDetail.sectionDetails = sectionDetails;
            updatedGradeDetails.push({ ...gradeDetail, cycleDetail: { id: cycleDetail.id } as CycleDetail });
          }
          cycleDetail.gradeDetails = updatedGradeDetails;
          await this.gradeDetailRepository.save(updatedGradeDetails);
          if (gradeDetails.length) {
            updatedCycleDetails.push(cycleDetail);
          } else {
            await this.cycleDetailRepository.remove(cycleDetail);
          }
        }
      }
      await this.cycleDetailRepository.save(updatedCycleDetails);
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw err;
    }
  }

  async assignCycleCoordinators(assignCycleCoordinatorsDto: AssignCycleCoordinatorsDto): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const currentAssignation = await this.schoolYearRepository.getCurrentAssignation({});
      if (!currentAssignation) {
        throw new NotFoundException('No se encontró año escolar en proceso de apertura');
      }

      const updatedCycleDetails: CycleDetail[] = [];
      for (const [shiftIndex, shiftAssignation] of assignCycleCoordinatorsDto.shifts.entries()) {
        const shift = await this.shiftRepository.findById(shiftAssignation.shiftId);
        if (!shift) {
          throw new BadRequestException(`${shiftIndex}.shiftId: El turno seleccionado no existe o no está activo`);
        }

        const cycleIds = shiftAssignation.cycles.map(cycle => cycle.cycleId);
        const cycles = await this.cycleRepository.findByIds(cycleIds);
        if (cycleIds.length !== cycles.length) {
          throw new BadRequestException(`${shiftIndex}.cycles: Ciclos especificados no son válidos`);
        }
        const cycleDetails = await this.cycleDetailRepository.findOrCreateCycleDetails(
          currentAssignation,
          shift,
          cycleIds,
        );

        for (const [cycleIndex, cycleAssignation] of shiftAssignation.cycles.entries()) {
          const cycleDetail = cycleDetails.find(cDetail => cDetail.cycle.id === cycleAssignation.cycleId);
          if (!cycleDetail) {
            throw new UnprocessableEntityException('Error al asignar los detalles de ciclo');
          }

          const cycleCoordinator = await this.userRepository.findOne(cycleAssignation.cycleCoordinatorId, {
            relations: ['roles'],
          });

          if (!cycleCoordinator || !cycleCoordinator.roles.find(role => role.name === 'Coordinador de Ciclo')) {
            throw new BadRequestException(
              `${shiftIndex}.${cycleIndex}.cycleCoordinatorId: Coordinador de ciclo especificado no válido. Asegúrese que el usuario cuente con el rol 'Coordinador de Ciclo'`,
            );
          }
          cycleDetail.cycleCoordinator = cycleCoordinator;
          updatedCycleDetails.push(cycleDetail);
        }
      }

      await this.cycleDetailRepository.save(updatedCycleDetails);
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw err;
    }
  }

  async assignCounselors(assignCounselorsDto: AssignCounselorsDto): Promise<void> {
    const currentAssignation = await this.schoolYearRepository.getCurrentAssignation({});
    if (!currentAssignation) {
      throw new NotFoundException('No se encontró año escolar en proceso de apertura');
    }

    for (const [shiftIndex, shiftAssignation] of assignCounselorsDto.shifts.entries()) {
      const shift = await this.shiftRepository.findById(shiftAssignation.shiftId);
      if (!shift) {
        throw new BadRequestException(`${shiftIndex}.shiftId: El turno seleccionado no existe o no está activo`);
      }

      for (const [counselorIndex, counselorAssignation] of shiftAssignation.counselors.entries()) {
        const { counselorId, gradeIds } = counselorAssignation;
        const counselor = await this.userRepository.findOne(counselorId, {
          relations: ['roles'],
        });
        if (!counselor || !counselor.roles.find(role => role.name === 'Orientador')) {
          throw new BadRequestException(
            `${shiftIndex}.counselors.${counselorIndex}.counselorId: Orientador especificado no válido. Asegúrese que el usuario cuente con el rol 'Orientador'`,
          );
        }

        const gradeDetails = await this.gradeDetailRepository.findByGradeIds(shift.id, gradeIds);
        if (gradeIds.length !== gradeDetails.length) {
          throw new BadRequestException(
            `${shiftIndex}.counselors.${counselorIndex}.gradeIds: Grados especificados no son válidos`,
          );
        }
        await this.gradeDetailRepository.save(gradeDetails.map(gDetail => ({ ...gDetail, counselor })));
      }
    }
  }

  async assignTeachers(assignTeachersDto: AssignTeachersDto): Promise<void> {
    const currentAssignation = await this.schoolYearRepository.getCurrentAssignation({});
    if (!currentAssignation) {
      throw new NotFoundException('No se encontró año escolar en proceso de apertura');
    }

    for (const [shiftIndex, shiftAssignation] of assignTeachersDto.shifts.entries()) {
      const shift = await this.shiftRepository.findById(shiftAssignation.shiftId);
      if (!shift) {
        throw new BadRequestException(`${shiftIndex}.shiftId: El turno seleccionado no existe o no está activo`);
      }

      for (const [gradeIndex, gradeAssignation] of shiftAssignation.grades.entries()) {
        const { sections, gradeId } = gradeAssignation;
        const grade = await this.gradeRepository.findOne(gradeId);
        if (!grade || !grade.active) {
          throw new BadRequestException(
            `${shiftIndex}.grades.${gradeIndex}.gradeId: El grado seleccionado no existe o no está activo`,
          );
        }

        for (const [sectionIndex, sectionAssignation] of sections.entries()) {
          const { teacherId, sectionId } = sectionAssignation;
          const teacher = await this.userRepository.findOne(teacherId, {
            relations: ['roles'],
          });
          if (!teacher || !teacher.roles.find(role => role.name === 'Docente')) {
            throw new BadRequestException(
              `${shiftIndex}.grades.${gradeIndex}.sections.${sectionIndex}.teacherId: Docente especificado no válido. Asegúrese que el usuario cuente con el rol 'Docente'`,
            );
          }

          const sectionDetail = await this.sectionDetailRepository.findSectionDetail(shift.id, gradeId, sectionId);
          if (!sectionDetail) {
            throw new BadRequestException(
              `${shiftIndex}.grades.${gradeIndex}.sections.${sectionIndex}.sectionId: Error al asignar sección`,
            );
          }
          await this.sectionDetailRepository.save({ ...sectionDetail, teacher });
        }
      }
    }
  }
}
