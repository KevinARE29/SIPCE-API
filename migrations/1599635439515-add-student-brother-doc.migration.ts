import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1599635439515 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `comment on table "student_brother" is 'Tabla intermedia para almacenar relaciones entre estudiantes y sus hermanos';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "student_brother".student_id is 'Id del estudiante asociado';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "student_brother".brother_id is 'Id del hermano estudiante asociado';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "student_brother" is '';`, undefined);
    await queryRunner.query(`comment on column "student_brother".student_id is '';`, undefined);
    await queryRunner.query(`comment on column "student_brother".brother_id is '';`, undefined);
  }
}
