import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1590108647748 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `comment on table "migration" is 'Tabla para las migraciones de la base de datos';`,
      undefined,
    );
    await queryRunner.query(`comment on column "migration".id is 'Id de la migración';`, undefined);
    await queryRunner.query(
      `comment on column "migration".timestamp is 'Timestamp en el cual se ejecutó la migración';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "migration".name is 'Nombre de la migración. Corresponde al nombre de la clase de la migración que se genera con TypeORM';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "migration" is '';`, undefined);
    await queryRunner.query(`comment on column "migration".id is '';`, undefined);
    await queryRunner.query(`comment on column "migration".timestamp is '';`, undefined);
    await queryRunner.query(`comment on column "migration".name is '';`, undefined);
  }
}
