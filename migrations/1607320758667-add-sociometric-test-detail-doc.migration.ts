import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSociometricTestDetailDocMigration1607320758667 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `comment on table "sociometric_test_detail" is 'Tabla que el detalle de las pruebas sociométricas realizadas a los estudiantes por año escolar';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "sociometric_test_detail".id is 'Id del detalle de la prueba sociométrica';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "sociometric_test_detail".finished is 'Indica si la prueba sociométrica fue finalizada por parte del estudiante asociado';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "sociometric_test_detail".sociometric_test_id is 'Id de la prueba sociométrica asociada';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "sociometric_test_detail".student_id is 'Id del estudiante asociado ';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "sociometric_test_detail".created_at is 'Fecha de creación del detalle de la prueba sociométrica';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "sociometric_test_detail".updated_at is 'Última fecha de modificación del detalle de la prueba sociométrica';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "sociometric_test_detail".deleted_at is 'Fecha de eliminación del detalle de la prueba sociométrica';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on table "sociometric_test_detail" is '';`, undefined);
    await queryRunner.query(`comment on column "sociometric_test_detail".id is '';`, undefined);
    await queryRunner.query(`comment on column "sociometric_test_detail".finished is '';`, undefined);
    await queryRunner.query(`comment on column "sociometric_test_detail".sociometric_test_id is '';`, undefined);
    await queryRunner.query(`comment on column "sociometric_test_detail".student_id is '';`, undefined);
    await queryRunner.query(`comment on column "sociometric_test_detail".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "sociometric_test_detail".updated_at is '';`, undefined);
    await queryRunner.query(`comment on column "sociometric_test_detail".deleted_at is '';`, undefined);
  }
}
