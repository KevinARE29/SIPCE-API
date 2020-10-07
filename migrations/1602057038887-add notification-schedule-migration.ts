import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1602057038887 implements MigrationInterface {
  name = 'migration1602057038887';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "schedule" ADD "notification" boolean NOT NULL DEFAULT false`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "notification"`);
  }
}
