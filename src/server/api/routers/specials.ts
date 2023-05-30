

import {
    createTRPCRouter,
    publicProcedure,
  } from "~/server/api/trpc";
  
  
  
  export const specialsRouter = createTRPCRouter({
  
  
    getSome: publicProcedure
    .query(({ ctx }) => {
     const specials = ctx.prisma.deals.findMany({
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
  
        if (!specials) return;
        return specials
     
    
  
      }),
  
  });