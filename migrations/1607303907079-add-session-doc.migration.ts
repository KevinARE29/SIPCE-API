import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSessionDocMigration1607303907079 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `comment on table "session" is 'Tabla que contiene las sesiones realizadas con los estudiantes por cada año escolar';`,
      undefined,
    );
    await queryRunner.query(`comment on column "session".id is 'Id de la sesión';`, undefined);
    await queryRunner.query(
      `comment on column "session".session_type is 'Tipo de sesión: Sesión individual, Entrevista con docente, Entrevista con padres de familia. ';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "session".service_type is 'Tipo de servicio: Académico, Conductual, Emocional, Vocacional, Otro. ';`,
      undefined,
    );
    await queryRunner.query(`comment on column "session".started_at is 'Hora de inicio de la sesión';`, undefined);
    await queryRunner.query(
      `comment on column "session".duration is 'Tiempo de duración de la sesión en minutos';`,
      undefined,
    );
    await queryRunner.query(`comment on column "session".comments is 'Comentarios de la sesión';`, undefined);
    await queryRunner.query(
      `comment on column "session".treated_topics is 'Puntos  tratados en la sesión';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "session".draft is 'Indica que la sesión es un borrador si su valor es verdadero.';`,
      undefined,
    );

    await queryRunner.query(`comment on column "session".agreements is 'Acuerdos de la sesión';`, undefined);
    await queryRunner.query(
      `comment on column "session".expedient_id is 'Id del expediente asociado a la sesión';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "session".intervention_program_id is 'Id del programa de intervención asociado a la sesión';`,
      undefined,
    );
    await queryRunner.query(`comment on column "session".start_hour is 'Hora de inicio de la sesión';`, undefined);
    await queryRunner.query(`comment on column "session".identifier is 'Identificador de la sesión';`, undefined);

    await queryRunner.query(`comment on column "session".created_at is 'Fecha de creación de la sesión';`, undefined);
    await queryRunner.query(
      `comment on column "session".updated_at is 'Última fecha de modificación de la sesión';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "session".deleted_at is 'Fecha de eliminación de la sesión';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on table "session" is '';`, undefined);
    await queryRunner.query(`comment on column "session".id is '';`, undefined);
    await queryRunner.query(`comment on column "session".session_type is '';`, undefined);
    await queryRunner.query(`comment on column "session".service_type is '';`, undefined);
    await queryRunner.query(`comment on column "session".started_at is '';`, undefined);
    await queryRunner.query(`comment on column "session".duration is '';`, undefined);
    await queryRunner.query(`comment on column "session".comments is '';`, undefined);
    await queryRunner.query(`comment on column "session".treated_topics is '';`, undefined);
    await queryRunner.query(`comment on column "session".agreements is '';`, undefined);
    await queryRunner.query(`comment on column "session".draft is '';`, undefined);
    await queryRunner.query(`comment on column "session".expedient_id is '';`, undefined);
    await queryRunner.query(`comment on column "session".intervention_program_id is '';`, undefined);
    await queryRunner.query(`comment on column "session".start_hour is '';`, undefined);
    await queryRunner.query(`comment on column "session".identifier is '';`, undefined);
    await queryRunner.query(`comment on column "session".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "session".updated_at is '';`, undefined);
    await queryRunner.query(`comment on column "session".deleted_at is '';`, undefined);
  }
}
