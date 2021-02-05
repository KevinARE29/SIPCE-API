import { Expose } from 'class-transformer';

export class Evaluation {
  @Expose()
  id!: number;

  @Expose()
  description!: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;
}
