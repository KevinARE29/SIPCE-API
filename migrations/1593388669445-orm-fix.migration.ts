import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1593388669445 implements MigrationInterface {
  name = 'migration1593388669445';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."token" DROP CONSTRAINT "FK_e50ca89d635960fda2ffeb17639"`);
    await queryRunner.query(`ALTER TABLE "public"."action_log" DROP CONSTRAINT "FK_41fd8dd9fe8eb3283842692aba9"`);
    await queryRunner.query(`ALTER TABLE "public"."role_permission" DROP CONSTRAINT "FK_6aeb0124dc2fd245e560356df57"`);
    await queryRunner.query(`ALTER TABLE "public"."role_permission" DROP CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf"`);
    await queryRunner.query(`ALTER TABLE "public"."user_permission" DROP CONSTRAINT "FK_2305dfa7330dd7f8e211f4f35d9"`);
    await queryRunner.query(`ALTER TABLE "public"."user_permission" DROP CONSTRAINT "FK_8a4d5521c1ced158c13438df3df"`);
    await queryRunner.query(`ALTER TABLE "public"."user_role" DROP CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46"`);
    await queryRunner.query(`ALTER TABLE "public"."user_role" DROP CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_6aeb0124dc2fd245e560356df5"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_e3a3ba47b7ca00fd23be4ebd6c"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_2305dfa7330dd7f8e211f4f35d"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_8a4d5521c1ced158c13438df3d"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_d0e5815877f7395a198a4cb0a4"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_32a6fc2fcb019d8e3a8ace0f55"`);
    await queryRunner.query(
      `CREATE TABLE "public"."cycle_detail" ("id" SERIAL NOT NULL, "year" smallint NOT NULL, CONSTRAINT "PK_413b811d30c0326de9baf92f1c0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "image"`);
    await queryRunner.query(`ALTER TABLE "public"."user" ADD "firstname" character varying(128) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "public"."user" ADD "lastname" character varying(128) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "public"."user" ADD "active" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(`CREATE INDEX "IDX_7756708d8a073f051d02f02a00" ON "public"."role_permission" ("rol_id") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_9c70ee937a27f3ee505793079d" ON "public"."role_permission" ("permission_id") `,
    );
    await queryRunner.query(`CREATE INDEX "IDX_74e498650dce789a3d10e2d83d" ON "public"."user_permission" ("user_id") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_c3547dcbd337c75804e3c8a638" ON "public"."user_permission" ("permission_id") `,
    );
    await queryRunner.query(`CREATE INDEX "IDX_2a80c390439e4c59eae18d6985" ON "public"."user_role" ("user_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_5f10a55b89edd3be64e9eba090" ON "public"."user_role" ("role_id") `);
    await queryRunner.query(
      `ALTER TABLE "public"."token" ADD CONSTRAINT "FK_f4ba45b8d9cdd3cb3eda872ebe8" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."action_log" ADD CONSTRAINT "FK_765fe345f0982e1ae223ffa20ab" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."role_permission" ADD CONSTRAINT "FK_7756708d8a073f051d02f02a00b" FOREIGN KEY ("rol_id") REFERENCES "public"."role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."role_permission" ADD CONSTRAINT "FK_9c70ee937a27f3ee505793079dc" FOREIGN KEY ("permission_id") REFERENCES "public"."permission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."user_role" DROP CONSTRAINT "FK_5f10a55b89edd3be64e9eba0906"`);
    await queryRunner.query(`ALTER TABLE "public"."user_role" DROP CONSTRAINT "FK_2a80c390439e4c59eae18d69854"`);
    await queryRunner.query(`ALTER TABLE "public"."user_permission" DROP CONSTRAINT "FK_c3547dcbd337c75804e3c8a6389"`);
    await queryRunner.query(`ALTER TABLE "public"."user_permission" DROP CONSTRAINT "FK_74e498650dce789a3d10e2d83d2"`);
    await queryRunner.query(`ALTER TABLE "public"."role_permission" DROP CONSTRAINT "FK_9c70ee937a27f3ee505793079dc"`);
    await queryRunner.query(`ALTER TABLE "public"."role_permission" DROP CONSTRAINT "FK_7756708d8a073f051d02f02a00b"`);
    await queryRunner.query(`ALTER TABLE "public"."action_log" DROP CONSTRAINT "FK_765fe345f0982e1ae223ffa20ab"`);
    await queryRunner.query(`ALTER TABLE "public"."token" DROP CONSTRAINT "FK_f4ba45b8d9cdd3cb3eda872ebe8"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_5f10a55b89edd3be64e9eba090"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_2a80c390439e4c59eae18d6985"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_c3547dcbd337c75804e3c8a638"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_74e498650dce789a3d10e2d83d"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_9c70ee937a27f3ee505793079d"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_7756708d8a073f051d02f02a00"`);
    await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "active"`);
    await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "lastname"`);
    await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "firstname"`);
    await queryRunner.query(`ALTER TABLE "public"."user" ADD "image" character varying(256)`);
    await queryRunner.query(`ALTER TABLE "public"."user" ADD "name" character varying(128) NOT NULL`);
    await queryRunner.query(`DROP TABLE "public"."cycle_detail"`);
    await queryRunner.query(`CREATE INDEX "IDX_32a6fc2fcb019d8e3a8ace0f55" ON "public"."user_role" ("role_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_d0e5815877f7395a198a4cb0a4" ON "public"."user_role" ("user_id") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_8a4d5521c1ced158c13438df3d" ON "public"."user_permission" ("permission_id") `,
    );
    await queryRunner.query(`CREATE INDEX "IDX_2305dfa7330dd7f8e211f4f35d" ON "public"."user_permission" ("user_id") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_e3a3ba47b7ca00fd23be4ebd6c" ON "public"."role_permission" ("permission_id") `,
    );
    await queryRunner.query(`CREATE INDEX "IDX_6aeb0124dc2fd245e560356df5" ON "public"."role_permission" ("rol_id") `);
    await queryRunner.query(
      `ALTER TABLE "public"."user_role" ADD CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_role" ADD CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_permission" ADD CONSTRAINT "FK_8a4d5521c1ced158c13438df3df" FOREIGN KEY ("permission_id") REFERENCES "public"."permission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_permission" ADD CONSTRAINT "FK_2305dfa7330dd7f8e211f4f35d9" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."role_permission" ADD CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf" FOREIGN KEY ("permission_id") REFERENCES "public"."permission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."role_permission" ADD CONSTRAINT "FK_6aeb0124dc2fd245e560356df57" FOREIGN KEY ("rol_id") REFERENCES "public"."role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."action_log" ADD CONSTRAINT "FK_41fd8dd9fe8eb3283842692aba9" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."token" ADD CONSTRAINT "FK_e50ca89d635960fda2ffeb17639" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
