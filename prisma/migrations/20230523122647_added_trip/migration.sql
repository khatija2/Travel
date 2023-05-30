-- CreateEnum
CREATE TYPE "Trip" AS ENUM ('HOLIDAYS', 'CRUISES', 'TOURS', 'RESORTS', 'FLIGHTS');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "trip_index" "Trip";
