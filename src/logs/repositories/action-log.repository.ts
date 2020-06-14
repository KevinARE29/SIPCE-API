import { EntityRepository, Repository } from 'typeorm';
import { ActionLog } from '@logs/entities/action-log.entity';
import { PageDto } from '@core/dtos/page.dto';
import { AccessLogFilterDto, sortOptionsMap } from '@logs/dtos/access-log-filter.dto';

@EntityRepository(ActionLog)
export class ActionLogRepository extends Repository<ActionLog> {}
