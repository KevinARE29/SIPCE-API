import { EntityRepository, Repository } from 'typeorm';
import { AccessLog } from '@logs/entities/access-log.entity';

@EntityRepository(AccessLog)
export class AccessLogRepository extends Repository<AccessLog> {}
