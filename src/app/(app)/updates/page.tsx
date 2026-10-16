import Link from "next/link";
import { and, desc, eq, gte, isNotNull, isNull, ne } from "drizzle-orm";
import { BellRing, ExternalLink, GraduationCap } from "lucide-react";
import { requirePermission } from "@/lib/auth/dal";
import { getDb } from "@/lib/db/client";
import { kbDocuments, kbSyncRuns } from "@/lib/db/schema";
import { allLessons } from "@/content";
import { groupUpdates, parsePeriod, UPDATE_PERIODS } from "@/lib/kb/updates";
import { date, dateTime } from "@/lib/format";
import { daysAgo } from "@/lib/time";
import styles from "@/components/ask/ask.module.css";

export const metadata = { title: "HMRC updates" };

/** Groups show this many pages until the reader opens the group on its own. */
const PER_GROUP = 8;
/** Hard cap on pages loaded for one view (a 90-day window can hold a few thousand changes). */
const MAX_DOCS = 1500;

export default async function UpdatesPage({ searchParams }: { searchParams: Promise<{ days?: string; area?: string }> }) {
  await requirePermission("learning.view");
  const sp = await searchParams;
  const days = parsePeriod(sp.days);
  const area = sp.area?.slice(0, 200);
  const db = await getDb();

  const [docs, lastRun] = await Promise.all([
    db
      .select({ url: kbDocuments.url, title: kbDocuments.title, collection: kbDocuments.collection, publisher: kbDocuments.publisher, sourceUpdatedAt: kbDocuments.sourceUpdatedAt })
      .from(kbDocuments)
      .where(and(isNull(kbDocuments.removedAt), isNotNull(kbDocuments.sourceUpdatedAt), gte(kbDocuments.sourceUpdatedAt, daysAgo(days)), area ? eq(kbDocuments.collection, area) : undefined))
      .orderBy(desc(kbDocuments.sourceUpdatedAt))
      .limit(MAX_DOCS),
    db.select({ finishedAt: kbSyncRuns.finishedAt }).from(kbSyncRuns).where(and(isNotNull(kbSyncRuns.finishedAt), ne(kbSyncRuns.status, "failed"))).orderBy(desc(kbSyncRuns.finishedAt)).limit(1),
  ]);

  const lessons = allLessons().map((l) => ({ id: l.id, title: l.lesson.title, trackTitle: l.track.title, sourceUrls: l.lesson.sources.map((s) => s.url) }));
  const { cited, groups } = groupUpdates(
    docs.map((d) => ({ ...d, sourceUpdatedAt: d.sourceUpdatedAt! })),
    lessons
  );
  const qs = (p: { days?: number; area?: string | null }) => {
    const d = p.days ?? days;
    const a = p.area === undefined ? area : p.area;
    const parts = [d !== 7 && `days=${d}`, a && `area=${encodeURIComponent(a)}`].filter(Boolean);
    return parts.length ? `/updates?${parts.join("&")}` : "/updates";
  };

  return (
    <>
      <div className="page-head">
        <div>
          <h1>HMRC updates</h1>
          <p className="muted" style={{ maxWidth: 780 }}>
            Official HMRC and Companies House pages that have changed recently, taken from Capto&apos;s synced copy of GOV.UK. Pages our courses cite are listed first, with the lessons they affect.
            {lastRun[0]?.finishedAt ? ` Last checked ${dateTime(lastRun[0].finishedAt)}.` : ""}
          </p>
        </div>
      </div>

      <div className="row" style={{ gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
        {UPDATE_PERIODS.map((d) => (
          <Link key={d} href={qs({ days: d })} className={`btn btn-sm${d === days ? " btn-primary" : ""}`} aria-current={d === days ? "page" : undefined}>
            Last {d} days
          </Link>
        ))}
        {area && (
          <Link href={qs({ area: null })} className="btn btn-sm">
            Show all areas
          </Link>
        )}
        <span className="small muted">
          {docs.length >= MAX_DOCS ? `Showing the latest ${MAX_DOCS.toLocaleString("en-GB")} changes` : `${docs.length.toLocaleString("en-GB")} page${docs.length === 1 ? "" : "s"} changed`}
        </span>
      </div>

      {docs.length === 0 ? (
        <div className="card card-pad muted small">No official pages {area ? "in this area " : ""}have changed in the last {days} days.</div>
      ) : (
        <div className="stack" style={{ gap: 14 }}>
          {cited.length > 0 && (
            <section className="card card-pad stack" style={{ gap: 10, borderLeft: "4px solid var(--primary)" }}>
              <div className={styles.kicker}>
                <BellRing size={13} /> Behind your courses: {cited.length} changed page{cited.length === 1 ? "" : "s"}
              </div>
              <p className="small muted" style={{ margin: 0 }}>
                These pages are cited by Capto lessons. The change may be minor, but check the page before relying on the lesson. Our content reviewers are told about each one.
              </p>
              {cited.map((d) => (
                <div key={d.url} className="stack" style={{ gap: 4 }}>
                  <a href={d.url} target="_blank" rel="noopener noreferrer">
                    <strong>{d.title}</strong> <ExternalLink size={12} />
                  </a>
                  <div className="faint small">
                    {d.publisher} · updated {date(d.sourceUpdatedAt)}
                  </div>
                  <div className="row small" style={{ gap: 10, flexWrap: "wrap" }}>
                    {d.lessons.map((l) => (
                      <Link key={l.id} href={`/learn/${l.id}`} className="row" style={{ gap: 4 }}>
                        <GraduationCap size={13} /> {l.title} <span className="faint">· {l.trackTitle}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {groups.map((g) => {
            const shown = area ? g.docs : g.docs.slice(0, PER_GROUP);
            return (
              <section key={g.collection} className="card card-pad stack" style={{ gap: 8 }}>
                <div className="row between" style={{ gap: 10, flexWrap: "wrap" }}>
                  <h2 className={styles.groupHead} style={{ margin: 0 }}>
                    {g.label} <span className="faint">({g.docs.length})</span>
                  </h2>
                  {!area && g.docs.length > PER_GROUP && (
                    <Link href={qs({ area: g.collection })} className="small">
                      See all {g.docs.length}
                    </Link>
                  )}
                </div>
                {shown.map((d) => (
                  <div key={d.url} className="row between small" style={{ gap: 10 }}>
                    <a href={d.url} target="_blank" rel="noopener noreferrer" style={{ minWidth: 0, overflowWrap: "anywhere" }}>
                      {d.title}
                      {d.lessons.length > 0 && <span className="pill" style={{ marginLeft: 6 }}>In our courses</span>}
                    </a>
                    <span className="faint" style={{ whiteSpace: "nowrap" }}>{date(d.sourceUpdatedAt)}</span>
                  </div>
                ))}
              </section>
            );
          })}
        </div>
      )}

      <div className="card card-pad small faint" style={{ marginTop: 14 }}>
        Contains public sector information licensed under the Open Government Licence v3.0. A page shows here when GOV.UK records a change to it, which includes small corrections as well as new rules.
      </div>
    </>
  );
}
