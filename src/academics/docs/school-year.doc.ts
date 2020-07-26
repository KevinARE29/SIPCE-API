import { Expose, Type } from 'class-transformer';
import { CycleDetail } from './cycle-detail.doc';

export class SchoolYear {
  @Expose()
  id!: number;

  @Expose()
  year!: number;

  @Expose()
  status!: string;

  @Expose()
  @Type(() => CycleDetail)
  cycleDetails!: CycleDetail[];

  @Expose()
  startDate!: Date;

  @Expose()
  endDate!: Date;

  @Expose()
  closeDate!: Date;
}
