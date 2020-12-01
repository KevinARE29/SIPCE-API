import { EntityRepository, Repository } from 'typeorm';
import { Foul } from '@fouls/entities/fouls.entity';
import { NotFoundException } from '@nestjs/common';
import { FoulsFilterDto, sortOptionsMap } from '@fouls/dtos/fouls-filter.dto';
import { PageDto } from '@core/dtos/page.dto';
import { EnumFoulsType } from '@fouls/constants/fouls.constants';
import { getOrderBy } from '@core/utils/sort.util';
@EntityRepository(Foul)
export class FoulsRepository extends Repository<Foul> {
  async findByIdOrThrow(id: number): Promise<Foul> {
    const foul = await this.findOne(id, { where: { deletedAt: null } });
    if (!foul) {
      throw new NotFoundException(`Falta con id ${id} no encontrada`);
    }
    return foul;
  }

  getAllFouls(pageDto: PageDto, foulsFilterDto: FoulsFilterDto): Promise<[Foul[], number]> {
    const { page, perPage } = pageDto;
    const { sort, paginate, foulsType, numeral } = foulsFilterDto;
    const query = this.createQueryBuilder('fouls').andWhere('fouls.deletedAt is null');
    if (foulsType) {
      query.andWhere(`fouls.foulsType = '${EnumFoulsType[foulsType]}'`);
    }

    if (numeral) {
      query.andWhere(`fouls."numeral" ILIKE '%${numeral}%'`);
    }
    if (paginate === 'false') {
      query.orderBy({ 'fouls.id': 'ASC' });
      return query.getManyAndCount();
    }
    query.take(perPage);
    query.skip((page - 1) * perPage);
    if (sort) {
      const order = getOrderBy(sort, sortOptionsMap);
      query.orderBy(order);
    } else {
      query.orderBy({ 'fouls.id': 'DESC' });
    }
    return query.getManyAndCount();
  }

  getFoulsByNumeral(numeral: string): Promise<Foul | undefined> {
    return this.createQueryBuilder('fouls')
      .where('LOWER(fouls.numeral) = LOWER(:numeral)', { numeral })
      .getOne();
  }
}
