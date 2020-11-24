import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveExternalPsychologicalTreatmentsTable1606189516384 implements MigrationInterface {
  name = 'removeExternalPsychologicalTreatmentsTable1606189516384';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."expedient" ADD "external_psychological_treatments" character varying array`,
    );
    await queryRunner.query(`ALTER TABLE "public"."expedient" DROP COLUMN "referrer_charge"`);
    await queryRunner.query(`ALTER TABLE "public"."expedient" ALTER COLUMN "diagnostic_impression" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."expedient" ALTER COLUMN "diagnostic_impression_categories" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "public"."expedient" ALTER COLUMN "action_plan" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."expedient" ALTER COLUMN "action_plan" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."expedient" ALTER COLUMN "diagnostic_impression_categories" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "public"."expedient" ALTER COLUMN "diagnostic_impression" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "public"."expedient" ADD "referrer_charge" character varying NOT NULL`);

    await queryRunner.query(`ALTER TABLE "public"."expedient" DROP COLUMN "external_psychological_treatments"`);
  }
}
