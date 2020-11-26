import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSociometricTables1606379444127 implements MigrationInterface {
  name = 'addSociometricTables1606379444127';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."preset" ("id" SERIAL NOT NULL, "password" character varying(60) NOT NULL, "started_at" TIMESTAMP WITH TIME ZONE NOT NULL, "ended_at" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "sociometric_test_id" integer NOT NULL, CONSTRAINT "PK_27df7dfd51e6ac06a70b702d216" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "sociometric_test_status_enum" AS ENUM('Programada', 'En curso', 'Finalizada')`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."sociometric_test" ("id" SERIAL NOT NULL, "status" "sociometric_test_status_enum" NOT NULL, "answers_per_question" smallint NOT NULL, "completed" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "question_bank_id" integer NOT NULL, "section_detail_id" integer NOT NULL, CONSTRAINT "PK_42f5737a16606e68254d2e449aa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."sociometric_test_detail" ("id" SERIAL NOT NULL, "finished" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "sociometric_test_id" integer NOT NULL, "student_id" integer NOT NULL, CONSTRAINT "PK_4c43547f69e590f06bef9726fde" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."answer" ("id" SERIAL NOT NULL, "ponderation" smallint NOT NULL, "sociometric_test_detail_id" integer NOT NULL, "question_id" integer NOT NULL, "student_id" integer NOT NULL, CONSTRAINT "PK_70c388f54e827cd4c2c7337d483" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."preset" ADD CONSTRAINT "FK_051f36865df50b6b961376ddc52" FOREIGN KEY ("sociometric_test_id") REFERENCES "public"."sociometric_test"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sociometric_test" ADD CONSTRAINT "FK_c091b2837eef469722f13718787" FOREIGN KEY ("question_bank_id") REFERENCES "public"."question_bank"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sociometric_test" ADD CONSTRAINT "FK_67d05a310a83887c77765ea3858" FOREIGN KEY ("section_detail_id") REFERENCES "public"."section_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sociometric_test_detail" ADD CONSTRAINT "FK_cdc1222c212bd51117d49f4e88a" FOREIGN KEY ("sociometric_test_id") REFERENCES "public"."sociometric_test"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sociometric_test_detail" ADD CONSTRAINT "FK_09cd4d178ee9f04840856a49873" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."answer" ADD CONSTRAINT "FK_77e5ef0a7a68a94fb5dde1f96b0" FOREIGN KEY ("sociometric_test_detail_id") REFERENCES "public"."sociometric_test_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."answer" ADD CONSTRAINT "FK_8d1d8ae7bcb667c9191936151da" FOREIGN KEY ("question_id") REFERENCES "public"."question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."answer" ADD CONSTRAINT "FK_9b39b6c4131a8d85f3c0d26be7f" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."answer" DROP CONSTRAINT "FK_9b39b6c4131a8d85f3c0d26be7f"`);
    await queryRunner.query(`ALTER TABLE "public"."answer" DROP CONSTRAINT "FK_8d1d8ae7bcb667c9191936151da"`);
    await queryRunner.query(`ALTER TABLE "public"."answer" DROP CONSTRAINT "FK_77e5ef0a7a68a94fb5dde1f96b0"`);
    await queryRunner.query(
      `ALTER TABLE "public"."sociometric_test_detail" DROP CONSTRAINT "FK_09cd4d178ee9f04840856a49873"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sociometric_test_detail" DROP CONSTRAINT "FK_cdc1222c212bd51117d49f4e88a"`,
    );
    await queryRunner.query(`ALTER TABLE "public"."sociometric_test" DROP CONSTRAINT "FK_67d05a310a83887c77765ea3858"`);
    await queryRunner.query(`ALTER TABLE "public"."sociometric_test" DROP CONSTRAINT "FK_c091b2837eef469722f13718787"`);
    await queryRunner.query(`ALTER TABLE "public"."preset" DROP CONSTRAINT "FK_051f36865df50b6b961376ddc52"`);
    await queryRunner.query(`DROP TABLE "public"."answer"`);
    await queryRunner.query(`DROP TABLE "public"."sociometric_test_detail"`);
    await queryRunner.query(`DROP TABLE "public"."sociometric_test"`);
    await queryRunner.query(`DROP TYPE "sociometric_test_status_enum"`);
    await queryRunner.query(`DROP TABLE "public"."preset"`);
  }
}
