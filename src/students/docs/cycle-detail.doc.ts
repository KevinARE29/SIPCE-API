import { Expose, Type } from 'class-transformer';
import { Cycle } from '@academics/docs/cycle.doc';

export class SCycleDetail {
  @Expose()
  id!: number;

  @Expose()
  @Type(() => Cycle)
  cycle!: Cycle;
}
