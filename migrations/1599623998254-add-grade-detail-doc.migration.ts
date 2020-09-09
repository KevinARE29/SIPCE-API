import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1599623998254 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `comment on table "grade_detail" is 'Tabla para almacenar el detalle de los grados para cada ciclo en cada año escolar';`,
      undefined,
    );
    await queryRunner.query(`comment on column "grade_detail".id is 'Id del detalle de grado';`, undefined);
    await queryRunner.query(`comment on column "grade_detail".grade_id is 'Id del grado asociado';`, undefined);
    await queryRunner.query(
      `comment on column "grade_detail".counselor_id is 'Id del usuario asociado con rol orientador';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "grade_detail".cycle_detail_id is 'Id del detalle de ciclo asociado';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "grade_detail".created_at is 'Fecha de creación del detalle de grado';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "grade_detail".updated_at is 'Última fecha de modificación del detalle de grado';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "grade_detail" is '';`, undefined);
    await queryRunner.query(`comment on column "grade_detail".id is '';`, undefined);
    await queryRunner.query(`comment on column "grade_detail".grade_id is '';`, undefined);
    await queryRunner.query(`comment on column "grade_detail".counselor_id is '';`, undefined);
    await queryRunner.query(`comment on column "grade_detail".cycle_detail_id is '';`, undefined);
    await queryRunner.query(`comment on column "grade_detail".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "grade_detail".updated_at is '';`, undefined);
  }
}
