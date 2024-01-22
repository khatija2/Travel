

import {
    createTRPCRouter,
    publicProcedure,
  } from "~/server/api/trpc";
  import { TRPCError } from "@trpc/server";
  
  
  
  export const specialsRouter = createTRPCRouter({
  
  
    getSome: publicProcedure
    .query(async({ ctx }) => {
     const specials = await ctx.prisma.deals.findMany({
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
                  id: true
         },
        }},
        take: 15
      });
  
        if (!specials) throw new TRPCError({ code: "NOT_FOUND" })
        return specials
     
    
  
      }),
  
  });