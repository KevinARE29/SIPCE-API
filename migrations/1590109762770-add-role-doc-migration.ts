import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1590109762770 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "role" is 'Tabla para Roles de los Usuarios';`, undefined);
    await queryRunner.query(`comment on column "role".id is 'Id del Rol';`, undefined);
    await queryRunner.query(`comment on column "role".name is 'Nombre del Rol';`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "role" is '';`, undefined);
    await queryRunner.query(`comment on column "role".id is '';`, undefined);
    await queryRunner.query(`comment on column "role".name is '';`, undefined);
  }
}
