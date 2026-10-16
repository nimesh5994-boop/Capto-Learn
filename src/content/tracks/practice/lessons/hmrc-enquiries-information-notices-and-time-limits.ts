import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "hmrc-enquiries-information-notices-and-time-limits",
  title: "HMRC enquiries, information notices and assessment time limits",
  level: "practitioner",
  minutes: 40,
  summary:
    "How HMRC checks returns: enquiry windows, information notices under Schedule 36 FA 2008, discovery assessments and the 4-, 6- and 20-year time limits, closure notices, and how a practice should respond to a compliance check while protecting the client and itself.",
  objectives: [
    "Identify the enquiry window for a return and what an enquiry can cover",
    "Describe information notices, the taxpayer's rights and the penalties for non-compliance",
    "Apply the 4/6/20-year discovery assessment time limits to an example",
    "Plan the response to an HMRC enquiry letter and the evidence to gather",
    "Explain when an enquiry ends and the options for resolving or appealing the outcome",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `HMRC has two main ways of challenging a past return: an **enquiry** into the return (opened within a short **window**) and a **discovery assessment** (opened later, within **time limits** that depend on the taxpayer's behaviour). Either begins with a letter to the taxpayer **or to the agent**, and the response in the first few weeks usually decides how the case unfolds.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Enquiry windows",
      md: `- **Self Assessment (individuals, partnerships, trusts):** HMRC has the right to open an enquiry within **12 months after the date the return was delivered**, if it was filed on time (TMA 1970 s9A; HMRC Enquiry Manual EM1506). If filed late, the window runs to the **quarter day (31 January, 30 April, 31 July or 31 October)** next following the first anniversary of the date it was delivered.
- **Company Tax Returns:** an enquiry window of **12 months after the date the return was delivered** (FA 1998 Sch 18 para 24), with similar rules for late filing.
- An enquiry can be a **full enquiry** (into everything on the return) or limited to an **aspect** (a particular claim or figure).
- The enquiry **ends** when HMRC issues a **closure notice** stating its conclusions. The taxpayer may ask the **First-tier Tribunal** to direct HMRC to close an enquiry.
- During the window HMRC doesn't need any reason to open an enquiry; a **random** or **risk-based** selection is enough.`,
    },
    {
      kind: "md",
      md: `### Information notices (FA 2008 Schedule 36)

HMRC can require **information and documents** that are **reasonably required** to check a taxpayer's tax position, by an **information notice**:

- **Taxpayer notice:** requires the taxpayer to provide information or documents. HMRC must give a **reasonable time** (normally at least **30 days**). The taxpayer can **appeal** against a notice (other than for statutory records) within **30 days**.
- **Third-party notice:** requires another person (a bank, an employer, an accountant) to provide information about the taxpayer, normally with the **taxpayer's agreement** or the **tribunal's approval**.
- **Limits:** a notice can't require **privileged** communications or an accountant's **audit** working papers, and in some cases **personal records**. Taking legal advice is sensible if privilege is relevant.
- **Penalties:** failing to comply attracts an initial penalty of **£300**, and a further penalty of **up to £60 per day** while the failure continues (after a penalty has been imposed). There are higher **tax-geared** penalties for deliberately concealing documents.
- **Inspection:** HMRC may also **inspect** business premises and records, in some cases with the tribunal's approval.

### Discovery assessments and time limits

If HMRC discovers that tax has been **underassessed**, it can raise a **discovery assessment** within the following time limits (counted from the **end of the tax year or accounting period**):

| Behaviour | Time limit |
|---|---|
| Ordinary (no careless or deliberate error) | **4 years** |
| Careless | **6 years** |
| Deliberate | **20 years** |

An assessment outside the ordinary limit generally requires HMRC to show **careless** or **deliberate** behaviour (by the taxpayer or someone acting for them). Discovery assessments are subject to additional **conditions** (for example, where an enquiry window has closed, HMRC may only assess if the **officer** couldn't have been reasonably expected to know of the insufficiency from the information in the return and related documents). Consider the **disclosures** made on the return and in any white space.`,
    },
    {
      kind: "table",
      caption: "Responding to an enquiry: a practical sequence",
      head: ["Step", "Action"],
      rows: [
        ["1. Diary the dates", "Date of letter, response deadline and the end of the enquiry window"],
        ["2. Check authority", "Confirm you are authorised for the tax and period; if not, get the client's authority first"],
        ["3. Understand the scope", "Full enquiry or aspect? What does HMRC want and why?"],
        ["4. Gather evidence", "Records, bank statements, contracts, workings; check for gaps"],
        ["5. Review internally", "Check for errors; consider voluntary disclosure; AML and PCRT implications"],
        ["6. Respond fully and accurately", "In writing, by the deadline; no misleading statements"],
        ["7. Manage the client", "Explain the process, potential outcomes, costs and timelines"],
        ["8. Resolve or appeal", "Agree the outcome, or ask for a review or appeal to the tribunal"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Pitfalls",
      md: `- **Ignoring** the letter, or answering late without asking for more time.
- Giving HMRC **inaccurate or incomplete** information, creating a penalty risk and a PCRT issue.
- **Volunteering** information beyond the question without considering the consequences.
- **Forgetting** the tribunal **time limits** for appeals.
- Missing a **possible deliberate or fraud** angle: if the facts suggest serious fraud, **take specialist advice** (HMRC may offer the Contractual Disclosure Facility under Code of Practice 9).
- Failing to consider whether **AML reporting** is needed.`,
    },
  ],
  scenario: {
    title: "An enquiry into Pellham Engineering Ltd",
    narrative: `Pellham Engineering Ltd delivered its Company Tax Return for the year ended **31 March 2025** on **10 January 2026**. On **15 November 2026** HMRC opens an enquiry, asking for explanations of **director's loan account** movements and **vehicle expenses**, and for supporting documents within **30 days**. The company's director says the vehicle claim "might be a bit high".`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: window.** The return was delivered on 10 January 2026, so the enquiry window ends **10 January 2027**. HMRC's letter on 15 November 2026 is within it.

**Step 2: deadline.** 30 days from 15 November is **15 December 2026**. Diary it and ask for an extension if needed.

**Step 3: what HMRC wants.** An enquiry into two aspects. Gather the DLA ledger and bank statements and the vehicle records (mileage logs, private use evidence).

**Step 4: internal review.** Review the vehicle claim now. If an error is found, discuss with the director, quantify it, and consider **voluntary correction** and the **quality of disclosure** for penalty purposes. (If the "high" figure reflects deliberate over-claiming, the position is more serious: take advice and consider AML.)

**Step 5: respond.** Provide the information requested, accurately and by the deadline.

**Step 6: time limits.** If HMRC later wanted to assess the year ended 31 March 2025 outside the enquiry, the **discovery** time limit would be **4 years** (to 31 March 2029), **6 years** if careless (to 31 March 2031) or **20 years** if deliberate (to 31 March 2045).

**Step 7: closure.** The enquiry ends with a **closure notice** stating HMRC's conclusion and any amendment to the return. Appeal rights follow.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-time-limit",
      prompt: "Which discovery assessment time limit applies (from the end of the relevant period)?",
      categories: ["4 years", "6 years", "20 years"],
      items: [
        { text: "An innocent mistake with reasonable care taken", answer: 0 },
        { text: "A failure to take reasonable care", answer: 1 },
        { text: "Deliberately omitting income", answer: 2 },
      ],
      explain: "Ordinary 4 years; careless 6; deliberate 20.",
    },
    {
      kind: "numeric",
      id: "info-notice-penalty",
      prompt: "An information notice is ignored. An initial £300 penalty is imposed and the failure continues for 10 more days after that. What is the maximum total penalty (£), including up to £60 a day for those 10 days?",
      answer: 900,
      unit: "£",
      explain: "£300 initial plus up to £60 a day.",
      working: "£300 + (10 × £60 = £600) = **£900**.",
    },
    {
      kind: "mcq",
      id: "mcq-window-sa",
      prompt: "A Self Assessment return is filed on time on 20 December 2025 (filing deadline 31 January 2026). By when can HMRC open an enquiry as of right?",
      options: ["20 December 2026", "31 January 2027", "31 January 2029", "31 January 2031"],
      answer: 0,
      explain: "For a Self Assessment return delivered on time, the enquiry window runs for 12 months from the date HMRC received it (TMA 1970 s9A; EM1506), not from the 31 January filing date: 20 December 2026.",
    },
    {
      kind: "mcq",
      id: "mcq-notice-time",
      prompt: "How long is a taxpayer normally given to comply with an information notice?",
      options: ["7 days", "At least 30 days", "6 months", "1 year"],
      answer: 1,
      explain: "A reasonable time, normally at least 30 days.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-closure",
      prompt: "An enquiry ends with…",
      options: ["A closure notice", "A press release", "A phone call", "The year end"],
      answer: 0,
      explain: "A closure notice.",
    },
    {
      kind: "mcq",
      id: "q-careless",
      prompt: "What is the time limit for a discovery assessment where the loss of tax is careless?",
      options: ["2 years", "4 years", "6 years", "20 years"],
      answer: 2,
      explain: "6 years.",
    },
    {
      kind: "mcq",
      id: "q-sch36",
      prompt: "Which Act and Schedule govern information notices?",
      options: ["FA 2008 Schedule 36", "TMA 1970 s9A", "ITA 2007", "FA 2013"],
      answer: 0,
      explain: "Finance Act 2008, Schedule 36.",
    },
    {
      kind: "mcq",
      id: "q-privilege",
      prompt: "Can HMRC require privileged legal advice via an information notice?",
      options: ["Yes", "No", "Only for companies", "Only above £10,000"],
      answer: 1,
      explain: "Privileged communications are protected.",
    },
    {
      kind: "mcq",
      id: "q-respond",
      prompt: "Your client receives an enquiry letter. What is the first step?",
      options: ["Ignore it", "Diary the dates, check authority and understand the scope", "Destroy records", "Close the company"],
      answer: 1,
      explain: "Diary dates, check authority and scope.",
    },
  ],
  sources: [
    { label: "Finance Act 2008 Schedule 36 – information and inspection powers", url: "https://www.legislation.gov.uk/ukpga/2008/9/schedule/36" },
    { label: "CH56100 – assessing time limits: Income Tax and Capital Gains Tax", url: "https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch56100" },
    { label: "Penalties: an overview for agents and advisers – GOV.UK", url: "https://www.gov.uk/guidance/penalties-an-overview-for-agents-and-advisers" },
    { label: "DMBM570290 – Schedule 36 FA 2008 penalties", url: "https://www.gov.uk/hmrc-internal-manuals/debt-management-and-banking/dmbm570290" },
    { label: "HMRC Compliance Handbook", url: "https://www.gov.uk/hmrc-internal-manuals/compliance-handbook" },
  ],
};
