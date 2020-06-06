import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1591419199718 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `comment on table "access_log" is 'Tabla bitácora para almacenar los intentos de acceso al Sistema Informático';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "access_log".id is 'Id del registro en la bitácora de accesos';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "access_log".username is 'Nombre de usuario con el que se intentó iniciar sesión';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "access_log".ip is 'Dirección IP desde la cual intentó iniciar sesión';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "access_log".status_code is 'Código de la respuesta retornada por la API';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "access_log".attempt_time is 'Fecha y hora en la cual se intentó iniciar sesión';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "access_log" is '';`, undefined);
    await queryRunner.query(`comment on column "access_log".id is '';`, undefined);
    await queryRunner.query(`comment on column "access_log".username is '';`, undefined);
    await queryRunner.query(`comment on column "access_log".ip is '';`, undefined);
    await queryRunner.query(`comment on column "access_log".status_code is '';`, undefined);
    await queryRunner.query(`comment on column "access_log".attempt_time is '';`, undefined);
  }
}
