import Link from "next/link";
import { redirect } from "next/navigation";
import { desc, eq, and } from "drizzle-orm";
import { requirePermission } from "@/lib/auth/dal";
import { getDb } from "@/lib/db/client";
import { planningScenarios } from "@/lib/db/schema";
import { orgHasFeature, orgLimits } from "@/lib/plans";
import { usage } from "@/lib/entitlements";
import { dateTime } from "@/lib/format";
import { canViewAnswer } from "@/lib/research/register";
import type { ScenarioInput } from "@/lib/planning/types";
import { PlanningBox } from "@/components/planning/PlanningBox";
import styles from "@/components/ask/ask.module.css";

export const metadata = { title: "Tax planning" };

export default async function PlanningPage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  const { from } = await searchParams;
  const ctx = await requirePermission("research.use");
  if (!orgHasFeature(ctx.org, "research")) redirect("/?denied=1");
  const db = await getDb();
  const [mine, use] = await Promise.all([
    db
      .select({ id: planningScenarios.id, title: planningScenarios.title, status: planningScenarios.status, createdAt: planningScenarios.createdAt })
      .from(planningScenarios)
      .where(and(eq(planningScenarios.organizationId, ctx.org.id), eq(planningScenarios.userId, ctx.user.id)))
      .orderBy(desc(planningScenarios.createdAt))
      .limit(25),
    usage(db, ctx.org),
  ]);
  // "Edit and re-run": start the form from an earlier scenario the person is allowed to see.
  let initial: ScenarioInput | undefined;
  if (from && /^[0-9a-f-]{36}$/i.test(from)) {
    const [prev] = await db.select().from(planningScenarios).where(and(eq(planningScenarios.id, from), eq(planningScenarios.organizationId, ctx.org.id)));
    if (prev && canViewAnswer({ organizationId: prev.organizationId, userId: prev.userId, shared: false, reviewStatus: prev.reviewStatus }, { orgId: ctx.org.id, userId: ctx.user.id, canRegister: ctx.can("research.register") })) initial = prev.input;
  }
  const { maxResearchPerMonth } = orgLimits(ctx.org);
  const remaining = maxResearchPerMonth === null ? null : Math.max(0, maxResearchPerMonth - use.researchThisMonth);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Tax planning</h1>
          <p className="muted" style={{ maxWidth: 760 }}>
            Describe a client&apos;s situation and what they want to achieve. Capto breaks it into the separate tax questions, researches each from HMRC manuals, GOV.UK and the professional bodies with every
            quote checked, then drafts the options, a recommendation, the risks and the next steps for you to review.
          </p>
        </div>
      </div>
      <div className={styles.layout}>
        <PlanningBox remaining={remaining} initial={initial} />
        <aside className="stack" style={{ gap: 14 }}>
          <div className="card card-pad">
            <h3 style={{ marginTop: 0 }}>Your scenarios</h3>
            {mine.length === 0 ? (
              <p className="small muted" style={{ margin: 0 }}>
                None yet. Your finished scenarios will be listed here.
              </p>
            ) : (
              <div className={styles.history}>
                {mine.map((s) => (
                  <Link key={s.id} href={`/planning/${s.id}`}>
                    <span>{s.title}</span>
                    <span className="when">
                      {dateTime(s.createdAt)}
                      {s.status !== "completed" ? ` · ${s.status === "partial" ? "research only" : "failed"}` : ""}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="card card-pad small faint">
            A draft for a qualified adviser to review, not advice to the client. It rests only on the guidance found, flags anything it could not verify, and does not calculate tax: use the calculators for the numbers.
          </div>
        </aside>
      </div>
    </>
  );
}
