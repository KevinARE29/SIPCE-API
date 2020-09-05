import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1597562168613 implements MigrationInterface {
  name = 'migration1597562168613';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" DROP CONSTRAINT "UQ_378e2e332a13ea37e5546226045"`);
    await queryRunner.query(
      `ALTER TABLE "public"."cycle_detail" ADD CONSTRAINT "UQ_9f0434fd9d643085736f5cd2f87" UNIQUE ("shift_id", "cycle_coordinator_id", "school_year_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" DROP CONSTRAINT "UQ_9f0434fd9d643085736f5cd2f87"`);
    await queryRunner.query(
      `ALTER TABLE "public"."cycle_detail" ADD CONSTRAINT "UQ_378e2e332a13ea37e5546226045" UNIQUE ("shift_id", "cycle_coordinator_id")`,
    );
  }
}
