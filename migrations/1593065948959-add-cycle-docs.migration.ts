import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1593065948959 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "cycle" is 'Tabla con catálogos de ciclos';`, undefined);
    await queryRunner.query(`comment on column "cycle".id is 'Id del ciclo';`, undefined);
    await queryRunner.query(`comment on column "cycle".name is 'Nombre del ciclo';`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "cycle" is '';`, undefined);
    await queryRunner.query(`comment on column "cycle".id is '';`, undefined);
    await queryRunner.query(`comment on column "cycle".name is '';`, undefined);
  }
}
