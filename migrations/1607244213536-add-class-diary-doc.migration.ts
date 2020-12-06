import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddClassDiaryDocMigration1607244213536 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `comment on table "class_diary" is 'Tabla que contiene las anotaciones del diario de clases que forman parte del registro conductual de los estudiantes para cada año escolar';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "class_diary".id is 'Id de la anotación en diario de clases';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "class_diary".title is 'Título de la anotación en el diario de clases';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "class_diary".description is 'Descripción de la anotación en el diario de clases';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "class_diary".annotation_date is 'Fecha en que se realizo la anotación en el diario de clases;`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "class_diary".created_at is 'Fecha de creación de la anotación en el diario de clases';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "class_diary".reporter_id is 'Id del usuario que realiza la anotación en diario de clases';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "class_diary".behavioral_history_id is 'Id del historial en el que se realizo la anotación del diario de clases';`,
      undefined,
    );

    await queryRunner.query(
      `comment on column "class_diary".updated_at is 'Última fecha de modificación de la anotación en diario de clases';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "class_diary".deleted_at is 'Fecha de eliminación de la anotación en diario de clases';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on table "class_diary " is '';`, undefined);
    await queryRunner.query(`comment on column "class_diary".id is '';`, undefined);
    await queryRunner.query(`comment on column "class_diary".title is '';`, undefined);
    await queryRunner.query(`comment on column "class_diary".description is '';`, undefined);
    await queryRunner.query(`comment on column "class_diary".annotation_date is '';`, undefined);
    await queryRunner.query(`comment on column "class_diary".reporter_id is '';`, undefined);
    await queryRunner.query(`comment on column "class_diary".behavioral_history_id is '';`, undefined);
    await queryRunner.query(`comment on column "class_diary".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "class_diary".updated_at is '';`, undefined);
    await queryRunner.query(`comment on column "class_diary".deleted_at is '';`, undefined);
  }
}
