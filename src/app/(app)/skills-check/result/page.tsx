import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { ArrowRight, Sparkles } from "lucide-react";
import { requirePermission } from "@/lib/auth/dal";
import { getDb } from "@/lib/db/client";
import { users } from "@/lib/db/schema";
import { getTrack, trackLessons } from "@/content";
import { LEVELS } from "@/content/types";
import { latestSkillChecks } from "@/lib/learning/skillCheck";
import { suggestedOrder } from "@/lib/learning/placement";
import { date } from "@/lib/format";
import { TrackIcon } from "@/components/learn/bits";

export const metadata = { title: "Skills check results" };

export default async function SkillsCheckResultPage({ searchParams }: { searchParams: Promise<{ user?: string }> }) {
  const ctx = await requirePermission("learning.view");
  const { user: asked } = await searchParams;
  let person = { id: ctx.user.id, name: ctx.user.name };
  if (asked && asked !== ctx.user.id) {
    if (!ctx.can("progress.view_team")) notFound();
    const db = await getDb();
    const [row] = await db.select({ id: users.id, name: users.name }).from(users).where(and(eq(users.id, asked), eq(users.organizationId, ctx.org.id)));
    if (!row) notFound();
    person = row;
  }
  const own = person.id === ctx.user.id;
  const check = (await latestSkillChecks([person.id])).get(person.id);
  if (!check) {
    if (!own) notFound();
    return (
      <div className="card card-pad stack" style={{ gap: 8, maxWidth: 640 }}>
        <strong>You haven&apos;t taken the skills check yet.</strong>
        <Link href="/skills-check" className="btn btn-primary btn-sm" style={{ width: "fit-content" }}>
          Take the skills check
        </Link>
      </div>
    );
  }
  const order = suggestedOrder(check.results).filter((s) => getTrack(s));
  const right = Object.values(check.results).reduce((n, r) => n + r.right, 0);
  const total = Object.values(check.results).reduce((n, r) => n + r.total, 0);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>{own ? "Your skills check results" : `Skills check: ${person.name}`}</h1>
          <p className="muted">
            Taken {date(check.completedAt)} · {right} of {total} right across {order.length} subject{order.length === 1 ? "" : "s"}. Subjects are listed in the order we suggest tackling them.
          </p>
        </div>
        {own && (
          <Link href="/skills-check" className="btn btn-sm">
            Take it again
          </Link>
        )}
      </div>

      <section className="card">
        <table className="table">
          <thead>
            <tr>
              <th colSpan={2}>Subject</th>
              <th>Score</th>
              <th>Suggested start</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {order.map((slug, n) => {
              const r = check.results[slug];
              const t = getTrack(slug)!;
              const first = trackLessons(slug).find((l) => l.lesson.level === r.start);
              return (
                <tr key={slug}>
                  <td style={{ width: 44 }}>
                    <TrackIcon name={t.icon} size={16} />
                  </td>
                  <td>
                    <strong>{t.title}</strong>
                    {n === 0 && r.right < r.total && <div className="small" style={{ color: "var(--primary)" }}>Suggested first</div>}
                  </td>
                  <td className="small num">
                    {"●".repeat(r.right)}
                    <span style={{ color: "var(--border-strong)" }}>{"●".repeat(r.total - r.right)}</span> {r.right}/{r.total}
                  </td>
                  <td className="small">
                    {r.strong ? (
                      <span className="row" style={{ gap: 6 }}>
                        <Sparkles size={14} color="var(--primary)" /> Strong — go straight to Advanced
                      </span>
                    ) : (
                      `${LEVELS[r.start].label} level`
                    )}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {own && first && (
                      <Link href={`/learn/${first.id}`} className="btn btn-sm">
                        Start here <ArrowRight size={14} />
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      {check.notReached.length > 0 && (
        <div className="alert alert-warning" style={{ marginTop: 12 }}>
          {check.timedOut ? "Time ran out before " : "The check was finished before "}
          {check.notReached.map((s) => getTrack(s)?.title ?? s).join(", ")} {check.notReached.length === 1 ? "was" : "were"} reached.{" "}
          {own && (
            <Link href={`/skills-check?go=1&${check.notReached.map((s) => `subjects=${s}`).join("&")}`}>Check {check.notReached.length === 1 ? "it" : "them"} now</Link>
          )}
        </div>
      )}
      <p className="small faint" style={{ marginTop: 12 }}>
        {check.durationSeconds ? `Took ${Math.max(1, Math.round(check.durationSeconds / 60))} min. ` : ""}The check adapts with 2–3 questions per subject, so treat it as a guide. If a lesson feels too easy, use the step list to move on quickly.
      </p>
    </>
  );
}
