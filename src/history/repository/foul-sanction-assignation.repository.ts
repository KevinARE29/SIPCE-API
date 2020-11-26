import { EntityRepository, Repository } from 'typeorm';
import { FoulSanctionAssignation } from '../entities/foul-sanction-assignation.entity';
@EntityRepository(FoulSanctionAssignation)
export class FoulSanctionAssignationRepository extends Repository<FoulSanctionAssignation> {}
