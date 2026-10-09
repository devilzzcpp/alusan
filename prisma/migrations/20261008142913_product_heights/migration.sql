-- AlterTable
ALTER TABLE "products" ADD COLUMN     "heights" TEXT[] DEFAULT ARRAY[]::TEXT[];
