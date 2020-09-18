import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1593065486690 implements MigrationInterface {
  name = 'Migration1593065486690';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cycle" ("id" SERIAL NOT NULL, "name" character varying(32) NOT NULL, CONSTRAINT "UQ_9b49044f848e332e1d6633925ee" UNIQUE ("name"), CONSTRAINT "PK_af5984cb5853f1f88109c9ea2b7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "grade" ("id" SERIAL NOT NULL, "name" character varying(32) NOT NULL, CONSTRAINT "UQ_3b476d2f648bed3dfb3087fe81b" UNIQUE ("name"), CONSTRAINT "PK_58c2176c3ae96bf57daebdbcb5e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "period" ("id" SERIAL NOT NULL, "name" character varying(32) NOT NULL, CONSTRAINT "UQ_174cd20f8f2058fcf8b0f5c2396" UNIQUE ("name"), CONSTRAINT "PK_cabecec858892ab647cd28673b8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "section" ("id" SERIAL NOT NULL, "name" character varying(16) NOT NULL, CONSTRAINT "UQ_87d27f969ad248d1c293c068ef2" UNIQUE ("name"), CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shift" ("id" SERIAL NOT NULL, "name" character varying(16) NOT NULL, CONSTRAINT "UQ_d336a07a501e3a71abb7b695132" UNIQUE ("name"), CONSTRAINT "PK_53071a6485a1e9dc75ec3db54b9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TYPE "public"."action_enum" RENAME TO "action_enum_old"`);
    await queryRunner.query(`CREATE TYPE "action_enum" AS ENUM('1', '2', '3', '4')`);
    await queryRunner.query(
      `ALTER TABLE "action_log" ALTER COLUMN "action" TYPE "action_enum" USING "action"::"text"::"action_enum"`,
    );
    await queryRunner.query(`DROP TYPE "action_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "action_enum_old" AS ENUM()`);
    await queryRunner.query(
      `ALTER TABLE "action_log" ALTER COLUMN "action" TYPE "action_enum_old" USING "action"::"text"::"action_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "action_log_action_enum"`);
    await queryRunner.query(`ALTER TYPE "action_enum_old" RENAME TO  "action_enum"`);
    await queryRunner.query(`DROP TABLE "shift"`);
    await queryRunner.query(`DROP TABLE "section"`);
    await queryRunner.query(`DROP TABLE "period"`);
    await queryRunner.query(`DROP TABLE "grade"`);
    await queryRunner.query(`DROP TABLE "cycle"`);
  }
}
