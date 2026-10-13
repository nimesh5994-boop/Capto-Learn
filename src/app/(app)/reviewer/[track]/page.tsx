import Link from "next/link";
import { notFound } from "next/navigation";
import { getTrack } from "@/content";
import { LEVELS } from "@/content/types";
import { reviewState } from "@/lib/learning/reviewQueue";
import { date } from "@/lib/format";
import { ReviewPill } from "@/components/learn/bits";

export const metadata = { title: "Review centre" };

export default async function ReviewerCoursePage({ params, searchParams }: { params: Promise<{ track: string }>; searchParams: Promise<{ show?: string }> }) {
  const { track: slug } = await params;
  const { show = "all" } = await searchParams;
  const track = getTrack(slug);
  if (!track) notFound();
  const items = (await reviewState()).filter((i) => i.ref.track.slug === slug);
  const shown = show === "todo" ? items.filter((i) => i.todo) : items;
  const next = items.find((i) => i.todo);

  return (
    <>
      <div className="page-head">
        <div>
          <div className="small muted">
            <Link href="/reviewer">Review centre</Link> /
          </div>
          <h1>{track.title}</h1>
          <p className="muted">
            {items.filter((i) => !i.todo).length} of {items.length} lessons signed off.
          </p>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <Link href={show === "todo" ? "?" : "?show=todo"} className="btn btn-sm">
            {show === "todo" ? "Show all" : "Only to do"}
          </Link>
          {next && (
            <Link href={`/reviewer/lesson/${next.ref.id}`} className="btn btn-primary btn-sm">
              Review next
            </Link>
          )}
        </div>
      </div>

      <section className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Lesson</th>
              <th>Status</th>
              <th>Last decision</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {shown.map((i) => (
              <tr key={i.ref.id}>
                <td>
                  <strong>{i.ref.lesson.title}</strong>
                  <div className="small faint">
                    {i.ref.module.title === LEVELS[i.ref.lesson.level].label ? LEVELS[i.ref.lesson.level].label : `${i.ref.module.title} · ${LEVELS[i.ref.lesson.level].label}`} · {i.ref.lesson.minutes} min
                    {i.ref.lesson.taxYear ? ` · ${i.ref.lesson.taxYear}` : ""}
                  </div>
                </td>
                <td>
                  <ReviewPill status={i.status} />
                  {i.stale && (
                    <div className="small" style={{ color: "var(--warning)" }}>
                      Source changed {date(i.sourceChangedAt)}
                    </div>
                  )}
                </td>
                <td className="small">
                  {i.row?.reviewedAt ? (
                    <>
                      {i.row.reviewerName}
                      <div className="faint">{date(i.row.reviewedAt)}</div>
                    </>
                  ) : (
                    <span className="faint">—</span>
                  )}
                </td>
                <td className="right">
                  <Link href={`/reviewer/lesson/${i.ref.id}`} className={`btn btn-sm ${i.todo ? "btn-primary" : ""}`}>
                    {i.todo ? "Review" : "View"}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
