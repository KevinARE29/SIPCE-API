import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAccesLogPruneSPDocMigration1607415292614 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `comment on procedure "access_log_prune_sp" is 'Procedimiento almacenado que elimina los registros de accesos de los usuarios al sistema informático, se ejecuta una vez al año';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on procedure "access_log_prune_sp" is '';`, undefined);
  }
}
