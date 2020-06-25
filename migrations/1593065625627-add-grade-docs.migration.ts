import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1593065625627 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "grade" is 'Tabla con catálogos de grados';`, undefined);
    await queryRunner.query(`comment on column "grade".id is 'Id del grado';`, undefined);
    await queryRunner.query(`comment on column "grade".name is 'Nombre del grado';`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "grade" is '';`, undefined);
    await queryRunner.query(`comment on column "grade".id is '';`, undefined);
    await queryRunner.query(`comment on column "grade".name is '';`, undefined);
  }
}
