import { Expose, Type } from 'class-transformer';

export class Student {
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
