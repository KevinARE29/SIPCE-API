import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameGlobalColumnOnInterventionProgramTable1605763587648 implements MigrationInterface {
  name = 'renameGlobalColumnOnInterventionProgramTable1605763587648';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."intervention_program" RENAME COLUMN "global" TO "status"`);
    await queryRunner.query(`ALTER TABLE "public"."intervention_program" ALTER COLUMN "status" SET DEFAULT true`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."intervention_program" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "public"."intervention_program" RENAME COLUMN "status" TO "global"`);
  }
}
