import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1589185546923 implements MigrationInterface {
  name = 'Migration1589185546923';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "token" ("id" SERIAL NOT NULL, "access_token" character varying(512) NOT NULL, "refresh_token" character varying(512) NOT NULL, "exp" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(32) NOT NULL, "name" character varying(128) NOT NULL, "password" character varying(128) NOT NULL, "email" character varying(128) NOT NULL, "image" character varying(256), "reset_password_token" character varying(512), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_5b494fc54a2e3d122f17b393598" UNIQUE ("reset_password_token"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "permission" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "codename" character varying(64) NOT NULL, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "politic" ("id" SERIAL NOT NULL, "min_length" integer, "capital_letter" boolean, "lower_case" boolean, "special_char" boolean, "numeric_char" boolean, "type_special" character varying(512), CONSTRAINT "PK_91e8af9b343dfec7bfad01167c7" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "user_permission" ("user_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "PK_e55fe6295b438912cb42bce1baa" PRIMARY KEY ("user_id", "permission_id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2305dfa7330dd7f8e211f4f35d" ON "user_permission" ("user_id") `,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8a4d5521c1ced158c13438df3d" ON "user_permission" ("permission_id") `,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "user_role" ("user_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_f634684acb47c1a158b83af5150" PRIMARY KEY ("user_id", "role_id"))`,
      undefined,
    );
    await queryRunner.query(`CREATE INDEX "IDX_d0e5815877f7395a198a4cb0a4" ON "user_role" ("user_id") `, undefined);
    await queryRunner.query(`CREATE INDEX "IDX_32a6fc2fcb019d8e3a8ace0f55" ON "user_role" ("role_id") `, undefined);
    await queryRunner.query(
      `CREATE TABLE "role_permission" ("rol_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "PK_5a41fc65c449f062a1badc53a16" PRIMARY KEY ("rol_id", "permission_id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6aeb0124dc2fd245e560356df5" ON "role_permission" ("rol_id") `,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e3a3ba47b7ca00fd23be4ebd6c" ON "role_permission" ("permission_id") `,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "token" ADD CONSTRAINT "FK_e50ca89d635960fda2ffeb17639" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_permission" ADD CONSTRAINT "FK_2305dfa7330dd7f8e211f4f35d9" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_permission" ADD CONSTRAINT "FK_8a4d5521c1ced158c13438df3df" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD CONSTRAINT "FK_6aeb0124dc2fd245e560356df57" FOREIGN KEY ("rol_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" DROP CONSTRAINT "FK_6aeb0124dc2fd245e560356df57"`,
      undefined,
    );
    await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f"`, undefined);
    await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "user_permission" DROP CONSTRAINT "FK_8a4d5521c1ced158c13438df3df"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_permission" DROP CONSTRAINT "FK_2305dfa7330dd7f8e211f4f35d9"`,
      undefined,
    );
    await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_e50ca89d635960fda2ffeb17639"`, undefined);
    await queryRunner.query(`DROP INDEX "IDX_e3a3ba47b7ca00fd23be4ebd6c"`, undefined);
    await queryRunner.query(`DROP INDEX "IDX_6aeb0124dc2fd245e560356df5"`, undefined);
    await queryRunner.query(`DROP TABLE "role_permission"`, undefined);
    await queryRunner.query(`DROP INDEX "IDX_32a6fc2fcb019d8e3a8ace0f55"`, undefined);
    await queryRunner.query(`DROP INDEX "IDX_d0e5815877f7395a198a4cb0a4"`, undefined);
    await queryRunner.query(`DROP TABLE "user_role"`, undefined);
    await queryRunner.query(`DROP INDEX "IDX_8a4d5521c1ced158c13438df3d"`, undefined);
    await queryRunner.query(`DROP INDEX "IDX_2305dfa7330dd7f8e211f4f35d"`, undefined);
    await queryRunner.query(`DROP TABLE "user_permission"`, undefined);
    await queryRunner.query(`DROP TABLE "politic"`, undefined);
    await queryRunner.query(`DROP TABLE "permission"`, undefined);
    await queryRunner.query(`DROP TABLE "role"`, undefined);
    await queryRunner.query(`DROP TABLE "user"`, undefined);
    await queryRunner.query(`DROP TABLE "token"`, undefined);
  }
}
