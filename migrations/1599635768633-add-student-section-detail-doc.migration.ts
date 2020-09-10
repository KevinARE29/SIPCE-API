import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1599635768633 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `comment on table "student_section_detail" is 'Tabla intermedia para almacenar relaciones entre estudiantes y detalles de secciones';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "student_section_detail".student_id is 'Id del estudiante asociado';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "student_section_detail".section_detail_id is 'Id del detalle de sección asociado';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "student_section_detail" is '';`, undefined);
    await queryRunner.query(`comment on column "student_section_detail".student_id is '';`, undefined);
    await queryRunner.query(`comment on column "student_section_detail".section_detail_id is '';`, undefined);
  }
}
