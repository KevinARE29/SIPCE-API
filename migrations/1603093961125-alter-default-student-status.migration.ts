import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterDefaultStudentStatus1603093961125 implements MigrationInterface {
  name = 'alterDefaultStudentStatus1603093961125';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."student" ALTER COLUMN "status" SET DEFAULT '2'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."student" ALTER COLUMN "status" SET DEFAULT '1'`);
  }
}
