"use client";

import { gbp, type CalcResult } from "@/lib/calc/common";
import { parseMoney, parsePercent } from "@/lib/calc/parse";
import {
  TRANSITION_YEARS,
  incomeCutForAniCap,
  partnershipTax,
  pensionForAniCap,
  validatePartnership,
  type ApportionMethod,
  type Arrangement,
  type PartnerTaxDetails,
  type PartnershipInput,
  type PartnershipResult,
  type Region,
} from "@/lib/calc/personal";
import { FormHead, GovLink, MoneyField, NumberField, SelectField } from "../Fields";
import { ResultPanel } from "../ResultPanel";
import { useFields } from "../useFields";
import styles from "../calc.module.css";
import { FiguresCard, MoreInputs, PaymentsCard, PlainField, RegionField, SubHead } from "./shared";

const MAX = 10;
const ARR = 3;
type V = Record<string, string>;

function blank(): V {
  const v: V = {
    n: "2", sel: "0", method: "days", structure: "aligned", p1s: "", p1e: "", p1p: "", p2s: "", p2e: "", p2p: "",
    arrs: "1", from1: "", from2: "", rate0: "", rate1: "", rate2: "", cap: "100,000", measure: "allowance",
  };
  for (let j = 0; j < MAX; j++) {
    v[`name${j}`] = "";
    for (let a = 0; a < ARR; a++) {
      v[`sal${a}_${j}`] = "";
      v[`capi${a}_${j}`] = "";
      v[`sh${a}_${j}`] = "";
    }
    for (const k of ["emp", "paye", "ons", "sav", "div", "ras", "ga", "cb", "rel", "otax", "poa", "trt", ...TRANSITION_YEARS.map((y) => `acc${y}`)]) v[`${k}${j}`] = "";
    v[`region${j}`] = "rUK";
    v[`ceased${j}`] = "no";
    v[`spa${j}`] = "no";
    v[`c4t${j}`] = "yes";
  }
  return v;
}
const BLANK = blank();
// Fenwick & Shah (partnership income lesson): profit £128,000; Anna salary £20,000; 5% interest on £40,000 / £20,000; 60:40 → £85,000 / £43,000.
const EXAMPLE: V = {
  ...BLANK,
  p1p: "128,000",
  rate0: "5",
  name0: "Anna Fenwick",
  name1: "Ravi Shah",
  sal0_0: "20,000",
  capi0_0: "40,000",
  capi0_1: "20,000",
  sh0_0: "60",
  sh0_1: "40",
};

const PERSONAL_MONEY: [string, string, string?][] = [
  ["emp", "Employment income"],
  ["paye", "PAYE tax deducted"],
  ["ons", "Other non-savings income", "Pensions, property profit, other taxable income."],
  ["sav", "Savings interest"],
  ["div", "Dividends"],
  ["rel", "Reliefs deducted from total income", "E.g. a claim to set this year's partnership loss against other income (s64)."],
  ["ras", "Personal pension contributions paid (net)", "Relief at source: extends the bands and reduces adjusted net income."],
  ["ga", "Gift Aid donations paid (net)"],
  ["cb", "Child Benefit received in the household", "Only if this partner has the higher adjusted net income."],
  ["otax", "Other tax deducted at source"],
  ["poa", "Payments on account already made for this year"],
];

export function PartnershipCalc({ taxYear }: { taxYear: string }) {
  const f = useFields(EXAMPLE, BLANK);
  const v = f.values;
  const set = f.set as (k: string) => (x: string) => void;
  const n = Math.min(MAX, Math.max(2, Number(v.n) || 2));
  const arrs = Math.min(ARR, Math.max(1, Number(v.arrs) || 1));
  const sel = Math.min(n - 1, Number(v.sel) || 0);
  const y0 = Number(taxYear.slice(0, 4));
  const yearIdx = TRANSITION_YEARS.indexOf(taxYear as (typeof TRANSITION_YEARS)[number]);

  // Parse everything, collecting field errors.
  const fieldErr: Record<string, string | undefined> = {};
  const money = (k: string) => {
    const p = parseMoney(v[k]);
    if (p.error) fieldErr[k] = p.error;
    return p.value ?? 0;
  };
  const pct = (k: string) => {
    const p = parsePercent(v[k]);
    if (p.error) fieldErr[k] = p.error;
    return p.value ?? 0;
  };
  const names = Array.from({ length: n }, (_, j) => v[`name${j}`].trim() || `Partner ${j + 1}`);

  const periods: PartnershipInput["periods"] =
    v.structure === "aligned"
      ? [{ start: `${y0}-04-06`, end: `${y0 + 1}-04-05`, profit: money("p1p") }]
      : [
          { start: v.p1s, end: v.p1e, profit: money("p1p") },
          { start: v.p2s, end: v.p2e, profit: money("p2p") },
        ];
  const arrangements: Arrangement[] = Array.from({ length: arrs }, (_, a) => ({
    from: a === 0 ? "" : v[`from${a}`],
    interestRate: pct(`rate${a}`),
    terms: Array.from({ length: n }, (_, j) => ({ salary: money(`sal${a}_${j}`), capital: money(`capi${a}_${j}`), share: pct(`sh${a}_${j}`) })),
  }));
  const partners: PartnerTaxDetails[] = Array.from({ length: n }, (_, j) => ({
    name: names[j],
    region: v[`region${j}`] as Region,
    employment: money(`emp${j}`),
    paye: money(`paye${j}`),
    otherNonSavings: money(`ons${j}`),
    savings: money(`sav${j}`),
    dividends: money(`div${j}`),
    reliefs: money(`rel${j}`),
    rasPensionNet: money(`ras${j}`),
    giftAidNet: money(`ga${j}`),
    childBenefit: money(`cb${j}`),
    otherTaxDeducted: money(`otax${j}`),
    poasPaid: money(`poa${j}`),
    transitionProfitTotal: money(`trt${j}`),
    transitionAccelerated: Object.fromEntries(TRANSITION_YEARS.map((y) => [y, money(`acc${y}${j}`)])),
    ceasedThisYear: v[`ceased${j}`] === "yes",
    overStatePensionAge: v[`spa${j}`] === "yes",
    class4OnTransition: v[`c4t${j}`] !== "no",
  }));
  const input: PartnershipInput = { taxYear, method: v.method as ApportionMethod, periods, arrangements, partners };
  const cap = money("cap");

  const { result, errors } = ((): { result: PartnershipResult | null; errors: string[] } => {
    if (Object.values(fieldErr).some(Boolean)) return { result: null, errors: ["Fix the highlighted fields."] };
    const errs = validatePartnership(input);
    if (errs.length) return { result: null, errors: errs };
    try {
      return { result: partnershipTax(input), errors: [] };
    } catch (e) {
      return { result: null, errors: [e instanceof Error ? e.message : String(e)] };
    }
  })();

  const p = result?.partners[sel];
  const panel: CalcResult | null =
    result && p ? { taxYear, tax: p.result.tax, working: [...result.working, { label: `${p.name}`, amount: 0, kind: "note" }, ...p.working], rateIds: result.rateIds, notes: [...p.result.notes, ...result.notes] } : null;

  // Targets for the selected partner.
  const measure = v.measure === "statutory" ? "statutory" : "allowance";
  const share = p ? Math.max(0, p.taxYearShare) : 0;
  const cut = p && cap > 0 ? incomeCutForAniCap(p.taxInput, cap, share, (i, x) => ({ ...i, trading: { ...i.trading!, turnover: Math.max(0, share - x) } }), measure) : null;
  const pension = p && cap > 0 ? pensionForAniCap(p.taxInput, cap, measure) : null;
  const firmProfit = result?.firmTaxYearProfit ?? 0;

  const partnerOptions = names.map((nm, j) => ({ value: String(j), label: nm }));

  return (
    <div className={styles.layout}>
      <form className={`card card-pad ${styles.form}`} onSubmit={(e) => e.preventDefault()} aria-label="Partnership inputs">
        <FormHead
          title="Partnership"
          intro="Allocates a partnership's tax-adjusted profit (salaries, interest on capital, then the profit-sharing ratio, with mid-period changes), reallocates notional losses, apportions to the tax year, adds any transition profit, and works out each partner's income tax, Class 4 and Class 2 with their own other income."
          example="Fenwick & Shah (partnership income lesson): profit £128,000 for the year to 31 March 2027; Anna salary £20,000; 5% interest on £40,000 and £20,000; balance 60:40 → Anna £85,000, Ravi £43,000."
          onExample={f.loadExample}
          onClear={f.clear}
        />
        <SelectField label="Number of partners" value={String(n)} onChange={set("n")} options={Array.from({ length: MAX - 1 }, (_, k) => ({ value: String(k + 2), label: String(k + 2) }))} />

        <SubHead>Accounts</SubHead>
        <SelectField
          label="Accounting year end"
          value={v.structure}
          onChange={set("structure")}
          options={[
            { value: "aligned", label: "31 March or 5 April (one set of accounts)" },
            { value: "two", label: "Another date: apportion two sets of accounts" },
          ]}
          help={
            <>
              Partners are taxed on profit arising in the tax year (from 2024/25). A 31 March to 4 April year end is treated as 5 April.{" "}
              <GovLink href="https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim81201">HMRC BIM81201</GovLink>
            </>
          }
        />
        {v.structure === "aligned" ? (
          <MoneyField label={`Tax-adjusted trading profit for the year (negative for a loss)`} value={v.p1p} onChange={set("p1p")} error={fieldErr.p1p} help="After capital allowances, with partners' salaries, interest on capital and drawings added back." />
        ) : (
          <>
            <PlainField type="date" label="Period 1 starts" value={v.p1s} onChange={set("p1s")} />
            <PlainField type="date" label="Period 1 ends" value={v.p1e} onChange={set("p1e")} help="The accounts that end in the tax year." />
            <MoneyField label="Period 1 tax-adjusted profit (negative for a loss)" value={v.p1p} onChange={set("p1p")} error={fieldErr.p1p} />
            <PlainField type="date" label="Period 2 starts" value={v.p2s} onChange={set("p2s")} help="The day after period 1 ends." />
            <PlainField type="date" label="Period 2 ends" value={v.p2e} onChange={set("p2e")} />
            <MoneyField label="Period 2 tax-adjusted profit (estimate if not yet final)" value={v.p2p} onChange={set("p2p")} error={fieldErr.p2p} />
          </>
        )}
        <SelectField
          label="Time-apportion by"
          value={v.method}
          onChange={set("method")}
          options={[
            { value: "days", label: "Days (HMRC's default)" },
            { value: "months", label: "Months (tax year taken as April to March)" },
          ]}
          help="Used for the tax-year apportionment and for changes in the sharing arrangements. Another reasonable basis is accepted if used consistently."
        />

        <SubHead>Profit-sharing arrangements</SubHead>
        <SelectField
          label="Changes during the accounts"
          value={String(arrs)}
          onChange={set("arrs")}
          options={[
            { value: "1", label: "None: one arrangement" },
            { value: "2", label: "One change (ratio change, a partner joins or leaves)" },
            { value: "3", label: "Two changes" },
          ]}
          help="A partner who hasn't joined yet, or has left, has a 0% share and no salary or capital in that arrangement."
        />
        {Array.from({ length: arrs }, (_, a) => (
          <fieldset key={a} style={{ border: "1px solid var(--border)", borderRadius: 10, padding: "10px 12px", minWidth: 0 }}>
            <legend style={{ fontWeight: 650, fontSize: 14, padding: "0 4px" }}>{a === 0 ? (arrs > 1 ? "Arrangement 1 (from the start)" : "Arrangement") : `Arrangement ${a + 1}`}</legend>
            <div className="stack" style={{ gap: 12 }}>
              {a > 0 && <PlainField type="date" label="Applies from" value={v[`from${a}`]} onChange={set(`from${a}`)} />}
              <NumberField label="Interest on capital" value={v[`rate${a}`]} onChange={set(`rate${a}`)} error={fieldErr[`rate${a}`]} suffix="%" help="A year, on each partner's capital. Leave blank if none." />
              {Array.from({ length: n }, (_, j) => (
                <div key={j} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, borderTop: "1px solid var(--border)", paddingTop: 10 }}>
                  {a === 0 ? <PlainField label={`Partner ${j + 1} name`} value={v[`name${j}`]} onChange={set(`name${j}`)} /> : <div style={{ fontWeight: 600, alignSelf: "end" }}>{names[j]}</div>}
                  <MoneyField label="Salary (a year)" value={v[`sal${a}_${j}`]} onChange={set(`sal${a}_${j}`)} error={fieldErr[`sal${a}_${j}`]} />
                  <MoneyField label="Capital" value={v[`capi${a}_${j}`]} onChange={set(`capi${a}_${j}`)} error={fieldErr[`capi${a}_${j}`]} />
                  <NumberField label="Share of balance" value={v[`sh${a}_${j}`]} onChange={set(`sh${a}_${j}`)} error={fieldErr[`sh${a}_${j}`]} suffix="%" />
                </div>
              ))}
            </div>
          </fieldset>
        ))}

        <SubHead>Each partner&apos;s own tax position</SubHead>
        <SelectField label="Partner shown" value={String(sel)} onChange={set("sel")} options={partnerOptions} help="Choose a partner to enter their other income and see their tax. Each partner keeps their own entries." />
        <RegionField value={v[`region${sel}`]} onChange={set(`region${sel}`)} taxYear={taxYear} />
        <MoreInputs title={`More inputs for ${names[sel]}: other income, reliefs, transition profit, NIC`}>
          {PERSONAL_MONEY.map(([k, label, help]) => (
            <MoneyField key={k} label={label} value={v[`${k}${sel}`]} onChange={set(`${k}${sel}`)} error={fieldErr[`${k}${sel}`]} help={help} />
          ))}
          <SubHead>Transition profit (basis period reform)</SubHead>
          <MoneyField
            label="Total 2023/24 transition profit being spread"
            value={v[`trt${sel}`]}
            onChange={set(`trt${sel}`)}
            error={fieldErr[`trt${sel}`]}
            help={<>After overlap relief. Taxed 20% a year from 2023/24 to 2027/28 unless accelerated. <GovLink href="https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim81310">HMRC BIM81310</GovLink></>}
          />
          {yearIdx >= 0 &&
            TRANSITION_YEARS.slice(0, yearIdx + 1).map((y) => (
              <MoneyField key={y} label={`Extra transition profit elected to be taxed in ${y}`} value={v[`acc${y}${sel}`]} onChange={set(`acc${y}${sel}`)} error={fieldErr[`acc${y}${sel}`]} />
            ))}
          <SelectField label="Left the partnership permanently this tax year?" value={v[`ceased${sel}`]} onChange={set(`ceased${sel}`)} options={[{ value: "no", label: "No" }, { value: "yes", label: "Yes: any untaxed transition profit is taxed now" }]} />
          <SelectField
            label="Class 4 on the transition profit?"
            value={v[`c4t${sel}`]}
            onChange={set(`c4t${sel}`)}
            options={[{ value: "yes", label: "Yes (usual view)" }, { value: "no", label: "No" }]}
            help="The usual reading of SSCBA 1992 s15 with FA 2022 Sch 1 charges it; HMRC guidance doesn't say so in terms."
          />
          <SelectField label="Over State Pension age at the start of the tax year?" value={v[`spa${sel}`]} onChange={set(`spa${sel}`)} options={[{ value: "no", label: "No" }, { value: "yes", label: "Yes: no Class 4" }]} />
        </MoreInputs>

        <SubHead>Target</SubHead>
        <MoneyField label="Keep adjusted net income at or below" value={v.cap} onChange={set("cap")} error={fieldErr.cap} help="E.g. £100,000 (personal allowance) or £60,000 (Child Benefit charge)." />
        <SelectField
          label="Measure"
          value={v.measure}
          onChange={set("measure")}
          options={[
            { value: "allowance", label: "Including transition profit (personal allowance taper)" },
            { value: "statutory", label: "Excluding transition profit (Child Benefit charge)" },
          ]}
        />
      </form>

      <div className="stack" style={{ gap: 16, minWidth: 0 }}>
        <ResultPanel
          title={`Partnership: ${p?.name ?? names[sel]}`}
          headlineLabel={`${p?.name ?? names[sel]}: income tax and NIC`}
          result={panel}
          errors={errors}
          effectiveRate={p?.result.effectiveRate}
          effectiveRateLabel="Effective rate on total income"
          inputsSummary={[
            `Partners: ${names.join(", ")}`,
            v.structure === "aligned" ? `Year to 5 April ${y0 + 1} (or 31 March): profit ${v.p1p || "0"}` : `Period 1 ${v.p1s} to ${v.p1e}: ${v.p1p || "0"}; period 2 ${v.p2s} to ${v.p2e}: ${v.p2p || "0"}`,
            `Apportioned by ${v.method}`,
          ]}
        />
        {result && (
          <FiguresCard
            title={`All partners (${taxYear})`}
            rows={[
              ["Partnership profit arising in the tax year", gbp(result.firmTaxYearProfit)],
              ...result.partners.map(
                (q): [string, string] => [
                  q.name,
                  `${q.taxYearShare < 0 ? "loss " : ""}${gbp(Math.abs(q.taxYearShare))}${q.transitionSlice ? ` + transition ${gbp(q.transitionSlice)}` : ""}; tax and NIC ${gbp(q.result.tax)}`,
                ]
              ),
              ...(result.periods.some((x) => x.reallocated) ? ([["Notional losses reallocated", "Yes (see the working)"]] as [string, string][]) : []),
            ]}
          />
        )}
        {p && cut && pension && (
          <FiguresCard
            title={`Target for ${p.name}: adjusted net income at most ${gbp(cap)}`}
            rows={[
              ["Adjusted net income now", gbp(measure === "allowance" ? p.result.incomeTax.allowanceIncome : p.result.incomeTax.adjustedNetIncome)],
              [
                "Reduction in profit share needed",
                cut.alreadyMet ? "Not needed" : cut.cut === null ? "Not reachable by profit share alone" : `${gbp(cut.cut)} (share ${gbp(share - cut.cut)}${firmProfit > 0 ? `, ${Number(((100 * (share - cut.cut)) / firmProfit).toFixed(2))}% of the firm's profit` : ""})`,
              ],
              ["…or extra pension contribution (net)", pension.alreadyMet ? "Not needed" : pension.net === null ? "Not reachable" : `${gbp(pension.net)} (gross ${gbp(pension.gross ?? 0)})`],
            ]}
          >
            {pension.warnings.map((w) => (
              <p key={w} className="small" style={{ margin: 0, color: "var(--danger)" }}>
                {w}
              </p>
            ))}
            <p className="small faint" style={{ margin: 0 }}>
              Solved exactly against this partner&apos;s computation. A change in profit shares moves profit to the other partners and needs a commercial reason and a change to the agreement.
            </p>
          </FiguresCard>
        )}
        {p && <PaymentsCard payments={p.result.payments} taxYear={taxYear} />}
      </div>
    </div>
  );
}
