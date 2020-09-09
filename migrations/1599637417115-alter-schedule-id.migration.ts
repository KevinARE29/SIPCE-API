import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1599637417115 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."schedule_employee" DROP CONSTRAINT "FK_5959a211c75640f964af2b9c2be"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_5959a211c75640f964af2b9c2b"`);
    await queryRunner.query(`ALTER TABLE "public"."schedule_employee" RENAME COLUMN "schedule_event" TO "schedule_id"`);
    await queryRunner.query(
      `ALTER TABLE "public"."schedule_employee" RENAME CONSTRAINT "PK_0fa400f66b57bd9050213bd47cf" TO "PK_fb7954c812973eeb38a651e7ee9"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8372687cc654ea07c0c42f8185" ON "public"."schedule_employee" ("schedule_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."schedule_employee" ADD CONSTRAINT "FK_8372687cc654ea07c0c42f8185d" FOREIGN KEY ("schedule_id") REFERENCES "public"."schedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."schedule_employee" DROP CONSTRAINT "FK_8372687cc654ea07c0c42f8185d"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_8372687cc654ea07c0c42f8185"`);
    await queryRunner.query(
      `ALTER TABLE "public"."schedule_employee" RENAME CONSTRAINT "PK_fb7954c812973eeb38a651e7ee9" TO "PK_6495736e91505da986ab49fac44"`,
    );
    await queryRunner.query(`ALTER TABLE "public"."schedule_employee" RENAME COLUMN "schedule_id" TO "schedule_event"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_5959a211c75640f964af2b9c2b" ON "public"."schedule_employee" ("schedule_event") `,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."schedule_employee" ADD CONSTRAINT "FK_5959a211c75640f964af2b9c2be" FOREIGN KEY ("schedule_event") REFERENCES "public"."schedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
