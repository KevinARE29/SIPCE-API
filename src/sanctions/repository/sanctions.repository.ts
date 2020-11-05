import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { PageDto } from '@core/dtos/page.dto';
import { Sanction } from '@sanctions/entities/sanctions.entity';
import { SanctionsFilterDto, sortOptionsMap } from '@sanctions/dtos/sanctions-filter.dto';
@EntityRepository(Sanction)
export class SanctionsRepository extends Repository<Sanction> {
  getAllSanctions(pageDto: PageDto, sanctionsFilterDto: SanctionsFilterDto): Promise<[Sanction[], number]> {
    const { page, perPage } = pageDto;
    const { sort, paginate, name } = sanctionsFilterDto;
    const query = this.createQueryBuilder('sanction').andWhere('sanction.deletedAt is null');

    if (name) {
      query.andWhere(`sanction."name" ILIKE '%${name}%'`);
    }

    if (paginate === 'false') {
      query.orderBy({ 'sanction.name': 'ASC' });
      return query.getManyAndCount();
    }
    query.take(perPage);
    query.skip((page - 1) * perPage);
    if (sort) {
      const order = sort.split(',').reduce((acum, sortItem) => {
        const orderOption = sortOptionsMap.get(sortItem);
        return { ...acum, ...orderOption };
      }, {});
      query.orderBy(order);
    } else {
      query.orderBy({ 'sanction.id': 'DESC' });
    }
    return query.getManyAndCount();
  }

  async findByIdOrThrow(id: number): Promise<Sanction> {
    const sanction = await this.findOne(id);
    if (!sanction) {
      throw new NotFoundException(`Sanción con id ${id} no encontrada`);
    }
    return sanction;
  }

  getSanctionByName(name: string): Promise<Sanction | undefined> {
    return this.createQueryBuilder('sanction')
      .where('LOWER(sanction.name) = LOWER(:name)', { name })
      .getOne();
  }
}
