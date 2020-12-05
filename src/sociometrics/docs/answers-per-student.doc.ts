import { Expose, Type } from 'class-transformer';
import { StudentAnswers } from './student-answer.doc';

export class AnswersPerStudent {
  @Expose()
  @Type(() => StudentAnswers)
  myAnswers!: StudentAnswers;

  @Expose()
  @Type(() => StudentAnswers)
  studentsAnswers!: StudentAnswers;
}
