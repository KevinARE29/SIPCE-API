import { Expose, Type } from 'class-transformer';
import { Grade } from '@academics/docs/grade.doc';

export class Students {
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

  @Expose()
  createdAt!: Date;

  @Expose()
  @Type(() => Grade)
  currentGrade!: Grade;
}
