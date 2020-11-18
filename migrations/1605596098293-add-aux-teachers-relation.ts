import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAuxTeachersRelation1605596098293 implements MigrationInterface {
  name = 'addAuxTeachersRelation1605596098293';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."aux_teacher_section_detail" ("aux_teacher_id" integer NOT NULL, "section_detail_id" integer NOT NULL, CONSTRAINT "PK_5c25b773eb1fa846a92f7e465c6" PRIMARY KEY ("aux_teacher_id", "section_detail_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b5be256885c88395e05e6891de" ON "public"."aux_teacher_section_detail" ("aux_teacher_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a765b0145028a610426d78d50f" ON "public"."aux_teacher_section_detail" ("section_detail_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."aux_teacher_section_detail" ADD CONSTRAINT "FK_b5be256885c88395e05e6891de1" FOREIGN KEY ("aux_teacher_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."aux_teacher_section_detail" ADD CONSTRAINT "FK_a765b0145028a610426d78d50f2" FOREIGN KEY ("section_detail_id") REFERENCES "public"."section_detail"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."aux_teacher_section_detail" DROP CONSTRAINT "FK_a765b0145028a610426d78d50f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."aux_teacher_section_detail" DROP CONSTRAINT "FK_b5be256885c88395e05e6891de1"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_a765b0145028a610426d78d50f"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_b5be256885c88395e05e6891de"`);
    await queryRunner.query(`DROP TABLE "public"."aux_teacher_section_detail"`);
  }
}
