import { Expose, Type } from 'class-transformer';
import { CompleteReportingExpedient } from '@expedient/docs/complete-reporting-expedient.doc';
import { Student } from '@students/docs/student.doc';

export class ExpedientReport {
  @Expose()
  @Type(() => Student)
  student!: Student;

  @Expose()
  @Type(() => CompleteReportingExpedient)
  expedient!: CompleteReportingExpedient;
}
