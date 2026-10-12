import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "accounts-deadlines-and-changing-year-end",
  title: "Accounting reference dates, filing deadlines and late filing penalties",
  level: "practitioner",
  minutes: 40,
  summary:
    "How a company's accounting reference date and first period are set, how to calculate the Companies House accounts deadline (including first accounts and the corresponding date rule), the late filing penalty table, and the AA01 rules for shortening or extending a year end.",
  objectives: [
    "Calculate the Companies House filing deadline for first and subsequent accounts",
    "Apply the late filing penalty table, including the doubling rule",
    "Apply the AA01 rules for shortening and extending an accounting reference period",
    "Work out the new filing deadline after a year end is changed",
  ],
  body: [
    {
      kind: "md",
      md: `A company's **accounting reference date (ARD)** is the date its financial year ends. On incorporation, Companies House sets it automatically to the **last day of the month in which the anniversary of incorporation falls** (CA 2006 s391). A company incorporated on 15 March 2025 has an ARD of 31 March.

The **first accounting reference period** runs from incorporation to the first ARD, and must be more than 6 months and not more than 18 months. So the first accounts of a company incorporated on 15 March 2025 run to **31 March 2026**: a little over 12 months.`,
    },
    {
      kind: "table",
      caption: "Companies House accounts filing deadlines (CA 2006 s442)",
      head: ["Accounts", "Private company", "Public company"],
      rows: [
        ["Normal", "9 months after the ARD", "6 months after the ARD"],
        ["First accounts covering **more than 12 months**", "The later of 21 months from incorporation and 3 months from the ARD", "The later of 18 months from incorporation and 3 months from the ARD"],
        ["After shortening the ARD (AA01)", "The later of 9 months from the new ARD and 3 months from the date the AA01 is received", "The later of 6 months from the new ARD and 3 months from the AA01"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The corresponding date rule",
      md: `Periods of months end on the **corresponding date** of the later month. An ARD of 4 April gives a deadline of **4 January**. Where the ARD is the **last day of a month**, the deadline is the **last day** of the target month: an ARD of 30 April gives a deadline of 31 January, and an ARD of 31 May gives a deadline of 28 (or 29) February.

The deadline is calculated to the exact day. It doesn't move if it falls on a weekend or bank holiday, and what counts is when **acceptable** accounts are delivered. Accounts that are rejected and resubmitted after the deadline are late.`,
    },
    {
      kind: "table",
      caption: "Companies House late filing penalties (unchanged since 2009; checked October 2026)",
      head: ["How late the accounts are delivered", "Private company or LLP", "Public company"],
      rows: [
        ["Not more than 1 month", "£150", "£750"],
        ["More than 1 month but not more than 3 months", "£375", "£1,500"],
        ["More than 3 months but not more than 6 months", "£750", "£3,000"],
        ["More than 6 months", "£1,500", "£7,500"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "The penalty doubles if accounts were late last year too",
      md: `If a company's accounts are filed late **two years in a row**, the penalty for the second year is **doubled**. Penalties are automatic: Companies House doesn't accept appeals on grounds such as "it was our first accounts", "the company is dormant", "we can't afford it" or "our accountant was ill or made a mistake". Separately, late filing is a criminal offence by the directors.

Don't confuse these with **HMRC's corporation tax late filing penalties**, which are a separate regime (and were increased for returns due on or after 1 April 2026).`,
    },
    {
      kind: "md",
      md: `### Changing the year end: AA01

A company can change its current ARD, or the one immediately before it, by filing **AA01**. There's no fee.

| | Shortening | Extending |
|---|---|---|
| How often | As many times as you like (minimum 1 day) | Generally **once every 5 years** |
| Maximum period | n/a | **18 months** (unless in administration) |
| Exceptions to the 5-year rule | n/a | Company in administration; aligning with a subsidiary or parent undertaking; Secretary of State approval |
| Timing | Must be filed **before** the filing deadline for the period being changed | Same |

You **can't** change the ARD once the accounts for that period are **overdue**. Any filing extension already granted for the period is lost when the ARD changes.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Why clients change year ends",
      md: `Common reasons: aligning with a new parent company's group year end; moving away from a busy season (e.g. a retailer with a December year end); aligning with 31 March for corporation tax rate changes or with 5 April for a sole trader who incorporated; or simply buying time. Shortening to gain time rarely works: the 3-months-from-notice rule usually catches it.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Coming in April 2028",
      md: `Companies House has announced that from **1 April 2028** the number of times a company can **shorten** its accounting reference period will be reduced (the limit hasn't been confirmed), alongside software-only accounts filing. Until then the current rules apply.`,
    },
    {
      kind: "md",
      md: `### Extensions

A company can apply to Companies House for more time to file, but only **before** the deadline and only for an **unplanned event** outside its control (such as serious illness or a cyber attack). Pressure of work at the accountant's isn't accepted.`,
    },
  ],
  scenario: {
    title: "Three deadline queries in one morning",
    narrative: `Your manager hands you three files:

1. **Larkspur Bakery Ltd** was incorporated on 15 March 2025. Its first accounts run to 31 March 2026. The director wants to know when they're due.
2. **Tidewater Marine Ltd** (private) has a 31 December year end. Its accounts for the year ended 31 December 2024 were due on 30 September 2025 but were filed on 10 December 2025. The previous year's accounts had also been filed late. A penalty notice has arrived and the director wants to know if it's right.
3. **Corrigan Electrical Ltd** has a 31 December year end. It's being bought by a group with a 30 September year end, and wants to shorten its current period (1 January 2026 to 31 December 2026) to end on **30 September 2026**. The AA01 will be filed on **2 November 2026**.`,
    walkthrough: [
      {
        kind: "md",
        md: `**1. Larkspur Bakery.** First accounts cover more than 12 months (15 March 2025 to 31 March 2026), so the deadline is the later of:
- 21 months from incorporation: **15 December 2026**; and
- 3 months from the ARD: 30 June 2026.

Deadline: **15 December 2026**.

**2. Tidewater Marine.** Due 30 September 2025, delivered 10 December 2025: more than 1 month but not more than 3 months late (2 months and 10 days). Penalty £375, **doubled to £750** because the previous year's accounts were also late.

**3. Corrigan Electrical.** Shortening is always allowed, and the AA01 is filed well before the current period's filing deadline. The new deadline is the later of:
- 9 months from the new ARD of 30 September 2026: **30 June 2027**; and
- 3 months from receipt of the AA01: 2 February 2027.

Deadline: **30 June 2027**. Remind the client that corporation tax follows the accounting period too, and that a 9-month period changes the CT payment dates.`,
      },
      {
        kind: "table",
        caption: "Summary",
        head: ["Client", "Deadline / penalty", "Rule applied"],
        rows: [
          ["Larkspur Bakery Ltd", "15 December 2026", "First accounts > 12 months: later of 21 months from incorporation and 3 months from ARD"],
          ["Tidewater Marine Ltd", "£750", "£375 band (1–3 months late), doubled for consecutive late filing"],
          ["Corrigan Electrical Ltd", "30 June 2027", "Shortened: later of 9 months from new ARD and 3 months from AA01"],
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "penalty-calc",
      prompt:
        "A private company's accounts were due on 31 March 2026 and were delivered on 2 August 2026. The previous year's accounts were filed on time. What is the late filing penalty?",
      answer: 750,
      unit: "£",
      explain: "Delivered more than 3 months but not more than 6 months after the deadline. No doubling because the prior year wasn't late.",
      working: "31 March → 30 June is 3 months; 2 August is more than 3 months but less than 6 months late. Band penalty **£750**.",
    },
    {
      kind: "mcq",
      id: "first-accounts-deadline",
      prompt: "A private company was incorporated on 8 June 2025 and its first accounts run to 30 June 2026. When are they due at Companies House?",
      options: ["31 March 2027", "30 September 2026", "8 March 2027", "30 June 2027"],
      answer: 2,
      explain:
        "The first period is just over 12 months, so the deadline is the later of 21 months from incorporation (8 March 2027) and 3 months from the ARD (30 September 2026).",
    },
    {
      kind: "classify",
      id: "aa01-allowed",
      prompt: "Can each company change its year end as proposed using AA01?",
      categories: ["Allowed", "Not allowed"],
      items: [
        { text: "Shortening the current period for the third time in two years", answer: 0, why: "There's no limit on shortening (until the 2028 changes)." },
        { text: "Extending the current period to 18 months, having last extended 7 years ago", answer: 0 },
        { text: "Extending the current period to 20 months", answer: 1, why: "The maximum is 18 months unless the company is in administration." },
        { text: "Extending again 2 years after the last extension, to align with a new parent company", answer: 0, why: "Aligning with a parent or subsidiary is an exception to the 5-year rule." },
        { text: "Changing the year end for a period whose accounts are already overdue", answer: 1, why: "The ARD can't be changed once accounts are overdue." },
      ],
      explain: "Shorten as often as you like; extend to a maximum of 18 months, generally once in 5 years unless an exception applies; never once the accounts are overdue.",
    },
    {
      kind: "numeric",
      id: "doubled-penalty-plc",
      prompt:
        "A public company files its accounts 5 weeks late. Its accounts were also late the previous year. What penalty will Companies House charge?",
      answer: 3000,
      unit: "£",
      explain: "Five weeks is more than 1 month but not more than 3 months late: £1,500 for a public company, doubled for consecutive late filing.",
      working: "£1,500 × 2 = **£3,000**.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-default-ard",
      prompt: "A company is incorporated on 11 August 2026. What ARD will Companies House set?",
      options: ["11 August", "31 August", "31 July", "31 March"],
      answer: 1,
      explain: "The ARD is the last day of the month in which the anniversary of incorporation falls.",
    },
    {
      kind: "mcq",
      id: "q-corresponding",
      prompt: "A private company's ARD is 30 April 2026. When are the accounts due?",
      options: ["30 January 2027", "31 January 2027", "28 February 2027", "30 April 2027"],
      answer: 1,
      explain: "Where the ARD is the last day of a month, the deadline is the last day of the month 9 months later: 31 January 2027.",
    },
    {
      kind: "mcq",
      id: "q-penalty-top",
      prompt: "What is the penalty for a private company filing its accounts 8 months late, for the first time?",
      options: ["£375", "£750", "£1,500", "£3,000"],
      answer: 2,
      explain: "More than 6 months late: £1,500 for a private company.",
    },
    {
      kind: "mcq",
      id: "q-extend-limit",
      prompt: "What is the maximum length of an accounting reference period after an extension (company not in administration)?",
      options: ["15 months", "18 months", "21 months", "24 months"],
      answer: 1,
      explain: "An accounting reference period can't exceed 18 months unless the company is in administration.",
    },
    {
      kind: "mcq",
      id: "q-appeal",
      prompt: "Which reason is Companies House likely to accept on a penalty appeal?",
      options: [
        "These were the company's first accounts",
        "The accountant was on holiday",
        "Events genuinely outside the company's control, with dates and evidence, such as the registered office being destroyed by fire shortly before the deadline",
        "The company is dormant so the penalty is unfair",
      ],
      answer: 2,
      explain: "Appeals must show circumstances outside the company's control. First accounts, dormancy and accountant fault are specifically listed as unlikely to succeed.",
    },
    {
      kind: "mcq",
      id: "q-weekend",
      prompt: "A private company's filing deadline falls on a Sunday. When must the accounts be delivered?",
      options: ["By the following Monday", "By the Sunday — the deadline doesn't move", "Within 3 working days", "By the previous Friday only if filed on paper"],
      answer: 1,
      explain: "Companies House deadlines are calculated to the exact day and don't move for weekends or bank holidays. Online filing is available on weekends.",
    },
  ],
  sources: [
    { label: "Companies House: preparing and filing Companies House accounts", url: "https://www.gov.uk/government/publications/life-of-a-company-annual-requirements/life-of-a-company-part-1-accounts" },
    { label: "Penalties for late filing of annual accounts", url: "https://www.gov.uk/annual-accounts/penalties-for-late-filing" },
    { label: "Change your company's year end", url: "https://www.gov.uk/change-your-companys-year-end" },
    { label: "Companies Act 2006 s392 – alteration of accounting reference date", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/392" },
    { label: "Companies Act 2006 s442 – period allowed for filing accounts", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/442" },
    { label: "Companies House to bring in changes to accounts filing from April 2028", url: "https://www.gov.uk/government/news/companies-house-to-bring-in-changes-to-accounts-filing-from-april-2028" },
  ],
};
