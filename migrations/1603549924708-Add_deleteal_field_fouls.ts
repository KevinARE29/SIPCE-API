import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDeletealFieldFouls1603549924708 implements MigrationInterface {
    name = 'AddDeletealFieldFouls1603549924708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fouls" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fouls" DROP COLUMN "deleted_at"`);
}

}
