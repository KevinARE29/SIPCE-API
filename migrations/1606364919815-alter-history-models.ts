import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterHistoryModels1606364919815 implements MigrationInterface {
  name = 'alterHistoryModels1606364919815';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."behavioral_history" DROP CONSTRAINT "UQ_5556160756cc3dfed3e1390abb4"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."behavioral_history" ADD CONSTRAINT "UQ_5556160756cc3dfed3e1390abb4" UNIQUE ("final_conclusion")`,
    );
  }
}
