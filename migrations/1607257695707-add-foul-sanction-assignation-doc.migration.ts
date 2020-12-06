import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFoulSanctionAssignationDocMigration1607257695707 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `comment on table "foul_sanction_assignation" is 'Tabla que contiene las asignaciones de faltas y sanciones hacia los estudiantes por cada año escolar';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "foul_sanction_assignation".id is 'Id la asignación de falta y sanción';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "foul_sanction_assignation".issue_date is 'Fecha que se reporto la asignación de la falta y sanción';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "foul_sanction_assignation".behavioral_history_id is 'Id del historial conductual al que se le asigno la falta y sanción';`,
      undefined,
    );

    await queryRunner.query(
      `comment on column "foul_sanction_assignation".period_id is 'Id del período en que se asigno la falta y sanción';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "foul_sanction_assignation".sanction_id is 'Id de la sación asignada';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "foul_sanction_assignation".foul_id is 'Id de la falta asignada';`,
      undefined,
    );

    await queryRunner.query(
      `comment on column "foul_sanction_assignation".created_at is 'Fecha de creación de asignación de falta y sanción en el SI';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "foul_sanction_assignation".updated_at is 'Última fecha de modificación de la asignación de falta y sanción';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "foul_sanction_assignation".deleted_at is 'Fecha de eliminación de la asignacion de falta y sanción';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on table "foul_sanction_assignation " is '';`, undefined);
    await queryRunner.query(`comment on column "foul_sanction_assignation".id is '';`, undefined);
    await queryRunner.query(`comment on column "foul_sanction_assignation".issue_date is '';`, undefined);
    await queryRunner.query(`comment on column "foul_sanction_assignation".behavioral_history_id is '';`, undefined);
    await queryRunner.query(`comment on column "foul_sanction_assignation".period_id is '';`, undefined);
    await queryRunner.query(`comment on column "foul_sanction_assignation".sanction_id is '';`, undefined);
    await queryRunner.query(`comment on column "foul_sanction_assignation".foul_id is '';`, undefined);
    await queryRunner.query(`comment on column "foul_sanction_assignation".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "foul_sanction_assignation".updated_at is '';`, undefined);
    await queryRunner.query(`comment on column "foul_sanction_assignation".deleted_at is '';`, undefined);
  }
}
