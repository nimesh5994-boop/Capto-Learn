import Link from "next/link";
import { AlertTriangle, BookOpen, CheckCircle2, ExternalLink, GraduationCap, Library, Lightbulb, ListOrdered, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import type { AnswerLevel, Citation, ResearchAnswer, ResearchSource } from "@/lib/research/types";
import { renderMarkdown } from "@/lib/markdown";
import { date } from "@/lib/format";
import { DepthSwitch } from "./DepthSwitch";
import { answerText, findStatuteRefs } from "@/lib/research/statuteRefs";
import styles from "./ask.module.css";

const CONFIDENCE = {
  high: { label: "High confidence", cls: "pill-accepted", help: "The sources answer this directly." },
  medium: { label: "Medium confidence", cls: "pill-viewed", help: "The answer draws on more than one source or needs some interpretation." },
  low: { label: "Low confidence", cls: "pill-declined", help: "The sources only partly cover this, or some points couldn't be verified. Check with a senior." },
} as const;

const LEVEL_LABEL: Record<AnswerLevel, string> = { essentials: "Essentials", practitioner: "Practitioner", expert: "Expert" };

/** The quotes behind a point or step, folded away so the answer reads cleanly; one click shows the evidence. */
function Evidence({ citations, byId }: { citations: Citation[]; byId: Map<string, ResearchSource> }) {
  if (!citations.length) return null;
  const ok = citations.filter((c) => c.verified).length;
  return (
    <details className={styles.evidence}>
      <summary>
        {ok ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />} Evidence · {ok}/{citations.length} quote{citations.length === 1 ? "" : "s"} checked{" "}
        <span className="faint">({[...new Set(citations.map((c) => c.sourceId))].join(", ")})</span>
      </summary>
      {citations.map((c, j) => {
        const s = byId.get(c.sourceId);
        return (
          <blockquote key={j} className={`${styles.quote} ${c.verified ? "" : styles.quoteBad}`}>
            “{c.quote}”
            <cite>
              {c.verified ? "✓ Found word-for-word in " : "⚠ Not found verbatim in "}
              {s ? (
                <a href={s.url} target={s.kind === "lesson" ? undefined : "_blank"} rel="noopener noreferrer">
                  [{s.id}] {s.title}
                </a>
              ) : (
                c.sourceId
              )}
            </cite>
          </blockquote>
        );
      })}
    </details>
  );
}

export function AnswerView({ question, answer }: { question: string; answer: ResearchAnswer }) {
  const conf = CONFIDENCE[answer.confidence];
  const steps = answer.steps ?? [];
  const checked = [...answer.points, ...steps];
  const verified = checked.filter((p) => p.verified).length;
  const byId = new Map(answer.sources.map((s) => [s.id, s]));
  const levelOf = (l: AnswerLevel | undefined): AnswerLevel => l ?? "practitioner";
  // Answers written before levels existed: treat everything as essentials so nothing is hidden.
  const legacy = answer.points.every((p) => !p.level);
  const counts = { essentials: 0, practitioner: 0, expert: 0 };
  for (const p of answer.points) counts[legacy ? "essentials" : levelOf(p.level)]++;
  const official = answer.sources.filter((s) => s.kind !== "lesson");
  const lessons = answer.sources.filter((s) => s.kind === "lesson");
  const statutes = findStatuteRefs(answerText(answer));
  const ask = (suffix: string) => `/ask?q=${encodeURIComponent(`${question} — ${suffix}`)}`;

  return (
    <div className={styles.answer}>
      <h1 className={styles.question}>{question}</h1>
      <div className={styles.metaRow}>
        <span className={`pill ${conf.cls}`} title={conf.help}>
          {conf.label}
        </span>
        <span className="pill" title="Points and steps whose quotes were matched word-for-word in their source">
          <ShieldCheck size={11} /> {verified}/{checked.length} verified
        </span>
        {answer.taxYear && <span className="pill">Tax year {answer.taxYear}</span>}
        <span className="small faint">Answered {date(answer.generatedAt)}</span>
      </div>

      {answer.tier && (
        <div className={styles.tierBar}>
          <span className={styles.tierSteps} aria-label={`Answered at level ${answer.tier.level} of 3`}>
            {[1, 2, 3].map((n) => (
              <span key={n} className={n <= answer.tier!.level ? styles.tierOn : undefined} />
            ))}
          </span>
          <span className="small">
            <strong>
              Level {answer.tier.level} · {answer.tier.label}
            </strong>{" "}
            <span className="muted">— {answer.tier.reason}</span>
          </span>
          <span className="row" style={{ gap: 6, marginLeft: "auto" }}>
            {answer.tier.level < 2 && (
              <Link href={`/ask?fresh=1&tier=standard&q=${encodeURIComponent(question)}`} className="btn btn-sm">
                Full cited answer
              </Link>
            )}
            {answer.tier.level < 3 && (
              <Link href={`/ask?fresh=1&tier=expert&q=${encodeURIComponent(question)}`} className="btn btn-sm">
                Expert research
              </Link>
            )}
          </span>
        </div>
      )}

      {answer.brief && (
        <div className="alert alert-info row between" style={{ gap: 10, flexWrap: "wrap" }}>
          <span>
            <Library size={14} /> Capto topic brief ({answer.brief.area}), written {date(answer.brief.writtenAt)} and quote-checked. Its {answer.brief.sourcesChecked} official source
            {answer.brief.sourcesChecked === 1 ? " hasn't" : "s haven't"} changed since.
          </span>
          <Link href={`/ask?fresh=1&q=${encodeURIComponent(question)}`} className="btn btn-sm">
            <RefreshCw size={13} /> Research my exact situation
          </Link>
        </div>
      )}

      {answer.reuse && (
        <div className="alert alert-info row between" style={{ gap: 10, flexWrap: "wrap" }}>
          <span>
            <Library size={14} /> Reused from your firm&apos;s answer library (first researched {date(answer.reuse.originalDate)}). Today we re-checked all {answer.reuse.sourcesChecked} official source
            {answer.reuse.sourcesChecked === 1 ? "" : "s"} — none has changed since.
            {answer.reuse.approvedBy && (
              <>
                {" "}
                <strong>
                  Reviewed and approved by {answer.reuse.approvedBy}
                  {answer.reuse.approvedAt ? ` on ${date(answer.reuse.approvedAt)}` : ""}.
                </strong>
              </>
            )}
          </span>
          <Link href={`/ask?fresh=1&q=${encodeURIComponent(question)}`} className="btn btn-sm">
            <RefreshCw size={13} /> Research it fresh
          </Link>
        </div>
      )}

      <section className={styles.short}>
        <div className={styles.kicker}>
          <Sparkles size={13} /> The short answer
        </div>
        <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(answer.shortAnswer) }} />
      </section>

      {steps.length > 0 && (
        <section className={`card ${styles.point}`}>
          <div className={styles.kicker}>
            <ListOrdered size={13} /> How to do it
          </div>
          <ol className={styles.steps}>
            {steps.map((s, i) => (
              <li key={i} className={s.verified ? undefined : styles.stepUnverified}>
                <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(s.text) }} />
                <Evidence citations={s.citations} byId={byId} />
              </li>
            ))}
          </ol>
        </section>
      )}

      {answer.example && (
        <section className={`card ${styles.point} ${styles.example}`}>
          <div className={styles.kicker}>
            <Lightbulb size={13} /> Worked example · {answer.example.title}
          </div>
          <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(answer.example.body) }} />
          <div className="small faint">An illustration applying the points below — the figures are examples, not from the sources.</div>
        </section>
      )}

      {answer.points.length > 0 && (
        <DepthSwitch counts={counts}>
          {answer.points.map((p, i) => (
            <section key={i} data-level={legacy ? "essentials" : levelOf(p.level)} className={`card ${styles.point} ${p.verified ? "" : styles.unverified}`}>
              <div className={styles.pointHead}>
                <h3>{p.heading}</h3>
                <span className="row" style={{ gap: 6 }}>
                  {!legacy && <span className={styles.levelTag}>{LEVEL_LABEL[levelOf(p.level)]}</span>}
                  {p.verified ? (
                    <span className="pill pill-accepted">
                      <CheckCircle2 size={11} /> Verified
                    </span>
                  ) : (
                    <span className="pill pill-viewed" title="The quoted wording couldn't be found in the source — treat this point with care">
                      <AlertTriangle size={11} /> Unverified
                    </span>
                  )}
                </span>
              </div>
              <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(p.text) }} />
              <Evidence citations={p.citations} byId={byId} />
            </section>
          ))}
        </DepthSwitch>
      )}

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

      <section className="card card-pad stack" style={{ gap: 10 }}>
        <h3 style={{ margin: 0 }}>Take it further</h3>
        <div className={styles.examples}>
          <Link className={styles.example} href={ask("explain it more simply, for a first-year trainee")}>
            Explain more simply
          </Link>
          {!answer.example && (
            <Link className={styles.example} href={ask("show me a worked example with figures")}>
              Show a worked example
            </Link>
          )}
          <Link className={styles.example} href={ask("go deeper: exceptions, edge cases and anti-avoidance")}>
            Go deeper
          </Link>
          <Link className={styles.example} href={ask("what records and evidence should we keep, and what are the deadlines?")}>
            Records &amp; deadlines
          </Link>
          {answer.followUps.map((f) => (
            <Link key={f} className={styles.example} href={`/ask?q=${encodeURIComponent(f)}`}>
              {f}
            </Link>
          ))}
        </div>
      </section>

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
        <h3 style={{ margin: 0 }}>Sources</h3>
        <ul className={styles.srcList}>
          {[...official, ...lessons].map((s) => (
            <li key={s.id} className={styles.srcItem}>
              <span className={styles.srcId}>{s.id}</span>
              <span>
                {s.kind === "lesson" ? (
                  <Link href={s.url}>
                    <GraduationCap size={12} /> {s.title}
                  </Link>
                ) : (
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.title} <ExternalLink size={11} />
                  </a>
                )}
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

      {statutes.length > 0 && (
        <section className="card card-pad stack" style={{ gap: 8 }}>
          <h3 style={{ margin: 0 }}>Legislation referred to</h3>
          <p className="small faint" style={{ margin: 0 }}>
            Opens the provision on legislation.gov.uk. Check the version in force for the period you&apos;re advising on.
          </p>
          <ul className="small" style={{ margin: 0, paddingLeft: 18 }}>
            {statutes.map((r) => (
              <li key={r.url}>
                <a href={r.url} target="_blank" rel="noopener noreferrer">
                  {r.label} <ExternalLink size={11} />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

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
