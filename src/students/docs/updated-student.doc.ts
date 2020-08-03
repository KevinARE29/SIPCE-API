import { Expose, Type } from 'class-transformer';
import { Grade } from '@academics/docs/grade.doc';
import { Shift } from '@academics/docs/shift.doc';
import { Sibling } from './sibling.doc';

export class UpdatedStudent {
  @Expose()
  id!: number;

  @Expose()
  firstname?: string;

  @Expose()
  lastname?: string;

  @Expose()
  birthdate?: Date;

  @Expose()
  registrationYear?: number;

  @Expose()
  email?: string;

  @Expose()
  status?: string;

  @Expose()
  @Type(() => Shift)
  currentShift?: Shift;

  @Expose()
  @Type(() => Grade)
  startedGrade?: Grade;

  @Expose()
  @Type(() => Sibling)
  siblings?: Sibling[];
}
