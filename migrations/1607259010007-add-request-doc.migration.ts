import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRequestDocMigration1607259010007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `comment on table "request" is 'Tabla que contiene las solicitudes de consejería realizadas por los estudiantes por cada año escolar';`,
      undefined,
    );
    await queryRunner.query(`comment on column "request".id is 'Id la solicitud de consejería';`, undefined);
    await queryRunner.query(
      `comment on column "request".status is 'Estado de solicitud. 1: Creada. 2: Verificada. 3: Aceptada.  4: Cancelada.';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "request".student_id is 'Id de estudiante que realiza la solicitud';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "request".created_at is 'Fecha de creación de la solicitud';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "request".updated_at is 'Última fecha de modificación de la solicitud';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on table "request" is '';`, undefined);
    await queryRunner.query(`comment on column "request".id is '';`, undefined);
    await queryRunner.query(`comment on column "request".status is '';`, undefined);
    await queryRunner.query(`comment on column "request".student_id is '';`, undefined);
    await queryRunner.query(`comment on column "request".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "request".updated_at is '';`, undefined);
  }
}
