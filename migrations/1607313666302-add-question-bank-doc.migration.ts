import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddQuestionBankDocMigration1607313666302 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `comment on table "question_bank" is 'Tabla que contiene el de banco de preguntas creado por un orientador para la realización de una prueba sociométrica';`,
      undefined,
    );
    await queryRunner.query(`comment on column "question_bank".id is 'Id del banco de preguntas';`, undefined);
    await queryRunner.query(`comment on column "question_bank".name is 'Nombre del banco de preguntas';`, undefined);
    await queryRunner.query(
      `comment on column "question_bank".counselor_id is 'Id del usuario con rol orientador asociado al banco de preguntas';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "question_bank".created_at is 'Fecha de creación del banco de preguntas';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "question_bank".updated_at is 'Última fecha de modificación del banco de preguntas';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "question_bank".deleted_at is 'Fecha de eliminación del banco de preguntas';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on table "question_bank" is '';`, undefined);
    await queryRunner.query(`comment on column "question_bank".id is '';`, undefined);
    await queryRunner.query(`comment on column "question_bank".name is '';`, undefined);
    await queryRunner.query(`comment on column "question_bank".counselor_id is '';`, undefined);
    await queryRunner.query(`comment on column "question_bank".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "question_bank".updated_at is '';`, undefined);
    await queryRunner.query(`comment on column "question_bank".deleted_at is '';`, undefined);
  }
}
