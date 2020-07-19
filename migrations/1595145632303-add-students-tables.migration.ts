import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1595145632303 implements MigrationInterface {
  name = 'migration1595145632303';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."responsible" ("id" SERIAL NOT NULL, "firstname" character varying(128) NOT NULL, "lastname" character varying(128) NOT NULL, "email" character varying(128) NOT NULL, "phone" character varying(8) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_e64f460bfc9d7e4fd90bcda8604" UNIQUE ("email"), CONSTRAINT "UQ_a31e5c0c08581475f4bcb60e5d7" UNIQUE ("phone"), CONSTRAINT "PK_56eae2377d92aa2614193414d5a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "responsible_relationship_enum" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15')`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."responsible_student" ("relationship" "responsible_relationship_enum" NOT NULL, "responsible_id" integer NOT NULL, "student_id" integer NOT NULL, CONSTRAINT "PK_be52872d1653382d1c0a055dfdf" PRIMARY KEY ("responsible_id", "student_id"))`,
    );
    await queryRunner.query(`CREATE TYPE "student_status_enum" AS ENUM('1', '2', '3', '4', '5', '6')`);
    await queryRunner.query(
      `CREATE TABLE "public"."student" ("id" SERIAL NOT NULL, "code" character varying(32) NOT NULL, "firstname" character varying(128) NOT NULL, "lastname" character varying(128) NOT NULL, "birthdate" TIMESTAMP WITH TIME ZONE NOT NULL, "registration_year" smallint NOT NULL, "started_grade" smallint NOT NULL, "email" character varying(128) NOT NULL, "status" "student_status_enum" NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_6a5e54e931c356d93875e7e84a4" UNIQUE ("email"), CONSTRAINT "PK_7ca2b34292227b63a053bc22ca6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."student_brother" ("student_id" integer NOT NULL, "brother_id" integer NOT NULL, CONSTRAINT "PK_11eb07fc5482a70478f247c1a08" PRIMARY KEY ("student_id", "brother_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f8f3bcc1837866eea5fe0751f9" ON "public"."student_brother" ("student_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_16eb54ba3a1ecc4fc1fe5554c1" ON "public"."student_brother" ("brother_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."student_section_detail" ("student_id" integer NOT NULL, "section_detail_id" integer NOT NULL, CONSTRAINT "PK_4613656eba14e681b56eb70842f" PRIMARY KEY ("student_id", "section_detail_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_efdb7bba11e9f70472bb495bd2" ON "public"."student_section_detail" ("student_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_59e4e8e420877ffd767cda8177" ON "public"."student_section_detail" ("section_detail_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."responsible_student" ADD CONSTRAINT "FK_049c7cf3784407d3a85ede0b0d9" FOREIGN KEY ("responsible_id") REFERENCES "public"."responsible"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."responsible_student" ADD CONSTRAINT "FK_2de27cdb30225358244ab6f362c" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."student_brother" ADD CONSTRAINT "FK_f8f3bcc1837866eea5fe0751f92" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."student_brother" ADD CONSTRAINT "FK_16eb54ba3a1ecc4fc1fe5554c1e" FOREIGN KEY ("brother_id") REFERENCES "public"."student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."student_section_detail" ADD CONSTRAINT "FK_efdb7bba11e9f70472bb495bd2c" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."student_section_detail" ADD CONSTRAINT "FK_59e4e8e420877ffd767cda8177a" FOREIGN KEY ("section_detail_id") REFERENCES "public"."section_detail"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."student_section_detail" DROP CONSTRAINT "FK_59e4e8e420877ffd767cda8177a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."student_section_detail" DROP CONSTRAINT "FK_efdb7bba11e9f70472bb495bd2c"`,
    );
    await queryRunner.query(`ALTER TABLE "public"."student_brother" DROP CONSTRAINT "FK_16eb54ba3a1ecc4fc1fe5554c1e"`);
    await queryRunner.query(`ALTER TABLE "public"."student_brother" DROP CONSTRAINT "FK_f8f3bcc1837866eea5fe0751f92"`);
    await queryRunner.query(
      `ALTER TABLE "public"."responsible_student" DROP CONSTRAINT "FK_2de27cdb30225358244ab6f362c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."responsible_student" DROP CONSTRAINT "FK_049c7cf3784407d3a85ede0b0d9"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_59e4e8e420877ffd767cda8177"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_efdb7bba11e9f70472bb495bd2"`);
    await queryRunner.query(`DROP TABLE "public"."student_section_detail"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_16eb54ba3a1ecc4fc1fe5554c1"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_f8f3bcc1837866eea5fe0751f9"`);
    await queryRunner.query(`DROP TABLE "public"."student_brother"`);
    await queryRunner.query(`DROP TABLE "public"."student"`);
    await queryRunner.query(`DROP TYPE "student_status_enum"`);
    await queryRunner.query(`DROP TABLE "public"."responsible_student"`);
    await queryRunner.query(`DROP TYPE "responsible_relationship_enum"`);
    await queryRunner.query(`DROP TABLE "public"."responsible"`);
  }
}
