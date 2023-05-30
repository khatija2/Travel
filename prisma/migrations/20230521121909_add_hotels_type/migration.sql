/*
  Warnings:

  - You are about to drop the column `hotels` on the `Itinerary` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Itinerary" DROP COLUMN "hotels";

-- CreateTable
CREATE TABLE "_HotelsToItinerary" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HotelsToItinerary_AB_unique" ON "_HotelsToItinerary"("A", "B");

-- CreateIndex
CREATE INDEX "_HotelsToItinerary_B_index" ON "_HotelsToItinerary"("B");

-- AddForeignKey
ALTER TABLE "_HotelsToItinerary" ADD CONSTRAINT "_HotelsToItinerary_A_fkey" FOREIGN KEY ("A") REFERENCES "Hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HotelsToItinerary" ADD CONSTRAINT "_HotelsToItinerary_B_fkey" FOREIGN KEY ("B") REFERENCES "Itinerary"("id") ON DELETE CASCADE ON UPDATE CASCADE;
