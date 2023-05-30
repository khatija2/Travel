/*
  Warnings:

  - A unique constraint covering the columns `[hotelId,id]` on the table `Stays` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Stays_hotelId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Stays_hotelId_id_key" ON "Stays"("hotelId", "id");
