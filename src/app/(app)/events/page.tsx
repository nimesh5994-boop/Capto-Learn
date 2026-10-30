import Link from "next/link";
import { CalendarDays, ChevronRight } from "lucide-react";
import { requireUser } from "@/lib/auth/dal";
import { EVENTS } from "@/content/events";
import { date } from "@/lib/format";

export const metadata = { title: "Events" };

export default async function EventsPage() {
  await requireUser();
  const [latest, ...archive] = EVENTS;

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Events</h1>
          <p className="muted" style={{ maxWidth: 760 }}>
            Budgets and other major changes, written up once with what each measure means for accountants and for clients. Every measure links to the official GOV.UK page it was checked against. Past events stay here to look back on.
          </p>
        </div>
      </div>

      {latest && (
        <Link href={`/events/${latest.slug}`} className="card card-pad" style={{ display: "block", marginBottom: 18, textDecoration: "none", color: "inherit" }}>
          <div className="row" style={{ justifyContent: "space-between", gap: 12 }}>
            <span className="pill pill-accepted">Latest</span>
            <span className="small muted">
              <CalendarDays size={13} style={{ verticalAlign: "-2px" }} /> {date(latest.date)}
            </span>
          </div>
          <h2 style={{ margin: "10px 0 6px" }}>{latest.title}</h2>
          <p className="muted" style={{ margin: "0 0 10px" }}>{latest.summary}</p>
          <ul style={{ margin: "0 0 10px", paddingLeft: 18 }}>
            {latest.headlines.slice(0, 3).map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <span className="small">
            {latest.measures.length} measures · checked {date(latest.checkedOn)} <ChevronRight size={13} style={{ verticalAlign: "-2px" }} />
          </span>
        </Link>
      )}

      {archive.length > 0 && (
        <>
          <h2 style={{ fontSize: 16, margin: "6px 0 10px" }}>Archive</h2>
          <div style={{ display: "grid", gap: 10 }}>
            {archive.map((e) => (
              <Link key={e.slug} href={`/events/${e.slug}`} className="card card-pad" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                <strong>{e.title}</strong>
                <span className="small muted"> · {date(e.date)} · {e.measures.length} measures</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
