import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1593937247359 implements MigrationInterface {
  name = 'migration1593937247359';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."grade_detail" DROP CONSTRAINT "FK_6bf8b017ab9e3222506d429640e"`);
    await queryRunner.query(`ALTER TABLE "public"."grade_detail" ALTER COLUMN "counselor_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" DROP CONSTRAINT "FK_1d4ad4478b6ab619ed8d01cb733"`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" DROP CONSTRAINT "UQ_a058a7336d5ceb0412c069c3115"`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" ALTER COLUMN "cycle_coordinator_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."cycle_detail" ADD CONSTRAINT "UQ_a058a7336d5ceb0412c069c3115" UNIQUE ("year", "shift_id", "cycle_coordinator_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."grade_detail" ADD CONSTRAINT "FK_6bf8b017ab9e3222506d429640e" FOREIGN KEY ("counselor_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."cycle_detail" ADD CONSTRAINT "FK_1d4ad4478b6ab619ed8d01cb733" FOREIGN KEY ("cycle_coordinator_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" DROP CONSTRAINT "FK_1d4ad4478b6ab619ed8d01cb733"`);
    await queryRunner.query(`ALTER TABLE "public"."grade_detail" DROP CONSTRAINT "FK_6bf8b017ab9e3222506d429640e"`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" DROP CONSTRAINT "UQ_a058a7336d5ceb0412c069c3115"`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" ALTER COLUMN "cycle_coordinator_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."cycle_detail" ADD CONSTRAINT "UQ_a058a7336d5ceb0412c069c3115" UNIQUE ("year", "shift_id", "cycle_coordinator_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."cycle_detail" ADD CONSTRAINT "FK_1d4ad4478b6ab619ed8d01cb733" FOREIGN KEY ("cycle_coordinator_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "public"."grade_detail" ALTER COLUMN "counselor_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."grade_detail" ADD CONSTRAINT "FK_6bf8b017ab9e3222506d429640e" FOREIGN KEY ("counselor_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
