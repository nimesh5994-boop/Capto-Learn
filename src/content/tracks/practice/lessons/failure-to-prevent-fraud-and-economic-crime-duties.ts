import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "failure-to-prevent-fraud-and-economic-crime-duties",
  title: "Failure to prevent fraud and the wider economic crime duties for practices",
  level: "advanced",
  minutes: 35,
  summary:
    "The corporate offence of failure to prevent fraud (ECCTA 2023, in force 1 September 2025): which organisations are caught, the 'associated person' concept, the reasonable procedures defence and its six principles, how it affects large practices and large clients, and how it fits with AML, Companies House identity verification and PCRT.",
  objectives: [
    "Apply the 'large organisation' test and explain which organisations the offence applies to",
    "Explain the offence: associated persons, base fraud offences and the benefit requirement",
    "Describe the reasonable prevention procedures defence and the six guiding principles",
    "Explain how the offence affects a practice, its clients and the services it provides",
    "Describe the Companies House identity verification changes that affect directors, PSCs and practices",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `The **Economic Crime and Corporate Transparency Act 2023 (ECCTA)** created a **corporate criminal offence** of **failure to prevent fraud**. It came into force on **1 September 2025**. An organisation can be convicted if an **associated person** commits a **specified fraud offence** intending to benefit the organisation, **unless** it had **reasonable procedures** to prevent fraud (or it was reasonable to have none). The penalty is an **unlimited fine**. The aim is a culture change: fraud prevention becomes a **board-level** responsibility.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Which organisations are caught?",
      md: `The offence applies to **large organisations** (companies, partnerships, charities, public bodies) that meet **at least two** of the following in the financial year before the offence:

| Test | Threshold |
|---|---|
| Employees | **More than 250** |
| Turnover | **More than £36 million** |
| Total assets | **More than £18 million** |

A **parent** is caught if the **group** meets the test. The offence applies to **UK and overseas** organisations where there is a **UK nexus** (the fraud or its effects occur in the UK).

**Small and medium** practices are **not directly** within the offence, but (a) they may **be caught if part of a large group**, (b) they provide **services to large clients** that may need help to show reasonable procedures, and (c) they may become **associated persons** of large clients, with their own conduct risks.`,
    },
    {
      kind: "md",
      md: `### The offence in outline

1. A person **associated** with the organisation (an **employee, agent, subsidiary** or **any person who performs services for or on behalf of** the organisation) commits a **base fraud offence**.
2. They do so **with the intention** of benefiting the **organisation** (or, where the associated person provides services for the organisation, a **person to whom that associated person provides services on behalf of the organisation**). It is not necessary for senior managers to know or approve.
3. The organisation **fails to prevent** it, unless it can show it had **reasonable prevention procedures** in place (or that it was **not reasonable** in the circumstances to expect any).

**Base fraud offences** include fraud by false representation, fraud by failing to disclose information, fraud by abuse of position, obtaining services dishonestly, participation in a fraudulent business, false accounting, false statements by company directors and fraudulent trading, **cheating the public revenue** (including tax fraud), and certain others. Tax fraud such as **knowingly false VAT returns** or **fictitious expense claims** therefore falls within the scope.

### The defence: reasonable prevention procedures

The government's guidance sets six principles (it does not prescribe a checklist):

| Principle | In practice |
|---|---|
| **Top-level commitment** | Board and senior management set the tone and own the programme |
| **Risk assessment** | Identify and assess the fraud risks the organisation faces from its associated persons |
| **Proportionate risk-based prevention procedures** | Policies and controls scaled to the risks |
| **Due diligence** | On associated persons (staff, agents, suppliers, intermediaries) |
| **Communication and training** | Staff understand the risks, policies and whistleblowing routes |
| **Monitoring and review** | Test, review and improve procedures |

### Relevance for practices

- **Large practices** (over the thresholds, or part of a large group) need **their own procedures**, documented and reviewed.
- **Advisers to large clients:** clients may ask the practice for **assurance** or **support** with risk assessments and procedures; the practice should understand the principles and not give assurances it can't support.
- **Conduct of the practice's own staff:** an **adviser or bookkeeper** who falsifies records at the client's request to **benefit the client** may expose the **client**, and themselves, to criminal liability. PCRT, the fundamental principles, the **AML** duties and the **tipping off** rules all apply.
- **Whistleblowing:** staff should know how to **raise concerns**.

### Wider ECCTA changes you will meet

- **Companies House identity verification:** from **18 November 2025** new directors and **PSCs** must verify their identity; existing directors have a **12-month transition**, confirming verification with their next **confirmation statement**. Verification is via **GOV.UK One Login** or an **Authorised Corporate Service Provider (ACSP)**; a practice that files for clients may register as an ACSP to verify identity on their behalf and must itself meet **AML supervision** requirements.
- **Greater powers** for Companies House to query, reject and remove information, and to share intelligence with law enforcement.
- **Senior manager attribution** for certain economic crimes: the acts of a senior manager acting within their authority can make the organisation liable.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Red flags for practice staff",
      md: `- A client asks you to **prepare or post** invoices or journals that don't reflect real transactions.
- A client wants **returns or accounts** to show figures you know are wrong.
- **Pressure** to backdate documents.
- **Unusual flows** of money through the client's accounts.
- **Whistleblower** concerns inside a client.

Respond in line with your **policies**: refuse, escalate to a partner, consider an **internal AML report** to the MLRO, and **document**.`,
    },
  ],
  scenario: {
    title: "A false VAT return at Meridian Group plc",
    narrative: `**Meridian Group plc** has **1,200 employees**, **£180 million** turnover and **£95 million** of assets. Its finance manager, Dan Ridley, asks a senior at Halden & Co (a 12-person practice) to prepare the group's VAT return including **£340,000** of purchase invoices that Dan says "relate to a project that was cancelled but we want the VAT back anyway". The senior doubts the invoices are genuine.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: is Meridian a large organisation?** Yes: it exceeds all three thresholds. The offence can apply to it if an **associated person** commits a base fraud intending to benefit Meridian.

**Step 2: who is the associated person?** Dan (an employee) and potentially **Halden & Co**, as a person performing services for Meridian. A false VAT claim is likely to be **cheating the public revenue** or **fraud by false representation**.

**Step 3: Halden's position.** Halden is below the large organisation thresholds, so is **not directly** within the offence, but its staff could commit **criminal offences** if they knowingly prepare a false return, and the firm must apply its **ethics**, **PCRT** and **AML** policies.

**Step 4: what the senior should do.**
- **Refuse** to include the invoices unless supported by evidence of genuine supplies.
- **Escalate** to the engagement partner and the **MLRO** (an internal report: the senior suspects false claims, and the VAT refund would be criminal property).
- **Don't tip off** Dan or anyone at Meridian about the report.
- **Document** the request and the response.

**Step 5: for Meridian.** Its reasonable prevention procedures (risk assessment, training and whistleblowing) would be relevant to its defence. Halden shouldn't give assurances beyond what it has verified.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "large-test-count",
      prompt: "An organisation has 300 employees, £30 million turnover and £10 million total assets. How many of the three 'large organisation' tests (more than 250 employees, more than £36m turnover, more than £18m assets) does it meet?",
      answer: 1,
      unit: "",
      explain: "Only the employee test is met. It needs two of three to be a large organisation.",
      working: "Employees 300 > 250: yes; turnover £30m ≤ £36m: no; assets £10m ≤ £18m: no → **1** of 3 (not large).",
    },
    {
      kind: "classify",
      id: "classify-large-org",
      prompt: "Is the organisation 'large' for the failure to prevent fraud offence?",
      categories: ["Large", "Not large"],
      items: [
        { text: "180 employees, £40m turnover, £20m total assets", answer: 0 },
        { text: "40 employees, £6m turnover, £2m total assets", answer: 1 },
        { text: "400 employees, £25m turnover, £15m total assets", answer: 1 },
        { text: "300 employees, £50m turnover, £10m total assets", answer: 0 },
      ],
      explain: "Two of three: more than 250 employees, more than £36m turnover, more than £18m total assets.",
    },
    {
      kind: "mcq",
      id: "mcq-date",
      prompt: "When did the failure to prevent fraud offence come into force?",
      options: ["26 December 2023", "1 September 2025", "18 November 2025", "6 April 2026"],
      answer: 1,
      explain: "1 September 2025.",
    },
    {
      kind: "multi",
      id: "multi-six-principles",
      prompt: "Which are among the six principles for reasonable fraud prevention procedures? Select all that apply.",
      options: [
        "Top-level commitment",
        "Risk assessment",
        "Due diligence",
        "Monitoring and review",
      ],
      answers: [0, 1, 2, 3],
      explain: "All four are among the six; the others are proportionate procedures and communication and training.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-penalty",
      prompt: "What penalty applies on conviction of the offence?",
      options: ["£10,000", "An unlimited fine", "Imprisonment of the organisation", "A written warning"],
      answer: 1,
      explain: "An unlimited fine.",
    },
    {
      kind: "mcq",
      id: "q-ecc",
      prompt: "Which Act created the offence?",
      options: ["Bribery Act 2010", "Economic Crime and Corporate Transparency Act 2023", "Criminal Finances Act 2017", "Companies Act 2006"],
      answer: 1,
      explain: "ECCTA 2023.",
    },
    {
      kind: "mcq",
      id: "q-defence",
      prompt: "What is the main defence?",
      options: ["None", "Reasonable prevention procedures", "Being small", "Ignorance"],
      answer: 1,
      explain: "Having reasonable fraud prevention procedures in place.",
    },
    {
      kind: "mcq",
      id: "q-ch-id",
      prompt: "When did identity verification at Companies House begin for new directors and PSCs?",
      options: ["1 September 2025", "18 November 2025", "6 April 2026", "1 January 2027"],
      answer: 1,
      explain: "18 November 2025, with a 12-month transition for existing directors.",
    },
    {
      kind: "mcq",
      id: "q-employee",
      prompt: "A bookkeeper falsifies invoices at a large client's request. Which duties are engaged for the practice?",
      options: ["Only tax", "Ethics, PCRT, AML and potential criminal liability", "None", "Only GDPR"],
      answer: 1,
      explain: "Several regimes apply, and refusal and escalation are required.",
    },
  ],
  sources: [
    { label: "ECCTA 2023: guidance to organisations on failure to prevent fraud – GOV.UK", url: "https://www.gov.uk/government/publications/offence-of-failure-to-prevent-fraud-introduced-by-eccta/economic-crime-and-corporate-transparency-act-2023-guidance-to-organisations-on-the-offence-of-failure-to-prevent-fraud-accessible-version" },
    { label: "Failure to prevent fraud offence: factsheet – GOV.UK", url: "https://www.gov.uk/government/publications/economic-crime-and-corporate-transparency-act-2023-factsheets/economic-crime-and-corporate-transparency-act-failure-to-prevent-fraud-offence" },
    { label: "Companies House confirms identity verification rollout from 18 November 2025 – GOV.UK", url: "https://www.gov.uk/government/news/companies-house-confirms-identity-verification-rollout-from-18-november-2025" },
    { label: "Verify your identity for Companies House – GOV.UK", url: "https://www.gov.uk/guidance/verify-your-identity-for-companies-house" },
    { label: "Economic Crime and Corporate Transparency Act 2023 – legislation.gov.uk", url: "https://www.legislation.gov.uk/ukpga/2023/56/contents" },
  ],
};
