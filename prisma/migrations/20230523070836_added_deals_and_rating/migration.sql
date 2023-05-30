-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "rating" DECIMAL(65,30);

-- CreateTable
CREATE TABLE "Deals" (
    "id" SERIAL NOT NULL,
    "profileId" UUID NOT NULL,

    CONSTRAINT "Deals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Deals_profileId_key" ON "Deals"("profileId");

-- AddForeignKey
ALTER TABLE "Deals" ADD CONSTRAINT "Deals_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
