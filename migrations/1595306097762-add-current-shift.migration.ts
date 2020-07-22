import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1595306097762 implements MigrationInterface {
  name = 'migration1595306097762';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."student" ADD "current_shift_id" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."student" ADD CONSTRAINT "FK_49b4c655ff802c62ab202f208f8" FOREIGN KEY ("current_shift_id") REFERENCES "public"."shift"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "FK_49b4c655ff802c62ab202f208f8"`);
    await queryRunner.query(`ALTER TABLE "public"."student" DROP COLUMN "current_shift_id"`);
  }
}
