import { MigrationInterface, QueryRunner } from "typeorm";

export class TestingFiles1708007508751 implements MigrationInterface {
    name = 'TestingFiles1708007508751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Dashboard" RENAME COLUMN "updatedAt" TO "UpdatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Dashboard" RENAME COLUMN "UpdatedAt" TO "updatedAt"`);
    }

}
