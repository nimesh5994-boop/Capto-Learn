import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "client-size-test-and-status-determination-statements",
  title: "Is the client small? The size test and status determination statements",
  level: "foundation",
  minutes: 35,
  summary:
    "How to decide whether a private sector client is small (so Chapter 8 applies) or medium/large (so Chapter 10 applies), including the thresholds raised for financial years beginning on or after 6 April 2025, the two-consecutive-years rule and the client's duties to issue a status determination statement.",
  objectives: [
    "Apply the two-of-three size test to a company client using the current thresholds",
    "Explain how the test works for unincorporated clients, groups, charities and new companies",
    "Explain the timing and transitional effect of the April 2025 threshold changes",
    "Describe the client's duties: reasonable care, the status determination statement and passing it down the chain",
    "Explain what happens if the client fails to comply",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Under Chapter 10, **small private sector clients** are outside the rules. The contractor's company decides status (Chapter 8). **Medium and large** private sector clients, and all public authorities, must decide status themselves. So the first question on any engagement is: **how big is the client?** Get it wrong and a client can be liable for the tax, penalties and interest on payments made to the contractor's company.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The size test for companies",
      md: `A **company** (or other body corporate) is **small** if it meets **at least two** of these three conditions, using the Companies Act 2006 thresholds (s382). From **financial years beginning on or after 6 April 2025** the thresholds are:

| Condition | Small if… |
|---|---|
| Annual turnover | Not more than **£15 million** (previously £10.2 million) |
| Balance sheet total | Not more than **£7.5 million** (previously £5.1 million) |
| Average number of employees | Not more than **50** (unchanged) |

It is **medium or large** if it fails to meet at least two (that is, it exceeds at least two of the thresholds). The rules apply by reference to **the last financial year for which the filing deadline for accounts ended before the start of the tax year**. A company only changes category after meeting (or failing) the test for **two consecutive** financial years.`,
    },
    {
      kind: "md",
      md: `### Timing and the transitional effect of the 2025 change

HMRC's guidance (ESM10006A) says the higher thresholds apply to **financial years beginning on or after 6 April 2025**. Because size is measured by reference to a **filed** financial year, the change has **no practical effect before the 2027/28 tax year at the earliest**. Until then, many clients' size is still judged on the older, lower thresholds for earlier financial years. **Don't assume** that a client is small just because it falls under the new figures. Check **which financial year** applies and which thresholds that year uses. Note that some GOV.UK guidance pages still quote the old figures (£10.2m and £5.1m), so use the manual page with the 2025 change.

### Other types of client

- **Partnerships:** medium or large if turnover exceeds the turnover threshold for the last financial year that ended at least nine months before the start of the tax year (the turnover test only).
- **Individuals and other unincorporated persons:** medium or large if turnover exceeds the threshold for the last calendar year before the tax year.
- **Charities:** donations are not counted in turnover for the test.
- **Groups:** the test looks at the whole group in some cases (see ESM10007 and ESM10008).
- **New companies:** treated as small until the start of the first tax year after the first accounts filing period ends.
- **Wholly overseas clients** (non-UK resident, no permanent establishment in the UK) are outside Chapter 10.
- **Public authorities:** always within Chapter 10, whatever their size.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The client's duties under Chapter 10",
      md: `A medium or large client (or public authority) that engages a worker through an intermediary must:

1. **Take reasonable care** to decide whether the hypothetical contract would be one of employment. (HMRC's CEST tool or a documented analysis can support this. CEST is explored in a later lesson.)
2. **Issue a status determination statement (SDS)** to the worker **and** the party it contracts with, **giving its conclusion and reasons**, **before the worker begins** the engagement (or when the contract is entered into).
3. **Respond within 45 days** to a request from the worker or the intermediary to review the decision (a "client-led status disagreement process").
4. **Pass the SDS down the chain**: each party in the chain must pass it on to the next party.

If the client **doesn't** issue a proper SDS, or doesn't respond in time to a disagreement, it becomes responsible for the tax and NIC on the engagement itself, even if the engagement is later found to be outside IR35. The client is **responsible until it tells** the parties of its determination and the reasons.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "What the practice should do",
      md: `- **When acting for a contractor:** ask each client for its **SDS**, check that it gives reasons, and diarise **45 days** if you want it reviewed.
- **When acting for a client:** keep a record of the **size test** each year (accounts reviewed, thresholds used) and a **process** for issuing SDSs.
- Remember that **an SDS in a template** with no reasons or no consideration of the actual working practices doesn't show reasonable care.
- Check **blanket determinations** (a policy that treats all contractors as inside IR35 without considering each engagement) because HMRC expects genuine consideration.`,
    },
  ],
  scenario: {
    title: "Is Larchfield Logistics Ltd small?",
    narrative: `Larchfield Logistics Ltd, a private company with a 31 March year end, engages Maya Singh through her company, Singh Analytics Ltd. Larchfield's figures are:

| | Turnover | Balance sheet | Average employees |
|---|---:|---:|---:|
| Latest year | £12.0m | £6.0m | 55 |`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: apply the new thresholds** (for a financial year beginning on or after 6 April 2025):
- Turnover £12.0m ≤ £15m: **meets** the small condition.
- Balance sheet £6.0m ≤ £7.5m: **meets** it.
- Employees 55 > 50: **fails** it.

Two of the three small conditions are met, so on the new thresholds Larchfield is **small**.

**Step 2: apply the old thresholds** (for a financial year beginning before 6 April 2025):
- Turnover £12.0m > £10.2m: **fails**.
- Balance sheet £6.0m > £5.1m: **fails**.
- Employees 55 > 50: **fails**.
So on the old thresholds Larchfield is **medium/large**.

**Step 3: which applies?** It depends on which financial year governs the 2026/27 engagement and when that year began. If the relevant year began before 6 April 2025, the **old** thresholds still apply and Larchfield is medium/large, so Chapter 10 applies and Larchfield must issue an SDS. Check the year, and keep the working paper.

**Step 4: the safe path.** Where there is doubt, ask the client for its **written confirmation of its size position** and the basis, and treat the engagement under Chapter 10 until that confirmation is received. Check again each tax year, remembering the **two consecutive years** rule.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "count-conditions",
      prompt: "A company has turnover of £16m, a balance sheet total of £6m and 40 employees. Using the thresholds for financial years beginning on or after 6 April 2025 (£15m, £7.5m, 50), how many of the three SMALL conditions does it meet?",
      answer: 2,
      unit: "",
      explain: "Turnover exceeds £15m so that condition fails. The balance sheet and employee conditions are met.",
      working: "Turnover £16m > £15m: no. Balance sheet £6m ≤ £7.5m: yes. Employees 40 ≤ 50: yes. **2** of 3, so the company is **small**.",
    },
    {
      kind: "numeric",
      id: "old-threshold-count",
      prompt: "The same company (turnover £16m, balance sheet £6m, 40 employees) is tested under the OLD thresholds (£10.2m, £5.1m, 50). How many of the three small conditions does it meet?",
      answer: 1,
      unit: "",
      explain: "Under the old thresholds both turnover and balance sheet exceed the limits.",
      working: "Turnover £16m > £10.2m: no. Balance sheet £6m > £5.1m: no. Employees 40 ≤ 50: yes. **1** of 3, so the company is **medium/large**.",
    },
    {
      kind: "classify",
      id: "classify-client-duties",
      prompt: "Is this a duty of a medium or large client under Chapter 10?",
      categories: ["Client duty", "Not a client duty"],
      items: [
        { text: "Give the worker and the next party a status determination statement with reasons", answer: 0 },
        { text: "Respond to a disagreement about the determination within 45 days", answer: 0 },
        { text: "Complete the PSC's company accounts", answer: 1 },
        { text: "Take reasonable care in deciding the status", answer: 0 },
      ],
      explain: "The client decides status, tells the others and handles disagreements.",
    },
    {
      kind: "mcq",
      id: "mcq-consecutive",
      prompt: "A company that has been small becomes medium/large only after…",
      options: ["One year over the thresholds", "Two consecutive financial years over the thresholds", "Three years", "HMRC notifies it"],
      answer: 1,
      explain: "Two consecutive years of exceeding the thresholds.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-turnover",
      prompt: "What is the turnover threshold for financial years beginning on or after 6 April 2025?",
      options: ["£10.2m", "£15m", "£36m", "£50m"],
      answer: 1,
      explain: "£15 million.",
    },
    {
      kind: "mcq",
      id: "q-bs",
      prompt: "What is the balance sheet total threshold from 6 April 2025?",
      options: ["£5.1m", "£7.5m", "£18m", "£25m"],
      answer: 1,
      explain: "£7.5 million.",
    },
    {
      kind: "mcq",
      id: "q-days",
      prompt: "How long does the client have to respond to a status disagreement?",
      options: ["14 days", "30 days", "45 days", "90 days"],
      answer: 2,
      explain: "45 days.",
    },
    {
      kind: "mcq",
      id: "q-public-size",
      prompt: "Does the size test apply to public authorities?",
      options: ["Yes", "No: they are always within Chapter 10", "Only for local councils", "Only for schools"],
      answer: 1,
      explain: "Public authorities are always within the off-payroll rules.",
    },
    {
      kind: "mcq",
      id: "q-overseas",
      prompt: "A wholly overseas client with no UK presence is…",
      options: ["Within Chapter 10", "Outside Chapter 10", "Always small", "Always large"],
      answer: 1,
      explain: "Wholly overseas clients are outside the off-payroll working rules.",
    },
  ],
  sources: [
    { label: "ESM10006A – size threshold changes from 6 April 2025", url: "https://www.gov.uk/hmrc-internal-manuals/employment-status-manual/esm10006a" },
    { label: "ESM10006 – medium or large sized organisation", url: "https://www.gov.uk/hmrc-internal-manuals/employment-status-manual/esm10006" },
    { label: "Off-payroll working for clients – GOV.UK", url: "https://www.gov.uk/guidance/off-payroll-working-for-clients" },
    { label: "Companies Act 2006 s382 – companies qualifying as small", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/382" },
  ],
};
