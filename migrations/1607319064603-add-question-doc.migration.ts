import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddQuestionDocMigration1607319064603 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `comment on table "question" is 'Tabla que las preguntas a mostrar en una prueba sociométrica';`,
      undefined,
    );
    await queryRunner.query(`comment on column "question".id is 'Id de la pregunta';`, undefined);
    await queryRunner.query(
      `comment on column "question".question_n is 'Redacción de la pregunta en connotación negativa';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "question".question_q is 'Redacción de la pregunta en connotación positiva';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "question".question_bank_id is 'Id del banco de preguntas asociado';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "question".type is 'Tipo de preguntas: Aceptación/Rechazo, Liderazgo';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "question".created_at is 'Fecha de creación de la pregunta';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on table "question" is '';`, undefined);
    await queryRunner.query(`comment on column "question".id is '';`, undefined);
    await queryRunner.query(`comment on column "question".question_n is '';`, undefined);
    await queryRunner.query(`comment on column "question".question_q is '';`, undefined);
    await queryRunner.query(`comment on column "question".type is '';`, undefined);
    await queryRunner.query(`comment on column "question".question_bank_id is '';`, undefined);
    await queryRunner.query(`comment on column "question".created_at is '';`, undefined);
  }
}
