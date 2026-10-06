-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('owner', 'manager');

-- AlterTable
ALTER TABLE "admin_users" ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "role" "AdminRole" NOT NULL DEFAULT 'manager';

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_phone_key" ON "admin_users"("phone");
