import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterFoulsSanctionMigration1607159225571 implements MigrationInterface {
  name = 'alterFoulsSanctionMigration1607159225571';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."foul" DROP CONSTRAINT "UQ_951c82a4c5b6d315d0731cd62db"`);
    await queryRunner.query(`ALTER TABLE "public"."sanction" DROP CONSTRAINT "UQ_b661c88988ae4e7535786ab34b2"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."sanction" ADD CONSTRAINT "UQ_b661c88988ae4e7535786ab34b2" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."foul" ADD CONSTRAINT "UQ_951c82a4c5b6d315d0731cd62db" UNIQUE ("numeral")`,
    );
  }
}
