import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1589090672410 implements MigrationInterface {
  name = 'Migration1589090672410';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "resetPasswordToken" DROP NOT NULL`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "resetPasswordToken" SET NOT NULL`, undefined);
  }
}
