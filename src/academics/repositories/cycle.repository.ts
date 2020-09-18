import { EntityRepository, Repository, IsNull } from 'typeorm';
import { Cycle } from '@academics/entities/cycle.entity';
import { NotFoundException } from '@nestjs/common';
import { PageDto } from '@core/dtos/page.dto';
import { CycleFilterDto, sortOptionsMap } from '@academics/dtos/cycle-filter.dto';
import { getOrderBy } from '@core/utils/sort.util';

@EntityRepository(Cycle)
export class CycleRepository extends Repository<Cycle> {
  getAllCycles(pageDto: PageDto, cycleFilterDto: CycleFilterDto): Promise<[Cycle[], number]> {
    const { page, perPage } = pageDto;
    const { sort, name } = cycleFilterDto;
    const query = this.createQueryBuilder('cycle')
      .andWhere('cycle.deletedAt is null')
      .take(perPage)
      .skip((page - 1) * perPage);

    if (sort) {
      const order = getOrderBy(sort, sortOptionsMap);
      query.orderBy(order);
    } else {
      query.orderBy({ 'cycle.id': 'DESC' });
    }

    if (name) {
      query.andWhere(`cycle."name" ILIKE '%${name}%'`);
    }

    return query.getManyAndCount();
  }

  async getCycleByIdOrThrow(cycleId: number): Promise<Cycle> {
    const cycle = await this.findOne(cycleId);
    if (!cycle) {
      throw new NotFoundException('Ciclo no encontrado');
    }
    return cycle;
  }

  getCycleByName(name: string): Promise<Cycle | undefined> {
    return this.createQueryBuilder('cycle')
      .where('LOWER(cycle.name) = LOWER(:name)', { name })
      .andWhere('cycle.deletedAt is null')
      .getOne();
  }

  findById(id: number): Promise<Cycle | undefined> {
    return this.findOne({
      where: {
        id,
        deletedAt: IsNull(),
      },
    });
  }
}
