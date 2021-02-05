import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSociometricTestDocMigration1607320727963 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `comment on table "sociometric_test" is 'Tabla que contiene las pruebas sociométricas realizadas a los estudiantes por año escolar';`,
      undefined,
    );
    await queryRunner.query(`comment on column "sociometric_test".id is 'Id la prueba sociométrica';`, undefined);
    await queryRunner.query(
      `comment on column "sociometric_test".status is 'Estado de la prueba sociométrica: Creada, En curso, Finalizada, Programada';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "sociometric_test".answers_per_question is 'Cantidad de respuestas por pregunta';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "sociometric_test".completed is 'Indica si la prueba sociométrica se ha completado por todos los estudiantes activos de la sección asociada';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "sociometric_test".section_detail_id is 'Id del detalle de sección asociado a la prueba sociométrica';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "sociometric_test".question_bank_id is 'Id del banco de preguntas asociado';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "sociometric_test".created_at is 'Fecha de creación de la prueba sociométrica';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "sociometric_test".updated_at is 'Última fecha de modificación de la prueba sociométrica';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "sociometric_test".deleted_at is 'Fecha de eliminación de la prueba sociométrica';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on table "sociometric_test" is '';`, undefined);
    await queryRunner.query(`comment on column "sociometric_test".id is '';`, undefined);
    await queryRunner.query(`comment on column "sociometric_test".status is '';`, undefined);
    await queryRunner.query(`comment on column "sociometric_test".answers_per_question is '';`, undefined);
    await queryRunner.query(`comment on column "sociometric_test".completed is '';`, undefined);
    await queryRunner.query(`comment on column "sociometric_test".question_bank_id is '';`, undefined);
    await queryRunner.query(`comment on column "sociometric_test".section_detail_id is '';`, undefined);
    await queryRunner.query(`comment on column "sociometric_test".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "sociometric_test".updated_at is '';`, undefined);
    await queryRunner.query(`comment on column "sociometric_test".deleted_at is '';`, undefined);
  }
}
