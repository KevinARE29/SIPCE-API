import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1590094848356 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "user" is 'Tabla Usuarios';`, undefined);
    await queryRunner.query(`comment on column "user".id is 'Id del Usuario';`, undefined);
    await queryRunner.query(
      `comment on column "user".username is 'Username del Usuario con el cual iniciará sesión en el SI';`,
      undefined,
    );
    await queryRunner.query(`comment on column "user".name is 'Nombres y Apellidos del Usuario';`, undefined);
    await queryRunner.query(`comment on column "user".password is 'Contraseña encriptada del Usuario';`, undefined);
    await queryRunner.query(`comment on column "user".email is 'Correo Electrónico del Usuario';`, undefined);
    await queryRunner.query(`comment on column "user".image is 'URL de la foto de perfil del usuario';`, undefined);
    await queryRunner.query(
      `comment on column "user".reset_password_token is 'Token temporal que se genera cuando un usuario solicita actualizar su contraseña';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "user".created_at is 'Fecha y hora en que se crea el Usuario';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "user".updated_at is 'Fecha y hora de la última modificación de los datos del Usuario';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "user".deleted_at is 'Fecha y hora en que el Usuario fue dado de baja del SI';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "user" is '';`, undefined);
    await queryRunner.query(`comment on column "user".id is '';`, undefined);
    await queryRunner.query(`comment on column "user".username is '';`, undefined);
    await queryRunner.query(`comment on column "user".name is '';`, undefined);
    await queryRunner.query(`comment on column "user".password is '';`, undefined);
    await queryRunner.query(`comment on column "user".email is '';`, undefined);
    await queryRunner.query(`comment on column "user".image is '';`, undefined);
    await queryRunner.query(`comment on column "user".reset_password_token is '';`, undefined);
    await queryRunner.query(`comment on column "user".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "user".updated_at is '';`, undefined);
    await queryRunner.query(`comment on column "user".deleted_at is '';`, undefined);
  }
}
