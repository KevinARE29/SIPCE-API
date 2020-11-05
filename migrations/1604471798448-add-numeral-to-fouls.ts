import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNumeraltoFouls1604471798448 implements MigrationInterface {
  name = 'addNumeraltoFouls1604471798448';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sanction" DROP CONSTRAINT "UQ_77b5841fd8ff0e1afb6c8f4a03e"`);
    await queryRunner.query(`ALTER TABLE "sanction" DROP COLUMN "numeral"`);
    await queryRunner.query(`ALTER TABLE "foul" ADD "numeral" character varying(16) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "foul" ADD CONSTRAINT "UQ_393f0e25f8b8a987f2bd4fe58a2" UNIQUE ("numeral")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "foul" DROP CONSTRAINT "UQ_393f0e25f8b8a987f2bd4fe58a2"`);
    await queryRunner.query(`ALTER TABLE "foul" DROP COLUMN "numeral"`);
    await queryRunner.query(`ALTER TABLE "sanction" ADD "numeral" character varying(8) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "sanction" ADD CONSTRAINT "UQ_77b5841fd8ff0e1afb6c8f4a03e" UNIQUE ("numeral")`,
    );
  }
}
