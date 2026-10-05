import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "engagement-letters-client-take-on-and-disengagement",
  title: "Engagement letters, client take-on, professional clearance and disengagement",
  level: "practitioner",
  minutes: 35,
  summary:
    "The practice lifecycle for each client: acceptance procedures (AML, ethics, competence, capacity), writing a clear engagement letter, professional clearance from the previous accountant, handling changes of scope, and ending the relationship properly including HMRC authority and records.",
  objectives: [
    "Run an acceptance checklist covering AML, ethics, competence, capacity and fees",
    "Draft the key terms of an engagement letter and explain why each matters",
    "Explain professional clearance and the steps for taking over from another accountant",
    "Manage scope changes and additional work through variation letters",
    "Disengage correctly: notices, HMRC authority, Companies House, records and final fees",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Most professional disputes start with **unclear scope**: *"I thought you were doing my VAT"*, *"You never told me about the deadline"*. A good **acceptance process** and **engagement letter** protect the client (who knows what to expect) and the practice (which knows what it must do). They are also required by the professional bodies and by AML regulation.`,
    },
    {
      kind: "table",
      caption: "Client acceptance checklist",
      head: ["Check", "Why it matters"],
      rows: [
        ["**AML**: CDD, risk rating, PEP and sanctions checks", "Required by the Money Laundering Regulations before acting"],
        ["**Ethics**: conflicts, independence, threats", "Fundamental principles; possible conflict with existing clients"],
        ["**Competence and capacity**: do we have the skills, systems and staff?", "Professional competence and due care"],
        ["**Integrity of the client**: reputation, adverse media, attitude to tax", "Reduces risk of being associated with wrongdoing"],
        ["**Previous adviser**: professional clearance", "Ethical courtesy and information about problems"],
        ["**Fees and payment terms**", "Avoids later disputes; consider advance payment for higher-risk clients"],
        ["**Data protection**: privacy notice, lawful basis, security", "UK GDPR"],
        ["**Engagement letter signed**", "Scope, responsibilities and terms agreed in writing"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "What an engagement letter should cover",
      md: `- **Parties and services:** exactly what the firm will and will **not** do (for example "preparing the annual accounts and corporation tax return" but **not** "advising on tax planning", or "VAT returns" only if listed).
- **Client responsibilities:** providing **complete and accurate records**, keeping records, responding in time, and responsibility for the **content** of returns signed by the client or directors.
- **Firm's responsibilities** and **standards** (the professional body's code and any standard terms).
- **Fees:** basis, billing, payment terms, interest, and the right to **suspend** or **withdraw** for non-payment.
- **Timescales and deadlines**: the firm will meet statutory deadlines only if the client provides information by agreed dates.
- **Confidentiality, data protection and AML:** disclosure that the firm may be required by law to report suspicion **without telling the client**; privacy information.
- **Authority for HMRC and Companies House dealings** (agent authorisation) and **MTD** arrangements.
- **Liability:** any **limitation** must be reasonable (professional bodies and consumer/contract law constrain what you can exclude); **complaints procedure** and referral rights; **governing law**.
- **Termination** and **record retention**.

Use **standard terms** from the professional body, tailored to the client.`,
    },
    {
      kind: "md",
      md: `### Professional clearance

Before accepting an appointment from a **new client who has used another accountant**, ask the client for **permission to contact the previous accountant** and then write to them (the **professional clearance** letter) asking whether there is any **professional reason** why you should not accept, and for the information they need to give you. In practice:

- If the client **refuses permission**, treat that as a **warning sign** and consider declining.
- The outgoing accountant should **reply promptly** and may disclose relevant information **with the client's consent** (or where legally required).
- If there is **no reply** after a reasonable time, you may proceed with caution, and record the steps taken.
- The outgoing accountant should **hand over** records and information the client is entitled to, and may have a **lien** over documents they own (a professional lien on client's papers has limits); don't use it to hold up statutory deadlines.

### Variations and additional work

Don't let work **creep**. When the client asks for something outside the letter (a new VAT registration, a one-off CGT computation), **confirm in writing**: the scope, the fee and the deadline, preferably via a **variation letter** or email recorded on the file.

### Disengagement

1. **Decide** and **document** why (non-payment, conflict, AML, loss of trust, client's choice).
2. **Write** a clear **disengagement letter**: effective date, outstanding work and deadlines, what the client needs to do and the fees due.
3. **Remove HMRC authority**: cancel the agent authorisation (and the agent services account link) and tell the client to appoint someone else; **update Companies House** where you are the registered agent or have authentication codes, and return **authentication codes** if requested.
4. **Return** client records and documents on request.
5. **Keep** your own working papers, AML records (five years from the end of the relationship) and the disengagement correspondence.
6. If you **withdraw because of an AML issue**, don't give reasons that tip off the client (see the SAR lesson); follow the MLRO's advice.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common problems",
      md: `- **Signed letter never obtained.** Work starts on an email "yes".
- **Scope in the letter doesn't match** what the firm actually does (for example a "bookkeeping only" client for whom the firm files the VAT return).
- **No review** of the letter after a change of services or legislation.
- **Taking over without clearance** and inheriting unknown problems.
- **Keeping HMRC authority live** after leaving, which can leave the firm exposed and the client unprotected.`,
    },
  ],
  scenario: {
    title: "Taking over Carter & Webb Joinery",
    narrative: `A new client, **Carter & Webb Joinery Ltd**, wants Halden & Co to take over its accounts, corporation tax, VAT and payroll from **Ledger Right**, a small practice. The director says *"Don't bother contacting them, we've had a falling out."* The previous accountant has not filed the last two VAT returns on time. The director also asks for tax planning advice on extracting profits in the first meeting.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: clearance.** Explain that **professional clearance** is a standard requirement and ask the director's **permission** to contact Ledger Right. Refusal is a red flag. If given, send the clearance letter and ask for any reasons not to accept and for handover information (records, deadlines, outstanding issues).

**Step 2: acceptance checks.** CDD and risk rating (company, beneficial owners); **ethics** (any conflict?); **competence** (payroll and VAT capacity); and an assessment of the **late VAT returns** (potential penalty points and the compliance history).

**Step 3: engagement letter.** List the services: accounts, corporation tax, VAT returns, payroll. State whether **tax planning** is included (probably a separate, scoped piece of work). Set **information deadlines** and **fees**. Include **AML and data protection** wording and **agent authorisation** (HMRC 64-8 or digital handshake).

**Step 4: variation.** Treat the tax planning request as an **additional engagement** with its own letter and PCRT standards (see the next lesson).

**Step 5: HMRC authority.** Ask the client to authorise the firm and make sure Ledger Right's authorisation is **removed** so there is one agent on each service.

**Step 6: file.** Record clearance, CDD, risk assessment, the letter and the opening position on VAT and payroll.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-take-on",
      prompt: "Is the item part of the acceptance process?",
      categories: ["Acceptance step", "Not an acceptance step"],
      items: [
        { text: "Customer due diligence and risk rating", answer: 0 },
        { text: "Writing to the previous accountant for professional clearance", answer: 0 },
        { text: "Preparing the client's first corporation tax return", answer: 1 },
        { text: "Issuing a signed engagement letter", answer: 0 },
        { text: "Checking for conflicts of interest", answer: 0 },
      ],
      explain: "Acceptance happens before the first piece of work.",
    },
    {
      kind: "mcq",
      id: "mcq-refuse-clearance",
      prompt: "A prospective client refuses to let you contact their previous accountant. What is the appropriate response?",
      options: ["Accept without question", "Treat it as a warning sign and consider declining", "Contact them anyway", "Charge a higher fee"],
      answer: 1,
      explain: "Refusal of permission is a red flag.",
    },
    {
      kind: "mcq",
      id: "mcq-scope",
      prompt: "A client asks for extra work outside the engagement letter. What should you do?",
      options: ["Do it informally", "Confirm the scope, fee and deadline in writing (a variation letter or email)", "Ignore it", "Do it free of charge"],
      answer: 1,
      explain: "Document scope changes in writing.",
    },
    {
      kind: "numeric",
      id: "retention",
      prompt: "AML records must be kept for how many years after the end of the business relationship?",
      answer: 5,
      unit: "",
      explain: "Five years.",
      working: "**5 years**.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-letter",
      prompt: "Why is the engagement letter important?",
      options: ["It sets out scope and responsibilities and reduces disputes", "It's a marketing brochure", "HMRC requires it for all clients", "It replaces CDD"],
      answer: 0,
      explain: "It defines the relationship.",
    },
    {
      kind: "mcq",
      id: "q-clearance",
      prompt: "Professional clearance is…",
      options: ["A tax clearance", "Asking the previous accountant if there is any reason not to accept the appointment", "A VAT check", "A DBS check"],
      answer: 1,
      explain: "A courtesy and risk check.",
    },
    {
      kind: "mcq",
      id: "q-disengage",
      prompt: "When ceasing to act, what should be removed?",
      options: ["Nothing", "HMRC agent authority", "The client's company", "The client's bank account"],
      answer: 1,
      explain: "Cancel the agent authorisation.",
    },
    {
      kind: "mcq",
      id: "q-liability",
      prompt: "A limitation of liability clause in the engagement letter must be…",
      options: ["Unlimited", "Reasonable and consistent with professional and legal requirements", "Hidden", "Verbal"],
      answer: 1,
      explain: "Exclusions must be reasonable.",
    },
    {
      kind: "mcq",
      id: "q-deadlines",
      prompt: "The firm will meet deadlines provided…",
      options: ["The client supplies complete information by the agreed dates", "HMRC is kind", "The client pays in advance", "It's not the busy season"],
      answer: 0,
      explain: "State information deadlines in the letter.",
    },
  ],
  sources: [
    { label: "ICAEW Code of Ethics", url: "https://www.icaew.com/technical/ethics/icaew-code-of-ethics" },
    { label: "ICAEW – anti-money laundering for member firms", url: "https://www.icaew.com/technical/trust-and-ethics/anti-money-laundering/responsibilities-and-obligations-of-an-icaew-member-firm" },
    { label: "Tax Agent's Handbook – GOV.UK", url: "https://www.gov.uk/guidance/tax-agents-handbook/online-services-for-agents" },
  ],
};
