import { z } from "zod";
import { TRPCError } from "@trpc/server";

import {
  createTRPCRouter,
  publicProcedure,

} from "~/server/api/trpc";

export const profilesRouter = createTRPCRouter({



  getById: publicProcedure
  .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: {id} }) => {
      const profile = await ctx.prisma.profile.findUnique({
        where: {id},
      });


      if (!profile) throw new TRPCError({ code: "NOT_FOUND" });

      return profile
  

    }),

});


