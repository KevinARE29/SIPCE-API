import { EntityRepository, Repository, IsNull } from 'typeorm';
import { Section } from '@academics/entities/section.entity';
import { PageDto } from '@core/dtos/page.dto';
import { SectionFilterDto, sortOptionsMap } from '@academics/dtos/section-filter.dto';
import { getOrderBy } from '@core/utils/sort.util';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Section)
export class SectionRepository extends Repository<Section> {
  getAllSections(pageDto: PageDto, sectionFilterDto: SectionFilterDto): Promise<[Section[], number]> {
    const { page, perPage } = pageDto;
    const { sort, name, paginate } = sectionFilterDto;
    const query = this.createQueryBuilder('section').andWhere('section.deletedAt is null');

    if (paginate === 'false') {
      query.orderBy({ name: 'ASC' });
      return query.getManyAndCount();
    }

    query.take(perPage);
    query.skip((page - 1) * perPage);

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

  async getSectionByIdOrThrow(sectionId: number): Promise<Section> {
    const section = await this.findOne(sectionId, { where: { deletedAt: IsNull() } });
    if (!section) {
      throw new NotFoundException('Sección no encontrada');
    }
    return section;
  }

  getSectionByName(name: string): Promise<Section | undefined> {
    return this.createQueryBuilder('section')
      .where('LOWER(section.name) = LOWER(:name)', { name })
      .andWhere('section.deletedAt is null')
      .getOne();
  }
}
