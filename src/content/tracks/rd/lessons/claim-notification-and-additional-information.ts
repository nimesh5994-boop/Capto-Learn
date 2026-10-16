import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "claim-notification-and-additional-information",
  title: "Making the claim: claim notification, the Additional Information Form and time limits",
  level: "practitioner",
  minutes: 35,
  summary:
    "The procedural gates every R&D claim must pass: the claim notification (6 months after the period of account, unless exempt), the Additional Information Form filed before the CT600, the CT600 boxes and CT600L, and the 2-year claim window. Miss one and the claim fails, however good the R&D.",
  objectives: [
    "Work out whether a company must submit a claim notification, and by when",
    "Explain what the Additional Information Form contains and why it must be filed before the CT600",
    "Identify the CT600 entries that confirm a claim, and the claim time limit",
    "Build a claim timetable that avoids the procedural traps",
  ],
  body: [
    {
      kind: "md",
      md: `Since 2023 HMRC has added procedural requirements designed to stop poor-quality and fraudulent claims. They're **strict**: there's no discretion to accept a late claim notification, and a CT600 filed before the Additional Information Form has its R&D claim removed. A practice that gets the technical work right but misses a date has let the client down just as badly.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Claim notification (CTA 2009, see CIRD183000)",
      md: `A company must **notify HMRC** that it intends to claim, through the online service, within the **claim notification period**: from the first day of the **period of account** to which the claim relates, ending **6 months after the end of that period of account**.

It does **not** need to notify if:
- it has made an R&D claim in the **3 years ending on the last day of the notification period**; or
- the accounting period falls in the same period of account as another accounting period for which it has made a claim or notification.

For the 3-year test, ignore a previous claim that HMRC rejected by removing it from the Company Tax Return, and a claim for an accounting period beginning before 1 April 2023 made in an amended return received **on or after 1 April 2023**.

Where notification is needed, HMRC's guidance says the company must either submit the claim notification form, or make the claim itself in its Company Tax Return (or an amendment) so that HMRC receives it by the last day of the notification period.

If notification was required and missed, **no claim can be made** for that period.`,
    },
    {
      kind: "table",
      caption: "What the claim notification asks for",
      head: ["Section", "Content"],
      rows: [
        ["Company", "Registered name and Unique Taxpayer Reference"],
        ["Responsible officer", "Name, role, telephone and email of the senior officer responsible for the claim"],
        ["Agent / adviser", "Name, address, contact details and role of any agent involved"],
        ["The claim", "Accounting period and period of account dates; a summary of the high-level planned R&D activities (no evidence is needed at this stage)"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Period of account, not accounting period",
      md: `The notification window runs from the **period of account** (the period the accounts are drawn up for). For an 18-month period of account split into a 12-month and a 6-month accounting period, there's **one** window, ending 6 months after the end of the 18-month period, and one notification covers both. Don't count from the end of the first 12-month accounting period.`,
    },
    {
      kind: "md",
      md: `### The Additional Information Form (AIF)

Every R&D claim needs an **Additional Information Form**, submitted online **before or on the same day as** the CT600. If both go on the same day, the AIF must go first. If the CT600 is filed first, HMRC **removes the R&D claim** from the return.

The AIF includes:
- the company's UTR, PAYE reference, VAT number and SIC code;
- the senior internal R&D contact and **every agent** involved;
- the accounting period (matching the CT600);
- **qualifying expenditure by category** (staffing, EPWs, contractors, consumables, software, data, cloud, clinical trial volunteers), separately for each scheme claimed;
- R&D intensity details (for ERIS) and connected companies;
- **project descriptions**.

A separate AIF is needed for each accounting period.`,
    },
    {
      kind: "table",
      caption: "How many projects to describe on the AIF",
      head: ["Number of projects in the claim", "Describe"],
      rows: [
        ["1 to 3", "All of them"],
        ["4 or more", "At least 3, which together account for at least 50% of the qualifying expenditure"],
        ["More than 10 needed to reach 50%", "The 10 with the highest qualifying expenditure"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Each project description covers",
      md: `1. The main **field of science or technology**.
2. The **baseline** level of knowledge or capability the company planned to advance.
3. The **advance** in science or technology it aimed to achieve.
4. The **scientific or technological uncertainties** it faced.
5. **How** the project sought to overcome those uncertainties (including any qualifying indirect activities), and whether they were resolved.
6. The **tax relief** claimed and the qualifying costs for the project.

Headings 1 to 5 map directly onto the DSIT Guidelines. A description that talks about commercial goals ("to launch a market-leading app") instead of technological ones is a red flag for HMRC.`,
    },
    {
      kind: "md",
      md: `### On the CT600

- **Merged RDEC**: include the credit as taxable income in the accounts (or add it in the tax computation), tick **box 656** (claim notification made, or exempt) and **box 657** (AIF submitted), complete supplementary pages **CT600L**, and give bank details for any payment.
- **ERIS**: include the 86% additional deduction in the computation, tick boxes 656 and 657, and complete **CT600L** if a payable credit is claimed.

### Time limit

A claim must be made in the CT600 (or an amendment to it) within **2 years** of the end of a 12-month accounting period. HMRC's guidance puts it as 24 months from the last day of a period of account of 18 months or less, or 42 months from the first day of a longer period of account. There's no late-claim discretion.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "A claim timetable for every R&D client",
      md: `Add three dates to your practice management system at the start of each period: **claim notification deadline** (6 months after the period of account ends), **AIF before CT600**, and **2-year claim deadline**. Submit the claim notification early, during the period, if there's any chance the client will claim. It costs nothing and keeps the option open.`,
    },
  ],
  scenario: {
    title: "A first-time claimant: Fenwick Acoustics Ltd",
    narrative: `Fenwick Acoustics Ltd, incorporated in 2021, has never claimed R&D relief. It draws up accounts for the year ended **31 December 2025**. In September 2026 the director, Joe Fenwick, read about R&D relief and asks you to claim for the noise-cancelling headphone algorithm the company developed in 2025. The CT600 for 2025 hasn't been filed yet; its filing deadline is 31 December 2026.

Separately, Fenwick plans to change its year end, so the next period of account will run from **1 January 2026 to 30 June 2027** (18 months).`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Was notification needed for 2025?** Fenwick has never claimed, so it isn't exempt. The notification period ran from 1 January 2025 to **30 June 2026** (6 months after the end of the period of account).
2. **Was it made?** No, and no claim reached HMRC in a return by that date either. It's now September 2026: the window has closed. **No claim can be made for the year ended 31 December 2025**, however strong the R&D. Explain this to Joe clearly and in writing, and check whether anyone (including your firm) had been asked to advise before June 2026.
3. **Next period.** The 18-month period of account to 30 June 2027 will be split for CT into an accounting period of 12 months (to 31 December 2026) and 6 months (to 30 June 2027). There's a single notification window for the period of account, ending **31 December 2027**. Submit the notification now, while the work is going on.
4. **AIF and CT600.** For each accounting period, submit the AIF first, then the CT600 with boxes 656 and 657 ticked and CT600L completed.
5. **Time limits.** HMRC's guidance measures the claim deadline as 24 months from the last day of a period of account of 18 months or less, i.e. **30 June 2029**. To be safe, aim to make the claim for the first accounting period (to 31 December 2026) within 2 years of *its* end, by 31 December 2028, and don't leave either to the last minute.`,
      },
      {
        kind: "callout",
        tone: "warning",
        title: "Your engagement letter",
        md: `If your firm prepares a client's accounts and tax return and knew it was doing development work, ask whether you should have flagged the notification requirement. Many practices now include R&D notification wording in engagement letters and year-end checklists for exactly this reason.`,
      },
    ],
  },
  exercises: [
    {
      kind: "mcq",
      id: "notification-deadline",
      prompt: "A first-time claimant has a period of account from 1 April 2025 to 31 March 2026. By when must it submit its claim notification?",
      options: ["31 March 2026", "30 September 2026", "31 March 2027", "With the CT600"],
      answer: 1,
      explain: "The notification period ends 6 months after the end of the period of account: 30 September 2026.",
    },
    {
      kind: "classify",
      id: "notification-needed",
      prompt: "Does each company need to submit a claim notification for its accounting period?",
      categories: ["Notification required", "Exempt"],
      items: [
        { text: "First ever R&D claim", answer: 0 },
        { text: "Made a claim in its CT600 filed 14 months before the end of the current notification period", answer: 1, why: "A claim in the 3 years ending on the last day of the notification period." },
        { text: "Last claim was made 4 years ago", answer: 0 },
        { text: "Its only previous claim was for a 2021 period, made by amended return in May 2023", answer: 0, why: "Claims for pre-April 2023 periods made by amendment on or after 1 April 2023 are disregarded." },
        { text: "Second accounting period within an 18-month period of account, where a notification was made for the first", answer: 1 },
      ],
      explain: "Notify unless there's a claim in the 3 years ending on the last day of the notification period, or a claim or notification for another AP in the same period of account.",
    },
    {
      kind: "numeric",
      id: "aif-projects",
      prompt:
        "A company's claim covers 6 projects with qualifying expenditure of: A £120,000, B £60,000, C £40,000, D £30,000, E £30,000, F £20,000. What is the minimum number of projects it must describe on the AIF?",
      answer: 3,
      unit: "",
      explain:
        "With 4 or more projects, describe at least 3 that together account for at least 50% of qualifying expenditure. Total £300,000; 50% = £150,000. A + B + C = £220,000, which exceeds £150,000, so 3 is enough.",
      working: "Total = £300,000. Top 3 = £220,000 ≥ £150,000, and the minimum is 3: **3 projects**.",
    },
    {
      kind: "mcq",
      id: "aif-order",
      prompt: "An agent files a client's CT600 including an R&D claim on 10 October, then submits the AIF on 11 October. What happens?",
      options: [
        "Nothing: both are in before the filing deadline",
        "HMRC removes the R&D claim from the return; a new valid claim needs the AIF first and must still be within the time limit",
        "HMRC charges a £100 penalty",
        "The claim is reduced by 10%",
      ],
      answer: 1,
      explain: "The AIF must be submitted before (or on the same day as, and before) the CT600. Otherwise the claim is removed.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-notif-window",
      prompt: "When does the claim notification period end?",
      options: ["At the end of the accounting period", "6 months after the end of the period of account", "12 months after the end of the period of account", "On the CT600 filing deadline"],
      answer: 1,
      explain: "6 months after the end of the period of account.",
    },
    {
      kind: "mcq",
      id: "q-notif-exempt",
      prompt: "What is the look-back period for the claim notification exemption?",
      options: ["1 year", "2 years", "3 years ending on the last day of the notification period", "5 years"],
      answer: 2,
      explain: "A company is exempt if it made a claim in the 3 years ending on the last day of the notification period.",
    },
    {
      kind: "mcq",
      id: "q-aif-fields",
      prompt: "Which of these is NOT one of the project description headings on the AIF?",
      options: ["The baseline level of knowledge", "The scientific or technological uncertainties", "The expected commercial return on the product", "How the project sought to overcome the uncertainties"],
      answer: 2,
      explain: "The AIF asks about the field, baseline, advance, uncertainties and how they were addressed, not commercial returns.",
    },
    {
      kind: "mcq",
      id: "q-ct600-boxes",
      prompt: "Which CT600 boxes confirm the claim notification and AIF requirements?",
      options: ["Boxes 155 and 160", "Boxes 656 and 657", "Boxes 875 and 880", "Boxes 1 and 2"],
      answer: 1,
      explain: "Box 656 (claim notification) and box 657 (additional information form).",
    },
    {
      kind: "mcq",
      id: "q-time-limit",
      prompt: "What is the time limit for making an R&D claim for a 12-month accounting period?",
      options: ["12 months from the period end", "2 years from the period end", "4 years from the period end", "6 years from the period end"],
      answer: 1,
      explain: "Claims must be made in the return, or an amendment to it, within 2 years of the end of the period.",
    },
  ],
  sources: [
    { label: "Tell HMRC you want to claim R&D tax relief (claim notification)", url: "https://www.gov.uk/guidance/tell-hmrc-that-youre-planning-to-claim-research-and-development-rd-tax-relief" },
    { label: "HMRC CIRD manual: pre-notification of claims (CIRD183000)", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird183000" },
    { label: "Additional information you must submit before you claim R&D tax relief", url: "https://www.gov.uk/guidance/submit-detailed-information-before-you-claim-research-and-development-rd-tax-relief" },
    { label: "Make a claim for R&D tax relief on your Company Tax Return", url: "https://www.gov.uk/guidance/make-a-claim-for-rd-tax-relief-on-your-company-tax-return" },
    { label: "Completing the CT600L page for research and development", url: "https://www.gov.uk/guidance/supplementary-pages-ct600l-research-and-development" },
  ],
};
