import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStartHourColumnOnSessionTable1605501869010 implements MigrationInterface {
  name = 'addStartHourColumnOnSessionTable1605501869010';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."session" ADD "start_hour" character varying`);
    await queryRunner.query(
      `ALTER TABLE "public"."session_responsible_assistence" ALTER COLUMN "responsible2_assistence" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."session_responsible_assistence" ALTER COLUMN "responsible2_id" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."session_responsible_assistence" ALTER COLUMN "responsible2_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."session_responsible_assistence" ALTER COLUMN "responsible2_assistence" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "public"."session" DROP COLUMN "start_hour"`);
  }
}
