import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationName1738441380544 implements MigrationInterface {
  name = 'MigrationName1738441380544';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "order_entity" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, "total" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_428b558237e70f2cd8462e1bea1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_item_entity" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "price" numeric NOT NULL, "orderId" integer, "productId" integer, CONSTRAINT "PK_c12e105219e59720676c72957dc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Cart" ("id" SERIAL NOT NULL, "userId" integer, CONSTRAINT "PK_012c8ac0dc98012aed2f7766e01" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "CartItem" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "cartId" integer, "productId" integer, CONSTRAINT "PK_ed839195df950f7ef36a1f17ac2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_entity" ADD CONSTRAINT "FK_c8ab590f1e10afcf1637e71a71e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item_entity" ADD CONSTRAINT "FK_cd7ee8cfd1250200aa78d806f8d" FOREIGN KEY ("orderId") REFERENCES "order_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item_entity" ADD CONSTRAINT "FK_9ab23dbbebb09189f395316b609" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Cart" ADD CONSTRAINT "FK_c93d6f0ae7b8bcae9439e871ab1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "CartItem" ADD CONSTRAINT "FK_53f2aba8a21b914f306a990d296" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "CartItem" ADD CONSTRAINT "FK_d26ee078939b94811462a0280d8" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "CartItem" DROP CONSTRAINT "FK_d26ee078939b94811462a0280d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "CartItem" DROP CONSTRAINT "FK_53f2aba8a21b914f306a990d296"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Cart" DROP CONSTRAINT "FK_c93d6f0ae7b8bcae9439e871ab1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item_entity" DROP CONSTRAINT "FK_9ab23dbbebb09189f395316b609"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item_entity" DROP CONSTRAINT "FK_cd7ee8cfd1250200aa78d806f8d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_entity" DROP CONSTRAINT "FK_c8ab590f1e10afcf1637e71a71e"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    await queryRunner.query(`DROP TABLE "CartItem"`);
    await queryRunner.query(`DROP TABLE "Cart"`);
    await queryRunner.query(`DROP TABLE "order_item_entity"`);
    await queryRunner.query(`DROP TABLE "order_entity"`);
  }
}
