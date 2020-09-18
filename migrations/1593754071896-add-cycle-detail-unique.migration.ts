import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1593754071896 implements MigrationInterface {
  name = 'migration1593754071896';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."cycle_detail" ADD CONSTRAINT "UQ_a058a7336d5ceb0412c069c3115" UNIQUE ("year", "shift_id", "cycle_coordinator_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" DROP CONSTRAINT "UQ_a058a7336d5ceb0412c069c3115"`);
  }
}
