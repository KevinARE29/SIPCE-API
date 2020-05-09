import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1589003319659 implements MigrationInterface {
  name = 'Migration1589003319659';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "token" ("id" SERIAL NOT NULL, "access_token" character varying(512) NOT NULL, "refresh_token" character varying(512) NOT NULL, "exp" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(32) NOT NULL, "name" character varying(128) NOT NULL, "email" character varying(128) NOT NULL, "image" character varying(256), "resetPasswordToken" character varying(512) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_6699b8457beeaf928125b348e81" UNIQUE ("resetPasswordToken"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "user_permissions_permission" ("userId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_8dd49853fbad35f9a0f91b11877" PRIMARY KEY ("userId", "permissionId"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5b72d197d92b8bafbe7906782e" ON "user_permissions_permission" ("userId") `,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c43a6a56e3ef281cbfba9a7745" ON "user_permissions_permission" ("permissionId") `,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles_role" ("userId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_b47cd6c84ee205ac5a713718292" PRIMARY KEY ("userId", "roleId"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `,
      undefined,
    );
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "name"`, undefined);
    await queryRunner.query(`ALTER TABLE "role" ADD "name" character varying(64) NOT NULL`, undefined);
    await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "name"`, undefined);
    await queryRunner.query(`ALTER TABLE "permission" ADD "name" character varying(128) NOT NULL`, undefined);
    await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "codeName"`, undefined);
    await queryRunner.query(`ALTER TABLE "permission" ADD "codeName" character varying(64) NOT NULL`, undefined);
    await queryRunner.query(
      `ALTER TABLE "token" ADD CONSTRAINT "FK_94f168faad896c0786646fa3d4a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_permissions_permission" ADD CONSTRAINT "FK_5b72d197d92b8bafbe7906782ec" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_permissions_permission" ADD CONSTRAINT "FK_c43a6a56e3ef281cbfba9a77457" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_5f9286e6c25594c6b88c108db77" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_4be2f7adf862634f5f803d246b8"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_5f9286e6c25594c6b88c108db77"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_permissions_permission" DROP CONSTRAINT "FK_c43a6a56e3ef281cbfba9a77457"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_permissions_permission" DROP CONSTRAINT "FK_5b72d197d92b8bafbe7906782ec"`,
      undefined,
    );
    await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_94f168faad896c0786646fa3d4a"`, undefined);
    await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "codeName"`, undefined);
    await queryRunner.query(`ALTER TABLE "permission" ADD "codeName" character varying(63) NOT NULL`, undefined);
    await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "name"`, undefined);
    await queryRunner.query(`ALTER TABLE "permission" ADD "name" character varying(127) NOT NULL`, undefined);
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "name"`, undefined);
    await queryRunner.query(`ALTER TABLE "role" ADD "name" character varying(63) NOT NULL`, undefined);
    await queryRunner.query(`DROP INDEX "IDX_4be2f7adf862634f5f803d246b"`, undefined);
    await queryRunner.query(`DROP INDEX "IDX_5f9286e6c25594c6b88c108db7"`, undefined);
    await queryRunner.query(`DROP TABLE "user_roles_role"`, undefined);
    await queryRunner.query(`DROP INDEX "IDX_c43a6a56e3ef281cbfba9a7745"`, undefined);
    await queryRunner.query(`DROP INDEX "IDX_5b72d197d92b8bafbe7906782e"`, undefined);
    await queryRunner.query(`DROP TABLE "user_permissions_permission"`, undefined);
    await queryRunner.query(`DROP TABLE "user"`, undefined);
    await queryRunner.query(`DROP TABLE "token"`, undefined);
  }
}
