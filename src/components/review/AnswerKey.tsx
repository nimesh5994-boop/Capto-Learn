import { CheckCircle2, Circle } from "lucide-react";
import type { Exercise, McqQuestion } from "@/content/types";
import { renderInline, renderMarkdown } from "@/lib/markdown";
import { JournalTable } from "@/components/learn/Blocks";
import styles from "./review.module.css";

const KIND: Record<Exercise["kind"], string> = { mcq: "Multiple choice", multi: "Select all that apply", numeric: "Calculation", journal: "Journal", classify: "Classify" };

function Options({ options, correct }: { options: string[]; correct: number[] }) {
  return (
    <ul className={styles.opts}>
      {options.map((o, k) => (
        <li key={k} className={correct.includes(k) ? styles.optRight : undefined}>
          {correct.includes(k) ? <CheckCircle2 size={14} /> : <Circle size={14} />}
          <span dangerouslySetInnerHTML={{ __html: renderInline(o) }} />
        </li>
      ))}
    </ul>
  );
}

/** A question with its answer key and explanation laid out for checking, plus how learners have done on it. */
export function AnswerKey({ ex, n, accuracy }: { ex: Exercise | McqQuestion; n: string; accuracy?: { pct: number; total: number } }) {
  return (
    <div className={styles.q}>
      <div className={styles.qHead}>
        <span className={styles.qNum}>{n}</span>
        <span className="small muted">{KIND[ex.kind]}</span>
        {accuracy && (
          <span className="small" style={{ marginLeft: "auto", color: accuracy.total >= 10 && accuracy.pct < 40 ? "var(--danger)" : "var(--text-muted)" }} title="Share of learner attempts answered correctly">
            Learners: {accuracy.pct}% right ({accuracy.total})
          </span>
        )}
      </div>
      <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(ex.prompt) }} />
      {ex.kind === "mcq" && <Options options={ex.options} correct={[ex.answer]} />}
      {ex.kind === "multi" && <Options options={ex.options} correct={ex.answers} />}
      {ex.kind === "numeric" && (
        <div className={styles.answer}>
          Answer: <strong>{ex.unit === "£" ? `£${ex.answer.toLocaleString("en-GB")}` : `${ex.answer.toLocaleString("en-GB")}${ex.unit === "%" ? "%" : ex.unit ? ` ${ex.unit}` : ""}`}</strong>
          <span className="faint"> (± {ex.tolerance ?? 0.5})</span>
        </div>
      )}
      {ex.kind === "journal" && <JournalTable lines={ex.answer} title="Expected entry" />}
      {ex.kind === "classify" && (
        <table className="table">
          <tbody>
            {ex.items.map((it, k) => (
              <tr key={k}>
                <td className="small" dangerouslySetInnerHTML={{ __html: renderInline(it.text) }} />
                <td className="small">
                  <strong>{ex.categories[it.answer]}</strong>
                  {it.why && <div className="faint">{it.why}</div>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className={styles.explain}>
        <div className={styles.explainLabel}>Explanation shown to learners</div>
        <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(ex.explain) }} />
        {ex.kind === "numeric" && ex.working && <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(ex.working) }} />}
      </div>
    </div>
  );
}
