import { Students } from '@students/docs/students.doc';
import { Expose, Type } from 'class-transformer';
import { Question } from './question.doc';

export class Answer {
  @Expose()
  id!: number;

  @Expose()
  ponderation!: number;

  @Expose()
  @Type(() => Question)
  question!: Question;

  @Expose()
  @Type(() => Students)
  student!: Students;
}
