import {
    createTRPCRouter,
    publicProcedure,
  } from "~/server/api/trpc";
  
  
  
  export const cruisesRouter = createTRPCRouter({
  
  
    getByValue: publicProcedure
    .query(async({ ctx }) => {
     const cruises = await ctx.prisma.profile.findMany({
        where: {
            trip: {
                hasSome: ["CRUISES"] 
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