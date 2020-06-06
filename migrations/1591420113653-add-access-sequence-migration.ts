import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1591420113653 implements MigrationInterface {
  name = 'migration1591420113653';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SEQUENCE "access_log_id_seq" OWNED BY "access_log"."id"`);
    await queryRunner.query(`ALTER TABLE "access_log" ALTER COLUMN "id" SET DEFAULT nextval('access_log_id_seq')`);
    await queryRunner.query(`ALTER TABLE "access_log" ALTER COLUMN "id" DROP DEFAULT`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "access_log" ALTER COLUMN "id" SET DEFAULT nextval('action_log_id_seq'`);
    await queryRunner.query(`ALTER TABLE "access_log" ALTER COLUMN "id" DROP DEFAULT`);
    await queryRunner.query(`DROP SEQUENCE "access_log_id_seq"`);
  }
}
