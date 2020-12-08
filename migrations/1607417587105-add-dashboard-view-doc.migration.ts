import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDashboardViewDocMigration1607417587105 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `comment on view "dashboard" is 'Vista que se encarga de recopilar la información de la cantidad de usuarios por roles y estudiantes por grados, turnos y estado que se encuentran el el sistema informático con el fin de generar data estadística informativa';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "dashboard".active_users is 'Contiene la cantidad de usuarios que se encuentran activos en el sistema informático';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "dashboard".users_by_role is 'Contiene los registros de usuarios separados por roles que se encuentran activos en el sistema informático';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "dashboard".total_students is 'Contiene la cantidad total de estudiantes activos en el sistema informático';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "dashboard".students_by_status is 'Contiene los registros de estudiantes separados por estatus que se encuentran registrados el sistema informático';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "dashboard".students_by_current_shift_and_grade is 'Contiene la cantidad total de estudiantes separados por grado y turnos que se encuentran activos en el sistema informático';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "dashboard".students_by_current_shift is 'Contiene los registros de estudiantes separados por turnos y que se encuentran activos en el sistema informático';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on view "dashboard" is '';`, undefined);
    await queryRunner.query(`comment on column "dashboard".active_users is '';`, undefined);
    await queryRunner.query(`comment on column "dashboard".users_by_role is '';`, undefined);
    await queryRunner.query(`comment on column "dashboard".total_students is '';`, undefined);
    await queryRunner.query(`comment on column "dashboard".students_by_status is '';`, undefined);
    await queryRunner.query(`comment on column "dashboard".students_by_current_shift_and_grade is '';`, undefined);
    await queryRunner.query(`comment on column "dashboard".students_by_current_shift is '';`, undefined);
  }
}
