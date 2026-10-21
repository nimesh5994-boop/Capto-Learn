import "server-only";
import { and, eq, gte, isNotNull, isNull, lte, or } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { assignments, organizations, users } from "@/lib/db/schema";
import { lessonsForTarget, targetTitle } from "@/content";
import { progressFor } from "@/lib/learning/progress";
import { orgHasFeature } from "@/lib/plans";
import { sendBuiltEmail } from "@/lib/email";
import { trainingReminderEmail } from "@/lib/emailContent";
import { firmBrandOf } from "@/lib/notify";
import { assignmentPath, reminderStage } from "@/lib/reminderRules";
import { appUrl } from "@/lib/url";

/**
 * Daily: "due in a few days" and "now overdue" reminders for assigned training (see lib/reminderRules.ts).
 * Idempotent — each reminder is claimed on its assignment row (dueSoonSentAt / overdueSentAt) before it's sent, so a
 * re-run, or two runs at once, never sends it twice. Only to active people who haven't switched reminders off.
 */
export async function sendTrainingReminders(now = new Date(), budgetMs = 60_000): Promise<{ checked: number; sent: number; skipped: number }> {
  const started = Date.now();
  const db = await getDb();
  const rows = await db
    .select({ a: assignments, u: users, org: organizations })
    .from(assignments)
    .innerJoin(users, eq(users.id, assignments.userId))
    .innerJoin(organizations, eq(organizations.id, assignments.organizationId))
    .where(
      and(
        isNull(assignments.cancelledAt),
        isNotNull(assignments.dueDate),
        gte(assignments.dueDate, new Date(now.getTime() - 3 * 86_400_000)),
        lte(assignments.dueDate, new Date(now.getTime() + 5 * 86_400_000)),
        or(isNull(assignments.dueSoonSentAt), isNull(assignments.overdueSentAt)),
        eq(users.status, "active"),
        eq(users.trainingRemindersEnabled, true),
        eq(organizations.status, "active")
      )
    );
  const progress = await progressFor([...new Set(rows.map((r) => r.u.id))]);
  let sent = 0;
  let skipped = 0;
  for (const { a, u, org } of rows) {
    if (Date.now() - started > budgetMs) break; // the rest go tomorrow (the overdue window is 2 days)
    if (!orgHasFeature(org, "assignments")) continue;
    const lessons = lessonsForTarget(a.targetType, a.targetId);
    const p = progress.get(u.id) ?? new Map();
    const done = lessons.filter((l) => p.get(l.id)?.status === "completed").length;
    const stage = reminderStage(a, lessons.length > 0 && done === lessons.length, now);
    if (!stage) continue;
    const col = stage === "overdue" ? assignments.overdueSentAt : assignments.dueSoonSentAt;
    const [claimed] = await db
      .update(assignments)
      .set(stage === "overdue" ? { overdueSentAt: now } : { dueSoonSentAt: now })
      .where(and(eq(assignments.id, a.id), isNull(col)))
      .returning({ id: assignments.id });
    if (!claimed) continue;
    const mail = await sendBuiltEmail({
      to: u.email,
      email: trainingReminderEmail({
        firm: firmBrandOf(org),
        name: u.name,
        title: targetTitle(a.targetType, a.targetId),
        dueDate: a.dueDate!,
        done,
        total: lessons.length,
        stage,
        link: `${appUrl()}${assignmentPath(a.targetType, a.targetId)}`,
        settingsUrl: `${appUrl()}/account`,
      }),
      fromName: org.name,
      log: { kind: "training_reminder", organizationId: org.id, relatedId: a.id },
    });
    if (mail.sent) sent++;
    else skipped++;
  }
  return { checked: rows.length, sent, skipped };
}
