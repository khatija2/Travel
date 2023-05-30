/*
  Warnings:

  - You are about to drop the column `itineraryId` on the `Stays` table. All the data in the column will be lost.
  - You are about to drop the `_HotelsToStays` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[stayId]` on the table `Itinerary` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stayId` to the `Hotels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stayId` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hotelId` to the `Stays` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Stays" DROP CONSTRAINT "Stays_itineraryId_fkey";

-- DropForeignKey
ALTER TABLE "_HotelsToStays" DROP CONSTRAINT "_HotelsToStays_A_fkey";

-- DropForeignKey
ALTER TABLE "_HotelsToStays" DROP CONSTRAINT "_HotelsToStays_B_fkey";

-- AlterTable
ALTER TABLE "Hotels" ADD COLUMN     "stayId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Itinerary" ADD COLUMN     "stayId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Stays" DROP COLUMN "itineraryId",
ADD COLUMN     "hotelId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_HotelsToStays";

-- CreateIndex
CREATE UNIQUE INDEX "Itinerary_stayId_key" ON "Itinerary"("stayId");

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_stayId_fkey" FOREIGN KEY ("stayId") REFERENCES "Stays"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotels" ADD CONSTRAINT "Hotels_stayId_fkey" FOREIGN KEY ("stayId") REFERENCES "Stays"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
