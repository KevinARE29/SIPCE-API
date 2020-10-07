import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRequestTable1601974754545 implements MigrationInterface {
  name = 'addRequestTable1601974754545';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "request_status_enum" AS ENUM('1', '2', '3', '4')`);
    await queryRunner.query(
      `CREATE TABLE "public"."request" ("id" SERIAL NOT NULL, "subject" character varying(128) NOT NULL, "comment" character varying(512), "status" "request_status_enum" NOT NULL DEFAULT '1', "student_id" integer NOT NULL, CONSTRAINT "PK_bd0db063c3a91a793c9b4ffe25f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "public"."student" ADD "confirmation_token" character varying(512)`);
    await queryRunner.query(
      `ALTER TABLE "public"."student" ADD CONSTRAINT "UQ_45547505f1ec0c020fc5f57db08" UNIQUE ("confirmation_token")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "UQ_45547505f1ec0c020fc5f57db08"`);
    await queryRunner.query(`ALTER TABLE "public"."student" DROP COLUMN "confirmation_token"`);
    await queryRunner.query(`DROP TABLE "public"."request"`);
    await queryRunner.query(`DROP TYPE "request_status_enum"`);
  }
}
