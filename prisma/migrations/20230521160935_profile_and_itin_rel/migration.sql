/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `Itinerary` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `Itinerary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Itinerary" ADD COLUMN     "profileId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Itinerary_profileId_key" ON "Itinerary"("profileId");

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
