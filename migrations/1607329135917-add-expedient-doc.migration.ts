import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddExpedientDocMigration1607329135917 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `comment on table "expedient" is 'Tabla que contiene el expediente psicológico de los estudiantes por cada año escolar';`,
      undefined,
    );
    await queryRunner.query(`comment on column "expedient".id is 'Id del expediente psicológico';`, undefined);
    await queryRunner.query(
      `comment on column "expedient".referrer_name is 'Nombre de la persona que refiere al estudiante';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "expedient".reason is 'Razón por la que se refiere al estudiante';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "expedient".problem_description is 'Descripción del problema que se ha identificado en el estudiante';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "expedient".diagnostic_impression is 'Impresión diagnostica que se realizo al estudiante';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "expedient".diagnostic_impression_categories is 'Listado de categorías de la impresión diagnostica que se realizo al estudiante';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "expedient".action_plan is 'Plan de acción a tomar con el estudiante';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "expedient".final_conclusion is 'Conclusión Final del expediente del estudiante';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "expedient".external_psychological_treatments is 'Listado de tratamientos psicologicos externos que posee un estudiante';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "expedient".grade_detail_id is 'Id del detalle de grado asociado al estudiante';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "expedient".student_id is 'Id del estudiante asociado al expediente';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "expedient".created_at is 'Fecha de creación del banco del expediente';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "expedient".updated_at is 'Última fecha de modificación del expediente';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "expedient".deleted_at is 'Fecha de eliminación del expediente';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on table "expedient" is '';`, undefined);
    await queryRunner.query(`comment on column "expedient".id is '';`, undefined);
    await queryRunner.query(`comment on column "expedient".referrer_name is '';`, undefined);
    await queryRunner.query(`comment on column "expedient".reason is '';`, undefined);
    await queryRunner.query(`comment on column "expedient".problem_description is '';`, undefined);
    await queryRunner.query(`comment on column "expedient".diagnostic_impression is '';`, undefined);
    await queryRunner.query(`comment on column "expedient".diagnostic_impression_categories is '';`, undefined);
    await queryRunner.query(`comment on column "expedient".action_plan is '';`, undefined);
    await queryRunner.query(`comment on column "expedient".final_conclusion is '';`, undefined);
    await queryRunner.query(`comment on column "expedient".student_id is '';`, undefined);
    await queryRunner.query(`comment on column "expedient".grade_detail_id is '';`, undefined);
    await queryRunner.query(`comment on column "expedient".external_psychological_treatments is '';`, undefined);
    await queryRunner.query(`comment on column "expedient".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "expedient".updated_at is '';`, undefined);
    await queryRunner.query(`comment on column "expedient".deleted_at is '';`, undefined);
  }
}
