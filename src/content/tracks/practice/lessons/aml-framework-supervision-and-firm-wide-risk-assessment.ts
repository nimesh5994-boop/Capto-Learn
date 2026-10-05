import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "aml-framework-supervision-and-firm-wide-risk-assessment",
  title: "Anti-money laundering: the framework, supervision and the firm-wide risk assessment",
  level: "foundation",
  minutes: 35,
  summary:
    "Why every accountancy practice is in the regulated sector, how the Money Laundering Regulations 2017, POCA 2002 and the Terrorism Act 2000 fit together, who supervises practices, and what a firm must have in place: a firm-wide risk assessment, policies and controls, a nominated officer (MLRO), training and record keeping.",
  objectives: [
    "Explain which legislation applies to accountancy practices and what each piece does",
    "Identify the firm's supervisor and why registration matters",
    "Describe the contents of a firm-wide risk assessment and how to document it",
    "List the policies, controls and procedures a practice must maintain",
    "State the role of the nominated officer (MLRO), staff training and record-keeping requirements",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Anyone who provides **accountancy, bookkeeping, audit, tax advice, insolvency or company formation services by way of business** is in the **regulated sector** for anti-money laundering (AML). That includes a one-person bookkeeper. The rules are strict, partly because accountants are a **gateway** to company structures and tax planning that criminals may try to use. Firms that fail can face **fines, loss of membership and criminal prosecution**, and a firm that does not follow its own policies will struggle to defend itself.`,
    },
    {
      kind: "table",
      caption: "The legal framework",
      head: ["Legislation", "What it does", "Who it binds"],
      rows: [
        ["Proceeds of Crime Act 2002 (POCA), Part 7", "Creates the **money laundering offences** (concealing, arranging, acquiring, using or possessing criminal property: ss327–329), the **failure to disclose** offence for the regulated sector (s330) and **tipping off** (s333A)", "Everyone (the s330 offence applies to the regulated sector)"],
        ["Terrorism Act 2000", "Similar offences for terrorist property and failure to disclose", "Everyone; regulated sector has stricter duty"],
        ["Money Laundering, Terrorist Financing and Transfer of Funds (Information on the Payer) Regulations 2017 (MLR 2017), as amended", "Requires **risk assessment, policies and controls, customer due diligence, training, record keeping** and **supervision**", "Businesses in the regulated sector (including accountancy service providers)"],
        ["Supervisors' guidance and AMLGAS", "The **CCAB's Anti-Money Laundering Guidance for the Accountancy Sector (AMLGAS)**, approved by HM Treasury, explains how to apply the regulations", "Accountancy firms (courts and supervisors take it into account)"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Supervision",
      md: `HM Treasury appoints **AML supervisors**. There are **25** in the UK, including three statutory supervisors (**HMRC**, the **FCA** and the **Gambling Commission**) and **22 professional body supervisors** (such as ICAEW, ACCA, AAT, CIOT and ATT for their members). A practice **must be supervised**: if it is not supervised by a professional body, it must register with **HMRC** as an **accountancy service provider**. The supervisor will check **fit and proper** status of owners, officers and managers and may carry out **reviews** and impose **penalties**. Tell your supervisor about changes in ownership, management and activities.`,
    },
    {
      kind: "md",
      md: `### The firm-wide risk assessment (MLR 2017 reg 18)

A firm must **identify and assess** the risks of money laundering and terrorist financing it faces, taking into account **the supervisor's** and **the government's** risk assessments and factors including:

- **Clients:** types (companies, trusts, individuals, charities), complexity of structures, **PEPs**, cash-intensive businesses, overseas ownership.
- **Countries or areas:** where clients, owners or transactions are located, especially **high-risk third countries**.
- **Services:** company formation, **handling client money**, acting as a **nominee**, advising on **tax structures**, **unusual** transactions.
- **Delivery channels:** **face-to-face** versus **remote** onboarding, use of **introducers** and **outsourcing**.

The assessment must be **in writing, kept up to date** and **available to the supervisor**. It is the foundation for the firm's **policies, controls and procedures**.

### Policies, controls and procedures (reg 19)

- **Proportionate** to the size and nature of the firm, approved by **senior management**.
- Cover **customer due diligence**, **ongoing monitoring**, **reporting** of suspicion, **record keeping**, **risk management** and **internal controls**.
- Include **screening of relevant employees** (before and during employment), **training** and **independent testing** of the controls where appropriate to the firm's size.
- Appoint a **nominated officer (MLRO)** to receive internal reports and make external reports to the National Crime Agency (NCA). Also nominate a **board-level or senior manager** responsible for compliance where the firm is large enough.

### Training and records

- Staff must be **trained** in the law, the firm's policies, recognising suspicious activity and how to report. Keep a **training log**.
- **Keep CDD records and transaction records for five years** after the end of the business relationship (or completion of the transaction).`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common failings found on supervisory reviews",
      md: `- A **risk assessment** that is generic, out of date or not signed off.
- **CDD** missing on long-standing clients (the rules apply to existing clients too, at a risk-based pace).
- **No documented MLRO decisions**: internal reports made but no record of the reasoning.
- **Training** that is not recorded or not tailored.
- **Not checking** the register of **beneficial owners** or failing to follow up discrepancies.
- **Ignoring** the supervisor's guidance and newsletters.`,
    },
  ],
  scenario: {
    title: "Writing the risk assessment for Halden & Co",
    narrative: `Halden & Co is a four-partner practice. Its client base: 220 small companies and sole traders, 15 trusts, 6 property investment companies with overseas owners, and 3 clients who have asked it to handle **client money** for tax payments. It onboards about a third of clients remotely. The practice has no written risk assessment, and the senior partner says *"We know all our clients; we don't need paperwork."*`,
    walkthrough: [
      {
        kind: "table",
        caption: "Outline firm-wide risk assessment",
        head: ["Risk factor", "Observation", "Rating", "Control"],
        rows: [
          ["Clients: small UK owner-managed businesses", "Most are low risk and well known", "Low", "Standard CDD, periodic review"],
          ["Clients: trusts", "15 trusts with complex beneficial ownership", "Medium–High", "Identify settlors, trustees, protectors and beneficiaries; senior sign-off"],
          ["Clients: property companies with overseas owners", "6 clients; foreign beneficial owners; some in higher-risk jurisdictions", "High", "EDD; source of funds and wealth; MLRO sign-off"],
          ["Services: handling client money", "3 clients", "High", "Dedicated client account, authorisation limits, monitoring"],
          ["Delivery channel: remote onboarding", "About a third of new clients", "Medium", "Electronic ID verification; certified copies; check against Companies House"],
        ],
      },
      {
        kind: "md",
        md: `**What to say to the senior partner.** The regulations require a **written, current firm-wide assessment**, regardless of how well the firm knows its clients. Supervisors have fined firms for not having one.

**Next steps.**
1. Approve the assessment at partner level and record the date.
2. Draft **policies** that reflect the high-risk areas (trusts, overseas property companies, client money).
3. Appoint (or confirm) the **MLRO** and a deputy, and record **training** for all staff.
4. Review **existing clients** by risk rating over the next 12 months.
5. **Diary** an annual review and a review whenever services or clients change materially.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "retention-years",
      prompt: "For how many years must CDD and transaction records normally be kept after the end of the business relationship?",
      answer: 5,
      unit: "",
      explain: "Five years.",
      working: "**5 years**.",
    },
    {
      kind: "classify",
      id: "classify-aml-law",
      prompt: "Which piece of law does the requirement come from?",
      categories: ["POCA 2002", "Money Laundering Regulations 2017"],
      items: [
        { text: "The offence of tipping off", answer: 0 },
        { text: "The duty to carry out a firm-wide risk assessment", answer: 1 },
        { text: "The offence of failing to disclose suspicion in the regulated sector", answer: 0 },
        { text: "The duty to carry out customer due diligence", answer: 1 },
        { text: "The duty to train staff", answer: 1 },
      ],
      explain: "POCA creates offences; the MLRs create the compliance obligations on the regulated sector.",
    },
    {
      kind: "mcq",
      id: "mcq-supervisor",
      prompt: "A bookkeeping practice is not a member of a professional body that supervises AML. Where must it register?",
      options: ["Companies House", "HMRC as an accountancy service provider", "The ICO", "The FCA"],
      answer: 1,
      explain: "HMRC supervises accountancy service providers that have no professional body supervisor.",
    },
    {
      kind: "multi",
      id: "multi-risk-factors",
      prompt: "Which are factors to consider in the firm-wide risk assessment? Select all that apply.",
      options: [
        "Types of client and their structures",
        "Countries and areas where clients or owners are located",
        "The firm's services, such as company formation or holding client money",
        "How clients are onboarded (face-to-face or remotely)",
      ],
      answers: [0, 1, 2, 3],
      explain: "All four are standard risk assessment factors.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-year",
      prompt: "When did the Money Laundering Regulations 2017 come into force?",
      options: ["2007", "2015", "26 June 2017", "2020"],
      answer: 2,
      explain: "26 June 2017.",
    },
    {
      kind: "mcq",
      id: "q-mlro",
      prompt: "Who receives internal reports of suspicion in a practice?",
      options: ["The client", "The nominated officer (MLRO)", "HMRC directly", "The ICO"],
      answer: 1,
      explain: "The MLRO receives internal reports and decides on an external report to the NCA.",
    },
    {
      kind: "mcq",
      id: "q-risk-form",
      prompt: "The firm-wide risk assessment must be…",
      options: ["Verbal", "In writing and kept up to date", "Done by the client", "Filed at Companies House"],
      answer: 1,
      explain: "Written, current and available to the supervisor.",
    },
    {
      kind: "mcq",
      id: "q-amlgas",
      prompt: "AMLGAS is…",
      options: ["A tax relief", "HM Treasury approved AML guidance for the accountancy sector", "A software package", "An HMRC penalty"],
      answer: 1,
      explain: "The CCAB's guidance approved by HM Treasury.",
    },
    {
      kind: "mcq",
      id: "q-existing",
      prompt: "Do CDD requirements apply to existing clients?",
      options: ["No", "Yes, on a risk-sensitive basis", "Only if they are companies", "Only if they pay in cash"],
      answer: 1,
      explain: "Existing clients must be brought up to standard when appropriate on a risk basis.",
    },
  ],
  sources: [
    { label: "UK law and guidance on anti-money laundering – ICAEW", url: "https://www.icaew.com/technical/trust-and-ethics/anti-money-laundering/uk-law-and-guidance" },
    { label: "Money Laundering Regulations 2017 – ICAEW", url: "https://www.icaew.com/technical/trust-and-ethics/anti-money-laundering/uk-law-and-guidance/money-laundering-regulations-2017" },
    { label: "Responsibilities and obligations of an ICAEW member firm – AML", url: "https://www.icaew.com/technical/trust-and-ethics/anti-money-laundering/responsibilities-and-obligations-of-an-icaew-member-firm" },
    { label: "ECSH21500 – the Money Laundering Regulations 2017 (HMRC Economic Crime Supervision Handbook)", url: "https://www.gov.uk/hmrc-internal-manuals/economic-crime-supervision-handbook/ecsh21500" },
    { label: "Money Laundering Regulations 2017 – legislation.gov.uk", url: "https://www.legislation.gov.uk/uksi/2017/692/contents" },
  ],
};
