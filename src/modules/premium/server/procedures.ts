import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { polarClient } from "@/lib/polar";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { count, eq } from "drizzle-orm";

export const premiumRouter = createTRPCRouter({
  getCurrentSubscription: protectedProcedure.query(async ({ ctx }) => {
    try {
      const customer = await polarClient.customers.getStateExternal({
        externalId: ctx.auth.user.id,
      });

      const subscription = customer.activeSubscriptions[0];
      if (!subscription) {
        return { id: "free", name: "Free" };
      }

      const product = await polarClient.products.get({
        id: subscription.productId,
      });

      return product;
    } catch (err) {
      console.error("getCurrentSubscription error:", err);
      return { id: "free", name: "Free" }; // fallback
    }
  }),

  getProducts: protectedProcedure.query(async () => {
    const products = await polarClient.products.list({
      isArchived: false,
      isRecurring: true,
      sorting: ["price_amount"],
    });

    return products.result.items;
  }),

  getFreeUsage: protectedProcedure.query(async ({ ctx }) => {
    try {
      const customer = await polarClient.customers.getStateExternal({
        externalId: ctx.auth.user.id,
      });

      const subscription = customer.activeSubscriptions[0];
      if (subscription) {
        return null; // subscribed users don’t need free usage
      }
    } catch {
      // no customer in Polar yet → treat as free tier
    }

    const [userMeetings] = await db
      .select({ count: count(meetings.id) })
      .from(meetings)
      .where(eq(meetings.userId, ctx.auth.user.id));

    const [userAgents] = await db
      .select({ count: count(agents.id) })
      .from(agents)
      .where(eq(agents.userId, ctx.auth.user.id));

    return {
      meetingCount: userMeetings.count,
      agentCount: userAgents.count,
    };
  }),
});
