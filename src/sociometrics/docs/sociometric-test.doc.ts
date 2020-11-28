import { Grade } from '@academics/docs/grade.doc';
import { Section } from '@academics/docs/section.doc';
import { Shift } from '@academics/docs/shift.doc';
import { Expose, Type } from 'class-transformer';

export class SociometricTest {
  @Expose()
  id!: number;

  @Expose()
  @Type(() => Shift)
  shift!: Shift;

  @Expose()
  @Type(() => Grade)
  grade!: Grade;

  @Expose()
  @Type(() => Section)
  section!: Section;

  @Expose()
  completed!: boolean;

  @Expose()
  status!: string;

  @Expose()
  totalStudents!: number;

  @Expose()
  completedStudents!: number;
}
