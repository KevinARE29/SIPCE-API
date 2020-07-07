import { EntityRepository, Repository } from 'typeorm';
import { Grade } from '@academics/entities/grade.entity';

@EntityRepository(Grade)
export class GradeRepository extends Repository<Grade> {}
