import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1597387443845 implements MigrationInterface {
  name = 'migration1597387443845';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."section_detail" DROP CONSTRAINT "FK_c7184c2a0dad2d981a58c956676"`);
    await queryRunner.query(`ALTER TABLE "public"."section_detail" ALTER COLUMN "grade_detail_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "public"."grade_detail" DROP CONSTRAINT "FK_c8234e0642e4270e5fdcf3841e0"`);
    await queryRunner.query(`ALTER TABLE "public"."grade_detail" ALTER COLUMN "cycle_detail_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."section_detail" ADD CONSTRAINT "FK_c7184c2a0dad2d981a58c956676" FOREIGN KEY ("grade_detail_id") REFERENCES "public"."grade_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."grade_detail" ADD CONSTRAINT "FK_c8234e0642e4270e5fdcf3841e0" FOREIGN KEY ("cycle_detail_id") REFERENCES "public"."cycle_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."grade_detail" DROP CONSTRAINT "FK_c8234e0642e4270e5fdcf3841e0"`);
    await queryRunner.query(`ALTER TABLE "public"."section_detail" DROP CONSTRAINT "FK_c7184c2a0dad2d981a58c956676"`);
    await queryRunner.query(`ALTER TABLE "public"."grade_detail" ALTER COLUMN "cycle_detail_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."grade_detail" ADD CONSTRAINT "FK_c8234e0642e4270e5fdcf3841e0" FOREIGN KEY ("cycle_detail_id") REFERENCES "public"."cycle_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "public"."section_detail" ALTER COLUMN "grade_detail_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."section_detail" ADD CONSTRAINT "FK_c7184c2a0dad2d981a58c956676" FOREIGN KEY ("grade_detail_id") REFERENCES "public"."grade_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
