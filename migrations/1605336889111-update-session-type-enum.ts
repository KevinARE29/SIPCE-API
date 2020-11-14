import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSessionTypeEnum1605336889111 implements MigrationInterface {
  name = 'updateSessionTypeEnum1605336889111';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TYPE "public"."session_enum" RENAME TO "session_enum_old"`);
    await queryRunner.query(
      `CREATE TYPE "session_enum" AS ENUM('Sesión individual', 'Entrevista con docente', 'Entrevista con padres de familia')`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."session" ALTER COLUMN "session_type" TYPE "session_enum" USING "session_type"::"text"::"session_enum"`,
    );
    await queryRunner.query(`DROP TYPE "session_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "session_enum_old" AS ENUM()`);
    await queryRunner.query(
      `ALTER TABLE "public"."session" ALTER COLUMN "session_type" TYPE "session_enum_old" USING "session_type"::"text"::"session_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."session_session_type_enum"`);
    await queryRunner.query(`ALTER TYPE "session_enum_old" RENAME TO  "session_enum"`);
  }
}
