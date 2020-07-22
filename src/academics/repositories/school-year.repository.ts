import { EntityRepository, Repository } from 'typeorm';
import { SchoolYear } from '@academics/entities/school-year.entity';

@EntityRepository(SchoolYear)
export class SchoolYearRepository extends Repository<SchoolYear> {}
