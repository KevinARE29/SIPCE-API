import { Expose } from 'class-transformer';

export class Question {
  @Expose()
  id!: number;

  @Expose()
  questionP!: string;

  @Expose()
  questionN!: string;

  @Expose()
  type!: string;
}
