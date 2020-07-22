import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1593065625627 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "grade" is 'Tabla con catálogos de grados';`, undefined);
    await queryRunner.query(`comment on column "grade".id is 'Id del grado';`, undefined);
    await queryRunner.query(`comment on column "grade".name is 'Nombre del grado';`, undefined);
    await queryRunner.query(
      `comment on column "grade".created_at is 'Fecha y hora en que se guardo el Grado en el SI';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "grade".updated_at is 'Fecha y hora de la última modificación de los datos del Grado';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "grade" is '';`, undefined);
    await queryRunner.query(`comment on column "grade".id is '';`, undefined);
    await queryRunner.query(`comment on column "grade".name is '';`, undefined);
    await queryRunner.query(`comment on column "grade".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "grade".updated_at is '';`, undefined);
  }
}
