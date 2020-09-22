import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1600749353558 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."section" ALTER COLUMN "name" TYPE VARCHAR(32)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."section" ALTER COLUMN "name" TYPE VARCHAR(16)`);
  }
}
