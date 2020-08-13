/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import { Injectable, NotFoundException, UnprocessableEntityException, BadRequestException } from '@nestjs/common';
import { SchoolYearRepository } from '@academics/repositories/school-year.repository';
import { SchoolYear } from '@academics/docs/school-year.doc';
import { ESchoolYearStatus, activeSchoolYearStatus } from '@academics/constants/academic.constants';
import { StartSchoolYearDto } from '@academics/dtos/school-year/start-school-year.dto';
import { In } from 'typeorm';
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
    const currentAssignation = await this.schoolYearRepository.getCurrentAssignation({});
    if (!currentAssignation) {
      throw new NotFoundException('No se encontró año escolar activo');
    }

    const previousAssignation =
      currentAssignation.status === 1
        ? await this.schoolYearRepository.getCurrentAssignation({ status: 'Histórico' })
        : undefined;

    const mappedCurrentCycleDetails = currentAssignation.cycleDetails.reduce(mapCycleDetails, {} as any);
    const mappedPreviousCycleDetails = previousAssignation
      ? previousAssignation.cycleDetails.reduce(mapCycleDetails, {} as any)
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

  async assignAcademicCatalogues(
    assignAcademicCataloguesDto: AssignAcademicCataloguesDto,
  ): Promise<SchoolYearResponse> {
    const currentAssignation = await this.schoolYearRepository.getCurrentAssignation({
      status: 'En proceso de apertura',
    });
    if (!currentAssignation) {
      throw new NotFoundException('No se encontró año escolar activo');
    }

    for (const [shiftIndex, shiftAssignation] of assignAcademicCataloguesDto.shifts.entries()) {
      const shift = await this.shiftRepository.findById(shiftAssignation.shiftId);
      if (!shift) {
        throw new BadRequestException(`${shiftIndex}.shiftId: El turno seleccionado no existe o no está activo`);
      }
      const cycleIds = shiftAssignation.cycles.map(cycle => cycle.cycleId);
      const cycles = await this.cycleRepository.findByIds(cycleIds);
      const cycleDetails = await this.cycleDetailRepository.findOrCreateCycleDetails(
        currentAssignation,
        shift,
        cycleIds,
      );

      for (const [cycleIndex, cycleAssignation] of shiftAssignation.cycles.entries()) {
        const cycle = cycles.filter(c => c.id === cycleAssignation.cycleId);
        if (!cycle) {
          throw new BadRequestException(`${shiftIndex}.${cycleIndex}.cycleId: El ciclo seleccionado no existe`);
        }
        const cycleDetail = cycleDetails.find(cDetail => cDetail.cycle.id === cycleAssignation.cycleId);
        const gradeIds = cycleAssignation.grades.map(grade => grade.gradeId);
        const grades = await this.gradeRepository.findByIds(gradeIds);
        const gradeDetails = await this.gradeDetailRepository.findOrCreateGradeDetails(
          cycleDetails,
          cycleDetail,
          gradeIds,
        );

        for (const [gradeIndex, gradeAssignation] of cycleAssignation.grades.entries()) {
          const grade = grades.filter(g => g.id === gradeAssignation.gradeId);
          if (!grade) {
            throw new BadRequestException(
              `${shiftIndex}.${cycleIndex}.${gradeIndex}.gradeId: El grado seleccionado no existe`,
            );
          }
          const gradeDetail = gradeDetails.find(gDetail => gDetail.grade.id === gradeAssignation.gradeId);
          const sectionDetails = await this.sectionDetailRepository.findOrCreateSectionDetails(
            gradeDetails,
            gradeDetail,
            gradeAssignation.sections,
          );
        }
      }
    }

    return { currentAssignation };
  }
}
