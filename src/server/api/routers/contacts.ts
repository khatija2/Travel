import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";




export const contactsRouter = createTRPCRouter({

contactCreate: publicProcedure
.input(z.object({ email: z.string() }))
.mutation(async ({ ctx, input }) => {
  const { email } = input
  const contact = await ctx.prisma.contacts.create({
      data: {
        email,
      },
    })

    return contact
  })
})

