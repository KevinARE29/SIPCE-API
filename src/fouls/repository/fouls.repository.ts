import { EntityRepository, Repository } from 'typeorm';
import { Foul } from '@fouls/entities/fouls.entity';
import { NotFoundException } from '@nestjs/common';
import { FoulsFilterDto, sortOptionsMap } from '@fouls/dtos/fouls-filter.dto';
import { PageDto } from '@core/dtos/page.dto';
import { EnumFoulsType } from '@fouls/constants/fouls.constants';
@EntityRepository(Foul)
export class FoulsRepository extends Repository<Foul> {
  async findByIdOrThrow(id: number): Promise<Foul> {
    const foul = await this.findOne(id);
    if (!foul) {
      throw new NotFoundException(`Falta con id ${id} no encontrada`);
    }
    return foul;
  }

  getAllFouls(pageDto: PageDto, foulsFilterDto: FoulsFilterDto): Promise<[Foul[], number]> {
    const { page, perPage } = pageDto;
    const { sort, paginate, foulsType } = foulsFilterDto;
    const query = this.createQueryBuilder('fouls').andWhere('fouls.deletedAt is null');
    if (foulsType) {
      query.andWhere(`fouls.foulsType = '${EnumFoulsType[foulsType]}'`);
    }
    if (paginate === 'false') {
      query.orderBy({ 'fouls.id': 'ASC' });
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
      query.orderBy({ 'fouls.id': 'DESC' });
    }
    return query.getManyAndCount();
  }
}
