import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1599625209240 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `comment on table "section_detail" is 'Tabla para almacenar el detalle de las secciones para cada detalle de grado';`,
      undefined,
    );
    await queryRunner.query(`comment on column "section_detail".id is 'Id del detalle de sección';`, undefined);
    await queryRunner.query(`comment on column "section_detail".section_id is 'Id de la sección asociada';`, undefined);
    await queryRunner.query(
      `comment on column "section_detail".teacher_id is 'Id del usuario asociado con rol docente';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "section_detail".grade_detail_id is 'Id del detalle de grado asociado';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "section_detail".closed is 'true: la sección está lista para el cierre del año escolar. false: la sección no está lista para el cierre del año escolar';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "section_detail".created_at is 'Fecha de creación del detalle de sección';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "section_detail".updated_at is 'Última fecha de modificación del detalle de sección';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "section_detail" is '';`, undefined);
    await queryRunner.query(`comment on column "section_detail".id is '';`, undefined);
    await queryRunner.query(`comment on column "section_detail".section_id is '';`, undefined);
    await queryRunner.query(`comment on column "section_detail".teacher_id is '';`, undefined);
    await queryRunner.query(`comment on column "section_detail".grade_detail_id is '';`, undefined);
    await queryRunner.query(`comment on column "section_detail".closed is '';`, undefined);
    await queryRunner.query(`comment on column "section_detail".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "section_detail".updated_at is '';`, undefined);
  }
}
