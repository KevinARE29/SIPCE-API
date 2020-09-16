import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1600218297117 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "username" TYPE VARCHAR(32)`);
    await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "firstname" TYPE VARCHAR(64)`);
    await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "lastname" TYPE VARCHAR(64)`);
    await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "password" TYPE VARCHAR(60)`);
    await queryRunner.query(`ALTER TABLE "public"."student" ALTER COLUMN "code" TYPE VARCHAR(8)`);
    await queryRunner.query(`ALTER TABLE "public"."student" ALTER COLUMN "firstname" TYPE VARCHAR(64)`);
    await queryRunner.query(`ALTER TABLE "public"."student" ALTER COLUMN "lastname" TYPE VARCHAR(64)`);
    await queryRunner.query(`ALTER TABLE "public"."responsible" ALTER COLUMN "firstname" TYPE VARCHAR(64)`);
    await queryRunner.query(`ALTER TABLE "public"."responsible" ALTER COLUMN "lastname" TYPE VARCHAR(64)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."responsible" ALTER COLUMN "lastname" TYPE VARCHAR(128)`);
    await queryRunner.query(`ALTER TABLE "public"."responsible" ALTER COLUMN "firstname" TYPE VARCHAR(128)`);
    await queryRunner.query(`ALTER TABLE "public"."student" ALTER COLUMN "lastname" TYPE VARCHAR(128)`);
    await queryRunner.query(`ALTER TABLE "public"."student" ALTER COLUMN "firstname" TYPE VARCHAR(128)`);
    await queryRunner.query(`ALTER TABLE "public"."student" ALTER COLUMN "code" TYPE VARCHAR(32)`);
    await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "password" TYPE VARCHAR(128)`);
    await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "lastname" TYPE VARCHAR(128)`);
    await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "firstname" TYPE VARCHAR(128)`);
    await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "username" TYPE VARCHAR(64)`);
  }
}
