import { EntityRepository, Repository } from 'typeorm';
import { AccessLog } from '@logs/entities/access-log.entity';
import { PageDto } from '@core/dtos/page.dto';
import { AccessLogFilterDto, sortOptionsMap } from '@logs/dtos/access-log-filter.dto';

@EntityRepository(AccessLog)
export class AccessLogRepository extends Repository<AccessLog> {
  getAllAccessLogs(pageDto: PageDto, accessLogFilterDto: AccessLogFilterDto): Promise<[AccessLog[], number]> {
    const { page, perPage } = pageDto;
    const { sort, username, ip, statusCode, attemptTimeStart, attemptTimeEnd } = accessLogFilterDto;
    const query = this.createQueryBuilder('accessLog')
      .take(perPage)
      .skip((page - 1) * perPage);

    if (sort) {
      const order = sort.split(',').reduce((acum, sortItem) => {
        const orderOption = sortOptionsMap.get(sortItem);
        return { ...acum, ...orderOption };
      }, {});
      query.orderBy(order);
    } else {
      query.orderBy({ 'accessLog.id': 'DESC' });
    }

    if (username) {
      query.andWhere(`"accessLog"."username" ILIKE '%${username}%'`);
    }

    if (ip) {
      query.andWhere(`"accessLog"."ip" ILIKE '%${ip}%'`);
    }

    if (statusCode) {
      query.andWhere(`"accessLog"."status_code" = ${statusCode}`);
    }

    if (attemptTimeStart) {
      query.andWhere(`"accessLog"."attempt_time" >= '${attemptTimeStart}'`);
    }

    if (attemptTimeEnd) {
      query.andWhere(`"accessLog"."attempt_time" <= '${attemptTimeEnd}'`);
    }

    return query.getManyAndCount();
  }
}
