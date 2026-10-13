import Link from "next/link";
import { desc, eq, sql } from "drizzle-orm";
import { ArrowRight } from "lucide-react";
import { requirePlatform } from "@/lib/auth/dal";
import { getDb } from "@/lib/db/client";
import { contentReviewEvents, lessonFeedback } from "@/lib/db/schema";
import { getLesson, tracks } from "@/content";
import { reviewState } from "@/lib/learning/reviewQueue";
import { dateTime } from "@/lib/format";
import { ProgressBar, TrackIcon } from "@/components/learn/bits";

export const metadata = { title: "Review centre" };

const STATUS_WORD = { reviewed: "Signed off", needs_changes: "Needs changes", draft: "Reset to draft" } as const;

export default async function ReviewerOverview() {
  const ctx = await requirePlatform("platform.content.review");
  const db = await getDb();
  const [items, [reports], mine] = await Promise.all([
    reviewState(),
    db.select({ n: sql<number>`count(*)::int` }).from(lessonFeedback).where(eq(lessonFeedback.status, "open")),
    db.select().from(contentReviewEvents).where(eq(contentReviewEvents.reviewerUserId, ctx.user.id)).orderBy(desc(contentReviewEvents.createdAt)).limit(8),
  ]);
  const signed = items.filter((i) => i.status === "reviewed" && !i.stale).length;
  const next = items.find((i) => i.todo);
  const count = (pred: (i: (typeof items)[number]) => boolean) => items.filter(pred).length;

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Review centre</h1>
          <p className="muted" style={{ maxWidth: 760 }}>
            Check each lesson against the official sources, confirm the checklist and sign it off. Learners see a &ldquo;Reviewed&rdquo; badge only on lessons signed off here, and any later edit sends a
            lesson back for re-review automatically.
          </p>
        </div>
        {next && (
          <Link href={`/reviewer/lesson/${next.ref.id}`} className="btn btn-primary">
            Review next lesson <ArrowRight size={15} />
          </Link>
        )}
      </div>

      <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12, marginBottom: 18 }}>
        {[
          { label: "Signed off", value: `${signed} / ${items.length}`, sub: `${Math.round((signed / items.length) * 100)}% of all lessons` },
          { label: "Waiting for first review", value: count((i) => i.status === "draft"), sub: "AI drafts" },
          { label: "Needs changes", value: count((i) => i.status === "needs_changes"), sub: "sent back by a reviewer" },
          { label: "Re-check needed", value: count((i) => i.status === "changed" || i.stale), sub: "edited, or sources changed" },
          { label: "Open learner reports", value: reports?.n ?? 0, sub: "errors flagged by learners", href: "/platform/content" },
        ].map((s) => (
          <div key={s.label} className="card card-pad">
            <div className="small muted">{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{s.value}</div>
            {s.href ? (
              <Link href={s.href} className="small">
                {s.sub}
              </Link>
            ) : (
              <div className="small faint">{s.sub}</div>
            )}
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ alignItems: "start", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)" }}>
        <section className="card">
          <div className="card-pad" style={{ paddingBottom: 6 }}>
            <h2 style={{ margin: 0 }}>Courses</h2>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th colSpan={2}>Course</th>
                <th style={{ width: "30%" }}>Signed off</th>
                <th className="right">To do</th>
              </tr>
            </thead>
            <tbody>
              {tracks().map((t) => {
                const mine = items.filter((i) => i.ref.track.slug === t.slug);
                const done = mine.filter((i) => !i.todo).length;
                const todo = mine.length - done;
                return (
                  <tr key={t.slug}>
                    <td style={{ width: 40 }}>
                      <TrackIcon name={t.icon} size={15} />
                    </td>
                    <td>
                      <Link href={`/reviewer/${t.slug}`}>
                        <strong>{t.title}</strong>
                      </Link>
                    </td>
                    <td>
                      <ProgressBar pct={(done / mine.length) * 100} label={`${t.title} signed off`} />
                      <span className="small faint">
                        {done}/{mine.length}
                      </span>
                    </td>
                    <td className="right small num">{todo ? <strong>{todo}</strong> : <span className="faint">Done</span>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section className="card card-pad stack" style={{ gap: 10 }}>
          <h2 style={{ margin: 0 }}>Your recent decisions</h2>
          {mine.length === 0 ? (
            <p className="small muted" style={{ margin: 0 }}>
              Nothing yet. Start with &ldquo;Review next lesson&rdquo;.
            </p>
          ) : (
            mine.map((e) => (
              <div key={e.id} className="small">
                <Link href={`/reviewer/lesson/${e.lessonId}`}>{getLesson(e.lessonId)?.lesson.title ?? e.lessonId}</Link>
                <div className="faint">
                  {STATUS_WORD[e.status]} · {dateTime(e.createdAt)}
                </div>
              </div>
            ))
          )}
          <Link href="/reviewer/register" className="small">
            Full approvals register →
          </Link>
        </section>
      </div>
    </>
  );
}
