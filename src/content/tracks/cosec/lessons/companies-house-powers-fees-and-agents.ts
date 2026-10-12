import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "companies-house-powers-fees-and-agents",
  title: "Companies House powers, fees and acting as a filing agent",
  level: "advanced",
  minutes: 40,
  summary:
    "The registrar's ECCTA powers to query, reject, annotate and remove information, the financial penalty regime, the current fees schedule, and what it means for a practice to file as an agent and register as an Authorised Corporate Service Provider (ACSP), including what's in force at October 2026 and what's still to come.",
  objectives: [
    "Explain the registrar's objectives and the query, rejection, annotation and removal powers in force since March 2024",
    "Quote the main Companies House fees from the current schedule and cost a month's filings",
    "Describe the ACSP regime: who must register now, the ongoing obligations, and the future filing requirements",
    "Set up good practice controls for filing on clients' behalf",
  ],
  body: [
    {
      kind: "md",
      md: `For most of its history Companies House was a passive registrar: if a form was complete and the fee paid, it went on the register, true or not. The **Economic Crime and Corporate Transparency Act 2023 (ECCTA)** turned it into a gatekeeper. For an accountancy practice that files hundreds of documents a year, this changes how filings are prepared and who in the firm is allowed to submit them.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The registrar's objectives (CA 2006 s1081A, inserted by ECCTA)",
      md: `The registrar must seek to promote:
1. that anyone required to deliver a document does so, and that the requirements are complied with;
2. that information on the register is **accurate** and contains everything it should;
3. that records **don't create a false or misleading impression** to members of the public; and
4. the prevention and detection of **crime** and other unlawful conduct.`,
    },
    {
      kind: "table",
      caption: "ECCTA powers in force since 4 March 2024",
      head: ["Power", "What it means in practice"],
      rows: [
        ["**Query** information", "The registrar can require a person to provide information to check a filing or something already on the register. Failing to comply without reasonable excuse is an offence."],
        ["**Reject** filings", "A filing can be rejected if it appears inconsistent with information already held, or is otherwise suspicious. The company can resubmit once the query is addressed."],
        ["**Annotate** the register", "Companies House can add notes to the register, e.g. that information is under query or appears inaccurate."],
        ["**Remove** material", "Wider powers to remove inaccurate, fraudulent or invalid information, sometimes without an external complaint."],
        ["Stronger **name** checks", "Names intended to facilitate fraud, or that mislead (e.g. suggesting a connection to a foreign government), can be rejected or ordered to change."],
        ["**Registered office** and **email** rules", "The registered office must be an appropriate address (not a PO box). Every company must have a registered email address."],
        ["**Data sharing** and cross-checking", "Information can be shared with law enforcement and other government departments, and checked against other data."],
        ["**Financial penalties**", "Civil penalties of up to £10,000 for Companies Act offences, as an alternative to prosecution."],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Querying is real",
      md: `Companies House reported that in its first year using these powers (March 2024 to March 2025) it queried and removed false or misleading information affecting over **100,000 companies** and rejected over **10,000** suspicious applications. Expect queries where details don't match: a director's date of birth that differs from earlier filings, a PSC whose percentages don't match the statement of capital, a registered office that isn't the company's.`,
    },
    {
      kind: "table",
      caption: "Selected Companies House fees (current schedule, checked October 2026; several fees changed on 1 February 2026)",
      head: ["Filing", "Online / software", "Paper"],
      rows: [
        ["Incorporation", "£100", "£124"],
        ["Same-day incorporation (software)", "£156", "n/a"],
        ["Confirmation statement (first in the payment period)", "£50", "£110"],
        ["Change of name", "£20", "£30"],
        ["Same-day change of name", "£85", "n/a"],
        ["Voluntary strike-off (DS01)", "£13", "£18"],
        ["Registration of a charge", "£14", "£24"],
        ["Administrative restoration (RT01)", "n/a", "£341"],
        ["Officer changes, AD01, SH01, AA01, accounts", "No fee", "No fee"],
      ],
    },
    {
      kind: "md",
      md: `### Filing as an agent today

Most practices file for clients using commercial software or a Companies House online account, using the company's **authentication code**. Good practice:

- **Authority**: have a signed engagement letter covering company secretarial filings, and get the client's approval for each filing that makes a statement on their behalf (confirmation statement, accounts approval, PSC changes).
- **Authentication codes**: treat them like passwords. Store them securely, restrict access, and have a process for when a client leaves. Anyone with the code can file for the company.
- **Registered office and email**: if your firm provides the registered office, have a written agreement and a process for forwarding post; if your mailbox is the registered email address, monitor it.
- **Evidence**: keep the board minute or resolution behind every filing.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Authorised Corporate Service Providers (ACSPs)",
      md: `- ACSP registration opened on **18 March 2025**.
- **Today**, a firm must be an ACSP only if it wants to **verify identities** for Companies House on clients' behalf.
- An ACSP must be **supervised for anti-money laundering** purposes by a UK AML supervisor at all times. Accountancy practices are typically supervised by their professional body or HMRC.
- Ongoing duties: report changes to the ACSP's details within **14 days**, respond to information requests, and keep records of identity checks for **7 years**.
- A sole trader can register as an ACSP.`,
    },
    {
      kind: "md",
      md: `### What's still to come (as at October 2026)

Companies House's **outline transition plan** (updated August 2026) says:

- **No earlier than November 2027**: identity verification of **presenters** (the people who file) becomes compulsory for filing any document, and **third-party agents** filing for companies must be registered **ACSPs**. Companies House has said it will give at least **6 months' notice**. (Some older pages still say "no earlier than November 2026"; the transition plan is the more recent statement.)
- **By no earlier than the end of 2026**: completion of the director and PSC identity verification transition and the start of compliance action; rejection of documents from disqualified directors unless filed by an ACSP for permitted filings.
- **From 1 April 2028**: software-only accounts filing, removal of abridged accounts, profit and loss accounts filed by small and micro companies (with a publication opt-out), and fewer opportunities to shorten an accounting reference period.
- **No date yet**: fuller shareholder information and restrictions on corporate directors.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Get ready now",
      md: `If your firm isn't yet an ACSP, register now: it lets you verify clients' directors and PSCs during the transition (a service clients value), and it will be compulsory for filing in due course. Decide who in the firm will be presenters, and plan for each of them to verify their own identity.`,
    },
  ],
  scenario: {
    title: "A query letter for Fernhill Trading Ltd",
    narrative: `Your firm files for Fernhill Trading Ltd. Last week you submitted its confirmation statement. Today the client forwards an email sent to the company's registered email address: Companies House has **rejected** the CS01 because the PSC information is inconsistent with the shareholder information. The register shows one PSC, Dev Fernando, holding "more than 50% but less than 75%"; the shareholder list you filed shows him with 400 of 1,000 shares.

At the same time the managing partner asks you to cost the firm's Companies House filings for October and to confirm whether the firm needs to be an ACSP to keep filing.`,
    walkthrough: [
      {
        kind: "md",
        md: `**The rejection**

1. **Find the truth.** Check the register of members and the transfer history. It turns out Dev sold 200 shares to a new investor in March, taking him from 60% to 40%. Nobody filed the PSC change.
2. **Fix the underlying record first.** File **PSC04** for Dev (now "more than 25% but not more than 50%"), effective from the transfer date. Check whether the investor (now 20%) is a PSC: no.
3. **Resubmit** the CS01 with consistent information.
4. **Lesson for the firm:** this is precisely the inconsistency the new rejection power targets. Reconcile PSCs to shareholdings before every CS01.

**October's fees**`,
      },
      {
        kind: "table",
        caption: "Planned October filings",
        head: ["Filing", "Number", "Unit fee", "Total"],
        rows: [
          ["Software incorporations", "3", "£100", "£300"],
          ["Same-day incorporation", "1", "£156", "£156"],
          ["Confirmation statements (online, first in period)", "12", "£50", "£600"],
          ["Change of name (standard)", "1", "£20", "£20"],
          ["DS01 strike-off (online)", "2", "£13", "£26"],
          ["AP01 / TM01 / AD01", "9", "£0", "£0"],
          ["**Total**", "", "", "**£1,102**"],
        ],
      },
      {
        kind: "md",
        md: `**The ACSP question.** At October 2026, the firm doesn't have to be an ACSP to file, only to verify identities for clients. The requirement for third-party filers to be ACSPs is planned for no earlier than November 2027, with at least 6 months' notice. Recommend registering now anyway.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "fees-month",
      prompt:
        "Using the current fees schedule, cost these filings: 2 software incorporations, 1 same-day change of name, 5 online confirmation statements (each the first in its payment period), 1 paper confirmation statement, 1 online DS01 and 1 online charge registration.",
      answer: 672,
      unit: "£",
      explain: "Apply the online/software or paper fee for each filing.",
      working: "Incorporations 2 × £100 = £200; same-day name change £85; CS01 online 5 × £50 = £250; CS01 paper £110; DS01 £13; charge £14. Total = £200 + £85 + £250 + £110 + £13 + £14 = **£672**.",
    },
    {
      kind: "classify",
      id: "in-force-or-future",
      prompt: "As at October 2026, is each ECCTA measure in force, or still to come?",
      categories: ["In force", "Still to come"],
      items: [
        { text: "Registrar's power to query information and reject inconsistent filings", answer: 0 },
        { text: "Requirement for every company to have a registered email address", answer: 0 },
        { text: "Third-party agents must be ACSPs in order to file for clients", answer: 1, why: "Planned for no earlier than November 2027." },
        { text: "Identity verification for new directors before appointment", answer: 0, why: "Since 18 November 2025." },
        { text: "Small companies must file a profit and loss account", answer: 1, why: "From 1 April 2028." },
        { text: "ACSP registration for firms that verify identities", answer: 0, why: "Opened 18 March 2025." },
      ],
      explain:
        "The registrar's powers, registered email and lawful purpose (March 2024), ACSP registration (March 2025) and director/PSC identity verification (November 2025) are in force. Presenter verification and ACSP-only filing, and the 2028 accounts changes, are still to come.",
    },
    {
      kind: "multi",
      id: "acsp-duties",
      prompt: "Which are ongoing obligations of a registered ACSP? Select all that apply.",
      options: [
        "Remain supervised by a UK anti-money laundering supervisor",
        "Report changes to its details within 14 days",
        "Keep records of identity checks for 7 years",
        "File every client's accounts within 6 months",
        "Act as registered office for all its clients",
      ],
      answers: [0, 1, 2],
      explain: "AML supervision, reporting changes within 14 days and 7-year record keeping for verification checks are ACSP duties. The others are not.",
    },
    {
      kind: "mcq",
      id: "rejection-response",
      prompt: "Companies House rejects a filing because it is inconsistent with information already on the register. What should you do?",
      options: [
        "Resubmit the same filing immediately",
        "Find which record is wrong, correct the underlying information with the right filing, then resubmit",
        "Ask the client to phone Companies House",
        "Wait for the registrar to correct the register",
      ],
      answer: 1,
      explain: "A rejected filing can be resubmitted once the query is addressed. Resubmitting unchanged will simply be rejected again.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-powers-date",
      prompt: "From what date could Companies House query and reject filings under its new ECCTA powers?",
      options: ["1 October 2023", "4 March 2024", "18 November 2025", "1 April 2028"],
      answer: 1,
      explain: "The first wave of ECCTA measures, including the query and rejection powers, began on 4 March 2024.",
    },
    {
      kind: "mcq",
      id: "q-penalty-max",
      prompt: "What is the maximum civil financial penalty Companies House can impose for a Companies Act offence?",
      options: ["£1,000", "£5,000", "£10,000", "£25,000"],
      answer: 2,
      explain: "Up to £10,000, as an alternative to prosecution.",
    },
    {
      kind: "mcq",
      id: "q-acsp-now",
      prompt: "In October 2026, which firms must be registered ACSPs?",
      options: [
        "Every firm that files anything at Companies House for a client",
        "Only firms that want to verify identities for Companies House on clients' behalf",
        "Only firms that provide registered office services",
        "Only audit firms",
      ],
      answer: 1,
      explain: "For now, only agents that verify identities must register. ACSP status for all third-party filers is a later phase.",
    },
    {
      kind: "mcq",
      id: "q-fee-name",
      prompt: "What is the fee for a standard online change of company name?",
      options: ["£8", "£20", "£50", "£85"],
      answer: 1,
      explain: "£20 online (£30 paper); same-day is £85.",
    },
    {
      kind: "mcq",
      id: "q-presenter",
      prompt: "According to Companies House's August 2026 transition plan, when will identity verification for presenters become compulsory?",
      options: ["It already is", "No earlier than November 2027, with at least 6 months' notice", "1 April 2026", "Never — it was dropped"],
      answer: 1,
      explain: "The transition plan puts presenter verification and ACSP-only third-party filing at no earlier than November 2027.",
    },
  ],
  sources: [
    { label: "ECCTA outline transition plan for Companies House", url: "https://www.gov.uk/government/publications/economic-crime-and-corporate-transparency-act-outline-transition-plan-for-companies-house/economic-crime-and-corporate-transparency-act-outline-transition-plan-for-companies-house" },
    { label: "ECCTA factsheet: the role and powers of the Registrar of Companies", url: "https://www.gov.uk/government/publications/economic-crime-and-corporate-transparency-act-2023-factsheets/economic-crime-and-corporate-transparency-act-the-role-and-powers-of-the-registrar-of-companies" },
    { label: "Companies House fees", url: "https://www.gov.uk/government/publications/companies-house-fees/companies-house-fees" },
    { label: "Being an Authorised Corporate Service Provider (ACSP)", url: "https://www.gov.uk/guidance/being-an-authorised-corporate-service-provider" },
    { label: "Companies House approach to financial penalties", url: "https://www.gov.uk/government/publications/companies-house-approach-to-financial-penalties/companies-house-approach-to-financial-penalties" },
    { label: "Companies Act 2006 s1081A – registrar's objectives", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/1081A" },
  ],
};
