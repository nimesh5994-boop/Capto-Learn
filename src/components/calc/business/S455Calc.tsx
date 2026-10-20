"use client";

import { s455Charge, validateS455, type S455Result } from "@/lib/calc/business/s455";
import { longDate } from "@/lib/calc/business/dates";
import { gbp } from "@/lib/calc/common";
import { FormHead, GovLink } from "../Fields";
import { ResultPanel } from "../ResultPanel";
import { useFields } from "../useFields";
import base from "../calc.module.css";
import styles from "./business.module.css";
import { CheckField, DateField, RowsEditor, parseRows, run, useRows } from "./ui";

const CTM = "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61505";
const RELIEF = "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61610";

const EXAMPLE = { apStart: "2026-01-01", apEnd: "2026-12-31", release: "no" };
const BLANK = { apStart: "", apEnd: "", release: "no" };
const LOANS = [{ date: "2026-08-01", amount: "50,000" }];
const REPAY = [{ date: "2027-10-01", amount: "20,000" }];

export function S455Calc({ taxYear }: { taxYear: string }) {
  const f = useFields(EXAMPLE, BLANK);
  const loans = useRows(LOANS, [{ date: "", amount: "" }]);
  const repay = useRows(REPAY, []);
  const v = f.values;
  const L = parseRows(loans.rows);
  const P = parseRows(repay.rows);
  const input = {
    taxYear,
    apStart: v.apStart,
    apEnd: v.apEnd,
    loans: L.rows,
    repayments: P.rows.map((r) => ({ ...r, kind: v.release === "yes" ? ("release" as const) : ("repayment" as const) })),
  };
  const { result, errors } = run<S455Result>(L.error || P.error, () => validateS455(input), () => s455Charge(input));

  return (
    <div className={base.layout}>
      <form className={`card card-pad ${base.form}`} onSubmit={(e) => e.preventDefault()} aria-label="s455 inputs">
        <FormHead
          title="Loans to participators (s455)"
          intro="Tax on an overdrawn director's loan account in a close company: loans made in the accounting period still outstanding 9 months after it ends, at the rate for the date each loan was made, and when s458 relief comes back on later repayment."
          example="Director borrows £50,000 on 1 August 2026 (year end 31 December 2026) and repays £20,000 on 1 October 2027: s455 £17,875; relief £7,150 due 1 October 2028."
          onExample={() => {
            f.loadExample();
            loans.loadExample();
            repay.loadExample();
          }}
          onClear={() => {
            f.clear();
            loans.clear();
            repay.clear();
          }}
        />
        <div className="grid-2">
          <DateField label="Accounting period starts" value={v.apStart} onChange={f.set("apStart")} />
          <DateField label="Accounting period ends" value={v.apEnd} onChange={f.set("apEnd")} help="The AP in which the loans were made." />
        </div>
        <RowsEditor
          legend="Loans made in the period and outstanding at its end"
          rows={loans}
          itemLabel="Loan"
          help={
            <>
              Use the net increase in the overdrawn balance on each date. The rate depends on the date: 33.75% before 6 April 2026, 35.75% from then. <GovLink href={CTM}>CTM61505</GovLink>
            </>
          }
        />
        <RowsEditor
          legend="Repayments after the period end"
          rows={repay}
          itemLabel="Repayment"
          help={
            <>
              Cash repaid, or dividends or bonus credited to the account. Within 9 months of the year end the charge falls away; later, relief is due 9 months and 1 day after the end of the AP of repayment. <GovLink href={RELIEF}>CTM61610</GovLink>
            </>
          }
        />
        <CheckField
          label="These are releases or write-offs rather than repayments"
          checked={v.release === "yes"}
          onChange={(c) => f.set("release")(c ? "yes" : "no")}
          help="Relief works the same way, but the amount written off is taxed on the participator as a dividend."
        />
      </form>
      <div className={styles.panel}>
        <ResultPanel
          title="s455 tax"
          headlineLabel="s455 tax payable"
          result={result}
          errors={errors}
          inputsSummary={[
            `Accounting period: ${v.apStart} to ${v.apEnd}`,
            ...L.rows.map((l, k) => `Loan ${k + 1}: ${l.date} ${gbp(l.amount)}`),
            ...P.rows.map((p, k) => `Repayment ${k + 1}: ${p.date} ${gbp(p.amount)}`),
          ]}
        />
        {result && result.tax > 0 && (
          <p className="card card-pad small">
            Pay {gbp(result.tax)} by {longDate(result.chargeDueDate)} with the corporation tax for the period
            {result.relief.length ? `; relief of ${gbp(result.relief.reduce((s, x) => s + x.amount, 0))} comes back from ${longDate(result.relief[0].reliefDue)}` : ""}.
          </p>
        )}
      </div>
    </div>
  );
}
