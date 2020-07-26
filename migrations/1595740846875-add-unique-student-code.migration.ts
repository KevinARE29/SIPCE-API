import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1595740846875 implements MigrationInterface {
  name = 'migration1595740846875';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."student" ADD CONSTRAINT "UQ_ebba3803967599341403a409bc6" UNIQUE ("code")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "UQ_ebba3803967599341403a409bc6"`);
  }
}
