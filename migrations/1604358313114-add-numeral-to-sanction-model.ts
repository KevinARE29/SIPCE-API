import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNumeralToSanctionModel1604358313114 implements MigrationInterface {
  name = 'addNumeralToSanctionModel1604358313114';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sanction" ADD "numeral" character varying(8) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "sanction" ADD CONSTRAINT "UQ_77b5841fd8ff0e1afb6c8f4a03e" UNIQUE ("numeral")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sanction" DROP CONSTRAINT "UQ_77b5841fd8ff0e1afb6c8f4a03e"`);
    await queryRunner.query(`ALTER TABLE "sanction" DROP COLUMN "numeral"`);
  }
}
