import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1597308494037 implements MigrationInterface {
  name = 'migration1597308494037';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."section_detail" DROP CONSTRAINT "FK_6c633eb1e0690eb7985db1c6759"`);
    await queryRunner.query(`ALTER TABLE "public"."section_detail" ALTER COLUMN "teacher_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."section_detail" ADD CONSTRAINT "FK_6c633eb1e0690eb7985db1c6759" FOREIGN KEY ("teacher_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."section_detail" DROP CONSTRAINT "FK_6c633eb1e0690eb7985db1c6759"`);
    await queryRunner.query(`ALTER TABLE "public"."section_detail" ALTER COLUMN "teacher_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "public"."section_detail" ADD CONSTRAINT "FK_6c633eb1e0690eb7985db1c6759" FOREIGN KEY ("teacher_id") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
