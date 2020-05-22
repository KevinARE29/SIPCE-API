import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1590110068767 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "token" is 'Tabla para los Tokens de los Usuarios';`, undefined);
    await queryRunner.query(`comment on column "token".id is 'Id del token';`, undefined);
    await queryRunner.query(`comment on column "token".access_token is 'JWT codificado del Access Token';`, undefined);
    await queryRunner.query(
      `comment on column "token".refresh_token is 'JWT codificado del Refresh Token';`,
      undefined,
    );
    await queryRunner.query(`comment on column "token".exp is 'Expiración del la sesión del usuario';`, undefined);
    await queryRunner.query(`comment on column "token".user_id is 'Id del usuario portador del token';`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "token" is '';`, undefined);
    await queryRunner.query(`comment on column "token".id is '';`, undefined);
    await queryRunner.query(`comment on column "token".access_token is '';`, undefined);
    await queryRunner.query(`comment on column "token".refresh_token is '';`, undefined);
    await queryRunner.query(`comment on column "token".exp is '';`, undefined);
    await queryRunner.query(`comment on column "token".user_id is '';`, undefined);
  }
}
