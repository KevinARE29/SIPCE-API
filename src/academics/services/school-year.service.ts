import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { SchoolYearRepository } from '@academics/repositories/school-year.repository';
import { SchoolYear } from '@academics/docs/school-year.doc';
import { ESchoolYearStatus, activeSchoolYearStatus } from '@academics/constants/academic.constants';
import { StartSchoolYearDto } from '@academics/dtos/start-school-year.dto';
import { In } from 'typeorm';
import { mapCycleDetails } from '@academics/utils/school-year.util';
import { SchoolYearResponse } from '@academics/docs/school-year-response.doc';

@Injectable()
export class SchoolYearService {
  constructor(private readonly schoolYearRepository: SchoolYearRepository) {}

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
}
