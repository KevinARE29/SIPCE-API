import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1593066253764 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "shift" is 'Tabla con catálogos de los turnos escolares';`, undefined);
    await queryRunner.query(`comment on column "shift".id is 'Id del turno escolar';`, undefined);
    await queryRunner.query(`comment on column "shift".name is 'Nombre del turno escolar';`, undefined);
    await queryRunner.query(
      `comment on column "shift".created_at is 'Fecha y hora en que se guardo el turno en el SI';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "shift".updated_at is 'Fecha y hora de la última modificación de los datos del Turno';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "shift" is '';`, undefined);
    await queryRunner.query(`comment on column "shift".id is '';`, undefined);
    await queryRunner.query(`comment on column "shift".name is '';`, undefined);
    await queryRunner.query(`comment on column "shift".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "shift".updated_at is '';`, undefined);
  }
}
