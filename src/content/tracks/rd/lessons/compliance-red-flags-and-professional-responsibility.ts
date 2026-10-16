import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "compliance-red-flags-and-professional-responsibility",
  title: "HMRC compliance, boutique red flags, records and your professional duties",
  level: "advanced",
  minutes: 40,
  summary:
    "Why HMRC now checks R&D claims so closely, the errors it finds most often, the warning signs in claims prepared by specialist 'R&D boutiques', what records support a claim, the penalties for inaccurate claims, and what PCRT and HMRC's Standard for Agents require of you when a client's return includes an R&D claim.",
  objectives: [
    "Explain HMRC's compliance concerns and the most common reasons claims fail",
    "Recognise red flags in a claim prepared by a third-party R&D adviser",
    "Specify the records a company should keep to support a claim",
    "Apply PCRT and the Standard for Agents when filing a return that includes an R&D claim, and explain the penalty exposure",
  ],
  body: [
    {
      kind: "md",
      md: `In 2023 HMRC published estimates that **error and fraud** in R&D relief for 2020–21 was **16.7%** of the cost overall, and **24.4%** in the SME scheme. In its sample, a quarter of claims were fully disallowed because **no qualifying R&D took place at all**, and around half of claims contained some non-compliance. Most of it was carelessness rather than fraud, but HMRC responded with claim notification, the AIF, named officers and agents, a dedicated R&D compliance team and many more enquiries.

For your practice, this means R&D claims are **high-risk**. If your firm files the CT600, you're part of the claim, even if a specialist prepared it.`,
    },
    {
      kind: "table",
      caption: "Why claims fail (common errors)",
      head: ["Error", "Example"],
      rows: [
        ["No qualifying R&D", "Building a website or app using existing tools; a construction firm's routine design work; a restaurant's new menu"],
        ["Advance in the company, not in the field", "'It was new to us' — the competent professional test is about the field, not the company"],
        ["Wrong boundaries", "Including commercial, production or post-uncertainty work; claiming the whole project"],
        ["Wrong costs", "Dividends or benefits in kind as staffing costs; rent and overheads; capital items; unpaid invoices"],
        ["Time not evidenced", "Round percentages for all staff, set after the year end"],
        ["Wrong scheme or rate", "Using 230% / 14.5% for a period beginning after 1 April 2024; profitable company claiming ERIS"],
        ["Contractor and overseas rules ignored", "Customer and contractor both claiming; overseas subcontractor costs under the merged scheme"],
        ["Procedural failure", "No claim notification; CT600 filed before the AIF"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Red flags in a boutique-prepared claim",
      md: `Be cautious when a client comes to you with a claim prepared by an R&D specialist and:
- the adviser **cold-called** the client, or claims "almost every business qualifies";
- fees are a **high percentage of the benefit**, contingent, and charged on claims for several past years at once;
- the technical report talks about **business goals** ("improve customer experience", "new to market") rather than a scientific or technological baseline, advance and uncertainty;
- nobody at the adviser **spoke to the people who did the work**;
- **every employee**, including sales and admin, is included at a high percentage;
- the narrative is **generic** and could describe any company in the sector;
- the sector is one where genuine R&D is rare (HMRC highlights education, arts and recreation, and construction as higher-risk);
- the adviser wants the claim filed quickly and asks you to "just put the numbers in the CT600".`,
    },
    {
      kind: "md",
      md: `### Records to support a claim

A good claim is evidenced as the work happens, not reconstructed afterwards:

- **Technical**: project plans, design documents, the state of knowledge at the start (the baseline), test plans and results, failed approaches, version control history, meeting notes, and who decided what.
- **Time**: timesheets or project-management data linking people to R&D activities.
- **Costs**: payroll reports reconciled to RTI, EPW and subcontractor contracts and invoices (with evidence of where work was done and connection status), consumables and software invoices with proof of payment, apportionment workings.
- **Procedural**: the claim notification, the AIF, the technical report and the computation.

Keep records for at least **6 years** from the end of the accounting period (the normal CT record-keeping period), and longer if an enquiry is open.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Penalties for inaccurate claims (FA 2007 Sch 24)",
      md: `An inaccurate return that leads to a loss of tax (including an overpaid credit) can attract a penalty based on the **potential lost revenue**, depending on the behaviour:
- **careless**: up to 30%;
- **deliberate**: up to 70%;
- **deliberate and concealed**: up to 100%.

Penalties are reduced for disclosure, more so if it's unprompted. A company that "relied on an adviser" is only protected if it took reasonable care in choosing and instructing a competent adviser and checking the result. HMRC can also act against **agents** who abuse the relief, including refusing to deal with them, and dishonest agent conduct carries its own penalties.`,
    },
    {
      kind: "md",
      md: `### Your professional duties

**PCRT** (Professional Conduct in Relation to Taxation), issued jointly by ICAEW, ACCA, CIOT, ATT, AAT, ICAS and STEP, is mandatory for members of those bodies; a revised version applies from **1 January 2026**. Its fundamental principles of **integrity, objectivity, professional competence and due care, confidentiality and professional behaviour** apply squarely to R&D:

- You must not be **associated with** returns or statements you believe are false or misleading, or made recklessly.
- **Competence**: if you don't have the technical knowledge to assess a claim, get it from someone who does, or decline.
- **Due care** when relying on a third party: you can rely on a specialist's report, but you should understand it enough to see whether it's plausible, and question obvious problems.
- If you have concerns the client won't address, consider whether you can continue to act, and remember your **anti-money laundering** obligations if you suspect deliberate overclaiming.

HMRC's **Standard for Agents** sets similar expectations of integrity, professional competence and reasonable care for anyone acting as a tax agent.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "A practical firm policy",
      md: `Many practices now require, for any CT600 containing an R&D claim: a signed letter from the client confirming they've reviewed the claim; a copy of the technical report and computation on file; a reviewer's checklist (scheme, dates, notification, AIF, cost categories, overseas, contractor rules); and partner sign-off. If a third party prepared the claim, a written allocation of responsibility in the engagement letter.`,
    },
  ],
  scenario: {
    title: "A boutique claim for Wren & Daughters Builders Ltd",
    narrative: `Wren & Daughters Builders Ltd, a client of your practice, builds extensions and loft conversions. Its year ended 31 March 2026 (merged RDEC). A specialist firm, "R&D Rewards Ltd", cold-called the director and has prepared a claim. It emails you a one-page summary asking you to include it in the CT600:

- Qualifying expenditure **£180,000**: all 9 staff (including the office manager) at 80% of salary, plus dividends of £40,000 to the director.
- Project: "Innovative loft solutions using advanced techniques to improve customer outcomes and set new standards in the local market."
- Credit **£36,000**. R&D Rewards' fee: **25%** of the credit.
- No claim notification has been made; the company has never claimed before. The notification window closed on 30 September 2026. It's 12 October 2026.`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Procedure first.** First-time claimant, no notification, and the window for the period of account ended 31 March 2026 closed on 30 September 2026. **No valid claim can be made** for this period. That alone ends the matter.
2. **Technical substance.** The narrative is commercial ("customer outcomes", "local market"), not a scientific or technological advance with an uncertainty a competent professional couldn't readily resolve. Loft conversions using known techniques are unlikely to be R&D.
3. **Costs.** Dividends are never staffing costs; the office manager at 80% is implausible; blanket 80% for everyone isn't evidenced.
4. **Red flags.** Cold call, contingent 25% fee, generic narrative, construction sector, request to "just include it".
5. **Your response.** Explain to the director, in writing, why the claim can't be made and why it wouldn't have qualified as drafted. Don't include it in the CT600. Record your reasoning and the conversation on file. If the director insists on a claim that you believe is false, PCRT means you can't be associated with it; consider whether you can continue to act and your AML obligations.`,
      },
    ],
  },
  exercises: [
    {
      kind: "multi",
      id: "red-flags",
      prompt: "Which of these are red flags in a third-party R&D claim? Select all that apply.",
      options: [
        "The adviser's fee is 30% of the credit and contingent on payment",
        "The technical report describes the baseline, the advance sought and the specific uncertainties, with test results",
        "All staff, including reception, are claimed at 75% of their time",
        "The narrative says the product was 'new to the company and its customers'",
        "The adviser interviewed the lead engineers and reviewed their test logs",
        "Directors' dividends are included in staffing costs",
      ],
      answers: [0, 2, 3, 5],
      explain:
        "High contingent fees, blanket staff percentages, 'new to us' advances and dividends in staffing costs are all warning signs. A report built from engineers' input with baseline, advance, uncertainty and test results is what a good claim looks like.",
    },
    {
      kind: "numeric",
      id: "penalty-careless",
      prompt:
        "HMRC finds a company overclaimed a merged RDEC by £24,000 through carelessness. Assume the potential lost revenue is £24,000 and HMRC charges the maximum careless penalty with no reduction. What is the penalty?",
      answer: 7200,
      unit: "£",
      explain: "The maximum penalty for a careless inaccuracy is 30% of the potential lost revenue, before any reduction for disclosure.",
      working: "£24,000 × 30% = **£7,200**.",
    },
    {
      kind: "classify",
      id: "classify-errors",
      prompt: "Classify each problem found on review of an R&D claim.",
      categories: ["Activity doesn't qualify", "Cost error", "Procedural error"],
      items: [
        { text: "The claim is for configuring an off-the-shelf CRM system", answer: 0 },
        { text: "Company cars of the engineers are included in staffing costs", answer: 1 },
        { text: "The CT600 was submitted the day before the AIF", answer: 2 },
        { text: "Rent of the development office is claimed as a consumable", answer: 1 },
        { text: "First-time claimant with no claim notification", answer: 2 },
        { text: "The 'advance' is a more attractive user interface", answer: 0, why: "Aesthetics and design choices aren't advances in science or technology." },
      ],
      explain: "Check in three passes: does the activity qualify, are the costs right, and were the procedural steps met?",
    },
    {
      kind: "mcq",
      id: "pcrt-reliance",
      prompt:
        "Your practice files a client's CT600 including an R&D claim prepared by a specialist. Under PCRT, which statement best describes your position?",
      options: [
        "You have no responsibility because the specialist prepared the claim",
        "You can rely on the specialist's work, but you must apply due care, understand it enough to judge plausibility, and not be associated with a return you believe is false or misleading",
        "You must redo the whole claim yourself",
        "You must report every R&D claim to HMRC",
      ],
      answer: 1,
      explain: "PCRT allows reliance on others' work with due care, but never association with returns you believe to be false or recklessly made.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-ef-sme",
      prompt: "What did HMRC estimate as the rate of error and fraud in the SME R&D scheme for 2020–21?",
      options: ["3.6%", "9.8%", "16.7%", "24.4%"],
      answer: 3,
      explain: "24.4% for the SME scheme (16.7% overall).",
    },
    {
      kind: "mcq",
      id: "q-fail-reason",
      prompt: "In HMRC's 2020–21 sample, what was the most common reason for a claim being fully disallowed?",
      options: ["Late filing", "No qualifying R&D activity", "Wrong bank details", "PAYE cap"],
      answer: 1,
      explain: "25% of claims were fully disallowed because no qualifying R&D took place.",
    },
    {
      kind: "mcq",
      id: "q-records",
      prompt: "Which is the strongest evidence of staff time on R&D?",
      options: ["A director's estimate made when the claim is prepared", "Contemporaneous timesheets or project-tracking data linked to R&D tasks", "An industry average percentage", "The adviser's standard assumption"],
      answer: 1,
      explain: "Contemporaneous records linking people to R&D activities are the best evidence.",
    },
    {
      kind: "mcq",
      id: "q-deliberate",
      prompt: "What is the maximum penalty for a deliberate but not concealed inaccuracy under FA 2007 Sch 24?",
      options: ["30%", "50%", "70%", "100%"],
      answer: 2,
      explain: "Careless 30%, deliberate 70%, deliberate and concealed 100% of potential lost revenue.",
    },
    {
      kind: "mcq",
      id: "q-pcrt",
      prompt: "Which bodies jointly issue PCRT?",
      options: [
        "HMRC and HM Treasury",
        "Seven professional bodies including ICAEW, ACCA, CIOT and ATT",
        "The FRC",
        "Companies House",
      ],
      answer: 1,
      explain: "PCRT is issued by AAT, ACCA, ATT, CIOT, ICAEW, ICAS and STEP; a revised version applies from 1 January 2026.",
    },
  ],
  sources: [
    { label: "HMRC's approach to Research and Development tax reliefs", url: "https://www.gov.uk/government/publications/compliance-approach-to-research-and-development-tax-reliefs/hmrcs-approach-to-research-and-development-tax-reliefs" },
    { label: "HMRC: the Standard for Agents", url: "https://www.gov.uk/government/publications/hmrc-the-standard-for-agents" },
    { label: "ICAEW: Professional Conduct in Relation to Taxation (PCRT) FAQs", url: "https://www.icaew.com/technical/tax/working-in-tax/pcrt/pcrt-q-and-a" },
    { label: "Finance Act 2007 Schedule 24 – penalties for errors", url: "https://www.legislation.gov.uk/ukpga/2007/11/schedule/24" },
    { label: "DSIT guidelines on the meaning of R&D for tax purposes", url: "https://www.gov.uk/government/publications/guidelines-on-the-meaning-of-research-and-development-for-tax-purposes/meaning-of-research-and-development-for-tax-purposes-guidelines" },
  ],
};
