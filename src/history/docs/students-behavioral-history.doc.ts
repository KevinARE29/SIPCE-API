import { Expose, Type } from 'class-transformer';
import { Grade } from '@academics/docs/grade.doc';
import { Shift } from '@academics/docs/shift.doc';
import { Section } from '@academics/docs/section.doc';

export class StudentsBehabioralHistory {
  @Expose()
  id!: number;

  @Expose()
  code!: string;

  @Expose()
  firstname!: string;

  @Expose()
  lastname!: string;

  @Expose()
  @Type(() => Shift)
  currentShift!: Shift;

  @Expose()
  @Type(() => Grade)
  currentGrade!: Grade;

  @Expose()
  @Type(() => Section)
  currentSection!: Section;

  @Expose()
  annotationsCounter!: number;

  @Expose()
  sanctionsCounter!: number;
}
