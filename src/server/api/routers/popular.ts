import {
    createTRPCRouter,
    publicProcedure,
  } from "~/server/api/trpc";
  import { z } from "zod";
  import { TRPCError } from "@trpc/server";


  export const popularRouter = createTRPCRouter({
  
  
    getByValue: publicProcedure
    .input(z.object({ place: z.string() }))
    .query(async ({ ctx, input: {place} }) => {
     const popular = await ctx.prisma.profile.findMany({
       where: {
        OR: [
            { location: { some: {location: place} } },
            { cities: { some: {city: place} } },
          ],
      },
        select: {
            rating: true,
            title: true,
            cities: true,
            nights: true,
            image: true,
            price_excl: true,
            price_incl: true,
            id: true,
            createdAt: true
         },
      });
    
        if (!popular) throw new TRPCError({ code: "NOT_FOUND" });
        return popular


  
      }),

  });