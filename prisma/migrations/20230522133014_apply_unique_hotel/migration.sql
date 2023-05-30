/*
  Warnings:

  - A unique constraint covering the columns `[hotelId]` on the table `Stays` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Stays_hotelId_key" ON "Stays"("hotelId");
