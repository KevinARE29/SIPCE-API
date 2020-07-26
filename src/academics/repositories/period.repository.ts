import { EntityRepository, Repository } from 'typeorm';
import { Period } from '@academics/entities/period.entity';
import { NotFoundException } from '@nestjs/common';
import { PageDto } from '@core/dtos/page.dto';
import { PeriodFilterDto, sortOptionsMap } from '@academics/dtos/period-filter.dto';
import { getOrderBy } from '@core/utils/sort.util';

@EntityRepository(Period)
export class PeriodRepository extends Repository<Period> {
  getAllPeriods(pageDto: PageDto, periodFilterDto: PeriodFilterDto): Promise<[Period[], number]> {
    const { page, perPage } = pageDto;
    const { sort, name, active } = periodFilterDto;
    const query = this.createQueryBuilder('period')
      .take(perPage)
      .skip((page - 1) * perPage);

    if (sort) {
      const order = getOrderBy(sort, sortOptionsMap);
      query.orderBy(order);
    } else {
      query.orderBy({ 'period.id': 'ASC' });
    }

    if (name) {
      query.andWhere(`period."name" ILIKE '%${name}%'`);
    }

    if (active) {
      query.andWhere(`period.active is ${active}`);
    }

    return query.getManyAndCount();
  }

  async getPeriodByIdOrThrow(periodId: number): Promise<Period> {
    const period = await this.findOne(periodId);
    if (!period) {
      throw new NotFoundException('Periodo no encontrado');
    }
    return period;
  }
}
