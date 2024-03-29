import { Expose } from 'class-transformer';

export class Sanctions {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  description!: string;
}
