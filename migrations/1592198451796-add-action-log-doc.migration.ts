import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1592198451796 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `comment on table "action_log" is 'Tabla bitácora para almacenar las acciones realizadas en los endpoints del Sistema Informático';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "action_log".id is 'Id del registro en la bitácora de acciones';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "action_log".endpoint is 'URL del endpoint en el cuál se ejecutó la acción';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "action_log".action is 'Tipo de acción realizada en el endpoint. 1-Actualizar. 2-Consultar, 3-Crear, 4-Eliminar';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "action_log".status_code is 'Codigo de la respuesta de la API';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "action_log".attempt_time is 'Fecha y hora en la cual se realizó la acción';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "action_log".user_id is 'Id del usuario que realizó la acción';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "action_log" is '';`, undefined);
    await queryRunner.query(`comment on column "action_log".id is '';`, undefined);
    await queryRunner.query(`comment on column "action_log".endpoint is '';`, undefined);
    await queryRunner.query(`comment on column "action_log".action is '';`, undefined);
    await queryRunner.query(`comment on column "action_log".status_code is '';`, undefined);
    await queryRunner.query(`comment on column "action_log".attempt_time is '';`, undefined);
    await queryRunner.query(`comment on column "action_log".user_id is '';`, undefined);
  }
}
