"use client";

import { gbp } from "@/lib/calc/common";
import type { SummaryRow } from "@/lib/calc/employment/takeHome";
import styles from "./employment.module.css";

/** Year / month / week view of annual figures. */
export function PeriodTable({ rows, caption }: { rows: SummaryRow[]; caption: string }) {
  return (
    <section className="card card-pad" aria-label={caption}>
      <table className={styles.periodTable}>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Year</th>
            <th scope="col">Month</th>
            <th scope="col">Week</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className={r.kind === "total" ? styles.rowTotal : r.kind === "subtotal" ? styles.rowSubtotal : r.kind === "employer" ? styles.rowEmployer : undefined}>
              <th scope="row" style={{ fontWeight: "inherit" }}>
                {r.label}
              </th>
              <td>{gbp(r.annual)}</td>
              <td>{gbp(r.annual / 12)}</td>
              <td>{gbp(r.annual / 52)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
