import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterSociometricTest1606601365450 implements MigrationInterface {
  name = 'alterSociometricTest1606601365450';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."sociometric_test" DROP CONSTRAINT "FK_67d05a310a83887c77765ea3858"`);
    await queryRunner.query(
      `ALTER TYPE "public"."sociometric_test_status_enum" RENAME TO "sociometric_test_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "sociometric_test_status_enum" AS ENUM('Creada', 'En curso', 'Finalizada', 'Programada')`,
    );
    await queryRunner.query(`ALTER TABLE "public"."sociometric_test" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "public"."sociometric_test" ALTER COLUMN "status" TYPE "sociometric_test_status_enum" USING "status"::"text"::"sociometric_test_status_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "public"."sociometric_test" ALTER COLUMN "status" SET DEFAULT 'Creada'`);
    await queryRunner.query(`DROP TYPE "sociometric_test_status_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "public"."sociometric_test" ADD CONSTRAINT "UQ_67d05a310a83887c77765ea3858" UNIQUE ("section_detail_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."sociometric_test" DROP CONSTRAINT "FK_67d05a310a83887c77765ea3858"`);
    await queryRunner.query(
      `CREATE TYPE "sociometric_test_status_enum_old" AS ENUM('Programada', 'En curso', 'Finalizada')`,
    );
    await queryRunner.query(`ALTER TABLE "public"."sociometric_test" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "public"."sociometric_test" ALTER COLUMN "status" TYPE "sociometric_test_status_enum_old" USING "status"::"text"::"sociometric_test_status_enum_old"`,
    );
    await queryRunner.query(`ALTER TABLE "public"."sociometric_test" ALTER COLUMN "status" SET DEFAULT 'Creada'`);
    await queryRunner.query(`DROP TYPE "public"."sociometric_test_status_enum"`);
    await queryRunner.query(`ALTER TYPE "sociometric_test_status_enum_old" RENAME TO  "sociometric_test_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "public"."sociometric_test" ADD CONSTRAINT "FK_67d05a310a83887c77765ea3858" FOREIGN KEY ("section_detail_id") REFERENCES "public"."section_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
