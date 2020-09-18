import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1593488426592 implements MigrationInterface {
  name = 'migration1593488426592';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" ADD "cycle_id" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" ADD "shift_id" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" ADD "cycle_coordinator_id" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."cycle_detail" ADD CONSTRAINT "FK_2be1ecc783e93eb18da5f7b020d" FOREIGN KEY ("cycle_id") REFERENCES "public"."cycle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."cycle_detail" ADD CONSTRAINT "FK_30f56cd3b97642d640c9e6fdac2" FOREIGN KEY ("shift_id") REFERENCES "public"."shift"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."cycle_detail" ADD CONSTRAINT "FK_1d4ad4478b6ab619ed8d01cb733" FOREIGN KEY ("cycle_coordinator_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" DROP CONSTRAINT "FK_1d4ad4478b6ab619ed8d01cb733"`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" DROP CONSTRAINT "FK_30f56cd3b97642d640c9e6fdac2"`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" DROP CONSTRAINT "FK_2be1ecc783e93eb18da5f7b020d"`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" DROP COLUMN "cycle_coordinator_id"`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" DROP COLUMN "shift_id"`);
    await queryRunner.query(`ALTER TABLE "public"."cycle_detail" DROP COLUMN "cycle_id"`);
  }
}
