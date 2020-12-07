import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInterventionProgramDocMigration1607260128923 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `comment on table "intervention_program" is 'Tabla que contiene los programas de intervención aplicados a los estudiantes';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "intervention_program".id is 'Id del programa de intervención';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "intervention_program".description is 'Descripción del programa de intervención';`,
      undefined,
    );

    await queryRunner.query(
      `comment on column "intervention_program".name is 'Nombre del programa de intervención';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "intervention_program".status is 'Estado del programa de intervención';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "intervention_program".type is 'Tipo de programa: Individual académico, Individual conductual, Individual emocional, Individual mixto, Grupales. ';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "intervention_program".counselor_id is 'Id del orientador que crea el programa de intervención';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "intervention_program".created_at is 'Fecha de creación del programa de intervención';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "intervention_program".updated_at is 'Última fecha de modificación del programa de intervención';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "intervention_program".deleted_at is 'Fecha de eliminación del programa de intervención';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on table "intervention_program" is '';`, undefined);
    await queryRunner.query(`comment on column "intervention_program".id is '';`, undefined);
    await queryRunner.query(`comment on column "intervention_program".status is '';`, undefined);
    await queryRunner.query(`comment on column "intervention_program".type is '';`, undefined);
    await queryRunner.query(`comment on column "intervention_program".name is '';`, undefined);
    await queryRunner.query(`comment on column "intervention_program".description is '';`, undefined);
    await queryRunner.query(`comment on column "intervention_program".counselor_id is '';`, undefined);
    await queryRunner.query(`comment on column "intervention_program".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "intervention_program".updated_at is '';`, undefined);
    await queryRunner.query(`comment on column "intervention_program".deleted_at is '';`, undefined);
  }
}
