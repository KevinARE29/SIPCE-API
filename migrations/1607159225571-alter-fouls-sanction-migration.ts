import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterFoulsSanctionMigration1607159225571 implements MigrationInterface {
  name = 'alterFoulsSanctionMigration1607159225571';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."foul" DROP CONSTRAINT "UQ_393f0e25f8b8a987f2bd4fe58a2"`);
    await queryRunner.query(`ALTER TABLE "public"."sanction" DROP CONSTRAINT "UQ_c49943418cbf72748bddf4cf279"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."sanction" ADD CONSTRAINT "UQ_c49943418cbf72748bddf4cf279" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."foul" ADD CONSTRAINT "UQ_393f0e25f8b8a987f2bd4fe58a2" UNIQUE ("numeral")`,
    );
  }
}
