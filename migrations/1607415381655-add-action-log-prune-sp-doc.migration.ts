import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddActionLogPruneSPDocMigration1607415381655 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `comment on procedure "action_log_prune_sp" is 'Procedimiento almacenado que elimina los registros de las acciones que realizan los usuarios en el sistema informático, se ejecuta una vez cada 3 años';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on procedure "action_log_prune_sp" is '';`, undefined);
  }
}
