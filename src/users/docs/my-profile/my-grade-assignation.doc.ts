import { Expose, Type } from 'class-transformer';
import { Grade } from '@academics/docs/grade.doc';

export class MyGradeAssignation {
  @Expose()
  id!: number;

  @Expose()
  @Type(() => Grade)
  grade!: Grade;
}
