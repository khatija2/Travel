/*
  Warnings:

  - You are about to drop the column `itineraryId` on the `Hotels` table. All the data in the column will be lost.
  - You are about to drop the column `nights` on the `Hotels` table. All the data in the column will be lost.
  - Added the required column `stayId` to the `Hotels` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Hotels" DROP CONSTRAINT "Hotels_itineraryId_fkey";

-- DropIndex
DROP INDEX "Hotels_itineraryId_key";

-- AlterTable
ALTER TABLE "Hotels" DROP COLUMN "itineraryId",
DROP COLUMN "nights",
ADD COLUMN     "stayId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Stays" (
    "id" SERIAL NOT NULL,
    "nights" TEXT NOT NULL,
    "itineraryId" INTEGER NOT NULL,

    CONSTRAINT "Stays_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Stays" ADD CONSTRAINT "Stays_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itinerary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotels" ADD CONSTRAINT "Hotels_stayId_fkey" FOREIGN KEY ("stayId") REFERENCES "Stays"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
