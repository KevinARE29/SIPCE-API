import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1599715891794 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on column "cycle".created_at is 'Fecha de creación del ciclo';`, undefined);
    await queryRunner.query(
      `comment on column "cycle".updated_at is 'Última fecha de modificación del ciclo';`,
      undefined,
    );
    await queryRunner.query(`comment on column "cycle".deleted_at is 'Fecha de eliminación del ciclo';`, undefined);
    await queryRunner.query(`comment on column "grade".created_at is 'Fecha de creación del grado';`, undefined);
    await queryRunner.query(
      `comment on column "grade".updated_at is 'Última fecha de modificación del grado';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "grade".active is 'true: registro activo. false: registro no activo';`,
      undefined,
    );
    await queryRunner.query(`comment on column "period".created_at is 'Fecha de creación del periodo';`, undefined);
    await queryRunner.query(
      `comment on column "period".updated_at is 'Última fecha de modificación del periodo';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "period".active is 'true: registro activo. false: registro no activo';`,
      undefined,
    );
    await queryRunner.query(`comment on column "section".created_at is 'Fecha de creación de la sección';`, undefined);
    await queryRunner.query(
      `comment on column "section".updated_at is 'Última fecha de modificación de la sección';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "section".deleted_at is 'Fecha de eliminación de la sección';`,
      undefined,
    );
    await queryRunner.query(`comment on column "shift".created_at is 'Fecha de creación del turno';`, undefined);
    await queryRunner.query(
      `comment on column "shift".updated_at is 'Última fecha de modificación del turno';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "shift".active is 'true: registro activo. false: registro no activo';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "student".deleted_at is 'Fecha de eliminación del estudiante';`,
      undefined,
    );
    await queryRunner.query(`comment on column "user".firstname is 'Nombres del usuario';`, undefined);
    await queryRunner.query(`comment on column "user".lastname is 'Apellidos del usuario';`, undefined);
    await queryRunner.query(`comment on column "user".code is 'Número de Identificación Marista (NIM)';`, undefined);
    await queryRunner.query(
      `comment on column "user".active is 'true: registro activo. false: registro no activo';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on column "cycle".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "cycle".updated_at is '';`, undefined);
    await queryRunner.query(`comment on column "cycle".deleted_at is '';`, undefined);
    await queryRunner.query(`comment on column "grade".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "grade".updated_at is '';`, undefined);
    await queryRunner.query(`comment on column "grade".active is '';`, undefined);
    await queryRunner.query(`comment on column "period".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "period".updated_at is '';`, undefined);
    await queryRunner.query(`comment on column "period".active is '';`, undefined);
    await queryRunner.query(`comment on column "section".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "section".updated_at is '';`, undefined);
    await queryRunner.query(`comment on column "section".deleted_at is '';`, undefined);
    await queryRunner.query(`comment on column "shift".created_at is '';`, undefined);
    await queryRunner.query(`comment on column "shift".updated_at is '';`, undefined);
    await queryRunner.query(`comment on column "shift".active is '';`, undefined);
    await queryRunner.query(`comment on column "student".deleted_at is '';`, undefined);
    await queryRunner.query(`comment on column "user".firstname is '';`, undefined);
    await queryRunner.query(`comment on column "user".lastname is '';`, undefined);
    await queryRunner.query(`comment on column "user".code is '';`, undefined);
    await queryRunner.query(`comment on column "user".active is '';`, undefined);
  }
}
