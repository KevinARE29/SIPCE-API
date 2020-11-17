import { Expose, Type } from 'class-transformer';
import { StudentsByCurrentShiftAndGrade } from './students-by-current-shift-and-grade.doc';
import { StudentsByCurrentShift } from './students-by-current-shift.doc';
import { StudentsByStatus } from './students-by-status.doc';
import { UsersByRole } from './users-by-role.doc';

export class DashboardResponse {
  @Expose()
  activeUsers!: string;

  @Expose()
  @Type(() => UsersByRole)
  usersByRole!: UsersByRole;

  @Expose()
  totalStudents!: string;

  @Expose()
  @Type(() => StudentsByStatus)
  studentsByStatus!: StudentsByStatus;

  @Expose()
  @Type(() => StudentsByCurrentShiftAndGrade)
  studentsByCurrentShiftAndGrade!: StudentsByCurrentShiftAndGrade;

  @Expose()
  @Type(() => StudentsByCurrentShift)
  studentsByCurrentShift!: StudentsByCurrentShift;
}
