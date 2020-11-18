import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNullableConditionsOnExpedientTables1605159911813 implements MigrationInterface {
  name = 'addNullableConditionsOnExpedientTables1605159911813';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."session_responsible_assistence" ALTER COLUMN "other_responsible_name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."session_responsible_assistence" ALTER COLUMN "other_responsible_relationship" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "public"."session" ALTER COLUMN "treated_topics" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "public"."session" ALTER COLUMN "agreements" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "public"."expedient" ALTER COLUMN "final_conclusion" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."expedient" ALTER COLUMN "final_conclusion" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "public"."session" ALTER COLUMN "agreements" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "public"."session" ALTER COLUMN "treated_topics" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."session_responsible_assistence" ALTER COLUMN "other_responsible_relationship" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."session_responsible_assistence" ALTER COLUMN "other_responsible_name" SET NOT NULL`,
    );
  }
}
