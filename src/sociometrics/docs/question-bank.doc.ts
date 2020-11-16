import { Expose } from 'class-transformer';

export class QuestionBank {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  questions!: number;
}
