import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPsychologicalExpedientModuleTablesAndRelations1605072232068 implements MigrationInterface {
  name = 'addPsychologicalExpedientModuleTablesAndRelations1605072232068';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."external_psychological_treatment" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_6b35830f81259f21b16f6c0829a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."evaluation" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "session_id" integer NOT NULL, CONSTRAINT "PK_6e3b6deb5620e890adeff907cd0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "intervention_program_enum" AS ENUM('Individual académico', 'Individual conductual', 'Individual emocional', 'Individual mixto', 'Grupales')`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."intervention_program" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" "intervention_program_enum" NOT NULL, "global" boolean NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "counselor_id" integer, CONSTRAINT "PK_25e5a49b8dcfc0a49c7bd6d8062" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."session_responsible_assistence" ("id" SERIAL NOT NULL, "responsible1_assistence" boolean NOT NULL, "responsible2_assistence" boolean NOT NULL, "other_responsible_name" character varying NOT NULL, "other_responsible_relationship" character varying NOT NULL, "session_id" integer NOT NULL, "responsible1_id" integer NOT NULL, "responsible2_id" integer NOT NULL, CONSTRAINT "REL_90c045192144faed487cb5d4b0" UNIQUE ("session_id"), CONSTRAINT "PK_91eefda5afd201be01a97f5dbf7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "session_enum" AS ENUM('Sesión Individual', 'Entrevista con docente', 'Entrevista con padres de familia')`,
    );
    await queryRunner.query(
      `CREATE TYPE "service_enum" AS ENUM('Académico', 'Conductual', 'Emocional', 'Vocacional', 'Otro')`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."session" ("id" SERIAL NOT NULL, "session_type" "session_enum" NOT NULL, "service_type" "service_enum" NOT NULL, "started_at" TIMESTAMP WITH TIME ZONE NOT NULL, "duration" numeric NOT NULL, "comments" character varying NOT NULL, "treated_topics" character varying NOT NULL, "agreements" character varying NOT NULL, "draft" boolean NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "expedient_id" integer NOT NULL, "intervention_program_id" integer, CONSTRAINT "PK_a5bbb02e7b81d47c536d2fe0a66" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."expedient" ("id" SERIAL NOT NULL, "referrer_name" character varying NOT NULL, "referrer_charge" character varying NOT NULL, "reason" character varying NOT NULL, "problem_description" character varying NOT NULL, "diagnostic_impression" character varying NOT NULL, "diagnostic_impression_categories" character varying array NOT NULL, "action_plan" character varying NOT NULL, "final_conclusion" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "student_id" integer NOT NULL, "grade_detail_id" integer NOT NULL, CONSTRAINT "PK_69645e219f3fcdd65c6571fde39" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."session_user" ("session_id" integer NOT NULL, "counselor_id" integer NOT NULL, CONSTRAINT "PK_e32da94d992322868f7ae4f9d23" PRIMARY KEY ("session_id", "counselor_id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_49738c0b0f2b2d75c25d35e300" ON "public"."session_user" ("session_id") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_5d93a65ffaf0e104e651d1c37a" ON "public"."session_user" ("counselor_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."expedient_external_psychological_treatment" ("expedient_id" integer NOT NULL, "external_psychological_treatment_id" integer NOT NULL, CONSTRAINT "PK_a9a072a32369ef04954400b225e" PRIMARY KEY ("expedient_id", "external_psychological_treatment_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_25e3e046fcab17c67ecbfaf287" ON "public"."expedient_external_psychological_treatment" ("expedient_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_98d6ea9c5703c6e2c2c30daff1" ON "public"."expedient_external_psychological_treatment" ("external_psychological_treatment_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."evaluation" ADD CONSTRAINT "FK_75d9cc62d091d8aea6b16b46dc0" FOREIGN KEY ("session_id") REFERENCES "public"."session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."intervention_program" ADD CONSTRAINT "FK_3a1e7673b7a207ea93aee0ce6ab" FOREIGN KEY ("counselor_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."session_responsible_assistence" ADD CONSTRAINT "FK_90c045192144faed487cb5d4b05" FOREIGN KEY ("session_id") REFERENCES "public"."session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."session_responsible_assistence" ADD CONSTRAINT "FK_ae1e31d4cfe81b102bd03c51e5e" FOREIGN KEY ("responsible1_id") REFERENCES "public"."responsible"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."session_responsible_assistence" ADD CONSTRAINT "FK_851638acf505d06427a35cc786b" FOREIGN KEY ("responsible2_id") REFERENCES "public"."responsible"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."session" ADD CONSTRAINT "FK_36d2f9fb4347bda084f4802af4d" FOREIGN KEY ("expedient_id") REFERENCES "public"."expedient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."session" ADD CONSTRAINT "FK_3ae8af3aa949fa5b4a8a974a773" FOREIGN KEY ("intervention_program_id") REFERENCES "public"."intervention_program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."expedient" ADD CONSTRAINT "FK_06ff9a5e5a1816ac4223a631c8a" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."expedient" ADD CONSTRAINT "FK_023026384a5ea602684afc805ca" FOREIGN KEY ("grade_detail_id") REFERENCES "public"."grade_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."session_user" ADD CONSTRAINT "FK_49738c0b0f2b2d75c25d35e3006" FOREIGN KEY ("session_id") REFERENCES "public"."session"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."session_user" ADD CONSTRAINT "FK_5d93a65ffaf0e104e651d1c37a2" FOREIGN KEY ("counselor_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."expedient_external_psychological_treatment" ADD CONSTRAINT "FK_25e3e046fcab17c67ecbfaf2874" FOREIGN KEY ("expedient_id") REFERENCES "public"."expedient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."expedient_external_psychological_treatment" ADD CONSTRAINT "FK_98d6ea9c5703c6e2c2c30daff14" FOREIGN KEY ("external_psychological_treatment_id") REFERENCES "public"."external_psychological_treatment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."expedient_external_psychological_treatment" DROP CONSTRAINT "FK_98d6ea9c5703c6e2c2c30daff14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."expedient_external_psychological_treatment" DROP CONSTRAINT "FK_25e3e046fcab17c67ecbfaf2874"`,
    );
    await queryRunner.query(`ALTER TABLE "public"."session_user" DROP CONSTRAINT "FK_5d93a65ffaf0e104e651d1c37a2"`);
    await queryRunner.query(`ALTER TABLE "public"."session_user" DROP CONSTRAINT "FK_49738c0b0f2b2d75c25d35e3006"`);
    await queryRunner.query(`ALTER TABLE "public"."expedient" DROP CONSTRAINT "FK_023026384a5ea602684afc805ca"`);
    await queryRunner.query(`ALTER TABLE "public"."expedient" DROP CONSTRAINT "FK_06ff9a5e5a1816ac4223a631c8a"`);
    await queryRunner.query(`ALTER TABLE "public"."session" DROP CONSTRAINT "FK_3ae8af3aa949fa5b4a8a974a773"`);
    await queryRunner.query(`ALTER TABLE "public"."session" DROP CONSTRAINT "FK_36d2f9fb4347bda084f4802af4d"`);
    await queryRunner.query(
      `ALTER TABLE "public"."session_responsible_assistence" DROP CONSTRAINT "FK_851638acf505d06427a35cc786b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."session_responsible_assistence" DROP CONSTRAINT "FK_ae1e31d4cfe81b102bd03c51e5e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."session_responsible_assistence" DROP CONSTRAINT "FK_90c045192144faed487cb5d4b05"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."intervention_program" DROP CONSTRAINT "FK_3a1e7673b7a207ea93aee0ce6ab"`,
    );
    await queryRunner.query(`ALTER TABLE "public"."evaluation" DROP CONSTRAINT "FK_75d9cc62d091d8aea6b16b46dc0"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_98d6ea9c5703c6e2c2c30daff1"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_25e3e046fcab17c67ecbfaf287"`);
    await queryRunner.query(`DROP TABLE "public"."expedient_external_psychological_treatment"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_5d93a65ffaf0e104e651d1c37a"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_49738c0b0f2b2d75c25d35e300"`);
    await queryRunner.query(`DROP TABLE "public"."session_user"`);
    await queryRunner.query(`DROP TABLE "public"."expedient"`);
    await queryRunner.query(`DROP TABLE "public"."session"`);
    await queryRunner.query(`DROP TYPE "service_enum"`);
    await queryRunner.query(`DROP TYPE "session_enum"`);
    await queryRunner.query(`DROP TABLE "public"."session_responsible_assistence"`);
    await queryRunner.query(`DROP TABLE "public"."intervention_program"`);
    await queryRunner.query(`DROP TYPE "intervention_program_enum"`);
    await queryRunner.query(`DROP TABLE "public"."evaluation"`);
    await queryRunner.query(`DROP TABLE "public"."external_psychological_treatment"`);
  }
}
