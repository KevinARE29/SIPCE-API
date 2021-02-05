import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPresetDocMigration1607325457834 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `comment on table "preset" is 'Tabla que contiene las programaciones de pruebas sociométricas por cada año escolar';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "preset".id is 'Id de la programación de la prueba sociométrica';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "preset".password is 'Contraseña para realizar la prueba sociométrica programada';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "preset".started_at is 'Fecha de inicio en la cual se ha programado la prueba sociométrica';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "preset".ended_at is 'Fecha de fin en la cual se ha programado la prueba sociométrica';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "preset".sociometric_test_id is 'Id de la prueba sociométrica asociada';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "preset".created_at is 'Fecha de creación de la programación de la prueba sociométrica';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "preset".updated_at is 'Última fecha de modificación de la programación de la prueba sociométrica';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "preset".deleted_at is 'Fecha de eliminación de la programación de la prueba sociométrica';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on table "preset" is '';`, undefined);
    await queryRunner.query(`comment on column "preset".id is '';`, undefined);
    await queryRunner.query(`comment on column "preset".password is '';`, undefined);
    await queryRunner.query(`comment on column "preset".started_at is '';`, undefined);
    await queryRunner.query(`comment on column "preset".ended_at is '';`, undefined);
    await queryRunner.query(`comment on column "preset".sociometric_test_id is '';`, undefined);
    await queryRunner.query(`comment on column "preset".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "preset".updated_at is '';`, undefined);
    await queryRunner.query(`comment on column "preset".deleted_at is '';`, undefined);
  }
}
