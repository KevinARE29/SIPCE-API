import { Grade } from '@academics/docs/grade.doc';
import { Section } from '@academics/docs/section.doc';
import { Shift } from '@academics/docs/shift.doc';
import { QuestionBank } from '@sociometrics/entities/quetion-bank.entity';
import { StudentsAssignation } from '@students/docs/students-assignation.doc';
import { Expose } from 'class-transformer';
import { GeneralReport } from './general-report.doc';

export class SociometricReport {
  @Expose()
  shift!: Shift;

  @Expose()
  grade!: Grade;

  @Expose()
  section!: Section;

  @Expose()
  students!: StudentsAssignation[] | undefined;

  @Expose()
  questionBank!: QuestionBank | undefined;

  @Expose()
  generalReports!: GeneralReport[] | undefined;

  @Expose()
  individualReports!: any[] | undefined;
}
