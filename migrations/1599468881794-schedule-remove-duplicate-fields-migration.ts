import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1599468881794 implements MigrationInterface {
  name = 'migration1599468881794';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "day"`);
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "start_time"`);
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "end_time"`);
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "subject"`);
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "recurrent"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "schedule" ADD "recurrent" boolean NOT NULL`);
    await queryRunner.query(`ALTER TABLE "schedule" ADD "subject" character varying(128) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "schedule" ADD "description" character varying(128) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "schedule" ADD "end_time" TIMESTAMP WITH TIME ZONE NOT NULL`);
    await queryRunner.query(`ALTER TABLE "schedule" ADD "start_time" TIMESTAMP WITH TIME ZONE NOT NULL`);
    await queryRunner.query(`ALTER TABLE "schedule" ADD "day" TIMESTAMP NOT NULL`);
  }
}
