import { Expose } from 'class-transformer';

export class Shift {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  active!: boolean;
}
