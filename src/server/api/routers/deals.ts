import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";



export const dealsRouter = createTRPCRouter({


  getAll: publicProcedure
  .query(async ({ ctx }) => {
   const deals = await ctx.prisma.deals.findMany({
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