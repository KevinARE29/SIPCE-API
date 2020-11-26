import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateClassDiaryTable1606374708352 implements MigrationInterface {
  name = 'updateClassDiaryTable1606374708352';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."class_diary" ADD "title" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."class_diary" ADD "annotation_date" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "public"."behavioral_history" ALTER COLUMN "final_conclusion" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."class_diary" DROP COLUMN "annotation_date"`);
    await queryRunner.query(`ALTER TABLE "public"."class_diary" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "public"."behavioral_history" ALTER COLUMN "final_conclusion" SET NOT NULL`);
  }
}
