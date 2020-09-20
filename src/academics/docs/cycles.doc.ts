import { Expose } from 'class-transformer';

export class Cycles {
  @Expose()
  id!: number;

  @Expose()
  name!: string;
}
