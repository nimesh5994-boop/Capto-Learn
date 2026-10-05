import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "ethics-fundamental-principles-conflicts-and-confidentiality",
  title: "Professional ethics: the fundamental principles, conflicts and confidentiality",
  level: "foundation",
  minutes: 35,
  summary:
    "The five fundamental principles of professional ethics, the threats to compliance (self-interest, self-review, advocacy, familiarity, intimidation), how to identify and manage conflicts of interest, and the duty of confidentiality with its permitted disclosures.",
  objectives: [
    "State the five fundamental principles and give an example of each in practice",
    "Identify the five categories of threat and appropriate safeguards",
    "Manage a conflict of interest using disclosure, consent and safeguards, or decline the work",
    "Explain the duty of confidentiality and the circumstances in which disclosure is permitted or required",
    "Apply the principles to a realistic dilemma and record the decision",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Professional accountants are bound by **codes of ethics** issued by their professional bodies (ICAEW, ACCA, ATT, AAT, CIOT and others), based on the international **IESBA Code**. The codes work through **principles** rather than detailed rules. When a rule doesn't give the answer, the principles do. The tax-specific standards in **PCRT** (see a later lesson) build on the same principles.`,
    },
    {
      kind: "table",
      caption: "The five fundamental principles",
      head: ["Principle", "What it means", "Practice example"],
      rows: [
        ["Integrity", "Be straightforward and honest in all professional and business relationships", "Don't sign off a return you know contains a false figure"],
        ["Objectivity", "Don't allow bias, conflict of interest or undue influence of others to override professional judgement", "Don't soften a finding because the client is a large fee-payer"],
        ["Professional competence and due care", "Maintain professional knowledge and skill, and act diligently and in accordance with technical and professional standards", "Don't accept a complex trust matter without expertise or supervision"],
        ["Confidentiality", "Respect the confidentiality of information acquired in the course of work; don't disclose or use it without proper authority", "Don't discuss one client's affairs with another"],
        ["Professional behaviour", "Comply with relevant laws and regulations and avoid conduct that discredits the profession", "Don't make misleading marketing claims"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Threats to compliance",
      md: `The conceptual framework asks you to **identify**, **evaluate** and **address** threats to the fundamental principles. The five categories are:

| Threat | Example |
|---|---|
| **Self-interest** | Fee dependency on one client; a financial interest in the client |
| **Self-review** | Preparing accounts and then reviewing your own work for the same engagement |
| **Advocacy** | Promoting a client's position to the point that objectivity is compromised |
| **Familiarity** | A close personal relationship with a client's director making you too trusting |
| **Intimidation** | A client threatening to move the work unless you accept their treatment |

If a threat is **not at an acceptable level**, apply **safeguards** (for example separate teams, second partner review, disclosure, or declining the work). If safeguards can't reduce the threat enough, **decline or withdraw**.`,
    },
    {
      kind: "md",
      md: `### Conflicts of interest

A conflict arises where the interests of **two clients** (or the firm and a client) **diverge**: for example acting for both partners in a business dispute, both buyer and seller, or both a company and its director on a loan. The steps are:

1. **Identify** the conflict at **take-on** and throughout.
2. **Assess** whether it can be managed.
3. **Disclose** to the affected clients (subject to **confidentiality**) and obtain **informed consent**.
4. **Apply safeguards**: separate teams, information barriers, independent review.
5. **Decline or withdraw** if the conflict can't be managed or consent is not given.
6. **Document** the analysis and decision.

### Confidentiality

You must keep information confidential **unless**:

- **Permitted by the client** (consent);
- **Required by law** (for example a SAR, a court order, a statutory information notice);
- **Authorised by law** and **not prohibited** (for example disclosing to protect your own professional interests in defending a claim, or to comply with technical standards or ethics requirements);
- **In the public interest**, where the code and law allow (a narrow exception, take advice before acting).

Don't **use** confidential information for your own or a third party's advantage. Be careful with **social media**, **cloud tools** and **shared offices**.

### When something goes wrong

If you find an **error** in a client's affairs, you must **advise the client** to correct it. If the client refuses and the error is material, **consider ceasing to act** and whether you have any **legal duty** (for example under the AML regime). Don't continue to act as if nothing has happened.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "A decision-making checklist",
      md: `1. What are the **facts** and who is affected?
2. Which **principles** are engaged?
3. What **threats** exist and at what level?
4. What **law and regulation** applies (AML, GDPR, tax)?
5. What are the **options**, and what are the consequences of each?
6. **Consult** (a partner, the ethics helpline, your professional body).
7. **Decide**, act and **document** the reasons.`,
    },
  ],
  scenario: {
    title: "Two clients, one dispute: Rowe Furniture",
    narrative: `Halden & Co prepares the accounts and tax returns for **Rowe Furniture Ltd** (owned 50/50 by brothers **Alan and Barry Rowe**) and also does personal tax returns for **Alan** and **Barry** separately. The brothers fall out. Alan asks Halden to prepare a valuation of the business and a note on Barry's **drawings**, saying he wants to "buy Barry out cheaply". Barry separately asks the firm to advise him on whether to sue Alan for removing money from the company.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: identify the conflict.** The firm is being asked to **act against one client for another** on a matter that overlaps with the firm's existing work. Alan's and Barry's interests are directly adverse.

**Step 2: threats.** **Advocacy** and **objectivity**: advising one brother against the other. **Confidentiality:** the firm holds information about both (personal returns and company records). **Self-interest:** fear of losing fee income.

**Step 3: can it be managed?** In a **direct dispute** between two clients, safeguards such as separate teams are unlikely to be enough, because the firm holds **confidential information about both** and cannot use it for either.

**Step 4: action.**
- **Decline** to advise either brother on the dispute (valuation for the buy-out and any claim against the other).
- Explain to each, **without disclosing** the other's instructions, that the firm **cannot act for either on the dispute** and **recommend independent advisers**.
- Consider whether the firm can continue to act for the **company** (it may need to take instructions from both directors or an independent director) and for each brother's **personal returns**; if the relationship has become untenable, **withdraw** following the **professional clearance** and disengagement rules.
- **Document** the analysis and the decision and keep the information about each brother **confidential**.

**Step 5: AML.** If the allegation that Alan "removed money" suggests possible theft, consider whether the firm has a **suspicion** that needs an internal report to the MLRO. Do not tell either brother.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-threats",
      prompt: "Which category of threat does each situation represent?",
      categories: ["Self-interest", "Self-review", "Advocacy", "Familiarity", "Intimidation"],
      items: [
        { text: "A client accounts for 60% of the firm's fee income", answer: 0 },
        { text: "The firm prepares the accounts and then reviews its own work on the same engagement", answer: 1 },
        { text: "The firm argues strongly for the client's tax position against HMRC and loses its independent judgement", answer: 2 },
        { text: "The reviewing partner is the client director's close friend", answer: 3 },
        { text: "A director threatens to move the work if the firm raises an issue", answer: 4 },
      ],
      explain: "The five threats: self-interest, self-review, advocacy, familiarity and intimidation.",
    },
    {
      kind: "mcq",
      id: "mcq-principles-count",
      prompt: "How many fundamental principles are there?",
      options: ["Three", "Four", "Five", "Seven"],
      answer: 2,
      explain: "Integrity, objectivity, professional competence and due care, confidentiality and professional behaviour.",
    },
    {
      kind: "multi",
      id: "multi-disclosure",
      prompt: "When may confidential client information be disclosed? Select all that apply.",
      options: [
        "With the client's consent",
        "Where required by law (for example a statutory information notice)",
        "To gain a commercial advantage for the firm",
        "In the public interest where the code and law allow, after taking advice",
      ],
      answers: [0, 1, 3],
      explain: "Consent, legal requirement and (narrowly) the public interest. Never for the firm's own advantage.",
    },
    {
      kind: "mcq",
      id: "mcq-conflict-action",
      prompt: "A direct dispute arises between two existing clients and the firm holds confidential information about both. What is the safest course?",
      options: ["Act for the more profitable client", "Decline to act for either on the dispute and recommend independent advice", "Act for both", "Tell each client what the other said"],
      answer: 1,
      explain: "A direct, adverse conflict with confidential information on both sides usually can't be managed.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-integrity",
      prompt: "Integrity means…",
      options: ["Being straightforward and honest", "Being popular", "Always agreeing with the client", "Charging the highest fees"],
      answer: 0,
      explain: "Straightforward and honest dealing.",
    },
    {
      kind: "mcq",
      id: "q-self-review",
      prompt: "Reviewing your own work is a threat of…",
      options: ["Intimidation", "Self-review", "Familiarity", "Advocacy"],
      answer: 1,
      explain: "Self-review.",
    },
    {
      kind: "mcq",
      id: "q-safeguard",
      prompt: "If safeguards can't reduce a threat to an acceptable level, you should…",
      options: ["Proceed anyway", "Decline or withdraw", "Increase fees", "Hide the issue"],
      answer: 1,
      explain: "Decline or withdraw.",
    },
    {
      kind: "mcq",
      id: "q-conf-use",
      prompt: "May you use confidential client information to benefit another client?",
      options: ["Yes", "No", "Only if the information is public", "Only with HMRC's agreement"],
      answer: 1,
      explain: "No, not without authority.",
    },
    {
      kind: "mcq",
      id: "q-error",
      prompt: "You find a material error in a client's return and the client refuses to correct it. What should you consider?",
      options: ["Carrying on as normal", "Ceasing to act and whether any legal duty to report applies", "Telling the neighbours", "Deleting the file"],
      answer: 1,
      explain: "Consider withdrawing and any legal reporting duty (for example AML).",
    },
  ],
  sources: [
    { label: "ICAEW Code of Ethics", url: "https://www.icaew.com/technical/ethics/icaew-code-of-ethics" },
    { label: "ACCA – ethics and the Code of Ethics and Conduct", url: "https://www.accaglobal.com/uk/en/about-us/regulation/ethics.html" },
    { label: "PCRT – ICAEW", url: "https://www.icaew.com/technical/tax/working-in-tax/pcrt" },
    { label: "ATT – Professional conduct in relation to taxation", url: "https://www.att.org.uk/professional-standards/professional-conduct-relation-taxation" },
  ],
};
