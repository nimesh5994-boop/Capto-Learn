import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "managed-service-companies-and-msc-provider-liability",
  title: "Managed service companies: the MSC rules and who can be liable",
  level: "advanced",
  minutes: 30,
  summary:
    "How a managed service company (MSC) differs from an ordinary PSC, the conditions in ITEPA 2003 s61B, how payments to the worker are taxed as employment income, who can be pursued for the PAYE (the MSC provider and others), and how the MSC rules interact with Chapter 10.",
  objectives: [
    "Describe what a managed service company is and how it differs from a PSC",
    "Identify the conditions that make a company an MSC, including the role of the MSC provider",
    "Explain the tax treatment: deemed employment income and the PAYE duty on the MSC",
    "Explain how liability can transfer to the MSC provider and others",
    "Explain the interaction with Chapter 10 and the signs a client may be in an MSC arrangement",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `A **managed service company (MSC)** is a service company that is, in practice, **run for the worker by someone else**, the **MSC provider**, who sets up the company, controls how it operates and takes a fee. The worker is nominally a shareholder (and often a director), but the arrangements typically pay out the client's fee as a low salary plus dividends, loans or other tax-light payments. Parliament dealt with these arrangements separately from the IR35 rules in **ITEPA 2003 Part 2 Chapter 9** (ss61A–61J), with the aim of making the **worker's payments subject to PAYE and NIC** and making the **provider** a target for recovery.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "What makes a company an MSC (s61B)",
      md: `HMRC guidance (ESM3510) explains that a company is an MSC only if **all four conditions of s61B(1)** are met. In summary:

- The company's **business consists wholly or mainly of providing the services of an individual** (the worker) to **third-party clients**.
- The worker receives **payments (or payments and benefits) from the company** that represent **the greater part of the sums the company receives from the client** for the worker's services.
- The way those payments are made means the worker receives **more, after tax and NIC, than they would if every payment were treated as employment income** (for example, part paid as dividends or expenses) (s61B(1); ESM3510).
- An **"MSC provider"** is **involved with the company**: that is, the provider (or an associate) does any of the following (ESM3520): **benefits financially on an ongoing basis** from the provision of the services; **influences or controls** the provision of the services; influences or controls **the way payments to the worker are made**; influences or controls the **company's finances or activities**; or **gives or promotes an undertaking to make good any tax loss**.

Read the exact wording of s61B and ESM3510 before concluding that a particular company is, or is not, an MSC.`,
    },
    {
      kind: "table",
      caption: "PSC (Chapter 8) versus MSC (Chapter 9)",
      head: ["", "Personal service company", "Managed service company"],
      rows: [
        ["Who controls the company?", "The worker (owner-director)", "The MSC provider, who is involved on an ongoing basis"],
        ["Test", "Hypothetical contract: would the worker be an employee of the client?", "Whether the company meets the s61B conditions: no status test"],
        ["Tax result", "Deemed employment payment calculated on the PSC's receipts (5% allowance)", "Payments to the worker treated as **employment income**, with the MSC as **employer** accounting for PAYE and NIC"],
        ["Who accounts for tax", "The PSC", "The MSC, and if it fails, certain other persons including the MSC provider can be pursued (s688A ITEPA)"],
        ["Interaction with Chapter 10", "Chapter 10 applies if the client is medium/large or public sector", "Where both can apply, Chapter 10 takes precedence (public authorities from 6 April 2017; medium or large clients from 6 April 2021), so the engagement is taken **out** of Chapter 9"],
      ],
    },
    {
      kind: "md",
      md: `### Consequences

- **Deemed employment income:** where the MSC rules apply, the MSC is treated as making payments of employment income to the worker, and must operate **PAYE and NIC**. The worker is taxed as an employee on those payments.
- **Liability transfer (s688A ITEPA):** if the MSC doesn't account for the PAYE and NIC, HMRC can recover them from **other persons**, including the **MSC provider**, and in some cases from those who **control or benefit from** the MSC (such as directors or associates).
- **Practice risk:** accountants who act for an MSC or who help set one up could be exposed to **penalty and liability** risk, and professional conduct issues under PCRT if they promote arrangements that have no reasonable basis.

### Interaction with Chapter 10

Where the client is within Chapter 10 (a public authority or medium or large private business) and the worker supplies services through an intermediary, **Chapter 10 takes priority** and the engagement is taken out of the MSC rules. For small clients, Chapter 9 can still apply to an MSC, and where both Chapter 9 and Chapter 8 could apply, the **MSC rules take precedence** over Chapter 8.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Warning signs of an MSC arrangement",
      md: `- A **third party** (the provider) set up the company and **charges a weekly or monthly fee**.
- The provider's software or staff **receive the client's money**, pay "salary" at or near the minimum and the balance as **dividends, loans or "expenses"**.
- The worker has little or no say in how **the company is run**, who the accountant is or how payments are made.
- Marketing material promises **higher take-home pay than an umbrella** or a normal limited company.

If a new client comes with such an arrangement, **don't assume it works**. Ask for the provider's documents, the payslips and the calculations, and consider whether PAYE should have been operated.`,
    },
  ],
  scenario: {
    title: "A new client in a managed arrangement: Dale Hensley",
    narrative: `Dale Hensley, an engineer, asks you to prepare his tax return. His work is for small clients through **Hensley Engineering Ltd**, which was incorporated for him by **ProContract Services**. ProContract's agreement says it will run the company's admin and payroll for a weekly fee, controls the company bank account, pays Dale a salary of £1,048 a month and the rest of the client fees as "dividends" and "director's loans". Dale's name is on the share certificate but he has never seen the company accounts.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: look at the structure.** The company's business is providing Dale's services to clients (condition 1). He receives most of the client money (condition 2). ProContract is involved on an ongoing basis (benefits from a weekly fee and controls the account and the payments), so condition 4 looks met.

**Step 2: consider the tax treatment.** If the s61B conditions are met, the company is an MSC. The payments to Dale are treated as **employment income** and the company should have operated **PAYE and NIC**. The "dividends" and "loans" would not receive the treatment the arrangement assumed.

**Step 3: who is exposed.** The MSC (the employer) and, under s688A, potentially **ProContract** and certain individuals. Dale is exposed to tax and NIC on payments treated as earnings, interest and penalties.

**Step 4: what to do.** Don't file the return on the "dividend" basis without further inquiry. Obtain the full set of documents, **take advice** and consider the **disclosure** position with HMRC. Check whether any of the work was for **medium or large clients** (Chapter 10 would take those engagements out of the MSC rules and require the fee-payer to deduct tax).

**Step 5: record and advise.** Write to Dale explaining the risk and the options (move to a conventional PSC with proper payroll, or employment through a compliant umbrella), and record that you did so.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-msc-psc",
      prompt: "Does the feature point towards a managed service company or an ordinary PSC?",
      categories: ["MSC", "Ordinary PSC"],
      items: [
        { text: "A third-party provider controls the company bank account and pays the worker", answer: 0 },
        { text: "The worker is the sole director, chooses their own accountant and decides the salary and dividend mix", answer: 1 },
        { text: "The provider charges a weekly fee for running the company's admin and payroll on an ongoing basis", answer: 0 },
        { text: "The worker holds 100% of the shares and is advised by a professional of their choice", answer: 1 },
      ],
      explain: "The key difference is the ongoing involvement and control of a provider who benefits from the arrangement.",
    },
    {
      kind: "mcq",
      id: "mcq-s688a",
      prompt: "If an MSC fails to account for PAYE and NIC, who may HMRC pursue?",
      options: ["Only the worker", "The MSC and other persons, including the MSC provider", "Only the client", "No one"],
      answer: 1,
      explain: "s688A allows recovery from certain other persons including the MSC provider.",
    },
    {
      kind: "mcq",
      id: "mcq-ch10",
      prompt: "A worker supplies services through an intermediary to a large private company. Which chapter takes priority for that engagement?",
      options: ["Chapter 9 (MSC)", "Chapter 10 (off-payroll working)", "Chapter 8 (IR35)", "None"],
      answer: 1,
      explain: "Where both can apply, Chapter 10 takes precedence over the MSC rules (from 6 April 2021 for medium or large private clients).",
    },
    {
      kind: "multi",
      id: "multi-msc-signs",
      prompt: "Which of these are warning signs of an MSC arrangement? Select all that apply.",
      options: [
        "The provider receives the client's fees and pays out the worker's money",
        "Pay is a minimum salary plus dividends and 'loans'",
        "The worker chooses and instructs their own accountant",
        "The worker has no access to the company's accounts",
      ],
      answers: [0, 1, 3],
      explain: "Control by a provider, a payment mix designed to reduce tax and lack of involvement in the company are the typical signs.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-chapter",
      prompt: "Which chapter of ITEPA 2003 Part 2 deals with managed service companies?",
      options: ["Chapter 7", "Chapter 8", "Chapter 9", "Chapter 10"],
      answer: 2,
      explain: "Chapter 9.",
    },
    {
      kind: "mcq",
      id: "q-provider",
      prompt: "Who is an MSC provider?",
      options: ["The worker's client", "A person who is involved with the company, such as by benefiting financially on an ongoing basis or controlling how payments are made", "HMRC", "The company's auditor only"],
      answer: 1,
      explain: "The provider's involvement is one of the conditions.",
    },
    {
      kind: "mcq",
      id: "q-employer",
      prompt: "Under the MSC rules, who is treated as the employer for PAYE?",
      options: ["The client", "The MSC", "The worker", "The provider's bank"],
      answer: 1,
      explain: "The MSC is treated as making employment income payments and must account for PAYE and NIC.",
    },
    {
      kind: "mcq",
      id: "q-status",
      prompt: "Does the MSC rules test involve the hypothetical contract (employment status) test?",
      options: ["Yes", "No: it is a separate set of conditions", "Only for large clients", "Only for directors"],
      answer: 1,
      explain: "The s61B conditions are separate from the IR35 status test.",
    },
    {
      kind: "mcq",
      id: "q-advice",
      prompt: "A new client's company looks like an MSC. What should you do first?",
      options: ["File as normal", "Obtain the documents and take advice before filing", "Tell HMRC without telling the client", "Resign immediately without a word"],
      answer: 1,
      explain: "Understand the facts and the risk, then advise the client in writing.",
    },
  ],
  sources: [
    { label: "ESM3510 – meaning of an MSC", url: "https://www.gov.uk/hmrc-internal-manuals/employment-status-manual/esm3510" },
    { label: "ESM10004 – managed service companies and off-payroll working", url: "https://www.gov.uk/hmrc-internal-manuals/employment-status-manual/esm10004" },
    { label: "ITEPA 2003 Part 2 Chapter 9 – managed service companies", url: "https://www.legislation.gov.uk/ukpga/2003/1/part/2/chapter/9" },
    { label: "Social Security Contributions (Managed Service Companies) Regulations 2007", url: "https://www.legislation.gov.uk/uksi/2007/2070/made" },
    { label: "ITEPA 2003 s688A – recovery from other persons", url: "https://www.legislation.gov.uk/ukpga/2003/1/section/688A" },
  ],
};
