import Link from "next/link";
import { and, asc, between, desc, eq, ilike, isNull, lt, or, sql, type SQL } from "drizzle-orm";
import { ExternalLink, Scale, Search } from "lucide-react";
import { requirePermission } from "@/lib/auth/dal";
import { getDb } from "@/lib/db/client";
import { caseRefs } from "@/lib/db/schema";
import { COURT_LABEL, coverageNote } from "@/lib/cases/caseRefs";
import { dateTime } from "@/lib/format";
import styles from "@/components/ask/ask.module.css";

export const metadata = { title: "Case law" };

const PER_PAGE = 50;

/** "BIM37400" from a manual paragraph URL, so readers see the reference they know. */
function paragraphRef(url: string): string | null {
  const m = url.match(/\/hmrc-internal-manuals\/[^/]+\/([a-z]+\d+[a-z0-9]*)$/i);
  return m ? m[1].toUpperCase() : null;
}

/** Escapes LIKE wildcards in user input. */
const likeArg = (s: string) => `%${s.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;

export default async function CasesPage({ searchParams }: { searchParams: Promise<{ q?: string; court?: string; decade?: string; sort?: string; page?: string }> }) {
  await requirePermission("learning.view");
  const sp = await searchParams;
  const q = (sp.q ?? "").trim().slice(0, 120);
  const court = sp.court?.slice(0, 40) || "";
  const decade = /^(pre1950|\d{4})$/.test(sp.decade ?? "") ? sp.decade! : "";
  const sort = sp.sort === "newest" ? "newest" : sp.sort === "name" ? "name" : "cited";
  const page = Math.max(1, Math.min(200, Number(sp.page) || 1));
  const db = await getDb();

  const where: (SQL | undefined)[] = [];
  if (q) {
    const arg = likeArg(q);
    // Name, any citation, or a word in the title (or reference) of a citing guidance page.
    where.push(or(ilike(caseRefs.name, arg), sql`${caseRefs.citations}::text ilike ${arg}`, sql`${caseRefs.mentions}::text ilike ${arg}`));
  }
  if (court === "none") where.push(isNull(caseRefs.court));
  else if (court) where.push(eq(caseRefs.court, court));
  if (decade === "pre1950") where.push(lt(caseRefs.year, 1950));
  else if (decade) where.push(between(caseRefs.year, Number(decade), Number(decade) + 9));
  const filter = and(...where);
  const order =
    sort === "newest"
      ? [sql`${caseRefs.year} desc nulls last`, desc(caseRefs.mentionCount), asc(caseRefs.name)]
      : sort === "name"
        ? [asc(caseRefs.name)]
        : [desc(caseRefs.mentionCount), asc(caseRefs.name)];

  const [rows, [{ total }], courts, decades, [built]] = await Promise.all([
    db
      .select()
      .from(caseRefs)
      .where(filter)
      .orderBy(...order)
      .limit(PER_PAGE)
      .offset((page - 1) * PER_PAGE),
    db.select({ total: sql<number>`count(*)::int` }).from(caseRefs).where(filter),
    db.select({ court: caseRefs.court, n: sql<number>`count(*)::int` }).from(caseRefs).groupBy(caseRefs.court).orderBy(desc(sql`count(*)`)),
    db
      .select({ d: sql<number>`(${caseRefs.year} / 10 * 10)::int` })
      .from(caseRefs)
      .where(sql`${caseRefs.year} >= 1950`)
      .groupBy(sql`1`)
      .orderBy(desc(sql`1`)),
    db.select({ at: sql<Date | null>`max(${caseRefs.updatedAt})`, n: sql<number>`count(*)::int` }).from(caseRefs),
  ]);
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  const qs = (p: Partial<{ q: string; court: string; decade: string; sort: string; page: number }>) => {
    const v = { q, court, decade, sort, page: 1, ...p };
    const parts = [v.q && `q=${encodeURIComponent(v.q)}`, v.court && `court=${encodeURIComponent(v.court)}`, v.decade && `decade=${v.decade}`, v.sort !== "cited" && `sort=${v.sort}`, v.page > 1 && `page=${v.page}`].filter(Boolean);
    return parts.length ? `/cases?${parts.join("&")}` : "/cases";
  };

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Case law</h1>
          <p className="muted" style={{ maxWidth: 800 }}>
            The court and tribunal decisions HMRC&apos;s manuals and GOV.UK guidance refer to, taken from Capto&apos;s synced copy of that guidance, with the guidance paragraphs that cite each one. Judgments open on The National
            Archives&apos; <a href="https://caselaw.nationalarchives.gov.uk/" target="_blank" rel="noopener noreferrer">Find Case Law</a>, published under the Open Justice Licence. Full-text case search inside Capto is coming
            once that service licenses it.
          </p>
        </div>
      </div>

      <form className="card card-pad row" action="/cases" style={{ gap: 8, flexWrap: "wrap", marginBottom: 14, alignItems: "center" }}>
        <input name="q" defaultValue={q} placeholder="Case name, citation or topic (e.g. Ransom v Higgs · UKUT · entertainment)" aria-label="Search cases" style={{ flex: "1 1 280px" }} />
        <select name="court" defaultValue={court} aria-label="Court" style={{ width: "auto" }}>
          <option value="">All courts</option>
          {courts.map((c) => (
            <option key={c.court ?? "none"} value={c.court ?? "none"}>
              {c.court ? COURT_LABEL(c.court) : "Law reports only (court not given)"} ({c.n})
            </option>
          ))}
        </select>
        <select name="decade" defaultValue={decade} aria-label="Decade" style={{ width: "auto" }}>
          <option value="">Any year</option>
          {decades.map((d) => (
            <option key={d.d} value={String(d.d)}>
              {d.d}s
            </option>
          ))}
          <option value="pre1950">Before 1950</option>
        </select>
        <select name="sort" defaultValue={sort} aria-label="Sort" style={{ width: "auto" }}>
          <option value="cited">Most cited</option>
          <option value="newest">Newest</option>
          <option value="name">Name A–Z</option>
        </select>
        <button className="btn btn-primary">
          <Search size={15} /> Search
        </button>
        {(q || court || decade || sort !== "cited") && (
          <Link href="/cases" className="btn btn-sm">
            Clear
          </Link>
        )}
      </form>

      <div className="small muted" style={{ marginBottom: 10 }}>
        {built?.n ? `${total.toLocaleString("en-GB")} of ${built.n.toLocaleString("en-GB")} cases${built.at ? ` · index built ${dateTime(new Date(built.at))}` : ""}` : null}
      </div>

      {!built?.n ? (
        <div className="card card-pad muted small">The case index hasn&apos;t been built yet. It&apos;s built from the knowledge base after the next sync.</div>
      ) : rows.length === 0 ? (
        <div className="card card-pad muted small">No cases match. Try a party name (&ldquo;Ransom&rdquo;), a citation (&ldquo;UKUT&rdquo;, &ldquo;STC&rdquo;) or a topic word from the guidance (&ldquo;entertainment&rdquo;).</div>
      ) : (
        <div className="stack" style={{ gap: 10 }}>
          {rows.map((r) => {
            const note = coverageNote(r.court, r.year, r.linkKind);
            const otherCites = r.citations.filter((c) => c !== r.name);
            return (
              <section key={r.id} className="card card-pad stack" style={{ gap: 6 }}>
                <div className="row between" style={{ gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}>
                  <div style={{ minWidth: 0 }}>
                    <h2 style={{ margin: 0, fontSize: 16, overflowWrap: "anywhere" }}>
                      <Scale size={15} style={{ verticalAlign: "-2px", marginRight: 6 }} />
                      {r.name}
                    </h2>
                    <div className="small faint">
                      {[otherCites.join("; "), r.court ? COURT_LABEL(r.court) : null, r.year].filter(Boolean).join(" · ")}
                    </div>
                  </div>
                  <div className="stack" style={{ gap: 2, alignItems: "flex-end" }}>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm">
                      {r.linkKind === "judgment" ? "Read the judgment on Find Case Law" : "Search Find Case Law"} <ExternalLink size={12} />
                    </a>
                    {note && <span className="small faint">{note}</span>}
                  </div>
                </div>
                <details className={styles.evidence}>
                  <summary>
                    Cited in HMRC guidance ({r.mentionCount}
                    {r.mentionCount > r.mentions.length ? `, first ${r.mentions.length} shown` : ""})
                  </summary>
                  <ul className="small" style={{ margin: "4px 0 0", paddingLeft: 18 }}>
                    {r.mentions.map((m) => {
                      const ref = paragraphRef(m.url);
                      return (
                        <li key={m.url}>
                          <a href={m.url} target="_blank" rel="noopener noreferrer">
                            {ref ? `${ref}: ` : ""}
                            {m.title}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </details>
              </section>
            );
          })}
        </div>
      )}

      {pages > 1 && (
        <div className="row" style={{ gap: 8, marginTop: 14, alignItems: "center" }}>
          {page > 1 && (
            <Link href={qs({ page: page - 1 })} className="btn btn-sm">
              ← Previous
            </Link>
          )}
          <span className="small muted">
            Page {page} of {pages}
          </span>
          {page < pages && (
            <Link href={qs({ page: page + 1 })} className="btn btn-sm">
              Next →
            </Link>
          )}
        </div>
      )}

      <div className="card card-pad small faint" style={{ marginTop: 14 }}>
        Case references are read from HMRC guidance (Crown copyright, Open Government Licence v3.0) and may be incomplete: only citations HMRC gives in a standard form are picked up. Capto does not copy or analyse
        judgments. Find Case Law holds most judgments from about 2001 (2009 for the Supreme Court, 2016 for the Upper Tribunal and 2019 for the First-tier Tax Tribunal); older or Scottish decisions open a search
        instead.
      </div>
    </>
  );
}
