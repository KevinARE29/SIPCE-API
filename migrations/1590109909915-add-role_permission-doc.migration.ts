import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1590109909915 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `comment on table "role_permission" is 'Tabla para las relaciones entre roles y permisos';`,
      undefined,
    );
    await queryRunner.query(`comment on column "role_permission".rol_id is 'Id del rol';`, undefined);
    await queryRunner.query(`comment on column "role_permission".permission_id is 'Id del permiso';`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "role_permission" is '';`, undefined);
    await queryRunner.query(`comment on column "role_permission".rol_id is '';`, undefined);
    await queryRunner.query(`comment on column "role_permission".permission_id is '';`, undefined);
  }
}
