import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1707495987531 implements MigrationInterface {
    name = 'NewMigrations1707495987531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Google" ADD "blocked" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Google" DROP COLUMN "blocked"`);
    }

}
