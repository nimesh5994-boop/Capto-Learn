import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "intangible-fixed-assets",
  title: "Intangible fixed assets: goodwill, IP and the CTA 2009 Part 8 regime",
  level: "advanced",
  minutes: 40,
  summary:
    "How companies get relief for patents, software copyright, brands and goodwill: debits following the accounts or the 4% fixed-rate election, the restricted 6.5% relief for goodwill bought with qualifying IP, the related-party and incorporation traps, and the income treatment of sales.",
  objectives: [
    "Identify which assets fall within the intangible fixed assets regime and which are excluded",
    "Calculate deductible debits using the accounts amortisation or the 4% election",
    "Apply the goodwill relief rules for acquisitions from 1 April 2019, including the 6x qualifying IP cap",
    "Calculate the credit or debit on sale and recognise the related-party restrictions",
  ],
  body: [
    {
      kind: "md",
      md: `Since 1 April 2002 a company's **intangible fixed assets** (IFAs) have been taxed under their own regime in **CTA 2009 Part 8**, not as chargeable gains. The key idea: the tax treatment **follows the accounts**, so amortisation and impairment are deductible as they're charged, and profits on sale are taxed as income. It's simpler than capital gains, but goodwill has its own restrictions that catch out many clients buying a business or incorporating.`,
    },
    {
      kind: "table",
      caption: "What's in and out",
      head: ["Asset", "Treatment"],
      rows: [
        ["Patents, registered designs, copyright (including software), trade marks, brands, know-how, licences", "IFA regime"],
        ["Purchased goodwill and customer-related intangibles (customer lists, contracts)", "IFA regime, with restricted relief (below)"],
        ["Computer software treated as part of the cost of hardware, or where the company elects", "Plant and machinery allowances instead"],
        ["Land and buildings, financial assets, shares", "Excluded: chargeable gains or loan relationships"],
        ["IFAs created or acquired from unrelated parties before 1 April 2002", "Chargeable gains (old regime) — check acquisition history"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Debits: two methods",
      md: `1. **Accounts basis (default):** deduct the **amortisation and impairment** charged in the accounts under GAAP.
2. **Fixed-rate election:** elect to deduct **4% a year** of cost, straight line, instead. Useful where the accounts don't amortise (e.g. an indefinite-life brand) or amortise more slowly. The election is **irrevocable** and must be made within **2 years** of the end of the AP in which the asset was created or acquired. It's made asset by asset.

Debits on assets held for the trade are **trading** debits. On assets held for a non-trading purpose (e.g. a licence held as an investment) they're non-trading debits, relieved against total profits, by group relief or carried forward.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Goodwill and 'relevant assets' bought from 1 April 2019",
      md: `For goodwill and customer-related intangibles ("relevant assets"), relief is **not** given by amortisation. Instead:

- Relief is at a **fixed 6.5% a year** of cost, **only if** the goodwill is acquired as part of the acquisition of a **business** that includes **qualifying IP** (patents, registered designs, copyright and design rights, plant breeders' rights) used in the business.
- The cost that qualifies is capped at **6 times** the cost of the qualifying IP acquired.
- With **no qualifying IP**, no annual relief: debits arise only when the goodwill is sold or written off, and they're **non-trading**.

Goodwill acquired between 8 July 2015 and 31 March 2019 got no amortisation relief at all.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Incorporation and related parties",
      md: `When a sole trader or partnership **incorporates** and sells its goodwill to the new company, the goodwill is acquired from a **related individual**. Relief for **internally generated** goodwill bought from a related party is **fully restricted**: no 6.5% relief, and any loss on a later sale is a non-trading debit only. Purchases from related parties must also be at **market value**. Advise clients incorporating a business with valuable goodwill that the company's tax deduction is very limited; the main benefit is usually for the individual (capital gain on the sale, possibly with Business Asset Disposal Relief).`,
    },
    {
      kind: "md",
      md: `### Selling an IFA

On sale, the company brings in a **credit** (or debit) equal to **proceeds less the tax written-down value** (cost less debits already given). The whole amount is income (trading if the asset was a trading asset), even the part above original cost: there's no indexation and no separate capital gain.

**Reinvestment relief** (CTA 2009 s754) lets a company defer the part of the credit that exceeds original cost if it reinvests the proceeds in other IFAs within 1 year before to 3 years after the sale, similar to rollover relief for gains. It's available across a 75% group.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Get the purchase price allocation right",
      md: `On a business purchase, the split between **qualifying IP**, **goodwill**, other intangibles and **plant** drives the tax relief. Agree a realistic, supportable allocation in the sale agreement (with a valuation if the numbers are large). Plant gets capital allowances, qualifying IP follows the accounts or 4%, and goodwill is capped at 6x the qualifying IP.`,
    },
  ],
  scenario: {
    title: "Pennant Software Ltd buys a business",
    narrative: `**Pennant Software Ltd** (Reading) buys the trade and assets of **CodeForge**, an unconnected business, on **1 April 2026** for **£900,000**. The agreed allocation:

| Asset | Price | Accounts treatment |
|---|---:|---|
| Copyright in the software products | £150,000 | Amortised over 5 years |
| Customer contracts | £50,000 | Amortised with goodwill over 10 years |
| Goodwill | £600,000 | Amortised over 10 years |
| Computer equipment | £100,000 | Depreciated over 3 years |

Pennant's year ends **31 March 2027**. The FD asks: *"What can we deduct this year for the intangibles?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**1. Copyright (qualifying IP).** Follows the accounts: £150,000 ÷ 5 = **£30,000** debit. (A 4% election would give only £6,000, so no election.)

**2. Goodwill and customer contracts (relevant assets).** Total **£650,000**. They're acquired with a business that includes qualifying IP (the copyright), so relief is available at 6.5%. Cap: 6 × £150,000 = £900,000, more than £650,000, so the full £650,000 qualifies.
- Relief: £650,000 × 6.5% = **£42,250** a year.
- The accounts amortisation (£650,000 ÷ 10 = £65,000) is **added back** in the computation and replaced with £42,250.

**3. Equipment.** Not an intangible: AIA or full expensing on £100,000 (second-hand equipment gets AIA only).`,
      },
      {
        kind: "table",
        caption: "Intangible debits: year ended 31 March 2027",
        head: ["Asset", "Accounts charge", "Tax debit"],
        rows: [
          ["Copyright", "£30,000", "£30,000"],
          ["Goodwill and customer contracts", "£65,000", "£42,250 (6.5%)"],
          ["**Total**", "£95,000", "**£72,250**"],
        ],
      },
      {
        kind: "md",
        md: `**Adjustment in the CT computation:** add back £65,000 amortisation on goodwill and customer contracts, and deduct £42,250. Keep a schedule of the tax written-down values, because they'll differ from the accounts.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "four-percent",
      prompt:
        "A company buys a brand from an unconnected seller for £200,000. Its accounts amortise the brand over 50 years. It makes the 4% fixed-rate election. What is the annual tax debit?",
      answer: 8000,
      unit: "£",
      explain: "The 4% election gives 4% of cost a year, straight line, instead of the accounts amortisation (here 2%).",
      working: "£200,000 × 4% = **£8,000** (accounts: £4,000)",
    },
    {
      kind: "numeric",
      id: "sale-credit",
      prompt:
        "A company sells a patent for £150,000. It cost £120,000 and £36,000 of debits have been given. Ignoring reinvestment relief, what is the taxable credit?",
      answer: 66000,
      unit: "£",
      explain: "The credit is proceeds less tax written-down value, all treated as income.",
      working: "TWDV: £120,000 − £36,000 = £84,000\n\nCredit: £150,000 − £84,000 = **£66,000**",
    },
    {
      kind: "numeric",
      id: "goodwill-cap",
      prompt:
        "A company buys a business from an unconnected seller in 2026, paying £1,000,000 for goodwill and £100,000 for patents used in the business. What annual goodwill relief is available?",
      answer: 39000,
      unit: "£",
      explain: "Goodwill relief is 6.5% of the lower of the goodwill cost and 6 times the cost of qualifying IP.",
      working: "Cap: 6 × £100,000 = £600,000 (lower than £1,000,000)\n\n£600,000 × 6.5% = **£39,000** a year",
    },
    {
      kind: "mcq",
      id: "incorporation-goodwill",
      prompt:
        "Sam incorporates her hairdressing business and sells its goodwill (built up by her over 10 years) to her new company for its market value of £120,000. What relief does the company get for the goodwill?",
      options: [
        "6.5% a year",
        "Amortisation per the accounts",
        "No annual relief; any loss on a future sale is a non-trading debit",
        "100% in the year of acquisition",
      ],
      answer: 2,
      explain: "Internally generated goodwill acquired from a related individual on incorporation is fully restricted.",
    },
    {
      kind: "classify",
      id: "which-regime",
      prompt: "For a trading company, which regime applies to each asset bought in 2026?",
      categories: ["Intangible fixed assets regime", "Capital allowances", "Chargeable gains"],
      items: [
        { text: "A registered trade mark", answer: 0 },
        { text: "Software bundled with and part of the cost of new servers", answer: 1 },
        { text: "Freehold office building (the land and structure)", answer: 2, why: "Land and buildings are excluded from the IFA regime (SBA may apply to the structure)." },
        { text: "Goodwill on buying a competitor's business", answer: 0 },
        { text: "Shares in a supplier company", answer: 2 },
      ],
      explain: "IFAs include IP and goodwill. Software can fall under capital allowances where it's part of the hardware. Land and shares are outside the regime.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-default",
      prompt: "By default, how are debits on a patent calculated under the IFA regime?",
      options: ["4% straight line", "Following the accounts amortisation and impairment", "At 18% reducing balance", "Only on sale"],
      answer: 1,
      explain: "The regime follows GAAP unless the 4% election is made.",
    },
    {
      kind: "mcq",
      id: "q-election-time",
      prompt: "Within what time must the 4% fixed-rate election be made?",
      options: ["12 months of acquisition", "2 years from the end of the AP of acquisition or creation", "4 years", "Any time"],
      answer: 1,
      explain: "2 years from the end of the AP; it's irrevocable.",
    },
    {
      kind: "mcq",
      id: "q-goodwill-rate",
      prompt: "At what fixed rate is relief given for qualifying goodwill acquired from 1 April 2019?",
      options: ["4%", "6.5%", "10%", "25%"],
      answer: 1,
      explain: "6.5% a year, subject to the qualifying IP conditions and 6x cap.",
    },
    {
      kind: "mcq",
      id: "q-qualifying-ip",
      prompt: "Which of these is qualifying IP for the goodwill relief cap?",
      options: ["A customer list", "Registered designs", "Unregistered trade marks", "Know-how"],
      answer: 1,
      explain: "Qualifying IP is patents, registered designs, copyright and design rights, and plant breeders' rights.",
    },
    {
      kind: "mcq",
      id: "q-sale-profit",
      prompt: "A company sells a trade mark for more than it cost. How is the profit taxed?",
      options: [
        "As a chargeable gain with indexation",
        "As income: proceeds less tax written-down value",
        "Exempt under SSE",
        "Only the excess over cost is taxed",
      ],
      answer: 1,
      explain: "IFA disposals produce credits taxed as income, though reinvestment relief may defer the excess over cost.",
    },
  ],
  sources: [
    { label: "CTA 2009 Part 8: intangible fixed assets", url: "https://www.legislation.gov.uk/ukpga/2009/4/part/8" },
    { label: "CIRD10115: Intangible assets – link with accountancy", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird10115" },
    { label: "CIRD44050: Restrictions for goodwill and relevant assets – introduction", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird44050" },
    { label: "CIRD44086: Partial restriction in relation to qualifying IP assets", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird44086" },
    { label: "Corporation Tax relief on goodwill and relevant assets (GOV.UK)", url: "https://www.gov.uk/guidance/corporation-tax-relief-on-goodwill-and-relevant-assets" },
  ],
};
