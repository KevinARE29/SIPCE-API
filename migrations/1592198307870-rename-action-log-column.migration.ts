import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1592198307870 implements MigrationInterface {
  name = 'migration1592198307870';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "action_log" DROP CONSTRAINT "FK_6587094d9a54285915b90533c42"`);
    await queryRunner.query(`ALTER TABLE "action_log" RENAME COLUMN "userId" TO "user_id"`);
    await queryRunner.query(`ALTER TABLE "action_log" ALTER COLUMN "user_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "action_log" ADD CONSTRAINT "FK_41fd8dd9fe8eb3283842692aba9" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "action_log" DROP CONSTRAINT "FK_41fd8dd9fe8eb3283842692aba9"`);
    await queryRunner.query(`ALTER TABLE "action_log" ALTER COLUMN "user_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "action_log" RENAME COLUMN "user_id" TO "userId"`);
    await queryRunner.query(
      `ALTER TABLE "action_log" ADD CONSTRAINT "FK_6587094d9a54285915b90533c42" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
