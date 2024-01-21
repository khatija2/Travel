import {
    createTRPCRouter,
    publicProcedure,
  } from "~/server/api/trpc";
  import { z } from "zod";


  export const searchPlacesRouter = createTRPCRouter({
  

  
    getValue: publicProcedure
    .input(z.object({ searchValue: z.string() }))
    .query(async ({ ctx, input: {searchValue} }) => {
      const locations = await ctx.prisma.locations.findMany({
        where: {
          location: { contains: searchValue, mode: 'insensitive' },
        },
        select: {location: true}
      });

      const cities = await ctx.prisma.cities.findMany({
        where: {
          city: { contains: searchValue, mode: 'insensitive' },
        },
        select: {city: true}
      });


      const places = [...locations, ...cities];
    
        if (places.length === 0) return []
        const results =  places.flatMap(place => Object.values(place));
        return results
    })

  
  });

