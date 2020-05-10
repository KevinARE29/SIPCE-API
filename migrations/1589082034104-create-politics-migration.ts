import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1589082034104 implements MigrationInterface {
    name = 'Migration1589082034104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "politics" ("id" SERIAL NOT NULL, "min_length" integer NOT NULL, "capital_letter" boolean NOT NULL, "lower_case" boolean NOT NULL, "special_char" boolean NOT NULL, "numeric_char" boolean NOT NULL, "type_special" character varying(512) NOT NULL, CONSTRAINT "PK_d5d96581c708f0452e156075b6e" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "politics"`, undefined);
    }

}
