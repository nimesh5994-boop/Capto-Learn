import { AlertTriangle, BookMarked, Lightbulb, Scale } from "lucide-react";
import type { Block, JournalLine } from "@/content/types";
import { renderInline, renderMarkdown } from "@/lib/markdown";
import styles from "./learn.module.css";

const CALLOUT = {
  tip: { icon: Lightbulb, label: "Tip" },
  warning: { icon: AlertTriangle, label: "Watch out" },
  rule: { icon: Scale, label: "The rule" },
  example: { icon: BookMarked, label: "Example" },
} as const;

const gbp = (n: number) => n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function JournalTable({ lines, title, narrative }: { lines: JournalLine[]; title?: string; narrative?: string }) {
  const dr = lines.reduce((s, l) => s + (l.dr ?? 0), 0);
  const cr = lines.reduce((s, l) => s + (l.cr ?? 0), 0);
  // Debits first, credits indented — the way journals are written by hand.
  const ordered = [...lines.filter((l) => l.dr), ...lines.filter((l) => !l.dr)];
  return (
    <div className={styles.journal}>
      {title && <div className={styles.journalHead}>{title}</div>}
      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th className={styles.amt}>Dr £</th>
            <th className={styles.amt}>Cr £</th>
          </tr>
        </thead>
        <tbody>
          {ordered.map((l, i) => (
            <tr key={i}>
              <td className={l.cr ? styles.crAcc : undefined}>{l.account}</td>
              <td className={styles.amt}>{l.dr ? gbp(l.dr) : ""}</td>
              <td className={styles.amt}>{l.cr ? gbp(l.cr) : ""}</td>
            </tr>
          ))}
          <tr>
            <td className="small muted">Totals</td>
            <td className={styles.amt}>
              <strong>{gbp(dr)}</strong>
            </td>
            <td className={styles.amt}>
              <strong>{gbp(cr)}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      {narrative && <div className={styles.journalNote}>{narrative}</div>}
    </div>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className={styles.blocks}>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "md":
            return <div key={i} className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(b.md) }} />;
          case "callout": {
            const { icon: Icon, label } = CALLOUT[b.tone];
            return (
              <div key={i} className={`${styles.callout} ${styles[`callout_${b.tone}`]}`}>
                <div className={styles.calloutTitle}>
                  <Icon size={15} /> {b.title ?? label}
                </div>
                <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(b.md) }} />
              </div>
            );
          }
          case "table":
            return (
              <div key={i} className={styles.tableWrap}>
                <table className={styles.dataTable}>
                  {b.caption && <caption>{b.caption}</caption>}
                  <thead>
                    <tr>
                      {b.head.map((h, j) => (
                        <th key={j} dangerouslySetInnerHTML={{ __html: renderInline(h) }} />
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j}>
                        {r.map((c, k) => (
                          <td key={k} dangerouslySetInnerHTML={{ __html: renderInline(c) }} />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "journal":
            return <JournalTable key={i} lines={b.lines} title={b.title} narrative={b.narrative} />;
        }
      })}
    </div>
  );
}
