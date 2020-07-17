import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1594874545082 implements MigrationInterface {
  name = 'migration1594874545082';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TYPE "public"."action_enum" RENAME TO "action_enum_old"`);
    await queryRunner.query(`CREATE TYPE "action_enum" AS ENUM('1', '2', '3', '4')`);
    await queryRunner.query(
      `ALTER TABLE "action_log" ALTER COLUMN "action" TYPE "action_enum" USING "action"::"text"::"action_enum"`,
    );
    await queryRunner.query(`DROP TYPE "action_enum_old"`);
    await queryRunner.query(`ALTER TABLE "section" DROP CONSTRAINT "UQ_87d27f969ad248d1c293c068ef2"`);
    await queryRunner.query(`ALTER TABLE "cycle" DROP CONSTRAINT "UQ_9b49044f848e332e1d6633925ee"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cycle" ADD CONSTRAINT "UQ_9b49044f848e332e1d6633925ee" UNIQUE ("name")`);
    await queryRunner.query(`ALTER TABLE "section" ADD CONSTRAINT "UQ_87d27f969ad248d1c293c068ef2" UNIQUE ("name")`);
    await queryRunner.query(`CREATE TYPE "action_enum_old" AS ENUM()`);
    await queryRunner.query(
      `ALTER TABLE "action_log" ALTER COLUMN "action" TYPE "action_enum_old" USING "action"::"text"::"action_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "action_log_action_enum"`);
    await queryRunner.query(`ALTER TYPE "action_enum_old" RENAME TO  "action_enum"`);
  }
}
