import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1599639826704 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `comment on table "schedule_employee" is 'Tabla intermedia para almacenar los participantes de un evento';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "schedule_employee".schedule_id is 'Id de la agenda asociada';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "schedule_employee".employee_id is 'Id del usuario participante en el evento';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "schedule_employee" is '';`, undefined);
    await queryRunner.query(`comment on column "schedule_employee".schedule_id is '';`, undefined);
    await queryRunner.query(`comment on column "schedule_employee".employee_id is '';`, undefined);
  }
}
