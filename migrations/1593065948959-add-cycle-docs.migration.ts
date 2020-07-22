import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1593065948959 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "cycle" is 'Tabla con catálogos de ciclos';`, undefined);
    await queryRunner.query(`comment on column "cycle".id is 'Id del ciclo';`, undefined);
    await queryRunner.query(`comment on column "cycle".name is 'Nombre del ciclo';`, undefined);
    await queryRunner.query(
      `comment on column "cycle".created_at is 'Fecha y hora en que se guardo el Ciclo en el SI';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "cycle".updated_at is 'Fecha y hora de la última modificación de los datos del Ciclo';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "cycle".deleted_at is 'Fecha y hora de la última Activación/Desactivación de los datos del Ciclo';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "cycle" is '';`, undefined);
    await queryRunner.query(`comment on column "cycle".id is '';`, undefined);
    await queryRunner.query(`comment on column "cycle".name is '';`, undefined);
    await queryRunner.query(`comment on column "cycle".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "cycle".updated_at is '';`, undefined);
    await queryRunner.query(`comment on column "cycle".deleted_at is '';`, undefined);
  }
}
