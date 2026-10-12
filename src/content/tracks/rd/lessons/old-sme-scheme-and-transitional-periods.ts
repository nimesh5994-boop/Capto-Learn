import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "old-sme-scheme-and-transitional-periods",
  title: "The old SME scheme and periods that straddle the reforms",
  level: "advanced",
  minutes: 35,
  summary:
    "Claims for accounting periods beginning before 1 April 2024 are still being made and enquired into in 2026. This lesson covers the old SME scheme's rates by date of expenditure, the 40% intensity rule, subsidised expenditure and the €7.5m cap, the old RDEC, and how to handle straddling periods and late amendments.",
  objectives: [
    "Identify which old-scheme rates apply to expenditure in a pre-April 2024 accounting period",
    "Compute an old SME scheme payable credit, including the R&D-intensive rate",
    "Recognise when an SME had to claim under the old RDEC instead (subsidies, State aid, work for large companies)",
    "Spot pre-reform periods still open for claim or amendment in late 2026",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `It's tempting to treat the old schemes as history. But a period from **1 January 2024 to 31 December 2024** is under the old rules, and its 2-year claim window runs to **31 December 2026**. HMRC enquiries into 2022 and 2023 claims are also very much live. You need to be able to read and check an old-scheme claim.`,
    },
    {
      kind: "table",
      caption: "Old SME scheme: rates for accounting periods beginning before 1 April 2024",
      head: ["Expenditure incurred", "Additional deduction", "Payable credit on surrendered loss", "Surrenderable loss cap"],
      rows: [
        ["Before 1 April 2023", "130% (230% total)", "14.5%", "Lower of unrelieved loss and 230% of qualifying expenditure"],
        ["On or after 1 April 2023", "86% (186% total)", "10%, or **14.5%** if the company is R&D intensive (relevant R&D expenditure **at least 40%** of total relevant expenditure, including connected persons)", "Lower of unrelieved loss and 186% of qualifying expenditure"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Old RDEC (large companies, and SMEs in some cases)",
      md: `For accounting periods beginning before 1 April 2024, the old RDEC rate was **13%** for expenditure before 1 April 2023 and **20%** from 1 April 2023, with its own payment steps (notional tax at the main rate) and a PAYE/NIC cap.

An **SME** had to use the old RDEC, not the SME scheme, for:
- expenditure on a project that was **subsidised** (e.g. by a grant) or received other **State aid**;
- projects where total SME relief would exceed the **€7.5m** cap per project;
- R&D **subcontracted to it** by a large company.`,
    },
    {
      kind: "md",
      md: `### Other features of the old SME scheme

- **Subcontracted R&D**: an SME could claim 65% of payments to unconnected subcontractors (or the connected-party rule), **wherever** the work was done. There was **no overseas restriction** for periods beginning before 1 April 2024.
- **PAYE cap**: for accounting periods beginning on or after 1 April 2021, the payable credit was capped at £20,000 plus 300% of relevant PAYE and NIC, with an exemption broadly similar to today's.
- **Claim notification and AIF**: the claim notification rule applies to old SME claims for accounting periods beginning on or after 1 April 2023, and the AIF to claims made on or after 8 August 2023.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Straddling the 1 April 2023 rate change",
      md: `For a period such as **1 January 2023 to 31 December 2023** (old scheme), split the qualifying expenditure by the **date incurred**: January–March 2023 spend gets the 130% deduction and 14.5% credit; April–December spend gets 86% and 10% (or 14.5% if R&D intensive). Using a single rate for the whole year is a common error.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Pre-reform periods still open in October 2026",
      md: `List every R&D client whose accounting period **began** between 1 April 2023 and 31 March 2024 and check: was a claim notification made (deadline 6 months after the period of account), was an AIF filed, and is the 2-year claim window still open? A period starting 1 January 2024 must be claimed by 31 December 2026. It may be the last chance to claim under the old SME scheme.`,
    },
  ],
  scenario: {
    title: "A late claim for Harbour Sails Ltd",
    narrative: `Harbour Sails Ltd, an SME, has an accounting period from **1 January 2024 to 31 December 2024**. It submitted a claim notification in May 2025 (in time), but hasn't yet claimed. It's October 2026. Facts for the period:

- Tax-adjusted trading loss before R&D relief: **£60,000**
- Qualifying R&D expenditure (all incurred in 2024): **£120,000**
- Total relevant expenditure: **£400,000**; no connected companies
- No grants or other State aid; PAYE cap not an issue`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Scheme.** The period began on 1 January 2024, before 1 April 2024: **old SME scheme**. All spend is after 1 April 2023, so **86%** additional deduction.
2. **Time limit.** The claim must be made by amending the CT600 within 2 years of the period end: by **31 December 2026**. File the AIF first, then the amended return.
3. **Intensity.** £120,000 ÷ £400,000 = **30%**. For the old scheme the threshold is **40%**, so Harbour isn't R&D intensive: payable credit rate **10%**. (It would have qualified under ERIS's 30% test, but ERIS doesn't apply to this period.)
4. **Computation.**
   - Additional deduction: £120,000 × 86% = £103,200.
   - Enhanced loss: £60,000 + £103,200 = £163,200.
   - Cap: 186% × £120,000 = £223,200. Surrenderable: **£163,200**.
   - Payable credit: £163,200 × 10% = **£16,320**.
5. **Alternative.** Keep the £163,200 loss to carry forward instead, if the company expects profits taxed at 25% soon. Model both.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "old-sme-intensive",
      prompt:
        "An SME's accounting period runs from 1 July 2023 to 30 June 2024 (old scheme). All qualifying expenditure of £250,000 was incurred after 1 April 2023. Its R&D intensity is 45%. Its trading loss before R&D relief is £100,000 and it has no other income. What is the maximum payable credit?",
      answer: 45675,
      unit: "£",
      explain: "Expenditure after 1 April 2023 gets an 86% deduction. At 45% intensity (≥ 40%) the credit rate is 14.5%.",
      working: "Additional deduction £215,000. Enhanced loss £315,000. Cap 186% × £250,000 = £465,000. Surrenderable £315,000. Credit £315,000 × 14.5% = **£45,675**.",
    },
    {
      kind: "numeric",
      id: "straddle-deduction",
      prompt:
        "An SME (old scheme, profitable) has an accounting period of 1 January 2023 to 31 December 2023. Qualifying expenditure was £40,000 in January–March 2023 and £120,000 in April–December 2023. What is the total additional deduction?",
      answer: 155200,
      unit: "£",
      explain: "Apply 130% to expenditure before 1 April 2023 and 86% to expenditure from that date.",
      working: "£40,000 × 130% = £52,000. £120,000 × 86% = £103,200. Total **£155,200**.",
    },
    {
      kind: "classify",
      id: "old-scheme-route",
      prompt: "For an SME's accounting period beginning before 1 April 2024, under which scheme would each project's expenditure be claimed?",
      categories: ["Old SME scheme", "Old RDEC"],
      items: [
        { text: "Internally funded development of a new process", answer: 0 },
        { text: "A project part-funded by an Innovate UK grant (the subsidised part)", answer: 1, why: "Subsidised expenditure goes to RDEC." },
        { text: "R&D done under contract for a large pharmaceutical company", answer: 1, why: "Work subcontracted to an SME by a large company is claimed under RDEC." },
        { text: "Work subcontracted by the SME to an unconnected university lab in Germany", answer: 0, why: "No overseas restriction applied before April 2024 periods." },
      ],
      explain: "SMEs used RDEC for subsidised or State-aided projects and for R&D contracted to them by large companies; everything else was under the SME scheme.",
    },
    {
      kind: "mcq",
      id: "old-claim-deadline",
      prompt: "An SME's accounting period ran from 1 March 2024 to 28 February 2025. Which scheme applies, and by when must the claim be made?",
      options: [
        "Merged RDEC, by 28 February 2027",
        "Old SME scheme, by 28 February 2027",
        "Old SME scheme, by 31 March 2026",
        "ERIS only",
      ],
      answer: 1,
      explain: "The period began before 1 April 2024, so the old regimes apply. Claims are due within 2 years of the period end.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-old-130",
      prompt: "Under the old SME scheme, what was the additional deduction for expenditure incurred before 1 April 2023?",
      options: ["86%", "100%", "130%", "230%"],
      answer: 2,
      explain: "130% additional (230% total) before 1 April 2023; 86% after.",
    },
    {
      kind: "mcq",
      id: "q-old-intensity",
      prompt: "What intensity threshold applied for the 14.5% credit under the old SME scheme (expenditure from 1 April 2023)?",
      options: ["20%", "30%", "40%", "50%"],
      answer: 2,
      explain: "40% for the old scheme; ERIS uses 30% for periods beginning on or after 1 April 2024.",
    },
    {
      kind: "mcq",
      id: "q-old-credit",
      prompt: "What was the standard payable credit rate for an old SME scheme claim on expenditure incurred on or after 1 April 2023, for a company that wasn't R&D intensive?",
      options: ["10%", "13%", "14.5%", "20%"],
      answer: 0,
      explain: "10%, or 14.5% if R&D intensive.",
    },
    {
      kind: "mcq",
      id: "q-old-overseas",
      prompt: "Did the overseas restriction on subcontractor costs apply to old SME scheme claims?",
      options: ["Yes, from 2021", "No, it applies to accounting periods beginning on or after 1 April 2024", "Yes, from 1 April 2023", "Only to EPWs"],
      answer: 1,
      explain: "The overseas restrictions came in with the merged scheme and ERIS.",
    },
    {
      kind: "mcq",
      id: "q-old-rdec-rate",
      prompt: "What was the old RDEC rate for expenditure incurred on or after 1 April 2023?",
      options: ["11%", "13%", "20%", "25%"],
      answer: 2,
      explain: "The old RDEC rose from 13% to 20% for expenditure on or after 1 April 2023.",
    },
  ],
  sources: [
    { label: "R&D tax relief for small and medium-sized enterprises (old SME scheme)", url: "https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-small-and-medium-sized-enterprises" },
    { label: "HMRC CIRD manual: SME scheme claims and time limits (CIRD81800)", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird81800" },
    { label: "HMRC CIRD manual: total aid to project €7.5m or less (CIRD81160)", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird81160" },
    { label: "HMRC CIRD manual: SME payable tax credit and PAYE cap (CIRD90600)", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird90600" },
    { label: "HMRC CIRD manual: pre-notification of claims (CIRD183000)", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird183000" },
  ],
};
