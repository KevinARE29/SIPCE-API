import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1589185546920 implements MigrationInterface {
  name = 'initialMigration1589185546920';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."token" ("id" SERIAL NOT NULL, "access_token" character varying(512) NOT NULL, "refresh_token" character varying(512) NOT NULL, "exp" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_0a48bbd22112a5e6623a7a6d709" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."role" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, CONSTRAINT "UQ_eab36d4e05c0ab7a112841e788d" UNIQUE ("name"), CONSTRAINT "PK_ab841b6a976216a286c10c117f1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."permission" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "codename" character varying(64) NOT NULL, CONSTRAINT "UQ_2b4b9f667345d2010f6b64b5dc8" UNIQUE ("name"), CONSTRAINT "PK_5fdbe810f27ad2158d241b56b76" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "action_enum" AS ENUM('1', '2', '3', '4')`);
    await queryRunner.query(
      `CREATE TABLE "public"."action_log" ("id" SERIAL NOT NULL, "endpoint" character varying(512) NOT NULL, "action" "action_enum" NOT NULL, "status_code" smallint NOT NULL, "attempt_time" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "user_id" integer NOT NULL, CONSTRAINT "PK_0b05342f4b046aeb2ddc6bf19a6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."cycle" ("id" SERIAL NOT NULL, "name" character varying(32) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_b069a22bd789faf87993d98a896" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."shift" ("id" SERIAL NOT NULL, "name" character varying(16) NOT NULL, "active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_cd0ce95d770f2a9f83e20c2d342" UNIQUE ("name"), CONSTRAINT "PK_f01634c0d50d19b5f50e937ae54" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."grade_detail" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "grade_id" integer NOT NULL, "cycle_detail_id" integer, "counselor_id" integer, CONSTRAINT "PK_a66e26be0615aed37238f259bce" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "school_year_status_enum" AS ENUM('1', '2', '3')`);
    await queryRunner.query(
      `CREATE TABLE "public"."school_year" ("id" SERIAL NOT NULL, "year" smallint NOT NULL, "status" "school_year_status_enum" NOT NULL DEFAULT '1', "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "close_date" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_7c1c38623db46f9cd6ee0198e17" UNIQUE ("year"), CONSTRAINT "PK_ddb6baea3047f318507caf2b1cf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."cycle_detail" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "cycle_id" integer NOT NULL, "shift_id" integer NOT NULL, "school_year_id" integer NOT NULL, "cycle_coordinator_id" integer, CONSTRAINT "UQ_9f0434fd9d643085736f5cd2f87" UNIQUE ("shift_id", "cycle_coordinator_id", "school_year_id"), CONSTRAINT "PK_413b811d30c0326de9baf92f1c0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "schedule_enum" AS ENUM('1', '2', '3', '4', '5')`);
    await queryRunner.query(
      `CREATE TABLE "public"."schedule" ("id" SERIAL NOT NULL, "event_type" "schedule_enum" NOT NULL DEFAULT '1', "json_data" json NOT NULL, "notification" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "owner_id" integer NOT NULL, "student_id" integer, CONSTRAINT "PK_7ae10507a97b3a77d13d1a2bdd2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."user" ("id" SERIAL NOT NULL, "username" character varying(32) NOT NULL, "code" character varying(32) NOT NULL, "firstname" character varying(64) NOT NULL, "lastname" character varying(64) NOT NULL, "password" character varying(60), "email" character varying(128) NOT NULL, "reset_password_token" character varying(512), "active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_b67337b7f8aa8406e936c2ff754" UNIQUE ("username"), CONSTRAINT "UQ_867de5aa492c1287c2fe8ef83d2" UNIQUE ("code"), CONSTRAINT "UQ_b7a5e4a3b174e954b2dabf2ef9e" UNIQUE ("email"), CONSTRAINT "UQ_386e1abe368d0b47f2a57d12ea8" UNIQUE ("reset_password_token"), CONSTRAINT "PK_03b91d2b8321aa7ba32257dc321" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."section" ("id" SERIAL NOT NULL, "name" character varying(32) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_066fa112d784a19df44b4e473e4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."section_detail" ("id" SERIAL NOT NULL, "closed" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "section_id" integer NOT NULL, "grade_detail_id" integer, "teacher_id" integer, CONSTRAINT "PK_7d925d28f1bd11a363cdf80167b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "request_status_enum" AS ENUM('1', '2', '3', '4')`);
    await queryRunner.query(
      `CREATE TABLE "public"."request" ("id" SERIAL NOT NULL, "subject" character varying(128) NOT NULL, "comment" character varying(512), "status" "request_status_enum" NOT NULL DEFAULT '1', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "student_id" integer NOT NULL, CONSTRAINT "PK_bd0db063c3a91a793c9b4ffe25f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."responsible" ("id" SERIAL NOT NULL, "firstname" character varying(64) NOT NULL, "lastname" character varying(64) NOT NULL, "email" character varying(128) NOT NULL, "phone" character varying(8) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_e64f460bfc9d7e4fd90bcda8604" UNIQUE ("email"), CONSTRAINT "PK_56eae2377d92aa2614193414d5a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "responsible_relationship_enum" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15')`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."responsible_student" ("relationship" "responsible_relationship_enum" NOT NULL, "responsible_id" integer NOT NULL, "student_id" integer NOT NULL, CONSTRAINT "PK_be52872d1653382d1c0a055dfdf" PRIMARY KEY ("responsible_id", "student_id"))`,
    );
    await queryRunner.query(`CREATE TYPE "student_status_enum" AS ENUM('1', '2', '3', '4', '5', '6', '7')`);
    await queryRunner.query(
      `CREATE TABLE "public"."student" ("id" SERIAL NOT NULL, "code" character varying(8) NOT NULL, "firstname" character varying(64) NOT NULL, "lastname" character varying(64) NOT NULL, "birthdate" TIMESTAMP WITH TIME ZONE NOT NULL, "registration_year" smallint NOT NULL, "email" character varying(128) NOT NULL, "status" "student_status_enum" NOT NULL DEFAULT '2', "confirmation_token" character varying(512), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "started_grade_id" integer NOT NULL, "current_grade_id" integer NOT NULL, "current_shift_id" integer NOT NULL, CONSTRAINT "UQ_ebba3803967599341403a409bc6" UNIQUE ("code"), CONSTRAINT "UQ_6a5e54e931c356d93875e7e84a4" UNIQUE ("email"), CONSTRAINT "UQ_45547505f1ec0c020fc5f57db08" UNIQUE ("confirmation_token"), CONSTRAINT "PK_7ca2b34292227b63a053bc22ca6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."grade" ("id" SERIAL NOT NULL, "name" character varying(32) NOT NULL, "active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_acc6bc0251f27f4eb150ac1a6ec" UNIQUE ("name"), CONSTRAINT "PK_ce60efed88e14c35019673b9b8d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."image" ("id" SERIAL NOT NULL, "path" character varying(128) NOT NULL, "student_id" integer NOT NULL, "grade_id" integer NOT NULL, CONSTRAINT "UQ_2b85ab28b34b5af18aa5a4495b7" UNIQUE ("student_id", "grade_id"), CONSTRAINT "PK_4bac01d707d8500722ea10a85a3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."period" ("id" SERIAL NOT NULL, "name" character varying(32) NOT NULL, "active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_b81e6cab66ff0f23b6e0940e276" UNIQUE ("name"), CONSTRAINT "PK_2c3f07ef84ce164a5b5b8c8be13" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."politic" ("id" SERIAL NOT NULL, "min_length" integer NOT NULL, "capital_letter" boolean, "lower_case" boolean, "special_char" boolean, "numeric_char" boolean, "type_special" character varying(32), CONSTRAINT "PK_c2fc56e72eaf7520882b5ccb4ef" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "fouls_enum" AS ENUM('1', '2', '3')`);
    await queryRunner.query(
      `CREATE TABLE "public"."foul" ("id" SERIAL NOT NULL, "fouls_type" "fouls_enum" NOT NULL, "description" character varying(256) NOT NULL, "numeral" character varying(16) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_951c82a4c5b6d315d0731cd62db" UNIQUE ("numeral"), CONSTRAINT "PK_360216ae33cf21078e7fb3c8e7e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."access_log" ("id" SERIAL NOT NULL, "username" character varying(64) NOT NULL, "ip" character varying(16), "status_code" smallint NOT NULL, "attempt_time" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_41db8cf73905e942b151f44d481" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."sanction" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "description" character varying(256) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_b661c88988ae4e7535786ab34b2" UNIQUE ("name"), CONSTRAINT "PK_87d1ded765a975621936bf1c748" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."role_permission" ("rol_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "PK_8859733f834fd06e447152e2f8a" PRIMARY KEY ("rol_id", "permission_id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_7756708d8a073f051d02f02a00" ON "public"."role_permission" ("rol_id") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_9c70ee937a27f3ee505793079d" ON "public"."role_permission" ("permission_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."schedule_employee" ("schedule_id" integer NOT NULL, "employee_id" integer NOT NULL, CONSTRAINT "PK_6afd5a6b160679327fa59287bdf" PRIMARY KEY ("schedule_id", "employee_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8372687cc654ea07c0c42f8185" ON "public"."schedule_employee" ("schedule_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9f1fe263c194586969309cfeaf" ON "public"."schedule_employee" ("employee_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."user_permission" ("user_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "PK_f2bc0f4f9eb7a464cce2def06be" PRIMARY KEY ("user_id", "permission_id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_74e498650dce789a3d10e2d83d" ON "public"."user_permission" ("user_id") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_c3547dcbd337c75804e3c8a638" ON "public"."user_permission" ("permission_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."user_role" ("user_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_fec59139484b51abdcf52ff74cf" PRIMARY KEY ("user_id", "role_id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_2a80c390439e4c59eae18d6985" ON "public"."user_role" ("user_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_5f10a55b89edd3be64e9eba090" ON "public"."user_role" ("role_id") `);
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
      `ALTER TABLE "public"."token" ADD CONSTRAINT "FK_f4ba45b8d9cdd3cb3eda872ebe8" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."action_log" ADD CONSTRAINT "FK_765fe345f0982e1ae223ffa20ab" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."grade_detail" ADD CONSTRAINT "FK_27b0a94453fbe63690672710170" FOREIGN KEY ("grade_id") REFERENCES "public"."grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."grade_detail" ADD CONSTRAINT "FK_c8234e0642e4270e5fdcf3841e0" FOREIGN KEY ("cycle_detail_id") REFERENCES "public"."cycle_detail"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."grade_detail" ADD CONSTRAINT "FK_6bf8b017ab9e3222506d429640e" FOREIGN KEY ("counselor_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."cycle_detail" ADD CONSTRAINT "FK_2be1ecc783e93eb18da5f7b020d" FOREIGN KEY ("cycle_id") REFERENCES "public"."cycle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."cycle_detail" ADD CONSTRAINT "FK_30f56cd3b97642d640c9e6fdac2" FOREIGN KEY ("shift_id") REFERENCES "public"."shift"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."cycle_detail" ADD CONSTRAINT "FK_32ab7cb2b4ddb84f419479861e7" FOREIGN KEY ("school_year_id") REFERENCES "public"."school_year"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."cycle_detail" ADD CONSTRAINT "FK_1d4ad4478b6ab619ed8d01cb733" FOREIGN KEY ("cycle_coordinator_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."schedule" ADD CONSTRAINT "FK_120bbe590fa7003d4172d0878f9" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."schedule" ADD CONSTRAINT "FK_03cc46ac373d2062c6a7475f234" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."section_detail" ADD CONSTRAINT "FK_54c88af7a2cc9e3923d116858f7" FOREIGN KEY ("section_id") REFERENCES "public"."section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."section_detail" ADD CONSTRAINT "FK_c7184c2a0dad2d981a58c956676" FOREIGN KEY ("grade_detail_id") REFERENCES "public"."grade_detail"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."section_detail" ADD CONSTRAINT "FK_85e903a09183693195c0c898c64" FOREIGN KEY ("teacher_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."request" ADD CONSTRAINT "FK_9a4adcb443d618d44bb326561b8" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."responsible_student" ADD CONSTRAINT "FK_049c7cf3784407d3a85ede0b0d9" FOREIGN KEY ("responsible_id") REFERENCES "public"."responsible"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."responsible_student" ADD CONSTRAINT "FK_2de27cdb30225358244ab6f362c" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."student" ADD CONSTRAINT "FK_6102aef7951e34db370fdad3df2" FOREIGN KEY ("started_grade_id") REFERENCES "public"."grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."student" ADD CONSTRAINT "FK_eb58525d2de0eba1d0113c6e349" FOREIGN KEY ("current_grade_id") REFERENCES "public"."grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."student" ADD CONSTRAINT "FK_49b4c655ff802c62ab202f208f8" FOREIGN KEY ("current_shift_id") REFERENCES "public"."shift"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."image" ADD CONSTRAINT "FK_d0365b2489341b5df137d063d75" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."image" ADD CONSTRAINT "FK_274c32749d7c5cf27a654ea3550" FOREIGN KEY ("grade_id") REFERENCES "public"."grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."role_permission" ADD CONSTRAINT "FK_7756708d8a073f051d02f02a00b" FOREIGN KEY ("rol_id") REFERENCES "public"."role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."role_permission" ADD CONSTRAINT "FK_9c70ee937a27f3ee505793079dc" FOREIGN KEY ("permission_id") REFERENCES "public"."permission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."schedule_employee" ADD CONSTRAINT "FK_8372687cc654ea07c0c42f8185d" FOREIGN KEY ("schedule_id") REFERENCES "public"."schedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."schedule_employee" ADD CONSTRAINT "FK_9f1fe263c194586969309cfeaf6" FOREIGN KEY ("employee_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_permission" ADD CONSTRAINT "FK_74e498650dce789a3d10e2d83d2" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_permission" ADD CONSTRAINT "FK_c3547dcbd337c75804e3c8a6389" FOREIGN KEY ("permission_id") REFERENCES "public"."permission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_role" ADD CONSTRAINT "FK_2a80c390439e4c59eae18d69854" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_role" ADD CONSTRAINT "FK_5f10a55b89edd3be64e9eba0906" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
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
    await queryRunner.query(`ALTER TABLE "public"."user_role" DROP CONSTRAINT "FK_5f10a55b89edd3be64e9eba0906"`);
    await queryRunner.query(`ALTER TABLE "public"."user_role" DROP CONSTRAINT "FK_2a80c390439e4c59eae18d69854"`);
    await queryRunner.query(`ALTER TABLE "public"."user_permission" DROP CONSTRAINT "FK_c3547dcbd337c75804e3c8a6389"`);
    await queryRunner.query(`ALTER TABLE "public"."user_permission" DROP CONSTRAINT "FK_74e498650dce789a3d10e2d83d2"`);
    await queryRunner.query(
      `ALTER TABLE "public"."schedule_employee" DROP CONSTRAINT "FK_9f1fe263c194586969309cfeaf6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."schedule_employee" DROP CONSTRAINT "FK_8372687cc654ea07c0c42f8185d"`,
    );
    await queryRunner.query(`ALTER TABLE "public"."role_permission" DROP CONSTRAINT "FK_9c70ee937a27f3ee505793079dc"`);
    await queryRunner.query(`ALTER TABLE "public"."role_permission" DROP CONSTRAINT "FK_7756708d8a073f051d02f02a00b"`);
    await queryRunner.query(`ALTER TABLE "public"."image" DROP CONSTRAINT "FK_274c32749d7c5cf27a654ea3550"`);
    await queryRunner.query(`ALTER TABLE "public"."image" DROP CONSTRAINT "FK_d0365b2489341b5df137d063d75"`);
    await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "FK_49b4c655ff802c62ab202f208f8"`);
    await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "FK_eb58525d2de0eba1d0113c6e349"`);
    await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "FK_6102aef7951e34db370fdad3df2"`);
    await queryRunner.query(
      `ALTER TABLE "public"."responsible_student" DROP CONSTRAINT "FK_2de27cdb30225358244ab6f362c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."responsible_student" DROP CONSTRAINT "FK_049c7cf3784407d3a85ede0b0d9"`,
    );
    await queryRunner.query(`ALTER TABLE "public"."request" DROP CONSTRAINT "FK_9a4adcb443d618d44bb326561b8"`);
    await queryRunner.query(`ALTER TABLE "public"."section_detail" DROP CONSTRAINT "FK_85e903a09183693195c0c898c64"`);
    await queryRunner.query(`ALTER TABLE "public"."section_detail" DROP CONSTRAINT "FK_c7184c2a0dad2d981a58c956676"`);
    await queryRunner.query(`ALTER TABLE "public"."section_detail" DROP CONSTRAINT "FK_54c88af7a2cc9e3923d116858f7"`);
    await queryRunner.query(`ALTER TABLE "public"."schedule" DROP CONSTRAINT "FK_03cc46ac373d2062c6a7475f234"`);
    await queryRunner.query(`ALTER TABLE "public"."schedule" DROP CONSTRAINT "FK_120bbe590fa7003d4172d0878f9"`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" DROP CONSTRAINT "FK_1d4ad4478b6ab619ed8d01cb733"`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" DROP CONSTRAINT "FK_32ab7cb2b4ddb84f419479861e7"`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" DROP CONSTRAINT "FK_30f56cd3b97642d640c9e6fdac2"`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" DROP CONSTRAINT "FK_2be1ecc783e93eb18da5f7b020d"`);
    await queryRunner.query(`ALTER TABLE "public"."grade_detail" DROP CONSTRAINT "FK_6bf8b017ab9e3222506d429640e"`);
    await queryRunner.query(`ALTER TABLE "public"."grade_detail" DROP CONSTRAINT "FK_c8234e0642e4270e5fdcf3841e0"`);
    await queryRunner.query(`ALTER TABLE "public"."grade_detail" DROP CONSTRAINT "FK_27b0a94453fbe63690672710170"`);
    await queryRunner.query(`ALTER TABLE "public"."action_log" DROP CONSTRAINT "FK_765fe345f0982e1ae223ffa20ab"`);
    await queryRunner.query(`ALTER TABLE "public"."token" DROP CONSTRAINT "FK_f4ba45b8d9cdd3cb3eda872ebe8"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_59e4e8e420877ffd767cda8177"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_efdb7bba11e9f70472bb495bd2"`);
    await queryRunner.query(`DROP TABLE "public"."student_section_detail"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_16eb54ba3a1ecc4fc1fe5554c1"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_f8f3bcc1837866eea5fe0751f9"`);
    await queryRunner.query(`DROP TABLE "public"."student_brother"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_5f10a55b89edd3be64e9eba090"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_2a80c390439e4c59eae18d6985"`);
    await queryRunner.query(`DROP TABLE "public"."user_role"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_c3547dcbd337c75804e3c8a638"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_74e498650dce789a3d10e2d83d"`);
    await queryRunner.query(`DROP TABLE "public"."user_permission"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_9f1fe263c194586969309cfeaf"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_8372687cc654ea07c0c42f8185"`);
    await queryRunner.query(`DROP TABLE "public"."schedule_employee"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_9c70ee937a27f3ee505793079d"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7756708d8a073f051d02f02a00"`);
    await queryRunner.query(`DROP TABLE "public"."role_permission"`);
    await queryRunner.query(`DROP TABLE "public"."sanction"`);
    await queryRunner.query(`DROP TABLE "public"."access_log"`);
    await queryRunner.query(`DROP TABLE "public"."foul"`);
    await queryRunner.query(`DROP TYPE "fouls_enum"`);
    await queryRunner.query(`DROP TABLE "public"."politic"`);
    await queryRunner.query(`DROP TABLE "public"."period"`);
    await queryRunner.query(`DROP TABLE "public"."image"`);
    await queryRunner.query(`DROP TABLE "public"."grade"`);
    await queryRunner.query(`DROP TABLE "public"."student"`);
    await queryRunner.query(`DROP TYPE "student_status_enum"`);
    await queryRunner.query(`DROP TABLE "public"."responsible_student"`);
    await queryRunner.query(`DROP TYPE "responsible_relationship_enum"`);
    await queryRunner.query(`DROP TABLE "public"."responsible"`);
    await queryRunner.query(`DROP TABLE "public"."request"`);
    await queryRunner.query(`DROP TYPE "request_status_enum"`);
    await queryRunner.query(`DROP TABLE "public"."section_detail"`);
    await queryRunner.query(`DROP TABLE "public"."section"`);
    await queryRunner.query(`DROP TABLE "public"."user"`);
    await queryRunner.query(`DROP TABLE "public"."schedule"`);
    await queryRunner.query(`DROP TYPE "schedule_enum"`);
    await queryRunner.query(`DROP TABLE "public"."cycle_detail"`);
    await queryRunner.query(`DROP TABLE "public"."school_year"`);
    await queryRunner.query(`DROP TYPE "school_year_status_enum"`);
    await queryRunner.query(`DROP TABLE "public"."grade_detail"`);
    await queryRunner.query(`DROP TABLE "public"."shift"`);
    await queryRunner.query(`DROP TABLE "public"."cycle"`);
    await queryRunner.query(`DROP TABLE "public"."action_log"`);
    await queryRunner.query(`DROP TYPE "action_enum"`);
    await queryRunner.query(`DROP TABLE "public"."permission"`);
    await queryRunner.query(`DROP TABLE "public"."role"`);
    await queryRunner.query(`DROP TABLE "public"."token"`);
  }
}
