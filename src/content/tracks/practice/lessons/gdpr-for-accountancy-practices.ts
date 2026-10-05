import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "gdpr-for-accountancy-practices",
  title: "UK GDPR for accountancy practices: roles, lawful bases, rights and breaches",
  level: "practitioner",
  minutes: 35,
  summary:
    "How the UK GDPR and Data Protection Act 2018 apply to a practice: controller and processor roles, lawful bases for client data, privacy notices, data subject rights and the one-month deadline, personal data breaches and the 72-hour rule, retention, security and suppliers.",
  objectives: [
    "Identify when the practice is a controller and when a processor",
    "Choose and record a lawful basis for the main types of processing in a practice",
    "Respond to a data subject access request within the time limit",
    "Handle a personal data breach, including the 72-hour notification test",
    "Set a sensible retention policy and manage security and supplier risk",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Accountancy practices hold some of the most **sensitive personal data** their clients have: income, bank details, national insurance numbers, family arrangements and sometimes health or criminal convictions. The **UK GDPR** and the **Data Protection Act 2018** apply, and the **Information Commissioner's Office (ICO)** regulates compliance. The rules are principles-based and the same discipline applies whether the practice has two staff or two hundred.`,
    },
    {
      kind: "table",
      caption: "Controller or processor?",
      head: ["Activity", "Typical role of the practice", "Why"],
      rows: [
        ["Preparing a client's accounts and tax returns using the practice's own judgement", "**Controller** (often joint or independent)", "The practice decides how to process the data to meet its professional obligations"],
        ["Running payroll for a client under the client's instructions", "**Processor** for the client's employee data (the client is controller)", "The practice acts on the client's instructions, so a **written contract** (data processing terms) is needed"],
        ["Holding its own staff and HR data", "**Controller**", "The practice decides the purposes"],
        ["Cloud software provider hosting client data on the practice's behalf", "The provider is a **processor** for the practice", "Practice needs **written terms** and due diligence"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Lawful bases and the principles",
      md: `Every processing activity needs a **lawful basis** (Article 6 UK GDPR). The usual ones for practices:

- **Contract**: processing necessary to **perform the engagement** the client has entered into.
- **Legal obligation**: for example AML **customer due diligence** and record keeping, and tax and company law obligations.
- **Legitimate interests**: for example fraud prevention and managing the practice, balanced against individuals' rights.
- **Consent**: only where genuinely optional and freely given (for example marketing emails) and capable of being withdrawn.

For **special category data** (health, trade union membership, etc.) and **criminal offence data** you need an additional condition. The core principles are: **lawfulness, fairness and transparency; purpose limitation; data minimisation; accuracy; storage limitation; integrity and confidentiality (security); and accountability**.`,
    },
    {
      kind: "md",
      md: `### Transparency: privacy notices

Give people a clear **privacy notice** (usually in the engagement letter and on the website) saying **who you are, what data you collect, why, the lawful basis, who you share it with (HMRC, Companies House, software providers), how long you keep it and their rights**. The AML regime may require you to process data without telling the client of a SAR, and the privacy notice should explain generally that data may be used for **legal obligations** without detailing reporting.

### Data subject rights and requests

Individuals have rights to **be informed, access, rectify, erase, restrict, object and data portability** (where applicable). The most common is a **subject access request (DSAR)**:

- Respond **without undue delay and within one month** of receipt (extendable by up to **two further months** for complex or numerous requests, with notice).
- **Verify identity**, and ask for clarification only where genuinely needed.
- **Provide copies** of the personal data and the supplementary information required.
- **Exemptions** exist, for example for **legal professional privilege** (rarely for accountants), **confidential references** and **third-party data**; the AML tipping-off rules mean you must **not** disclose that a SAR has been made.
- **Free of charge** in most cases.

### Personal data breaches

A **personal data breach** is a security incident that leads to **accidental or unlawful destruction, loss, alteration, unauthorised disclosure of or access to** personal data. (For example, a lost laptop, an email sent to the wrong client, ransomware.)

1. **Contain** the incident and assess **what data** and **how many people**.
2. **Record** the breach in the firm's breach log (all breaches, even if not reportable).
3. If the breach is **likely to result in a risk to individuals' rights and freedoms**, **notify the ICO without undue delay and within 72 hours** of becoming aware.
4. If there is a **high risk**, also **tell the individuals** affected **without undue delay**.
5. **Learn** from it: fix the cause, retrain.

### Retention, security and suppliers

- **Retention:** keep personal data only as long as needed for the purpose. AML records are kept **five years** after the end of the relationship; tax and accounting files are commonly kept for the period in which HMRC can challenge a return (generally up to 6 years, longer if deliberate behaviour is suspected), and for any longer period needed to defend a claim. Document the policy and **delete securely** at the end of the period.
- **Security:** multi-factor authentication, encryption of laptops and portable media, secure client portals instead of email attachments, patching, access controls, and a tested **backup** and **incident plan**.
- **Suppliers:** carry out **due diligence** on software and cloud suppliers, with **written data processing terms**, and record **international transfers** and their safeguards.
- **ICO fee:** most controllers must **pay a data protection fee** to the ICO each year (the amount depends on size and turnover) unless exempt.
- **Legislative change:** the **Data (Use and Access) Act 2025** amends parts of the UK data protection regime in stages. Check commencement and the ICO's guidance before relying on older wording.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common practice failings",
      md: `- **No privacy notice** or one that doesn't mention AML or HMRC sharing.
- **Emailing** payroll and personal data without encryption or to the wrong recipient.
- **No breach log**, or staff who don't know that a lost phone must be reported internally immediately.
- **Keeping** old files indefinitely.
- **No written terms** with payroll or cloud suppliers.
- Treating **DSAR** deadlines casually.`,
    },
  ],
  scenario: {
    title: "A lost laptop and a subject access request at Halden & Co",
    narrative: `At **3:00 pm on Monday 9 November 2026** a Halden & Co manager realises a firm laptop was stolen from her car. The laptop is **encrypted with a strong password** and had been logged out, but it held offline copies of **payroll files for two clients (about 85 employees)**. Separately, on **10 November 2026** a former employee of a client sends a **subject access request** asking for all personal data the firm holds about him.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Breach.**
1. **Contain:** remote-wipe the laptop if possible, change relevant credentials and tell the **data protection lead**.
2. **Assess:** the data (payroll, NI numbers, salaries) is sensitive; the laptop was **encrypted and logged out**, so the **risk of access is low**, but you can't be sure.
3. **Log** the breach with the facts and the reasoning.
4. **Notify the ICO?** If the risk to individuals is assessed as **unlikely**, notification may not be needed, but the decision and reasoning must be **recorded**. If the firm can't rule out a risk, notify **within 72 hours of awareness**: by **3:00 pm on Thursday 12 November 2026**.
5. **Inform the clients** (the controllers for the payroll data, with the firm as processor) **without undue delay** so they can meet their own duties.

**DSAR.** The request arrived on 10 November 2026. The firm must respond **within one month**, that is by **10 December 2026**, unless it extends by up to two months for complexity and tells him. Steps: verify identity, find the data (the firm may be a **processor** for the client's payroll data, so the correct response may be to **refer** him to the client, the controller, and tell him so), and check for exemptions and third-party data. Make sure nothing in the response would **tip off** a money laundering report.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "breach-hours",
      prompt: "Within how many hours of becoming aware must a reportable personal data breach be notified to the ICO?",
      answer: 72,
      unit: "",
      explain: "72 hours.",
      working: "**72 hours**.",
    },
    {
      kind: "numeric",
      id: "dsar-months",
      prompt: "Within how many months must a subject access request normally be answered (without extension)?",
      answer: 1,
      unit: "months",
      explain: "One month, extendable by up to two further months for complex or numerous requests.",
      working: "**1 month**.",
    },
    {
      kind: "classify",
      id: "classify-lawful-basis",
      prompt: "Which lawful basis is most appropriate?",
      categories: ["Contract", "Legal obligation", "Consent"],
      items: [
        { text: "Preparing a client's tax return under the engagement letter", answer: 0 },
        { text: "Carrying out and keeping AML identity checks", answer: 1 },
        { text: "Sending optional marketing newsletters to a client", answer: 2 },
        { text: "Retaining records required by tax law", answer: 1 },
      ],
      explain: "Contract for performing the engagement; legal obligation for AML and statutory record-keeping; consent for optional marketing.",
    },
    {
      kind: "mcq",
      id: "mcq-payroll-role",
      prompt: "A practice runs payroll for a client on the client's instructions. Its role for the employees' data is…",
      options: ["Controller", "Processor", "Data subject", "Regulator"],
      answer: 1,
      explain: "Processor, with a written contract.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-regulator",
      prompt: "Who regulates data protection in the UK?",
      options: ["HMRC", "The ICO", "The FCA", "Companies House"],
      answer: 1,
      explain: "The Information Commissioner's Office.",
    },
    {
      kind: "mcq",
      id: "q-breach-log",
      prompt: "Which breaches must be recorded in the firm's breach log?",
      options: ["Only those reported to the ICO", "All personal data breaches", "None", "Only cyber breaches"],
      answer: 1,
      explain: "All breaches must be recorded.",
    },
    {
      kind: "mcq",
      id: "q-aml-keep",
      prompt: "AML records are kept for how long after the relationship ends?",
      options: ["1 year", "5 years", "10 years", "Not at all"],
      answer: 1,
      explain: "Five years.",
    },
    {
      kind: "mcq",
      id: "q-ext",
      prompt: "By how long can the DSAR period be extended for complex requests?",
      options: ["One month", "Up to two further months", "Six months", "Not at all"],
      answer: 1,
      explain: "Up to two further months, with notice.",
    },
    {
      kind: "mcq",
      id: "q-processor-terms",
      prompt: "What is needed with a cloud software supplier hosting client data?",
      options: ["Nothing", "Written data processing terms and due diligence", "A verbal promise", "A tax clearance"],
      answer: 1,
      explain: "A written contract with processor terms.",
    },
  ],
  sources: [
    { label: "Data protection and your business – GOV.UK", url: "https://www.gov.uk/data-protection-your-business" },
    { label: "UK GDPR – legislation.gov.uk", url: "https://www.legislation.gov.uk/eur/2016/679/contents" },
    { label: "Data Protection Act 2018 – legislation.gov.uk", url: "https://www.legislation.gov.uk/ukpga/2018/12/contents" },
    { label: "Data (Use and Access) Act 2025 – GOV.UK collection", url: "https://www.gov.uk/government/collections/data-use-and-access-act-2025" },
    { label: "Data protection and GDPR – GOV.UK", url: "https://www.gov.uk/data-protection" },
  ],
};
