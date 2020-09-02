import { Expose, Type } from 'class-transformer';

export class ScheduleStudent {
  @Expose()
  id!: number;

  @Expose()
  code!: string;

  @Expose()
  firstname!: string;

  @Expose()
  lastname!: string;

  @Expose()
  email!: string;

  @Expose()
  status!: string;
 
}
