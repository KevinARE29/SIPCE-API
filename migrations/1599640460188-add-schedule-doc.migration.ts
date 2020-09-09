import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1599640460188 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `comment on table "schedule" is 'Tabla para almacenar los eventos de los usuarios con rol orientador';`,
      undefined,
    );
    await queryRunner.query(`comment on column "schedule".id is 'Id del evento';`, undefined);
    await queryRunner.query(
      `comment on column "schedule".event_type is 'Tipo del evento. 1: Sesión con estudiante. 2: Entrevista con docente titular. 3: Entrevista con padres de familia. 4: Programa de Intervención. 5: Otro';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "schedule".json_data is 'Datos del evento generado por una librería externa desde el frontend';`,
      undefined,
    );
    await queryRunner.query(`comment on column "schedule".owner_id is 'Id del usuario dueño del evento';`, undefined);
    await queryRunner.query(
      `comment on column "schedule".student_id is 'Id del estudiante asociado al evento';`,
      undefined,
    );
    await queryRunner.query(`comment on column "schedule".created_at is 'Fecha de creación del evento';`, undefined);
    await queryRunner.query(
      `comment on column "schedule".updated_at is 'Última fecha de modificación del evento';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "schedule" is '';`, undefined);
    await queryRunner.query(`comment on column "schedule".id is '';`, undefined);
    await queryRunner.query(`comment on column "schedule".event_type is '';`, undefined);
    await queryRunner.query(`comment on column "schedule".json_data is '';`, undefined);
    await queryRunner.query(`comment on column "schedule".owner_id is '';`, undefined);
    await queryRunner.query(`comment on column "schedule".student_id is '';`, undefined);
    await queryRunner.query(`comment on column "schedule".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "schedule".updated_at is '';`, undefined);
  }
}
