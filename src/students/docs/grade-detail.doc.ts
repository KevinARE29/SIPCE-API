import { Expose, Type } from 'class-transformer';
import { Grade } from '@academics/docs/grade.doc';
import { SCycleDetail } from './cycle-detail.doc';

export class SGradeDetail {
  @Expose()
  id!: number;

  @Expose()
  @Type(() => Grade)
  grade!: Grade;

  @Expose()
  @Type(() => SCycleDetail)
  cycleDetail!: SCycleDetail;
}
