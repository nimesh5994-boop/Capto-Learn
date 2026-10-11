import Link from "next/link";
import { desc, isNull, sql } from "drizzle-orm";
import { requirePlatform } from "@/lib/auth/dal";
import { getDb } from "@/lib/db/client";
import { kbDocuments, kbSyncRuns } from "@/lib/db/schema";
import { GUIDANCE_ORGS, LEGISLATION, MANUALS, FULL_SYNC_EVERY_DAYS } from "@/lib/kb/collections";
import { kbStats } from "@/lib/kb/search";
import { getLesson } from "@/content";
import { dateTime } from "@/lib/format";
import { daysAgo } from "@/lib/time";
import { SyncButton } from "./SyncButton";

export const metadata = { title: "Knowledge base" };

const STATUS_PILL: Record<string, string> = { done: "pill-accepted", running: "pill-sent", partial: "pill-viewed", failed: "pill-declined" };

export default async function KnowledgePage() {
  await requirePlatform("platform.content.review");
  const db = await getDb();
  const [stats, runs, perCollection] = await Promise.all([
    kbStats(),
    db.select().from(kbSyncRuns).orderBy(desc(kbSyncRuns.startedAt)).limit(12),
    db
      .select({ collection: kbDocuments.collection, docs: sql<number>`count(*)::int`, latest: sql<Date | null>`max(${kbDocuments.sourceUpdatedAt})` })
      .from(kbDocuments)
      .where(isNull(kbDocuments.removedAt))
      .groupBy(kbDocuments.collection),
  ]);
  const byCollection = new Map(perCollection.map((c) => [c.collection, c]));
  const staleBefore = daysAgo(1 / 48); // a "running" row older than 30 minutes is a crashed run
  const running = runs.some((r) => r.status === "running" && r.startedAt > staleBefore);
  const collections = [
    ...MANUALS.map((m) => ({ ...m, type: "HMRC manual", href: `https://www.gov.uk/hmrc-internal-manuals/${m.slug}` })),
    ...GUIDANCE_ORGS.map((g) => ({ ...g, type: "Guidance", href: `https://www.gov.uk/government/organisations/${g.slug}` })),
    ...LEGISLATION.map((a) => ({ slug: a.id, label: a.label, type: "Legislation", href: `https://www.legislation.gov.uk/${a.id}` })),
  ];
  const legislationStored = LEGISLATION.reduce((n, a) => n + (byCollection.get(a.id)?.docs ?? 0), 0);
  const awaitingAccess = !legislationStored && runs.some((r) => r.note?.includes("legislation.gov.uk is not yet accepting"));

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Knowledge base</h1>
          <p className="muted" style={{ maxWidth: 780 }}>
            Capto&apos;s own synced copy of the official guidance (Crown copyright, reused under the Open Government Licence). Ask Capto and Guidance search read from here instead of the internet. The sync bot checks GOV.UK every {FULL_SYNC_EVERY_DAYS} days
            and downloads only pages that changed. No AI is involved, so it costs nothing to run.
          </p>
        </div>
        <SyncButton running={running} />
      </div>

      <div className="row" style={{ gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <span className="pill pill-sent">{stats.documents.toLocaleString("en-GB")} pages</span>
        <span className="pill">{stats.passages.toLocaleString("en-GB")} searchable passages</span>
        <span className="pill">
          {stats.collections} of {collections.length} collections
        </span>
        {stats.newest && <span className="pill">Last download {dateTime(stats.newest)}</span>}
      </div>

      {awaitingAccess && (
        <div className="alert alert-warning" style={{ marginBottom: 18 }}>
          <strong>Legislation is waiting for access.</strong> legislation.gov.uk currently refuses automated requests (bot protection), and Capto does not try to get round that. Each sync checks once; legislation starts downloading
          automatically as soon as access is granted. In the meantime HMRC&apos;s manuals, which quote the key statutory text, are fully available.
        </div>
      )}

      <section className="card" style={{ marginBottom: 18 }}>
        <div className="card-pad" style={{ paddingBottom: 6 }}>
          <h2>Sync runs</h2>
        </div>
        {runs.length === 0 ? (
          <p className="card-pad small muted" style={{ paddingTop: 0 }}>
            No sync has run yet. Press &ldquo;Sync now&rdquo; to download the core set.
          </p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Started</th>
                <th>Status</th>
                <th className="right">Checked</th>
                <th className="right">Added</th>
                <th className="right">Updated</th>
                <th className="right">Removed</th>
                <th className="right">Failed</th>
                <th>Knock-on</th>
              </tr>
            </thead>
            <tbody>
              {runs.map((r) => (
                <tr key={r.id}>
                  <td className="small">
                    {dateTime(r.startedAt)}
                    <div className="faint">{r.trigger}</div>
                  </td>
                  <td>
                    <span className={`pill ${STATUS_PILL[r.status] ?? ""}`}>{r.status}</span>
                    {r.note && <div className="small faint">{r.note}</div>}
                  </td>
                  <td className="right num">{r.listed.toLocaleString("en-GB")}</td>
                  <td className="right num">{r.added.toLocaleString("en-GB")}</td>
                  <td className="right num">{r.updated.toLocaleString("en-GB")}</td>
                  <td className="right num">{r.removed}</td>
                  <td className="right num">{r.failed}</td>
                  <td className="small">
                    {r.libraryRetired > 0 && <div>{r.libraryRetired} saved answers retired</div>}
                    {r.lessonsAffected.slice(0, 4).map((id) => (
                      <div key={id}>
                        Check lesson: <Link href={`/learn/${id}`}>{getLesson(id)?.lesson.title ?? id}</Link>
                      </div>
                    ))}
                    {r.lessonsAffected.length > 4 && <div className="faint">+{r.lessonsAffected.length - 4} more lessons</div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="card">
        <div className="card-pad" style={{ paddingBottom: 6 }}>
          <h2>Collections</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Collection</th>
              <th>Type</th>
              <th className="right">Pages stored</th>
              <th>Most recent GOV.UK change</th>
            </tr>
          </thead>
          <tbody>
            {collections.map((c) => {
              const s = byCollection.get(c.slug);
              const href = c.href;
              return (
                <tr key={c.slug}>
                  <td>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {c.label}
                    </a>
                  </td>
                  <td className="small muted">{c.type}</td>
                  <td className="right num">{s ? s.docs.toLocaleString("en-GB") : "—"}</td>
                  <td className="small">{s?.latest ? dateTime(s.latest) : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
}
