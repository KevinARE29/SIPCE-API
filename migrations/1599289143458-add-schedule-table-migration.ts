import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1599289143458 implements MigrationInterface {
  name = 'migration1599289143458';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "schedule_enum" AS ENUM('1', '2', '3', '4', '5')`);
    await queryRunner.query(
      `CREATE TABLE "schedule" ("id" SERIAL NOT NULL, "day" TIMESTAMP NOT NULL, "start_time" TIMESTAMP WITH TIME ZONE NOT NULL, "end_time" TIMESTAMP WITH TIME ZONE NOT NULL, "description" character varying(128) NOT NULL, "subject" character varying(128) NOT NULL, "recurrent" boolean NOT NULL, "event_type" "schedule_enum" NOT NULL DEFAULT '1', "json_data" json NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "owner_id" integer NOT NULL, "student_id" integer, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "schedule_employees" ("schedule_event" integer NOT NULL, "employee_id" integer NOT NULL, CONSTRAINT "PK_0fa400f66b57bd9050213bd47cf" PRIMARY KEY ("schedule_event", "employee_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_207c6955ea9beeab8cda85e983" ON "schedule_employees" ("schedule_event") `,
    );
    await queryRunner.query(`CREATE INDEX "IDX_795096906b7edf494ea034530e" ON "schedule_employees" ("employee_id") `);
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD CONSTRAINT "FK_f5d8c39de4aacbeffb53f741c79" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD CONSTRAINT "FK_5e661f8a88e71c1604afc8c4ea4" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule_employees" ADD CONSTRAINT "FK_207c6955ea9beeab8cda85e983f" FOREIGN KEY ("schedule_event") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule_employees" ADD CONSTRAINT "FK_795096906b7edf494ea034530e5" FOREIGN KEY ("employee_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "schedule_employees" DROP CONSTRAINT "FK_795096906b7edf494ea034530e5"`);
    await queryRunner.query(`ALTER TABLE "schedule_employees" DROP CONSTRAINT "FK_207c6955ea9beeab8cda85e983f"`);
    await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_5e661f8a88e71c1604afc8c4ea4"`);
    await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_f5d8c39de4aacbeffb53f741c79"`);
    await queryRunner.query(`DROP INDEX "IDX_795096906b7edf494ea034530e"`);
    await queryRunner.query(`DROP INDEX "IDX_207c6955ea9beeab8cda85e983"`);
    await queryRunner.query(`DROP TABLE "schedule_employees"`);
    await queryRunner.query(`DROP TABLE "schedule"`);
    await queryRunner.query(`DROP TYPE "schedule_enum"`);
  }
}
