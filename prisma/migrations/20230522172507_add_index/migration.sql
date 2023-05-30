-- CreateIndex
CREATE INDEX "Itinerary_profileId_idx" ON "Itinerary"("profileId");

-- CreateIndex
CREATE INDEX "Stays_itineraryId_idx" ON "Stays"("itineraryId");
