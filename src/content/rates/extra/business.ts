import type { RateItem, RateSection, RateSource } from "../types";

/**
 * Extra verified rate sections for the business calculators, merged into the main dataset by tax year.
 * Same rule as the main dataset: every figure checked against a live official page, with its source.
 *
 * All figures below were fetched from the cited GOV.UK / HMRC manual pages on 2026-10-20. Most are
 * not tax-year figures (they are dated rules, historic rate tables or thresholds that span years),
 * so the same sections are attached to both 2026/27 and 2025/26.
 */

const S = {
  ctPub: {
    title: "HMRC — Rates and allowances: Corporation Tax (rates for financial years 2022 to 2026)",
    url: "https://www.gov.uk/government/publications/rates-and-allowances-corporation-tax/rates-and-allowances-corporation-tax",
  },
  ctm03955: {
    title: "HMRC Company Taxation Manual CTM03955 — accounting period straddling a financial year",
    url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm03955",
  },
  instalments: {
    title: "GOV.UK — Pay Corporation Tax if you're a large company (instalments)",
    url: "https://www.gov.uk/guidance/corporation-tax-paying-in-instalments",
  },
  veryLarge: {
    title: "GOV.UK — Pay Corporation Tax if you're a very large company",
    url: "https://www.gov.uk/guidance/pay-corporation-tax-if-youre-a-very-large-company",
  },
  ctm92530: {
    title: "HMRC Company Taxation Manual CTM92530 — quarterly instalments: special cases",
    url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm92530",
  },
  ctm61505: {
    title: "HMRC Company Taxation Manual CTM61505 — loans to participators: rate of s455 tax",
    url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61505",
  },
  ctm61610: {
    title: "HMRC Company Taxation Manual CTM61610 — s458 relief: date relief is due",
    url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61610",
  },
  hybrid: {
    title: "GOV.UK — Calculate your hybrid rate of writing down allowance",
    url: "https://www.gov.uk/guidance/calculate-your-hybrid-rate-of-writing-down-allowance",
  },
  wda: {
    title: "GOV.UK — Work out capital allowances: rates and pools",
    url: "https://www.gov.uk/work-out-capital-allowances/rates-and-pools",
  },
  cars: {
    title: "GOV.UK — Claim capital allowances: business cars",
    url: "https://www.gov.uk/capital-allowances/business-cars",
  },
  fya100: {
    title: "GOV.UK — Claim capital allowances: 100% first-year allowances",
    url: "https://www.gov.uk/capital-allowances/first-year-allowances",
  },
  fya40: {
    title: "GOV.UK — Claim capital allowances: 40% first-year allowance",
    url: "https://www.gov.uk/capital-allowances/40-first-year-allowance",
  },
  frsRates: {
    title: "GOV.UK — VAT Flat Rate Scheme: work out your flat rate",
    url: "https://www.gov.uk/vat-flat-rate-scheme/how-much-you-pay",
  },
  notice733: {
    title: "HMRC — Flat Rate Scheme for small businesses (VAT Notice 733), section 4.4",
    url: "https://www.gov.uk/guidance/flat-rate-scheme-for-small-businesses-vat-notice-733--2",
  },
  frsOverview: {
    title: "GOV.UK — VAT Flat Rate Scheme",
    url: "https://www.gov.uk/vat-flat-rate-scheme",
  },
  vatRegister: {
    title: "GOV.UK — Register for VAT: when to register",
    url: "https://www.gov.uk/vat-registration/when-to-register",
  },
  saPenalties: {
    title: "GOV.UK — Self Assessment tax returns: penalties",
    url: "https://www.gov.uk/self-assessment-tax-returns/penalties",
  },
  ct211: {
    title: "HMRC — Corporation Tax: penalty determinations (CT211 notes)",
    url: "https://www.gov.uk/government/publications/corporation-tax-penalty-determinations-ct211-notes/corporation-tax-penalty-determinations-ct211-notes",
  },
  ctPenaltyIncrease: {
    title: "HMRC — Increases to Corporation Tax late filing penalties (policy paper)",
    url: "https://www.gov.uk/government/publications/corporation-tax-increases-to-late-filing-penalties/increases-to-corporation-tax-late-filing-penalties",
  },
  vatLpp: {
    title: "GOV.UK — How late payment penalties work if you pay VAT late",
    url: "https://www.gov.uk/guidance/how-late-payment-penalties-work-if-you-pay-vat-late",
  },
  ch193140: {
    title: "HMRC Compliance Handbook CH193140 — VAT late payment penalties: rates by period",
    url: "https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch193140",
  },
  vatPoints: {
    title: "GOV.UK — Penalty points and penalties if you submit your VAT Return late",
    url: "https://www.gov.uk/guidance/penalty-points-and-penalties-if-you-submit-your-vat-return-late",
  },
  mtdPenalties: {
    title: "GOV.UK — Penalties for Making Tax Digital for Income Tax",
    url: "https://www.gov.uk/guidance/penalties-for-making-tax-digital-for-income-tax",
  },
  interest: {
    title: "HMRC — Interest rates for late and early payments",
    url: "https://www.gov.uk/government/publications/rates-and-allowances-hmrc-interest-rates-for-late-and-early-payments/rates-and-allowances-hmrc-interest-rates",
  },
} satisfies Record<string, RateSource>;

const gbp = (id: string, label: string, amount: number, source: RateSource, note?: string): RateItem => ({
  id,
  label,
  value: `£${amount.toLocaleString("en-GB", { minimumFractionDigits: Number.isInteger(amount) ? 0 : 2 })}`,
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

/** A date rule. `value` is the ISO date (yyyy-mm-dd) that calculators read. */
const date = (id: string, label: string, iso: string, source: RateSource, note?: string): RateItem => ({
  id,
  label,
  value: iso,
  unit: "text",
  source,
  ...(note ? { note } : {}),
});

/** A plain count (e.g. penalty points, g/km). Held as text with a numeric amount. */
const count = (id: string, label: string, amount: number, display: string, source: RateSource, note?: string): RateItem => ({
  id,
  label,
  value: display,
  amount,
  unit: "text",
  source,
  ...(note ? { note } : {}),
});

const corporationTax: RateSection = {
  id: "business-ct-extra",
  title: "Corporation Tax: earlier financial years, instalments and loans to participators",
  items: [
    // Financial years 2023 and 2024 (rates table on the HMRC CT rates page). FY2025 and FY2026 are the
    // ct.* items in the 2025/26 and 2026/27 datasets.
    pct("ct.fy2023-main-rate", "Main rate — financial year 2023", 25, S.ctPub),
    pct("ct.fy2023-small-profits-rate", "Small profits rate — financial year 2023", 19, S.ctPub),
    gbp("ct.fy2023-lower-limit", "Marginal Relief lower limit — financial year 2023", 50000, S.ctPub),
    gbp("ct.fy2023-upper-limit", "Marginal Relief upper limit — financial year 2023", 250000, S.ctPub),
    { id: "ct.fy2023-marginal-relief-fraction", label: "Marginal Relief standard fraction — financial year 2023", value: "3/200", amount: 0.015, unit: "fraction", source: S.ctPub },
    pct("ct.fy2024-main-rate", "Main rate — financial year 2024", 25, S.ctPub),
    pct("ct.fy2024-small-profits-rate", "Small profits rate — financial year 2024", 19, S.ctPub),
    gbp("ct.fy2024-lower-limit", "Marginal Relief lower limit — financial year 2024", 50000, S.ctPub),
    gbp("ct.fy2024-upper-limit", "Marginal Relief upper limit — financial year 2024", 250000, S.ctPub),
    { id: "ct.fy2024-marginal-relief-fraction", label: "Marginal Relief standard fraction — financial year 2024", value: "3/200", amount: 0.015, unit: "fraction", source: S.ctPub },
    gbp("ct.qip-large-threshold", "Quarterly instalments — large company profits threshold (annual)", 1500000, S.instalments,
      "Augmented profits. Divided by 1 + associated companies and reduced proportionately for a short accounting period."),
    gbp("ct.qip-first-year-limit", "Quarterly instalments — first-year exception profits limit (annual)", 10000000, S.instalments,
      "No instalments if profits don't exceed this and the company wasn't large in the previous 12 months."),
    gbp("ct.qip-very-large-threshold", "Quarterly instalments — very large company profits threshold (annual)", 20000000, S.veryLarge,
      "Accounting periods beginning on or after 1 April 2019. No first-year exception."),
    gbp("ct.qip-de-minimis", "Quarterly instalments — liability de minimis (annual)", 10000, S.ctm92530,
      "A company isn't large if its liability doesn't exceed £10,000 (reduced proportionately for a short period)."),
    pct("ct.s455-rate-2022-to-2026", "Loans to participators (s455) rate — loans made 6 April 2022 to 5 April 2026", 33.75, S.ctm61505),
    pct("ct.s455-rate-2016-to-2022", "Loans to participators (s455) rate — loans made 6 April 2016 to 5 April 2022", 32.5, S.ctm61505),
    pct("ct.s455-rate-before-2016", "Loans to participators (s455) rate — loans made before 6 April 2016", 25, S.ctm61505),
    date("ct.s455-rate-change-date", "s455 rate rises to 35.75% for loans made on or after", "2026-04-06", S.ctm61505),
    date("ct.s455-relief-deferral", "s458 relief deferred where repaid more than 9 months after the AP end", "9 months", S.ctm61610,
      "Relief is then due 9 months and 1 day after the end of the accounting period in which the repayment, release or write-off happens."),
  ],
};

const capitalAllowances: RateSection = {
  id: "business-capital-allowances-extra",
  title: "Capital allowances: dates and car thresholds",
  items: [
    date("ca.main-pool-wda-change-date-ct", "Main pool WDA 18% → 14%: Corporation Tax change date", "2026-04-01", S.hybrid,
      "Accounting periods spanning the date use a hybrid rate (days before at 18%, days from at 14%, rounded up to 2 decimal places)."),
    date("ca.main-pool-wda-change-date-it", "Main pool WDA 18% → 14%: Income Tax change date", "2026-04-06", S.hybrid),
    count("ca.car-co2-main-rate-limit", "Cars bought from April 2021: main rate if CO2 emissions do not exceed", 50, "50g/km", S.cars,
      "Over 50g/km: special rate pool. New and unused zero-emission (electric) cars: 100% first-year allowance."),
    date("ca.zero-emission-car-fya-end", "100% first-year allowance for new zero-emission cars: bought before", "2027-04-01", S.fya100,
      "GOV.UK: 'If you buy it before April 2027'. Second-hand electric cars go in the main pool."),
    date("ca.fya-40-start", "40% first-year allowance: plant and machinery bought on or after", "2026-01-01", S.fya40,
      "New and unused, main rate, not a car. The remaining 60% goes into the main pool for WDAs from the next period."),
  ],
};

/** Flat Rate Scheme sector percentages in force now (GOV.UK table; historic temporary rates omitted). */
const FRS_SECTORS: [string, string, number][] = [
  ["accountancy", "Accountancy or book-keeping", 14.5],
  ["advertising", "Advertising", 11],
  ["agricultural-services", "Agricultural services", 11],
  ["other-activity", "Any other activity not listed elsewhere", 12],
  ["architect", "Architect, civil and structural engineer or surveyor", 14.5],
  ["animals", "Boarding or care of animals", 12],
  ["business-services", "Business services not listed elsewhere", 12],
  ["catering", "Catering services including restaurants and takeaways (from 1 April 2022)", 12.5],
  ["it-consultancy", "Computer and IT consultancy or data processing", 14.5],
  ["computer-repair", "Computer repair services", 10.5],
  ["entertainment", "Entertainment or journalism", 12.5],
  ["estate-agency", "Estate agency or property management services", 12],
  ["farming", "Farming or agriculture not listed elsewhere", 6.5],
  ["film", "Film, radio, television or video production", 13],
  ["financial-services", "Financial services", 13.5],
  ["forestry", "Forestry or fishing", 10.5],
  ["general-building", "General building or construction services", 9.5],
  ["hairdressing", "Hairdressing or other beauty treatment services", 13],
  ["hiring", "Hiring or renting goods", 9.5],
  ["hotel", "Hotel or accommodation (from 1 April 2022)", 10.5],
  ["investigation", "Investigation or security", 12],
  ["labour-only-building", "Labour-only building or construction services", 14.5],
  ["laundry", "Laundry or dry-cleaning services", 12],
  ["legal", "Lawyer or legal services", 14.5],
  ["cultural", "Library, archive, museum or other cultural activity", 9.5],
  ["management-consultancy", "Management consultancy", 14],
  ["metal-products", "Manufacturing fabricated metal products", 10.5],
  ["manufacturing-food", "Manufacturing food", 9],
  ["manufacturing-other", "Manufacturing not listed elsewhere", 9.5],
  ["manufacturing-textiles", "Manufacturing yarn, textiles or clothing", 9],
  ["membership", "Membership organisation", 8],
  ["mining", "Mining or quarrying", 10],
  ["packaging", "Packaging", 9],
  ["photography", "Photography", 11],
  ["post-offices", "Post offices", 5],
  ["printing", "Printing", 8.5],
  ["publishing", "Publishing", 11],
  ["pubs", "Pubs (from 1 April 2022)", 6.5],
  ["real-estate", "Real estate activity not listed elsewhere", 14],
  ["repairing-goods", "Repairing personal or household goods", 10],
  ["repairing-vehicles", "Repairing vehicles", 8.5],
  ["retail-food", "Retailing food, confectionery, tobacco, newspapers or children's clothing", 4],
  ["retail-pharma", "Retailing pharmaceuticals, medical goods, cosmetics or toiletries", 8],
  ["retail-other", "Retailing not listed elsewhere", 7.5],
  ["retail-vehicles", "Retailing vehicles or fuel", 6.5],
  ["secretarial", "Secretarial services", 13],
  ["social-work", "Social work", 11],
  ["sport", "Sport or recreation", 8.5],
  ["transport", "Transport or storage, including couriers, freight, removals and taxis", 10],
  ["travel-agency", "Travel agency", 10.5],
  ["veterinary", "Veterinary medicine", 11],
  ["wholesale-agricultural", "Wholesaling agricultural products", 8],
  ["wholesale-food", "Wholesaling food", 7.5],
  ["wholesale-other", "Wholesaling not listed elsewhere", 8.5],
];

const vat: RateSection = {
  id: "business-vat-extra",
  title: "VAT: Flat Rate Scheme sector rates and tests, registration timing",
  items: [
    pct("vat.frs-lct-goods-percent", "Flat Rate Scheme — limited cost business test: goods below this % of VAT-inclusive turnover", 2, S.notice733),
    gbp("vat.frs-lct-annual-minimum", "Flat Rate Scheme — limited cost business test: goods below this a year (if over 2%)", 1000, S.notice733,
      "For a return of less than a year, the relevant proportion: £250 for a quarterly return."),
    gbp("vat.frs-capital-goods-claim", "Flat Rate Scheme — capital asset purchases (incl. VAT) on which input VAT can be reclaimed: over", 2000, S.frsOverview,
      "VAT on purchases can't be reclaimed under the scheme except for certain capital assets over £2,000."),
    date("vat.registration-notify-rule", "Registration (historic test): notify within 30 days of the end of the month the threshold was exceeded", "30 days", S.vatRegister,
      "Effective date of registration: the first day of the second month after going over the threshold. Forward-look test: register by the end of the 30-day period; effective from the date you realised."),
    ...FRS_SECTORS.map(([slug, label, rateP]) => pct(`vat.frs-sector-${slug}`, `Flat rate — ${label}`, rateP, S.frsRates)),
  ],
};

const penalties: RateSection = {
  id: "business-penalties",
  title: "Penalties for late filing and late payment",
  items: [
    // Self Assessment (traditional regime, returns outside MTD for Income Tax).
    gbp("pay.sa-late-filing-initial", "Self Assessment late filing — initial penalty", 100, S.saPenalties),
    gbp("pay.sa-late-filing-daily", "Self Assessment late filing — daily penalty after 3 months", 10, S.saPenalties, "Up to a maximum of £900 (90 days)."),
    gbp("pay.sa-late-filing-daily-max", "Self Assessment late filing — maximum daily penalties", 900, S.saPenalties),
    pct("pay.sa-late-filing-tax-geared", "Self Assessment late filing — 6 and 12 months: % of tax due (or the minimum, if greater)", 5, S.saPenalties),
    gbp("pay.sa-late-filing-minimum", "Self Assessment late filing — 6 and 12 months: minimum penalty", 300, S.saPenalties),
    pct("pay.sa-late-payment-rate", "Self Assessment late payment — each penalty at 30 days, 6 months and 12 months", 5, S.saPenalties, "Of the tax unpaid at each point."),
    // MTD for Income Tax points-based regime.
    count("pay.mtd-points-threshold", "MTD for Income Tax — penalty point threshold", 4, "4 points", S.mtdPenalties,
      "One point per missed quarterly update (not for 2026/27) or tax return deadline."),
    gbp("pay.mtd-late-submission-penalty", "MTD for Income Tax — penalty at the threshold and each further missed deadline", 200, S.mtdPenalties),
    pct("pay.mtd-lpp-day15-2026", "MTD for Income Tax late payment (2026/27) — % of tax owed at day 15", 3, S.mtdPenalties,
      "No penalty if paid within 15 days (30 days in the first year of the new penalties)."),
    pct("pay.mtd-lpp-day30-2026", "MTD for Income Tax late payment (2026/27) — further % of tax owed at day 30", 3, S.mtdPenalties),
    pct("pay.mtd-lpp-day15-2027", "MTD for Income Tax late payment (2027/28) — % of tax owed at day 15", 4, S.mtdPenalties),
    pct("pay.mtd-lpp-day30-2027", "MTD for Income Tax late payment (2027/28) — further % of tax owed at day 30", 4, S.mtdPenalties),
    pct("pay.mtd-lpp-annual", "MTD for Income Tax late payment — second penalty annual rate from day 31", 10, S.mtdPenalties,
      "Charged daily on the outstanding amount until paid, or for up to 2 years."),
    // Corporation Tax late filing (FA 1998 Sch 18).
    date("pay.ct-late-filing-change-date", "Corporation Tax late filing: doubled flat penalties apply where the filing date is on or after", "2026-04-01", S.ctPenaltyIncrease),
    gbp("pay.ct-late-filing-flat-1", "CT late filing — return late (filing date from 1 April 2026)", 200, S.ct211, "£100 where the filing date was up to 31 March 2026."),
    gbp("pay.ct-late-filing-flat-2", "CT late filing — further penalty if more than 3 months late (filing date from 1 April 2026)", 200, S.ct211,
      "Total £400 (previously £200 total)."),
    gbp("pay.ct-late-filing-flat-1-repeat", "CT late filing — third successive late return (filing date from 1 April 2026)", 1000, S.ct211, "£500 previously."),
    gbp("pay.ct-late-filing-flat-2-repeat", "CT late filing — third successive, further penalty if more than 3 months late (filing date from 1 April 2026)", 1000, S.ct211,
      "Total £2,000 (previously £1,000 total)."),
    gbp("pay.ct-late-filing-flat-1-old", "CT late filing — return late (filing date up to 31 March 2026)", 100, S.ct211),
    gbp("pay.ct-late-filing-flat-2-old", "CT late filing — further penalty if more than 3 months late (filing date up to 31 March 2026)", 100, S.ct211),
    gbp("pay.ct-late-filing-flat-1-repeat-old", "CT late filing — third successive late return (filing date up to 31 March 2026)", 500, S.ct211),
    gbp("pay.ct-late-filing-flat-2-repeat-old", "CT late filing — third successive, further if more than 3 months late (filing date up to 31 March 2026)", 500, S.ct211),
    pct("pay.ct-late-filing-tax-geared-18m", "CT late filing — tax-geared: return delivered 18 months to 2 years after the end of the period", 10, S.ct211,
      "Of the tax unpaid 18 months after the end of the accounting period (or at the filing date if later)."),
    pct("pay.ct-late-filing-tax-geared-24m", "CT late filing — tax-geared: return delivered 2 years or more after the end of the period", 20, S.ct211),
    // VAT (penalty reform from 1 January 2023).
    pct("pay.vat-lpp-day15", "VAT late payment — first penalty: % of VAT outstanding at day 15", 3, S.vatLpp,
      "Tax due on or after 31 May 2025 for periods beginning on or after 1 April 2025. 2% before."),
    pct("pay.vat-lpp-day30", "VAT late payment — first penalty: further % of VAT outstanding at day 30", 3, S.vatLpp, "2% before the change."),
    pct("pay.vat-lpp-annual", "VAT late payment — second penalty annual rate, daily from day 31", 10, S.vatLpp, "4% before the change."),
    pct("pay.vat-lpp-day15-old", "VAT late payment (periods beginning before 1 April 2025) — % at day 15", 2, S.ch193140),
    pct("pay.vat-lpp-day30-old", "VAT late payment (periods beginning before 1 April 2025) — further % at day 30", 2, S.ch193140),
    pct("pay.vat-lpp-annual-old", "VAT late payment (periods beginning before 1 April 2025) — second penalty annual rate", 4, S.ch193140),
    date("pay.vat-lpp-change-period-start", "VAT late payment higher rates: periods beginning on or after", "2025-04-01", S.ch193140,
      "And tax due on or after 31 May 2025."),
    count("pay.vat-points-threshold-annual", "VAT late submission — points threshold (annual returns)", 2, "2 points", S.vatPoints),
    count("pay.vat-points-threshold-quarterly", "VAT late submission — points threshold (quarterly returns)", 4, "4 points", S.vatPoints),
    count("pay.vat-points-threshold-monthly", "VAT late submission — points threshold (monthly returns)", 5, "5 points", S.vatPoints),
    gbp("pay.vat-late-submission-penalty", "VAT late submission — penalty at the threshold and for each further late return", 200, S.vatPoints),
  ],
};

/**
 * HMRC late payment interest — main table (Income Tax, NIC, CGT, SDLT, VAT for periods from 1 January 2023,
 * and the same rates for Corporation Tax pay and file). Id = int.lpi-from-yyyy-mm-dd.
 */
const LPI: [string, number][] = [
  ["2026-01-09", 7.75],
  ["2025-08-27", 8],
  ["2025-05-28", 8.25],
  ["2025-04-06", 8.5],
  ["2025-02-25", 7],
  ["2024-11-26", 7.25],
  ["2024-08-20", 7.5],
  ["2023-08-22", 7.75],
  ["2023-07-11", 7.5],
  ["2023-05-31", 7],
  ["2023-04-13", 6.75],
  ["2023-02-21", 6.5],
  ["2023-01-06", 6],
  ["2022-11-22", 5.5],
  ["2022-10-11", 4.75],
  ["2022-08-23", 4.25],
  ["2022-07-05", 3.75],
  ["2022-05-24", 3.5],
  ["2022-04-05", 3.25],
  ["2022-02-21", 3],
  ["2022-01-07", 2.75],
  ["2020-04-07", 2.6],
];

const longDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const interest: RateSection = {
  id: "business-hmrc-interest",
  title: "HMRC late payment interest (main rate table)",
  items: LPI.map(([from, r]) =>
    pct(`int.lpi-from-${from}`, `Late payment interest from ${longDate(from)}`, r, S.interest,
      from === "2025-04-06" ? "Base rate plus 4% from 6 April 2025 (plus 2.5% before)." : undefined),
  ),
};

const sections = [corporationTax, capitalAllowances, vat, penalties, interest];

export const extra: Record<string, RateSection[]> = {
  "2026/27": sections,
  "2025/26": sections,
};
