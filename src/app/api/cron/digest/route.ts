import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { customRoles, organizations, users } from "@/lib/db/schema";
import { buildDigest } from "@/lib/alerts/digest";
import { digestDue, digestIsEmpty, renderDigestEmail } from "@/lib/alerts/digestRules";
import { emailConfigured, sendEmail } from "@/lib/email";
import { permissionsFor } from "@/lib/rbac";
import { orgHasFeature } from "@/lib/plans";
import { appUrl } from "@/lib/url";

// Weekly "what changed" email (Vercel Cron, Monday morning). Free: database only, no AI.
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
    .where(and(eq(users.status, "active"), eq(users.digestEnabled, true), eq(organizations.status, "active")));

  const now = new Date();
  const fallbackSince = new Date(now.getTime() - 7 * 86_400_000);
  let sent = 0;
  let quiet = 0;
  let failed = 0;
  const started = Date.now();
  for (const { user, org, customRole } of people) {
    if (Date.now() - started > 250_000) break; // the rest go next week rather than time out
    if (!digestDue(user.digestSentAt, now)) continue;
    // Same rule as sign-in: custom roles count only while the firm's plan includes them.
    const perms = permissionsFor(user.role, customRole && orgHasFeature(org, "customRoles") ? customRole.permissions : null);
    const digest = await buildDigest({ userId: user.id, orgId: org.id, chosenTopics: user.digestTopics, canRegister: perms.has("research.register") && orgHasFeature(org, "research") }, user.digestSentAt ?? fallbackSince);
    if (digestIsEmpty(digest)) {
      quiet++;
      continue;
    }
    const { subject, html } = renderDigestEmail(digest, { name: user.name, firm: org.name, appUrl: appUrl(), color: org.brandColor });
    const r = await sendEmail({ to: user.email, subject, html, fromName: `${org.name} via Capto Learn`, log: { kind: "digest", organizationId: org.id, relatedId: user.id } });
    if (r.sent) {
      sent++;
      await db.update(users).set({ digestSentAt: now }).where(eq(users.id, user.id));
    } else failed++;
  }
  return Response.json({ ok: true, people: people.length, sent, quiet, failed });
}
