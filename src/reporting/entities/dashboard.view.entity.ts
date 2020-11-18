import { EStudentStatus, TStudentByStatus } from '@students/constants/student.constant';
import { ViewEntity, ViewColumn, AfterLoad } from 'typeorm';

@ViewEntity({
  expression: `SELECT
    (SELECT COUNT(*) FROM "user" WHERE deleted_at IS NULL AND active) AS active_users,
    (SELECT
        (SELECT JSON_AGG(rows) FROM
            (SELECT r.id, r.name, COUNT(r.name) FROM "user"
                LEFT JOIN user_role ur ON "user".id = ur.user_id LEFT JOIN role r ON ur.role_id = r.id
                WHERE "user".deleted_at IS NULL AND "user".active AND r.id IS NOT NULL GROUP BY r.id, r.name)
        AS rows)
    AS users_by_role),
    (SELECT COUNT(*) FROM "student" WHERE deleted_at IS NULL) AS total_students,
    (SELECT
        (SELECT JSON_AGG(rows) FROM
            (SELECT status, COUNT(status) AS count FROM student
                WHERE deleted_at IS NULL GROUP BY status)
        AS rows)
    AS students_by_status),
    (SELECT
        (SELECT JSON_AGG(rows) FROM
            (SELECT s.id AS shift_id, s.name AS shift_name, g.id AS grade_id, g.name AS grade_name, count(*) FROM student
                LEFT JOIN shift s ON student.current_shift_id = s.id
                LEFT JOIN grade g ON student.current_grade_id = g.id
                WHERE student.deleted_at IS NULL AND student.status IN ('1','2','6')
                GROUP BY s.id, s.name, g.id, g.name
                ORDER BY s.id, g.id)
        AS rows)
    AS students_by_current_shift_and_grade),
    (SELECT
        (SELECT JSON_AGG(rows) FROM
            (SELECT s.id AS shift_id, s.name AS shift_name, count(*) FROM student
                LEFT JOIN shift s ON student.current_shift_id = s.id
                WHERE student.deleted_at IS NULL AND student.status IN ('1','2','6')
                GROUP BY s.id, s.name
                ORDER BY s.id)
        AS rows)
    AS students_by_current_shift);
    `,
})
export class Dashboard {
  @ViewColumn({ name: 'active_users' })
  activeUsers!: number;

  @ViewColumn({ name: 'users_by_role' })
  usersByRole!: Record<string, any>;

  @ViewColumn({ name: 'total_students' })
  totalStudents!: number;

  @ViewColumn({ name: 'students_by_status' })
  studentsByStatus!: Record<string, any>;

  @ViewColumn({ name: 'students_by_current_shift_and_grade' })
  studentsByCurrentShiftAndGrade!: Record<string, any>;

  @ViewColumn({ name: 'students_by_current_shift' })
  studentsByCurrentShift!: Record<string, any>;

  @AfterLoad()
  updateStatus() {
    this.studentsByStatus = this.studentsByStatus.map((student: TStudentByStatus) => ({
      ...student,
      status: EStudentStatus[student.status],
    }));
  }
}
