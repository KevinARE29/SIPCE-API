import { Expose, Type } from 'class-transformer';
import { Shift } from '@academics/docs/shift.doc';
import { Cycle } from '@academics/docs/cycle.doc';

export class MyCyclesAssignation {
  @Expose()
  id!: number;

  @Expose()
  @Type(() => Shift)
  shift!: Shift;

  @Expose()
  @Type(() => Cycle)
  cycle!: Cycle;
}
