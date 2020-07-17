import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1594874040775 implements MigrationInterface {
  name = 'migration1594874040775';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_f4ba45b8d9cdd3cb3eda872ebe8"`);
    await queryRunner.query(`ALTER TABLE "action_log" DROP CONSTRAINT "FK_765fe345f0982e1ae223ffa20ab"`);
    await queryRunner.query(`ALTER TABLE "section_detail" DROP CONSTRAINT "FK_85e903a09183693195c0c898c64"`);
    await queryRunner.query(`ALTER TABLE "section_detail" DROP CONSTRAINT "FK_54c88af7a2cc9e3923d116858f7"`);
    await queryRunner.query(`ALTER TABLE "section_detail" DROP CONSTRAINT "FK_c7184c2a0dad2d981a58c956676"`);
    await queryRunner.query(`ALTER TABLE "grade_detail" DROP CONSTRAINT "FK_6bf8b017ab9e3222506d429640e"`);
    await queryRunner.query(`ALTER TABLE "grade_detail" DROP CONSTRAINT "FK_27b0a94453fbe63690672710170"`);
    await queryRunner.query(`ALTER TABLE "grade_detail" DROP CONSTRAINT "FK_c8234e0642e4270e5fdcf3841e0"`);
    await queryRunner.query(`ALTER TABLE "cycle_detail" DROP CONSTRAINT "FK_1d4ad4478b6ab619ed8d01cb733"`);
    await queryRunner.query(`ALTER TABLE "cycle_detail" DROP CONSTRAINT "FK_2be1ecc783e93eb18da5f7b020d"`);
    await queryRunner.query(`ALTER TABLE "cycle_detail" DROP CONSTRAINT "FK_30f56cd3b97642d640c9e6fdac2"`);
    await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_7756708d8a073f051d02f02a00b"`);
    await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_9c70ee937a27f3ee505793079dc"`);
    await queryRunner.query(`ALTER TABLE "user_permission" DROP CONSTRAINT "FK_74e498650dce789a3d10e2d83d2"`);
    await queryRunner.query(`ALTER TABLE "user_permission" DROP CONSTRAINT "FK_c3547dcbd337c75804e3c8a6389"`);
    await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_2a80c390439e4c59eae18d69854"`);
    await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_5f10a55b89edd3be64e9eba0906"`);
    await queryRunner.query(`DROP INDEX "IDX_7756708d8a073f051d02f02a00"`);
    await queryRunner.query(`DROP INDEX "IDX_9c70ee937a27f3ee505793079d"`);
    await queryRunner.query(`DROP INDEX "IDX_74e498650dce789a3d10e2d83d"`);
    await queryRunner.query(`DROP INDEX "IDX_c3547dcbd337c75804e3c8a638"`);
    await queryRunner.query(`DROP INDEX "IDX_2a80c390439e4c59eae18d6985"`);
    await queryRunner.query(`DROP INDEX "IDX_5f10a55b89edd3be64e9eba090"`);
    await queryRunner.query(`ALTER TABLE "cycle_detail" DROP CONSTRAINT "UQ_a058a7336d5ceb0412c069c3115"`);
    await queryRunner.query(`ALTER TABLE "period" ADD "active" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(`ALTER TYPE "public"."action_enum" RENAME TO "action_enum_old"`);
    await queryRunner.query(`CREATE TYPE "action_enum" AS ENUM('1', '2', '3', '4')`);
    await queryRunner.query(
      `ALTER TABLE "action_log" ALTER COLUMN "action" TYPE "action_enum" USING "action"::"text"::"action_enum"`,
    );
    await queryRunner.query(`DROP TYPE "action_enum_old"`);
    await queryRunner.query(`CREATE INDEX "IDX_6aeb0124dc2fd245e560356df5" ON "role_permission" ("rol_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_e3a3ba47b7ca00fd23be4ebd6c" ON "role_permission" ("permission_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_2305dfa7330dd7f8e211f4f35d" ON "user_permission" ("user_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_8a4d5521c1ced158c13438df3d" ON "user_permission" ("permission_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_d0e5815877f7395a198a4cb0a4" ON "user_role" ("user_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_32a6fc2fcb019d8e3a8ace0f55" ON "user_role" ("role_id") `);
    await queryRunner.query(
      `ALTER TABLE "cycle_detail" ADD CONSTRAINT "UQ_ebe0f35f1a6437c4aee50780f3b" UNIQUE ("year", "shift_id", "cycle_coordinator_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "token" ADD CONSTRAINT "FK_e50ca89d635960fda2ffeb17639" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "action_log" ADD CONSTRAINT "FK_41fd8dd9fe8eb3283842692aba9" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "section_detail" ADD CONSTRAINT "FK_b64213fd56e36d83f24981f6f76" FOREIGN KEY ("section_id") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "section_detail" ADD CONSTRAINT "FK_b6efba5613c2f52c3665ea96e20" FOREIGN KEY ("grade_detail_id") REFERENCES "grade_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "section_detail" ADD CONSTRAINT "FK_6c633eb1e0690eb7985db1c6759" FOREIGN KEY ("teacher_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade_detail" ADD CONSTRAINT "FK_cb3e1539df0fb0226f8702abda3" FOREIGN KEY ("grade_id") REFERENCES "grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade_detail" ADD CONSTRAINT "FK_d97cd1137b861be080bb1fb8a16" FOREIGN KEY ("cycle_detail_id") REFERENCES "cycle_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade_detail" ADD CONSTRAINT "FK_803863908f42945657896d1e75a" FOREIGN KEY ("counselor_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cycle_detail" ADD CONSTRAINT "FK_415f3a9e6761de76a58c83a4bc1" FOREIGN KEY ("cycle_id") REFERENCES "cycle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cycle_detail" ADD CONSTRAINT "FK_cb4a21961452043d48fcc601bd0" FOREIGN KEY ("shift_id") REFERENCES "shift"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cycle_detail" ADD CONSTRAINT "FK_54c9ba3e3f5ab56cb9644dc7db5" FOREIGN KEY ("cycle_coordinator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD CONSTRAINT "FK_6aeb0124dc2fd245e560356df57" FOREIGN KEY ("rol_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_permission" ADD CONSTRAINT "FK_2305dfa7330dd7f8e211f4f35d9" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_permission" ADD CONSTRAINT "FK_8a4d5521c1ced158c13438df3df" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f"`);
    await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46"`);
    await queryRunner.query(`ALTER TABLE "user_permission" DROP CONSTRAINT "FK_8a4d5521c1ced158c13438df3df"`);
    await queryRunner.query(`ALTER TABLE "user_permission" DROP CONSTRAINT "FK_2305dfa7330dd7f8e211f4f35d9"`);
    await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf"`);
    await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_6aeb0124dc2fd245e560356df57"`);
    await queryRunner.query(`ALTER TABLE "cycle_detail" DROP CONSTRAINT "FK_54c9ba3e3f5ab56cb9644dc7db5"`);
    await queryRunner.query(`ALTER TABLE "cycle_detail" DROP CONSTRAINT "FK_cb4a21961452043d48fcc601bd0"`);
    await queryRunner.query(`ALTER TABLE "cycle_detail" DROP CONSTRAINT "FK_415f3a9e6761de76a58c83a4bc1"`);
    await queryRunner.query(`ALTER TABLE "grade_detail" DROP CONSTRAINT "FK_803863908f42945657896d1e75a"`);
    await queryRunner.query(`ALTER TABLE "grade_detail" DROP CONSTRAINT "FK_d97cd1137b861be080bb1fb8a16"`);
    await queryRunner.query(`ALTER TABLE "grade_detail" DROP CONSTRAINT "FK_cb3e1539df0fb0226f8702abda3"`);
    await queryRunner.query(`ALTER TABLE "section_detail" DROP CONSTRAINT "FK_6c633eb1e0690eb7985db1c6759"`);
    await queryRunner.query(`ALTER TABLE "section_detail" DROP CONSTRAINT "FK_b6efba5613c2f52c3665ea96e20"`);
    await queryRunner.query(`ALTER TABLE "section_detail" DROP CONSTRAINT "FK_b64213fd56e36d83f24981f6f76"`);
    await queryRunner.query(`ALTER TABLE "action_log" DROP CONSTRAINT "FK_41fd8dd9fe8eb3283842692aba9"`);
    await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_e50ca89d635960fda2ffeb17639"`);
    await queryRunner.query(`ALTER TABLE "cycle_detail" DROP CONSTRAINT "UQ_ebe0f35f1a6437c4aee50780f3b"`);
    await queryRunner.query(`DROP INDEX "IDX_32a6fc2fcb019d8e3a8ace0f55"`);
    await queryRunner.query(`DROP INDEX "IDX_d0e5815877f7395a198a4cb0a4"`);
    await queryRunner.query(`DROP INDEX "IDX_8a4d5521c1ced158c13438df3d"`);
    await queryRunner.query(`DROP INDEX "IDX_2305dfa7330dd7f8e211f4f35d"`);
    await queryRunner.query(`DROP INDEX "IDX_e3a3ba47b7ca00fd23be4ebd6c"`);
    await queryRunner.query(`DROP INDEX "IDX_6aeb0124dc2fd245e560356df5"`);
    await queryRunner.query(`CREATE TYPE "action_enum_old" AS ENUM()`);
    await queryRunner.query(
      `ALTER TABLE "action_log" ALTER COLUMN "action" TYPE "action_enum_old" USING "action"::"text"::"action_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "action_log_action_enum"`);
    await queryRunner.query(`ALTER TYPE "action_enum_old" RENAME TO  "action_enum"`);
    await queryRunner.query(`ALTER TABLE "period" DROP COLUMN "active"`);
    await queryRunner.query(
      `ALTER TABLE "cycle_detail" ADD CONSTRAINT "UQ_a058a7336d5ceb0412c069c3115" UNIQUE ("year", "shift_id", "cycle_coordinator_id")`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_5f10a55b89edd3be64e9eba090" ON "user_role" ("role_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_2a80c390439e4c59eae18d6985" ON "user_role" ("user_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_c3547dcbd337c75804e3c8a638" ON "user_permission" ("permission_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_74e498650dce789a3d10e2d83d" ON "user_permission" ("user_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_9c70ee937a27f3ee505793079d" ON "role_permission" ("permission_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_7756708d8a073f051d02f02a00" ON "role_permission" ("rol_id") `);
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_5f10a55b89edd3be64e9eba0906" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_2a80c390439e4c59eae18d69854" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_permission" ADD CONSTRAINT "FK_c3547dcbd337c75804e3c8a6389" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_permission" ADD CONSTRAINT "FK_74e498650dce789a3d10e2d83d2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD CONSTRAINT "FK_9c70ee937a27f3ee505793079dc" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD CONSTRAINT "FK_7756708d8a073f051d02f02a00b" FOREIGN KEY ("rol_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cycle_detail" ADD CONSTRAINT "FK_30f56cd3b97642d640c9e6fdac2" FOREIGN KEY ("shift_id") REFERENCES "shift"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cycle_detail" ADD CONSTRAINT "FK_2be1ecc783e93eb18da5f7b020d" FOREIGN KEY ("cycle_id") REFERENCES "cycle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cycle_detail" ADD CONSTRAINT "FK_1d4ad4478b6ab619ed8d01cb733" FOREIGN KEY ("cycle_coordinator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade_detail" ADD CONSTRAINT "FK_c8234e0642e4270e5fdcf3841e0" FOREIGN KEY ("cycle_detail_id") REFERENCES "cycle_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade_detail" ADD CONSTRAINT "FK_27b0a94453fbe63690672710170" FOREIGN KEY ("grade_id") REFERENCES "grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "grade_detail" ADD CONSTRAINT "FK_6bf8b017ab9e3222506d429640e" FOREIGN KEY ("counselor_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "section_detail" ADD CONSTRAINT "FK_c7184c2a0dad2d981a58c956676" FOREIGN KEY ("grade_detail_id") REFERENCES "grade_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "section_detail" ADD CONSTRAINT "FK_54c88af7a2cc9e3923d116858f7" FOREIGN KEY ("section_id") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "section_detail" ADD CONSTRAINT "FK_85e903a09183693195c0c898c64" FOREIGN KEY ("teacher_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "action_log" ADD CONSTRAINT "FK_765fe345f0982e1ae223ffa20ab" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "token" ADD CONSTRAINT "FK_f4ba45b8d9cdd3cb3eda872ebe8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
