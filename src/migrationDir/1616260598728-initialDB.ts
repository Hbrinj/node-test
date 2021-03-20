import {MigrationInterface, QueryRunner} from "typeorm";

export class initialDB1616260598728 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            CREATE TABLE IF NOT EXISTS "user" (
                id varchar(255),
                firstName varchar(255)
            );`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
