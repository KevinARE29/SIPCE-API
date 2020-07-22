import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1593066426641 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "period" is 'Tabla con catálogos de los periodos';`, undefined);
    await queryRunner.query(`comment on column "period".id is 'Id del periodo ';`, undefined);
    await queryRunner.query(`comment on column "period".name is 'Nombre del periodo ';`, undefined);
    await queryRunner.query(
      `comment on column "period".created_at is 'Fecha y hora en que se guardo el periodo en el SI';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "period".updated_at is 'Fecha y hora de la última modificación de los datos del Periodo';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "period" is '';`, undefined);
    await queryRunner.query(`comment on column "period".id is '';`, undefined);
    await queryRunner.query(`comment on column "period".name is '';`, undefined);
    await queryRunner.query(`comment on column "period".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "period".updated_at is '';`, undefined);
  }
}
