import {MigrationInterface, QueryRunner} from "typeorm";

export class setup1602599619652 implements MigrationInterface {
    name = 'setup1602599619652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "lastModifiedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "deletable" boolean NOT NULL, "parentProject" integer, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_07e66bf88ade8f806a59966bdd" ON "project" ("parentProject") `);
        await queryRunner.query(`CREATE TYPE "PriorityEnum" AS ENUM('high', 'medium', 'low')`);
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "lastModifiedAt" TIMESTAMP NOT NULL DEFAULT now(), "description" text NOT NULL, "dueDate" date, "priority" "PriorityEnum", "project" integer, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "lastModifiedAt" TIMESTAMP NOT NULL DEFAULT now(), "text" text NOT NULL, "task" integer NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_comment_task" ON "comment" ("task") `);
        await queryRunner.query(`CREATE TABLE "label" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "lastModifiedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_5692ac5348861d3776eb5843672" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_07e66bf88ade8f806a59966bdd9" FOREIGN KEY ("parentProject") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_4c51a834127c63a5d3999ba81e1" FOREIGN KEY ("project") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_9b11780d812a18e98731a1e65ed" FOREIGN KEY ("task") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_9b11780d812a18e98731a1e65ed"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_4c51a834127c63a5d3999ba81e1"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_07e66bf88ade8f806a59966bdd9"`);
        await queryRunner.query(`DROP TABLE "label"`);
        await queryRunner.query(`DROP INDEX "idx_comment_task"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TYPE "PriorityEnum"`);
        await queryRunner.query(`DROP INDEX "IDX_07e66bf88ade8f806a59966bdd"`);
        await queryRunner.query(`DROP TABLE "project"`);
    }

}
