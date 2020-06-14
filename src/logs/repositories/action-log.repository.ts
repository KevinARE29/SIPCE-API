import { EntityRepository, Repository } from 'typeorm';
import { ActionLog } from '@logs/entities/action-log.entity';
import { PageDto } from '@core/dtos/page.dto';
import { ActionLogFilterDto, sortOptionsMap } from '@logs/dtos/action-log-filter.dto';

@EntityRepository(ActionLog)
export class ActionLogRepository extends Repository<ActionLog> {
  getAllActionLogs(pageDto: PageDto, actionLogFilterDto: ActionLogFilterDto): Promise<[ActionLog[], number]> {
    const { page, perPage } = pageDto;
    const { sort, username, endpoint, action, statusCode, attemptTimeStart, attemptTimeEnd } = actionLogFilterDto;
    const query = this.createQueryBuilder('actionLog')
      .leftJoinAndSelect('actionLog.user', 'user')
      .take(perPage)
      .skip((page - 1) * perPage);

    if (sort) {
      const order = sort.split(',').reduce((acum, sortItem) => {
        const orderOption = sortOptionsMap.get(sortItem);
        return { ...acum, ...orderOption };
      }, {});
      query.orderBy(order);
    } else {
      query.orderBy({ 'actionLog.id': 'DESC' });
    }

    if (username) {
      query.andWhere(`"user"."username" ILIKE '%${username}%'`);
    }

    if (endpoint) {
      query.andWhere(`"actionLog"."endpoint" ILIKE '%${endpoint}%'`);
    }

    if (action) {
      query.andWhere(`"actionLog"."action" = '${action}'`);
    }

    if (statusCode) {
      query.andWhere(`"actionLog"."status_code" = ${statusCode}`);
    }

    if (attemptTimeStart) {
      query.andWhere(`"actionLog"."attempt_time" >= '${attemptTimeStart}'`);
    }

    if (attemptTimeEnd) {
      query.andWhere(`"actionLog"."attempt_time" <= '${attemptTimeEnd}'`);
    }

    return query.getManyAndCount();
  }
}
