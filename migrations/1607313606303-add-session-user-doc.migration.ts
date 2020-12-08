import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSessionUserDocMigration1607313606303 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `comment on table "session_user" is 'Tabla intermedia que contiene las sesiones asociadas a un usuario por año escolar';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "session_user".session_id is 'Id del usuario con rol orientador asociado';`,
      undefined,
    );
    await queryRunner.query(`comment on column "session_user".session_id is 'Id de sesión asociada';`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on table "session_user" is '';`, undefined);
    await queryRunner.query(`comment on column "session_user".session_id is '';`, undefined);
    await queryRunner.query(`comment on column "session_user".session_id is '';`, undefined);
  }
}
