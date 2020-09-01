import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1598978213367 implements MigrationInterface {
    name = 'migration1598978213367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "schedule_enum" AS ENUM('1', '2', '3', '4')`);
        await queryRunner.query(`CREATE TABLE "schedule" ("id" SERIAL NOT NULL, "day" TIMESTAMP NOT NULL, "start_time" TIMESTAMP WITH TIME ZONE NOT NULL, "end_time" TIMESTAMP WITH TIME ZONE NOT NULL, "subject" character varying(128) NOT NULL, "event_type" "schedule_enum" NOT NULL DEFAULT '1', "json_data" json NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "owner_id" integer NOT NULL, "student_id" integer, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedule_employees" ("employees_id" integer NOT NULL, "schedule_employees_id" integer NOT NULL, CONSTRAINT "PK_5338f9d5bdeb5536990090a311c" PRIMARY KEY ("employees_id", "schedule_employees_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_795096906b7edf494ea034530e" ON "schedule_employees" ("employees_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_693300599a94790e502a9fd079" ON "schedule_employees" ("schedule_employees_id") `);
        await queryRunner.query(`CREATE TABLE "event_conflict" ("firs_event_id" integer NOT NULL, "second_event_id" integer NOT NULL, CONSTRAINT "PK_6e27bcb57d0294ae7d4a0441ff0" PRIMARY KEY ("firs_event_id", "second_event_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5a44eed8a13b38e8f51fa68f88" ON "event_conflict" ("firs_event_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_2c4a8af54b92f56798f6a1e029" ON "event_conflict" ("second_event_id") `);
        await queryRunner.query(`ALTER TYPE "public"."action_enum" RENAME TO "action_enum_old"`);
        await queryRunner.query(`CREATE TYPE "action_enum" AS ENUM('1', '2', '3', '4')`);
        await queryRunner.query(`ALTER TABLE "action_log" ALTER COLUMN "action" TYPE "action_enum" USING "action"::"text"::"action_enum"`);
        await queryRunner.query(`DROP TYPE "action_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."responsible_relationship_enum" RENAME TO "responsible_relationship_enum_old"`);
        await queryRunner.query(`CREATE TYPE "responsible_relationship_enum" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15')`);
        await queryRunner.query(`ALTER TABLE "responsible_student" ALTER COLUMN "relationship" TYPE "responsible_relationship_enum" USING "relationship"::"text"::"responsible_relationship_enum"`);
        await queryRunner.query(`DROP TYPE "responsible_relationship_enum_old"`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_f5d8c39de4aacbeffb53f741c79" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_5e661f8a88e71c1604afc8c4ea4" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule_employees" ADD CONSTRAINT "FK_795096906b7edf494ea034530e5" FOREIGN KEY ("employees_id") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule_employees" ADD CONSTRAINT "FK_693300599a94790e502a9fd0792" FOREIGN KEY ("schedule_employees_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_conflict" ADD CONSTRAINT "FK_5a44eed8a13b38e8f51fa68f88f" FOREIGN KEY ("firs_event_id") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_conflict" ADD CONSTRAINT "FK_2c4a8af54b92f56798f6a1e0295" FOREIGN KEY ("second_event_id") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_conflict" DROP CONSTRAINT "FK_2c4a8af54b92f56798f6a1e0295"`);
        await queryRunner.query(`ALTER TABLE "event_conflict" DROP CONSTRAINT "FK_5a44eed8a13b38e8f51fa68f88f"`);
        await queryRunner.query(`ALTER TABLE "schedule_employees" DROP CONSTRAINT "FK_693300599a94790e502a9fd0792"`);
        await queryRunner.query(`ALTER TABLE "schedule_employees" DROP CONSTRAINT "FK_795096906b7edf494ea034530e5"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_5e661f8a88e71c1604afc8c4ea4"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_f5d8c39de4aacbeffb53f741c79"`);
        await queryRunner.query(`CREATE TYPE "responsible_relationship_enum_old" AS ENUM()`);
        await queryRunner.query(`ALTER TABLE "responsible_student" ALTER COLUMN "relationship" TYPE "responsible_relationship_enum_old" USING "relationship"::"text"::"responsible_relationship_enum_old"`);
        await queryRunner.query(`DROP TYPE "responsible_student_relationship_enum"`);
        await queryRunner.query(`ALTER TYPE "responsible_relationship_enum_old" RENAME TO  "responsible_relationship_enum"`);
        await queryRunner.query(`CREATE TYPE "action_enum_old" AS ENUM()`);
        await queryRunner.query(`ALTER TABLE "action_log" ALTER COLUMN "action" TYPE "action_enum_old" USING "action"::"text"::"action_enum_old"`);
        await queryRunner.query(`DROP TYPE "action_log_action_enum"`);
        await queryRunner.query(`ALTER TYPE "action_enum_old" RENAME TO  "action_enum"`);
        await queryRunner.query(`DROP INDEX "IDX_2c4a8af54b92f56798f6a1e029"`);
        await queryRunner.query(`DROP INDEX "IDX_5a44eed8a13b38e8f51fa68f88"`);
        await queryRunner.query(`DROP TABLE "event_conflict"`);
        await queryRunner.query(`DROP INDEX "IDX_693300599a94790e502a9fd079"`);
        await queryRunner.query(`DROP INDEX "IDX_795096906b7edf494ea034530e"`);
        await queryRunner.query(`DROP TABLE "schedule_employees"`);
        await queryRunner.query(`DROP TABLE "schedule"`);
        await queryRunner.query(`DROP TYPE "schedule_enum"`);
    }

}
