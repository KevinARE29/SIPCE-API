import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1596418367844 implements MigrationInterface {
  name = 'migration1596418367844';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TYPE "public"."student_status_enum" RENAME TO "student_status_enum_old"`);
    await queryRunner.query(`CREATE TYPE "student_status_enum" AS ENUM('1', '2', '3', '4', '5', '6', '7')`);
    await queryRunner.query(`ALTER TABLE "public"."student" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "public"."student" ALTER COLUMN "status" TYPE "student_status_enum" USING "status"::"text"::"student_status_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "public"."student" ALTER COLUMN "status" SET DEFAULT '1'`);
    await queryRunner.query(`DROP TYPE "student_status_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "student_status_enum_old" AS ENUM('1', '2', '3', '4', '5', '6')`);
    await queryRunner.query(`ALTER TABLE "public"."student" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "public"."student" ALTER COLUMN "status" TYPE "student_status_enum_old" USING "status"::"text"::"student_status_enum_old"`,
    );
    await queryRunner.query(`ALTER TABLE "public"."student" ALTER COLUMN "status" SET DEFAULT '1'`);
    await queryRunner.query(`DROP TYPE "public"."student_status_enum"`);
    await queryRunner.query(`ALTER TYPE "student_status_enum_old" RENAME TO  "student_status_enum"`);
  }
}
