import { Answer } from '@sociometrics/entities/answer.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Answer)
export class AnswerRepository extends Repository<Answer> {}
