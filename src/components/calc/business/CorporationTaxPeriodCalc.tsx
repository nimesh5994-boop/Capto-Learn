"use client";

import { corporationTaxForPeriod, splitIntoAccountingPeriods, validateCtPeriod, type CtPeriodResult, type InstalmentStatus } from "@/lib/calc/business/corporationTaxPeriod";
import { isIsoDate, longDate, shortDate } from "@/lib/calc/business/dates";
import { gbp } from "@/lib/calc/common";
import { parseMoney, parseWhole } from "@/lib/calc/parse";
import { FormHead, GovLink, MoneyField, NumberField, SelectField } from "../Fields";
import { ResultPanel } from "../ResultPanel";
import { useFields } from "../useFields";
import base from "../calc.module.css";
import styles from "./business.module.css";
import { CheckField, DateField, More, run } from "./ui";

const MR = "https://www.gov.uk/guidance/corporation-tax-marginal-relief";
const QIP = "https://www.gov.uk/guidance/corporation-tax-paying-in-instalments";
const AP = "https://www.gov.uk/corporation-tax-accounting-period";

const apKeys = [0, 1, 2] as const;
const perAp = (k: number, v: { ca?: string; gains?: string; ded?: string; div?: string; assoc?: string }) => ({
  [`ca${k}`]: v.ca ?? "",
  [`gains${k}`]: v.gains ?? "",
  [`ded${k}`]: v.ded ?? "",
  [`div${k}`]: v.div ?? "",
  [`assoc${k}`]: v.assoc ?? "0",
});

const EXAMPLE: Record<string, string> = {
  start: "2026-04-01",
  end: "2027-03-31",
  trading: "180,000",
  other: "",
  by: "days",
  large: "no",
  ...perAp(0, {}),
  ...perAp(1, {}),
  ...perAp(2, {}),
};
const BLANK: Record<string, string> = { ...EXAMPLE, trading: "" };

const STATUS: Record<InstalmentStatus, string> = {
  normal: "Not large: one payment",
  "first-year-exception": "Large, first-year exception: one payment",
  "below-de-minimis": "Liability under the de minimis: one payment",
  large: "Large: quarterly instalments",
  "very-large": "Very large: quarterly instalments",
};

export function CorporationTaxPeriodCalc({ taxYear }: { taxYear: string }) {
  const f = useFields(EXAMPLE, BLANK);
  const v = f.values;
  const trading = parseMoney(v.trading);
  const other = parseMoney(v.other);
  const nAps = isIsoDate(v.start) && isIsoDate(v.end) && v.end >= v.start ? Math.min(3, splitIntoAccountingPeriods(v.start, v.end).length) : 1;
  const aps = apKeys.map((k) => ({
    ca: parseMoney(v[`ca${k}`]),
    gains: parseMoney(v[`gains${k}`]),
    ded: parseMoney(v[`ded${k}`]),
    div: parseMoney(v[`div${k}`]),
    assoc: parseWhole(v[`assoc${k}`]),
  }));
  const fieldErrors = !!trading.error || !!other.error || aps.slice(0, nAps).some((a) => Object.values(a).some((x) => x.error));

  const input = {
    taxYear,
    start: v.start,
    end: v.end,
    tradingProfit: trading.value ?? 0,
    otherIncome: other.value ?? 0,
    apportionBy: v.by as "days" | "months",
    largeInPrevious12Months: v.large === "yes",
    aps: aps.map((a) => ({
      capitalAllowances: a.ca.value ?? 0,
      chargeableGains: a.gains.value ?? 0,
      deductions: a.ded.value ?? 0,
      exemptDistributions: a.div.value ?? 0,
      associatedCompanies: a.assoc.value ?? 0,
    })),
  };
  const { result, errors } = run<CtPeriodResult>(fieldErrors, () => validateCtPeriod(input), () => corporationTaxForPeriod(input));
  const apRanges = isIsoDate(v.start) && isIsoDate(v.end) && v.end >= v.start ? splitIntoAccountingPeriods(v.start, v.end) : [];

  return (
    <div className={base.layout}>
      <form className={`card card-pad ${base.form}`} onSubmit={(e) => e.preventDefault()} aria-label="Corporation tax inputs">
        <FormHead
          title="Corporation tax"
          intro="For a dated period of account: splits a period over 12 months into accounting periods, apportions each across financial years by days, applies marginal relief with associated companies and exempt dividends, and gives the payment dates, including quarterly instalments for large companies."
          example="Calder Valley Joinery Ltd (rates and marginal relief lesson): year to 31 March 2027, profits £180,000 → £43,950, due 1 January 2028."
          onExample={f.loadExample}
          onClear={f.clear}
        />
        <div className="grid-2">
          <DateField label="Period of account starts" value={v.start} onChange={f.set("start")} help="First day of the accounts period." />
          <DateField
            label="Period of account ends"
            value={v.end}
            onChange={f.set("end")}
            help={
              <>
                An AP can&apos;t exceed 12 months; longer accounts are split. <GovLink href={AP}>GOV.UK</GovLink>
              </>
            }
          />
        </div>
        <MoneyField
          label="Trading profit before capital allowances"
          value={v.trading}
          onChange={f.set("trading")}
          error={trading.error}
          help="Adjusted trading profit for the whole period of account (after disallowing depreciation, entertaining and so on). Time-apportioned between accounting periods."
        />
        {apKeys.slice(0, nAps).map((k) => (
          <fieldset key={k} style={{ border: 0, padding: 0, margin: 0 }} className={base.form}>
            {nAps > 1 && apRanges[k] && (
              <legend style={{ fontWeight: 650, fontSize: 14.5, marginBottom: 8 }}>
                AP {k + 1}: {shortDate(apRanges[k].start)} to {shortDate(apRanges[k].end)}
              </legend>
            )}
            <div className="grid-2">
              <MoneyField label={`Capital allowances${nAps > 1 ? ` (AP ${k + 1})` : ""}`} value={v[`ca${k}`]} onChange={f.set(`ca${k}`)} error={aps[k].ca.error} help="Net of any balancing charges. Use the capital allowances calculator." />
              <NumberField
                label={`Associated companies${nAps > 1 ? ` (AP ${k + 1})` : ""}`}
                value={v[`assoc${k}`]}
                onChange={f.set(`assoc${k}`)}
                error={aps[k].assoc.error}
                help={
                  <>
                    Under common control at any time in the AP; ignore dormant ones. <GovLink href={MR}>GOV.UK</GovLink>
                  </>
                }
              />
            </div>
          </fieldset>
        ))}
        <CheckField
          label="The company was large (for instalments) in the 12 months before this period"
          checked={v.large === "yes"}
          onChange={(c) => f.set("large")(c ? "yes" : "no")}
          help={
            <>
              Profits over the £1.5m threshold (adjusted for associates) and liability over £10,000. If not, the first-year exception may apply. <GovLink href={QIP}>GOV.UK</GovLink>
            </>
          }
        />
        <More summary="More inputs: other income, gains, losses, dividends received">
          <MoneyField
            label="Property income and net loan relationship credits"
            value={v.other}
            onChange={f.set("other")}
            error={other.error}
            help="For the whole period of account (bank interest received less non-trading interest paid, rental profits). Time-apportioned here."
          />
          {apKeys.slice(0, nAps).map((k) => (
            <div key={k} className={base.form}>
              {nAps > 1 && <strong style={{ fontSize: 14 }}>AP {k + 1}</strong>}
              <div className="grid-2">
                <MoneyField label="Chargeable gains" value={v[`gains${k}`]} onChange={f.set(`gains${k}`)} error={aps[k].gains.error} help="Net gains in the AP after indexation (frozen at December 2017) and capital losses." />
                <MoneyField label="Losses, group relief and donations" value={v[`ded${k}`]} onChange={f.set(`ded${k}`)} error={aps[k].ded.error} help="Trading losses relieved, group relief claimed and qualifying charitable donations deducted in the AP." />
              </div>
              <MoneyField
                label="Exempt dividends received from non-group companies"
                value={v[`div${k}`]}
                onChange={f.set(`div${k}`)}
                error={aps[k].div.error}
                help={
                  <>
                    Added to profits to give augmented profits, which decide the rate band and instalment status. Exclude dividends from 51% subsidiaries. <GovLink href={MR}>GOV.UK</GovLink>
                  </>
                }
              />
            </div>
          ))}
          <SelectField
            label="Apportion by"
            value={v.by}
            onChange={f.set("by")}
            options={[
              { value: "days", label: "Days (statutory basis)" },
              { value: "months", label: "Months (as in many textbook examples)" },
            ]}
            help="Used to split a long period of account and to reduce the limits for a short AP. HMRC's manual says the strict basis is days."
          />
        </More>
      </form>
      <div className={styles.panel}>
        <ResultPanel
          title="Corporation tax"
          headlineLabel="Corporation tax payable"
          result={result}
          errors={errors}
          effectiveRate={result?.effectiveRate}
          effectiveRateLabel="Effective rate on taxable total profits"
          inputsSummary={[
            `Period of account: ${v.start} to ${v.end}`,
            `Trading profit before capital allowances: ${v.trading || "0"}`,
            `Other income: ${v.other || "0"}`,
            ...apKeys.slice(0, nAps).map((k) => `AP ${k + 1}: capital allowances ${v[`ca${k}`] || "0"}, gains ${v[`gains${k}`] || "0"}, deductions ${v[`ded${k}`] || "0"}, exempt dividends ${v[`div${k}`] || "0"}, associates ${v[`assoc${k}`] || "0"}`),
            `Large in previous 12 months: ${v.large}`,
            `Apportioned by: ${v.by}`,
          ]}
        />
        {result && (
          <section className="card card-pad" aria-label="Payment dates">
            <div className={styles.panel}>
              <h3>When to pay</h3>
              {result.aps.map((a) => (
                <div key={a.index} className={styles.tableWrap}>
                  <table className={styles.table}>
                    <caption style={{ textAlign: "left", fontSize: 13, marginBottom: 4 }}>
                      {result.aps.length > 1 ? `AP ${a.index + 1} (${shortDate(a.start)} to ${shortDate(a.end)}): ` : ""}
                      {STATUS[a.status]}
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Due</th>
                        <th scope="col">Payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {a.payments.map((p) => (
                        <tr key={p.date + p.label}>
                          <td>
                            {longDate(p.date)} <span className={styles.muted}>— {p.label}</span>
                          </td>
                          <td>{gbp(p.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
              <p className={styles.muted}>Return due {longDate(result.filingDate)}.</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
