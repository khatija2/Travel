import {
    createTRPCRouter,
    publicProcedure,
  } from "~/server/api/trpc";
  import { z } from "zod";
  import { TRPCError } from "@trpc/server";

  export const searchPlacesRouter = createTRPCRouter({
  

  
    getValue: publicProcedure
    .input(z.object({ searchValue: z.string() }))
    .query(async ({ ctx, input: {searchValue} }) => {
     const places = await ctx.prisma.profile.findFirst({
        where: {
            OR: [
                { situated: { hasSome: searchValue } },
                { cities: { hasSome: searchValue } },
              ],
          },
          select: {cities: true,
                  situated: true}
      });
    
        if (!places) throw new TRPCError({ code: "NOT_FOUND" });
        return places

  
      }),

  });

