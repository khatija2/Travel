-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "includes" SET DATA TYPE VARCHAR[],
ALTER COLUMN "info" SET DATA TYPE VARCHAR[],
ALTER COLUMN "price_excl" DROP NOT NULL,
ALTER COLUMN "prince_incl" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Itinerary" (
    "id" SERIAL NOT NULL,
    "hotels" TEXT[],
    "daily" VARCHAR(450)[],

    CONSTRAINT "Itinerary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hotels" (
    "id" SERIAL NOT NULL,
    "nights" TEXT,
    "stars" TEXT,
    "location" VARCHAR(250),

    CONSTRAINT "Hotels_pkey" PRIMARY KEY ("id")
);
