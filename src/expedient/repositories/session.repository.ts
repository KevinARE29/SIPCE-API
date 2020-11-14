import { EntityRepository, Repository } from 'typeorm';
import { Session } from '@expedient/entities/session.entity';
import { SessionsFilterDto, sortOptionsMap } from '@expedient/dtos/sessions-filter.dto';
import { getOrderBy } from '@core/utils/sort.util';

@EntityRepository(Session)
export class SessionRepository extends Repository<Session> {
  findSessionsByExpedientId(expedientId: number, sessionFilterDto: SessionsFilterDto): Promise<Session[]> {
    const { finishedAt, startedAt, sort, sessionType } = sessionFilterDto;
    const query = this.createQueryBuilder('session')
      .leftJoin('session.expedient', 'expedient')
      .andWhere(`"expedient"."id" = ${expedientId}`);

    if (sort) {
      const order = getOrderBy(sort, sortOptionsMap);
      query.orderBy(order);
    } else {
      query.orderBy({ 'session.id': 'DESC' });
    }

    if (sessionType) {
      query.andWhere(`session.sessionType = '${sessionType}'`);
    }

    if (startedAt) {
      query.andWhere(`session.startedAt >= '${startedAt}'`);
    }

    if (finishedAt) {
      query.andWhere(`session.startedAt <= '${finishedAt}'`);
    }

    return query.getMany();
  }
}
