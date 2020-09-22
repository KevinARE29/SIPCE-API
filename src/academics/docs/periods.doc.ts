import { Expose } from 'class-transformer';

export class Periods {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  active!: boolean;
}
