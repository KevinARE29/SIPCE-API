import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1591418369140 implements MigrationInterface {
  name = 'migration1591418369140';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "access_log" ("id" SERIAL NOT NULL, "username" character varying(64) NOT NULL, "ip" character varying(16), "statusCode" smallint NOT NULL, "attempt_time" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_63cffa5d8af90621882f0388359" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`alter table "user" alter column username type varchar(64) using username::varchar(64)`);
    await queryRunner.query(
      `alter table "user" alter column created_at type timestamp with time zone using created_at::timestamp with time zone`,
    );
    await queryRunner.query(
      `alter table "user" alter column updated_at type timestamp with time zone using updated_at::timestamp with time zone;`,
    );
    await queryRunner.query(
      `alter table "user" alter column deleted_at type timestamp with time zone using deleted_at::timestamp with time zone;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`alter table "user" alter column deleted_at type timestamp using deleted_at::timestamp`);
    await queryRunner.query(`alter table "user" alter column updated_at type timestamp using updated_at::timestamp`);
    await queryRunner.query(`alter table "user" alter column created_at type timestamp using created_at::timestamp`);
    await queryRunner.query(`alter table "user" alter column username type varchar(32) using username::varchar(32)`);
    await queryRunner.query(`DROP TABLE "access_log"`);
  }
}
