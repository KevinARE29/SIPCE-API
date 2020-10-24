import { EntityRepository, Repository } from 'typeorm';
import { Fouls } from '@fouls/entities/fouls.entity';
import { NotFoundException } from '@nestjs/common';
import { FoulsFilterDto, sortOptionsMap } from '@fouls/dtos/fouls-filter.dto';
import { PageDto } from '@core/dtos/page.dto';
import { EnumFoulsType } from '@fouls/constants/fouls.costants';


@EntityRepository(Fouls)
export class FoulsRepository extends Repository<Fouls> {
  
  
  async findByIdOrThrow(id: number): Promise<Fouls> {
    const foul = await this.findOne(id);
    if (!foul) {
      throw new NotFoundException(`Fouls with id ${id} not found`);
    }
    return foul;
  }


  getAllFouls(pageDto: PageDto, foulsFilterDto: FoulsFilterDto): Promise<[Fouls[], number]> {
    const { page, perPage } = pageDto;
    const { sort, foulsType  } = foulsFilterDto;
    const query = this.createQueryBuilder('fouls')
      .take(perPage)
      .skip((page - 1) * perPage);

    if (sort) {
      const order = sort.split(',').reduce((acum, sortItem) => {
        const orderOption = sortOptionsMap.get(sortItem);
        return { ...acum, ...orderOption };
      }, {});
      query.orderBy(order);
    } else {
      query.orderBy({ 'fouls.id': 'DESC' });
    }
    if (foulsType) {
      query.andWhere(`"fouls"."fouls_type" = '${EnumFoulsType[foulsType]}'`);
    } 
    return query.getManyAndCount();
  }
  
}
