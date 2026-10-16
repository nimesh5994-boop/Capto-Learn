import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "going-concern-final-review-and-sign-off",
  title: "Going concern, final review and sign-off",
  level: "advanced",
  minutes: 40,
  summary:
    "The last stage of a year-end job: assessing going concern (and what to disclose), final analytical review, the disclosure and completion checklist, the management representation letter, the accountants' report on unaudited accounts, and the review points that come up again and again.",
  objectives: [
    "Assess going concern for at least 12 months from approval and decide on disclosure",
    "Carry out a final analytical review and investigate unexpected movements",
    "Prepare a management representation letter and explain why it matters",
    "Clear the common review points before partner sign-off",
  ],
  body: [
    {
      kind: "callout",
      tone: "rule",
      title: "Going concern (FRS 102 Section 3)",
      md: `Accounts are prepared on a going concern basis unless management intends to liquidate the company or cease trading, or has no realistic alternative but to do so. In assessing it, the directors look at least **12 months from the date the accounts are approved** (not from the year end).

- For periods beginning on or after **1 January 2026**, accounts prepared on a going concern basis must **say so**, confirm that management has considered information about at least the next 12 months, and disclose any significant judgements made in the assessment (FRS 102 para 3.8A). Small companies using Section 1A must give this disclosure too (para 1AC.2C).
- If there are **material uncertainties** that may cast significant doubt on the company's ability to continue, they must be **disclosed**.
- If the company **isn't** a going concern, the going concern basis must not be used, and the basis actually used must be disclosed.

Small companies need to think about this just as much as large ones: owner-managed companies often depend on a single customer, a director's support or an overdraft.`,
    },
    {
      kind: "table",
      caption: "Going concern warning signs",
      head: ["Financial", "Operational and other"],
      rows: [
        ["Net liabilities or net current liabilities", "Loss of a major customer or supplier"],
        ["Recurring losses or negative operating cash flow", "Loss of key staff or the director's ill health"],
        ["Overdue HMRC liabilities, Time to Pay arrangements", "Legal claims the company can't afford to lose"],
        ["Loans due for renewal, covenant breaches", "Licence or regulatory problems"],
        ["Reliance on director's loans that could be withdrawn", "Major after-date events (fire, flood)"],
      ],
    },
    {
      kind: "md",
      md: `### Evidence for going concern

For a small company with warning signs, ask for: **cash flow forecasts** for at least 12 months from approval, **post year-end management accounts** and bank statements, **evidence of financing** (facility letters, renewal dates), and, where the company relies on its director, a **letter of support** from the director (with evidence they can actually provide the funds). Record your assessment and conclusion in the file.

### Final analytical review

Before the draft goes to the reviewer, compare the profit and loss account and balance sheet with last year (and with expectations):
- gross margin, overheads by category, wages vs headcount;
- debtor and creditor days, stock days;
- any new or missing balances.

Every material movement needs a **reason** in the file, backed by evidence, not "per client".`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Management representation letter",
      md: `Before signing, the directors confirm in writing matters that the accountant relies on but can't independently verify. A typical letter covers:
- the directors' responsibility for the accounts and for providing complete records;
- all transactions recorded; no undisclosed liabilities, claims or guarantees;
- related party transactions and directors' loans fully disclosed;
- events after the year end disclosed;
- going concern: the directors' assessment and their plans;
- specific matters relevant to the client (e.g. stock valuation, recoverability of a large debt).

It **doesn't replace** evidence you could reasonably obtain, but it makes clear where responsibility lies.`,
    },
    {
      kind: "md",
      md: `### The accountants' report

For unaudited accounts, practices typically attach an **accountants' report** on the preparation of the accounts, following their professional body's guidance (ICAEW and ACCA publish model wording). It makes clear the accounts were prepared from the records and information provided, that **no audit** was carried out, and that the directors are responsible for them. Never let a client describe unaudited accounts as audited.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Review points that come up again and again",
      md: `- **Bank, VAT, PAYE and DLA not reconciled** to third-party evidence.
- **Corporation tax** liability doesn't agree to the draft computation; prior year CT not cleared.
- **Dividends** not checked against distributable reserves; no minutes.
- **Directors' loan** overdrawn during the year but no s413 note; s455 missed.
- **Accruals and prepayments** missing for recurring costs (e.g. accountancy fee, utilities).
- **Fixed asset register** not agreed to the trial balance; disposals missing.
- **Comparatives** don't agree to last year's signed accounts.
- **Framework and size** not reassessed (e.g. a company now over the micro limits).
- **Leases** not reassessed under the new FRS 102 Section 20 for periods from 1 January 2026.
- Casting errors and inconsistent figures between the notes and the primary statements.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Clear points properly",
      md: `Answer every review point in writing, with the evidence or the journal reference that resolves it. Don't delete points you can't answer: escalate them. A file where review points have simply disappeared is a file the reviewer can't trust.`,
    },
  ],
  scenario: {
    title: "Final review for Lowther Print & Design Ltd",
    narrative: `Lowther Print & Design Ltd (year end 30 June 2026; accounts to be approved on 31 October 2026) shows:

- turnover £560,000 (prior year £500,000); cost of sales £320,000 (prior year £310,000);
- net current liabilities of £18,000; net assets £9,000;
- an overdraft facility of £50,000 renewing on 31 January 2027;
- a VAT Time to Pay arrangement agreed in August 2026;
- the main customer (35% of sales) has given notice that it's moving to another printer from December 2026.

The director, Mark Lowther, says, "We're fine, we always are."`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Analytical review**: gross margin rose from 38% (£190,000 / £500,000) to 42.9% (£240,000 / £560,000). At last year's margin, cost of sales would be £347,200, so £27,200 lower than expected. Investigate: closing stock overstated? purchases missing? genuine price rises? Don't sign until explained.
2. **Going concern**: several warning signs: net current liabilities, overdraft renewal within 12 months of approval, Time to Pay, and loss of a 35% customer. The assessment period runs to at least **31 October 2027**.
3. **Evidence**: ask for a 12-month cash flow forecast reflecting the lost customer, the bank's view on the January renewal, and Mark's plans (new customers, cost cuts). If Mark will support the company, get a letter and evidence of his means.
4. **Conclusion and disclosure**: if the forecast shows the company can continue but depends on the overdraft renewal and replacing the customer, the directors should disclose a **material uncertainty** relating to going concern. If it can't continue, the going concern basis isn't appropriate.
5. **Representation letter**: include specific representations on the forecast assumptions, the Time to Pay arrangement and the customer loss.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "margin-analysis",
      prompt:
        "Last year a client's gross margin was 35%. This year draft turnover is £720,000 and draft cost of sales is £432,000. If the margin had stayed at 35%, by how much would cost of sales be higher or lower than the draft? (Give the absolute difference.)",
      answer: 36000,
      unit: "£",
      explain: "Compute expected cost of sales at last year's margin and compare with the draft.",
      working: "Expected cost of sales: £720,000 × 65% = £468,000. Draft £432,000. Difference **£36,000** (draft margin 40%: investigate).",
    },
    {
      kind: "classify",
      id: "gc-indicators",
      prompt: "Which of these are going concern warning signs for a small company?",
      categories: ["Warning sign", "Not, on its own, a warning sign"],
      items: [
        { text: "The bank facility is due for renewal within 12 months of approval and the bank hasn't confirmed it", answer: 0 },
        { text: "A Time to Pay arrangement with HMRC for overdue VAT", answer: 0 },
        { text: "The company changed its year end", answer: 1 },
        { text: "Net current liabilities funded by an overdraft", answer: 0 },
        { text: "The company bought a new van on hire purchase", answer: 1 },
        { text: "Loss of a customer providing 40% of sales", answer: 0 },
      ],
      explain: "Funding, liquidity, HMRC arrears and customer dependence are classic indicators. Routine events like a year end change or an HP purchase aren't, by themselves.",
    },
    {
      kind: "mcq",
      id: "gc-period",
      prompt: "A company's year end is 31 March 2026 and the accounts are approved on 15 December 2026. To at least what date should the directors' going concern assessment look?",
      options: ["31 March 2027", "15 December 2026", "15 December 2027", "31 March 2028"],
      answer: 2,
      explain: "At least 12 months from the date the accounts are approved.",
    },
    {
      kind: "multi",
      id: "rep-letter",
      prompt: "Which of these would you expect in a management representation letter for a small owner-managed company? Select all that apply.",
      options: [
        "All transactions have been recorded in the accounting records",
        "All related party transactions and directors' loans have been disclosed",
        "Events after the year end requiring adjustment or disclosure have been disclosed",
        "The accountant guarantees the accounts are free from error",
        "The directors' assessment of going concern and their plans",
      ],
      answers: [0, 1, 2, 4],
      explain: "The letter records the directors' confirmations. The accountant gives no guarantee: unaudited accounts are the directors' responsibility.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-gc-uncertainty",
      prompt: "The directors conclude the company is a going concern but there's a material uncertainty about the bank renewing its facility. What's required?",
      options: [
        "Nothing",
        "Prepare on a going concern basis and disclose the material uncertainty",
        "Prepare on a break-up basis",
        "Delay filing until the bank decides",
      ],
      answer: 1,
      explain: "Material uncertainties that may cast significant doubt on going concern must be disclosed.",
    },
    {
      kind: "mcq",
      id: "q-rep-purpose",
      prompt: "What is the main purpose of a management representation letter?",
      options: [
        "To replace the need for any evidence",
        "To obtain written confirmation from the directors on matters the accountant relies on, and make responsibility clear",
        "To satisfy HMRC",
        "To approve the accountant's fee",
      ],
      answer: 1,
      explain: "It documents the directors' confirmations; it doesn't replace evidence that could reasonably be obtained.",
    },
    {
      kind: "mcq",
      id: "q-accountants-report",
      prompt: "What does an accountants' report on unaudited accounts confirm?",
      options: [
        "That the accounts give a true and fair view after an audit",
        "That the accounts were prepared from the records and information provided, without an audit",
        "That HMRC has accepted the accounts",
        "That the company is a going concern",
      ],
      answer: 1,
      explain: "It describes the compilation engagement and makes clear no audit was carried out.",
    },
    {
      kind: "mcq",
      id: "q-comparatives",
      prompt: "During review you find the comparatives don't agree to last year's signed accounts. What should you do?",
      options: ["Ignore it if the difference is small", "Investigate: either correct the comparatives or, if last year was wrong, consider a prior period adjustment with disclosure", "Change last year's filed accounts", "Delete the comparatives"],
      answer: 1,
      explain: "Comparatives must agree to the prior year unless restated for a properly disclosed correction or change in policy.",
    },
    {
      kind: "mcq",
      id: "q-not-gc",
      prompt: "The directors decide after the year end to cease trading. On what basis should the accounts be prepared?",
      options: ["Going concern, with a note", "Not on a going concern basis; disclose the basis used", "Going concern, because it was trading at the year end", "Cash basis"],
      answer: 1,
      explain: "If management intends to cease trading, the going concern basis must not be used.",
    },
  ],
  sources: [
    { label: "FRC: FRS 102 (Section 3 Financial statement presentation – going concern)", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-102/" },
    { label: "Companies Act 2006 s393 – accounts to give true and fair view", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/393" },
    { label: "Companies Act 2006 s414 – approval and signing of accounts", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/414" },
    { label: "Companies House: preparing and filing Companies House accounts", url: "https://www.gov.uk/government/publications/filing-your-companies-house-accounts/life-of-a-company-part-1-accounts" },
    { label: "ICAEW: small and micro-entity reporting compared", url: "https://www.icaew.com/technical/corporate-reporting/uk-gaap/small-and-micro-entity-reporting/small-and-micro-entity-reporting-compared" },
  ],
};
