import { Expose, Type } from 'class-transformer';
import { Cycle } from '@academics/docs/cycle.doc';

export class CycleDetail {
  @Expose()
  id!: number;

  @Expose()
  @Type(() => Cycle)
  cycle!: Cycle;
}
