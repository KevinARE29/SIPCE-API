import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1592093198694 implements MigrationInterface {
  name = 'migration1592093198694';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "action_enum" AS ENUM('1', '2', '3', '4')`);
    await queryRunner.query(
      `CREATE TABLE "action_log" ("id" SERIAL NOT NULL, "endpoint" character varying(128) NOT NULL, "action" "action_enum" NOT NULL, "status_code" smallint NOT NULL, "attempt_time" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "userId" integer, CONSTRAINT "PK_64cffa5d8af90621882f0388359" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "action_log" ADD CONSTRAINT "FK_6587094d9a54285915b90533c42" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "action_log" DROP CONSTRAINT "FK_6587094d9a54285915b90533c42"`);
    await queryRunner.query(`DROP TABLE "action_log"`);
    await queryRunner.query(`DROP TYPE "action_enum"`);
  }
}
