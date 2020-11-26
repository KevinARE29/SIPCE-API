import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHistoryModels1606295089731 implements MigrationInterface {
  name = 'addHistoryModels1606295089731';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."foul_sanction_assignation" ("id" SERIAL NOT NULL, "issue_date" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "behavioral_history_id" integer, "period_id" integer, "sanction_id" integer, "foul_id" integer, CONSTRAINT "PK_657bf49df69987eedbbdb0fb965" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."behavioral_history" ("id" SERIAL NOT NULL, "final_conclusion" character varying(512) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "section_detail_id" integer, "student_id" integer, CONSTRAINT "UQ_5556160756cc3dfed3e1390abb4" UNIQUE ("final_conclusion"), CONSTRAINT "PK_ba75181d2f70afdfb973e0e7bb9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."class_diary" ("id" SERIAL NOT NULL, "description" character varying(512) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "behavioral_history_id" integer, "reporter_id" integer, CONSTRAINT "PK_6c950103a20eecea7133e3ad133" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."foul_sanction_assignation" ADD CONSTRAINT "FK_eed8666c3dcb04c4cd0e719776a" FOREIGN KEY ("behavioral_history_id") REFERENCES "public"."behavioral_history"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."foul_sanction_assignation" ADD CONSTRAINT "FK_b22eb7a05cea6ca67255785ea82" FOREIGN KEY ("period_id") REFERENCES "public"."period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."foul_sanction_assignation" ADD CONSTRAINT "FK_0a7a9fd7959913b11c0032cfbcd" FOREIGN KEY ("sanction_id") REFERENCES "public"."sanction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."foul_sanction_assignation" ADD CONSTRAINT "FK_932da69a1caeca62a099fc1b983" FOREIGN KEY ("foul_id") REFERENCES "public"."foul"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."behavioral_history" ADD CONSTRAINT "FK_95afd4cd97ed33444afe6c460d6" FOREIGN KEY ("section_detail_id") REFERENCES "public"."section_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."behavioral_history" ADD CONSTRAINT "FK_0b3fff43bd0bd27fe920fca7858" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."class_diary" ADD CONSTRAINT "FK_53e99d6aba73a9f9ec29e9fdbac" FOREIGN KEY ("behavioral_history_id") REFERENCES "public"."behavioral_history"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."class_diary" ADD CONSTRAINT "FK_878e6983c082b4669e0ad4bf36a" FOREIGN KEY ("reporter_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."class_diary" DROP CONSTRAINT "FK_878e6983c082b4669e0ad4bf36a"`);
    await queryRunner.query(`ALTER TABLE "public"."class_diary" DROP CONSTRAINT "FK_53e99d6aba73a9f9ec29e9fdbac"`);
    await queryRunner.query(
      `ALTER TABLE "public"."behavioral_history" DROP CONSTRAINT "FK_0b3fff43bd0bd27fe920fca7858"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."behavioral_history" DROP CONSTRAINT "FK_95afd4cd97ed33444afe6c460d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."foul_sanction_assignation" DROP CONSTRAINT "FK_932da69a1caeca62a099fc1b983"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."foul_sanction_assignation" DROP CONSTRAINT "FK_0a7a9fd7959913b11c0032cfbcd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."foul_sanction_assignation" DROP CONSTRAINT "FK_b22eb7a05cea6ca67255785ea82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."foul_sanction_assignation" DROP CONSTRAINT "FK_eed8666c3dcb04c4cd0e719776a"`,
    );
    await queryRunner.query(`DROP TABLE "public"."class_diary"`);
    await queryRunner.query(`DROP TABLE "public"."behavioral_history"`);
    await queryRunner.query(`DROP TABLE "public"."foul_sanction_assignation"`);
  }
}
