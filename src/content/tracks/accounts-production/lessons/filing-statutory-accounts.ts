import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "filing-statutory-accounts",
  title: "Approving and filing statutory accounts: Companies House and HMRC",
  level: "practitioner",
  minutes: 35,
  summary:
    "From draft to filed: approval and signing, what must go to members versus what's filed at Companies House (filleted and abridged options for small and micro companies), deadlines and penalties, iXBRL for HMRC after the free CT600 service closed, and the Companies House accounts changes due from 1 April 2028.",
  objectives: [
    "Describe the approval and signing steps and who signs what",
    "Distinguish the accounts sent to members from the version filed at Companies House",
    "Plan filing around the Companies House and HMRC deadlines, using iXBRL software",
    "Explain what changes for small and micro companies from 1 April 2028",
  ],
  body: [
    {
      kind: "md",
      md: `Once the accounts are reviewed and the client is happy, three things happen: the **directors approve** them, a copy goes to **every member**, and the accounts are **filed** at Companies House and (with the CT600) at HMRC. Each step has its own rules.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Approval and signing",
      md: `- The **board approves** the accounts, and the **balance sheet is signed** on behalf of the board by a director, with the director's name stated (CA 2006 s414).
- If a **directors' report** is prepared, it's approved and signed by a director or the company secretary (s419).
- The copy delivered to Companies House must state the signatory's name.
- Statements required on the balance sheet (e.g. audit exemption, small companies regime, micro-entity provisions) must appear **above** the signature.`,
    },
    {
      kind: "md",
      md: `### Members get full accounts; Companies House may get less

Every member must be sent a copy of the annual accounts (s423), normally the full version prepared under the chosen framework. For filing, small and micro companies currently have options:

| Company | What it must file at Companies House (currently) |
|---|---|
| **Micro-entity** | Balance sheet and the limited notes required. The profit and loss account and directors' report can be omitted. |
| **Small** (FRS 102 Section 1A) | Balance sheet and notes. It may **omit the profit and loss account and directors' report** ("filleted" accounts), with a statement on the balance sheet that it has done so. It may also file **abridged** accounts if all members have consented (s444(2A)). |
| **Medium / large** | Full accounts, directors' report and (if audited) the auditor's report. Medium companies may omit some details. |

If the filed version omits the auditor's report, it must still state whether the report was qualified and give the auditor's name.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "From 1 April 2028: the end of filleted and abridged accounts",
      md: `Companies House has announced (June 2026) that from **1 April 2028**:
- all companies must file accounts using **commercial software** in **iXBRL**; web and paper accounts filing will close;
- **abridged accounts** are abolished;
- **small and micro companies must file a profit and loss account**, with an option (details to be confirmed) not to have it published on the register;
- companies claiming audit exemption must give a **strengthened eligibility statement**;
- all parts of the accounts and reports must be filed **together**.

Clients who value keeping their profit private need to hear about this well before their first year affected.`,
    },
    {
      kind: "md",
      md: `### Deadlines and penalties (recap)

- **Companies House**: 9 months after the year end for a private company (21 months from incorporation for a first period over 12 months). Late filing penalties start at **£150** and double if late two years running.
- **HMRC**: the CT600 is due **12 months** after the end of the accounting period, but tax is usually **payable 9 months and 1 day** after the end of the period (large companies pay by instalments). HMRC's CT late filing penalties were **doubled** for returns with a filing date on or after **1 April 2026**.

### iXBRL and the end of the free HMRC service

The accounts and tax computation submitted with the CT600 must be in **iXBRL** (tagged) format. HMRC and Companies House's free joint online service for filing accounts and the Company Tax Return **closed on 31 March 2026**, so every company now needs commercial software (or an agent using it). Most accounts production software tags the accounts automatically, but **check the tagging**, especially for custom notes and dormant or micro templates.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "One approval, two filings, same numbers",
      md: `File the Companies House version and the HMRC version from the **same approved set**. Differences between the accounts filed at Companies House and the ones sent to HMRC are a red flag for both. Keep the signed approval (board minute or e-signature audit trail) on file before anything is filed.`,
    },
  ],
  scenario: {
    title: "Filing for Brackenridge Design Ltd",
    narrative: `Brackenridge Design Ltd (small, FRS 102 Section 1A, audit exempt) has a year end of **31 March 2026**. The draft accounts were agreed with the two directors, Eve and Jon, on 10 October 2026. Jon asks:

1. "Do we have to put our profit and loss on the public register?"
2. "When's the latest we can file and pay?"
3. "Can we just use HMRC's free online service like last year?"`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Profit and loss.** Not for this year. As a small company it can file **filleted** accounts at Companies House: balance sheet and notes, with a statement that the P&L and directors' report have been omitted. The members (Eve and Jon) still receive the full accounts. Warn them that from **1 April 2028** small companies must file a P&L (with an option not to publish it).
2. **Deadlines.** Companies House: **31 December 2026** (9 months after 31 March 2026). CT payable: **1 January 2027** (9 months and 1 day). CT600: **31 March 2027**. Recommend filing both together once approved, well before Christmas.
3. **HMRC's free service** closed on 31 March 2026. The firm will file the CT600 with iXBRL accounts and computations through its commercial software, and the accounts at Companies House the same way.
4. **Approval.** Eve signs the balance sheet for the board (name stated), below the audit exemption and small companies statements. Record the board approval date, then send copies to both members and file.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "what-to-file",
      prompt: "Under the current rules (before April 2028), which items must a small private company (Section 1A, audit exempt) file at Companies House?",
      categories: ["Must file", "May omit"],
      items: [
        { text: "Balance sheet signed by a director, with the director's name", answer: 0 },
        { text: "Profit and loss account", answer: 1 },
        { text: "Directors' report", answer: 1 },
        { text: "Audit exemption statements on the balance sheet", answer: 0 },
        { text: "Notes to the balance sheet required by Section 1A", answer: 0 },
      ],
      explain: "Small companies can currently 'fillet' the filed accounts by omitting the P&L and directors' report, but must file the balance sheet with the required statements and notes.",
    },
    {
      kind: "mcq",
      id: "ct-deadlines",
      prompt: "A small company's accounting period ends on 30 June 2026. When is its corporation tax payable and when is its CT600 due?",
      options: [
        "Tax 1 April 2027; return 30 June 2027",
        "Tax 31 March 2027; return 31 March 2027",
        "Tax 1 April 2027; return 31 March 2027",
        "Tax 30 June 2027; return 30 June 2027",
      ],
      answer: 0,
      explain: "Tax is due 9 months and 1 day after the period end (1 April 2027) and the return 12 months after (30 June 2027).",
    },
    {
      kind: "multi",
      id: "changes-2028",
      prompt: "Which of these are among the Companies House accounts changes announced for 1 April 2028? Select all that apply.",
      options: [
        "Software-only filing in iXBRL",
        "Removal of abridged accounts",
        "Small and micro companies to file a profit and loss account (with an option not to publish it)",
        "Micro-entities must have an audit",
        "A strengthened audit exemption eligibility statement",
      ],
      answers: [0, 1, 2, 4],
      explain: "The 2028 package covers software-only iXBRL filing, the end of abridged accounts, P&L filing for small and micro companies, a strengthened audit exemption statement and filing all components together. It doesn't impose audits on micros.",
    },
    {
      kind: "numeric",
      id: "late-penalty-recap",
      prompt:
        "A private company's accounts were due at Companies House on 31 December 2025 and were filed on 20 February 2026. The previous year's accounts were also filed late. What penalty is due?",
      answer: 750,
      unit: "£",
      explain: "More than 1 month but not more than 3 months late is £375 for a private company, doubled when the previous year was also late.",
      working: "£375 × 2 = **£750**.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-sign",
      prompt: "Who signs the balance sheet?",
      options: ["The accountant", "A director, on behalf of the board, with their name stated", "The company secretary only", "The auditor"],
      answer: 1,
      explain: "CA 2006 s414: a director signs on behalf of the board.",
    },
    {
      kind: "mcq",
      id: "q-members",
      prompt: "A small company files filleted accounts at Companies House. What do its members receive?",
      options: ["The same filleted accounts", "Full accounts prepared under its framework", "Nothing", "Only the directors' report"],
      answer: 1,
      explain: "Members must be sent the full annual accounts (s423); filleting is a filing option only.",
    },
    {
      kind: "mcq",
      id: "q-hmrc-service",
      prompt: "When did HMRC and Companies House's free joint online accounts and CT600 filing service close?",
      options: ["31 March 2025", "31 March 2026", "1 April 2028", "It's still open"],
      answer: 1,
      explain: "It closed on 31 March 2026; companies now need commercial software.",
    },
    {
      kind: "mcq",
      id: "q-ixbrl",
      prompt: "In what format must the accounts and computations submitted with a CT600 be?",
      options: ["PDF", "iXBRL", "CSV", "Word"],
      answer: 1,
      explain: "HMRC requires iXBRL-tagged accounts and computations.",
    },
    {
      kind: "mcq",
      id: "q-abridged",
      prompt: "What's needed for a small company to file abridged accounts under the current rules?",
      options: ["Nothing extra", "All members must consent, with a statement on the balance sheet", "An audit", "HMRC approval"],
      answer: 1,
      explain: "Abridged accounts need the consent of all members (s444(2A)) and a statement on the balance sheet. They'll be abolished from April 2028.",
    },
  ],
  sources: [
    { label: "Companies House: preparing and filing Companies House accounts", url: "https://www.gov.uk/government/publications/life-of-a-company-annual-requirements/life-of-a-company-part-1-accounts" },
    { label: "Companies House to bring in changes to accounts filing from April 2028", url: "https://www.gov.uk/government/news/companies-house-to-bring-in-changes-to-accounts-filing-from-april-2028" },
    { label: "Filing company accounts and tax returns if you previously used the HMRC online service", url: "https://www.gov.uk/guidance/closure-of-the-service-to-file-your-company-accounts-and-tax-return" },
    { label: "Companies Act 2006 s444 – filing obligations of companies subject to small companies regime", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/444" },
    { label: "Increases to Corporation Tax late filing penalties", url: "https://www.gov.uk/government/publications/corporation-tax-increases-to-late-filing-penalties/increases-to-corporation-tax-late-filing-penalties" },
  ],
};
