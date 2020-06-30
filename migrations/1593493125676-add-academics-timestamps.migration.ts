import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1593493125676 implements MigrationInterface {
  name = 'migration1593493125676';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."grade" ADD "active" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(
      `ALTER TABLE "public"."grade" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."grade" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."section" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."section" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "public"."section" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
    await queryRunner.query(
      `ALTER TABLE "public"."section_detail" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."section_detail" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."grade_detail" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."grade_detail" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."cycle" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."cycle" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "public"."cycle" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
    await queryRunner.query(`ALTER TABLE "public"."shift" ADD "active" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(
      `ALTER TABLE "public"."shift" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."shift" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."cycle_detail" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."cycle_detail" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."period" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."period" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."period" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "public"."period" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "public"."shift" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "public"."shift" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "public"."shift" DROP COLUMN "active"`);
    await queryRunner.query(`ALTER TABLE "public"."cycle" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "public"."cycle" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "public"."cycle" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "public"."grade_detail" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "public"."grade_detail" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "public"."section_detail" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "public"."section_detail" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "public"."section" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "public"."section" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "public"."section" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "public"."grade" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "public"."grade" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "public"."grade" DROP COLUMN "active"`);
  }
}
