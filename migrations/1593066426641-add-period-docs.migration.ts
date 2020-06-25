import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1593066426641 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "period" is 'Tabla con catálogos de los periodos';`, undefined);
    await queryRunner.query(`comment on column "period".id is 'Id del periodo ';`, undefined);
    await queryRunner.query(`comment on column "period".name is 'Nombre del periodo ';`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "period" is '';`, undefined);
    await queryRunner.query(`comment on column "period".id is '';`, undefined);
    await queryRunner.query(`comment on column "period".name is '';`, undefined);
  }
}
