import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1591419152220 implements MigrationInterface {
  name = 'migration1591419152220';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "access_log" RENAME COLUMN "statusCode" TO "status_code"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "access_log" RENAME COLUMN "status_code" TO "statusCode"`);
  }
}
