import "server-only";
import { and, desc, eq, gte, ilike, inArray, isNotNull, isNull, sql, type SQL } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { emailLog, organizations, type EmailLogRow } from "@/lib/db/schema";
import type { DeliveryStatus, EmailEventPlan, EmailKind, SendStatus } from "@/lib/emailTracking";

export interface EmailLogInput {
  kind: EmailKind;
  organizationId?: string | null;
  relatedId?: string | null;
}

/** Records one send attempt. Never throws — a logging problem must not stop or fail an email. */
export async function recordEmail(row: { log: EmailLogInput; to: string; subject: string; status: SendStatus; providerId?: string | null; error?: string | null }): Promise<void> {
  try {
    const db = await getDb();
    await db.insert(emailLog).values({
      organizationId: row.log.organizationId ?? null,
      relatedId: row.log.relatedId ?? null,
      kind: row.log.kind,
      toEmail: row.to.trim().toLowerCase(),
      subject: row.subject.slice(0, 300),
      status: row.status,
      providerId: row.providerId ?? null,
      error: row.error ? row.error.slice(0, 500) : null,
    });
  } catch (err) {
    console.error("[email log] couldn't record email", err instanceof Error ? err.message : err);
  }
}

/**
 * Applies one webhook event to its email_log row. Idempotent: timestamps keep their first value, and the
 * webhook delivery id (svix-id) is remembered so a retried delivery doesn't bump the open/click counts again.
 * Returns false when no row matches (e.g. an email sent by another app on the same Resend account).
 */
export async function applyEmailEvent(plan: EmailEventPlan, webhookId: string): Promise<boolean> {
  const db = await getDb();
  const at = sql`${plan.at.toISOString()}::timestamptz`;
  const seen = sql`${emailLog.webhookIds} @> jsonb_build_array(${webhookId}::text)`;
  const set: Record<string, unknown> = {
    // Out-of-order events don't move "last event" backwards.
    lastEvent: sql`case when ${emailLog.lastEventAt} is null or ${emailLog.lastEventAt} <= ${at} then ${plan.event}::text else ${emailLog.lastEvent} end`,
    lastEventAt: sql`greatest(coalesce(${emailLog.lastEventAt}, ${at}), ${at})`,
    webhookIds: sql`case when ${seen} then ${emailLog.webhookIds} else (case when jsonb_array_length(${emailLog.webhookIds}) >= 50 then ${emailLog.webhookIds} - 0 else ${emailLog.webhookIds} end) || jsonb_build_array(${webhookId}::text) end`,
  };
  if (plan.stamp) {
    const col = emailLog[plan.stamp];
    set[plan.stamp] = sql`coalesce(${col}, ${at})`;
  }
  if (plan.counter) {
    const col = emailLog[plan.counter];
    set[plan.counter] = sql`case when ${seen} then ${col} else ${col} + 1 end`;
  }
  if (plan.failed) set.status = "failed";
  if (plan.detail) set.error = plan.detail;
  const rows = await db.update(emailLog).set(set).where(eq(emailLog.providerId, plan.providerId)).returning({ id: emailLog.id });
  return rows.length > 0;
}

/** SQL for "the status pill would show X" — mirrors deliveryStatus() in lib/emailTracking.ts. */
export function statusCondition(s: DeliveryStatus): SQL {
  const e = emailLog;
  const noProblem = and(isNull(e.complainedAt), isNull(e.bouncedAt));
  const sentOk = and(eq(e.status, "sent"), noProblem)!;
  switch (s) {
    case "skipped":
      return eq(e.status, "skipped");
    case "failed":
      return eq(e.status, "failed");
    case "complained":
      return and(eq(e.status, "sent"), isNotNull(e.complainedAt))!;
    case "bounced":
      return and(eq(e.status, "sent"), isNull(e.complainedAt), isNotNull(e.bouncedAt))!;
    case "clicked":
      return and(sentOk, isNotNull(e.firstClickedAt))!;
    case "opened":
      return and(sentOk, isNull(e.firstClickedAt), isNotNull(e.openedAt))!;
    case "delivered":
      return and(sentOk, isNull(e.firstClickedAt), isNull(e.openedAt), isNotNull(e.deliveredAt))!;
    case "delayed":
      return and(sentOk, isNull(e.firstClickedAt), isNull(e.openedAt), isNull(e.deliveredAt), isNotNull(e.delayedAt))!;
    case "sent":
      return and(sentOk, isNull(e.firstClickedAt), isNull(e.openedAt), isNull(e.deliveredAt), isNull(e.delayedAt))!;
  }
}

export const EMAIL_PAGE_SIZE = 100;

export async function listEmailLog(f: { orgId?: string | null; platformOnly?: boolean; kind?: EmailKind | null; status?: DeliveryStatus | null; q?: string | null; page: number }) {
  const db = await getDb();
  const where: SQL[] = [];
  if (f.orgId) where.push(eq(emailLog.organizationId, f.orgId));
  else if (f.platformOnly) where.push(isNull(emailLog.organizationId));
  if (f.kind) where.push(eq(emailLog.kind, f.kind));
  if (f.status) where.push(statusCondition(f.status));
  if (f.q) where.push(ilike(emailLog.toEmail, `%${f.q.replace(/[%_\\]/g, (c) => `\\${c}`)}%`));
  const cond = where.length ? and(...where) : undefined;
  const [rows, [total]] = await Promise.all([
    db
      .select({ e: emailLog, firm: organizations.name })
      .from(emailLog)
      .leftJoin(organizations, eq(organizations.id, emailLog.organizationId))
      .where(cond)
      .orderBy(desc(emailLog.sentAt))
      .limit(EMAIL_PAGE_SIZE)
      .offset((f.page - 1) * EMAIL_PAGE_SIZE),
    db.select({ n: sql<number>`count(*)::int` }).from(emailLog).where(cond),
  ]);
  return { rows, total: total.n };
}

/** Headline numbers for the last 30 days. Delivered % is of emails sent; opened % is of emails delivered. */
export async function emailSummary(orgId?: string | null) {
  const db = await getDb();
  const since = new Date(Date.now() - 30 * 86_400_000);
  const [r] = await db
    .select({
      sent: sql<number>`count(*) filter (where ${emailLog.status} = 'sent')::int`,
      delivered: sql<number>`count(*) filter (where ${emailLog.status} = 'sent' and (${emailLog.deliveredAt} is not null or ${emailLog.openedAt} is not null or ${emailLog.firstClickedAt} is not null))::int`,
      opened: sql<number>`count(*) filter (where ${emailLog.status} = 'sent' and (${emailLog.openedAt} is not null or ${emailLog.firstClickedAt} is not null))::int`,
      bounced: sql<number>`count(*) filter (where ${emailLog.bouncedAt} is not null)::int`,
      complained: sql<number>`count(*) filter (where ${emailLog.complainedAt} is not null)::int`,
      failed: sql<number>`count(*) filter (where ${emailLog.status} = 'failed')::int`,
      skipped: sql<number>`count(*) filter (where ${emailLog.status} = 'skipped')::int`,
      withEvents: sql<number>`count(*) filter (where ${emailLog.lastEvent} is not null)::int`,
    })
    .from(emailLog)
    .where(and(gte(emailLog.sentAt, since), ...(orgId ? [eq(emailLog.organizationId, orgId)] : [])));
  return r;
}

/** The most recent email about each of these records (e.g. invitation ids). */
export async function latestEmailByRelated(relatedIds: string[]): Promise<Map<string, EmailLogRow>> {
  if (!relatedIds.length) return new Map();
  const db = await getDb();
  const rows = await db
    .selectDistinctOn([emailLog.relatedId])
    .from(emailLog)
    .where(inArray(emailLog.relatedId, relatedIds))
    .orderBy(emailLog.relatedId, desc(emailLog.sentAt));
  return new Map(rows.map((r) => [r.relatedId!, r]));
}

/** The most recent email to each of these addresses within one firm (for the Users list). */
export async function latestEmailByAddress(orgId: string, emails: string[]): Promise<Map<string, EmailLogRow>> {
  if (!emails.length) return new Map();
  const db = await getDb();
  const lower = emails.map((e) => e.toLowerCase());
  const rows = await db
    .selectDistinctOn([emailLog.toEmail])
    .from(emailLog)
    .where(and(eq(emailLog.organizationId, orgId), inArray(emailLog.toEmail, lower)))
    .orderBy(emailLog.toEmail, desc(emailLog.sentAt));
  return new Map(rows.map((r) => [r.toEmail, r]));
}

/** A cutoff n days back — kept out of page components, where calling Date.now() trips the React purity lint. */
export const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000);
