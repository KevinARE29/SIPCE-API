import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSanctionModel1603873399992 implements MigrationInterface {
  name = 'addSanctionModel1603873399992';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sanction" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "description" character varying(256) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_c49943418cbf72748bddf4cf279" UNIQUE ("name"), CONSTRAINT "PK_8e0d7d8cef573a237bb11a61c8a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "sanction"`);
  }
}
