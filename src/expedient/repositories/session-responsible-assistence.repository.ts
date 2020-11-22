import { EntityRepository, Repository } from 'typeorm';
import { SessionResponsibleAssistence } from '@expedient/entities/session-responsible-assistence.entity';

@EntityRepository(SessionResponsibleAssistence)
export class SessionResponsibleAssistenceRepository extends Repository<SessionResponsibleAssistence> {}
