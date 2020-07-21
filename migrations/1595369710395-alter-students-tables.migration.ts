import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1595369710395 implements MigrationInterface {
  name = 'migration1595369710395';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."responsible" DROP CONSTRAINT "UQ_a31e5c0c08581475f4bcb60e5d7"`);
    await queryRunner.query(`ALTER TABLE "public"."student" ALTER COLUMN "status" SET DEFAULT '1'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."student" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "public"."responsible" ADD CONSTRAINT "UQ_a31e5c0c08581475f4bcb60e5d7" UNIQUE ("phone")`,
    );
  }
}
