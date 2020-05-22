import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1590109357212 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `comment on table "politic" is 'Tabla para políticas de contraseñas de usuarios';`,
      undefined,
    );
    await queryRunner.query(`comment on column "politic".id is 'Id de la política';`, undefined);
    await queryRunner.query(`comment on column "politic".min_length is 'Longitud mínima de la contraseña';`, undefined);
    await queryRunner.query(
      `comment on column "politic".capital_letter is 'Indica si la contraseña debe contener al menos una letra mayúscula';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "politic".lower_case is 'Indica si la contraseña debe contener al menos una letra minúscula';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "politic".special_char is 'Indica si la contraseña debe contener al menos un caracter especial';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "politic".numeric_char is 'Indica si la contraseña debe contener al menos un caracter numérico';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "politic".type_special is 'Listado de caracteres especiales permitidos que puede contener una contraseña';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "politic" is '';`, undefined);
    await queryRunner.query(`comment on column "politic".id is '';`, undefined);
    await queryRunner.query(`comment on column "politic".min_length is '';`, undefined);
    await queryRunner.query(`comment on column "politic".capital_letter is '';`, undefined);
    await queryRunner.query(`comment on column "politic".lower_case is '';`, undefined);
    await queryRunner.query(`comment on column "politic".special_char is '';`, undefined);
    await queryRunner.query(`comment on column "politic".numeric_char is '';`, undefined);
    await queryRunner.query(`comment on column "politic".type_special is '';`, undefined);
  }
}
