import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterFoulsTable1604381621287 implements MigrationInterface {
  name = 'alterFoulsTable1604381621287';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."schedule_employee" DROP CONSTRAINT "FK_e0d1d8ad8f65a30090d52790a5c"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_e0d1d8ad8f65a30090d52790a5"`);
    await queryRunner.query(`ALTER TABLE fouls RENAME TO foul;`);
    await queryRunner.query(
      `CREATE INDEX "IDX_9f1fe263c194586969309cfeaf" ON "public"."schedule_employee" ("employee_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."request" ADD CONSTRAINT "FK_9a4adcb443d618d44bb326561b8" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."schedule_employee" ADD CONSTRAINT "FK_9f1fe263c194586969309cfeaf6" FOREIGN KEY ("employee_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."schedule_employee" DROP CONSTRAINT "FK_9f1fe263c194586969309cfeaf6"`,
    );
    await queryRunner.query(`ALTER TABLE "public"."request" DROP CONSTRAINT "FK_9a4adcb443d618d44bb326561b8"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_9f1fe263c194586969309cfeaf"`);
    await queryRunner.query(`ALTER TABLE foul RENAME TO fouls;`);
    await queryRunner.query(
      `CREATE INDEX "IDX_e0d1d8ad8f65a30090d52790a5" ON "public"."schedule_employee" ("employee_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."schedule_employee" ADD CONSTRAINT "FK_e0d1d8ad8f65a30090d52790a5c" FOREIGN KEY ("employee_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
