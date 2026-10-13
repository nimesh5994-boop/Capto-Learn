"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { submitSkillCheck } from "@/app/actions/learning";
import styles from "./learn.module.css";
import playerStyles from "./player.module.css";

export interface SkillCheckQuestionView {
  key: string;
  trackTitle: string;
  levelLabel: string;
  promptHtml: string;
  optionsHtml: string[];
}

const NOT_SURE = -1;

/** One question at a time, no marking until the end — it's a guide to where to start, not an exam. */
export function SkillCheck({ slugs, questions }: { slugs: string[]; questions: SkillCheckQuestionView[] }) {
  const router = useRouter();
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const q = questions[i];
  const chosen = answers[q.key];
  const last = i === questions.length - 1;

  const choose = (k: number) => setAnswers((a) => ({ ...a, [q.key]: k }));
  const finish = () =>
    start(async () => {
      setError(null);
      const r = await submitSkillCheck(slugs, answers);
      if (!r.ok) return setError(r.error);
      router.push("/skills-check/result");
    });

  return (
    <div className="stack" style={{ gap: 12 }}>
      <div className="row between small muted">
        <span>
          Question {i + 1} of {questions.length}
        </span>
        <span>{Math.round((i / questions.length) * 100)}% through</span>
      </div>
      <div className={playerStyles.bar} role="progressbar" aria-valuenow={i} aria-valuemin={0} aria-valuemax={questions.length} aria-label="Skills check progress">
        <div className={playerStyles.barFill} style={{ width: `${(i / questions.length) * 100}%` }} />
      </div>
      <div className={`card ${playerStyles.panel}`}>
        <div className={playerStyles.panelKicker}>
          {q.trackTitle} · {q.levelLabel}
        </div>
        <div className="prose" dangerouslySetInnerHTML={{ __html: q.promptHtml }} />
        <div className={styles.options}>
          {q.optionsHtml.map((o, k) => (
            <label key={k} className={`${styles.option} ${chosen === k ? styles.optionChosen : ""}`}>
              <input type="radio" name={q.key} checked={chosen === k} disabled={pending} onChange={() => choose(k)} />
              <span dangerouslySetInnerHTML={{ __html: o }} />
            </label>
          ))}
          <label className={`${styles.option} ${chosen === NOT_SURE ? styles.optionChosen : ""}`}>
            <input type="radio" name={q.key} checked={chosen === NOT_SURE} disabled={pending} onChange={() => choose(NOT_SURE)} />
            <span className="muted">I&apos;m not sure — skip</span>
          </label>
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        <div className="row between" style={{ gap: 10 }}>
          <button className="btn btn-ghost" disabled={i === 0 || pending} onClick={() => setI((n) => n - 1)}>
            <ArrowLeft size={15} /> Back
          </button>
          {last ? (
            <button className="btn btn-primary" disabled={chosen === undefined || pending} onClick={finish}>
              {pending ? "Working out your results…" : "See my results"}
            </button>
          ) : (
            <button className="btn btn-primary" disabled={chosen === undefined} onClick={() => setI((n) => n + 1)}>
              Next
            </button>
          )}
        </div>
      </div>
      <p className="small faint" style={{ margin: 0 }}>
        Choosing &ldquo;not sure&rdquo; is better than guessing — it gives you a more accurate starting point.
      </p>
    </div>
  );
}
