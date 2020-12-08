import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFoulDocMigration1607234216027 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on table "foul" is 'Tabla con los catálogos de faltas';`, undefined);
    await queryRunner.query(`comment on column "foul".id is 'Id de la falta';`, undefined);
    await queryRunner.query(
      `comment on column "foul".fouls_type is 'Tipo del falta. 1: Leves. 2: Graves. 3: Muy Graves.';`,
      undefined,
    );
    await queryRunner.query(`comment on column "foul".numeral is 'Numeral de la falta';`, undefined);
    await queryRunner.query(`comment on column "foul".created_at is 'Fecha de creación de la falta';`, undefined);
    await queryRunner.query(
      `comment on column "foul".updated_at is 'Última fecha de modificación de la falta';`,
      undefined,
    );
    await queryRunner.query(`comment on column "foul".deleted_at is 'Fecha de eliminación de la falta';`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on table "foul" is '';`, undefined);
    await queryRunner.query(`comment on column "foul".id is '';`, undefined);
    await queryRunner.query(`comment on column "foul".fouls_type is '';`, undefined);
    await queryRunner.query(`comment on column "foul".numeral is '';`, undefined);
    await queryRunner.query(`comment on column "foul".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "foul".updated_at is '';`, undefined);
    await queryRunner.query(`comment on column "foul".deleted_at is '';`, undefined);
  }
}
