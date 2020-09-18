import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1599627211544 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `comment on table "responsible_student" is 'Tabla intermedia para almacenar relaciones entre estudiantes y responsables';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "responsible_student".responsible_id is 'Id del responsable asociado';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "responsible_student".student_id is 'Id del estudiante asociado.';`,
      undefined,
    );
    await queryRunner.query(
      `comment on column "responsible_student".relationship is 'Parentesco. 1: Abuela. 2: Abuelo. 3: Hermana. 4: Hermano. 5: Madrastra. 6: Madre. 7: Madrina. 8: Padrastro. 9: Padre. 10: Padrino. 11: Prima. 12: Primo. 13: Tía. 14: Tío. 15: Tutor';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`comment on table "responsible_student" is '';`, undefined);
    await queryRunner.query(`comment on column "responsible_student".responsible_id is '';`, undefined);
    await queryRunner.query(`comment on column "responsible_student".student_id is '';`, undefined);
    await queryRunner.query(`comment on column "responsible_student".relationship is '';`, undefined);
  }
}
