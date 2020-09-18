import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1599623445813 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `comment on table "cycle_detail" is 'Tabla para almacenar el detalle de los ciclos para cada año escolar';`,
      undefined,
    );
    await queryRunner.query(`comment on column "cycle_detail".id is 'Id del detalle de ciclo';`, undefined);
    await queryRunner.query(`comment on column "cycle_detail".cycle_id is 'Id del ciclo asociado';`, undefined);
    await queryRunner.query(
      `comment on column "cycle_detail".cycle_coordinator_id is 'Id del usuario asociado con rol coordinador de ciclo.';`,
      undefined,
    );
    await queryRunner.query(`comment on column "cycle_detail".shift_id is 'Id del turno seleccionado';`, undefined);
    await queryRunner.query(
      `comment on column "cycle_detail".school_year_id is 'Id del año escolar asociado';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "cycle_detail".created_at is 'Fecha de creación del detalle de ciclo';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "cycle_detail".updated_at is 'Última fecha de modificación del detalle de ciclo';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "cycle_detail" is '';`, undefined);
    await queryRunner.query(`comment on column "cycle_detail".id is '';`, undefined);
    await queryRunner.query(`comment on column "cycle_detail".cycle_id is '';`, undefined);
    await queryRunner.query(`comment on column "cycle_detail".cycle_coordinator_id is '';`, undefined);
    await queryRunner.query(`comment on column "cycle_detail".shift_id is '';`, undefined);
    await queryRunner.query(`comment on column "cycle_detail".school_year_id is '';`, undefined);
    await queryRunner.query(`comment on column "cycle_detail".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "cycle_detail".updated_at is '';`, undefined);
  }
}
