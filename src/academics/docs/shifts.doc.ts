import { Expose } from 'class-transformer';

export class Shifts {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  active!: boolean;
}
