import {MigrationInterface, QueryRunner} from "typeorm";

export class completed1602689085863 implements MigrationInterface {
    name = 'completed1602689085863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task_label" ("task" integer NOT NULL, "label" integer NOT NULL, CONSTRAINT "PK_12497a18bd857c4e58114d30b84" PRIMARY KEY ("task", "label"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b047332751ff055f7072b36e02" ON "task_label" ("task") `);
        await queryRunner.query(`CREATE INDEX "IDX_e68e3f7b938ed4ca2e0e65d2b4" ON "task_label" ("label") `);
        await queryRunner.query(`ALTER TABLE "task" ADD "completed" boolean NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."PriorityEnum" RENAME TO "PriorityEnum_old"`);
        await queryRunner.query(`CREATE TYPE "PriorityEnum" AS ENUM('high', 'medium', 'low')`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "priority" TYPE "PriorityEnum" USING "priority"::"text"::"PriorityEnum"`);
        await queryRunner.query(`DROP TYPE "PriorityEnum_old"`);
        await queryRunner.query(`ALTER TABLE "task_label" ADD CONSTRAINT "FK_b047332751ff055f7072b36e02b" FOREIGN KEY ("task") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_label" ADD CONSTRAINT "FK_e68e3f7b938ed4ca2e0e65d2b4f" FOREIGN KEY ("label") REFERENCES "label"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_label" DROP CONSTRAINT "FK_e68e3f7b938ed4ca2e0e65d2b4f"`);
        await queryRunner.query(`ALTER TABLE "task_label" DROP CONSTRAINT "FK_b047332751ff055f7072b36e02b"`);
        await queryRunner.query(`CREATE TYPE "PriorityEnum_old" AS ENUM()`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "priority" TYPE "PriorityEnum_old" USING "priority"::"text"::"PriorityEnum_old"`);
        await queryRunner.query(`DROP TYPE "task_priority_enum"`);
        await queryRunner.query(`ALTER TYPE "PriorityEnum_old" RENAME TO  "PriorityEnum"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "completed"`);
        await queryRunner.query(`DROP INDEX "IDX_e68e3f7b938ed4ca2e0e65d2b4"`);
        await queryRunner.query(`DROP INDEX "IDX_b047332751ff055f7072b36e02"`);
        await queryRunner.query(`DROP TABLE "task_label"`);
    }

}
