import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSessionResponsibleAssistenceDocMigration1607313453581 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `comment on table "session_responsible_assistence" is 'Tabla que contiene el detalle de asistencia de responsables de un estudiante a una sesión.';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "session_responsible_assistence".id is 'Id del registro de asistencia de responsables a sesión';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "session_responsible_assistence".responsible1_assistence is 'Indica si el primer responsable asistió a la sesión.';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "session_responsible_assistence".responsible2_assistence is 'Indica si el segundo responsable asistió a la sesión';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "session_responsible_assistence".other_responsible_name is 'Nombre de otro responsable de un estudiante que asistió a la sesión';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "session_responsible_assistence".other_responsible_relationship is 'Relación de otro responsable del estudiante';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "session_responsible_assistence".session_id is 'Id de la sesión asociada al registro';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "session_responsible_assistence".responsible1_id is 'Id de primer responsable que asiste a la sesión';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "session_responsible_assistence".responsible2_id is 'Id de segundo responsable que asiste a la sesión';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on table "session_responsible_assistence" is '';`, undefined);
    await queryRunner.query(`comment on column "session_responsible_assistence".id is '';`, undefined);
    await queryRunner.query(
      `comment on column "session_responsible_assistence".responsible1_assistence is '';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "session_responsible_assistence".responsible2_assistence is '';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "session_responsible_assistence".other_responsible_name is '';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "session_responsible_assistence".other_responsible_relationship is '';`,
      undefined,
    );
    await queryRunner.query(`comment on column "session_responsible_assistence".session_id is '';`, undefined);
    await queryRunner.query(`comment on column "session_responsible_assistence".responsible1_id is '';`, undefined);
    await queryRunner.query(`comment on column "session_responsible_assistence".responsible2_id is '';`, undefined);
  }
}
