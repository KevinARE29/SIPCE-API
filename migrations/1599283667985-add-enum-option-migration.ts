import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1599283667985 implements MigrationInterface {
    name = 'migration1599283667985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."action_enum" RENAME TO "action_enum_old"`);
        await queryRunner.query(`CREATE TYPE "action_enum" AS ENUM('1', '2', '3', '4')`);
        await queryRunner.query(`ALTER TABLE "action_log" ALTER COLUMN "action" TYPE "action_enum" USING "action"::"text"::"action_enum"`);
        await queryRunner.query(`DROP TYPE "action_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."responsible_relationship_enum" RENAME TO "responsible_relationship_enum_old"`);
        await queryRunner.query(`CREATE TYPE "responsible_relationship_enum" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15')`);
        await queryRunner.query(`ALTER TABLE "responsible_student" ALTER COLUMN "relationship" TYPE "responsible_relationship_enum" USING "relationship"::"text"::"responsible_relationship_enum"`);
        await queryRunner.query(`DROP TYPE "responsible_relationship_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."schedule_enum" RENAME TO "schedule_enum_old"`);
        await queryRunner.query(`CREATE TYPE "schedule_enum" AS ENUM('1', '2', '3', '4', '5')`);
        await queryRunner.query(`ALTER TABLE "schedule" ALTER COLUMN "event_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "schedule" ALTER COLUMN "event_type" TYPE "schedule_enum" USING "event_type"::"text"::"schedule_enum"`);
        await queryRunner.query(`ALTER TABLE "schedule" ALTER COLUMN "event_type" SET DEFAULT '1'`);
        await queryRunner.query(`DROP TYPE "schedule_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "schedule_enum_old" AS ENUM()`);
        await queryRunner.query(`ALTER TABLE "schedule" ALTER COLUMN "event_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "schedule" ALTER COLUMN "event_type" TYPE "schedule_enum_old" USING "event_type"::"text"::"schedule_enum_old"`);
        await queryRunner.query(`ALTER TABLE "schedule" ALTER COLUMN "event_type" SET DEFAULT '1'`);
        await queryRunner.query(`DROP TYPE "schedule_event_type_enum"`);
        await queryRunner.query(`ALTER TYPE "schedule_enum_old" RENAME TO  "schedule_enum"`);
        await queryRunner.query(`CREATE TYPE "responsible_relationship_enum_old" AS ENUM()`);
        await queryRunner.query(`ALTER TABLE "responsible_student" ALTER COLUMN "relationship" TYPE "responsible_relationship_enum_old" USING "relationship"::"text"::"responsible_relationship_enum_old"`);
        await queryRunner.query(`DROP TYPE "responsible_student_relationship_enum"`);
        await queryRunner.query(`ALTER TYPE "responsible_relationship_enum_old" RENAME TO  "responsible_relationship_enum"`);
        await queryRunner.query(`CREATE TYPE "action_enum_old" AS ENUM()`);
        await queryRunner.query(`ALTER TABLE "action_log" ALTER COLUMN "action" TYPE "action_enum_old" USING "action"::"text"::"action_enum_old"`);
        await queryRunner.query(`DROP TYPE "action_log_action_enum"`);
        await queryRunner.query(`ALTER TYPE "action_enum_old" RENAME TO  "action_enum"`);
    }

}
