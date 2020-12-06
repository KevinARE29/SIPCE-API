import { Expose, Type } from 'class-transformer';
import { StudentBehavioralHistory } from './student-behavioral-history.doc';

export class StudentSchoolYearProgress {
  @Expose()
  progress!: number;

  @Expose()
  @Type(() => StudentBehavioralHistory)
  students!: StudentBehavioralHistory[];
}
