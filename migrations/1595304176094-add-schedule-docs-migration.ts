import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1595304176094 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `comment on table "schedule" is 'Tabla  para almacenar los turnos  de atención de orientadoras en el Sistema Informático';`,
      undefined,
    );
    await queryRunner.query(`comment on column "schedule".id is 'Id del registro de un turno';`, undefined);
    await queryRunner.query(
      `comment on column "schedule".day is 'Día a que pertenece el registro de turno';`,
      undefined,
    );

    await queryRunner.query(`comment on column "schedule".start_time is 'Hora de inicio del turno';`, undefined);
    await queryRunner.query(`comment on column "schedule".end_time is 'Hora de fin del turno';`, undefined);
    await queryRunner.query(
      `comment on column "schedule".updated_at is 'Fecha y hora de la última modificación de los datos del Turno';`,
      undefined,
    );

    await queryRunner.query(
      `comment on column "schedule".created_at is 'Fecha y hora en que se guardo el turno en el SI';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "schedule".user_id is 'Id del usuario al que pertenece el turno';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "schedule" is '';`, undefined);
    await queryRunner.query(`comment on column "schedule".id is '';`, undefined);
    await queryRunner.query(`comment on column "schedule".day is '';`, undefined);
    await queryRunner.query(`comment on column "schedule".start_time is '';`, undefined);
    await queryRunner.query(`comment on column "schedule".end_time is '';`, undefined);
    await queryRunner.query(`comment on column "schedule".updated_at is '';`, undefined);
    await queryRunner.query(`comment on column "schedule".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "schedule".user_id is '';`, undefined);
  }
}
