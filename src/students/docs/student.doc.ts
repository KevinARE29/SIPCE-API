import { Expose, Type } from 'class-transformer';
import { Grade } from '@academics/docs/grade.doc';
import { Shift } from '@academics/docs/shift.doc';
import { Image } from '@core/docs/image.doc';
import { Sibling } from './sibling.doc';
import { ResponsibleStudent } from './responsible-student.doc';
import { SectionDetail } from './section-detail.doc';

export class Student {
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
  @Type(() => Grade)
  startedGrade!: Grade;

  @Expose()
  @Type(() => Sibling)
  siblings!: Sibling[];

  @Expose()
  @Type(() => Image)
  images!: Image[];

  @Expose()
  @Type(() => ResponsibleStudent)
  responsibleStudents!: ResponsibleStudent[];

  @Expose()
  @Type(() => SectionDetail)
  sectionDetails!: SectionDetail[];
}
