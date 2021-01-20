import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateInterventionProgramType1611112818209 implements MigrationInterface {
  name = 'updateInterventionProgramType1611112818209';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."intervention_program_enum" RENAME TO "intervention_program_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "intervention_program_enum" AS ENUM('Individual académico', 'Individual conductual', 'Individual emocional', 'Individual vocacional', 'Individual mixto', 'Grupales')`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."intervention_program" ALTER COLUMN "type" TYPE "intervention_program_enum" USING "type"::"text"::"intervention_program_enum"`,
    );
    await queryRunner.query(`DROP TYPE "intervention_program_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "intervention_program_enum_old" AS ENUM()`);
    await queryRunner.query(
      `ALTER TABLE "public"."intervention_program" ALTER COLUMN "type" TYPE "intervention_program_enum_old" USING "type"::"text"::"intervention_program_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."intervention_program_type_enum"`);
    await queryRunner.query(`ALTER TYPE "intervention_program_enum_old" RENAME TO  "intervention_program_enum"`);
  }
}
