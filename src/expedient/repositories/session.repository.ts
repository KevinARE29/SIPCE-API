import { EntityRepository, Repository } from 'typeorm';
import { Session } from '@expedient/entities/session.entity';
import { SessionsFilterDto, sortOptionsMap } from '@expedient/dtos/sessions-filter.dto';
import { getOrderBy } from '@core/utils/sort.util';
import { PageDto } from '@core/dtos/page.dto';

@EntityRepository(Session)
export class SessionRepository extends Repository<Session> {
  findSessionsByExpedientId(
    expedientId: number,
    sessionFilterDto: SessionsFilterDto,
    pageDto: PageDto,
  ): Promise<[Session[], number]> {
    const { finishedAt, startedAt, sort, sessionType } = sessionFilterDto;
    const { page, perPage } = pageDto;
    const query = this.createQueryBuilder('session')
      .leftJoin('session.expedient', 'expedient')
      .andWhere(`"expedient"."id" = ${expedientId}`)
      .take(perPage)
      .skip((page - 1) * perPage);

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

    return query.getManyAndCount();
  }

  async assignSessionIdentifier(sessionType: string): Promise<number> {
    const sessions = await this.find({ where: { sessionType }, order: { identifier: 'DESC' } });
    if (!sessions || !sessions[0].identifier) {
      return 1;
    }
    return sessions[0].identifier + 1;
  }
}
