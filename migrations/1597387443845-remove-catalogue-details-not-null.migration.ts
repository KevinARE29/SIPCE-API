import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1597387443845 implements MigrationInterface {
  name = 'migration1597387443845';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."section_detail" DROP CONSTRAINT "FK_b6efba5613c2f52c3665ea96e20"`);
    await queryRunner.query(`ALTER TABLE "public"."section_detail" ALTER COLUMN "grade_detail_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "public"."grade_detail" DROP CONSTRAINT "FK_d97cd1137b861be080bb1fb8a16"`);
    await queryRunner.query(`ALTER TABLE "public"."grade_detail" ALTER COLUMN "cycle_detail_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."section_detail" ADD CONSTRAINT "FK_b6efba5613c2f52c3665ea96e20" FOREIGN KEY ("grade_detail_id") REFERENCES "public"."grade_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."grade_detail" ADD CONSTRAINT "FK_d97cd1137b861be080bb1fb8a16" FOREIGN KEY ("cycle_detail_id") REFERENCES "public"."cycle_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."grade_detail" DROP CONSTRAINT "FK_d97cd1137b861be080bb1fb8a16"`);
    await queryRunner.query(`ALTER TABLE "public"."section_detail" DROP CONSTRAINT "FK_b6efba5613c2f52c3665ea96e20"`);
    await queryRunner.query(`ALTER TABLE "public"."grade_detail" ALTER COLUMN "cycle_detail_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."grade_detail" ADD CONSTRAINT "FK_d97cd1137b861be080bb1fb8a16" FOREIGN KEY ("cycle_detail_id") REFERENCES "public"."cycle_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "public"."section_detail" ALTER COLUMN "grade_detail_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."section_detail" ADD CONSTRAINT "FK_b6efba5613c2f52c3665ea96e20" FOREIGN KEY ("grade_detail_id") REFERENCES "public"."grade_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
