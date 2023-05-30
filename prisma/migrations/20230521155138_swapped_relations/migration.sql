/*
  Warnings:

  - You are about to drop the column `stayId` on the `Hotels` table. All the data in the column will be lost.
  - You are about to drop the column `stayId` on the `Itinerary` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[itineraryId]` on the table `Stays` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `itineraryId` to the `Stays` table without a default value. This is not possible if the table is not empty.
  - Made the column `nights` on table `Stays` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Hotels" DROP CONSTRAINT "Hotels_stayId_fkey";

-- DropForeignKey
ALTER TABLE "Itinerary" DROP CONSTRAINT "Itinerary_stayId_fkey";

-- DropIndex
DROP INDEX "Itinerary_stayId_key";

-- AlterTable
ALTER TABLE "Hotels" DROP COLUMN "stayId";

-- AlterTable
ALTER TABLE "Itinerary" DROP COLUMN "stayId",
ALTER COLUMN "daily" SET DATA TYPE TEXT[];

-- AlterTable
ALTER TABLE "Stays" ADD COLUMN     "itineraryId" INTEGER NOT NULL,
ALTER COLUMN "nights" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Stays_itineraryId_key" ON "Stays"("itineraryId");

-- AddForeignKey
ALTER TABLE "Stays" ADD CONSTRAINT "Stays_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stays" ADD CONSTRAINT "Stays_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itinerary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
