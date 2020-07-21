import { EntityRepository, Repository } from 'typeorm';
import { Student } from '@students/entities/student.entity';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  findByCode(code: string): Promise<Student | undefined> {
    return this.findOne({
      where: {
        code,
      },
    });
  }
}
