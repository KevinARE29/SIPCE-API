import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1599624451610 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."section_detail" ADD "closed" boolean NOT NULL DEFAULT false`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."section_detail" DROP COLUMN "closed"`);
  }
}
