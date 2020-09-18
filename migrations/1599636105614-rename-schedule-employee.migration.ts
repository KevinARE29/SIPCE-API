import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1599636105614 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."schedule_employees" RENAME TO "schedule_employee";`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."schedule_employee" RENAME TO "schedule_employees";`);
  }
}
