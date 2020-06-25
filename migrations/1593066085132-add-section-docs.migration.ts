import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1593066085132 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "section" is 'Tabla con catálogos de las secciones';`, undefined);
    await queryRunner.query(`comment on column "section".id is 'Id de la sección';`, undefined);
    await queryRunner.query(`comment on column "section".name is 'Nombre de la sección';`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "section" is '';`, undefined);
    await queryRunner.query(`comment on column "section".id is '';`, undefined);
    await queryRunner.query(`comment on column "section".name is '';`, undefined);
  }
}
