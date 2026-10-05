import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "employment-status-tests-employed-or-self-employed",
  title: "Employment status: employed or self-employed?",
  level: "foundation",
  minutes: 35,
  summary:
    "The legal tests that separate employment from self-employment for tax and National Insurance: personal service, control and mutuality of obligation, the multiple factor analysis, and what the leading cases (Ready Mixed Concrete, Autoclenz, PGMOL) tell you in practice.",
  objectives: [
    "Explain the three irreducible minimum conditions for a contract of employment",
    "Apply the Ready Mixed Concrete three-stage approach to a set of facts",
    "List the main factors that point towards employment or self-employment and weigh them",
    "Explain why the written contract does not decide status by itself (Autoclenz)",
    "Summarise what PGMOL v HMRC added and what it did not change",
  ],
  body: [
    {
      kind: "md",
      md: `Whether someone is **employed** or **self-employed** decides which tax and NIC rules apply: PAYE and Class 1 NIC for employees, Self Assessment with Class 2/Class 4 for the self-employed. It matters for your clients in three ways: **their own** status (a director's contract, a contractor), **their staff** (is the part-timer really self-employed?), and **the IR35 rules**, which ask the status question hypothetically. This lesson covers the foundation test; the rest of the track builds on it.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Ready Mixed Concrete: the three-stage test",
      md: `*Ready Mixed Concrete (South East) Ltd v Minister of Pensions and National Insurance* [1968] 2 QB 497 sets out three questions for a contract of service:

1. Does the worker agree, in return for pay, to provide **their own work and skill** to the other party? (**personal service**: an unfettered right to send a substitute points away from employment)
2. Does the worker agree, expressly or impliedly, to be subject to the other party's **control** in a sufficient degree? (control over **what**, **how**, **when** and **where**, or at least a **framework** of control)
3. Are the **other provisions** of the contract consistent with it being a contract of employment?

Stages 1 and 2 (together with **mutuality of obligation**: an obligation to provide work and an obligation to do it) are **necessary** but not sufficient. If they're met, stage 3 is an **overall assessment** of all the facts.`,
    },
    {
      kind: "table",
      caption: "Factors that point one way or the other (no single factor decides)",
      head: ["Factor", "Points to employment", "Points to self-employment"],
      rows: [
        ["Personal service", "Must do the work personally", "Free to send a substitute (a genuine, unfettered right) or hire helpers"],
        ["Control", "Told what, how, when and where; subject to the client's rules and discipline", "Decides how the job is done; works to a brief or specification"],
        ["Mutuality of obligation", "Client must offer work; worker must accept it (a continuing obligation)", "Each job is separate; no duty to offer or accept further work"],
        ["Financial risk", "Paid by the hour or day regardless of results; no risk of loss", "Prices jobs, bears costs, can make a profit or loss; may need to correct faulty work at own cost"],
        ["Equipment", "Client provides tools and equipment", "Supplies own significant equipment"],
        ["Part and parcel of the organisation", "Integrated: line management, uniform, company email, team meetings", "Stands apart, serves several customers, own brand"],
        ["Exclusivity and duration", "One client for a long period", "Several clients, finite projects"],
        ["Benefits", "Holiday pay, sick pay, pension, bonuses", "None"],
        ["Label", "'Employee' in the contract (not decisive)", "'Self-employed contractor' (not decisive)"],
      ],
    },
    {
      kind: "md",
      md: `### Substance over label

The courts look at the **reality** of the relationship, not just the paperwork. In ***Autoclenz Ltd v Belcher*** [2011] UKSC 41 the Supreme Court said that where the written terms don't reflect what the parties actually agreed and did, the court should find the **true agreement**, taking account of the relative bargaining power of the parties. A substitution clause nobody uses, or a "no obligation to provide work" clause that doesn't match reality, will be disregarded.

### PGMOL v HMRC

*Professional Game Match Officials Ltd v HMRC* [2024] UKSC 29 concerned Select Group referees. The Supreme Court held that **mutuality of obligation and control were present in each individual match engagement**: the framework of obligations, code of conduct, assessments and sanctions gave sufficient control, even though PGMOL did not tell referees how to apply the laws of the game. But those two conditions are necessary, not sufficient. The case was sent back to the First-tier Tribunal for the **overall assessment**, which (as reported) concluded in 2026 that the referees were **not employees**, and HMRC has said it will not appeal. Lessons: (1) don't conclude "no control" or "no mutuality" too quickly; (2) always finish with the **multi-factor assessment**; (3) "control" is wider than directing every action.`,
    },
    {
      kind: "md",
      md: `### Atholl House: no presumption of employment

*HMRC v Atholl House Productions Ltd* [2022] EWCA Civ 501 concerned the presenter Kaye Adams, whose company supplied her services to the BBC for a Radio Scotland programme. HMRC argued that once mutuality of obligation and control were found, the answer was effectively employment unless something pointed the other way. The Court of Appeal **rejected that approach**: the assessment is a **wide, multi-factorial** one, and a person who is genuinely **in business on their own account** (the *Hall v Lorimer* idea) can fall outside employment even where there is personal service and some control. HMRC lost on its main ground. Take from it that you must **weigh all the factors**, not stop at the two threshold conditions.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Three different 'status' questions",
      md: `Don't mix these up:
- **Tax and NIC** status: employee or self-employed (this track).
- **Employment rights** status: employee, "worker" (limb (b)) or self-employed. A "worker" has some rights (holiday pay, minimum wage) but is **not** an employee for PAYE.
- **VAT and CIS** status: different tests (CIS has its own contractor/subcontractor rules).

A person can be **self-employed for tax** and still a "worker" for employment rights (*Uber BV v Aslam* [2021] UKSC 5 involved the latter).`,
    },
  ],
  scenario: {
    title: "Three status queries in one week",
    narrative: `A practice receives three questions:

**1. Rob**, a plumber, works for Ashwell Homes Ltd on three-month site jobs. He uses his own van and tools, quotes a fixed price, is VAT-registered, works for two other builders, and must fix defective work at his own cost.

**2. Dina**, an IT specialist, has worked 4 days a week for a bank for 2 years through her own limited company. Her contract lets her send a substitute but the bank must approve them. She works on the bank's laptop, follows the project manager's daily priorities, and is paid a day rate.

**3. Josh** helps in a friend's café three mornings a week for £14 an hour, using the café's equipment. The café sets the rota, and he could swap shifts with other staff but not send an outsider.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Rob.** Personal service is not the issue; the **financial risk** (fixed price, fixing defects at his cost), **own equipment**, **multiple clients** and VAT registration all point strongly to **self-employment**. Control: the client specifies the outcome but not how he works. Conclusion: self-employed.

**Dina.** Stage 1 (personal service): the substitution right is **fettered** (the bank must approve the substitute), so it points toward personal service. Stage 2 (control): the project manager sets daily priorities; the bank's laptop; integration into the team. Mutuality: she is engaged for a defined period and paid daily. **Financial risk** is low. Taken together, these facts point towards **employment**. If the contract is with a PSC, the **IR35 rules** will ask whether she would be an employee of the bank if she contracted directly. See the rest of this track.

**Josh.** Paid hourly, café's equipment, rota set by the café, no substitution outside staff, no financial risk: he is an **employee** of the café; PAYE applies (and the National Minimum or Living Wage rules). The "friend" label does not change that.

**What to write on the file.** For each, record the facts you relied on, the date and who gave them; status is a judgement that can change when the working practices change.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-status-factors",
      prompt: "Which way does each factor point (taken alone)?",
      categories: ["Towards employment", "Towards self-employment"],
      items: [
        { text: "Paid a fixed hourly rate whatever the result", answer: 0 },
        { text: "Must correct defective work at own cost", answer: 1 },
        { text: "Supplies expensive specialist equipment", answer: 1 },
        { text: "Told by the client what hours to work and where", answer: 0 },
        { text: "Has a real, unfettered right to send a substitute", answer: 1 },
        { text: "Receives paid holiday and sick pay", answer: 0 },
      ],
      explain: "Each factor is one piece of evidence, and the final answer comes from weighing them all.",
    },
    {
      kind: "mcq",
      id: "mcq-rmc",
      prompt: "In Ready Mixed Concrete, which conditions are necessary but not sufficient for a contract of employment?",
      options: ["Personal service and control (with mutuality of obligation)", "Holiday pay and sick pay", "A written contract", "Payment through PAYE"],
      answer: 0,
      explain: "Personal service, mutuality and control are the irreducible minimum. The overall picture then decides.",
    },
    {
      kind: "mcq",
      id: "mcq-autoclenz",
      prompt: "A contract says a worker may send any substitute at will, but in practice everyone does the work personally. What will a tribunal do?",
      options: ["Follow the written clause", "Look at the reality and treat the clause as not reflecting the true agreement", "Ask HMRC to decide", "Treat the worker as self-employed automatically"],
      answer: 1,
      explain: "Autoclenz: the court looks for the true agreement, not the label.",
    },
    {
      kind: "multi",
      id: "multi-pgmol",
      prompt: "Which statements fairly describe PGMOL v HMRC [2024] UKSC 29? Select all that apply.",
      options: [
        "The Supreme Court found mutuality and control present in each match engagement",
        "It held that control means telling a worker precisely how to do the job",
        "The case was returned to the First-tier Tribunal for the overall assessment",
        "It ruled that all referees are employees",
      ],
      answers: [0, 2],
      explain: "Control can be a framework (code of conduct, assessments, sanctions) rather than detailed direction, and the final overall assessment was left to the tribunal.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-mutuality",
      prompt: "Mutuality of obligation means…",
      options: ["An obligation to provide work and an obligation to do it", "The parties like each other", "Equal pay", "Joint ownership of equipment"],
      answer: 0,
      explain: "A continuing obligation on both sides in the relevant engagement.",
    },
    {
      kind: "mcq",
      id: "q-label",
      prompt: "Does a contract headed 'self-employed contractor' decide status?",
      options: ["Yes", "No: the reality of the working relationship decides", "Only if signed", "Only if HMRC agrees"],
      answer: 1,
      explain: "Labels aren't decisive.",
    },
    {
      kind: "mcq",
      id: "q-case",
      prompt: "Which case sets out the three-stage test for a contract of service?",
      options: ["Ready Mixed Concrete [1968]", "Aslam [2021]", "Sequana [2022]", "Jones v Garnett [2007]"],
      answer: 0,
      explain: "Ready Mixed Concrete (South East) Ltd v Minister of Pensions and National Insurance.",
    },
    {
      kind: "mcq",
      id: "q-risk",
      prompt: "Which fact most strongly points to self-employment?",
      options: ["Paid by the hour", "Bears the risk of loss and fixes defects at own cost", "Uses the client's equipment", "Works a fixed rota"],
      answer: 1,
      explain: "Financial risk is a strong indicator of being in business on one's own account.",
    },
    {
      kind: "mcq",
      id: "q-worker",
      prompt: "A 'worker' (limb (b)) for employment rights purposes is…",
      options: ["Always an employee for PAYE", "Not necessarily an employee for tax", "Always self-employed", "Always a director"],
      answer: 1,
      explain: "Employment-rights status and tax status are different questions.",
    },
  ],
  sources: [
    { label: "Check employment status for tax – GOV.UK", url: "https://www.gov.uk/guidance/check-employment-status-for-tax" },
    { label: "ESM0518 – right of control", url: "https://www.gov.uk/hmrc-internal-manuals/employment-status-manual/esm0518" },
    { label: "ESM0526 – control over how the work is done", url: "https://www.gov.uk/hmrc-internal-manuals/employment-status-manual/esm0526" },
    { label: "PGMOL v HMRC [2024] UKSC 29", url: "https://www.bailii.org/uk/cases/UKSC/2024/29.html" },
    { label: "Autoclenz Ltd v Belcher [2011] UKSC 41", url: "https://www.bailii.org/uk/cases/UKSC/2011/41.html" },
    { label: "HMRC v Atholl House Productions Ltd [2022] EWCA Civ 501", url: "https://www.bailii.org/ew/cases/EWCA/Civ/2022/501.html" },
  ],
};
