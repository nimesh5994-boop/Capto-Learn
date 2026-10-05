import "server-only";
import { and, eq, gte, isNull, ne, sql } from "drizzle-orm";
import type { DB } from "@/lib/db/client";
import { invitations, researchQueries, users, type Organization } from "@/lib/db/schema";
import { orgLimits, planOf } from "@/lib/plans";
import { AccessError } from "@/lib/auth/dal";

export async function usage(db: DB, org: Organization) {
  const monthStart = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), 1));
  const [[u], [inv], [p]] = await Promise.all([
    db.select({ n: sql<number>`count(*)::int` }).from(users).where(and(eq(users.organizationId, org.id), eq(users.status, "active"))),
    db
      .select({ n: sql<number>`count(*)::int` })
      .from(invitations)
      .where(and(eq(invitations.organizationId, org.id), isNull(invitations.acceptedAt), isNull(invitations.revokedAt), gte(invitations.expiresAt, new Date()))),
    // Failed attempts (outages, missing key) don't use up the firm's allowance.
    db.select({ n: sql<number>`count(*)::int` }).from(researchQueries).where(and(eq(researchQueries.organizationId, org.id), gte(researchQueries.createdAt, monthStart), ne(researchQueries.status, "failed"))),
  ]);
  return { activeUsers: u.n, pendingInvites: inv.n, researchThisMonth: p.n };
}

/** Seats count active users plus outstanding invitations, so a firm can't over-invite past its plan. */
export async function assertSeatAvailable(db: DB, org: Organization) {
  const plan = planOf(org.plan);
  const { maxUsers } = orgLimits(org);
  if (maxUsers === null) return;
  const u = await usage(db, org);
  if (u.activeUsers + u.pendingInvites >= maxUsers)
    throw new AccessError(`Your ${plan.label} plan includes ${maxUsers} user${maxUsers === 1 ? "" : "s"}. Upgrade on the Billing page to add more.`);
}

export async function assertResearchQuota(db: DB, org: Organization) {
  const plan = planOf(org.plan);
  const { maxResearchPerMonth } = orgLimits(org);
  if (maxResearchPerMonth === null) return;
  const u = await usage(db, org);
  if (u.researchThisMonth >= maxResearchPerMonth)
    throw new AccessError(`Your firm has used all ${maxResearchPerMonth} Ask Capto questions included this month on the ${plan.label} plan. Upgrade on the Billing page for more.`);
}
