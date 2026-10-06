-- AlterTable: add nullable slug + images array first, backfill, then enforce NOT NULL/UNIQUE
ALTER TABLE "products" ADD COLUMN "slug" TEXT;
ALTER TABLE "products" ADD COLUMN "images" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

-- Перенести существующее одиночное фото в новый массив, если оно было
UPDATE "products" SET "images" = ARRAY["imageUrl"] WHERE "imageUrl" IS NOT NULL;

-- Сгенерировать slug из существующих данных (name -> kebab-case транслит),
-- уникальность гарантируется явным списком — на момент миграции в таблице
-- только посевные 9 товаров с известными именами.
UPDATE "products" SET "slug" = 'stremyanka-kompaktnaya' WHERE "name" = 'Стремянка компактная' AND "slug" IS NULL;
UPDATE "products" SET "slug" = 'stremyanka-vysokaya' WHERE "name" = 'Стремянка высокая' AND "slug" IS NULL;
UPDATE "products" SET "slug" = 'lestnica-pristavnaya' WHERE "name" = 'Лестница приставная' AND "slug" IS NULL;
UPDATE "products" SET "slug" = 'lestnica-transformer' WHERE "name" = 'Лестница трансформер' AND "slug" IS NULL;
UPDATE "products" SET "slug" = 'vyshka-mobilnaya' WHERE "name" = 'Вышка мобильная' AND "slug" IS NULL;
UPDATE "products" SET "slug" = 'podmosti-rabochie' WHERE "name" = 'Подмости рабочие' AND "slug" IS NULL;
UPDATE "products" SET "slug" = 'opory' WHERE "name" = 'Опоры' AND "slug" IS NULL;
UPDATE "products" SET "slug" = 'poruchni' WHERE "name" = 'Поручни' AND "slug" IS NULL;
UPDATE "products" SET "slug" = 'kolesa' WHERE "name" = 'Колёса' AND "slug" IS NULL;

-- Фоллбэк на случай любых других/будущих рядов без совпадения по имени выше
UPDATE "products" SET "slug" = 'product-' || "id" WHERE "slug" IS NULL;

ALTER TABLE "products" ALTER COLUMN "slug" SET NOT NULL;
ALTER TABLE "products" DROP COLUMN "imageUrl";

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");
