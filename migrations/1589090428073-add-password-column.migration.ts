import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1589090428073 implements MigrationInterface {
  name = 'Migration1589090428073';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(128) NOT NULL`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`, undefined);
  }
}
