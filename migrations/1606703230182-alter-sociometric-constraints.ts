import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterSociometricConstraints1606703230182 implements MigrationInterface {
  name = 'alterSociometricConstraints1606703230182';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."sociometric_test_detail" ADD CONSTRAINT "UQ_1b6341cb4d73243540ab7ed4b3e" UNIQUE ("sociometric_test_id", "student_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."answer" ADD CONSTRAINT "UQ_439edbe89e7d69d3085b6580e5c" UNIQUE ("sociometric_test_detail_id", "student_id", "question_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sociometric_test" ADD CONSTRAINT "FK_67d05a310a83887c77765ea3858" FOREIGN KEY ("section_detail_id") REFERENCES "public"."section_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."sociometric_test" DROP CONSTRAINT "FK_67d05a310a83887c77765ea3858"`);
    await queryRunner.query(`ALTER TABLE "public"."answer" DROP CONSTRAINT "UQ_439edbe89e7d69d3085b6580e5c"`);
    await queryRunner.query(
      `ALTER TABLE "public"."sociometric_test_detail" DROP CONSTRAINT "UQ_1b6341cb4d73243540ab7ed4b3e"`,
    );
  }
}
