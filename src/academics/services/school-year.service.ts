/* eslint-disable no-multi-assign */
/* eslint-disable no-param-reassign */
import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SchoolYearRepository } from '@academics/repositories/school-year.repository';
import { SchoolYear } from '@academics/docs/school-year.doc';
import { ESchoolYearStatus } from '@academics/constants/academic.constants';
import { CycleDetail } from '@academics/docs/cycle-detail.doc';

@Injectable()
export class SchoolYearService {
  constructor(private readonly schoolYearRepository: SchoolYearRepository) {}

  async getCurrentAssignation(): Promise<SchoolYear> {
    const currentAssignation = await this.schoolYearRepository.getCurrentAssignation({});
    if (!currentAssignation) {
      throw new NotFoundException('No se encontró año escolar activo');
    }

    const mappedCycleDetails = currentAssignation.cycleDetails.reduce((result, item) => {
      if (result[item.shift.id]) {
        result[item.shift.id].push(
          plainToClass(CycleDetail, item, {
            excludeExtraneousValues: true,
          }),
        );
      } else {
        result[item.shift.id] = [
          plainToClass(CycleDetail, item, {
            excludeExtraneousValues: true,
          }),
        ];
      }
      return result;
    }, {} as any);

    const mappedAssignation = {
      id: currentAssignation.id,
      year: currentAssignation.year,
      status: ESchoolYearStatus[currentAssignation.status],
      cycleDetails: mappedCycleDetails,
      startDate: currentAssignation.startDate,
      endDate: currentAssignation.endDate,
      closeDate: currentAssignation.closeDate,
    };

    return mappedAssignation;
  }
}
