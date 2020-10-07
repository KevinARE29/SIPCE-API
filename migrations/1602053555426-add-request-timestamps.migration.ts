import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRequestTimestamps1602053555426 implements MigrationInterface {
  name = 'addRequestTimestamps1602053555426';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."request" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."request" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."request" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "public"."request" DROP COLUMN "created_at"`);
  }
}
