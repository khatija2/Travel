import {
    createTRPCRouter,
    publicProcedure,
  } from "~/server/api/trpc";

  
  export const holidaysRouter = createTRPCRouter({
  
  
    getByValue: publicProcedure
    .query(async({ ctx }) => {
     const holidays = await ctx.prisma.profile.findMany({
        where: {
            trip: {
                hasSome: ["HOLIDAYS"] 
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
  
        if (!holidays) return;
        return holidays
     
    
  
      }),
  
  });