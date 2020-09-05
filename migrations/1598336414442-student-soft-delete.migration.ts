import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1598336414442 implements MigrationInterface {
  name = 'migration1598336414442';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."student" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."student" DROP COLUMN "deleted_at"`);
  }
}
