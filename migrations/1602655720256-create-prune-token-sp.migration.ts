import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePruneTokenSp1602655720256 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE OR REPLACE PROCEDURE token_prune_expired_sp()
        LANGUAGE 'plpgsql'
        AS $$
        BEGIN
            DELETE FROM token WHERE TO_TIMESTAMP(exp) < now();
        END
        $$;`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP PROCEDURE IF EXISTS token_prune_expired_sp();`, undefined);
  }
}
