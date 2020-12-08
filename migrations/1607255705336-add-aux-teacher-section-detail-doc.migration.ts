import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAuxTeacherSectionDetailDocMigration1607255705336 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `comment on table "aux_teacher_section_detail" is 'Tabla intermedia para almacenar relaciones de docentes auxiliares para cada año escolar';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "aux_teacher_section_detail".aux_teacher_id is 'Id del usuario asociado con rol docente auxiliar';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "aux_teacher_section_detail".section_detail_id is 'Id del detalle de sección asociado';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on table "aux_teacher_section_detail" is '';`, undefined);
    await queryRunner.query(`comment on column "aux_teacher_section_detail".aux_teacher_id is '';`, undefined);
    await queryRunner.query(`comment on column "aux_teacher_section_detail".section_detail_id is '';`, undefined);
  }
}
