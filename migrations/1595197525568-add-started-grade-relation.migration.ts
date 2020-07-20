import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1595197525568 implements MigrationInterface {
  name = 'migration1595197525568';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."student" RENAME COLUMN "started_grade" TO "started_grade_id"`);
    await queryRunner.query(`ALTER TABLE "public"."student" DROP COLUMN "started_grade_id"`);
    await queryRunner.query(`ALTER TABLE "public"."student" ADD "started_grade_id" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."student" ADD CONSTRAINT "FK_6102aef7951e34db370fdad3df2" FOREIGN KEY ("started_grade_id") REFERENCES "public"."grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "FK_6102aef7951e34db370fdad3df2"`);
    await queryRunner.query(`ALTER TABLE "public"."student" DROP COLUMN "started_grade_id"`);
    await queryRunner.query(`ALTER TABLE "public"."student" ADD "started_grade_id" smallint NOT NULL`);
    await queryRunner.query(`ALTER TABLE "public"."student" RENAME COLUMN "started_grade_id" TO "started_grade"`);
  }
}
