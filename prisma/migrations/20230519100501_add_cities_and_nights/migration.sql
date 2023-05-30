-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(100) NOT NULL,
    "description" VARCHAR(450) NOT NULL,
    "cities" TEXT[],
    "nights" TEXT NOT NULL,
    "accommodation" VARCHAR(250) NOT NULL,
    "flights" VARCHAR(250) NOT NULL,
    "transfers" VARCHAR(250) NOT NULL,
    "meals" VARCHAR(250) NOT NULL,
    "includes" VARCHAR(450)[],
    "info" VARCHAR(450)[],
    "price_excl" VARCHAR(450) NOT NULL,
    "prince_incl" VARCHAR(8) NOT NULL,
    "image" VARCHAR(8) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);
