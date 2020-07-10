import { EntityRepository, Repository } from 'typeorm';
import { Section } from '@academics/entities/section.entity';
import { PageDto } from '@core/dtos/page.dto';
import { SectionFilterDto, sortOptionsMap } from '@academics/dtos/section-filter.dto';
import { getOrderBy } from '@core/utils/sort.util';

@EntityRepository(Section)
export class SectionRepository extends Repository<Section> {
  getAllSections(pageDto: PageDto, sectionFilterDto: SectionFilterDto): Promise<[Section[], number]> {
    const { page, perPage } = pageDto;
    const { sort, name } = sectionFilterDto;
    const query = this.createQueryBuilder('section')
      .andWhere('section.deletedAt is null')
      .take(perPage)
      .skip((page - 1) * perPage);

    if (sort) {
      const order = getOrderBy(sort, sortOptionsMap);
      query.orderBy(order);
    } else {
      query.orderBy({ 'section.id': 'DESC' });
    }

    if (name) {
      query.andWhere(`section."name" ILIKE '%${name}%'`);
    }

    return query.getManyAndCount();
  }
}
