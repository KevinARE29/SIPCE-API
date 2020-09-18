import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1595226738146 implements MigrationInterface {
  name = 'migration1595226738146';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" DROP CONSTRAINT "UQ_ebe0f35f1a6437c4aee50780f3b"`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" RENAME COLUMN "year" TO "school_year_id"`);
    await queryRunner.query(`CREATE TYPE "school_year_status_enum" AS ENUM('1', '2', '3')`);
    await queryRunner.query(
      `CREATE TABLE "public"."school_year" ("id" SERIAL NOT NULL, "year" smallint NOT NULL, "status" "school_year_status_enum" NOT NULL DEFAULT '1', "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "close_date" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_7c1c38623db46f9cd6ee0198e17" UNIQUE ("year"), CONSTRAINT "PK_ddb6baea3047f318507caf2b1cf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "public"."student" ADD "current_grade_id" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" DROP COLUMN "school_year_id"`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" ADD "school_year_id" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."cycle_detail" ADD CONSTRAINT "UQ_378e2e332a13ea37e5546226045" UNIQUE ("shift_id", "cycle_coordinator_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."student" ADD CONSTRAINT "FK_eb58525d2de0eba1d0113c6e349" FOREIGN KEY ("current_grade_id") REFERENCES "public"."grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."cycle_detail" ADD CONSTRAINT "FK_32ab7cb2b4ddb84f419479861e7" FOREIGN KEY ("school_year_id") REFERENCES "public"."school_year"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" DROP CONSTRAINT "FK_32ab7cb2b4ddb84f419479861e7"`);
    await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "FK_eb58525d2de0eba1d0113c6e349"`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" DROP CONSTRAINT "UQ_378e2e332a13ea37e5546226045"`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" DROP COLUMN "school_year_id"`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" ADD "school_year_id" smallint NOT NULL`);
    await queryRunner.query(`ALTER TABLE "public"."student" DROP COLUMN "current_grade_id"`);
    await queryRunner.query(`DROP TABLE "public"."school_year"`);
    await queryRunner.query(`DROP TYPE "school_year_status_enum"`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" RENAME COLUMN "school_year_id" TO "year"`);
    await queryRunner.query(
      `ALTER TABLE "public"."cycle_detail" ADD CONSTRAINT "UQ_ebe0f35f1a6437c4aee50780f3b" UNIQUE ("year", "shift_id", "cycle_coordinator_id")`,
    );
  }
}
