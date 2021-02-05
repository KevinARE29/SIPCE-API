import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSanctionDocMigration1607235669110 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on table "sanction" is 'Tabla con los catálogos de sanciones';`, undefined);
    await queryRunner.query(`comment on column "sanction".id is 'Id de la sanción';`, undefined);
    await queryRunner.query(`comment on column "sanction".name is 'Nombre de la sanción';`, undefined);
    await queryRunner.query(`comment on column "sanction".description is 'Descripción de la sanción';`, undefined);
    await queryRunner.query(`comment on column "sanction".created_at is 'Fecha de creación de la sanción';`, undefined);
    await queryRunner.query(
      `comment on column "sanction".updated_at is 'Última fecha de modificación de la sanción';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "sanction".deleted_at is 'Fecha de eliminación de la sanción';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on table "sanction " is '';`, undefined);
    await queryRunner.query(`comment on column "sanction".id is '';`, undefined);
    await queryRunner.query(`comment on column "sanction".name is '';`, undefined);
    await queryRunner.query(`comment on column "sanction".description is '';`, undefined);
    await queryRunner.query(`comment on column "sanction".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "sanction".updated_at is '';`, undefined);
    await queryRunner.query(`comment on column "sanction".deleted_at is '';`, undefined);
  }
}
