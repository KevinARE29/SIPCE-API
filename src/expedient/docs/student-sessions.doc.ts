import { Expose, Type } from 'class-transformer';
import { Grade } from '@academics/docs/grade.doc';
import { Shift } from '@academics/docs/shift.doc';
import { Expedient } from '@expedient/docs/expedient.doc';

export class StudentSessions {
  @Expose()
  id!: number;

  @Expose()
  code!: string;

  @Expose()
  firstname!: string;

  @Expose()
  lastname!: string;

  @Expose()
  birthdate!: Date;

  @Expose()
  registrationYear!: number;

  @Expose()
  email!: string;

  @Expose()
  status!: string;

  @Expose()
  @Type(() => Shift)
  currentShift!: Shift;

  @Expose()
  @Type(() => Grade)
  currentGrade!: Grade;

  @Expose()
  @Type(() => Expedient)
  expedient!: Expedient;

  @Expose()
  sessionsCounter!: number;
}
