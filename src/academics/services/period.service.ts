import { Injectable, ConflictException } from '@nestjs/common';
import { PageDto } from '@core/dtos/page.dto';
import { getPagination } from '@core/utils/pagination.util';
import { PeriodRepository } from '@academics/repositories/period.repository';
import { PeriodFilterDto } from '@academics/dtos/period-filter.dto';
import { PeriodsResponse } from '@academics/docs/periods-response.doc';
import { Periods } from '@academics/docs/periods.doc';
import { plainToClass } from 'class-transformer';
import { isInReadOnlyPeriods } from '@academics/utils/period.utils';

@Injectable()
export class PeriodService {
  constructor(private readonly periodRepository: PeriodRepository) {}

  async getAllPeriods(pageDto: PageDto, periodFilterDto: PeriodFilterDto): Promise<PeriodsResponse> {
    const [periods, count] = await this.periodRepository.getAllPeriods(pageDto, periodFilterDto);
    const pagination = getPagination(pageDto, count);
    return { data: plainToClass(Periods, periods, { excludeExtraneousValues: true }), pagination };
  }

  async deletePeriod(periodId: number): Promise<void> {
    if (isInReadOnlyPeriods(periodId)) {
      throw new ConflictException('Periodo de solo lectura');
    }
    const period = await this.periodRepository.getPeriodByIdOrThrow(periodId);
    period.active = !period.active;
    await this.periodRepository.save(period);
  }
}
