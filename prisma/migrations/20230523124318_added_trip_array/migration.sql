/*
  Warnings:

  - Changed the column `trip_index` on the `Profile` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "trip_index" SET DATA TYPE "Trip"[];
