"use client";

import { useState, useTransition } from "react";
import { Award, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { submitQuiz, type QuizResult } from "@/app/actions/learning";
import styles from "./learn.module.css";

export interface QuizQuestionView {
  id: string;
  promptHtml: string;
  optionsHtml: string[];
}

export function Quiz({ lessonId, questions, best, passMark, nextHref }: { lessonId: string; questions: QuizQuestionView[]; best: number | null; passMark: number; nextHref?: string }) {
  const [answers, setAnswers] = useState<number[]>(() => questions.map(() => -1));
  const [result, setResult] = useState<QuizResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const submit = () =>
    start(async () => {
      setError(null);
      const r = await submitQuiz(lessonId, answers);
      if (r.ok) setResult(r.data);
      else setError(r.error);
    });

  const reset = () => {
    setAnswers(questions.map(() => -1));
    setResult(null);
  };

  return (
    <div className="stack" style={{ gap: 14 }}>
      {best !== null && !result && (
        <p className="small muted" style={{ margin: 0 }}>
          Your best score so far: <strong>{best}%</strong>
          {best >= passMark ? " — passed." : ` — ${passMark}% needed to complete the lesson.`}
        </p>
      )}
      {questions.map((q, i) => {
        const r = result?.questions[i];
        return (
          <div key={q.id} className={styles.exercise}>
            <span className={styles.exKind}>Question {i + 1}</span>
            <div className="prose" dangerouslySetInnerHTML={{ __html: q.promptHtml }} />
            <div className={styles.options}>
              {q.optionsHtml.map((o, j) => {
                const chosen = answers[i] === j;
                const cls = !r ? (chosen ? styles.optionChosen : "") : r.answer === j ? styles.optionRight : chosen ? styles.optionWrong : "";
                return (
                  <label key={j} className={`${styles.option} ${cls}`}>
                    <input type="radio" name={q.id} checked={chosen} disabled={!!result || pending} onChange={() => setAnswers((a) => a.map((v, k) => (k === i ? j : v)))} />
                    <span dangerouslySetInnerHTML={{ __html: o }} />
                  </label>
                );
              })}
            </div>
            {r && (
              <div className={`${styles.feedback} ${r.correct ? styles.feedbackRight : styles.feedbackWrong}`}>
                <div className={styles.feedbackTitle}>
                  {r.correct ? <CheckCircle2 size={15} /> : <XCircle size={15} />} {r.correct ? "Correct" : "Incorrect"}
                </div>
                <div className="prose" dangerouslySetInnerHTML={{ __html: r.explainHtml }} />
              </div>
            )}
          </div>
        );
      })}
      {error && <div className="alert alert-error">{error}</div>}
      {!result ? (
        <div className="row" style={{ gap: 10 }}>
          <button className="btn btn-primary" disabled={pending || answers.some((a) => a < 0)} onClick={submit}>
            {pending ? "Marking…" : "Submit quiz"}
          </button>
          <span className="small muted">{answers.filter((a) => a >= 0).length} of {questions.length} answered</span>
        </div>
      ) : (
        <div className={`${styles.feedback} ${result.passed ? styles.feedbackRight : styles.feedbackWrong}`} style={{ padding: 18 }}>
          <div className={styles.feedbackTitle} style={{ fontSize: 17 }}>
            {result.passed ? <Award size={20} /> : <XCircle size={20} />}
            {result.score}% — {result.passed ? "lesson complete" : `you need ${passMark}% to complete this lesson`}
          </div>
          <div className="row" style={{ gap: 10, marginTop: 10 }}>
            <button className="btn btn-sm" onClick={reset}>
              <RotateCcw size={14} /> Retake quiz
            </button>
            {result.passed && nextHref && (
              <a className="btn btn-primary btn-sm" href={nextHref}>
                Next lesson →
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
