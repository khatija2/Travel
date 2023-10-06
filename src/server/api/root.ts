import { createTRPCRouter } from "~/server/api/trpc";
import { profilesRouter } from "~/server/api/routers/profiles";
import { itineraryRouter} from "~/server/api/routers/itinerary";
import { dealsRouter } from "./routers/deals";
import { holidaysRouter } from "./routers/holidays";
import { toursRouter } from "./routers/tours";
import { cruisesRouter } from "./routers/cruises";
import { destinationsRouter } from "./routers/destinations";
import { popularRouter } from "./routers/popular";
import { specialsRouter } from "./routers/specials";
import { searchPlacesRouter } from "./routers/searchPlaces";
import { resultsRouter } from "./routers/results";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  profiles: profilesRouter,
  itinerary: itineraryRouter,
  deals: dealsRouter,
  holidays: holidaysRouter,
  tours: toursRouter,
  cruises: cruisesRouter,
  destinations: destinationsRouter,
  popular: popularRouter,
  specials: specialsRouter,
  places: searchPlacesRouter,
  results: resultsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
