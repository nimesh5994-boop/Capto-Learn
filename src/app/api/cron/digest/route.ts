import { and, eq, isNull, or } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { customRoles, organizations, users } from "@/lib/db/schema";
import { buildDigest } from "@/lib/alerts/digest";
import { reviewerUpdate, teamOverdue } from "@/lib/alerts/digestExtras";
import { digestDue, digestIsEmpty, renderDigestEmail, reviewerSectionEmpty, type Digest } from "@/lib/alerts/digestRules";
import { emailConfigured, sendEmail } from "@/lib/email";
import { isPlatformAdminEmail } from "@/lib/auth/dal";
import { isPlatformRole, permissionsFor, platformPermissionsFor } from "@/lib/rbac";
import { orgHasFeature } from "@/lib/plans";
import { appUrl } from "@/lib/url";

// Weekly Monday email (Vercel Cron). Free: database only, no AI. One email per person combining:
//  - "what changed" (saved/approved answers, lessons, guidance in their topics) — if they have the weekly update on;
//  - their team's overdue training — managers (assignments.manage), also under the weekly update switch;
//  - the reviewer update — content reviewers who haven't switched it off.
// digestSentAt makes a re-run in the same week a no-op.
export const maxDuration = 300;

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) return new Response("Unauthorized", { status: 401 });
  if (!emailConfigured()) return Response.json({ ok: true, skipped: "Email is not configured (RESEND_API_KEY / EMAIL_FROM)" });

  const db = await getDb();
  const people = await db
    .select({ user: users, org: organizations, customRole: customRoles })
    .from(users)
    .innerJoin(organizations, eq(organizations.id, users.organizationId))
    .leftJoin(customRoles, eq(customRoles.id, users.customRoleId))
    .where(and(eq(users.status, "active"), eq(organizations.status, "active"), or(eq(users.digestEnabled, true), and(eq(users.reviewerDigestEnabled, true), eq(organizations.kind, "internal")))));

  const now = new Date();
  const fallbackSince = new Date(now.getTime() - 7 * 86_400_000);
  let sent = 0;
  let quiet = 0;
  let failed = 0;
  const started = Date.now();
  const overdueByOrg = new Map<string, Awaited<ReturnType<typeof teamOverdue>>>();
  let reviewer: Digest["reviewer"] | undefined;
  for (const { user, org, customRole } of people) {
    if (Date.now() - started > 250_000) break; // the rest go next week rather than time out
    if (!digestDue(user.digestSentAt, now)) continue;
    // Same rules as sign-in: custom roles count only while the firm's plan includes them; platform roles only
    // inside the internal workspace (or for the bootstrap admin emails).
    const perms = permissionsFor(user.role, customRole && orgHasFeature(org, "customRoles") ? customRole.permissions : null);
    const platformRole = isPlatformAdminEmail(user.email) ? "super_admin" : org.kind === "internal" && isPlatformRole(user.platformRole) ? user.platformRole : null;
    const isReviewer = platformPermissionsFor(platformRole).has("platform.content.review");

    const digest: Digest = user.digestEnabled
      ? await buildDigest({ userId: user.id, orgId: org.id, chosenTopics: user.digestTopics, canRegister: perms.has("research.register") && orgHasFeature(org, "research") }, user.digestSentAt ?? fallbackSince)
      : { saved: [], approved: [], guidance: [], guidanceTotal: 0, lessons: [] };
    if (user.digestEnabled && perms.has("assignments.manage") && orgHasFeature(org, "assignments")) {
      if (!overdueByOrg.has(org.id)) overdueByOrg.set(org.id, await teamOverdue(org.id, now));
      const o = overdueByOrg.get(org.id)!;
      digest.overdueTeam = o.items;
      digest.overdueTotal = o.total;
    }
    if (isReviewer && user.reviewerDigestEnabled) {
      reviewer ??= await reviewerUpdate(fallbackSince);
      if (!reviewerSectionEmpty(reviewer)) digest.reviewer = reviewer;
    }
    if (digestIsEmpty(digest)) {
      quiet++;
      continue;
    }
    const { subject, html, text } = renderDigestEmail(digest, { name: user.name, firm: org.name, appUrl: appUrl(), color: org.brandColor });
    // Claim the week before sending, so an overlapping run can't send the same person a second copy.
    const [claimed] = await db
      .update(users)
      .set({ digestSentAt: now })
      .where(and(eq(users.id, user.id), user.digestSentAt ? eq(users.digestSentAt, user.digestSentAt) : isNull(users.digestSentAt)))
      .returning({ id: users.id });
    if (!claimed) continue;
    const r = await sendEmail({ to: user.email, subject, html, text, fromName: `${org.name} via Capto Learn`, log: { kind: "digest", organizationId: org.id, relatedId: user.id } });
    if (r.sent) sent++;
    else {
      failed++;
      // Not sent: free the week up again so next Monday tries normally.
      await db.update(users).set({ digestSentAt: user.digestSentAt }).where(eq(users.id, user.id));
    }
  }
  return Response.json({ ok: true, people: people.length, sent, quiet, failed });
}
