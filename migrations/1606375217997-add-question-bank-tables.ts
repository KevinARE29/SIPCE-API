import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddQuestionBankTables1606375217997 implements MigrationInterface {
  name = 'addQuestionBankTables1606375217997';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "question_type_enum" AS ENUM('Aceptación/Rechazo', 'Liderazgo')`);
    await queryRunner.query(
      `CREATE TABLE "public"."question" ("id" SERIAL NOT NULL, "question_q" character varying(256) NOT NULL, "question_n" character varying(256), "type" "question_type_enum" NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "question_bank_id" integer NOT NULL, CONSTRAINT "PK_4862ab95d7239a36a56f67bac6e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."question_bank" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "counselor_id" integer NOT NULL, CONSTRAINT "PK_5943afe686acd05227492d24527" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."question" ADD CONSTRAINT "FK_12f2fd8ab46a53eb50d6f08f72d" FOREIGN KEY ("question_bank_id") REFERENCES "public"."question_bank"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."question_bank" ADD CONSTRAINT "FK_49f7d82c0561173644de1a550b0" FOREIGN KEY ("counselor_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."question_bank" DROP CONSTRAINT "FK_49f7d82c0561173644de1a550b0"`);
    await queryRunner.query(`ALTER TABLE "public"."question" DROP CONSTRAINT "FK_12f2fd8ab46a53eb50d6f08f72d"`);
    await queryRunner.query(`DROP TABLE "public"."question_bank"`);
    await queryRunner.query(`DROP TABLE "public"."question"`);
    await queryRunner.query(`DROP TYPE "question_type_enum"`);
  }
}
