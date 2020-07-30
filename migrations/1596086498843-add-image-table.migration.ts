import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1596086498843 implements MigrationInterface {
  name = 'migration1596086498843';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."image" ("id" SERIAL NOT NULL, "path" character varying(128) NOT NULL, "student_id" integer NOT NULL, "grade_id" integer NOT NULL, CONSTRAINT "UQ_2b85ab28b34b5af18aa5a4495b7" UNIQUE ("student_id", "grade_id"), CONSTRAINT "PK_4bac01d707d8500722ea10a85a3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."image" ADD CONSTRAINT "FK_d0365b2489341b5df137d063d75" FOREIGN KEY ("student_id") REFERENCES "public"."student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."image" ADD CONSTRAINT "FK_274c32749d7c5cf27a654ea3550" FOREIGN KEY ("grade_id") REFERENCES "public"."grade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."image" DROP CONSTRAINT "FK_274c32749d7c5cf27a654ea3550"`);
    await queryRunner.query(`ALTER TABLE "public"."image" DROP CONSTRAINT "FK_d0365b2489341b5df137d063d75"`);
    await queryRunner.query(`DROP TABLE "public"."image"`);
  }
}
