import { z } from "zod";
import { TRPCError } from "@trpc/server";



import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";



export const dealsRouter = createTRPCRouter({


  getAll: publicProcedure
  .query(({ ctx }) => {
   const deals = ctx.prisma.deals.findMany({
     include: {
        profile: { 
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
       },}}
    });

      if (!deals) throw new TRPCError({ code: "NOT_FOUND" })
      return deals
   
  

    }),

});