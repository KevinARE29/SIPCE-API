import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1599649748226 implements MigrationInterface {
  name = 'migration1599649748226';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "schedule_employees" DROP CONSTRAINT "FK_207c6955ea9beeab8cda85e983f"`);
    await queryRunner.query(`ALTER TABLE "schedule_employees" DROP CONSTRAINT "FK_795096906b7edf494ea034530e5"`);
    await queryRunner.query(`DROP INDEX "IDX_207c6955ea9beeab8cda85e983"`);
    await queryRunner.query(`DROP INDEX "IDX_795096906b7edf494ea034530e"`);
    await queryRunner.query(`ALTER TABLE "schedule_employees" DROP CONSTRAINT "PK_0fa400f66b57bd9050213bd47cf"`);
    await queryRunner.query(
      `ALTER TABLE "schedule_employees" ADD CONSTRAINT "PK_795096906b7edf494ea034530e5" PRIMARY KEY ("employees_id")`,
    );
    await queryRunner.query(`ALTER TABLE "schedule_employees" DROP COLUMN "schedule_event"`);
    await queryRunner.query(`ALTER TABLE "schedule_employees" DROP CONSTRAINT "PK_795096906b7edf494ea034530e5"`);
    await queryRunner.query(`ALTER TABLE "schedule_employees" DROP COLUMN "employees_id"`);
    await queryRunner.query(`ALTER TABLE "schedule_employees" ADD "schedule_id" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "schedule_employees" ADD CONSTRAINT "PK_bc48914e8bc5c6c8c880861d12a" PRIMARY KEY ("schedule_id")`,
    );
    await queryRunner.query(`ALTER TABLE "schedule_employees" ADD "employee_id" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "schedule_employees" DROP CONSTRAINT "PK_bc48914e8bc5c6c8c880861d12a"`);
    await queryRunner.query(
      `ALTER TABLE "schedule_employees" ADD CONSTRAINT "PK_808fdbaf6c544b6b2a3eda2bc87" PRIMARY KEY ("schedule_id", "employee_id")`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_bc48914e8bc5c6c8c880861d12" ON "schedule_employees" ("schedule_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_565f9e9552d478ea5336f3f3c9" ON "schedule_employees" ("employee_id") `);
    await queryRunner.query(
      `ALTER TABLE "schedule_employees" ADD CONSTRAINT "FK_bc48914e8bc5c6c8c880861d12a" FOREIGN KEY ("schedule_id") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule_employees" ADD CONSTRAINT "FK_565f9e9552d478ea5336f3f3c9a" FOREIGN KEY ("employee_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "schedule_employees" DROP CONSTRAINT "FK_565f9e9552d478ea5336f3f3c9a"`);
    await queryRunner.query(`ALTER TABLE "schedule_employees" DROP CONSTRAINT "FK_bc48914e8bc5c6c8c880861d12a"`);
    await queryRunner.query(`DROP INDEX "IDX_565f9e9552d478ea5336f3f3c9"`);
    await queryRunner.query(`DROP INDEX "IDX_bc48914e8bc5c6c8c880861d12"`);
    await queryRunner.query(`ALTER TABLE "schedule_employees" DROP CONSTRAINT "PK_808fdbaf6c544b6b2a3eda2bc87"`);
    await queryRunner.query(
      `ALTER TABLE "schedule_employees" ADD CONSTRAINT "PK_bc48914e8bc5c6c8c880861d12a" PRIMARY KEY ("schedule_id")`,
    );
    await queryRunner.query(`ALTER TABLE "schedule_employees" DROP COLUMN "employee_id"`);
    await queryRunner.query(`ALTER TABLE "schedule_employees" DROP CONSTRAINT "PK_bc48914e8bc5c6c8c880861d12a"`);
    await queryRunner.query(`ALTER TABLE "schedule_employees" DROP COLUMN "schedule_id"`);
    await queryRunner.query(`ALTER TABLE "schedule_employees" ADD "employees_id" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "schedule_employees" ADD CONSTRAINT "PK_795096906b7edf494ea034530e5" PRIMARY KEY ("employees_id")`,
    );
    await queryRunner.query(`ALTER TABLE "schedule_employees" ADD "schedule_event" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "schedule_employees" DROP CONSTRAINT "PK_795096906b7edf494ea034530e5"`);
    await queryRunner.query(
      `ALTER TABLE "schedule_employees" ADD CONSTRAINT "PK_0fa400f66b57bd9050213bd47cf" PRIMARY KEY ("schedule_event", "employees_id")`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_795096906b7edf494ea034530e" ON "schedule_employees" ("employees_id") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_207c6955ea9beeab8cda85e983" ON "schedule_employees" ("schedule_event") `,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule_employees" ADD CONSTRAINT "FK_795096906b7edf494ea034530e5" FOREIGN KEY ("employees_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule_employees" ADD CONSTRAINT "FK_207c6955ea9beeab8cda85e983f" FOREIGN KEY ("schedule_event") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
