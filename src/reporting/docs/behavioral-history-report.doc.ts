import { Expose, Type } from 'class-transformer';
import { Student } from '@students/docs/student.doc';
import { StudentBehavioralHistoryInformationReport } from '@history/docs/student-behavioral-history-information-report.doc';
import { SimpleUser } from '@users/docs/simple-user.doc';

export class BehavioralHistoryReport {
  @Expose()
  @Type(() => Student)
  student!: Student;

  @Expose()
  @Type(() => StudentBehavioralHistoryInformationReport)
  behavioralHistory!: StudentBehavioralHistoryInformationReport;

  @Expose()
  @Type(() => SimpleUser)
  user!: SimpleUser;
}
