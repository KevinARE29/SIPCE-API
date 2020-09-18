import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1593585020199 implements MigrationInterface {
  name = 'migration1593585020199';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "password" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "password" SET NOT NULL`);
  }
}
