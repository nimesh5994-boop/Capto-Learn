"use server";

import { revalidatePath } from "next/cache";
import { and, eq, inArray, isNull } from "drizzle-orm";
import * as z from "zod";
import { getDb } from "@/lib/db/client";
import { assignments, contentReviewEvents, contentReviews, lessonFeedback, users } from "@/lib/db/schema";
import { AccessError, authorize, authorizePlatform } from "@/lib/auth/dal";
import { actorOf, audit } from "@/lib/audit";
import { getLesson, lessonsForTarget, targetTitle } from "@/content";
import { lessonHash } from "@/lib/learning/review";
import { CHECKLIST_KEYS, type ChecklistKey } from "@/lib/learning/reviewChecklist";
import { sendBuiltEmail } from "@/lib/email";
import { after } from "next/server";
import { trainingAssignedEmail } from "@/lib/emailContent";
import { assignmentPath } from "@/lib/reminderRules";
import { firmBrandOf } from "@/lib/notify";
import { appUrl } from "@/lib/url";

export type ActionResult = { ok: true; message: string } | { ok: false; error: string };

async function guard(fn: () => Promise<string>): Promise<ActionResult> {
  try {
    return { ok: true, message: await fn() };
  } catch (err) {
    if (err instanceof AccessError) return { ok: false, error: err.message };
    throw err;
  }
}

const AssignSchema = z.object({
  userIds: z.array(z.uuid()).min(1, { error: "Choose at least one person." }).max(200),
  targetType: z.enum(["track", "module", "lesson"]),
  targetId: z.string().min(1).max(200),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal("")),
  note: z.string().trim().max(500).optional(),
});

export async function assignTraining(input: z.input<typeof AssignSchema>): Promise<ActionResult> {
  return guard(async () => {
    const ctx = await authorize("assignments.manage", { write: true, feature: "assignments" });
    const parsed = AssignSchema.safeParse(input);
    if (!parsed.success) throw new AccessError(parsed.error.issues[0]?.message ?? "Check the assignment.");
    const { userIds, targetType, targetId, dueDate, note } = parsed.data;
    if (!lessonsForTarget(targetType, targetId).length) throw new AccessError("That course isn't available.");
    const db = await getDb();
    const members = await db
      .select({ id: users.id, name: users.name, email: users.email })
      .from(users)
      .where(and(eq(users.organizationId, ctx.org.id), inArray(users.id, userIds), eq(users.status, "active")));
    if (members.length !== userIds.length) throw new AccessError("Some of those people aren't active members of your firm.");
    const due = dueDate ? new Date(`${dueDate}T23:59:59Z`) : null;
    const rows = await db
      .insert(assignments)
      .values(userIds.map((userId) => ({ organizationId: ctx.org.id, userId, targetType, targetId, dueDate: due, note: note || null, assignedBy: ctx.user.id })))
      .returning({ id: assignments.id, userId: assignments.userId });
    const title = targetTitle(targetType, targetId);
    await audit(actorOf(ctx), "training.assigned", `Assigned "${title}" to ${userIds.length} ${userIds.length === 1 ? "person" : "people"}${dueDate ? `, due ${dueDate}` : ""}`, { type: "assignment", id: targetId });
    // Everyone assigned gets an email (essential — not covered by the reminders switch). Not to yourself.
    const lessons = lessonsForTarget(targetType, targetId).length;
    const link = `${appUrl()}${assignmentPath(targetType, targetId)}`;
    // Emails go out after the response, so assigning a whole team doesn't keep the manager waiting
    // (sends are paced for Resend's rate limit). Each send is logged in the email log either way.
    const recipients = rows.map((r) => ({ r, m: members.find((x) => x.id === r.userId) })).filter((x) => x.m && x.m.id !== ctx.user.id);
    after(async () => {
      for (const { r, m } of recipients) {
        await sendBuiltEmail({
          to: m!.email,
          email: trainingAssignedEmail({ firm: firmBrandOf(ctx.org), name: m!.name, assignerName: ctx.user.name, title, lessons, dueDate: due, note: note || null, link }),
          fromName: ctx.org.name,
          replyTo: ctx.user.email,
          log: { kind: "training_assigned", organizationId: ctx.org.id, relatedId: r.id },
        }).catch((err) => console.error("[assign email]", err));
      }
    });
    revalidatePath("/team");
    return `Assigned "${title}" to ${userIds.length} ${userIds.length === 1 ? "person" : "people"}.${recipients.length ? " They'll get an email shortly." : ""}`;
  });
}

export async function cancelAssignment(id: string): Promise<ActionResult> {
  return guard(async () => {
    const ctx = await authorize("assignments.manage", { write: true });
    const db = await getDb();
    const [row] = await db
      .update(assignments)
      .set({ cancelledAt: new Date() })
      .where(and(eq(assignments.id, id), eq(assignments.organizationId, ctx.org.id), isNull(assignments.cancelledAt)))
      .returning();
    if (!row) throw new AccessError("That assignment was already removed.");
    await audit(actorOf(ctx), "training.unassigned", `Removed assignment "${targetTitle(row.targetType, row.targetId)}"`, { type: "assignment", id });
    revalidatePath("/team");
    return "Assignment removed.";
  });
}

/* ───────────── Platform: technical review of lessons ───────────── */

const ReviewSchema = z.object({ status: z.enum(["draft", "reviewed", "needs_changes"]), notes: z.string().trim().max(3000).optional(), checklist: z.array(z.enum(CHECKLIST_KEYS as [ChecklistKey, ...ChecklistKey[]])).max(20).optional() });

export async function setLessonReview(lessonId: string, input: { status: string; notes?: string; checklist?: string[] }): Promise<ActionResult> {
  return guard(async () => {
    const ctx = await authorizePlatform("platform.content.review");
    const ref = getLesson(lessonId);
    if (!ref) throw new AccessError("Unknown lesson.");
    const parsed = ReviewSchema.safeParse(input);
    if (!parsed.success) throw new AccessError("Choose a review status.");
    const checklist = [...new Set(parsed.data.checklist ?? [])];
    if (parsed.data.status === "reviewed" && checklist.length < CHECKLIST_KEYS.length)
      throw new AccessError("Tick every item on the checklist before signing off.");
    if (parsed.data.status === "needs_changes" && !parsed.data.notes) throw new AccessError("Say what needs changing in the notes.");
    // Sign-off is shown to learners with the reviewer's qualifications, so they must be on file first.
    const credentials = ctx.user.qualifications?.trim() || null;
    if (parsed.data.status === "reviewed" && !credentials) throw new AccessError("Add your professional qualifications (e.g. CTA, ACA) under My account → Profile before signing off.");
    const db = await getDb();
    const row = {
      lessonId,
      status: parsed.data.status,
      contentHash: lessonHash(ref.lesson),
      reviewerUserId: ctx.user.id,
      reviewerName: ctx.user.name,
      reviewerCredentials: credentials,
      notes: parsed.data.notes || null,
      reviewedAt: new Date(),
      updatedAt: new Date(),
    };
    await db.insert(contentReviews).values(row).onConflictDoUpdate({ target: contentReviews.lessonId, set: row });
    await db.insert(contentReviewEvents).values({ lessonId, status: row.status, contentHash: row.contentHash, reviewerUserId: ctx.user.id, reviewerName: ctx.user.name, reviewerCredentials: credentials, notes: row.notes, checklist });
    revalidatePath("/platform/content");
    revalidatePath("/reviewer", "layout");
    revalidatePath("/learn", "layout");
    return parsed.data.status === "reviewed" ? `Signed off "${ref.lesson.title}".` : `Marked "${ref.lesson.title}" as ${parsed.data.status.replace("_", " ")}.`;
  });
}

export async function resolveFeedback(id: string, status: "fixed" | "dismissed", note?: string): Promise<ActionResult> {
  return guard(async () => {
    await authorizePlatform("platform.content.review");
    const db = await getDb();
    const [row] = await db.update(lessonFeedback).set({ status, resolvedNote: note?.trim() || null }).where(eq(lessonFeedback.id, id)).returning();
    if (!row) throw new AccessError("That report no longer exists.");
    revalidatePath("/platform/content");
    return status === "fixed" ? "Marked as fixed." : "Dismissed.";
  });
}
