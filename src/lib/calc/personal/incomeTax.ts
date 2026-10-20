/**
 * Full income tax computation for an individual (England, Wales, Northern
 * Ireland or Scotland), extending the original `incomeTax` in ../incomeTax.ts.
 *
 * Covers: employment income (net pay pension deductions), trading income
 * (accounts or trading allowance), property income (expenses or property
 * allowance, residential finance cost reduction), other non-savings income,
 * savings and dividends; reliefs; Gift Aid and relief-at-source pension
 * contributions (band extension and adjusted net income); personal allowance
 * taper; marriage allowance (transferor / recipient); blind person's allowance;
 * Scottish rates on non-savings income; High Income Child Benefit Charge; tax
 * deducted at source.
 *
 * Every rate, band and threshold is read from the verified dataset through
 * `rateReader`. Statutory mechanics that aren't rates are commented with their
 * legislation or HMRC manual reference.
 *
 * Pure TypeScript: no React.
 */
import { type CalcResult, type WorkingLine, CalcInputError, gbp, pctLabel, r2, rateReader, requireNonNegative } from "../common";

export type Region = "rUK" | "scotland";
/** "expenses": deduct actual costs; "allowance": use the £1,000 allowance; "best": whichever gives less tax. */
export type AllowanceChoice = "expenses" | "allowance" | "best";
export type MarriageAllowanceRole = "none" | "transferor" | "recipient";

export interface TradingInput {
  /**
   * "profit": `turnover` holds the adjusted taxable trading profit already
   * worked out. "accounts": turnover less allowable expenses and capital
   * allowances, or less the trading allowance.
   */
  mode: "profit" | "accounts";
  turnover: number;
  expenses: number;
  capitalAllowances: number;
  allowance: AllowanceChoice;
  /** Trading losses brought forward (ITA 2007 s83), set against this trade's profits. */
  lossesBroughtForward: number;
}

export interface PropertyInput {
  /** Rent and other property income received (the client's share if jointly owned). */
  rent: number;
  /** Allowable expenses, excluding residential finance costs. */
  expenses: number;
  /** Residential finance costs for the year (mortgage interest etc.): relieved only as a 20% tax reduction. */
  financeCosts: number;
  financeCostsBroughtForward: number;
  lossesBroughtForward: number;
  allowance: AllowanceChoice;
}

export interface PersonalTaxInput {
  taxYear: string;
  region?: Region;
  /** Employment income and taxable benefits (gross, before net pay pension contributions). */
  employment?: number;
  /** Pension contributions deducted from pay under a net pay arrangement. */
  netPayPension?: number;
  trading?: TradingInput;
  property?: PropertyInput;
  /** Other non-savings income: state and private pensions, taxable benefits, other income. */
  otherNonSavings?: number;
  savings?: number;
  dividends?: number;
  /** Reliefs deducted from total income (e.g. trade loss relief against general income, qualifying loan interest). */
  reliefs?: number;
  /** Gift Aid donations actually paid (net). */
  giftAidNet?: number;
  /** Personal pension contributions paid net under relief at source. */
  rasPensionNet?: number;
  blind?: boolean;
  marriage?: MarriageAllowanceRole;
  /** Child Benefit received in the household for the year (enter only for the partner with the higher adjusted net income). */
  childBenefit?: number;
  /** Tax deducted under PAYE. */
  paye?: number;
  /** Other tax deducted at source (e.g. tax taken off interest or a purchased life annuity, CIS deductions). */
  otherTaxDeducted?: number;
}

type N = Required<Omit<PersonalTaxInput, "trading" | "property">> & Pick<PersonalTaxInput, "trading" | "property">;

function normalise(i: PersonalTaxInput): N {
  return {
    taxYear: i.taxYear,
    region: i.region ?? "rUK",
    employment: i.employment ?? 0,
    netPayPension: i.netPayPension ?? 0,
    trading: i.trading,
    property: i.property,
    otherNonSavings: i.otherNonSavings ?? 0,
    savings: i.savings ?? 0,
    dividends: i.dividends ?? 0,
    reliefs: i.reliefs ?? 0,
    giftAidNet: i.giftAidNet ?? 0,
    rasPensionNet: i.rasPensionNet ?? 0,
    blind: i.blind ?? false,
    marriage: i.marriage ?? "none",
    childBenefit: i.childBenefit ?? 0,
    paye: i.paye ?? 0,
    otherTaxDeducted: i.otherTaxDeducted ?? 0,
  };
}

export interface PersonalTaxResult extends CalcResult {
  region: Region;
  /** Trading profit after allowance/expenses and losses brought forward (nil if a loss). */
  tradingProfit: number;
  tradingLoss: number;
  tradingLossCarriedForward: number;
  tradingAllowanceUsed: boolean;
  /** Property profit after losses brought forward, before finance costs. */
  propertyProfit: number;
  propertyLossCarriedForward: number;
  propertyAllowanceUsed: boolean;
  totalIncome: number;
  reliefsUsed: number;
  netIncome: number;
  grossGiftAid: number;
  grossPension: number;
  adjustedNetIncome: number;
  /** Personal allowance after the taper and any marriage allowance transfer out (excludes blind person's allowance). */
  personalAllowance: number;
  blindPersonsAllowance: number;
  /** Allowances actually set against income. */
  allowancesUsed: number;
  basicRateBandExtension: number;
  taxableIncome: number;
  taxableNonSavings: number;
  taxableSavings: number;
  taxableDividends: number;
  startingRateForSavings: number;
  personalSavingsAllowance: number;
  nonSavingsTax: number;
  savingsTax: number;
  dividendTax: number;
  /** Tax on income before reducers. */
  taxOnIncome: number;
  marriageAllowanceApplied: boolean;
  marriageAllowanceReducer: number;
  financeCostReducer: number;
  financeCostsCarriedForward: number;
  /** Income tax after reducers, before the HICBC. */
  liabilityAfterReducers: number;
  hicbcPercent: number;
  hicbc: number;
  /** Total income tax liability (= `tax`). */
  liability: number;
  taxDeducted: number;
  /** Liability less tax deducted at source; negative = repayable. */
  taxPayable: number;
  /** True if any income is charged above the basic rate (UK higher/additional/dividend upper/additional, or Scottish higher and above). */
  chargedAboveBasicRate: boolean;
  /** Relevant UK earnings for pension relief: employment income plus trading profit. */
  relevantEarnings: number;
  effectiveRate: number | null;
  /** Working up to the total liability (no deductions), for wrappers that add NIC. */
  computationLines: WorkingLine[];
  /** PAYE and other tax deducted, and the payable line. */
  deductionLines: WorkingLine[];
}

const KIND_LABEL = { nonSavings: "Non-savings", savings: "Savings", dividends: "Dividends" } as const;
type IncomeKind = keyof typeof KIND_LABEL;

const UK_RATE_IDS: Record<IncomeKind, [string, string, string]> = {
  nonSavings: ["it.basic-rate", "it.higher-rate", "it.additional-rate"],
  // The dataset holds no separate savings rates: for these years savings use the main rates.
  savings: ["it.basic-rate", "it.higher-rate", "it.additional-rate"],
  dividends: ["it.dividend-ordinary-rate", "it.dividend-upper-rate", "it.dividend-additional-rate"],
};

export function validatePersonalTax(input: PersonalTaxInput): string[] {
  const i = normalise(input);
  const e: string[] = [];
  requireNonNegative(e, "Employment income", i.employment);
  requireNonNegative(e, "Net pay pension contributions", i.netPayPension);
  requireNonNegative(e, "Other non-savings income", i.otherNonSavings);
  requireNonNegative(e, "Savings income", i.savings);
  requireNonNegative(e, "Dividends", i.dividends);
  requireNonNegative(e, "Reliefs", i.reliefs);
  requireNonNegative(e, "Gift Aid donations", i.giftAidNet);
  requireNonNegative(e, "Relief-at-source pension contributions", i.rasPensionNet);
  requireNonNegative(e, "Child Benefit received", i.childBenefit);
  requireNonNegative(e, "PAYE deducted", i.paye);
  requireNonNegative(e, "Other tax deducted", i.otherTaxDeducted);
  if (i.employment >= 0 && i.netPayPension > i.employment) e.push("Net pay pension contributions can't be more than the employment income they're deducted from.");
  if (i.trading) {
    const t = i.trading;
    requireNonNegative(e, t.mode === "profit" ? "Trading profit" : "Turnover", t.turnover);
    requireNonNegative(e, "Trading expenses", t.expenses);
    requireNonNegative(e, "Capital allowances", t.capitalAllowances);
    requireNonNegative(e, "Trading losses brought forward", t.lossesBroughtForward);
  }
  if (i.property) {
    const p = i.property;
    requireNonNegative(e, "Rental income", p.rent);
    requireNonNegative(e, "Property expenses", p.expenses);
    requireNonNegative(e, "Finance costs", p.financeCosts);
    requireNonNegative(e, "Finance costs brought forward", p.financeCostsBroughtForward);
    requireNonNegative(e, "Property losses brought forward", p.lossesBroughtForward);
  }
  if (i.region !== "rUK" && i.region !== "scotland") e.push("Choose where the taxpayer lives.");
  return e;
}

type R = ReturnType<typeof rateReader>;

interface TradingOutcome {
  profit: number;
  loss: number;
  lossCarriedForward: number;
  allowanceUsed: boolean;
  lines: WorkingLine[];
  /** Note about the allowance comparison (best mode). */
  note?: string;
}

/** Trading profit for the year: actual expenses or the trading allowance (ITTOIA 2005 Part 6A Ch 1, s783A ff). */
export function tradingOutcome(R: R, t: TradingInput): TradingOutcome {
  const lines: WorkingLine[] = [];
  let profit: number;
  let allowanceUsed = false;
  let note: string | undefined;
  if (t.mode === "profit") {
    profit = t.turnover;
    lines.push({ label: "Trading profit (adjusted, after capital allowances)", amount: profit });
  } else {
    const ta = R.gbp("it.trading-allowance");
    const viaExpenses = t.turnover - t.expenses - t.capitalAllowances;
    // Full relief when receipts are within the allowance; otherwise the allowance is deducted instead of expenses (partial relief).
    const viaAllowance = Math.max(0, t.turnover - ta);
    allowanceUsed = t.allowance === "allowance" || (t.allowance === "best" && viaAllowance < viaExpenses);
    if (t.allowance === "best") {
      note = allowanceUsed
        ? `Trading allowance used: profit ${gbp(viaAllowance)} against ${gbp(viaExpenses)} with actual expenses and capital allowances.`
        : `Actual expenses used: profit ${gbp(viaExpenses)} against ${gbp(viaAllowance)} with the trading allowance.`;
    }
    lines.push({ label: "Trading income (turnover)", amount: t.turnover });
    if (allowanceUsed) {
      if (t.turnover <= ta) {
        lines.push({ label: `Less trading allowance: full relief (income ${gbp(t.turnover)} not over ${gbp(ta)})`, amount: -t.turnover, rateId: "it.trading-allowance" });
      } else {
        lines.push({ label: "Less trading allowance instead of expenses (partial relief)", amount: -ta, rateId: "it.trading-allowance" });
      }
      profit = viaAllowance;
    } else {
      if (t.expenses) lines.push({ label: "Less allowable expenses", amount: -t.expenses });
      if (t.capitalAllowances) lines.push({ label: "Less capital allowances", amount: -t.capitalAllowances });
      profit = viaExpenses;
    }
  }
  let loss = 0;
  if (profit < 0) {
    loss = -profit;
    profit = 0;
    lines.push({ label: `Trading loss for the year ${gbp(loss)}: trading profit taken as nil`, amount: 0, kind: "note" });
  }
  const lossUsed = Math.min(t.lossesBroughtForward, profit);
  if (lossUsed > 0) {
    lines.push({ label: "Less trading losses brought forward (ITA 2007 s83)", amount: -r2(lossUsed) });
    profit -= lossUsed;
  }
  lines.push({ label: "Taxable trading profit", amount: r2(profit), kind: "subtotal" });
  return { profit: r2(profit), loss: r2(loss), lossCarriedForward: r2(t.lossesBroughtForward - lossUsed + loss), allowanceUsed, lines, note };
}

interface PropertyOutcome {
  profit: number;
  lossCarriedForward: number;
  /** Finance costs available for the tax reduction (this year's plus brought forward); nil if the allowance is used. */
  financeCostsForReducer: number;
  allowanceUsed: boolean;
  lines: WorkingLine[];
}

/** Property profit: actual expenses or the property allowance (ITTOIA 2005 s783B ff). Finance costs are never deducted (ITTOIA s272A). */
function propertyOutcome(R: R, p: PropertyInput, useAllowance: boolean): PropertyOutcome {
  const lines: WorkingLine[] = [];
  const pa = useAllowance ? R.gbp("it.property-allowance") : 0;
  let profit: number;
  lines.push({ label: "Property income (rents received)", amount: p.rent });
  if (useAllowance) {
    if (p.rent <= pa) lines.push({ label: `Less property allowance: full relief (income ${gbp(p.rent)} not over ${gbp(pa)})`, amount: -p.rent, rateId: "it.property-allowance" });
    else lines.push({ label: "Less property allowance instead of expenses (partial relief)", amount: -pa, rateId: "it.property-allowance" });
    profit = Math.max(0, p.rent - pa);
  } else {
    if (p.expenses) lines.push({ label: "Less allowable expenses (excluding finance costs)", amount: -p.expenses });
    if (p.financeCosts) lines.push({ label: `Residential finance costs ${gbp(p.financeCosts)}: not deducted, given as a tax reduction below`, amount: 0, kind: "note" });
    profit = p.rent - p.expenses;
  }
  let loss = 0;
  if (profit < 0) {
    loss = -profit;
    profit = 0;
    lines.push({ label: `Property loss for the year ${gbp(loss)}: carried forward against future property profits`, amount: 0, kind: "note" });
  }
  const lossUsed = Math.min(p.lossesBroughtForward, profit);
  if (lossUsed > 0) {
    lines.push({ label: "Less property losses brought forward", amount: -r2(lossUsed) });
    profit -= lossUsed;
  }
  lines.push({ label: "Property profit", amount: r2(profit), kind: "subtotal" });
  return {
    profit: r2(profit),
    lossCarriedForward: r2(p.lossesBroughtForward - lossUsed + loss),
    financeCostsForReducer: useAllowance ? 0 : p.financeCosts + p.financeCostsBroughtForward,
    allowanceUsed: useAllowance,
    lines,
  };
}

/**
 * The full computation. With a property "best" allowance choice, both methods
 * are computed and the one giving less tax is returned.
 */
export function personalIncomeTax(input: PersonalTaxInput): PersonalTaxResult {
  const errors = validatePersonalTax(input);
  if (errors.length) throw new CalcInputError(errors);
  const i = normalise(input);
  if (i.property?.allowance === "best") {
    const viaExpenses = compute(i, false, true);
    const viaAllowance = compute(i, true, true);
    // Less tax wins. On a tie the lower profit wins, unless that would forfeit finance cost relief.
    const tie = viaAllowance.tax === viaExpenses.tax && viaAllowance.propertyProfit < viaExpenses.propertyProfit && (i.property.financeCosts ?? 0) === 0;
    const pick = viaAllowance.tax < viaExpenses.tax || tie ? viaAllowance : viaExpenses;
    const other = pick === viaAllowance ? viaExpenses : viaAllowance;
    pick.notes.unshift(
      `Property allowance compared: ${pick.propertyAllowanceUsed ? "the allowance" : "actual expenses"} gives total income tax of ${gbp(pick.tax)}, against ${gbp(other.tax)} with ${other.propertyAllowanceUsed ? "the allowance" : "actual expenses and the finance cost reduction"}.`
    );
    return pick;
  }
  return compute(i, i.property?.allowance === "allowance", true);
}

function compute(i: N, propertyAllowance: boolean, allowMarriageRetry: boolean): PersonalTaxResult {
  const R = rateReader(i.taxYear);
  const scot = i.region === "scotland";
  const working: WorkingLine[] = [];
  const notes: string[] = [];

  // ── Income ──────────────────────────────────────────────────────────────
  const employmentNet = i.employment - i.netPayPension;
  if (i.employment) working.push({ label: "Employment income", amount: i.employment });
  if (i.netPayPension) working.push({ label: "Less pension contributions under net pay (relief at your top rate)", amount: -i.netPayPension });

  const tr = i.trading ? tradingOutcome(R, i.trading) : undefined;
  if (tr) {
    working.push(...tr.lines);
    if (tr.note) notes.push(tr.note);
  }
  const pr = i.property ? propertyOutcome(R, i.property, propertyAllowance) : undefined;
  if (pr) working.push(...pr.lines);
  if (i.otherNonSavings) working.push({ label: "Other non-savings income (pensions, benefits, other)", amount: i.otherNonSavings });
  const nsGross = employmentNet + (tr?.profit ?? 0) + (pr?.profit ?? 0) + i.otherNonSavings;
  if (i.savings) working.push({ label: "Savings income (interest)", amount: i.savings });
  if (i.dividends) working.push({ label: "Dividend income", amount: i.dividends });
  const totalIncome = nsGross + i.savings + i.dividends;
  working.push({ label: "Total income", amount: r2(totalIncome), kind: "subtotal" });

  // Reliefs are set against non-savings income first, then savings, then dividends (ITA 2007 s25(2)).
  const reliefsUsed = Math.min(i.reliefs, totalIncome);
  let rl = reliefsUsed;
  const reliefNS = Math.min(rl, nsGross); rl -= reliefNS;
  const reliefS = Math.min(rl, i.savings); rl -= reliefS;
  const reliefD = Math.min(rl, i.dividends);
  const NS = nsGross - reliefNS;
  const S = i.savings - reliefS;
  const D = i.dividends - reliefD;
  if (reliefsUsed) {
    working.push({ label: "Less reliefs (e.g. loss relief, qualifying interest)", amount: -r2(reliefsUsed) });
    if (reliefsUsed < i.reliefs) notes.push(`Reliefs of ${gbp(i.reliefs)} exceed total income: only ${gbp(reliefsUsed)} can be used this year.`);
  }
  const netIncome = NS + S + D;
  working.push({ label: "Net income", amount: r2(netIncome), kind: "subtotal" });

  // ── Adjusted net income (ITA 2007 s58) ──────────────────────────────────
  // Gift Aid is grossed up at the UK basic rate (ITA 2007 s414); relief-at-source
  // pension contributions at the "relevant rate", which for a Scottish taxpayer is
  // the Scottish basic rate (FA 2004 s192; PTM044220).
  const gaRate = R.percent("it.basic-rate");
  const rasRateId = scot ? "scot.basic-rate" : "it.basic-rate";
  const rasRate = R.percent(rasRateId);
  const grossGiftAid = r2(i.giftAidNet / (1 - gaRate / 100));
  const grossPension = r2(i.rasPensionNet / (1 - rasRate / 100));
  const extension = grossGiftAid + grossPension;
  const ani = netIncome - extension;
  if (grossGiftAid) working.push({ label: `Gift Aid paid ${gbp(i.giftAidNet)} grossed up at ${pctLabel(gaRate)}`, amount: grossGiftAid, rateId: "it.basic-rate", kind: "memo" });
  if (grossPension) working.push({ label: `Relief-at-source pension ${gbp(i.rasPensionNet)} grossed up at ${pctLabel(rasRate)}`, amount: grossPension, rateId: rasRateId, kind: "memo" });
  if (extension) working.push({ label: "Adjusted net income (net income less gross Gift Aid and pension)", amount: r2(ani), kind: "memo" });

  // ── Allowances ──────────────────────────────────────────────────────────
  const pa0 = R.gbp("it.personal-allowance");
  const taperFrom = R.gbp("it.pa-taper-threshold");
  const paNilAt = R.gbp("it.pa-nil-threshold");
  let pa = pa0;
  if (ani > taperFrom) {
    // ITA 2007 s35(2): reduced by one-half of the excess; the rate is derived from the dataset (allowance nil at paNilAt).
    const perPound = pa0 / (paNilAt - taperFrom);
    const reduction = Math.min(pa0, (ani - taperFrom) * perPound);
    pa = Math.max(0, pa0 - reduction);
    working.push({ label: "Personal allowance before taper", amount: pa0, rateId: "it.personal-allowance", kind: "memo" });
    working.push({
      label: `Taper: (${gbp(ani)} − ${gbp(taperFrom)}) ÷ ${Number((1 / perPound).toFixed(4))} (allowance nil at ${gbp(paNilAt)})`,
      amount: -r2(reduction),
      rateId: "it.pa-taper-threshold",
      kind: "memo",
    });
  }
  const maAmount = i.marriage !== "none" ? R.gbp("it.marriage-allowance") : 0;
  if (i.marriage === "transferor") {
    const out = Math.min(pa, maAmount);
    pa -= out;
    working.push({ label: "Marriage allowance transferred to spouse or civil partner", amount: -out, rateId: "it.marriage-allowance", kind: "memo" });
    if (nsGross + i.savings + i.dividends > pa0) {
      notes.push(`Marriage allowance: the transferor should normally have income below the personal allowance (${gbp(pa0)}); with income of ${gbp(totalIncome)} the transfer may cost more than it saves.`);
    }
  }
  const bpa = i.blind ? R.gbp("it.blind-persons-allowance") : 0;
  if (bpa) working.push({ label: "Blind person's allowance (not tapered)", amount: bpa, rateId: "it.blind-persons-allowance", kind: "memo" });
  const allowances = pa + bpa;

  let left = allowances;
  const aNS = Math.min(left, NS); left -= aNS;
  const aS = Math.min(left, S); left -= aS;
  const aD = Math.min(left, D);
  const allowancesUsed = aNS + aS + aD;
  const tNS = NS - aNS;
  const tS = S - aS;
  const tD = D - aD;
  const taxable = tNS + tS + tD;
  working.push({ label: bpa ? "Less personal and blind person's allowances" : "Less personal allowance", amount: -r2(allowancesUsed), rateId: "it.personal-allowance" });
  working.push({ label: "Taxable income", amount: r2(taxable), kind: "subtotal" });

  // ── Bands ───────────────────────────────────────────────────────────────
  // Gift Aid (ITA 2007 s414(2)) and relief-at-source contributions (FA 2004 s192(4)) increase the
  // basic rate limit and the higher rate limit by the gross amount. For a Scottish taxpayer the
  // Scottish basic rate limit and every Scottish limit above it are increased too (PTM056120).
  const brb = R.gbp("it.basic-rate-band") + extension;
  const art = R.gbp("it.additional-rate-threshold") + extension;
  if (extension) {
    working.push({
      label: `Basic and higher rate limits extended by ${gbp(extension)}${scot ? " (Scottish basic, intermediate, higher and advanced limits too)" : ""}: basic rate band now ${gbp(brb)}`,
      amount: r2(extension),
      rateId: "it.basic-rate-band",
      kind: "memo",
    });
  }

  const totals: Record<IncomeKind, number> = { nonSavings: 0, savings: 0, dividends: 0 };
  let aboveBasic = false;

  interface Band { label: string; to: number; rateId: string; aboveBasic: boolean }
  const ukBands = (kind: IncomeKind): Band[] => [
    { label: "basic rate band", to: brb, rateId: UK_RATE_IDS[kind][0], aboveBasic: false },
    { label: "higher rate band", to: art, rateId: UK_RATE_IDS[kind][1], aboveBasic: true },
    { label: "additional rate", to: Infinity, rateId: UK_RATE_IDS[kind][2], aboveBasic: true },
  ];

  const layThrough = (kind: IncomeKind, bands: Band[], cursor: number, amount: number, nil?: { label: string; rateId: string; rate: number }): number => {
    let remaining = amount;
    while (remaining > 1e-9) {
      const band = bands.find((b) => cursor < b.to - 1e-9)!;
      const take = Math.min(remaining, band.to - cursor);
      if (nil) {
        const t = (take * nil.rate) / 100;
        totals[kind] += t;
        working.push({ label: `${KIND_LABEL[kind]}: ${gbp(take)} ${nil.label} × ${pctLabel(nil.rate)}`, amount: r2(t), rateId: nil.rateId });
      } else {
        const p = R.percent(band.rateId);
        const t = (take * p) / 100;
        totals[kind] += t;
        if (band.aboveBasic && take > 0) aboveBasic = true;
        working.push({ label: `${KIND_LABEL[kind]}: ${gbp(take)} in ${band.label} × ${pctLabel(p)}`, amount: r2(t), rateId: band.rateId });
      }
      cursor += take;
      remaining -= take;
    }
    return cursor;
  };

  // Non-savings income.
  if (scot) {
    // Scottish rates apply to non-savings income only (ITA 2007 s6A, s11A).
    const scotBands: Band[] = [
      { label: "Scottish starter rate band", to: R.gbp("scot.starter-band-upper"), rateId: "scot.starter-rate", aboveBasic: false },
      { label: "Scottish basic rate band", to: R.gbp("scot.basic-band-upper") + extension, rateId: "scot.basic-rate", aboveBasic: false },
      { label: "Scottish intermediate rate band", to: R.gbp("scot.intermediate-band-upper") + extension, rateId: "scot.intermediate-rate", aboveBasic: false },
      { label: "Scottish higher rate band", to: R.gbp("scot.higher-band-upper") + extension, rateId: "scot.higher-rate", aboveBasic: true },
      { label: "Scottish advanced rate band", to: R.gbp("scot.advanced-band-upper") + extension, rateId: "scot.advanced-rate", aboveBasic: true },
      { label: "Scottish top rate", to: Infinity, rateId: "scot.top-rate", aboveBasic: true },
    ];
    layThrough("nonSavings", scotBands, 0, tNS);
  } else {
    layThrough("nonSavings", ukBands("nonSavings"), 0, tNS);
  }
  // Savings and dividends are taxed at UK rates, stacked on top of non-savings income in the UK bands.
  let cursor = tNS;

  // Personal savings allowance depends on the highest UK band any taxable income reaches (ITA 2007 s12B).
  // For Scottish taxpayers this uses the UK bands too, because savings are taxed at UK rates.
  const status = taxable > art ? "additional" : taxable > brb ? "higher" : "basic";
  const psaId = status === "basic" ? "it.psa-basic" : status === "higher" ? "it.psa-higher" : "it.psa-additional";
  let srsUsed = 0;
  let psa = 0;
  if (tS > 0) {
    const srsBand = R.gbp("it.savings-starting-rate-band");
    const srsRate = R.percent("it.savings-starting-rate");
    srsUsed = Math.min(tS, Math.max(0, srsBand - tNS));
    if (srsUsed > 0) cursor = layThrough("savings", ukBands("savings"), cursor, srsUsed, { label: "starting rate for savings", rateId: "it.savings-starting-rate", rate: srsRate });
    if (tS - srsUsed > 0) psa = R.gbp(psaId);
    const psaUsed = Math.min(tS - srsUsed, psa);
    if (psaUsed > 0) cursor = layThrough("savings", ukBands("savings"), cursor, psaUsed, { label: `personal savings allowance (${status} rate taxpayer)`, rateId: psaId, rate: 0 });
    cursor = layThrough("savings", ukBands("savings"), cursor, tS - srsUsed - psaUsed);
  }
  if (tD > 0) {
    const da = R.gbp("it.dividend-allowance");
    const daUsed = Math.min(tD, da);
    cursor = layThrough("dividends", ukBands("dividends"), cursor, daUsed, { label: "dividend allowance", rateId: "it.dividend-allowance", rate: 0 });
    layThrough("dividends", ukBands("dividends"), cursor, tD - daUsed);
  }

  const taxOnIncome = r2(totals.nonSavings + totals.savings + totals.dividends);
  working.push({ label: "Tax on income", amount: taxOnIncome, kind: "subtotal" });

  // ── Marriage allowance eligibility (ITA 2007 s55B/55C) ──────────────────
  if (i.marriage !== "none" && aboveBasic && allowMarriageRetry) {
    const who = i.marriage === "recipient" ? "the recipient" : "the transferor";
    const limit = scot ? "the Scottish intermediate rate" : "the basic rate";
    const retry = compute({ ...i, marriage: "none" }, propertyAllowance, false);
    retry.notes.unshift(`Marriage allowance not given: ${who} has income charged above ${limit}, so isn't eligible. The computation ignores it.`);
    return retry;
  }

  // ── Tax reducers ────────────────────────────────────────────────────────
  let remaining = taxOnIncome;
  const basic = R.percent("it.basic-rate");

  // Residential finance costs (ITTOIA 2005 s272A, s274A/s274AA): basic rate × lowest of finance costs
  // (with amounts brought forward), property profits, and adjusted total income above the allowances.
  let financeCostReducer = 0;
  let financeCostsCarriedForward = 0;
  if (pr && i.property) {
    if (pr.allowanceUsed) {
      financeCostsCarriedForward = i.property.financeCostsBroughtForward;
      if (i.property.financeCosts) notes.push("Finance costs get no tax reduction in a year the property allowance is used (GOV.UK: tax-free allowances on property and trading income).");
    } else if (pr.financeCostsForReducer > 0) {
      // Adjusted total income: income after reliefs, excluding savings and dividends, above the personal allowance.
      const atiAbovePa = Math.max(0, NS - allowances);
      const L = Math.min(pr.financeCostsForReducer, pr.profit, atiAbovePa);
      const reducer = r2((L * basic) / 100);
      financeCostsCarriedForward = r2(pr.financeCostsForReducer - L);
      financeCostReducer = Math.min(reducer, remaining);
      working.push({
        label: `Finance cost reduction: ${pctLabel(basic)} × lowest of costs ${gbp(pr.financeCostsForReducer)}, property profit ${gbp(pr.profit)}, adjusted total income above allowance ${gbp(atiAbovePa)}`,
        amount: -financeCostReducer,
        rateId: "it.basic-rate",
      });
      if (financeCostReducer < reducer) notes.push(`The finance cost reduction is limited to the tax on income: ${gbp(reducer - financeCostReducer)} of it can't be used.`);
      if (financeCostsCarriedForward > 0) working.push({ label: "Finance costs carried forward to next year", amount: financeCostsCarriedForward, kind: "memo" });
      remaining -= financeCostReducer;
    }
  }

  let marriageReducer = 0;
  if (i.marriage === "recipient") {
    // ITA 2007 s55B(2): reduction = basic rate × transferable amount.
    const full = r2((maAmount * basic) / 100);
    marriageReducer = Math.min(full, remaining);
    working.push({ label: `Marriage allowance: ${pctLabel(basic)} × ${gbp(maAmount)} received`, amount: -marriageReducer, rateId: "it.marriage-allowance" });
    remaining -= marriageReducer;
  }
  const liabilityAfterReducers = r2(remaining);
  if ((financeCostReducer || marriageReducer) && i.childBenefit > 0) working.push({ label: "Income tax after reducers", amount: liabilityAfterReducers, kind: "subtotal" });

  // ── High Income Child Benefit Charge (ITEPA 2003 s681C) ─────────────────
  let hicbcPercent = 0;
  let hicbc = 0;
  if (i.childBenefit > 0) {
    const threshold = R.gbp("it.hicbc-threshold");
    const upper = R.gbp("it.hicbc-upper");
    // 1% for every £step of ANI above the threshold; step = (upper − threshold) ÷ 100 (£200 for these years).
    const step = (upper - threshold) / 100;
    if (ani > threshold) {
      // s681C(3): the percentage and the charge are each rounded down to a whole number.
      hicbcPercent = Math.min(100, Math.floor((ani - threshold) / step + 1e-9));
      hicbc = Math.floor((i.childBenefit * hicbcPercent) / 100 + 1e-9);
    }
    working.push({
      label:
        ani > threshold
          ? `High Income Child Benefit Charge: ${hicbcPercent}% (1% per complete ${gbp(step)} of ANI ${gbp(ani)} over ${gbp(threshold)}) × ${gbp(i.childBenefit)}`
          : `High Income Child Benefit Charge: ANI ${gbp(ani)} not over ${gbp(threshold)}`,
      amount: hicbc,
      rateId: "it.hicbc-threshold",
    });
  }

  const liability = r2(liabilityAfterReducers + hicbc);
  working.push({ label: "Income tax liability", amount: liability, kind: "total" });
  const computationLines = [...working];

  // ── Tax already deducted ────────────────────────────────────────────────
  const deductionLines: WorkingLine[] = [];
  if (i.paye) deductionLines.push({ label: "Less tax deducted under PAYE", amount: -i.paye });
  if (i.otherTaxDeducted) deductionLines.push({ label: "Less other tax deducted at source", amount: -i.otherTaxDeducted });
  const taxDeducted = r2(i.paye + i.otherTaxDeducted);
  const taxPayable = r2(liability - taxDeducted);
  if (taxDeducted) deductionLines.push({ label: taxPayable >= 0 ? "Income tax payable" : "Income tax repayable", amount: taxPayable, kind: "total" });
  working.push(...deductionLines);

  // ── Notes ───────────────────────────────────────────────────────────────
  notes.push(
    scot
      ? "Scottish taxpayer: Scottish rates and bands on non-savings income; savings and dividends at UK rates in the UK bands. The personal savings allowance is set by the UK bands."
      : "England, Wales and Northern Ireland rates (Welsh rates currently match England and Northern Ireland)."
  );
  if (S > 0) notes.push("Savings are taxed at the main income tax rates for this year (the dataset holds no separate savings rates).");
  if (grossGiftAid > 0 && grossGiftAid * (gaRate / 100) > liabilityAfterReducers + 0.005) {
    notes.push(
      `Gift Aid: tax treated as deducted from the donations (${gbp((grossGiftAid * gaRate) / 100)}) is more than the income tax charged. HMRC can charge the difference unless enough Capital Gains Tax was also paid (ITA 2007 s424). Not added here.`
    );
  }
  if (i.marriage === "transferor") notes.push("The spouse or civil partner receiving the marriage allowance gets a tax reduction on their own return; it isn't shown here.");
  if (i.childBenefit > 0) notes.push("HICBC: enter Child Benefit only for the partner with the higher adjusted net income. Weeks when the couple weren't partners, and opting out of payments, aren't modelled.");
  notes.push(
    "Not covered: other tax reducers (EIS, SEIS, VCT, maintenance payments, married couple's allowance), the pension annual allowance charge, foreign income and double tax relief, student loan repayments, and Capital Gains Tax."
  );

  const relevantEarnings = r2(i.employment + (tr?.profit ?? 0));
  return {
    taxYear: i.taxYear,
    tax: liability,
    working,
    rateIds: [...R.used],
    notes,
    region: i.region,
    tradingProfit: tr?.profit ?? 0,
    tradingLoss: tr?.loss ?? 0,
    tradingLossCarriedForward: tr?.lossCarriedForward ?? 0,
    tradingAllowanceUsed: tr?.allowanceUsed ?? false,
    propertyProfit: pr?.profit ?? 0,
    propertyLossCarriedForward: pr?.lossCarriedForward ?? 0,
    propertyAllowanceUsed: pr?.allowanceUsed ?? false,
    totalIncome: r2(totalIncome),
    reliefsUsed: r2(reliefsUsed),
    netIncome: r2(netIncome),
    grossGiftAid,
    grossPension,
    adjustedNetIncome: r2(ani),
    personalAllowance: r2(pa),
    blindPersonsAllowance: bpa,
    allowancesUsed: r2(allowancesUsed),
    basicRateBandExtension: r2(extension),
    taxableIncome: r2(taxable),
    taxableNonSavings: r2(tNS),
    taxableSavings: r2(tS),
    taxableDividends: r2(tD),
    startingRateForSavings: r2(srsUsed),
    personalSavingsAllowance: psa,
    nonSavingsTax: r2(totals.nonSavings),
    savingsTax: r2(totals.savings),
    dividendTax: r2(totals.dividends),
    taxOnIncome,
    marriageAllowanceApplied: i.marriage !== "none",
    marriageAllowanceReducer: r2(marriageReducer),
    financeCostReducer: r2(financeCostReducer),
    financeCostsCarriedForward,
    liabilityAfterReducers,
    hicbcPercent,
    hicbc,
    liability,
    taxDeducted,
    taxPayable,
    chargedAboveBasicRate: aboveBasic,
    relevantEarnings,
    effectiveRate: totalIncome > 0 ? liability / totalIncome : null,
    computationLines,
    deductionLines,
  };
}
