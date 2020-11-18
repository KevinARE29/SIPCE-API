import { EntityRepository, Repository } from 'typeorm';
import { Evaluation } from '@expedient/entities/evaluation.entity';

@EntityRepository(Evaluation)
export class EvaluationRepository extends Repository<Evaluation> {}
