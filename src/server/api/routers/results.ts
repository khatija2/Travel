import { z } from "zod";
import { TRPCError } from "@trpc/server";



import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";



export const resultsRouter = createTRPCRouter({

  getByValue: publicProcedure
    .query(async({ ctx }) => {
     const results = await ctx.prisma.profile.findMany({
        where: {
            trip_index: {
              search: 'tours',
        } },
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
  
        if (!cruises) return;
        return cruises
     
    
  
      }),
  

});