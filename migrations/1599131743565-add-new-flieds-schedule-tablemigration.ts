import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1599131743565 implements MigrationInterface {
    name = 'migration1599131743565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "responsible_student" DROP CONSTRAINT "FK_049c7cf3784407d3a85ede0b0d9"`);
        await queryRunner.query(`ALTER TABLE "responsible_student" DROP CONSTRAINT "FK_2de27cdb30225358244ab6f362c"`);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_d0365b2489341b5df137d063d75"`);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_274c32749d7c5cf27a654ea3550"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_6102aef7951e34db370fdad3df2"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_eb58525d2de0eba1d0113c6e349"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_49b4c655ff802c62ab202f208f8"`);
        await queryRunner.query(`ALTER TABLE "cycle_detail" DROP CONSTRAINT "FK_32ab7cb2b4ddb84f419479861e7"`);
        await queryRunner.query(`ALTER TABLE "student_brother" DROP CONSTRAINT "FK_f8f3bcc1837866eea5fe0751f92"`);
        await queryRunner.query(`ALTER TABLE "student_brother" DROP CONSTRAINT "FK_16eb54ba3a1ecc4fc1fe5554c1e"`);
        await queryRunner.query(`ALTER TABLE "student_section_detail" DROP CONSTRAINT "FK_efdb7bba11e9f70472bb495bd2c"`);
        await queryRunner.query(`ALTER TABLE "student_section_detail" DROP CONSTRAINT "FK_59e4e8e420877ffd767cda8177a"`);
        await queryRunner.query(`DROP INDEX "IDX_f8f3bcc1837866eea5fe0751f9"`);
        await queryRunner.query(`DROP INDEX "IDX_16eb54ba3a1ecc4fc1fe5554c1"`);
        await queryRunner.query(`DROP INDEX "IDX_efdb7bba11e9f70472bb495bd2"`);
        await queryRunner.query(`DROP INDEX "IDX_59e4e8e420877ffd767cda8177"`);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "UQ_2b85ab28b34b5af18aa5a4495b7"`);
        await queryRunner.query(`ALTER TABLE "cycle_detail" DROP CONSTRAINT "UQ_378e2e332a13ea37e5546226045"`);
        await queryRunner.query(`CREATE TABLE "schedule" ("id" SERIAL NOT NULL, "day" TIMESTAMP NOT NULL, "start_time" TIMESTAMP WITH TIME ZONE NOT NULL, "end_time" TIMESTAMP WITH TIME ZONE NOT NULL, "description" character varying(128) NOT NULL, "subject" character varying(128) NOT NULL, "recurrent" boolean NOT NULL, "event_type" "schedule_enum" NOT NULL DEFAULT '1', "json_data" json NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "owner_id" integer NOT NULL, "student_id" integer, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedule_employees" ("schedule_event" integer NOT NULL, "employees_id" integer NOT NULL, CONSTRAINT "PK_0fa400f66b57bd9050213bd47cf" PRIMARY KEY ("schedule_event", "employees_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_207c6955ea9beeab8cda85e983" ON "schedule_employees" ("schedule_event") `);
        await queryRunner.query(`CREATE INDEX "IDX_795096906b7edf494ea034530e" ON "schedule_employees" ("employees_id") `);
        await queryRunner.query(`ALTER TYPE "public"."action_enum" RENAME TO "action_enum_old"`);
        await queryRunner.query(`CREATE TYPE "action_enum" AS ENUM('1', '2', '3', '4')`);
        await queryRunner.query(`ALTER TABLE "action_log" ALTER COLUMN "action" TYPE "action_enum" USING "action"::"text"::"action_enum"`);
        await queryRunner.query(`DROP TYPE "action_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."responsible_relationship_enum" RENAME TO "responsible_relationship_enum_old"`);
        await queryRunner.query(`CREATE TYPE "responsible_relationship_enum" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15')`);
        await queryRunner.query(`ALTER TABLE "responsible_student" ALTER COLUMN "relationship" TYPE "responsible_relationship_enum" USING "relationship"::"text"::"responsible_relationship_enum"`);
        await queryRunner.query(`DROP TYPE "responsible_relationship_enum_old"`);
        await queryRunner.query(`CREATE INDEX "IDX_08f95beb1d8d554fec38a36edf" ON "student_brother" ("student_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7971e436dee3dbc42113583fc6" ON "student_brother" ("brother_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_37612891bbafcaa10ef2d04bf0" ON "student_section_detail" ("student_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_8d63b3bdc153e2dea4a07bccfb" ON "student_section_detail" ("section_detail_id") `);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "UQ_a480ea4a3ad8cc986a347219c60" UNIQUE ("student_id", "grade_id")`);
        await queryRunner.query(`ALTER TABLE "cycle_detail" ADD CONSTRAINT "UQ_c404fe2ccc803af67ea81321e8e" UNIQUE ("shift_id", "cycle_coordinator_id")`);
        await queryRunner.query(`ALTER TABLE "responsible_student" ADD CONSTRAINT "FK_0d5775b56ab2ace2e1903fc7d57" FOREIGN KEY ("responsible_id") REFERENCES "responsible"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "responsible_student" ADD CONSTRAINT "FK_38ced5a9bd80e1792de1c5b0252" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_8520d67f724be6a0bd3e13a4092" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_592f7564a2d63ee6ea1f3c096fc" FOREIGN KEY ("grade_id") REFERENCES "grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_f5d8c39de4aacbeffb53f741c79" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_5e661f8a88e71c1604afc8c4ea4" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_e1e1688f801246c60e1d3c1eac0" FOREIGN KEY ("started_grade_id") REFERENCES "grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_4c69e42b28b6bdf2e9809c15b1a" FOREIGN KEY ("current_grade_id") REFERENCES "grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_87e2f4b1a2c5ac38809d31785c4" FOREIGN KEY ("current_shift_id") REFERENCES "shift"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cycle_detail" ADD CONSTRAINT "FK_fc43c761bf97162ab4e5b9a4cf1" FOREIGN KEY ("school_year_id") REFERENCES "school_year"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule_employees" ADD CONSTRAINT "FK_207c6955ea9beeab8cda85e983f" FOREIGN KEY ("schedule_event") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule_employees" ADD CONSTRAINT "FK_795096906b7edf494ea034530e5" FOREIGN KEY ("employees_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_brother" ADD CONSTRAINT "FK_08f95beb1d8d554fec38a36edf2" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_brother" ADD CONSTRAINT "FK_7971e436dee3dbc42113583fc61" FOREIGN KEY ("brother_id") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_section_detail" ADD CONSTRAINT "FK_37612891bbafcaa10ef2d04bf05" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_section_detail" ADD CONSTRAINT "FK_8d63b3bdc153e2dea4a07bccfb2" FOREIGN KEY ("section_detail_id") REFERENCES "section_detail"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_section_detail" DROP CONSTRAINT "FK_8d63b3bdc153e2dea4a07bccfb2"`);
        await queryRunner.query(`ALTER TABLE "student_section_detail" DROP CONSTRAINT "FK_37612891bbafcaa10ef2d04bf05"`);
        await queryRunner.query(`ALTER TABLE "student_brother" DROP CONSTRAINT "FK_7971e436dee3dbc42113583fc61"`);
        await queryRunner.query(`ALTER TABLE "student_brother" DROP CONSTRAINT "FK_08f95beb1d8d554fec38a36edf2"`);
        await queryRunner.query(`ALTER TABLE "schedule_employees" DROP CONSTRAINT "FK_795096906b7edf494ea034530e5"`);
        await queryRunner.query(`ALTER TABLE "schedule_employees" DROP CONSTRAINT "FK_207c6955ea9beeab8cda85e983f"`);
        await queryRunner.query(`ALTER TABLE "cycle_detail" DROP CONSTRAINT "FK_fc43c761bf97162ab4e5b9a4cf1"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_87e2f4b1a2c5ac38809d31785c4"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_4c69e42b28b6bdf2e9809c15b1a"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_e1e1688f801246c60e1d3c1eac0"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_5e661f8a88e71c1604afc8c4ea4"`);
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_f5d8c39de4aacbeffb53f741c79"`);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_592f7564a2d63ee6ea1f3c096fc"`);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_8520d67f724be6a0bd3e13a4092"`);
        await queryRunner.query(`ALTER TABLE "responsible_student" DROP CONSTRAINT "FK_38ced5a9bd80e1792de1c5b0252"`);
        await queryRunner.query(`ALTER TABLE "responsible_student" DROP CONSTRAINT "FK_0d5775b56ab2ace2e1903fc7d57"`);
        await queryRunner.query(`ALTER TABLE "cycle_detail" DROP CONSTRAINT "UQ_c404fe2ccc803af67ea81321e8e"`);
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "UQ_a480ea4a3ad8cc986a347219c60"`);
        await queryRunner.query(`DROP INDEX "IDX_8d63b3bdc153e2dea4a07bccfb"`);
        await queryRunner.query(`DROP INDEX "IDX_37612891bbafcaa10ef2d04bf0"`);
        await queryRunner.query(`DROP INDEX "IDX_7971e436dee3dbc42113583fc6"`);
        await queryRunner.query(`DROP INDEX "IDX_08f95beb1d8d554fec38a36edf"`);
        await queryRunner.query(`CREATE TYPE "responsible_relationship_enum_old" AS ENUM()`);
        await queryRunner.query(`ALTER TABLE "responsible_student" ALTER COLUMN "relationship" TYPE "responsible_relationship_enum_old" USING "relationship"::"text"::"responsible_relationship_enum_old"`);
        await queryRunner.query(`DROP TYPE "responsible_student_relationship_enum"`);
        await queryRunner.query(`ALTER TYPE "responsible_relationship_enum_old" RENAME TO  "responsible_relationship_enum"`);
        await queryRunner.query(`CREATE TYPE "action_enum_old" AS ENUM()`);
        await queryRunner.query(`ALTER TABLE "action_log" ALTER COLUMN "action" TYPE "action_enum_old" USING "action"::"text"::"action_enum_old"`);
        await queryRunner.query(`DROP TYPE "action_log_action_enum"`);
        await queryRunner.query(`ALTER TYPE "action_enum_old" RENAME TO  "action_enum"`);
        await queryRunner.query(`DROP INDEX "IDX_795096906b7edf494ea034530e"`);
        await queryRunner.query(`DROP INDEX "IDX_207c6955ea9beeab8cda85e983"`);
        await queryRunner.query(`DROP TABLE "schedule_employees"`);
        await queryRunner.query(`DROP TABLE "schedule"`);
        await queryRunner.query(`ALTER TABLE "cycle_detail" ADD CONSTRAINT "UQ_378e2e332a13ea37e5546226045" UNIQUE ("shift_id", "cycle_coordinator_id")`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "UQ_2b85ab28b34b5af18aa5a4495b7" UNIQUE ("student_id", "grade_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_59e4e8e420877ffd767cda8177" ON "student_section_detail" ("section_detail_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_efdb7bba11e9f70472bb495bd2" ON "student_section_detail" ("student_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_16eb54ba3a1ecc4fc1fe5554c1" ON "student_brother" ("brother_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f8f3bcc1837866eea5fe0751f9" ON "student_brother" ("student_id") `);
        await queryRunner.query(`ALTER TABLE "student_section_detail" ADD CONSTRAINT "FK_59e4e8e420877ffd767cda8177a" FOREIGN KEY ("section_detail_id") REFERENCES "section_detail"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_section_detail" ADD CONSTRAINT "FK_efdb7bba11e9f70472bb495bd2c" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_brother" ADD CONSTRAINT "FK_16eb54ba3a1ecc4fc1fe5554c1e" FOREIGN KEY ("brother_id") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_brother" ADD CONSTRAINT "FK_f8f3bcc1837866eea5fe0751f92" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cycle_detail" ADD CONSTRAINT "FK_32ab7cb2b4ddb84f419479861e7" FOREIGN KEY ("school_year_id") REFERENCES "school_year"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_49b4c655ff802c62ab202f208f8" FOREIGN KEY ("current_shift_id") REFERENCES "shift"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_eb58525d2de0eba1d0113c6e349" FOREIGN KEY ("current_grade_id") REFERENCES "grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_6102aef7951e34db370fdad3df2" FOREIGN KEY ("started_grade_id") REFERENCES "grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_274c32749d7c5cf27a654ea3550" FOREIGN KEY ("grade_id") REFERENCES "grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_d0365b2489341b5df137d063d75" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "responsible_student" ADD CONSTRAINT "FK_2de27cdb30225358244ab6f362c" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "responsible_student" ADD CONSTRAINT "FK_049c7cf3784407d3a85ede0b0d9" FOREIGN KEY ("responsible_id") REFERENCES "responsible"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
