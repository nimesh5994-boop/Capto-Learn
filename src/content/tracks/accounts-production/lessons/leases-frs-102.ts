import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "leases-frs-102",
  title: "Leases: bringing them on balance sheet under FRS 102 from 2026",
  level: "advanced",
  minutes: 45,
  summary:
    "The new FRS 102 Section 20 lessee model for periods beginning on or after 1 January 2026: right-of-use assets and lease liabilities, the short-term and low-value exemptions, measuring and unwinding the liability, the effect on profit and key ratios, transition, the unchanged FRS 105 approach, and the tax position.",
  objectives: [
    "Identify leases that must go on balance sheet and those that can use the short-term or low-value exemptions",
    "Measure the initial lease liability and right-of-use asset, and unwind the liability over the lease",
    "Post the year-one entries and explain the effect on profit, EBITDA and gearing",
    "Explain the transition, the FRS 105 position and the tax treatment for lessees",
  ],
  body: [
    {
      kind: "md",
      md: `Under the old FRS 102, a lessee split leases into **finance leases** (on balance sheet) and **operating leases** (rent charged to profit, off balance sheet). For accounting periods **beginning on or after 1 January 2026**, the Periodic Review 2024 removes that distinction **for lessees**: most leases now go **on the balance sheet** as a **right-of-use (ROU) asset** and a **lease liability**, broadly aligned with IFRS 16. **Lessor** accounting is largely unchanged. Small companies using Section 1A apply the same recognition and measurement rules.

**FRS 105** (micro-entities) is **not** changed: micros keep the finance / operating lease distinction.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Exemptions a lessee can elect",
      md: `- **Short-term leases**: a lease term of **12 months or less** (with no purchase option).
- **Low-value assets**: leases where the underlying asset is of low value when new (for example laptops, phones, small office furniture). Section 20 sets no value threshold, but it lists assets that are **not** low value, including **property and motor vehicles**, so the most significant leases still come on balance sheet.

For exempt leases, the payments are expensed (normally straight line) as before.`,
    },
    {
      kind: "md",
      md: `### Measuring the lease

**Lease liability** at commencement = **present value of the lease payments** not yet paid, discounted at the interest rate implicit in the lease or, if that can't be readily determined, either the lessee's **incremental borrowing rate** or its **obtainable borrowing rate** (chosen lease by lease). The obtainable borrowing rate is a simplification for smaller entities: the rate the lessee would pay to borrow, over a similar term, an amount similar to the total undiscounted lease payments, for example from a bank quote.

**ROU asset** at commencement = the lease liability + payments made at or before commencement + initial direct costs + estimated restoration costs − lease incentives received.

After that:
- the **liability** increases by **interest** (effective interest method) and decreases by **payments**;
- the **ROU asset** is **depreciated**, normally straight line over the shorter of the lease term and useful life.`,
    },
    {
      kind: "callout",
      tone: "example",
      title: "Worked example: a 5-year premises lease",
      md: `Annual rent £20,000 paid at the **end** of each year for 5 years; discount rate 5%. PV of the payments = £20,000 × 4.3295 = **£86,590**.

| Year | Opening liability | Interest 5% | Payment | Closing liability |
|---|---:|---:|---:|---:|
| 1 | 86,590 | 4,330 | (20,000) | 70,920 |
| 2 | 70,920 | 3,546 | (20,000) | 54,466 |

Depreciation: £86,590 ÷ 5 = **£17,318** a year.

Year 1 charge to profit: £17,318 + £4,330 = **£21,648**, compared with rent of £20,000 under the old rules. The total expense over the lease is the same (£100,000), but it's **front-loaded** because interest is highest early on.`,
    },
    {
      kind: "journal",
      title: "Year 1: initial recognition, interest, payment and depreciation (combined)",
      narrative: "Recognise the ROU asset and liability (£86,590), add interest (£4,330), pay the rent (£20,000) and depreciate the asset (£17,318).",
      lines: [
        { account: "Right-of-use asset – cost", dr: 86590 },
        { account: "Lease interest (finance cost)", dr: 4330 },
        { account: "Depreciation – right-of-use asset", dr: 17318 },
        { account: "Lease liability", cr: 70920 },
        { account: "Bank", cr: 20000 },
        { account: "Right-of-use asset – accumulated depreciation", cr: 17318 },
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Knock-on effects to raise with clients",
      md: `- **EBITDA** rises (rent disappears; depreciation and interest are below EBITDA), but **operating profit** and **profit before tax** in the early years fall slightly.
- **Gearing** rises and **net current assets** fall (the current portion of the lease liability is a current liability).
- **Loan covenants** based on old GAAP figures may be affected. Ask the bank how it will treat the change.
- **Size thresholds**: bringing ROU assets on balance sheet increases **gross assets**, which could tip a company over the £500,000 micro or £7.5m small balance sheet limit.`,
    },
    {
      kind: "md",
      md: `### Transition

On first applying the amendments, lessees generally don't restate comparatives. Instead, existing operating leases are brought on balance sheet at the **date of initial application** (the start of the first period beginning on or after 1 January 2026): the liability is measured at the present value of the **remaining** payments, discounted at the lessee's incremental or obtainable borrowing rate at that date, and the ROU asset equals that liability adjusted for any prepaid or accrued rent. The FRC's staff factsheets on lessee accounting and initial application set out the transition options and practical expedients; check them before the first year end.

### Tax

HMRC's view is that **commercially nothing has changed** for a lessee: most rentals remain revenue in nature. Deductions generally follow the accounts (depreciation of the ROU asset plus interest) for leases that aren't long funding leases, and **Schedule 14 FA 2019** requires amounts recognised on adoption to be **spread** for tax rather than taken in one period. Check HMRC's Business Leasing Manual (BLM50000 onwards) for the current position.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Start with a lease inventory",
      md: `Before the first year end under the new rules, list every lease: premises, vehicles, equipment, IT, and arrangements that may contain a lease (e.g. a dedicated storage unit within a logistics contract). Record the term, payments, break clauses, renewal options and whether an exemption applies. Most errors come from leases nobody knew about.`,
    },
  ],
  scenario: {
    title: "Applying Section 20 at Fairhaven Veterinary Ltd",
    narrative: `Fairhaven Veterinary Ltd (small, FRS 102 Section 1A, year end 31 December 2026) has these leases at 1 January 2026:

1. **Surgery premises**: 10-year lease with 6 years remaining; annual rent £36,000 paid in arrears.
2. **Two vans** on 3-year contract hire; 2 years remaining; £6,000 a year each, paid annually in arrears.
3. **Staff laptops** leased for £40 a month each.
4. A **storage unit** on a rolling 6-month agreement.

The practice's incremental borrowing rate is 6%. Annuity factors at 6%: 6 years 4.9173; 2 years 1.8334. Gross assets before any lease adjustments are £410,000; turnover £1.8m; 22 employees.`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Premises**: on balance sheet. Liability at 1 January 2026 = £36,000 × 4.9173 = **£177,023**. ROU asset the same (no prepaid or accrued rent).
2. **Vans**: on balance sheet (not low value; term over 12 months). Liability = £12,000 × 1.8334 = **£22,001**.
3. **Laptops**: **low-value exemption**; expense the payments.
4. **Storage unit**: **short-term exemption** (12 months or less); expense.
5. **Year 1 for the premises**: interest 6% × £177,023 = £10,621; closing liability £177,023 + £10,621 − £36,000 = **£151,644**; depreciation £177,023 ÷ 6 = **£29,504**.
6. **Size**: gross assets rise from £410,000 to about £410,000 + £199,000 (less year-one depreciation). Turnover £1.8m and 22 employees already exceed the micro limits, so it was small anyway; check any company near the **£500,000** micro limit carefully.
7. **Bank covenants**: Fairhaven has a loan with a gearing covenant: speak to the bank now.`,
      },
      {
        kind: "table",
        caption: "Premises lease: year to 31 December 2026",
        head: ["", "£"],
        rows: [
          ["Opening lease liability / ROU asset", "177,023"],
          ["Interest at 6%", "10,621"],
          ["Payment", "(36,000)"],
          ["**Closing lease liability**", "**151,644**"],
          ["Depreciation (6 years)", "29,504"],
          ["Total P&L charge (vs £36,000 rent)", "40,125"],
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "closing-liability",
      prompt:
        "A company leases a van for 3 years, paying £6,000 at the end of each year. The discount rate is 6% and the present value of the payments at commencement is £16,038. What is the lease liability at the end of year 1 (to the nearest pound)?",
      answer: 11000,
      unit: "£",
      explain: "Add interest at 6% to the opening liability and deduct the payment.",
      working: "Interest: 6% × £16,038 = £962. Closing: £16,038 + £962 − £6,000 = **£11,000**.",
    },
    {
      kind: "numeric",
      id: "rou-depreciation",
      prompt:
        "A lessee recognises a lease liability of £120,000 for a 4-year equipment lease. It paid £5,000 at commencement and incurred £3,000 of initial direct costs. The equipment's useful life is 6 years. What is the annual straight-line depreciation of the ROU asset?",
      answer: 32000,
      unit: "£",
      explain: "ROU asset = liability + payments at or before commencement + initial direct costs; depreciate over the shorter of lease term and useful life.",
      working: "ROU asset £120,000 + £5,000 + £3,000 = £128,000. ÷ 4 years = **£32,000**.",
    },
    {
      kind: "classify",
      id: "on-or-off",
      prompt: "A small company applying FRS 102 Section 1A (period beginning 1 January 2026) has these leases. On balance sheet, or exempt?",
      categories: ["On balance sheet", "Exempt (expense)"],
      items: [
        { text: "5-year lease of a warehouse", answer: 0 },
        { text: "Mobile phones leased for staff", answer: 1, why: "Low-value assets." },
        { text: "A 9-month lease of a site cabin with no purchase option", answer: 1, why: "Short-term lease (12 months or less)." },
        { text: "4-year lease of a forklift truck", answer: 0 },
        { text: "3-year car lease for a director", answer: 0 },
      ],
      explain: "Most leases go on balance sheet; only short-term (12 months or less) and low-value asset leases can be exempt.",
    },
    {
      kind: "journal",
      id: "initial-recognition",
      prompt: "A lessee recognises a new 5-year office lease with a present value of payments of £86,590 (no payments at commencement, no direct costs). Post the initial recognition.",
      accounts: ["Right-of-use asset – cost", "Lease liability", "Rent expense", "Bank", "Prepayments", "Lease interest (finance cost)"],
      answer: [
        { account: "Right-of-use asset – cost", dr: 86590 },
        { account: "Lease liability", cr: 86590 },
      ],
      explain: "At commencement the ROU asset equals the lease liability (plus any upfront payments and direct costs, here nil).",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-effective-leases",
      prompt: "From when must FRS 102 lessees apply the new on-balance sheet model (without early adoption)?",
      options: ["Periods beginning on or after 1 January 2025", "Periods beginning on or after 1 January 2026", "Periods ending on or after 31 December 2026", "Only for large companies"],
      answer: 1,
      explain: "Accounting periods beginning on or after 1 January 2026.",
    },
    {
      kind: "mcq",
      id: "q-micro-leases",
      prompt: "Does a micro-entity using FRS 105 have to bring operating leases on balance sheet from 2026?",
      options: ["Yes", "No, FRS 105 lease accounting is unchanged", "Only property leases", "Only if it chooses Section 1A"],
      answer: 1,
      explain: "FRS 105 keeps the finance / operating lease distinction.",
    },
    {
      kind: "mcq",
      id: "q-ebitda",
      prompt: "What usually happens to EBITDA when operating leases come on balance sheet?",
      options: ["It falls", "It rises, because rent is replaced by depreciation and interest", "No change", "It becomes negative"],
      answer: 1,
      explain: "Depreciation and interest are excluded from EBITDA, so EBITDA increases.",
    },
    {
      kind: "mcq",
      id: "q-lessor",
      prompt: "How is lessor accounting affected by the 2026 FRS 102 changes?",
      options: ["Lessors must also recognise ROU assets", "Largely unchanged: lessors still classify leases as finance or operating", "Lessors can no longer recognise rental income", "Lessors must use FRS 105"],
      answer: 1,
      explain: "The changes are mainly for lessees.",
    },
    {
      kind: "mcq",
      id: "q-tax-leases",
      prompt: "What does Schedule 14 FA 2019 do in relation to lessees adopting the new lease accounting?",
      options: [
        "Disallows all lease deductions",
        "Requires amounts recognised on adoption to be spread for tax",
        "Gives a 100% allowance for ROU assets",
        "Taxes the lease liability",
      ],
      answer: 1,
      explain: "It ensures the accounting change doesn't change the overall tax treatment, by spreading transitional amounts.",
    },
  ],
  sources: [
    { label: "FRC: FRS 102 (September 2024 edition, Section 20 Leases)", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-102/" },
    { label: "FRC: FRS factsheets (lessee accounting; initial application)", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-factsheets/" },
    { label: "HMRC Business Leasing manual: lease accounting under IFRS 16 and FRS 102 (2024 amendments) (BLM17005)", url: "https://www.gov.uk/hmrc-internal-manuals/business-leasing-manual/blm17005" },
    { label: "HMRC Business Leasing manual: taxation of right-of-use asset lessees (BLM50005)", url: "https://www.gov.uk/hmrc-internal-manuals/business-leasing-manual/blm50005" },
    { label: "ICAEW: Periodic Review 2024 – what's new for preparers", url: "https://www.icaew.com/technical/corporate-reporting/corporate-reporting-resources/by-all-accounts/articles/2024/periodic-review-2024-whats-new-for-preparers" },
  ],
};
