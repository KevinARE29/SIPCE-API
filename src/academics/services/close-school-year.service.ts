import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { SchoolYearRepository } from '@academics/repositories/school-year.repository';
import { SchoolYear } from '@academics/docs/school-year.doc';
import { ESchoolYearStatus, activeSchoolYearStatus } from '@academics/constants/academic.constants';
import { In } from 'typeorm';
import { UpdateSchoolYearStatusDto } from '@academics/dtos/school-year/update-school-year-status.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CloseSchoolYearService {
  constructor(private readonly schoolYearRepository: SchoolYearRepository) {}

  async updateSchoolYearStatus(updateSchoolYearStatusDto: UpdateSchoolYearStatusDto): Promise<SchoolYear> {
    const activeYear = await this.schoolYearRepository.findOne({ where: { status: In(activeSchoolYearStatus) } });
    if (!activeYear) {
      throw new UnprocessableEntityException(
        'Año escolar no activo. Por favor asegúrese de aperturar un año escolar nuevo antes de tratar de actualizarlo',
      );
    }

    const updatedSchoolYear = await this.schoolYearRepository.save({
      ...activeYear,
      status: ESchoolYearStatus[updateSchoolYearStatusDto.status],
    });

    return plainToClass(
      SchoolYear,
      { ...updatedSchoolYear, status: ESchoolYearStatus[updatedSchoolYear.status] },
      { excludeExtraneousValues: true },
    );
  }
}
