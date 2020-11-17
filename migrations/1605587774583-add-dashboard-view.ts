import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDashboardView1605587774583 implements MigrationInterface {
  name = 'addDashboardView1605587774583';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE VIEW "public"."dashboard" AS SELECT
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
    `);
    await queryRunner.query(
      `CREATE TABLE "public"."typeorm_metadata" ("type" varchar not null, "database" varchar, "schema" varchar, "table"  varchar, "name" varchar, "value" text)`,
    );
    await queryRunner.query(
      `INSERT INTO "public"."typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`,
      [
        'VIEW',
        'public',
        'dashboard',
        'SELECT\n    (SELECT COUNT(*) FROM "user" WHERE deleted_at IS NULL AND active) AS active_users,\n    (SELECT\n        (SELECT JSON_AGG(rows) FROM\n            (SELECT r.id, r.name, COUNT(r.name) FROM "user"\n                LEFT JOIN user_role ur ON "user".id = ur.user_id LEFT JOIN role r ON ur.role_id = r.id\n                WHERE "user".deleted_at IS NULL AND "user".active AND r.id IS NOT NULL GROUP BY r.id, r.name)\n        AS rows)\n    AS users_by_role),\n    (SELECT COUNT(*) FROM "student" WHERE deleted_at IS NULL) AS total_students,\n    (SELECT\n        (SELECT JSON_AGG(rows) FROM\n            (SELECT status, COUNT(status) AS count FROM student\n                WHERE deleted_at IS NULL GROUP BY status)\n        AS rows)\n    AS students_by_status),\n    (SELECT\n        (SELECT JSON_AGG(rows) FROM\n            (SELECT s.id AS shift_id, s.name AS shift_name, g.id AS grade_id, g.name AS grade_name, count(*) FROM student\n                LEFT JOIN shift s ON student.current_shift_id = s.id\n                LEFT JOIN grade g ON student.current_grade_id = g.id\n                WHERE student.deleted_at IS NULL AND student.status IN (\'1\',\'2\',\'6\')\n                GROUP BY s.id, s.name, g.id, g.name\n                ORDER BY s.id, g.id)\n        AS rows)\n    AS students_by_current_shift_and_grade),\n    (SELECT\n        (SELECT JSON_AGG(rows) FROM\n            (SELECT s.id AS shift_id, s.name AS shift_name, count(*) FROM student\n                LEFT JOIN shift s ON student.current_shift_id = s.id\n                WHERE student.deleted_at IS NULL AND student.status IN (\'1\',\'2\',\'6\')\n                GROUP BY s.id, s.name\n                ORDER BY s.id)\n        AS rows)\n    AS students_by_current_shift);',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "public"."typeorm_metadata" WHERE "type" = 'VIEW' AND "schema" = $1 AND "name" = $2`,
      ['public', 'dashboard'],
    );
    await queryRunner.query(`DROP TABLE "public"."typeorm_metadata"`);
    await queryRunner.query(`DROP VIEW "public"."dashboard"`);
  }
}
