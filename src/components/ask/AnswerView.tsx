import Link from "next/link";
import { AlertTriangle, BookOpen, CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react";
import type { ResearchAnswer } from "@/lib/research/types";
import { renderMarkdown } from "@/lib/markdown";
import { date } from "@/lib/format";
import styles from "./ask.module.css";

const CONFIDENCE = {
  high: { label: "High confidence", cls: "pill-accepted", help: "The official sources answer this directly." },
  medium: { label: "Medium confidence", cls: "pill-viewed", help: "The answer draws on more than one source or needs some interpretation." },
  low: { label: "Low confidence", cls: "pill-declined", help: "The sources only partly cover this, or some points couldn't be verified. Check with a senior." },
} as const;

export function AnswerView({ question, answer }: { question: string; answer: ResearchAnswer }) {
  const conf = CONFIDENCE[answer.confidence];
  const verified = answer.points.filter((p) => p.verified).length;
  const byId = new Map(answer.sources.map((s) => [s.id, s]));
  return (
    <div className={styles.answer}>
      <h1 className={styles.question}>{question}</h1>
      <div className={styles.metaRow}>
        <span className={`pill ${conf.cls}`} title={conf.help}>
          {conf.label}
        </span>
        <span className="pill" title="Points whose quotes were matched word-for-word in the official source">
          <ShieldCheck size={11} /> {verified}/{answer.points.length} points verified
        </span>
        {answer.taxYear && <span className="pill">Tax year {answer.taxYear}</span>}
        <span className="small faint">Answered {date(answer.generatedAt)}</span>
      </div>

      <div className={`${styles.short} prose`} dangerouslySetInnerHTML={{ __html: renderMarkdown(answer.shortAnswer) }} />

      {answer.points.map((p, i) => (
        <section key={i} className={`card ${styles.point} ${p.verified ? "" : styles.unverified}`}>
          <div className={styles.pointHead}>
            <h3>{p.heading}</h3>
            {p.verified ? (
              <span className="pill pill-accepted">
                <CheckCircle2 size={11} /> Verified
              </span>
            ) : (
              <span className="pill pill-viewed" title="The quoted wording couldn't be found in the source — treat this point with care">
                <AlertTriangle size={11} /> Unverified
              </span>
            )}
          </div>
          <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(p.text) }} />
          {p.citations.map((c, j) => {
            const s = byId.get(c.sourceId);
            return (
              <blockquote key={j} className={`${styles.quote} ${c.verified ? "" : styles.quoteBad}`}>
                “{c.quote}”
                <cite>
                  {c.verified ? "✓ Quote found in " : "⚠ Quote not found verbatim in "}
                  {s ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      [{s.id}] {s.title}
                    </a>
                  ) : (
                    c.sourceId
                  )}
                </cite>
              </blockquote>
            );
          })}
        </section>
      ))}

      {answer.caveats.length > 0 && (
        <section className="card card-pad">
          <h3 style={{ marginTop: 0 }}>Check before you advise</h3>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {answer.caveats.map((c, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: renderMarkdown(c).replace(/^<p>|<\/p>\s*$/g, "") }} />
            ))}
          </ul>
        </section>
      )}

      {answer.professional && (
        <section className="card card-pad stack" style={{ gap: 8 }}>
          <h3 style={{ margin: 0 }}>What the professional bodies say</h3>
          <p className="small faint" style={{ margin: 0 }}>
            From ICAEW, ACCA, ATT, CIOT or FRC websites. Not quote-verified by Capto; open the links to read in full.
          </p>
          <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(answer.professional.summary) }} />
          <ul className="small" style={{ margin: 0, paddingLeft: 18 }}>
            {answer.professional.links.map((l) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noopener noreferrer">
                  {l.title} <ExternalLink size={11} />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="card card-pad stack" style={{ gap: 10 }}>
        <h3 style={{ margin: 0 }}>Official sources</h3>
        <ul className={styles.srcList}>
          {answer.sources.map((s) => (
            <li key={s.id} className={styles.srcItem}>
              <span className={styles.srcId}>{s.id}</span>
              <span>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.title} <ExternalLink size={11} />
                </a>
                <span className="small faint">
                  {" "}
                  · {s.publisher}
                  {s.updatedAt ? ` · updated ${date(s.updatedAt)}` : ""}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {answer.relatedLessons.length > 0 && (
        <section className="card card-pad stack" style={{ gap: 8 }}>
          <h3 style={{ margin: 0 }}>Learn this properly</h3>
          {answer.relatedLessons.map((l) => (
            <Link key={l.id} href={`/learn/${l.id}`} className="row" style={{ gap: 8 }}>
              <BookOpen size={15} /> {l.title} <span className="small faint">· {l.track}</span>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
