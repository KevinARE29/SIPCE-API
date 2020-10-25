import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMigrationFouls1603519513629 implements MigrationInterface {
  name = 'addMigrationFouls1603519513629';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "fouls_enum" AS ENUM('1', '2', '3')`);
    await queryRunner.query(
      `CREATE TABLE "fouls" ("id" SERIAL NOT NULL, "fouls_type" "fouls_enum" NOT NULL, "description" character varying(256) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_169530b51faa07469861846bdde" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "fouls"`);
    await queryRunner.query(`DROP TYPE "fouls_enum"`);
  }
}
