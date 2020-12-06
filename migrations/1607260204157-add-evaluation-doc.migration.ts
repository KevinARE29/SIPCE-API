import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEvaluationDocMigration1607260204157 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `comment on table "evaluation" is 'Tabla que contiene las evaluaciones realizadas a los estudiantes en las sesiones de consejería';`,
      undefined,
    );
    await queryRunner.query(`comment on column "evaluation".id is 'Id la evaluación';`, undefined);
    await queryRunner.query(`comment on column "evaluation".description is 'Descripción de la evaluación';`, undefined);
    await queryRunner.query(
      `comment on column "evaluation".session_id is 'Id de la sesión en la que se realizo la evaluación';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "evaluation".created_at is 'Fecha de creación de la evaluación';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "evaluation".updated_at is 'Última fecha de modificación de la evaluación';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "evaluation".deleted_at is 'Fecha de eliminación de la evaluación';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on table "evaluation" is '';`, undefined);
    await queryRunner.query(`comment on column "evaluation".id is '';`, undefined);
    await queryRunner.query(`comment on column "evaluation".status is '';`, undefined);
    await queryRunner.query(`comment on column "evaluation".session_id is '';`, undefined);
    await queryRunner.query(`comment on column "evaluation".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "evaluation".updated_at is '';`, undefined);
    await queryRunner.query(`comment on column "evaluation".deleted_at is '';`, undefined);
  }
}
