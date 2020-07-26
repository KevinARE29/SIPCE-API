import { Expose } from 'class-transformer';

export class Cycle {
  @Expose()
  id!: number;

  @Expose()
  name!: string;
}
