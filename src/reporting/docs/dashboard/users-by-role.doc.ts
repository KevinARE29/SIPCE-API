import { Expose } from 'class-transformer';

export class UsersByRole {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  count!: number;
}
