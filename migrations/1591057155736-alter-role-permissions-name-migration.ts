import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1591057155736 implements MigrationInterface {
  name = 'Migration1591057155736';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name")`);
    await queryRunner.query(`ALTER TABLE "permission" ADD CONSTRAINT "UQ_240853a0c3353c25fb12434ad33" UNIQUE ("name")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "permission" DROP CONSTRAINT "UQ_240853a0c3353c25fb12434ad33"`);
    await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "UQ_ae4578dcaed5adff96595e61660"`);
  }
}
