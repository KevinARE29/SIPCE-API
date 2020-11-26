import { Question } from '@sociometrics/entities/quetion.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {}
