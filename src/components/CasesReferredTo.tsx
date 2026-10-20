import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { caseTitle, coverageNote, findCaseRefs } from "@/lib/cases/caseRefs";

/** "Cases referred to" card: every case cited in the text, linked to Find Case Law. Renders nothing if none. */
export function CasesReferredTo({ text, intro }: { text: string; intro?: string }) {
  const cases = findCaseRefs(text);
  if (!cases.length) return null;
  return (
    <section className="card card-pad stack" style={{ gap: 8 }}>
      <h3 style={{ margin: 0 }}>Cases referred to</h3>
      <p className="small faint" style={{ margin: 0 }}>
        {intro ?? "Opens the judgment, or a search for it, on The National Archives' Find Case Law (Open Justice Licence)."} <Link href="/cases">All cases cited in HMRC guidance</Link>
      </p>
      <ul className="small" style={{ margin: 0, paddingLeft: 18 }}>
        {cases.map((c) => {
          const cites = c.citations.filter((x) => x !== caseTitle(c)).join("; ");
          const note = coverageNote(c.court, c.year, c.linkKind);
          return (
            <li key={c.key}>
              {c.name ? <em>{c.name}</em> : caseTitle(c)}
              {cites ? ` ${cites}` : ""} ·{" "}
              <a href={c.url} target="_blank" rel="noopener noreferrer">
                {c.linkKind === "judgment" ? "Read the judgment" : "Search Find Case Law"} <ExternalLink size={11} />
              </a>
              {note && <span className="faint"> ({note})</span>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
