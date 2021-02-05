import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateColumnsOnInterventionProgramTable1605805184853 implements MigrationInterface {
  name = 'updateColumnsOnInterventionProgramTable1605805184853';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."intervention_program" RENAME COLUMN "global" TO "status"`);
    await queryRunner.query(`ALTER TABLE "public"."intervention_program" ALTER COLUMN "status" SET DEFAULT true`);
    await queryRunner.query(`ALTER TABLE "public"."intervention_program" ADD "description" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."intervention_program" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "public"."intervention_program" RENAME COLUMN "status" TO "global"`);
    await queryRunner.query(`ALTER TABLE "public"."intervention_program" DROP COLUMN "description"`);
  }
}
