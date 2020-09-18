import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1590110538717 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `comment on table "user_role" is 'Tabla para las relaciones entre usuarios y roles';`,
      undefined,
    );
    await queryRunner.query(`comment on column "user_role".user_id is 'Id del usuario';`, undefined);
    await queryRunner.query(`comment on column "user_role".role_id is 'Id del rol';`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "user_role" is '';`, undefined);
    await queryRunner.query(`comment on column "user_role".user_id is '';`, undefined);
    await queryRunner.query(`comment on column "user_role".role_id is '';`, undefined);
  }
}
