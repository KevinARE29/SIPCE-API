import { EntityRepository, Repository } from 'typeorm';
import { Grade } from '@academics/entities/grade.entity';
import { NotFoundException } from '@nestjs/common';
import { PageDto } from '@core/dtos/page.dto';
import { GradeFilterDto, sortOptionsMap } from '@academics/dtos/grade-filter.dto';
import { getOrderBy } from '@core/utils/sort.util';

@EntityRepository(Grade)
export class GradeRepository extends Repository<Grade> {
  getAllGrades(pageDto: PageDto, gradeFilterDto: GradeFilterDto): Promise<[Grade[], number]> {
    const { page, perPage } = pageDto;
    const { sort, name, active } = gradeFilterDto;
    const query = this.createQueryBuilder('grade')
      .take(perPage)
      .skip((page - 1) * perPage);

    if (sort) {
      const order = getOrderBy(sort, sortOptionsMap);
      query.orderBy(order);
    } else {
      query.orderBy({ 'grade.id': 'DESC' });
    }

    if (name) {
      query.andWhere(`grade."name" ILIKE '%${name}%'`);
    }

    if (active) {
      query.andWhere(`grade.active is ${active}`);
    }

    return query.getManyAndCount();
  }

  async getGradeByIdOrThrow(gradeId: number): Promise<Grade> {
    const grade = await this.findOne(gradeId);
    if (!grade) {
      throw new NotFoundException('Grado no encontrado');
    }
    return grade;
  }
}
