import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SchoolYearRepository } from '@academics/repositories/school-year.repository';
import { SchoolYear } from '@academics/docs/school-year.doc';
import { ESchoolYearStatus } from '@academics/constants/academic.constants';

@Injectable()
export class SchoolYearService {
  constructor(private readonly schoolYearRepository: SchoolYearRepository) {}

  async getCurrentAssignation(): Promise<SchoolYear> {
    const currentAssignation = await this.schoolYearRepository.getCurrentAssignation({});
    if (!currentAssignation) {
      throw new NotFoundException('No se encontró año escolar activo');
    }

    return {
      ...plainToClass(SchoolYear, currentAssignation, {
        excludeExtraneousValues: true,
      }),
      status: ESchoolYearStatus[currentAssignation.status],
    };
  }
}
