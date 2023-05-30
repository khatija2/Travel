/*
  Warnings:

  - You are about to drop the column `prince_incl` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "prince_incl",
ADD COLUMN     "price_incl" VARCHAR(8);
