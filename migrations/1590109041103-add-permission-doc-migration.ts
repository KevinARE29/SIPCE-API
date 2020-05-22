import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1590109041103 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `comment on table "permission" is 'Tabla que contiene el catálogo de permisos';`,
      undefined,
    );
    await queryRunner.query(`comment on column "permission".id is 'Id del permiso';`, undefined);
    await queryRunner.query(`comment on column "permission".name is 'Nombre del permiso';`, undefined);
    await queryRunner.query(
      `comment on column "permission".codename is 'Código del permiso utilizado en decoradores en los endpoints para restringir el acceso sólo a usuario autorizados';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "permission" is '';`, undefined);
    await queryRunner.query(`comment on column "permission".id is '';`, undefined);
    await queryRunner.query(`comment on column "permission".name is '';`, undefined);
    await queryRunner.query(`comment on column "permission".codename is '';`, undefined);
  }
}
