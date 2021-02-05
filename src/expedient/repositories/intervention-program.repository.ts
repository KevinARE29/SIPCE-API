import { EntityRepository, Repository } from 'typeorm';
import { InterventionProgram } from '@expedient/entities/intervention-program.entity';
import { InterventionProgramFilterDto, sortOptionsMap } from '@expedient/dtos/intervention-program-filter.dto';
import { PageDto } from '@core/dtos/page.dto';
import { getOrderBy } from '@core/utils/sort.util';

@EntityRepository(InterventionProgram)
export class InterventionProgramRepository extends Repository<InterventionProgram> {
  findCounselorInterventionPrograms(
    counselorId: number,
    interventionProgramFilterDto: InterventionProgramFilterDto,
    pageDto: PageDto,
  ): Promise<[InterventionProgram[], number]> {
    const { name, status, sort, type } = interventionProgramFilterDto;
    const { page, perPage } = pageDto;
    const query = this.createQueryBuilder('intervention_program')
      .leftJoin('intervention_program.counselor', 'counselor')
      .andWhere(`"counselor"."id" = ${counselorId}`)
      .andWhere('intervention_program.deletedAt is null')
      .take(perPage)
      .skip((page - 1) * perPage);

    if (sort) {
      const order = getOrderBy(sort, sortOptionsMap);
      query.orderBy(order);
    } else {
      query.orderBy({ 'intervention_program.id': 'DESC' });
    }

    if (type) {
      query.andWhere(`intervention_program.type = '${type}'`);
    }

    if (name) {
      query.andWhere(`intervention_program.name LIKE '%${name}%'`);
    }

    if (status) {
      query.andWhere(`intervention_program.status = '${status}'`);
    }

    return query.getManyAndCount();
  }
}
