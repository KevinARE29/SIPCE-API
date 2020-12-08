import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAnswerDocMigration1607329112519 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `comment on table "answer" is 'Tabla que contiene las respuestas dadas por los estudiantes en las pruebas sociométricas por cada año escolar';`,
      undefined,
    );
    await queryRunner.query(`comment on column "answer".id is 'Id de la respuesta';`, undefined);
    await queryRunner.query(`comment on column "answer".ponderation is 'Ponderación de la respuesta';`, undefined);
    await queryRunner.query(
      `comment on column "answer".sociometric_test_detail_id is 'Id del detalle de la prueba sociométrica asociada';`,
      undefined,
    );
    await queryRunner.query(`comment on column "answer".question_id is 'Id de la pregunta asociada';`, undefined);
    await queryRunner.query(`comment on column "answer".student_id is 'Id del estudiante asociado';`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on table "answer" is '';`, undefined);
    await queryRunner.query(`comment on column "answer".id is '';`, undefined);
    await queryRunner.query(`comment on column "answer".ponderation is '';`, undefined);
    await queryRunner.query(`comment on column "answer".sociometric_test_detail_id is '';`, undefined);
    await queryRunner.query(`comment on column "answer".question_id is '';`, undefined);
    await queryRunner.query(`comment on column "answer".student_id is '';`, undefined);
  }
}
