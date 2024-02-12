import { MigrationInterface, QueryRunner } from "typeorm";

export class TestingFiles1707731805073 implements MigrationInterface {
    name = 'TestingFiles1707731805073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."profile_role_enum" AS ENUM('admin', 'user', 'unknown')`);
        await queryRunner.query(`CREATE TABLE "profile" ("Id" SERIAL NOT NULL, "userName" character varying NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "phonenumber" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "role" "public"."profile_role_enum" NOT NULL DEFAULT 'user', "blocked" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_91a037d628bd794d35486996eab" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "Google" ("userid" SERIAL NOT NULL, "displayName" character varying NOT NULL, "picture" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying, "blocked" boolean NOT NULL DEFAULT false, "created_At" TIMESTAMP NOT NULL DEFAULT now(), "update_At" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_52bad4dea71c1cc8208b0e3d1ed" PRIMARY KEY ("userid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Google"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TYPE "public"."profile_role_enum"`);
    }

}
