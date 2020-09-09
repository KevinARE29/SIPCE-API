import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1599625901235 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `comment on table "student" is 'Tabla para almacenar los datos de los estudiantes';`,
      undefined,
    );
    await queryRunner.query(`comment on column "student".id is 'Id del estudiante';`, undefined);
    await queryRunner.query(
      `comment on column "student".started_grade_id is 'Id del grado en el que inició el estudiante en la institución';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "student".current_grade_id is 'Id del grado actual en el que se encuentra el estudiante';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "student".current_shift_id is 'Id del turno actual en el que se encuentra el estudiante';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "student".code is 'Número de Identificación Estudiantil (NIE) del estudiante';`,
      undefined,
    );
    await queryRunner.query(`comment on column "student".firstname is 'Nombres del estudiante';`, undefined);
    await queryRunner.query(`comment on column "student".lastname is 'Apellidos del estudiante';`, undefined);
    await queryRunner.query(
      `comment on column "student".birthdate is 'Fecha de nacimiento del estudiante';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "student".registration_year is 'Año en que ingresó a la institución';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "student".email is 'Correo institucional o personal del estudiante';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "student".status is 'Estado del estudiante. 1: Aprobado. 2: Cursando año escolar. 3. Desertor. 4: Egresado. 5: Expulsado. 6: Repetidor. 7: Reprobado';`,
      undefined,
    );
    await queryRunner.query(`comment on column "student".created_at is 'Fecha de creación del estudiante';`, undefined);
    await queryRunner.query(
      `comment on column "student".updated_at is 'Última fecha de modificación del estudiante';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "student".deleted_at is 'Fecha de eliminación del estudiante';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "student" is '';`, undefined);
    await queryRunner.query(`comment on column "student".id is '';`, undefined);
    await queryRunner.query(`comment on column "student".started_grade_id is '';`, undefined);
    await queryRunner.query(`comment on column "student".current_grade_id is '';`, undefined);
    await queryRunner.query(`comment on column "student".current_shift_id is '';`, undefined);
    await queryRunner.query(`comment on column "student".code is '';`, undefined);
    await queryRunner.query(`comment on column "student".firstname is '';`, undefined);
    await queryRunner.query(`comment on column "student".lastname is '';`, undefined);
    await queryRunner.query(`comment on column "student".birthdate is '';`, undefined);
    await queryRunner.query(`comment on column "student".registration_year is '';`, undefined);
    await queryRunner.query(`comment on column "student".email is '';`, undefined);
    await queryRunner.query(`comment on column "student".status '';`, undefined);
    await queryRunner.query(`comment on column "student".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "student".updated_at is '';`, undefined);
    await queryRunner.query(`comment on column "student".deleted_at is '';`, undefined);
  }
}
