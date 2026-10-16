import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "s455-charge-and-s458-relief",
  title: "The s455 charge and s458 relief",
  level: "practitioner",
  minutes: 35,
  summary:
    "How the loans-to-participators charge works: who is caught, the 2026/27 rate, the 9-month-and-1-day deadline, how it is reported on the CT600A, and how and when it is reclaimed on repayment, release or write-off.",
  objectives: [
    "Identify when a loan or advance to a participator triggers s455 CTA 2010",
    "State the correct rate for a loan by date made and compute the charge",
    "Calculate the payment deadline and the deadline for relief",
    "Prepare the accounting entries and CT600A disclosure for a loan that is outstanding at the deadline",
    "Compute s458 relief on a partial repayment",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `The close-company loan rules exist to stop owners taking value out of a company as untaxed loans instead of salary or dividends. If a **close company** makes a **loan or advance** to a **participator** (or an associate of one) and it is still outstanding nine months after the accounting period ends, the **company** pays tax on it. The tax is temporary: it is refunded when the loan is repaid, released or written off, but the cash-flow and compliance cost is real.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The charge (CTA 2010 s455)",
      md: `- **Who:** a close company (most owner-managed companies) making a loan or advance to a participator, or an associate of one (spouse, relatives and business partners can be associates).
- **Rate:** equal to the **dividend upper rate** at the time the loan is made. For loans made or benefits conferred **on or after 6 April 2026 it is 35.75%**. For loans made 6 April 2022 to 5 April 2026 it is **33.75%**; 6 April 2016 to 5 April 2022 **32.5%**; before that **25%**.
- **Due:** with the corporation tax for the period, i.e. **9 months and 1 day** after the end of the accounting period in which the loan was made, to the extent the loan is still outstanding.
- **Reporting:** on the **CT600A** supplementary page, which also feeds the main return.
- **Not a penalty:** it is a refundable advance payment of tax and **not deductible** in computing profits.`,
    },
    {
      kind: "md",
      md: `### Who and what is caught

- A **participator** is a person with a share or interest in the capital or income of the company: shareholders (including those on small percentages), loan creditors, and in practice most directors who own shares.
- **Loans and advances** include overdrawn DLAs, paying a personal bill, lending cash, and releasing a debt owed to the company. A separate but parallel charge (**s464A**) applies at the same rate where the close company is a party to **tax avoidance arrangements** under which a **benefit** is conferred on a participator other than by a loan (it doesn't apply where the extraction is already taxed as a distribution). Relief for a benefit that is returned to the company (s464B) has been withdrawn for return payments made on or after 30 October 2024.
- **Exceptions:** a loan of up to **£15,000** in total to a full-time working director or employee who has **no material interest** (5% or less) is outside s455 (s456). Owner-directors will almost never qualify. A **debt for the supply of goods or services** in the ordinary course on normal credit terms is also excluded.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "The 9-month clock runs from the end of the accounting period of the loan",
      md: `A loan made on 5 March 2027 for a company with a 31 March 2027 year end is in the period to 31 March 2027, so the deadline is **1 January 2028**, not 12 months later. A loan made on 1 April 2027 falls in the next period and the deadline is **1 January 2029**. Many clients think they have "plenty of time". The **last day of the period** is what matters.`,
    },
    {
      kind: "md",
      md: `### Clearing the charge: s458 relief

Relief is given when the loan is **repaid, released or written off**. It is claimed via the CT600A of the period in which the **repayment is made** (not the period of the loan).

- Full repayment before the deadline: **no s455 tax** is due at all.
- Repayment after the deadline: the tax paid is **refunded**, but only **9 months and 1 day after the end of the accounting period in which the repayment was made**. HMRC pays no interest on the delay. Company interest on the original late payment is also a cost.
- **Claim time limit:** 4 years from the end of the **financial year** (1 April to 31 March) in which the loan is repaid, released or written off. A claim made within 2 years of the end of the loan's accounting period goes on the CT600A; after that, use form L2P.
- **Write-off or release:** relief is available but the **participator has an income tax charge** (and possible NIC). See the lesson on writing off a DLA.
- **Repayments by set-off**, such as declaring a dividend and crediting the loan account, count as repayments if the dividend is lawful and is actually paid (credited unreservedly to the account). Cash repayments can be undone by the bed-and-breakfasting matching rules (see next lesson); a repayment that is itself taxed as income, such as a dividend or bonus credited to the account, is excluded from those rules.`,
    },
    {
      kind: "table",
      caption: "s455 timeline for a loan made in the year to 31 March 2027",
      head: ["Event", "Date", "Consequence"],
      rows: [
        ["Loan made", "1 June 2026", "Loan within period to 31 March 2027; 35.75% rate"],
        ["Year end", "31 March 2027", "Balance outstanding at year end is carried to the CT600A"],
        ["Repayment deadline (avoids s455)", "31 December 2027", "Repaid in full by this date means no charge"],
        ["s455 tax due", "1 January 2028", "Payable with the CT for the period"],
        ["Loan repaid", "30 June 2028", "Falls in the period to 31 March 2029; claim relief on that CT600A"],
        ["Refund due", "1 January 2030", "9 months and 1 day after 31 March 2029"],
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Make the charge visible in the accounts",
      md: `The s455 payment is shown as a **debtor** ("s455 tax recoverable") rather than a tax expense, because it is recoverable. The related corporation tax payment is part of the liability for the period. Remember it can crystallise a **large cash outflow** for a small company, so flag the exposure to the client **before** the year end, ideally when you prepare the draft accounts.`,
    },
  ],
  scenario: {
    title: "Greystone Landscapes Ltd: £40,000 and a late repayment",
    narrative: `Greystone Landscapes Ltd (year end 31 March; close company) lent its sole director and shareholder, Ruth Okafor, £40,000 on 1 June 2026 to buy a van. No other transactions went through the DLA in the year. Ruth hasn't repaid anything. Corporation tax for the year to 31 March 2027 is due 1 January 2028. The company only has £25,000 of distributable reserves.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: Is s455 engaged?** Greystone is a close company, Ruth is a participator, and the loan is a loan or advance. Yes.

**Step 2: Rate and amount.** Loan made after 6 April 2026, so 35.75%. £40,000 × 35.75% = **£14,300**, due on **1 January 2028** if the loan is still outstanding.

**Step 3: Can the loan be cleared first?** Options before 31 December 2027:
- **Cash repayment** of £40,000 by Ruth: no tax.
- **Dividend** of £25,000 (all the reserves) credited to the DLA, leaving £15,000 outstanding and £5,362.50 of s455 tax (15,000 × 35.75%). Ruth pays dividend tax of 10.75% on the taxable part (if within the basic band).
- **Salary or bonus**: costs PAYE, employee and employer NIC, though it is deductible against corporation tax.
Compare the all-in cost for the client: that is the real advice.

**Step 4: If nothing is done.** Report on the CT600A, pay **£14,300** by 1 January 2028, and diarise the repayment. If Ruth repays on 30 June 2028 (period to 31 March 2029), the CT600A for that period claims relief and the £14,300 is refunded on **1 January 2030**. That is two years of the cash tied up with HMRC.`,
      },
      {
        kind: "journal",
        title: "Recognising the s455 tax paid to HMRC",
        narrative: "The payment is a recoverable amount, not an expense. (Shown as the payment on 1 January 2028.)",
        lines: [
          { account: "s455 tax recoverable (debtor)", dr: 14300 },
          { account: "Bank", cr: 14300 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "s455-amount",
      prompt: "A close company lends a director £28,000 on 20 August 2026. It is still outstanding nine months and one day after the period end. What is the s455 tax (£)?",
      answer: 10010,
      unit: "£",
      explain: "Loans made on or after 6 April 2026 attract 35.75%.",
      working: "£28,000 × 35.75% = **£10,010**.",
    },
    {
      kind: "numeric",
      id: "s458-relief",
      prompt: "A £50,000 loan made on 1 August 2026 attracted s455 tax at 35.75%. The director repays £20,000 on 1 September 2027. How much s455 relief arises on that repayment (£)?",
      answer: 7150,
      unit: "£",
      explain: "Relief is the s455 rate applied to the amount repaid.",
      working: "£20,000 × 35.75% = **£7,150**.",
    },
    {
      kind: "mcq",
      id: "s455-deadline",
      prompt: "A company with a 31 March year end lends a director £12,000 on 10 February 2027. By when must the loan be repaid to avoid s455 tax?",
      options: ["31 December 2027", "10 November 2027", "31 March 2028", "31 December 2028"],
      answer: 0,
      explain: "The loan falls in the period to 31 March 2027. The deadline is 9 months after the period end: 31 December 2027 (tax payable 1 January 2028).",
    },
    {
      kind: "journal",
      id: "s455-journal",
      prompt: "Post the payment of £8,000 s455 tax to HMRC (the loan is expected to be repaid).",
      accounts: ["s455 tax recoverable (debtor)", "Corporation tax expense", "Bank", "Director's loan account", "Dividends (reserves)", "Corporation tax liability"],
      answer: [
        { account: "s455 tax recoverable (debtor)", dr: 8000 },
        { account: "Bank", cr: 8000 },
      ],
      explain: "The tax is refundable, so it is an asset (a debtor), not an expense, and it is not deductible for corporation tax.",
    },
    {
      kind: "classify",
      id: "classify-s455",
      prompt: "Is the s455 charge likely to apply?",
      categories: ["s455 applies", "s455 does not apply"],
      items: [
        { text: "£18,000 DLA debit for a 60% shareholder, outstanding at the deadline", answer: 0 },
        { text: "£12,000 loan to a full-time employee with a 2% shareholding", answer: 1, why: "Up to £15,000 to a full-time worker with no material interest is excluded (s456)." },
        { text: "Company pays an associate (the director's spouse) £9,000 as a loan", answer: 0, why: "Associates of participators are caught." },
        { text: "A trade debt from a customer who is also a shareholder, on normal 30-day terms", answer: 1, why: "Ordinary trade credit is excluded." },
      ],
      explain: "Check close company status, participator or associate, then the exceptions.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-rate",
      prompt: "What is the s455 rate for a loan made on 1 May 2026?",
      options: ["25%", "32.5%", "33.75%", "35.75%"],
      answer: 3,
      explain: "From 6 April 2026 the rate follows the dividend upper rate of 35.75%.",
    },
    {
      kind: "mcq",
      id: "q-due",
      prompt: "When is s455 tax due?",
      options: ["With the director's tax return", "9 months and 1 day after the end of the accounting period of the loan", "On the date of the loan", "12 months after the loan"],
      answer: 1,
      explain: "It is due on the corporation tax payment date for the period.",
    },
    {
      kind: "mcq",
      id: "q-who-pays",
      prompt: "Who pays s455 tax?",
      options: ["The director", "The company", "The shareholder personally through Self Assessment", "HMRC"],
      answer: 1,
      explain: "It is a corporation tax charge on the company.",
    },
    {
      kind: "mcq",
      id: "q-refund",
      prompt: "A loan on which s455 was paid is repaid in a later period. When is the refund due?",
      options: ["Immediately", "9 months and 1 day after the end of the period in which the repayment was made", "At the end of the original period", "Never"],
      answer: 1,
      explain: "The relief arises in the period of repayment and is repaid by HMRC 9 months and 1 day after the end of that period.",
    },
    {
      kind: "mcq",
      id: "q-deductible",
      prompt: "Is s455 tax deductible for corporation tax?",
      options: ["Yes", "No", "50%", "Only if repaid"],
      answer: 1,
      explain: "It is a tax charge, not a business expense, and is in any case refundable.",
    },
    {
      kind: "mcq",
      id: "q-return",
      prompt: "Where is the s455 charge reported?",
      options: ["P11D", "CT600A supplementary page", "VAT return", "Confirmation statement"],
      answer: 1,
      explain: "The CT600A records the loans and the s455 tax and relief.",
    },
  ],
  sources: [
    { label: "CTM61505 – loans to participators: general", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61505" },
    { label: "Corporation Tax: rate of tax for the loans to participators charge", url: "https://www.gov.uk/government/publications/corporation-tax-rate-of-tax-for-the-loans-to-participators-charge/corporation-tax-rate-of-tax-for-the-loans-to-participators-charge" },
    { label: "CTM61600 – relief on repayment: time limits", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61600" },
    { label: "CTM61575 – arrangements conferring benefit on participators (s464A)", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61575" },
    { label: "CTA 2010 s455", url: "https://www.legislation.gov.uk/ukpga/2010/4/section/455" },
    { label: "CTA 2010 s458 – relief in case of repayment etc.", url: "https://www.legislation.gov.uk/ukpga/2010/4/section/458" },
    { label: "Director's loans: if you owe your company money", url: "https://www.gov.uk/directors-loans/you-owe-your-company-money" },
  ],
};
