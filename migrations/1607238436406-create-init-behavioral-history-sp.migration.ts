import { EStudentStatus } from '@students/constants/student.constant';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitBehavioralHistorySp1607238436406 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create or replace procedure behavioral_history_init_sp()
      language 'plpgsql'
      AS $$
      declare
        next_year_student record;
      begin
        for next_year_student in select id
            from student where status in ('${EStudentStatus.Aprobado}', '${EStudentStatus.Repetidor}')
        loop
            insert into behavioral_history(student_id) values (next_year_student.id);
        end loop;
      end;
      $$;`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP PROCEDURE IF EXISTS behavioral_history_init_sp();`, undefined);
  }
}
