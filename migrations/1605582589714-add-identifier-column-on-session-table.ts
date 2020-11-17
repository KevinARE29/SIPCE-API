import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIdentifierColumnOnSessionTable1605582589714 implements MigrationInterface {
  name = 'addIdentifierColumnOnSessionTable1605582589714';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."session" ADD "identifier" integer NOT NULL DEFAULT 0`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."session" DROP COLUMN "identifier"`);
  }
}
