/*
 * When assigned training gets a reminder. Pure, so it's unit-tested.
 *  - "due_soon": the due date is 0–3 calendar days away, the training isn't finished, and it was assigned at least a
 *    day ago (someone assigned it yesterday for Friday has just had the "you've been assigned" email).
 *  - "overdue": the due date passed within the last 2 days and it isn't finished — sent once, the day it becomes
 *    overdue, never as a backlog for assignments that were already long overdue.
 * Each is sent at most once per assignment (dueSoonSentAt / overdueSentAt), and the cron claims the row before sending.
 */

export type ReminderStage = "due_soon" | "overdue";

export const DUE_SOON_DAYS = 3;
const DAY = 86_400_000;

/** Whole UTC calendar days from `now` to the due date (due dates are stored as the end of a UTC day). */
export function daysUntilDue(due: Date, now: Date): number {
  const d = Date.UTC(due.getUTCFullYear(), due.getUTCMonth(), due.getUTCDate());
  const n = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.round((d - n) / DAY);
}

export function reminderStage(
  a: { dueDate: Date | null; createdAt: Date; cancelledAt: Date | null; dueSoonSentAt: Date | null; overdueSentAt: Date | null },
  complete: boolean,
  now: Date
): ReminderStage | null {
  if (!a.dueDate || a.cancelledAt || complete) return null;
  const past = now.getTime() - a.dueDate.getTime();
  if (past > 0) return !a.overdueSentAt && past <= 2 * DAY ? "overdue" : null;
  const days = daysUntilDue(a.dueDate, now);
  if (a.dueSoonSentAt || days > DUE_SOON_DAYS) return null;
  if (now.getTime() - a.createdAt.getTime() < DAY) return null;
  return "due_soon";
}

/** Where an assignment opens: the course or lesson page (a module opens its course). */
export function assignmentPath(targetType: string, targetId: string): string {
  if (targetType === "module") return `/learn/${targetId.split("/")[0]}`;
  return `/learn/${targetId}`;
}
