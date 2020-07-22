import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1593066085132 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "section" is 'Tabla con catálogos de las secciones';`, undefined);
    await queryRunner.query(`comment on column "section".id is 'Id de la sección';`, undefined);
    await queryRunner.query(`comment on column "section".name is 'Nombre de la sección';`, undefined);
    await queryRunner.query(
      `comment on column "section".created_at is 'Fecha y hora en que se guardo la sección en el SI';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "section".updated_at is 'Fecha y hora de la última modificación de los datos de la sección';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "section".deleted_at is 'Fecha y hora de la última Activación/Desactivación de los datos de la Sección';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "section" is '';`, undefined);
    await queryRunner.query(`comment on column "section".id is '';`, undefined);
    await queryRunner.query(`comment on column "section".name is '';`, undefined);
    await queryRunner.query(`comment on column "section".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "section".updated_at is '';`, undefined);
    await queryRunner.query(`comment on column "section".deleted_at is '';`, undefined);
  }
}
