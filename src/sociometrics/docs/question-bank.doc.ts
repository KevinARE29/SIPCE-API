import { Expose, Type } from 'class-transformer';
import { Question } from './question.doc';

export class QuestionBank {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  @Type(() => Question)
  questions!: Question[];

  @Expose()
  editable!: boolean;
}
