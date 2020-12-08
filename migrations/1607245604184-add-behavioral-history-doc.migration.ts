import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBehavioralHistoryDocMigration1607245604184 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `comment on table "behavioral_history" is 'Tabla que contiene el historial conductual de los estudiantes para cada año escolar';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "behavioral_history".id is 'Id del historial conductual de un estudiante en un año escolar específico';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "behavioral_history".final_conclusion is 'Conclusión final en el historial conductual de un estudiante en un año específico';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "behavioral_history".student_id is 'Id del estudiante al que pertenece el historial conductual';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "behavioral_history".section_detail_id is 'Id del detalle de sección a la que pertenece el  estudiante en un año escolar específico';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "behavioral_history".created_at is 'Fecha de creación del historial conductual';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "behavioral_history".updated_at is 'Última fecha de modificación del historial conductual';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "behavioral_history".deleted_at is 'Fecha de eliminación del historial conductual';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on table "behavioral_history " is '';`, undefined);
    await queryRunner.query(`comment on column "behavioral_history".id is '';`, undefined);
    await queryRunner.query(`comment on column "behavioral_history".final_conclusion is '';`, undefined);
    await queryRunner.query(`comment on column "behavioral_history".student_id is '';`, undefined);
    await queryRunner.query(`comment on column "behavioral_history".section_detail_id is '';`, undefined);
    await queryRunner.query(`comment on column "behavioral_history".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "behavioral_history".updated_at is '';`, undefined);
    await queryRunner.query(`comment on column "behavioral_history".deleted_at is '';`, undefined);
  }
}
