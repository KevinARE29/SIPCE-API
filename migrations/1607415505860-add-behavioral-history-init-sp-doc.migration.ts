import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBehavioralHistoryInitSPDocMigration1607415505860 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `comment on procedure "behavioral_history_init_sp" is 'Procedimiento almacenado que realiza la apertura del historial conductual de un estudiante en el presente año escolar,
      se ejecuta al momento que el estudiante es asignado a un grado y sección';`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`comment on procedure "behavioral_history_init_sp" is '';`, undefined);
  }
}
