import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1599635107649 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `comment on table "image" is 'Tabla para almacenar enlaces de las fotos de los estudiantes';`,
      undefined,
    );
    await queryRunner.query(`comment on column "image".id is 'Id de la imagen';`, undefined);
    await queryRunner.query(`comment on column "image".student_id is 'Id del estudiante asociado';`, undefined);
    await queryRunner.query(
      `comment on column "image".grade_id is 'Id del grado en el que el estudiante se tomó la foto';`,
      undefined,
    );
    await queryRunner.query(`comment on column "image".path is 'Ruta de la imagen';`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "image" is '';`, undefined);
    await queryRunner.query(`comment on column "image".id is '';`, undefined);
    await queryRunner.query(`comment on column "image".student_id is '';`, undefined);
    await queryRunner.query(`comment on column "image".grade_id is '';`, undefined);
    await queryRunner.query(`comment on column "image".path is '';`, undefined);
  }
}
