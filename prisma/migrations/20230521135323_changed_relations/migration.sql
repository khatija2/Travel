/*
  Warnings:

  - You are about to drop the column `stayId` on the `Hotels` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Hotels" DROP CONSTRAINT "Hotels_stayId_fkey";

-- AlterTable
ALTER TABLE "Hotels" DROP COLUMN "stayId";

-- CreateTable
CREATE TABLE "_HotelsToStays" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HotelsToStays_AB_unique" ON "_HotelsToStays"("A", "B");

-- CreateIndex
CREATE INDEX "_HotelsToStays_B_index" ON "_HotelsToStays"("B");

-- AddForeignKey
ALTER TABLE "_HotelsToStays" ADD CONSTRAINT "_HotelsToStays_A_fkey" FOREIGN KEY ("A") REFERENCES "Hotels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HotelsToStays" ADD CONSTRAINT "_HotelsToStays_B_fkey" FOREIGN KEY ("B") REFERENCES "Stays"("id") ON DELETE CASCADE ON UPDATE CASCADE;
