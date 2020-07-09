import { EntityRepository, Repository } from 'typeorm';
import { Section } from '@academics/entities/section.entity';
import { PageDto } from '@core/dtos/page.dto';
import { SectionFilterDto, sortOptionsMap } from '@academics/dtos/section-filter.dto';

@EntityRepository(Section)
export class SectionRepository extends Repository<Section> {
  getAllSections(pageDto: PageDto, sectionFilterDto: SectionFilterDto): Promise<[Section[], number]> {
    const { page, perPage } = pageDto;
    const { sort, name } = sectionFilterDto;
    const query = this.createQueryBuilder('section')
      .select(['section'])
      .take(perPage)
      .skip((page - 1) * perPage);

    if (sort) {
      const order = sort.split(',').reduce((acum, sortItem) => {
        const orderOption = sortOptionsMap.get(sortItem);
        return { ...acum, ...orderOption };
      }, {});
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
