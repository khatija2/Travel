import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,

} from "~/server/api/trpc";

export const itineraryRouter = createTRPCRouter({


  getbyProfileId: publicProcedure
  .input(z.object({ profileId: z.string() }))
    .query(async ({ ctx, input: {profileId} }) => {
      const itinerary = await ctx.prisma.itinerary.findUnique({
        where: {profileId},
        include: {stays: {
            include: {hotel: true}
        }}
      });
      if (!itinerary) return;

      return itinerary
   
  

    }),

});