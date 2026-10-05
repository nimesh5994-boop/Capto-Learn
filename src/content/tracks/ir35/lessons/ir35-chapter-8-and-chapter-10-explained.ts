import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "ir35-chapter-8-and-chapter-10-explained",
  title: "IR35 explained: Chapter 8, Chapter 10 and who decides",
  level: "foundation",
  minutes: 30,
  summary:
    "What the IR35 'intermediaries' rules and the off-payroll working rules are, the hypothetical contract test, the difference between Chapter 8 (the PSC decides and pays) and Chapter 10 (the client decides and the fee-payer deducts tax), and how to tell which regime applies to a given engagement.",
  objectives: [
    "State the hypothetical contract test used by both regimes",
    "Define an intermediary, a personal service company and a relevant engagement",
    "Distinguish who decides status and who pays under Chapter 8 and Chapter 10 of ITEPA 2003 Part 2",
    "Identify which regime applies to an engagement given the client's sector and size",
    "Explain why one contractor can be subject to both regimes in the same year",
  ],
  body: [
    {
      kind: "md",
      md: `**IR35** is the shorthand for the **intermediaries legislation**, introduced in April 2000. It targets workers who supply their services to a client through an **intermediary**, usually their own limited company, and who would, if they dealt with the client directly, be **employees**. The aim is to charge broadly the same tax and National Insurance as if they were employed. Since April 2017 (public sector) and April 2021 (private sector), the **off-payroll working rules** have moved the responsibility for deciding status to the **client** in many cases. The two regimes sit side by side in **ITEPA 2003 Part 2**.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The hypothetical contract test",
      md: `Both regimes ask the same question: **if the worker had been engaged by the client directly, under a contract with the terms and working practices that actually apply, would they be an employee of the client?**

- **Chapter 8** (ss48–61, "intermediaries") applies where the services are provided through an intermediary and, **if the arrangements were a contract between the worker and the client**, the worker would be regarded as an employee (s49(1)(c)).
- **Chapter 10** (ss61M–61Z, "workers' services provided through intermediaries") uses the same test but puts the **client** (or the relevant party) in charge of the determination, with the **fee-payer** accounting for tax and NIC.

You apply the **employment status tests** in the previous lesson to the hypothetical contract. A real contract between the client and the PSC supplies the terms; the **working practices** show how it operates.`,
    },
    {
      kind: "table",
      caption: "Chapter 8 versus Chapter 10",
      head: ["", "Chapter 8 (intermediaries legislation, 'IR35')", "Chapter 10 (off-payroll working rules)"],
      rows: [
        ["Applies when the client is…", "A **small** private sector client (and some overseas clients)", "A public authority, or a **medium or large** private sector client (or a UK-connected overseas client)"],
        ["Who decides status", "The **PSC / worker**", "The **client** (issues a status determination statement)"],
        ["Who accounts for tax and NIC", "The **PSC**, through a deemed employment payment at 5 April", "The **fee-payer** (client or agency), through deemed direct payments each time the worker is paid"],
        ["Amount charged", "A deemed payment calculated on the PSC's receipts with a 5% allowance and deductions", "The fee-payer's payment to the PSC, less VAT and (in some cases) expenses"],
        ["Employer NIC and apprenticeship levy", "On the PSC's deemed payment", "Paid by the fee-payer on the deemed direct payment"],
        ["Reporting", "Annual calculation; reported as employment income of the worker at 5 April", "Through the fee-payer's RTI submissions"],
        ["Legislation", "ITEPA 2003 ss48–61", "ITEPA 2003 ss61M–61Z"],
      ],
    },
    {
      kind: "md",
      md: `### Key definitions

- **Worker:** the individual who does the work.
- **Intermediary (Chapter 8):** a company, partnership or individual (other than the worker) through which the worker provides services. A **personal service company (PSC)** is an intermediary company in which the worker has a **material interest**: broadly **more than 5%** of the ordinary share capital (or the right to more than 5% of distributions), or the company is a managed service company, or the worker receives payments that aren't employment income and which could reasonably be taken to be for the services.
- **Relevant engagement:** each engagement (contract, assignment or role) is assessed on its own facts. A contractor can have **some engagements inside** IR35 and **some outside**.
- **Client / end user:** the person for whom the services are ultimately provided.
- **Fee-payer (Chapter 10):** the party that pays the intermediary. It is the client if there is no agency; otherwise the **agency** (or the party nearest the PSC in the contractual chain above the intermediary).

### Choosing the regime

1. **Is the worker supplying services through an intermediary?** If not (a sole trader or a directly engaged employee), neither regime applies.
2. **Who is the client?** A **public sector** body or a **medium or large private** client: **Chapter 10**. A **small** private client: **Chapter 8**.
3. **Is the client overseas?** The rules depend on UK connection and the client's location, so look at the detailed guidance rather than assuming.
4. **Test each engagement.** Apply the tests to each contract, not to the contractor in the abstract.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common mistakes",
      md: `- Assuming that because a contractor has a limited company they are "not IR35" (the legislation is about the hypothetical contract, not the company).
- Applying Chapter 8 to a client that is actually medium or large (the client then has legal duties and may be liable).
- Treating the **PSC's size** as relevant. Under Chapter 10 it is the **client's** size that decides.
- Forgetting that a PSC's **other engagements** with small clients stay under Chapter 8: the PSC must decide those itself.`,
    },
  ],
  scenario: {
    title: "One contractor, four clients: Callum Reid's PSC",
    narrative: `Callum Reid is a data engineer who owns 100% of Reid Data Ltd. During the year he works for four clients:

1. **NHS Trust**, a 4-day-a-week project.
2. **Bellmount Bank plc**, a large listed company, 1 day a week.
3. **Hendry & Co**, a design agency with 12 staff, 3 days of work.
4. **A US software firm** with no UK presence, a one-off review.`,
    walkthrough: [
      {
        kind: "table",
        caption: "Which regime applies to each engagement",
        head: ["Client", "Regime", "Who decides status", "Who accounts for tax"],
        rows: [
          ["NHS Trust", "Chapter 10 (public authority)", "The NHS Trust", "The fee-payer, through payroll"],
          ["Bellmount Bank plc", "Chapter 10 (large private company)", "The bank", "The fee-payer"],
          ["Hendry & Co (12 staff)", "Chapter 8 (small private client)", "Reid Data Ltd / Callum", "Reid Data Ltd, deemed payment at 5 April"],
          ["US firm, no UK presence", "Outside Chapter 10 in most cases; Chapter 8 may apply if the engagement is inside IR35", "Reid Data Ltd / Callum", "Reid Data Ltd, if the engagement is inside IR35"],
        ],
      },
      {
        kind: "md",
        md: `**What to do for each.**
- **NHS Trust and Bellmount:** ask for the **status determination statement**. If Callum disagrees, he can use the client's **disagreement process**. The tax will be deducted from the fees the PSC receives if the engagement is inside IR35; the PSC should treat the payment as already taxed (net) and **not** include it in the Chapter 8 calculation.
- **Hendry & Co:** Callum or the practice must carry out a **status assessment** (CEST or equivalent analysis), keep evidence and, if inside IR35, calculate and pay the **deemed employment payment**.
- **US firm:** check whether the rules apply and document the analysis.

**Record-keeping.** Keep a status file per engagement: contract, SDS or CEST result, working practices, and the decision.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-regime",
      prompt: "Which regime applies to the engagement (assuming the worker supplies services through their own company)?",
      categories: ["Chapter 8 (PSC decides)", "Chapter 10 (client decides)"],
      items: [
        { text: "A local council", answer: 1 },
        { text: "A large listed retailer", answer: 1 },
        { text: "A 10-person marketing agency", answer: 0 },
        { text: "A government department", answer: 1 },
        { text: "A small UK-based charity (private/voluntary sector, meeting fewer than 2 of the size tests)", answer: 0 },
      ],
      explain: "Public sector clients and medium or large private clients use Chapter 10; small private clients leave the decision to the PSC under Chapter 8.",
    },
    {
      kind: "mcq",
      id: "mcq-test",
      prompt: "Both regimes ask whether the worker would be an employee of the client…",
      options: ["On a hypothetical direct contract", "If they signed an employment contract", "If paid by PAYE", "If HMRC says so"],
      answer: 0,
      explain: "The hypothetical contract test.",
    },
    {
      kind: "mcq",
      id: "mcq-material-interest",
      prompt: "A worker holds 3% of the shares in a company through which they supply services. Is it a personal service company?",
      options: ["Yes, always", "Probably not on the shareholding alone: a material interest means more than 5%", "Yes, if they are a director", "Only if they hold exactly 5%"],
      answer: 1,
      explain: "A material interest is generally more than 5% of the ordinary share capital or rights to distributions (other conditions may also catch a company).",
    },
    {
      kind: "mcq",
      id: "mcq-fee-payer",
      prompt: "Under Chapter 10, who operates PAYE on the deemed direct payment?",
      options: ["The worker", "The fee-payer", "HMRC", "The pension provider"],
      answer: 1,
      explain: "The fee-payer, which may be the client or an agency.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-year",
      prompt: "When did the off-payroll rules move to medium and large private sector clients?",
      options: ["April 2000", "April 2017", "April 2021", "April 2025"],
      answer: 2,
      explain: "6 April 2021, following the public sector reform in April 2017.",
    },
    {
      kind: "mcq",
      id: "q-small-decides",
      prompt: "Under Chapter 8 who decides whether the engagement is inside IR35?",
      options: ["The client", "The PSC", "HMRC", "The agency"],
      answer: 1,
      explain: "The PSC (and its adviser) must assess status.",
    },
    {
      kind: "mcq",
      id: "q-each",
      prompt: "Is IR35 assessed per contractor or per engagement?",
      options: ["Per contractor", "Per engagement", "Per year", "Per director"],
      answer: 1,
      explain: "Each engagement is assessed on its own facts.",
    },
    {
      kind: "mcq",
      id: "q-public",
      prompt: "Which regime applies to engagements with a public authority?",
      options: ["Chapter 8", "Chapter 10", "Neither", "Both"],
      answer: 1,
      explain: "Chapter 10 applies to all public authorities.",
    },
    {
      kind: "mcq",
      id: "q-company",
      prompt: "Does having a limited company mean the IR35 rules never apply?",
      options: ["Yes", "No: the test is the hypothetical contract", "Only for single-director companies", "Only for companies over two years old"],
      answer: 1,
      explain: "A company is the intermediary the rules are designed to look through.",
    },
  ],
  sources: [
    { label: "ITEPA 2003 Part 2 Chapter 8 – intermediaries", url: "https://www.legislation.gov.uk/ukpga/2003/1/part/2/chapter/8" },
    { label: "ITEPA 2003 Part 2 Chapter 10 – workers' services provided through intermediaries", url: "https://www.legislation.gov.uk/ukpga/2003/1/part/2/chapter/10" },
    { label: "Off-payroll working for clients – GOV.UK", url: "https://www.gov.uk/guidance/off-payroll-working-for-clients" },
    { label: "ESM8020 – key terms for the intermediaries legislation", url: "https://www.gov.uk/hmrc-internal-manuals/employment-status-manual/esm8020" },
  ],
};
