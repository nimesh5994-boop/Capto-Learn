"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db/client";
import { planningScenarios, users, type ResearchReviewStatus } from "@/lib/db/schema";
import { sendBuiltEmail } from "@/lib/email";
import { registerChangesEmail } from "@/lib/emailContent";
import { firmBrandOf } from "@/lib/notify";
import { appUrl } from "@/lib/url";
import { audit, actorOf } from "@/lib/audit";
import { authorize } from "@/lib/auth/dal";

/**
 * A reviewer's decision on a tax planning scenario, for the research register. Approved scenarios are visible to the
 * whole firm; "needs changes" asks the preparer to follow up (they are emailed the note, never the scenario).
 */
export async function reviewScenario(id: string, status: ResearchReviewStatus | null, note?: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const ctx = await authorize("research.register", { write: true });
  const db = await getDb();
  const clean = (note ?? "").trim().slice(0, 2000) || null;
  if (status === "changes" && !clean) return { ok: false, error: "Say what needs changing, so the person who prepared it can follow it up." };
  const [row] = await db
    .update(planningScenarios)
    .set(status ? { reviewStatus: status, reviewedById: ctx.user.id, reviewedByName: ctx.user.name, reviewedAt: new Date(), reviewNote: clean } : { reviewStatus: null, reviewedById: null, reviewedByName: null, reviewedAt: null, reviewNote: null })
    .where(and(eq(planningScenarios.id, id), eq(planningScenarios.organizationId, ctx.org.id)))
    .returning({ title: planningScenarios.title, userId: planningScenarios.userId, hasReport: planningScenarios.report });
  if (!row) return { ok: false, error: "Scenario not found." };
  if (status === "approved" && !row.hasReport) {
    await db.update(planningScenarios).set({ reviewStatus: null, reviewedById: null, reviewedByName: null, reviewedAt: null, reviewNote: null }).where(eq(planningScenarios.id, id));
    return { ok: false, error: "This scenario has no written report to approve. Run it again first." };
  }
  const what = status === "approved" ? "Approved" : status === "changes" ? "Asked for changes to" : "Cleared the review of";
  await audit(actorOf(ctx), "planning.reviewed", `${what} the tax planning scenario "${row.title.slice(0, 120)}"${clean ? `: ${clean.slice(0, 200)}` : ""}`, { type: "planning_scenario", id });
  if (status === "changes" && clean && row.userId && row.userId !== ctx.user.id) {
    const [preparer] = await db
      .select({ name: users.name, email: users.email })
      .from(users)
      .where(and(eq(users.id, row.userId), eq(users.organizationId, ctx.org.id), eq(users.status, "active")));
    if (preparer)
      await sendBuiltEmail({
        to: preparer.email,
        email: registerChangesEmail({ firm: firmBrandOf(ctx.org), name: preparer.name, reviewerName: ctx.user.name, question: row.title, note: clean, link: `${appUrl()}/planning/${id}` }),
        fromName: ctx.org.name,
        replyTo: ctx.user.email,
        log: { kind: "register_review", organizationId: ctx.org.id, relatedId: id },
      });
  }
  revalidatePath(`/planning/${id}`);
  revalidatePath("/ask/register");
  return { ok: true };
}
