import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePruneLogsSp1606027539384 implements MigrationInterface {
  name = 'createPruneLogsSp1606027539384';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE OR REPLACE PROCEDURE action_log_prune_sp()
        LANGUAGE 'plpgsql'
        AS $$
        BEGIN
            DELETE FROM action_log WHERE attempt_time < NOW() - INTERVAL '3 YEAR';
        END
        $$;`,
      undefined,
    );
    await queryRunner.query(
      `CREATE OR REPLACE PROCEDURE access_log_prune_sp()
          LANGUAGE 'plpgsql'
          AS $$
          BEGIN
              DELETE FROM access_log WHERE attempt_time < NOW() - INTERVAL '1 YEAR';
          END
          $$;`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP PROCEDURE IF EXISTS action_log_prune_sp();`, undefined);
    await queryRunner.query(`DROP PROCEDURE IF EXISTS access_log_prune_sp();`, undefined);
  }
}
