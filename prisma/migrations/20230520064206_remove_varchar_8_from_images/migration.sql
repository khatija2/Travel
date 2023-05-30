/*
  Warnings:

  - You are about to alter the column `price_excl` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `VarChar(450)` to `VarChar(8)`.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "price_excl" SET DATA TYPE VARCHAR(8),
ALTER COLUMN "image" SET DATA TYPE TEXT;
