import { Expose, Type } from 'class-transformer';
import { Grade } from '@academics/docs/grade.doc';
import { CycleDetail } from './cycle.detail.doc';

export class GradeDetail {
  @Expose()
  id!: number;

  @Expose()
  @Type(() => Grade)
  grade!: Grade;

  @Expose()
  @Type(() => CycleDetail)
  cycleDetail!: CycleDetail;
}
