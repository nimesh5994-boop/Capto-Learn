/**
 * Stamp Duty Land Tax (England and Northern Ireland) on a purchase:
 * residential (standard, first-time buyers' relief, higher rates for
 * additional dwellings, non-UK resident surcharge, the 17% rate for certain
 * corporate bodies), non-residential and mixed use, and the rent element of a
 * new lease (the user enters the net present value of the rent).
 *
 * Every rate and band is read from src/content/rates (extra/capital.ts),
 * verified against GOV.UK.
 */
import { type CalcResult, type WorkingLine, CalcInputError, gbp, pctLabel, r2, rateReader, requireNonNegative } from "../common";

export interface SdltInput {
  taxYear: string;
  propertyType: "residential" | "non-residential";
  /** Purchase price, or the premium for a new lease. */
  price: number;
  purchaser: "individual" | "company";
  firstTimeBuyer?: boolean;
  /** Individuals: buying means owning more than one dwelling (higher rates). */
  additionalDwelling?: boolean;
  nonResident?: boolean;
  /** Company buying a dwelling over £500,000 where a relief from the 17% rate applies (e.g. property rental business). */
  corporateReliefClaimed?: boolean;
  /** New lease: net present value of the rent over the term. */
  leaseRentNpv?: number;
}

export interface SdltBandLine {
  from: number;
  to: number;
  ratePct: number;
  tax: number;
}

export interface SdltResult extends CalcResult {
  basis: "standard" | "first-time-buyer" | "higher-rates" | "corporate-17" | "non-residential";
  premiumTax: number;
  rentTax: number;
  bands: SdltBandLine[];
  effectiveRate: number | null;
}

interface Band {
  upTo: number; // Infinity for the top band
  ratePct: number;
  rateId: string;
}

function slice(amount: number, bands: Band[], surchargePct: number, surchargeIds: string[], working: WorkingLine[], what: string): { tax: number; lines: SdltBandLine[] } {
  let lower = 0;
  let tax = 0;
  const lines: SdltBandLine[] = [];
  for (const b of bands) {
    if (amount <= lower) break;
    const upper = Math.min(amount, b.upTo);
    const portion = upper - lower;
    const ratePct = b.ratePct + surchargePct;
    const t = (portion * ratePct) / 100;
    tax += t;
    lines.push({ from: lower, to: upper, ratePct, tax: r2(t) });
    const rateText = surchargePct ? `${pctLabel(b.ratePct)} + ${pctLabel(surchargePct)}` : pctLabel(b.ratePct);
    working.push({
      label: `${what}${gbp(portion)} (${gbp(lower)} to ${gbp(upper)}) × ${rateText}`,
      amount: r2(t),
      rateId: b.ratePct === 0 && surchargeIds.length ? surchargeIds[0] : b.rateId,
    });
    lower = b.upTo;
  }
  return { tax, lines };
}

export function validateSdlt(i: SdltInput): string[] {
  const e: string[] = [];
  requireNonNegative(e, "Price", i.price);
  requireNonNegative(e, "Net present value of the rent", i.leaseRentNpv);
  if (i.propertyType === "residential") {
    if (i.firstTimeBuyer && i.purchaser === "company") e.push("First-time buyers' relief is only for individuals.");
    if (i.firstTimeBuyer && i.additionalDwelling) e.push("A first-time buyer can't be buying an additional dwelling: untick one of them.");
  }
  return e;
}

export function stampDutyLandTax(input: SdltInput): SdltResult {
  const errors = validateSdlt(input);
  if (errors.length) throw new CalcInputError(errors);
  const R = rateReader(input.taxYear);
  const working: WorkingLine[] = [];
  const notes: string[] = [];
  const price = input.price;
  let basis: SdltResult["basis"] = "non-residential";
  let premium = { tax: 0, lines: [] as SdltBandLine[] };
  let rentTax = 0;

  working.push({ label: input.leaseRentNpv !== undefined && input.leaseRentNpv > 0 ? "Premium for the lease" : "Purchase price", amount: price });

  if (input.propertyType === "non-residential") {
    const bands: Band[] = [
      { upTo: R.gbp("sdlt.nonres-band1-upper"), ratePct: R.percent("sdlt.nonres-band1-rate"), rateId: "sdlt.nonres-band1-rate" },
      { upTo: R.gbp("sdlt.nonres-band2-upper"), ratePct: R.percent("sdlt.nonres-band2-rate"), rateId: "sdlt.nonres-band2-rate" },
      { upTo: Infinity, ratePct: R.percent("sdlt.nonres-band3-rate"), rateId: "sdlt.nonres-band3-rate" },
    ];
    premium = slice(price, bands, 0, [], working, "");
    if ((input.leaseRentNpv ?? 0) > 0) {
      const npv = input.leaseRentNpv!;
      working.push({ label: "Net present value of the rent", amount: npv, kind: "subtotal" });
      const rb: Band[] = [
        { upTo: R.gbp("sdlt.nonres-lease-npv-band1-upper"), ratePct: R.percent("sdlt.nonres-lease-npv-band1-rate"), rateId: "sdlt.nonres-lease-npv-band1-rate" },
        { upTo: R.gbp("sdlt.nonres-lease-npv-band2-upper"), ratePct: R.percent("sdlt.nonres-lease-npv-band2-rate"), rateId: "sdlt.nonres-lease-npv-band2-rate" },
        { upTo: Infinity, ratePct: R.percent("sdlt.nonres-lease-npv-band3-rate"), rateId: "sdlt.nonres-lease-npv-band3-rate" },
      ];
      rentTax = slice(npv, rb, 0, [], working, "Rent: ").tax;
    }
    notes.push("Non-residential and mixed-use rates (a mix of residential and non-residential property is taxed at the non-residential rates).");
  } else {
    const nonResPct = input.nonResident ? R.percent("sdlt.non-resident-surcharge") : 0;
    const nonResIds = input.nonResident ? ["sdlt.non-resident-surcharge"] : [];
    const isCompany = input.purchaser === "company";
    const corpThreshold = isCompany ? R.gbp("sdlt.corporate-threshold") : Infinity;
    const higherMin = isCompany || input.additionalDwelling ? R.gbp("sdlt.higher-rates-minimum") : Infinity;

    if (isCompany && price > corpThreshold && !input.corporateReliefClaimed) {
      basis = "corporate-17";
      const ratePct = R.percent("sdlt.corporate-rate") + nonResPct;
      const t = (price * ratePct) / 100;
      premium = { tax: t, lines: [{ from: 0, to: price, ratePct, tax: r2(t) }] };
      working.push({
        label: `Whole price ${gbp(price)} × ${pctLabel(R.percent("sdlt.corporate-rate"))}${nonResPct ? ` + ${pctLabel(nonResPct)} non-resident surcharge` : ""} (company buying a dwelling over ${gbp(corpThreshold)})`,
        amount: r2(t),
        rateId: "sdlt.corporate-rate",
      });
    } else {
      const standard: Band[] = [
        { upTo: R.gbp("sdlt.res-band1-upper"), ratePct: R.percent("sdlt.res-band1-rate"), rateId: "sdlt.res-band1-rate" },
        { upTo: R.gbp("sdlt.res-band2-upper"), ratePct: R.percent("sdlt.res-band2-rate"), rateId: "sdlt.res-band2-rate" },
        { upTo: R.gbp("sdlt.res-band3-upper"), ratePct: R.percent("sdlt.res-band3-rate"), rateId: "sdlt.res-band3-rate" },
        { upTo: R.gbp("sdlt.res-band4-upper"), ratePct: R.percent("sdlt.res-band4-rate"), rateId: "sdlt.res-band4-rate" },
        { upTo: Infinity, ratePct: R.percent("sdlt.res-band5-rate"), rateId: "sdlt.res-band5-rate" },
      ];
      let bands = standard;
      let surcharge = nonResPct;
      let ids = nonResIds;
      if (input.firstTimeBuyer) {
        const max = R.gbp("sdlt.ftb-max-price");
        if (price <= max) {
          basis = "first-time-buyer";
          bands = [
            { upTo: R.gbp("sdlt.ftb-band1-upper"), ratePct: R.percent("sdlt.ftb-band1-rate"), rateId: "sdlt.ftb-band1-rate" },
            { upTo: Infinity, ratePct: R.percent("sdlt.ftb-band2-rate"), rateId: "sdlt.ftb-band2-rate" },
          ];
          working.push({ label: "First-time buyers' relief applies", amount: 0, kind: "note", rateId: "sdlt.ftb-max-price" });
        } else {
          basis = "standard";
          working.push({ label: `Price is over ${gbp(max)}, so first-time buyers' relief doesn't apply: standard rates`, amount: 0, kind: "note", rateId: "sdlt.ftb-max-price" });
        }
      } else if (price >= higherMin) {
        basis = "higher-rates";
        surcharge += R.percent("sdlt.higher-rates-surcharge");
        ids = ["sdlt.higher-rates-surcharge", ...nonResIds];
        working.push({
          label: isCompany ? "Company buying a dwelling: higher rates apply" : "Buying an additional dwelling: higher rates apply",
          amount: 0,
          kind: "note",
          rateId: "sdlt.higher-rates-surcharge",
        });
        if (isCompany && price > corpThreshold) working.push({ label: "Relief from the 17% rate claimed, so the higher rates apply instead", amount: 0, kind: "note", rateId: "sdlt.corporate-rate" });
      } else {
        basis = "standard";
        if (isCompany || input.additionalDwelling) working.push({ label: `Under ${gbp(higherMin)}: higher rates don't apply`, amount: 0, kind: "note", rateId: "sdlt.higher-rates-minimum" });
      }
      if (nonResPct) working.push({ label: "Non-UK resident surcharge added to each band", amount: 0, kind: "note", rateId: "sdlt.non-resident-surcharge" });
      premium = slice(price, bands, surcharge, ids, working, "");
    }

    if ((input.leaseRentNpv ?? 0) > 0) {
      const npv = input.leaseRentNpv!;
      const threshold = R.gbp("sdlt.res-lease-npv-threshold");
      const ratePct = R.percent("sdlt.res-lease-npv-rate");
      rentTax = (Math.max(0, npv - threshold) * ratePct) / 100;
      working.push({ label: "Net present value of the rent", amount: npv, kind: "subtotal" });
      working.push({ label: `Rent: (${gbp(npv)} − ${gbp(threshold)}) × ${pctLabel(ratePct)}`, amount: r2(rentTax), rateId: "sdlt.res-lease-npv-rate" });
    }
    notes.push("Residential rates for one dwelling. Purchases of several dwellings, linked transactions, shared ownership, the 3-year window to reclaim the higher rates after selling a previous main home, and the 183-day test for UK residence aren't modelled — tick the boxes that apply.");
    if (input.nonResident) notes.push("The non-UK resident surcharge is applied to the price; whether it also applies to the rent on a new lease isn't modelled.");
    if (isCompany) notes.push("Companies: the 17% rate has reliefs (e.g. property rental business, developers and traders); a company acting as trustee isn't charged the 17% rate. Annual Tax on Enveloped Dwellings isn't covered.");
  }

  const tax = r2(premium.tax + rentTax);
  working.push({ label: "Stamp Duty Land Tax payable", amount: tax, kind: "total" });
  notes.push("England and Northern Ireland only. Scotland (Land and Buildings Transaction Tax) and Wales (Land Transaction Tax) have their own rates and aren't covered.");
  notes.push("Enter the net present value of the rent from HMRC's SDLT calculator; this calculator doesn't discount the rent itself. Variable or uncertain rent, lease variations, the rent rules for leases granted with a premium, and reliefs (e.g. group, charities, right to buy) aren't modelled.");
  notes.push("The return must be filed and the tax paid within 14 days of completion.");

  return {
    taxYear: input.taxYear,
    tax,
    working,
    rateIds: [...R.used],
    notes,
    basis,
    premiumTax: r2(premium.tax),
    rentTax: r2(rentTax),
    bands: premium.lines,
    effectiveRate: price > 0 ? tax / price : null,
  };
}
