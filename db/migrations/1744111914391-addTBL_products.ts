import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTBLProducts1744111914391 implements MigrationInterface {
    name = 'AddTBLProducts1744111914391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "prodcuts" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric(10,2) NOT NULL DEFAULT '0', "stock" integer NOT NULL, "images" text NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "addedById" integer, "categoryId" integer, CONSTRAINT "PK_c4eb5bec80b150dc84310eec5ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "prodcuts" ADD CONSTRAINT "FK_e4cb95369587f19a35a1799ad24" FOREIGN KEY ("addedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prodcuts" ADD CONSTRAINT "FK_11de903c87686870d417db20a68" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prodcuts" DROP CONSTRAINT "FK_11de903c87686870d417db20a68"`);
        await queryRunner.query(`ALTER TABLE "prodcuts" DROP CONSTRAINT "FK_e4cb95369587f19a35a1799ad24"`);
        await queryRunner.query(`DROP TABLE "prodcuts"`);
    }

}
