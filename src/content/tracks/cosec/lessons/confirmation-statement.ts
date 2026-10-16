import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "confirmation-statement",
  title: "The confirmation statement (CS01)",
  level: "foundation",
  minutes: 30,
  summary:
    "The annual check that a company's details at Companies House are right: the review period and 14-day deadline, the £50 fee, what the CS01 can and can't change, the lawful purpose statement, the registered email address and the identity verification statements now built into it.",
  objectives: [
    "Work out a company's confirmation date, review period and filing deadline",
    "Explain what the CS01 updates directly and which changes need their own form first",
    "Make the lawful purpose statement and registered email confirmation correctly",
    "Prepare a CS01 for a client whose directors and PSCs must also link their personal codes",
  ],
  body: [
    {
      kind: "md",
      md: `Every company (and every LLP) must deliver a **confirmation statement** at least once every 12 months (Companies Act 2006 s853A). It replaced the old annual return in 2016. It is not a form for *changing* most things: it is a statement that, as at the confirmation date, the information Companies House holds is correct, or has been corrected by the separate forms already filed.

For most clients your practice files it routinely each year. The risk is treating it as a tick-box. Since 2024 the CS01 also carries the **lawful purpose statement** and the **registered email address**, and since 18 November 2025 it is the point at which existing directors must link their **identity verification**.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Review period and deadline",
      md: `- The **review period** runs for 12 months from incorporation (first statement) or from the confirmation date on the last statement.
- The statement must be **delivered within 14 days** after the end of the review period.
- A company can file **early** and pick a new confirmation date. The next review period then starts the day after that date.

Not filing is an offence by the company and every officer in default, and a persistent failure is one of the triggers for the registrar to start **compulsory strike-off**.`,
    },
    {
      kind: "table",
      caption: "Companies House fees for the confirmation statement (fees schedule, checked October 2026)",
      head: ["Method", "Fee", "When charged"],
      rows: [
        ["Online or software", "£50", "Once, with the first statement in each 12-month payment period"],
        ["Paper CS01", "£110", "Once, with the first statement in each 12-month payment period"],
        ["Second or later statement in the same payment period", "Nil", "No further fee until a new payment period starts"],
      ],
    },
    {
      kind: "md",
      md: `### What the CS01 itself can update

The "additional information" part of the CS01 can be used to bring these up to date:

- **SIC codes** (the nature of business);
- the **statement of capital**, but only to reflect changes that didn't need their own filing (allotments go on an SH01 first);
- **trading status of shares** (whether any are admitted to trading on a relevant market);
- **shareholder information** for non-traded companies: names and the shares transferred in the period, or a full list;
- the **PSC exemption** status, if the company claims one.

### What it can't update

Changes to **directors, secretaries, PSCs and the registered office** must be filed on their own forms (AP01, TM01, CH01, PSC01 to PSC09, AD01) **before** the CS01, which then simply confirms the register is correct. Software will usually prompt you to file these first.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The two statements added by ECCTA (from 4 March 2024)",
      md: `On every confirmation statement the company must:

1. **Confirm that its intended future activities are lawful.** This is required even if nothing has changed.
2. **Have an appropriate registered email address on record**, and supply one if it hasn't already. The address is not shown on the public register. Companies House uses it to contact the company.

An appropriate email address is one where an email sent by the registrar would be expected to come to the attention of a person acting on the company's behalf. Your practice's shared mailbox can be used if you've agreed to monitor it, but the client must know that Companies House correspondence will come to you.`,
    },
    {
      kind: "md",
      md: `### Identity verification on the CS01

During the transition that began on 18 November 2025, an existing director must have verified their identity **by the time the company files its next confirmation statement**. The CS01 asks for each director's **Companies House personal code** and a statement that they've verified. Companies House will not accept the statement until every director has done so.

PSCs who are also directors provide their code in the 14 days starting the day after the confirmation date; other PSCs in the first 14 days of their birth month. (See the identity verification lesson for the full table.)`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common confirmation statement mistakes",
      md: `- **Confirming without checking.** The person filing is making a statement on the company's behalf. Check the public register against your file every time: directors' service addresses, PSC percentages, the registered office.
- **Missing a share transfer.** If shares changed hands in the year, the shareholder information must reflect it. A stale shareholder list is one of the most common errors on the register.
- **Leaving the SIC code from incorporation.** If the business has changed, update it. HMRC and lenders look at it.
- **Filing the CS01 before the director's code is in hand.** In 2026 the statement will simply bounce. Get the codes first.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Align it with the year end",
      md: `Some practices file the CS01 early so that its date falls a fixed number of weeks after the accounts are approved, letting the shareholder review happen alongside the year-end pack. Remember that filing early resets the review period, so tell the client. It doesn't move a director-PSC's 14-day verification window: Companies House says filing the confirmation statement early won't change those dates.`,
    },
  ],
  scenario: {
    title: "The 2026 confirmation statement for Wexford Garden Design Ltd",
    narrative: `Wexford Garden Design Ltd has a confirmation date of **12 October**. Its last statement was made up to 12 October 2025. It has two directors, Orla Wexford (now a 60% shareholder; she held 75% until February) and Sam Hardy (25%), and a non-director shareholder, Ellen Price (15%), who bought her shares from Orla in February 2026 for £3,000.

During the year the company stopped doing landscape construction and now only does garden design consultancy. In August it moved its registered office to your firm's address, but nobody filed anything. Orla verified her identity in September 2026; Sam says he "will get round to it".

It's 5 October 2026 and the job is in your queue.`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Dates.** The review period ends on **12 October 2026**. The statement must be delivered within 14 days after that, so by **26 October 2026**.
2. **Registered office first.** The move hasn't been filed. Put a registered office agreement in place and file **AD01** before the CS01. The change only takes effect when registered.
3. **Shareholder change.** Ellen bought 15% from Orla. Check the stock transfer form was completed and stamped (the consideration exceeded £1,000, so stamp duty was due) and that the register of members was updated. On the CS01, show the transfer: Orla's holding reduced, Ellen added.
4. **PSC check.** Orla held 75%, which is the '75% or more' band. She now holds 60%, which is the 'more than 50% but less than 75%' band. Her nature of control has changed, so file a **PSC04** for her *before* the CS01. Sam at exactly 25% is **not** a PSC on shares alone because the test is *more than* 25%, and Ellen at 15% isn't either. This is easy to miss: a share sale that leaves the seller still in control can still move them between bands.
5. **SIC code.** Change from landscape construction to the design activity code that fits, on the CS01.
6. **Lawful purpose and email.** Confirm the intended future activities are lawful; confirm or supply the registered email address.
7. **Identity verification.** Sam must verify and give you his personal code **before** the CS01 can be filed. Chase him today: if he hasn't verified by 26 October, the statement can't go in and the company is in default.
8. **Fee.** First statement in the new payment period, filed online: **£50**.`,
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Reconcile the shareholder list before you confirm",
        md: `Add up the shareholdings on the register of members and agree them to the number of shares in the statement of capital: here 60% + 25% + 15% = 100%. A CS01 that shows 105% of the shares is rejected, but one that shows the wrong person holding them may sail through, and then sits on the public register.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "cs01-or-separate-form",
      prompt: "A client's details have changed during the year. Which can be updated on the CS01 itself, and which need their own form filed first?",
      categories: ["Update on the CS01", "File a separate form first"],
      items: [
        { text: "The company's main activity has changed, so the SIC code needs updating", answer: 0 },
        { text: "A director has moved house and changed his service address", answer: 1, why: "CH01 — director details are never updated on the CS01." },
        { text: "A shareholder transferred her shares to her daughter", answer: 0, why: "Shareholder information for a non-traded company is updated on the CS01." },
        { text: "The registered office is moving to the accountant's office", answer: 1, why: "AD01 — the change only takes effect when registered." },
        { text: "A new 40% shareholder has become a PSC", answer: 1, why: "PSC01 (and the PSC's identity verification) is filed separately." },
        { text: "The company has no registered email address on record", answer: 0, why: "The registered email address can be supplied on the CS01." },
      ],
      explain:
        "The CS01 updates SIC codes, the statement of capital (where no other filing was needed), shareholder information, trading status and the registered email. Officers, PSCs and the registered office have their own forms, filed before the CS01.",
    },
    {
      kind: "numeric",
      id: "cs01-fees-portfolio",
      prompt:
        "In one month your practice files confirmation statements online for 7 clients. One of those clients issued new shares two weeks later and you file a second CS01 for it, also online, in the same 12-month payment period. A further client insists on a paper CS01. What is the total Companies House fee for the 9 statements?",
      answer: 460,
      unit: "£",
      explain:
        "The fee is charged once per 12-month payment period with the first statement. A second statement in the same period is free. Paper filing costs £110.",
      working: "7 × £50 = £350. Second statement for the same company: £0. Paper statement: £110. Total **£460**.",
    },
    {
      kind: "numeric",
      id: "cs01-deadline-days",
      prompt:
        "A company was incorporated on 3 March 2025 and has never filed a confirmation statement. Its first review period ended on 2 March 2026. What is the latest date in March 2026 by which the first statement had to be delivered? (Answer as a day number, e.g. 9.)",
      answer: 16,
      unit: "",
      explain: "The statement must be delivered within 14 days after the end of the review period.",
      working: "Review period ends 2 March 2026. 2 March + 14 days = **16 March 2026**.",
    },
    {
      kind: "multi",
      id: "cs01-statements",
      prompt: "Which of these must a company confirm or provide on every confirmation statement filed in October 2026? Select all that apply.",
      options: [
        "That its intended future activities are lawful",
        "An appropriate registered email address (if not already held)",
        "Each existing director's Companies House personal code (once that director's transition point is reached)",
        "A copy of its latest accounts",
        "Its corporation tax UTR",
      ],
      answers: [0, 1, 2],
      explain:
        "The lawful purpose statement and registered email came in on 4 March 2024; directors' identity verification is linked on the CS01 during the transition. Accounts and tax references are not part of the CS01.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-cs01-frequency",
      prompt: "How often must a company deliver a confirmation statement?",
      options: ["Every 6 months", "At least once every 12 months", "Only when something changes", "Every 3 years"],
      answer: 1,
      explain: "CA 2006 s853A requires a statement at least once in every 12-month review period. Filing more often is allowed.",
    },
    {
      kind: "mcq",
      id: "q-cs01-deadline",
      prompt: "How long after the end of the review period does a company have to deliver its confirmation statement?",
      options: ["7 days", "14 days", "28 days", "1 month"],
      answer: 1,
      explain: "The statement is due within 14 days after the review period ends.",
    },
    {
      kind: "mcq",
      id: "q-cs01-fee",
      prompt: "A company files its confirmation statement online in June and files another in September (same payment period) after a share transfer. What is the total fee?",
      options: ["£0", "£50", "£100", "£110"],
      answer: 1,
      explain: "The £50 fee is paid once per 12-month payment period, with the first statement.",
    },
    {
      kind: "mcq",
      id: "q-cs01-email",
      prompt: "Is a company's registered email address shown on the public register?",
      options: ["Yes, next to the registered office", "No, Companies House uses it to contact the company but doesn't publish it", "Only for public companies", "Only if the company opts in"],
      answer: 1,
      explain: "The registered email address is not made public.",
    },
    {
      kind: "mcq",
      id: "q-cs01-director",
      prompt: "An existing director has not verified their identity. What happens when the company tries to file its confirmation statement during the transition?",
      options: [
        "It's accepted with a warning",
        "It's accepted and the director has another 12 months",
        "Companies House won't accept it until every director has verified and provided their code",
        "The director is automatically removed",
      ],
      answer: 2,
      explain: "The CS01 requires each director's personal code and a verification statement; it won't be accepted without them.",
    },
    {
      kind: "mcq",
      id: "q-cs01-new-director",
      prompt: "A new director joined in July. How is that change shown on the public register?",
      options: ["On the next CS01", "By filing AP01 within 14 days of the appointment", "In the next accounts", "No filing is needed for a director"],
      answer: 1,
      explain: "Officer changes are filed on their own forms (AP01 for an appointment). The CS01 then confirms the register is correct.",
    },
  ],
  sources: [
    { label: "Companies House: confirmation statement guidance", url: "https://www.gov.uk/guidance/confirmation-statement-guidance" },
    { label: "File your confirmation statement with Companies House", url: "https://www.gov.uk/file-your-confirmation-statement-with-companies-house" },
    { label: "Companies Act 2006 s853A – duty to deliver confirmation statements", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/853A" },
    { label: "Companies House fees", url: "https://www.gov.uk/government/publications/companies-house-fees/companies-house-fees" },
    { label: "Changes to UK company law: changes at a glance", url: "https://changestoukcompanylaw.campaign.gov.uk/changes-at-a-glance/" },
  ],
};
