import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1589094269082 implements MigrationInterface {
  name = 'Migration1589094269082';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "exp"`, undefined);
    await queryRunner.query(`ALTER TABLE "token" ADD "exp" integer NOT NULL`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "exp"`, undefined);
    await queryRunner.query(`ALTER TABLE "token" ADD "exp" TIMESTAMP NOT NULL`, undefined);
  }
}
