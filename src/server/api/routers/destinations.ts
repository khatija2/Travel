import { z } from "zod";
import { TRPCError } from "@trpc/server";

import {
  createTRPCRouter,
  publicProcedure,

} from "~/server/api/trpc";

export const destinationsRouter = createTRPCRouter({


    getByValue: publicProcedure
    .query(async({ ctx }) => {
     const destinations = await ctx.prisma.destinations.findMany({
        where: {
            destination: {
                in: ['Mauritius', 'Australia', 'Ireland', 'Spain', 'Cape Town', 'Turkey'],
              }, 
            },
        take: 6,
    
      });
  
        if (!destinations) throw new TRPCError({ code: "NOT_FOUND" })
        return destinations
     
    
  
      }),
  
    })




