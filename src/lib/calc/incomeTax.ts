import { type CalcResult, type WorkingLine, CalcInputError, gbp, pctLabel, r2, rateReader, requireNonNegative } from "./common";

export interface IncomeTaxInput {
  taxYear: string;
  /** Employment, self-employment, pension, property income etc. (net of reliefs). */
  nonSavingsIncome: number;
  /** Interest outside ISAs. */
  savingsIncome: number;
  /** Dividends received. */
  dividends: number;
  /** Only England, Wales and Northern Ireland rates are supported in this version. */
  region: "rUK";
}

type BandKey = "basic" | "higher" | "additional";
type IncomeKind = "nonSavings" | "savings" | "dividends";

export interface IncomeTaxResult extends CalcResult {
  totalIncome: number;
  personalAllowance: number;
  taxableIncome: number;
  taxableNonSavings: number;
  taxableSavings: number;
  taxableDividends: number;
  startingRateForSavings: number;
  personalSavingsAllowance: number;
  nonSavingsTax: number;
  savingsTax: number;
  dividendTax: number;
  /** Income tax ÷ total income, or null when income is nil. */
  effectiveRate: number | null;
}

export const SCOTLAND_NOT_SUPPORTED =
  "Scottish taxpayers aren't supported yet: their non-savings income uses the Scottish rates and bands. Savings and dividend income would be the same as shown here.";

export function validateIncomeTax(i: IncomeTaxInput): string[] {
  const e: string[] = [];
  requireNonNegative(e, "Non-savings income", i.nonSavingsIncome);
  requireNonNegative(e, "Savings income", i.savingsIncome);
  requireNonNegative(e, "Dividends", i.dividends);
  if (i.region !== "rUK") e.push(SCOTLAND_NOT_SUPPORTED);
  return e;
}

const RATE_IDS: Record<IncomeKind, Record<BandKey, string>> = {
  nonSavings: { basic: "it.basic-rate", higher: "it.higher-rate", additional: "it.additional-rate" },
  // The dataset holds no separate savings rates: for these years savings use the main rates.
  savings: { basic: "it.basic-rate", higher: "it.higher-rate", additional: "it.additional-rate" },
  dividends: { basic: "it.dividend-ordinary-rate", higher: "it.dividend-upper-rate", additional: "it.dividend-additional-rate" },
};

const KIND_LABEL: Record<IncomeKind, string> = { nonSavings: "Non-savings", savings: "Savings", dividends: "Dividends" };
const BAND_LABEL: Record<BandKey, string> = { basic: "basic rate band", higher: "higher rate band", additional: "additional rate" };

/**
 * Income tax for an England/Wales/NI taxpayer: personal allowance taper,
 * then non-savings, savings and dividends stacked through the bands in that
 * order, with the starting rate for savings, the personal savings allowance
 * and the dividend allowance taxed at 0% but still using up band.
 */
export function incomeTax(input: IncomeTaxInput): IncomeTaxResult {
  const errors = validateIncomeTax(input);
  if (errors.length) throw new CalcInputError(errors);

  const R = rateReader(input.taxYear);
  const pa0 = R.gbp("it.personal-allowance");
  const taperFrom = R.gbp("it.pa-taper-threshold");
  const paNilAt = R.gbp("it.pa-nil-threshold");
  const brb = R.gbp("it.basic-rate-band");
  const art = R.gbp("it.additional-rate-threshold");

  const NS = input.nonSavingsIncome;
  const S = input.savingsIncome;
  const D = input.dividends;
  const total = NS + S + D;
  const working: WorkingLine[] = [];
  const notes: string[] = [];

  working.push({ label: "Non-savings income", amount: NS });
  if (S) working.push({ label: "Savings income", amount: S });
  if (D) working.push({ label: "Dividend income", amount: D });
  working.push({ label: "Total income (treated as adjusted net income)", amount: total, kind: "subtotal" });

  // Personal allowance taper. The reduction rate (£1 per £2) is derived from the
  // dataset: the full allowance is lost over the range taperFrom → paNilAt.
  let pa = pa0;
  if (total > taperFrom) {
    const perPound = pa0 / (paNilAt - taperFrom); // 0.5 for every year in the dataset (£1 per £2)
    const reduction = Math.min(pa0, (total - taperFrom) * perPound);
    pa = Math.max(0, pa0 - reduction);
    working.push({ label: `Personal allowance before taper`, amount: pa0, rateId: "it.personal-allowance", kind: "memo" });
    working.push({
      label: `Taper: (${gbp(total)} − ${gbp(taperFrom)}) ÷ ${Number((1 / perPound).toFixed(4))} (allowance nil at ${gbp(paNilAt)})`,
      amount: -r2(reduction),
      rateId: "it.pa-taper-threshold",
      kind: "memo",
    });
  }
  // Allowance against non-savings first, then savings, then dividends.
  let left = pa;
  const paNS = Math.min(left, NS); left -= paNS;
  const paS = Math.min(left, S); left -= paS;
  const paD = Math.min(left, D);
  const paUsed = paNS + paS + paD;
  const tNS = NS - paNS;
  const tS = S - paS;
  const tD = D - paD;
  const taxable = tNS + tS + tD;
  working.push({ label: "Less personal allowance", amount: -r2(paUsed), rateId: "it.personal-allowance" });
  working.push({ label: "Taxable income", amount: r2(taxable), kind: "subtotal" });

  const bands: { key: BandKey; to: number }[] = [
    { key: "basic", to: brb },
    { key: "higher", to: art },
    { key: "additional", to: Infinity },
  ];

  let cursor = 0;
  const totals: Record<IncomeKind, number> = { nonSavings: 0, savings: 0, dividends: 0 };

  /** Lay `amount` into the bands from the cursor; `nilLabel` set = taxed at 0%. */
  const lay = (kind: IncomeKind, amount: number, nil?: { label: string; rateId: string; rate: number }) => {
    let remaining = amount;
    while (remaining > 1e-9) {
      const band = bands.find((b) => cursor < b.to)!;
      const take = Math.min(remaining, band.to - cursor);
      if (nil) {
        working.push({ label: `${KIND_LABEL[kind]}: ${gbp(take)} ${nil.label} × ${pctLabel(nil.rate)}`, amount: r2((take * nil.rate) / 100), rateId: nil.rateId });
        totals[kind] += (take * nil.rate) / 100;
      } else {
        const rateId = RATE_IDS[kind][band.key];
        const p = R.percent(rateId);
        const t = (take * p) / 100;
        totals[kind] += t;
        working.push({ label: `${KIND_LABEL[kind]}: ${gbp(take)} in ${BAND_LABEL[band.key]} × ${pctLabel(p)}`, amount: r2(t), rateId });
      }
      cursor += take;
      remaining -= take;
    }
  };

  lay("nonSavings", tNS);

  // Personal savings allowance depends on the highest band any taxable income reaches.
  const status: BandKey = taxable > art ? "additional" : taxable > brb ? "higher" : "basic";
  const psaId = status === "basic" ? "it.psa-basic" : status === "higher" ? "it.psa-higher" : "it.psa-additional";

  let srsUsed = 0;
  let psaUsed = 0;
  let psa = 0;
  if (tS > 0) {
    const srsBand = R.gbp("it.savings-starting-rate-band");
    const srsRate = R.percent("it.savings-starting-rate");
    const srsAvailable = Math.max(0, srsBand - tNS);
    srsUsed = Math.min(tS, srsAvailable);
    if (srsUsed > 0) lay("savings", srsUsed, { label: "starting rate for savings", rateId: "it.savings-starting-rate", rate: srsRate });
    if (tS - srsUsed > 0) psa = R.gbp(psaId);
    psaUsed = Math.min(tS - srsUsed, psa);
    if (psaUsed > 0) lay("savings", psaUsed, { label: `personal savings allowance (${status} rate taxpayer)`, rateId: psaId, rate: 0 });
    lay("savings", tS - srsUsed - psaUsed);
  }
  if (tD > 0) {
    const dividendAllowance = R.gbp("it.dividend-allowance");
    const daUsed = Math.min(tD, dividendAllowance);
    lay("dividends", daUsed, { label: "dividend allowance", rateId: "it.dividend-allowance", rate: 0 });
    lay("dividends", tD - daUsed);
  }

  const tax = r2(totals.nonSavings + totals.savings + totals.dividends);
  working.push({ label: "Income tax liability", amount: tax, kind: "total" });

  notes.push("England, Wales and Northern Ireland rates. " + SCOTLAND_NOT_SUPPORTED);
  notes.push(
    "Total income is treated as adjusted net income: Gift Aid and relief-at-source pension contributions (which reduce it and extend the basic rate band) are not included. Tax reducers, the High Income Child Benefit Charge and tax already deducted are not shown."
  );
  if (S > 0) notes.push("Savings are taxed at the main income tax rates for this year (the dataset holds no separate savings rates).");

  return {
    taxYear: input.taxYear,
    tax,
    working,
    rateIds: [...R.used],
    notes,
    totalIncome: total,
    personalAllowance: r2(pa),
    taxableIncome: r2(taxable),
    taxableNonSavings: r2(tNS),
    taxableSavings: r2(tS),
    taxableDividends: r2(tD),
    startingRateForSavings: r2(srsUsed),
    personalSavingsAllowance: psa,
    nonSavingsTax: r2(totals.nonSavings),
    savingsTax: r2(totals.savings),
    dividendTax: r2(totals.dividends),
    effectiveRate: total > 0 ? tax / total : null,
  };
}
