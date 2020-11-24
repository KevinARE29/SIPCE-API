import { CompleteSession } from '@expedient/docs/complete-session.doc';
import { Student } from '@students/docs/student.doc';
import { Expose, Type } from 'class-transformer';

export class InterviewLog {
  @Expose()
  @Type(() => Student)
  student!: Student;

  @Expose()
  @Type(() => CompleteSession)
  session!: CompleteSession;
}
