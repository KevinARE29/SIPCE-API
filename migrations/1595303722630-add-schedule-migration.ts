import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1595303722630 implements MigrationInterface {
  name = 'migration1595303722630';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "day_enum" AS ENUM('1', '2', '3', '4', '5')`);
    await queryRunner.query(
      `CREATE TABLE "schedule" ("id" SERIAL NOT NULL, "day" "day_enum" NOT NULL, "start_time" TIME WITH TIME ZONE NOT NULL, "end_time" TIME WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TYPE "public"."action_enum" RENAME TO "action_enum_old"`);
    await queryRunner.query(`CREATE TYPE "action_enum" AS ENUM('1', '2', '3', '4')`);
    await queryRunner.query(
      `ALTER TABLE "action_log" ALTER COLUMN "action" TYPE "action_enum" USING "action"::"text"::"action_enum"`,
    );
    await queryRunner.query(`DROP TYPE "action_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD CONSTRAINT "FK_c9927b15da3efbbfb7f29928216" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_c9927b15da3efbbfb7f29928216"`);
    await queryRunner.query(`CREATE TYPE "action_enum_old" AS ENUM()`);
    await queryRunner.query(
      `ALTER TABLE "action_log" ALTER COLUMN "action" TYPE "action_enum_old" USING "action"::"text"::"action_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "action_log_action_enum"`);
    await queryRunner.query(`ALTER TYPE "action_enum_old" RENAME TO  "action_enum"`);
    await queryRunner.query(`DROP TABLE "schedule"`);
    await queryRunner.query(`DROP TYPE "day_enum"`);
  }
}
