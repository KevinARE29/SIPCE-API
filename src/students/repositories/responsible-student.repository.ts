import { EntityRepository, Repository } from 'typeorm';
import { ResponsibleStudent } from '@students/entities/responsible-student.entity';

@EntityRepository(ResponsibleStudent)
export class ResponsibleStudentRepository extends Repository<ResponsibleStudent> {}
