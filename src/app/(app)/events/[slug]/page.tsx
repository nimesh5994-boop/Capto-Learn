import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { requireUser } from "@/lib/auth/dal";
import { EVENTS, EVENT_AREAS, MEASURE_STATUS, eventBySlug, type EventArea } from "@/content/events";
import { date } from "@/lib/format";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const e = eventBySlug((await params).slug);
  return { title: e?.title ?? "Event" };
}

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

const STATUS_PILL = { "in-force": "pill-accepted", announced: "pill-sent", consultation: "pill-viewed" } as const;

export default async function EventPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ area?: string }> }) {
  await requireUser();
  const e = eventBySlug((await params).slug);
  if (!e) notFound();
  const sp = await searchParams;
  const areas = [...new Set(e.measures.map((m) => m.area))];
  const area = areas.includes(sp.area as EventArea) ? (sp.area as EventArea) : null;
  const shown = area ? e.measures.filter((m) => m.area === area) : e.measures;

  return (
    <>
      <p className="small">
        <Link href="/events">← All events</Link>
      </p>
      <div className="page-head">
        <div>
          <h1>{e.title}</h1>
          <p className="muted" style={{ maxWidth: 780 }}>
            {date(e.date)} · checked against the official pages on {date(e.checkedOn)}
          </p>
        </div>
      </div>

      <div className="card card-pad" style={{ marginBottom: 16 }}>
        <p style={{ marginTop: 0 }}>{e.summary}</p>
        <h2 style={{ fontSize: 15, margin: "12px 0 6px" }}>The headlines</h2>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {e.headlines.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </div>

      <nav className="row small" style={{ gap: 6, flexWrap: "wrap", marginBottom: 14 }} aria-label="Filter by area">
        <Link href={`/events/${e.slug}`} className={`pill${area ? "" : " pill-sent"}`}>
          All ({e.measures.length})
        </Link>
        {areas.map((a) => (
          <Link key={a} href={`/events/${e.slug}?area=${a}`} className={`pill${area === a ? " pill-sent" : ""}`}>
            {EVENT_AREAS[a]} ({e.measures.filter((m) => m.area === a).length})
          </Link>
        ))}
      </nav>

      <div style={{ display: "grid", gap: 12 }}>
        {shown.map((m) => (
          <article key={m.id} id={m.id} className="card card-pad">
            <div className="row" style={{ gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
              <span className="pill">{EVENT_AREAS[m.area]}</span>
              <span className={`pill ${STATUS_PILL[m.status]}`}>{MEASURE_STATUS[m.status]}</span>
            </div>
            <h2 style={{ fontSize: 17, margin: "0 0 6px" }}>{m.title}</h2>
            <p style={{ margin: "0 0 6px" }}>{m.what}</p>
            <p className="small" style={{ margin: "0 0 10px" }}>
              <strong>When:</strong> {m.effective}
            </p>
            <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
              <div>
                <strong className="small">For accountants</strong>
                <p style={{ margin: "4px 0 0" }}>{m.forAccountants}</p>
              </div>
              <div>
                <strong className="small">For clients</strong>
                <p style={{ margin: "4px 0 0" }}>{m.forClients}</p>
              </div>
            </div>
            {m.notYetClear && (
              <p className="alert alert-info small" style={{ margin: "10px 0 0" }}>
                <strong>Not yet clear:</strong> {m.notYetClear}
              </p>
            )}
            <p className="small muted" style={{ margin: "10px 0 0" }}>
              Source:{" "}
              {m.sources.map((s, i) => (
                <span key={s.url}>
                  {i > 0 && " · "}
                  <a href={s.url} target="_blank" rel="noreferrer">
                    {s.title} <ExternalLink size={11} style={{ verticalAlign: "-1px" }} />
                  </a>
                </span>
              ))}
            </p>
          </article>
        ))}
      </div>

      <div className="card card-pad" style={{ marginTop: 16 }}>
        <h2 style={{ fontSize: 15, margin: "0 0 6px" }}>Read the official documents</h2>
        <ul style={{ margin: "0 0 10px", paddingLeft: 18 }}>
          {e.officialDocuments.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
        <p className="small muted" style={{ margin: 0 }}>
          {e.limits} Contains public sector information licensed under the Open Government Licence v3.0.
        </p>
      </div>
    </>
  );
}
