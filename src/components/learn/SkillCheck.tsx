"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Timer } from "lucide-react";
import { finishSkillCheck, skillCheckStep } from "@/app/actions/learning";
import type { QuestionView } from "@/lib/learning/skillCheck";
import styles from "./learn.module.css";
import playerStyles from "./player.module.css";

const NOT_SURE = -1;
const LEVEL = { foundation: "Foundation", practitioner: "Practitioner", advanced: "Advanced" } as const;

const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

/**
 * Adaptive skills check. One question at a time; the server picks each next question from the answers so far
 * (harder after a right answer, easier after a wrong one) and never sends the answers to the browser.
 * The countdown is the firm's time limit; when it runs out, whatever has been answered is submitted.
 */
export function SkillCheck({ area, subjects, trackTitles, seconds }: { area: string | null; subjects: string[]; trackTitles: Record<string, string>; seconds: number }) {
  const router = useRouter();
  const [q, setQ] = useState<QuestionView | null>(null);
  const [answers, setAnswers] = useState<{ key: string; choice: number }[]>([]);
  const [choice, setChoice] = useState<number | null>(null);
  const [left, setLeft] = useState(seconds);
  const [total, setTotal] = useState(subjects.length);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const started = useRef(0);
  const finishing = useRef(false);
  const input = { area, subjects };

  const finish = useCallback(
    (given: { key: string; choice: number }[], timedOut: boolean) => {
      if (finishing.current) return;
      finishing.current = true;
      start(async () => {
        if (!given.length) {
          setError("Time's up before any question was answered — start again when you're ready.");
          return;
        }
        const r = await finishSkillCheck({ ...input, answers: given, seconds: Math.round((Date.now() - started.current) / 1000), timedOut });
        if (!r.ok) {
          finishing.current = false;
          return setError(r.error);
        }
        router.push("/skills-check/result");
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [area, subjects, router]
  );

  // First question.
  useEffect(() => {
    start(async () => {
      const r = await skillCheckStep({ ...input, answers: [] });
      if (!r.ok) return setError(r.error);
      setQ(r.data.next);
      setTotal(r.data.subjects);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Countdown — starts once the first question is on screen.
  const ready = q !== null || answers.length > 0;
  useEffect(() => {
    if (!ready) return;
    started.current = Date.now();
    const t = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [ready]);
  useEffect(() => {
    if (left === 0) finish(answers, true);
  }, [left, answers, finish]);

  const next = () => {
    if (!q || choice === null) return;
    const given = [...answers, { key: q.key, choice }];
    setAnswers(given);
    setChoice(null);
    start(async () => {
      const r = await skillCheckStep({ ...input, answers: given });
      if (!r.ok) return setError(r.error);
      if (!r.data.next) return finish(given, false);
      setQ(r.data.next);
    });
  };

  const subjectsDone = new Set(answers.map((a) => a.key.split("/")[0])).size;
  const low = left <= 30;

  return (
    <div className="stack" style={{ gap: 12 }}>
      <div className="row between small" style={{ gap: 10 }}>
        <span className="muted">
          Question {answers.length + 1} · subject {Math.min(total, subjectsDone + (q && !answers.some((a) => a.key.startsWith(`${q.track}/`)) ? 1 : 0))} of {total}
        </span>
        <span className={`row ${low ? "" : "muted"}`} style={{ gap: 6, fontWeight: 600, color: low ? "var(--danger)" : undefined }} aria-live={low ? "polite" : "off"}>
          <Timer size={15} /> {clock(left)} left
        </span>
      </div>
      <div className={playerStyles.bar} role="progressbar" aria-valuenow={subjectsDone} aria-valuemin={0} aria-valuemax={total} aria-label="Subjects covered">
        <div className={playerStyles.barFill} style={{ width: `${(subjectsDone / Math.max(1, total)) * 100}%` }} />
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      {q ? (
        <div className={`card ${playerStyles.panel}`}>
          <div className={playerStyles.panelKicker}>
            {trackTitles[q.track] ?? q.track} · {LEVEL[q.level]}
          </div>
          <div className="prose" dangerouslySetInnerHTML={{ __html: q.promptHtml }} />
          <div className={styles.options}>
            {q.optionsHtml.map((o, k) => (
              <label key={k} className={`${styles.option} ${choice === k ? styles.optionChosen : ""}`}>
                <input type="radio" name={q.key} checked={choice === k} disabled={pending} onChange={() => setChoice(k)} />
                <span dangerouslySetInnerHTML={{ __html: o }} />
              </label>
            ))}
            <label className={`${styles.option} ${choice === NOT_SURE ? styles.optionChosen : ""}`}>
              <input type="radio" name={q.key} checked={choice === NOT_SURE} disabled={pending} onChange={() => setChoice(NOT_SURE)} />
              <span className="muted">I&apos;m not sure — skip</span>
            </label>
          </div>
          <div className="row between" style={{ gap: 10 }}>
            <button type="button" className="btn btn-ghost btn-sm" disabled={pending || !answers.length} onClick={() => finish(answers, false)}>
              Finish now
            </button>
            <button className="btn btn-primary" disabled={choice === null || pending} onClick={next}>
              {pending ? "…" : "Next"}
            </button>
          </div>
        </div>
      ) : (
        !error && <div className="card card-pad muted">{answers.length ? "Working out your results…" : "Preparing your questions…"}</div>
      )}
      <p className="small faint" style={{ margin: 0 }}>
        Questions get harder after a right answer and easier after a wrong one, so you won&apos;t see everything. &ldquo;Not sure&rdquo; is better than guessing.
      </p>
    </div>
  );
}
