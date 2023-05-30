/*
  Warnings:

  - Added the required column `name` to the `Hotels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hotels" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Stays" ALTER COLUMN "nights" DROP NOT NULL;
