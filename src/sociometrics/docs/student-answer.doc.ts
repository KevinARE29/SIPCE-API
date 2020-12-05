import { Student } from '@students/docs/student.doc';
import { Expose, Type } from 'class-transformer';

export class StudentAnswers {
  @Expose()
  @Type(() => Student)
  answersP!: Student[];

  @Expose()
  @Type(() => Student)
  answersN!: Student[];
}
