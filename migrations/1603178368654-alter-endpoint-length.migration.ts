import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterEndpointLength1603178368654 implements MigrationInterface {
  name = 'alterEndpointLength1603178368654';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."action_log" ALTER COLUMN "endpoint" TYPE character varying(512) USING "endpoint"::character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."action_log" ALTER COLUMN "endpoint" TYPE character varying(128) USING "endpoint"::character varying`,
    );
  }
}
