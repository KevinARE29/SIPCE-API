import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1593489772550 implements MigrationInterface {
  name = 'migration1593489772550';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."section_detail" ("id" SERIAL NOT NULL, "section_id" integer NOT NULL, "grade_detail_id" integer NOT NULL, "teacher_id" integer NOT NULL, CONSTRAINT "PK_7d925d28f1bd11a363cdf80167b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."grade_detail" ("id" SERIAL NOT NULL, "grade_id" integer NOT NULL, "cycle_detail_id" integer NOT NULL, "counselor_id" integer NOT NULL, CONSTRAINT "PK_a66e26be0615aed37238f259bce" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."section_detail" ADD CONSTRAINT "FK_54c88af7a2cc9e3923d116858f7" FOREIGN KEY ("section_id") REFERENCES "public"."section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."section_detail" ADD CONSTRAINT "FK_c7184c2a0dad2d981a58c956676" FOREIGN KEY ("grade_detail_id") REFERENCES "public"."grade_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."section_detail" ADD CONSTRAINT "FK_85e903a09183693195c0c898c64" FOREIGN KEY ("teacher_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."grade_detail" ADD CONSTRAINT "FK_27b0a94453fbe63690672710170" FOREIGN KEY ("grade_id") REFERENCES "public"."grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."grade_detail" ADD CONSTRAINT "FK_c8234e0642e4270e5fdcf3841e0" FOREIGN KEY ("cycle_detail_id") REFERENCES "public"."cycle_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."grade_detail" ADD CONSTRAINT "FK_6bf8b017ab9e3222506d429640e" FOREIGN KEY ("counselor_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."grade_detail" DROP CONSTRAINT "FK_6bf8b017ab9e3222506d429640e"`);
    await queryRunner.query(`ALTER TABLE "public"."grade_detail" DROP CONSTRAINT "FK_c8234e0642e4270e5fdcf3841e0"`);
    await queryRunner.query(`ALTER TABLE "public"."grade_detail" DROP CONSTRAINT "FK_27b0a94453fbe63690672710170"`);
    await queryRunner.query(`ALTER TABLE "public"."section_detail" DROP CONSTRAINT "FK_85e903a09183693195c0c898c64"`);
    await queryRunner.query(`ALTER TABLE "public"."section_detail" DROP CONSTRAINT "FK_c7184c2a0dad2d981a58c956676"`);
    await queryRunner.query(`ALTER TABLE "public"."section_detail" DROP CONSTRAINT "FK_54c88af7a2cc9e3923d116858f7"`);
    await queryRunner.query(`DROP TABLE "public"."grade_detail"`);
    await queryRunner.query(`DROP TABLE "public"."section_detail"`);
  }
}
