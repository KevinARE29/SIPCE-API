import { Expose, Type } from 'class-transformer';
import { Student } from './student.doc';

export class SStudents {
  @Expose()
  id!: number;

  @Expose()
  @Type(() => Student)
  students!: Student;

  
}
