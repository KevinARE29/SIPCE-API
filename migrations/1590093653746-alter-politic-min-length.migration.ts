import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1590093653746 implements MigrationInterface {
  name = 'Migration1590093653746';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "politic" ALTER COLUMN "min_length" SET NOT NULL`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "politic" ALTER COLUMN "min_length" DROP NOT NULL`, undefined);
  }
}
