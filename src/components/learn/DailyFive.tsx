"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { CheckCircle2, PartyPopper, XCircle } from "lucide-react";
import { submitReview, type ReviewResult } from "@/app/actions/learning";
import styles from "./learn.module.css";
import playerStyles from "./player.module.css";

export interface DailyCardView {
  itemId: string;
  lessonId: string;
  lessonTitle: string;
  trackTitle: string;
  promptHtml: string;
  optionsHtml: string[];
}

/** Daily 5: one quick question at a time from lessons already taken; right answers come back less often. */
export function DailyFive({ cards }: { cards: DailyCardView[] }) {
  const [i, setI] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  if (i >= cards.length)
    return (
      <div className={`card ${playerStyles.panel}`} style={{ alignItems: "flex-start" }}>
        <PartyPopper size={28} color="var(--primary)" />
        <h2 className={playerStyles.panelTitle}>
          Done — {score} of {cards.length} right
        </h2>
        <p className="muted" style={{ margin: 0 }}>
          {score === cards.length ? "Everything you got right comes back later, spaced further apart." : "Anything you missed comes back tomorrow; the ones you got right come back later."}
        </p>
        <Link href="/learn" className="btn btn-primary">
          Back to courses
        </Link>
      </div>
    );

  const c = cards[i];
  const check = () =>
    choice !== null &&
    start(async () => {
      setError(null);
      const r = await submitReview(c.itemId, choice);
      if (!r.ok) return setError(r.error);
      setResult(r.data);
      if (r.data.correct) setScore((s) => s + 1);
    });
  const next = () => {
    setI((n) => n + 1);
    setChoice(null);
    setResult(null);
  };

  return (
    <div className="stack" style={{ gap: 12 }}>
      <div className={playerStyles.bar} role="progressbar" aria-valuenow={i} aria-valuemin={0} aria-valuemax={cards.length} aria-label="Daily 5 progress">
        <div className={playerStyles.barFill} style={{ width: `${(i / cards.length) * 100}%` }} />
      </div>
      <div className={`card ${playerStyles.panel}`}>
        <div className={playerStyles.panelKicker}>
          Question {i + 1} of {cards.length} · {c.trackTitle}
        </div>
        <div className="prose" dangerouslySetInnerHTML={{ __html: c.promptHtml }} />
        <div className={styles.options}>
          {c.optionsHtml.map((o, k) => {
            const cls = !result ? (choice === k ? styles.optionChosen : "") : result.answer === k ? styles.optionRight : choice === k ? styles.optionWrong : "";
            return (
              <label key={k} className={`${styles.option} ${cls}`}>
                <input type="radio" name={c.itemId} checked={choice === k} disabled={!!result || pending} onChange={() => setChoice(k)} />
                <span dangerouslySetInnerHTML={{ __html: o }} />
              </label>
            );
          })}
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        {result && (
          <div className={`${styles.feedback} ${result.correct ? styles.feedbackRight : styles.feedbackWrong}`}>
            <div className={styles.feedbackTitle}>
              {result.correct ? <CheckCircle2 size={15} /> : <XCircle size={15} />} {result.correct ? `Correct — next time in ${result.nextInDays} days` : "Not quite — you'll see this again tomorrow"}
            </div>
            <div className="prose" dangerouslySetInnerHTML={{ __html: result.explainHtml }} />
            <Link href={`/learn/${c.lessonId}`} className="small">
              Revisit the lesson: {c.lessonTitle}
            </Link>
          </div>
        )}
        <div className="row" style={{ gap: 10 }}>
          {!result ? (
            <button className="btn btn-primary" disabled={choice === null || pending} onClick={check}>
              Check
            </button>
          ) : (
            <button className="btn btn-primary" onClick={next}>
              {i + 1 < cards.length ? "Next question" : "Finish"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
