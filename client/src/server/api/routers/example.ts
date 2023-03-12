import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ startsWith: z.string().length(1) }))
    .query(({ input, ctx }) => {
      return ctx.prisma.test.findFirst({
        where: { name: { startsWith: input.startsWith } },
        include: {
          things: true,
        },
      });
    }),
  world: publicProcedure
    .input(z.object({ ownerId: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.thing.findFirst({ where: { ownerId: input.ownerId } });
    }),
});
