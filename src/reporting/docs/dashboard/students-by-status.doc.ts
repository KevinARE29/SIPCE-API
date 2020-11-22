import { Expose } from 'class-transformer';

export class StudentsByStatus {
  @Expose()
  status!: string;

  @Expose()
  count!: number;
}
