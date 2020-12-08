import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTokenPruneExpiredSPDocMigration1607415563593 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `comment on procedure "token_prune_expired_sp" is 'Procedimiento almacenado que elimina los registros de token que se han expirado';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on procedure "token_prune_expired_sp" is '';`, undefined);
  }
}
