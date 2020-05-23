import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1590110385730 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `comment on table "user_permission" is 'Tabla para las relaciones entre usuarios y permisos';`,
      undefined,
    );
    await queryRunner.query(`comment on column "user_permission".user_id is 'Id del usuario';`, undefined);
    await queryRunner.query(`comment on column "user_permission".permission_id is 'Id del permiso';`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "user_permission" is '';`, undefined);
    await queryRunner.query(`comment on column "user_permission".user_id is '';`, undefined);
    await queryRunner.query(`comment on column "user_permission".permission_id is '';`, undefined);
  }
}
