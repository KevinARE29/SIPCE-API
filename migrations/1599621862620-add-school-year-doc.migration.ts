import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1599621862620 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `comment on table "school_year" is 'Tabla para almacenar los datos del periodo y estado de los años escolares';`,
      undefined,
    );
    await queryRunner.query(`comment on column "school_year".id is 'Id del año escolar';`, undefined);
    await queryRunner.query(`comment on column "school_year".year is 'Valor entero del año escolar';`, undefined);
    await queryRunner.query(
      `comment on column "school_year".start_date is 'Fecha de inicio del año escolar';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "school_year".end_date is 'Fecha propuesta de finalización del año escolar';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "school_year".close_date is 'Fecha real de cierre del año escolar';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "school_year".status is 'Estado actual del año escolar. 1: En proceso de apertura. 2: En curso. 3: Histórico';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "school_year".created_at is 'Fecha real en que se aperturó el año escolar';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "school_year".updated_at is 'Última fecha de modificación del año escolar';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "school_year" is '';`, undefined);
    await queryRunner.query(`comment on column "school_year".id is '';`, undefined);
    await queryRunner.query(`comment on column "school_year".year is '';`, undefined);
    await queryRunner.query(`comment on column "school_year".start_date is '';`, undefined);
    await queryRunner.query(`comment on column "school_year".end_date is '';`, undefined);
    await queryRunner.query(`comment on column "school_year".close_date is '';`, undefined);
    await queryRunner.query(`comment on column "school_year".status is '';`, undefined);
    await queryRunner.query(`comment on column "school_year".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "school_year".updated_at is '';`, undefined);
  }
}
