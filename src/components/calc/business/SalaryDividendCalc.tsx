"use client";

import { useDeferredValue, useMemo } from "react";
import { salaryDividend, validateSalaryDividend, type SalaryDividendResult } from "@/lib/calc/business/salaryDividend";
import { gbp } from "@/lib/calc/common";
import { parseMoney, parseWhole } from "@/lib/calc/parse";
import { FormHead, GovLink, MoneyField, NumberField } from "../Fields";
import { ResultPanel } from "../ResultPanel";
import { useFields } from "../useFields";
import base from "../calc.module.css";
import styles from "./business.module.css";
import { CheckField, More, Segmented, run } from "./ui";

const EA = "https://www.gov.uk/claim-employment-allowance";

const EXAMPLE = { profit: "45,000", directors: "1", other: "", ea: "no", otherNic: "", assoc: "0", custom: "", mode: "distribute", target: "" };
const BLANK = { profit: "", directors: "1", other: "", ea: "no", otherNic: "", assoc: "0", custom: "", mode: "distribute", target: "" };

export function SalaryDividendCalc({ taxYear }: { taxYear: string }) {
  const f = useFields(EXAMPLE, BLANK);
  const v = f.values;
  const dv = useDeferredValue(v);
  const p = {
    profit: parseMoney(v.profit),
    directors: parseWhole(v.directors, 1),
    other: parseMoney(v.other),
    otherNic: parseMoney(v.otherNic),
    assoc: parseWhole(v.assoc),
    custom: parseMoney(v.custom, true),
    target: parseMoney(v.target, true),
  };

  const { result, errors } = useMemo(() => {
    const q = {
      profit: parseMoney(dv.profit),
      directors: parseWhole(dv.directors, 1),
      other: parseMoney(dv.other),
      otherNic: parseMoney(dv.otherNic),
      assoc: parseWhole(dv.assoc),
      custom: parseMoney(dv.custom, true),
      target: parseMoney(dv.target, true),
    };
    const input = {
      taxYear,
      profitBeforePay: q.profit.value ?? 0,
      directors: q.directors.value ?? 1,
      otherIncome: q.other.value ?? 0,
      employmentAllowance: dv.ea === "yes",
      otherStaffEmployerNic: q.otherNic.value ?? 0,
      associatedCompanies: q.assoc.value ?? 0,
      customSalary: q.custom.value,
      mode: dv.mode as "distribute" | "target",
      targetNetCash: q.target.value,
    };
    return run<SalaryDividendResult>(Object.values(q).some((x) => x.error), () => validateSalaryDividend(input), () => salaryDividend(input));
  }, [dv, taxYear]);

  const n = p.directors.value ?? 1;
  const each = n > 1 ? " (each)" : "";

  return (
    <div className={base.layout}>
      <form className={`card card-pad ${base.form}`} onSubmit={(e) => e.preventDefault()} aria-label="Salary versus dividend inputs">
        <FormHead
          title="Salary vs dividend"
          intro="Compares taking profit as salary or dividends for an owner-director: employer and employee NIC, corporation tax, income tax on salary and dividends, total tax and the director's net cash, with the most efficient salary found."
          example="Hartley Consulting Ltd (salary vs dividend lesson): profit £45,000, sole director, no other income → salary £12,570 leaves £35,247.32, £462.80 better than £5,000."
          onExample={f.loadExample}
          onClear={f.clear}
        />
        <MoneyField
          label="Company profit before director's pay"
          value={v.profit}
          onChange={f.set("profit")}
          error={p.profit.error}
          help="Taxable profit for the year before deducting any salary for the directors or employer NIC on it (other staff costs already deducted)."
        />
        <Segmented
          label="What to work out"
          value={v.mode as "distribute" | "target"}
          onChange={f.set("mode")}
          options={[
            { value: "distribute", label: "Pay out all the profit" },
            { value: "target", label: "Dividend for a target net cash" },
          ]}
        />
        {v.mode === "target" && (
          <MoneyField
            label={`Target net cash per director`}
            value={v.target}
            onChange={f.set("target")}
            error={p.target.error}
            help="Salary plus dividend after the director's income tax and NIC. The calculator finds the dividend needed at each salary and keeps the rest in the company."
          />
        )}
        <div className="grid-2">
          <NumberField label="Director-shareholders" value={v.directors} onChange={f.set("directors")} error={p.directors.error} help="Each takes the same salary and an equal share of dividends." />
          <MoneyField label={`Director's other income${n > 1 ? " (each)" : ""}`} value={v.other} onChange={f.set("other")} error={p.other.error} help="Other employment, pension or rental profit. Pushes salary and dividends into higher bands." />
        </div>
        <CheckField
          label="The company can claim the Employment Allowance"
          checked={v.ea === "yes"}
          onChange={(c) => f.set("ea")(c ? "yes" : "no")}
          help={
            <>
              Not if the only employee paid above the secondary threshold is a director. <GovLink href={EA}>GOV.UK</GovLink>
            </>
          }
        />
        <More summary="More inputs">
          {v.ea === "yes" && <MoneyField label="Employer NIC on other staff" value={v.otherNic} onChange={f.set("otherNic")} error={p.otherNic.error} help="Uses up the Employment Allowance first." />}
          <div className="grid-2">
            <NumberField label="Associated companies" value={v.assoc} onChange={f.set("assoc")} error={p.assoc.error} help="Divides the corporation tax limits." />
            <MoneyField label={`Another salary to compare${each}`} value={v.custom} onChange={f.set("custom")} error={p.custom.error} placeholder="Optional" help="Adds a column for this salary." />
          </div>
        </More>
      </form>
      <div className={styles.panel}>
        {result && (
          <section className="card card-pad" aria-label="Scenarios compared">
            <div className={styles.panel}>
              <h3>Side by side{n > 1 ? " (per director unless shown)" : ""}</h3>
              <div className={styles.cards}>
                {result.scenarios.map((s) => (
                  <div key={s.key} className={`${styles.card} ${s.key === result.bestKey ? styles.cardBest : ""}`}>
                    <div className={styles.cardTitle}>
                      {s.label}
                      {s.key === result.bestKey && <span className={styles.badge}>Best</span>}
                    </div>
                    {!s.feasible ? (
                      <div className={styles.muted}>{s.reason}</div>
                    ) : (
                      <>
                        <div className={styles.kv}><span>Salary</span><span>{gbp(s.salary)}</span></div>
                        <div className={styles.kv}><span>Dividend</span><span>{gbp(s.dividend)}</span></div>
                        <div className={styles.kv}><span>Employer NIC{n > 1 ? " (all)" : ""}</span><span>{gbp(s.employerNic)}</span></div>
                        <div className={styles.kv}><span>Corporation tax</span><span>{gbp(s.corporationTax)}</span></div>
                        <div className={styles.kv}><span>Employee NIC</span><span>{gbp(s.employeeNic)}</span></div>
                        <div className={styles.kv}><span>Income tax</span><span>{gbp(s.incomeTax)}</span></div>
                        <div className={styles.kv}><span>Total tax{n > 1 ? " (all)" : ""}</span><span>{gbp(s.totalTax)}</span></div>
                        {v.mode === "target" && <div className={styles.kv}><span>Kept in company</span><span>{gbp(s.retained)}</span></div>}
                        <div className={`${styles.kv} ${styles.kvStrong}`}><span>Net cash</span><span>{gbp(s.netCash)}</span></div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        <ResultPanel
          title="Salary vs dividend"
          headlineLabel="Total tax and NIC, most efficient option"
          result={result}
          errors={errors}
          effectiveRate={result?.effectiveRate}
          effectiveRateLabel="Share of profit paid in tax and NIC"
          inputsSummary={[
            `Profit before director's pay: ${v.profit || "0"}`,
            `Directors: ${v.directors}`,
            `Other income each: ${v.other || "0"}`,
            `Employment Allowance: ${v.ea}`,
            `Mode: ${v.mode === "target" ? `target net cash ${v.target}` : "pay out all profit"}`,
          ]}
        />
      </div>
    </div>
  );
}
