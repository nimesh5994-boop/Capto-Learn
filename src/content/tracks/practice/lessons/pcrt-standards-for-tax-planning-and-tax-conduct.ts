import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "pcrt-standards-for-tax-planning-and-tax-conduct",
  title: "PCRT: professional conduct in relation to taxation and the limits of tax planning",
  level: "practitioner",
  minutes: 35,
  summary:
    "How PCRT (effective 1 January 2026) applies the fundamental principles to tax work and sets standards for tax planning, the difference between tax evasion, avoidance and mitigation, the General Anti-Abuse Rule and disclosure of tax avoidance schemes, and what to do when a client wants aggressive planning or won't correct an error.",
  objectives: [
    "Explain what PCRT is, who issues it and the version in force from 1 January 2026",
    "Distinguish tax evasion, tax avoidance and tax mitigation",
    "Apply PCRT's five standards for tax planning: client-specific, lawful, disclosure and transparency, advising on tax planning arrangements, and professional judgement and documentation",
    "Describe the GAAR and the disclosure regime for avoidance schemes at a high level",
    "Handle a client who proposes aggressive planning or refuses to correct an error",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `**Professional Conduct in Relation to Taxation (PCRT)** is the shared standard for tax work issued by **seven professional bodies**: AAT, ACCA, ATT, CIOT, ICAEW, ICAS and STEP. A new version took effect on **1 January 2026**, published on **1 October 2025**, to align with the IESBA's international standard on tax planning and related services. The **structure is unchanged**: the five **fundamental principles** (integrity, objectivity, professional competence and due care, confidentiality, professional behaviour) and **standards for tax planning**. If you hold a membership of one of those bodies, **PCRT applies to all your tax work**, whether or not it is part of your day job.`,
    },
    {
      kind: "table",
      caption: "Evasion, avoidance and mitigation",
      head: ["Term", "Meaning", "Treatment"],
      rows: [
        ["Tax evasion", "**Illegal**: deliberately deceiving HMRC (hiding income, false claims, false records)", "Crime. Never assist. A report to the MLRO may be required"],
        ["Tax avoidance", "Arranging affairs to obtain a tax advantage in a way that the law may not intend; can be **lawful** or **ineffective** depending on the arrangement", "Highly scrutinised: GAAR, disclosure rules, targeted rules; follow PCRT"],
        ["Tax mitigation", "Using reliefs, allowances and options **as Parliament intended** (pension contributions, ISAs, gifts)", "Legitimate planning"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Standards for tax planning (PCRT)",
      md: `PCRT sets **five standards for tax planning**, which build on the fundamental principles:

1. **Client specific**: planning must be specific to the particular client's **facts and circumstances**, and the client must be alerted to the **wider risks** and implications. An off-the-shelf **marketed scheme** sold as a product is unlikely to meet this.
2. **Lawful**: act lawfully and with integrity, and base the planning on a **realistic assessment of the facts** and a **credible view of the law** (a "credible basis"), drawing the client's attention to anti-avoidance rules and any material uncertainty.
3. **Disclosure and transparency**: the advice must not rely for its effectiveness on the tax authority having **less than the relevant facts**, and any disclosure must **fairly represent all relevant facts**.
4. **Advising on tax planning arrangements**: don't create, encourage or promote arrangements that set out to achieve results **contrary to the clear intention of Parliament**, or that are **highly artificial or contrived** and exploit shortcomings in the law.
5. **Professional judgement and appropriate documentation**: apply judgement to the whole picture and **record** the advice given and the reasons for it.

You must also **explain the risks** to the client (including that HMRC may challenge the arrangement and the position may change), **not mislead** HMRC and **not assist** in planning that you know or suspect is evasion. Read the current PCRT text for the full wording of each standard and the supporting guidance.`,
    },
    {
      kind: "md",
      md: `### The GAAR and disclosure rules (high level)

- **General Anti-Abuse Rule (GAAR, Finance Act 2013 Part 5):** counteracts tax advantages from **abusive** arrangements. An arrangement is abusive if entering into or carrying it out **cannot reasonably be regarded as a reasonable course of action** having regard to all the circumstances (the "**double reasonableness**" test). The GAAR Advisory Panel gives opinions.
- **Disclosure of Tax Avoidance Schemes (DOTAS):** promoters (and in some cases users) must **disclose** arrangements with specified **hallmarks** to HMRC, and the promoter issues a **scheme reference number (SRN)** that users must quote on their return. A scheme with an SRN isn't thereby approved by HMRC. Disclosure doesn't mean it works.
- **Promoters and enablers:** there are penalties for **promoting** schemes that are later defeated, and **enablers** of defeated avoidance can be penalised (an amount related to the fees they earned). The professional bodies treat involvement in such schemes as a **serious conduct** risk.

### Dealing with HMRC

- **Don't mislead.** Information given to HMRC must be **accurate and complete** to the best of your knowledge, and you must not **assist** in giving false information.
- **Errors:** if you find that a client's tax return, past or present, is **wrong**, advise the client to **correct** it. If the client **refuses**, you should **consider ceasing to act**. You can't then act in a way that perpetuates the error, and you should consider whether an **AML report** is required.
- **Disclosure of your own opinion:** a client's tax return is the **client's** responsibility, but you must act with **integrity** and not **assist** in a return you know is false.
- **Marketed schemes:** be especially cautious if a scheme **guarantees** a result, requires **confidentiality** from HMRC, relies on **circular money flows** or has no **commercial rationale**.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Red flags in planning proposals",
      md: `- A **headline saving** that looks too good to be true.
- **Promoter pressure** to sign quickly or not tell HMRC or other advisers.
- **Offshore or circular** transactions with no purpose except the tax saving.
- **Contractors paid by "loans"** or "advances" instead of salary (disguised remuneration schemes).
- A **fee** linked to the tax saved with no regard to the risk.
- Documents that **describe the transaction in a way that doesn't match the facts**.`,
    },
  ],
  scenario: {
    title: "A promoter's scheme for Greenfield Logistics",
    narrative: `The director of **Greenfield Logistics Ltd**, Kal Shah, has been approached by a promoter offering a **"remuneration trust"**. The company would pay **£100,000** into an offshore trust, and Kal would receive "loans" of £90,000 that never have to be repaid, with "no tax and no NIC". The promoter says the scheme has an **SRN** and that "HMRC cannot touch it". The promoter charges **15%** of the amount "saved". Kal asks the firm to implement it and to leave the loans off the tax return.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: red flags.** Guaranteed saving, offshore trust, "loans" that never have to be repaid, a fee based on the saving, and a request to **leave the arrangement off the return**.

**Step 2: tax analysis.** Payments to a worker via a trust and "loan" that are really **remuneration** are within the **disguised remuneration** rules and likely to be taxed as **employment income** (PAYE and NIC) when made. An SRN means the scheme was **disclosed**, **not approved**. The GAAR could also apply.

**Step 3: PCRT standards.**
- **Client-specific?** No, it's a marketed product.
- **Lawful and realistic?** The arrangement is unlikely to work as claimed.
- **Disclosure and transparency?** The client wants it hidden from the return. The plan only works if HMRC has less than the relevant facts, which would be **misleading HMRC**.
- **Advising on tax planning arrangements?** Routing pay through a trust as "loans" is highly artificial and goes against Parliament's clear intention for employment income.
- **Professional judgement and documentation?** Record the advice and the reasons for declining in writing.

**Step 4: action.**
- **Decline** to implement the scheme.
- **Advise Kal in writing** of the risks and of the **lawful alternatives**: salary, dividends (see the directors track), employer pension contributions, and a reasonable **bonus**.
- If Kal proceeds anyway and intends to **omit** the arrangement from the return, the firm **must not** assist and should **consider ceasing to act** and **consider an AML report** to the MLRO.
- **Document** the advice and the decision on file.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-evasion-avoidance",
      prompt: "Is the activity tax evasion, avoidance or mitigation?",
      categories: ["Evasion", "Avoidance (scrutinised)", "Mitigation"],
      items: [
        { text: "Omitting cash sales from the accounts", answer: 0 },
        { text: "Paying into a pension to receive tax relief", answer: 2 },
        { text: "A marketed scheme using an offshore trust to pay 'loans' instead of salary", answer: 1 },
        { text: "Using the ISA allowance", answer: 2 },
        { text: "Backdating a document to claim a relief the client wasn't entitled to", answer: 0 },
      ],
      explain: "Evasion is illegal deception; mitigation uses reliefs as intended; avoidance sits between and is closely scrutinised.",
    },
    {
      kind: "mcq",
      id: "mcq-pcrt-date",
      prompt: "When did the latest version of PCRT take effect?",
      options: ["1 January 2020", "1 April 2023", "1 January 2026", "6 April 2027"],
      answer: 2,
      explain: "1 January 2026 (published on 1 October 2025).",
    },
    {
      kind: "mcq",
      id: "mcq-srn",
      prompt: "A scheme has a DOTAS scheme reference number. What does that mean?",
      options: ["HMRC approves it", "The scheme has been disclosed to HMRC; it doesn't mean it works", "It's tax free", "It's exempt from the GAAR"],
      answer: 1,
      explain: "An SRN shows disclosure, not approval.",
    },
    {
      kind: "multi",
      id: "multi-planning-standards",
      prompt: "Which are requirements for tax planning under PCRT? Select all that apply.",
      options: [
        "It should be client-specific",
        "It should be lawful",
        "It must not rely for its effectiveness on HMRC having less than the relevant facts",
        "It should be hidden from HMRC if the saving is large",
        "It should not be highly artificial or contrived, exploiting shortcomings in the law",
      ],
      answers: [0, 1, 2, 4],
      explain: "Client specific, lawful, disclosure and transparency, and the advising on tax planning arrangements standard. The fifth standard is professional judgement and appropriate documentation.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-seven",
      prompt: "How many professional bodies issue PCRT jointly?",
      options: ["Three", "Five", "Seven", "Ten"],
      answer: 2,
      explain: "AAT, ACCA, ATT, CIOT, ICAEW, ICAS and STEP.",
    },
    {
      kind: "mcq",
      id: "q-evasion",
      prompt: "Tax evasion is…",
      options: ["Legal planning", "Illegal: deliberately deceiving the tax authority", "A relief", "A tax return"],
      answer: 1,
      explain: "A crime.",
    },
    {
      kind: "mcq",
      id: "q-gaar",
      prompt: "The GAAR is found in…",
      options: ["Finance Act 2013 Part 5", "TMA 1970", "CTA 2010", "VATA 1994"],
      answer: 0,
      explain: "Finance Act 2013 Part 5.",
    },
    {
      kind: "mcq",
      id: "q-error",
      prompt: "A client refuses to correct a return you now know is wrong. What should you consider?",
      options: ["Carrying on", "Ceasing to act and whether an AML report is needed", "Telling HMRC without the client knowing", "Ignoring it"],
      answer: 1,
      explain: "Consider ceasing to act and your legal duties.",
    },
    {
      kind: "mcq",
      id: "q-marketed",
      prompt: "A scheme sold as an off-the-shelf product with a guaranteed saving is…",
      options: ["Probably client-specific", "A red flag", "Always acceptable", "Exempt from PCRT"],
      answer: 1,
      explain: "Marketed schemes with guarantees are a red flag.",
    },
  ],
  sources: [
    { label: "PCRT – ICAEW (effective 1 January 2026)", url: "https://www.icaew.com/technical/tax/working-in-tax/pcrt" },
    { label: "PCRT update published to reflect new international standards – ACCA", url: "https://www.accaglobal.com/gb/en/news/2025/October/tax-conduct.html" },
    { label: "PCRT effective 1 January 2026 (full text) – ACCA", url: "https://www.accaglobal.com/content/dam/ACCA_Global/Technical/PCRT/PCRT-011025.pdf" },
    { label: "ATT – Professional conduct in relation to taxation", url: "https://www.att.org.uk/professional-standards/professional-conduct-relation-taxation" },
    { label: "Finance Act 2013 Part 5 – General anti-abuse rule", url: "https://www.legislation.gov.uk/ukpga/2013/29/part/5" },
    { label: "Tax Agent's Handbook – GOV.UK", url: "https://www.gov.uk/guidance/tax-agents-handbook/online-services-for-agents" },
  ],
};
