import {
    createTRPCRouter,
    publicProcedure,
  } from "~/server/api/trpc";
  
  
  
  export const toursRouter = createTRPCRouter({
  
  
    getByValue: publicProcedure
    .query(async({ ctx }) => {
     const tours = await ctx.prisma.profile.findMany({
        where: {
            trip_index: {
                hasSome: ["TOURS"] 
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
  
        if (!tours) return;
        return tours
     
    
  
      }),
  
  });