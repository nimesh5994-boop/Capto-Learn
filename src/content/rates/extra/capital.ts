import type { RateItem, RateSection, RateSource } from "../types";

/**
 * Extra verified rate sections for the capital calculators, merged into the main dataset by tax year.
 * Same rule as the main dataset: every figure checked against a live official page, with its source.
 *
 * Checked on 20 October 2026 against the pages cited. SDLT figures are the rates in force from
 * 1 April 2025 (GOV.UK worked examples are dated April 2025 and later), so they cover the whole of
 * both 2025/26 (from 6 April 2025) and 2026/27.
 */

const S = {
  hs283: {
    title: "HMRC — HS283 Private Residence Relief (2026)",
    url: "https://www.gov.uk/government/publications/private-residence-relief-hs283-self-assessment-helpsheet/hs283-private-residence-relief-2026",
  },
  ihtGifts: {
    title: "GOV.UK — Inheritance Tax: gifts",
    url: "https://www.gov.uk/inheritance-tax/gifts",
  },
  ihtm14612: {
    title: "HMRC Inheritance Tax Manual IHTM14612 — taper relief: quantifying the relief",
    url: "https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm14612",
  },
  ihtm22052: {
    title: "HMRC Inheritance Tax Manual IHTM22052 — quick succession relief: appropriate percentage",
    url: "https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm22052",
  },
  ihtTrusts: {
    title: "GOV.UK — Trusts and Inheritance Tax",
    url: "https://www.gov.uk/guidance/trusts-and-inheritance-tax",
  },
  ihtPensions: {
    title: "HMRC — Inheritance Tax on unused pension funds and death benefits (policy paper)",
    url: "https://www.gov.uk/government/publications/inheritance-tax-unused-pension-funds-and-death-benefits/inheritance-tax-unused-pension-funds-and-death-benefits",
  },
  sdltRes: {
    title: "GOV.UK — Stamp Duty Land Tax: residential property rates",
    url: "https://www.gov.uk/stamp-duty-land-tax/residential-property-rates",
  },
  sdltNonRes: {
    title: "GOV.UK — Stamp Duty Land Tax: non-residential and mixed rates",
    url: "https://www.gov.uk/stamp-duty-land-tax/nonresidential-and-mixed-rates",
  },
  sdltAdditional: {
    title: "GOV.UK — Stamp Duty Land Tax: buying an additional residential property",
    url: "https://www.gov.uk/guidance/stamp-duty-land-tax-buying-an-additional-residential-property",
  },
  sdltNonResident: {
    title: "GOV.UK — Rates of Stamp Duty Land Tax for non-UK residents",
    url: "https://www.gov.uk/guidance/rates-of-stamp-duty-land-tax-for-non-uk-residents",
  },
  sdltCorporate: {
    title: "GOV.UK — Stamp Duty Land Tax: corporate bodies",
    url: "https://www.gov.uk/guidance/stamp-duty-land-tax-corporate-bodies",
  },
} satisfies Record<string, RateSource>;

const gbp = (id: string, label: string, amount: number, source: RateSource, note?: string): RateItem => ({
  id,
  label,
  value: `£${amount.toLocaleString("en-GB")}`,
  amount,
  unit: "GBP",
  source,
  ...(note ? { note } : {}),
});

const pct = (id: string, label: string, amount: number, source: RateSource, note?: string): RateItem => ({
  id,
  label,
  value: `${amount}%`,
  amount,
  unit: "percent",
  source,
  ...(note ? { note } : {}),
});

const text = (id: string, label: string, value: string, source: RateSource, note?: string): RateItem => ({
  id,
  label,
  value,
  unit: "text",
  source,
  ...(note ? { note } : {}),
});

/** Figures that are the same in 2025/26 and 2026/27 (each checked on the date above). */
function sections(): RateSection[] {
  return [
    {
      id: "cgt-extra",
      title: "Capital Gains Tax — private residence and lettings relief",
      items: [
        gbp("cgt.lettings-relief-max", "Lettings relief — maximum", 40000, S.hs283,
          "Lowest of the PRR given, £40,000 and the gain from the letting. Only where the owner shared the home with the tenant (from 6 April 2020)."),
      ],
    },
    {
      id: "iht-extra",
      title: "Inheritance Tax — lifetime gifts and reliefs",
      items: [
        pct("iht.lifetime-rate", "Lifetime rate on chargeable lifetime transfers (e.g. into a trust)", 20, S.ihtTrusts,
          "On the excess over the nil rate band. Grossed up if the donor pays the tax."),
        gbp("iht.marriage-gift-child", "Wedding or civil partnership gift — to a child", 5000, S.ihtGifts),
        gbp("iht.marriage-gift-grandchild", "Wedding or civil partnership gift — to a grandchild or great-grandchild", 2500, S.ihtGifts),
        gbp("iht.marriage-gift-other", "Wedding or civil partnership gift — to anyone else", 1000, S.ihtGifts),
        pct("iht.taper-3-4-years", "Taper relief — gift 3 to 4 years before death (tax payable as % of full)", 80, S.ihtm14612,
          "More than 3 but not more than 4 years. GOV.UK shows this as an effective rate of 32%."),
        pct("iht.taper-4-5-years", "Taper relief — gift 4 to 5 years before death (tax payable as % of full)", 60, S.ihtm14612, "Effective rate 24%."),
        pct("iht.taper-5-6-years", "Taper relief — gift 5 to 6 years before death (tax payable as % of full)", 40, S.ihtm14612, "Effective rate 16%."),
        pct("iht.taper-6-7-years", "Taper relief — gift 6 to 7 years before death (tax payable as % of full)", 20, S.ihtm14612, "Effective rate 8%."),
        pct("iht.qsr-1-year", "Quick succession relief — earlier transfer 1 year or less before death", 100, S.ihtm22052),
        pct("iht.qsr-2-years", "Quick succession relief — more than 1, not more than 2 years", 80, S.ihtm22052),
        pct("iht.qsr-3-years", "Quick succession relief — more than 2, not more than 3 years", 60, S.ihtm22052),
        pct("iht.qsr-4-years", "Quick succession relief — more than 3, not more than 4 years", 40, S.ihtm22052),
        pct("iht.qsr-5-years", "Quick succession relief — more than 4, not more than 5 years", 20, S.ihtm22052),
        text("iht.pensions-in-estate", "Unused pension funds and death benefits",
          "In the estate for deaths on or after 6 April 2027", S.ihtPensions,
          "Personal representatives report and pay. Death-in-service benefits from registered schemes stay outside IHT."),
      ],
    },
    {
      id: "sdlt",
      title: "Stamp Duty Land Tax (England and Northern Ireland)",
      items: [
        pct("sdlt.res-band1-rate", "Residential — rate up to £125,000", 0, S.sdltRes),
        gbp("sdlt.res-band1-upper", "Residential — 0% band upper limit", 125000, S.sdltRes),
        pct("sdlt.res-band2-rate", "Residential — rate £125,001 to £250,000", 2, S.sdltRes),
        gbp("sdlt.res-band2-upper", "Residential — 2% band upper limit", 250000, S.sdltRes),
        pct("sdlt.res-band3-rate", "Residential — rate £250,001 to £925,000", 5, S.sdltRes),
        gbp("sdlt.res-band3-upper", "Residential — 5% band upper limit", 925000, S.sdltRes),
        pct("sdlt.res-band4-rate", "Residential — rate £925,001 to £1.5 million", 10, S.sdltRes),
        gbp("sdlt.res-band4-upper", "Residential — 10% band upper limit", 1500000, S.sdltRes),
        pct("sdlt.res-band5-rate", "Residential — rate above £1.5 million", 12, S.sdltRes),
        pct("sdlt.ftb-band1-rate", "First-time buyers — rate up to £300,000", 0, S.sdltRes),
        gbp("sdlt.ftb-band1-upper", "First-time buyers — 0% band upper limit", 300000, S.sdltRes),
        pct("sdlt.ftb-band2-rate", "First-time buyers — rate £300,001 to £500,000", 5, S.sdltRes),
        gbp("sdlt.ftb-max-price", "First-time buyers' relief — maximum price", 500000, S.sdltRes,
          "No relief at all above this price: standard rates apply."),
        pct("sdlt.higher-rates-surcharge", "Higher rates for additional dwellings — surcharge", 5, S.sdltAdditional,
          "On top of the standard residential rates, usually where buying means owning more than one dwelling. Companies pay it on any dwelling of £40,000 or more."),
        gbp("sdlt.higher-rates-minimum", "Higher rates — minimum price", 40000, S.sdltAdditional,
          "Higher rates don't apply to a dwelling bought for less than £40,000."),
        pct("sdlt.non-resident-surcharge", "Non-UK resident surcharge (residential)", 2, S.sdltNonResident,
          "From 1 April 2021, on top of all other residential rates (including first-time buyer and higher rates)."),
        pct("sdlt.corporate-rate", "Higher threshold rate — certain corporate bodies", 17, S.sdltCorporate,
          "Residential property costing more than £500,000 bought by a company or other non-natural person, unless a relief applies."),
        gbp("sdlt.corporate-threshold", "17% rate — price threshold", 500000, S.sdltCorporate),
        gbp("sdlt.res-lease-npv-threshold", "Residential new lease — rent NPV threshold", 125000, S.sdltRes),
        pct("sdlt.res-lease-npv-rate", "Residential new lease — rate on rent NPV above the threshold", 1, S.sdltRes),
        pct("sdlt.nonres-band1-rate", "Non-residential/mixed — rate up to £150,000", 0, S.sdltNonRes),
        gbp("sdlt.nonres-band1-upper", "Non-residential/mixed — 0% band upper limit", 150000, S.sdltNonRes),
        pct("sdlt.nonres-band2-rate", "Non-residential/mixed — rate £150,001 to £250,000", 2, S.sdltNonRes),
        gbp("sdlt.nonres-band2-upper", "Non-residential/mixed — 2% band upper limit", 250000, S.sdltNonRes),
        pct("sdlt.nonres-band3-rate", "Non-residential/mixed — rate above £250,000", 5, S.sdltNonRes),
        pct("sdlt.nonres-lease-npv-band1-rate", "Non-residential new lease — rate on rent NPV up to £150,000", 0, S.sdltNonRes),
        gbp("sdlt.nonres-lease-npv-band1-upper", "Non-residential new lease — 0% NPV band upper limit", 150000, S.sdltNonRes),
        pct("sdlt.nonres-lease-npv-band2-rate", "Non-residential new lease — rate on NPV £150,001 to £5 million", 1, S.sdltNonRes),
        gbp("sdlt.nonres-lease-npv-band2-upper", "Non-residential new lease — 1% NPV band upper limit", 5000000, S.sdltNonRes),
        pct("sdlt.nonres-lease-npv-band3-rate", "Non-residential new lease — rate on NPV above £5 million", 2, S.sdltNonRes),
      ],
    },
  ];
}

export const extra: Record<string, RateSection[]> = {
  "2026/27": sections(),
  "2025/26": sections(),
};
