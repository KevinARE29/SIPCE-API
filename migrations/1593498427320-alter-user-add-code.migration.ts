import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1593498427320 implements MigrationInterface {
  name = 'migration1593498427320';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."user" ADD "code" character varying(32) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."user" ADD CONSTRAINT "UQ_867de5aa492c1287c2fe8ef83d2" UNIQUE ("code")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."user" DROP CONSTRAINT "UQ_867de5aa492c1287c2fe8ef83d2"`);
    await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "code"`);
  }
}
