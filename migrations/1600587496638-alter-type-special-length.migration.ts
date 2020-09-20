import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1600587496638 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."politic" ALTER COLUMN "type_special" TYPE VARCHAR(32)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."politic" ALTER COLUMN "type_special" TYPE VARCHAR(512)`);
  }
}
