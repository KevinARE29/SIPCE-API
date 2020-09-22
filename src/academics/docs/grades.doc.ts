import { Expose } from 'class-transformer';

export class Grades {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  active!: boolean;
}
