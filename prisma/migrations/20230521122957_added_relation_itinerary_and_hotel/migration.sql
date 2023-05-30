/*
  Warnings:

  - You are about to drop the `_HotelsToItinerary` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[itineraryId]` on the table `Hotels` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `itineraryId` to the `Hotels` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_HotelsToItinerary" DROP CONSTRAINT "_HotelsToItinerary_A_fkey";

-- DropForeignKey
ALTER TABLE "_HotelsToItinerary" DROP CONSTRAINT "_HotelsToItinerary_B_fkey";

-- AlterTable
ALTER TABLE "Hotels" ADD COLUMN     "itineraryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_HotelsToItinerary";

-- CreateIndex
CREATE UNIQUE INDEX "Hotels_itineraryId_key" ON "Hotels"("itineraryId");

-- AddForeignKey
ALTER TABLE "Hotels" ADD CONSTRAINT "Hotels_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itinerary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
