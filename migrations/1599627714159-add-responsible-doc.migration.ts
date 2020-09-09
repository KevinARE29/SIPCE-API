import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1599627714159 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `comment on table "responsible" is 'Tabla para almacenar los datos de los responsables de los estudiantes';`,
      undefined,
    );
    await queryRunner.query(`comment on column "responsible".id is 'Id del responsable';`, undefined);
    await queryRunner.query(`comment on column "responsible".firstname is 'Nombres del responsable';`, undefined);
    await queryRunner.query(`comment on column "responsible".lastname is 'Apellidos del responsable';`, undefined);
    await queryRunner.query(`comment on column "responsible".email is 'Correo personal del responsable';`, undefined);
    await queryRunner.query(
      `comment on column "responsible".phone is 'Número de teléfono del responsable';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "responsible".created_at is 'Fecha de creación del responsable';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "responsible".updated_at is 'Última fecha de modificación del responsable';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "responsible".deleted_at is 'Fecha de eliminación del responsable';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "responsible" is '';`, undefined);
    await queryRunner.query(`comment on column "responsible".id is '';`, undefined);
    await queryRunner.query(`comment on column "responsible".firstname is '';`, undefined);
    await queryRunner.query(`comment on column "responsible".lastname is '';`, undefined);
    await queryRunner.query(`comment on column "responsible".email is '';`, undefined);
    await queryRunner.query(`comment on column "responsible".phone is '';`, undefined);
    await queryRunner.query(`comment on column "responsible".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "responsible".updated_at is '';`, undefined);
    await queryRunner.query(`comment on column "responsible".deleted_at is '';`, undefined);
  }
}
