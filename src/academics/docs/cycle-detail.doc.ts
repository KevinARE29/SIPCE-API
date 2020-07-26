import { Expose, Type } from 'class-transformer';
import { BaseUser } from '@core/docs/base-user.doc';
import { Shift } from './shift.doc';
import { Cycle } from './cycle.doc';
import { GradeDetail } from './grade-detail.doc';

export class CycleDetail {
  @Expose()
  id!: number;

  @Expose()
  @Type(() => Shift)
  shift!: Shift;

  @Expose()
  @Type(() => Cycle)
  cycle!: Cycle;

  @Expose()
  @Type(() => BaseUser)
  cycleCoordinator!: BaseUser;

  @Expose()
  @Type(() => GradeDetail)
  gradeDetails!: GradeDetail[];
}
