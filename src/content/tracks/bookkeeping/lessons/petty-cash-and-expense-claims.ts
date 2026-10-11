import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "petty-cash-and-expense-claims",
  title: "Petty cash and expense claims",
  level: "foundation",
  minutes: 30,
  taxYear: "2026/27",
  summary:
    "Running an imprest petty cash float, analysing vouchers and receipts (including the VAT), processing employee and director expense claims, and paying business mileage at HMRC's approved rates for 2026/27.",
  objectives: [
    "Operate an imprest petty cash system and calculate the top-up",
    "Analyse petty cash and expense receipts, claiming VAT only where it's valid",
    "Calculate a mileage claim at the 2026/27 approved mileage allowance payment rates",
    "Post expense claims through an expenses-payable or director's loan account",
  ],
  body: [
    {
      kind: "md",
      md: `Small spends (stamps, milk, a taxi, parking, a train ticket to a client) are rarely paid by bank transfer. They're paid from **petty cash**, or by an employee personally who then **claims** them back. Both need the same discipline: a receipt for everything, the right expense code, VAT claimed only where there's valid evidence, and a reconciliation that proves the money is all accounted for.`,
    },
    {
      kind: "md",
      md: `### The imprest system

Most businesses run petty cash on an **imprest** basis:

1. Set a fixed float, say £200, held in a locked tin by one named person.
2. Every payment out is supported by a receipt and a signed **petty cash voucher**.
3. At any time, **cash in the tin + vouchers = the float**.
4. At the month end, the vouchers are entered and the float is **topped up by exactly the amount spent**.

The top-up is a transfer: Dr Petty cash, Cr Bank. The vouchers are posted as expenses against the petty cash account, which acts as a mini bank account in the software.`,
    },
    {
      kind: "journal",
      title: "Posting a month's petty cash vouchers",
      narrative: "Stamps £18 (exempt), stationery £24 including £4 VAT, milk and tea £13 (zero-rated), taxi £21 from a driver who isn't VAT registered.",
      lines: [
        { account: "Postage", dr: 18 },
        { account: "Stationery", dr: 20 },
        { account: "VAT control", dr: 4 },
        { account: "Staff welfare", dr: 13 },
        { account: "Travel", dr: 21 },
        { account: "Petty cash", cr: 76 },
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "VAT on small receipts",
      md: `Only claim VAT where the receipt shows the supplier's **VAT number** and the purchase is standard- or reduced-rated. Postage stamps are exempt; most food from a supermarket, train tickets and newspapers are zero-rated; many taxi drivers and market traders aren't VAT registered. Coding every petty cash receipt at 20% is one of the commonest VAT errors in small-business books.`,
    },
    {
      kind: "md",
      md: `### Expense claims

When an employee or director pays for business costs personally:

1. They submit a claim with receipts (or use an expenses app).
2. A manager approves it.
3. It's posted: Dr each expense code and VAT control (where there's a valid VAT receipt), Cr **Employee expenses payable** (for employees) or Cr **Director's loan account** (for directors).
4. When reimbursed: Dr Expenses payable (or DLA), Cr Bank.

Posting claims through a payable account rather than straight from the bank keeps a record of what's owed and stops claims being paid twice.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Approved mileage rates for 2026/27",
      md: `Employees using their own vehicle for business can be paid up to HMRC's **approved mileage allowance payments (AMAP)** tax-free. From **6 April 2026** the rates are:

| Vehicle | First 10,000 business miles in the tax year | Each mile over 10,000 |
|---|---:|---:|
| Cars and vans | **55p** | **25p** |
| Motorcycles | 24p | 24p |
| Bicycles | 20p | 20p |

(The car rate was 45p for the first 10,000 miles from 2011/12 to 2025/26.) Payments above these rates are taxable; employees paid less can claim tax relief on the shortfall.`,
    },
    {
      kind: "md",
      md: `**VAT on mileage:** the business can reclaim VAT only on the **fuel element** of a mileage allowance, using HMRC's advisory fuel rates (or AA/RAC rates), with mileage records kept. Most small clients post mileage **without VAT**; if a client wants to claim, set up the calculation properly and keep the records.

**Mileage is for business journeys only.** Ordinary commuting between home and a permanent workplace isn't business travel.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Controls that stop petty cash going missing",
      md: `- One custodian, a locked tin, and a float no bigger than a month's needs.
- Surprise counts by someone else.
- No IOUs or "borrowing" from the tin.
- Vouchers signed by the person receiving the cash and approved by a manager.
- If a client's petty cash regularly "needs" topping up without vouchers, treat it as a red flag.`,
    },
  ],
  scenario: {
    title: "Linwood Architects Ltd: petty cash and Priya's expense claim",
    narrative: `**Linwood Architects Ltd** (VAT registered) keeps a **£200** petty cash float. At 31 May the tin holds **£124** in cash and four vouchers (the ones in the journal above, totalling **£76**).

An architect, **Priya**, has also submitted her May expense claim:
- **420** business miles in her own car (her first business mileage this tax year)
- Car park at a client site **£12** (VAT receipt showing £2 VAT)
- Train ticket **£64**
- Hotel for one night **£120** (VAT invoice addressed to Linwood showing £20 VAT)`,
    walkthrough: [
      {
        kind: "md",
        md: `**Petty cash:** £124 cash + £76 vouchers = £200, so the float is intact. Post the vouchers (journal above) and top up the float with **£76** from the bank: Dr Petty cash £76, Cr Bank £76.

**Priya's claim:**

- Mileage: 420 × 55p = **£231** (well within her first 10,000 miles). No VAT claimed.
- Car park: £10 net + £2 VAT.
- Train: £64, zero-rated, no VAT.
- Hotel: £100 net + £20 VAT.

Total claim: £231 + £12 + £64 + £120 = **£427**.`,
      },
      {
        kind: "journal",
        title: "Posting Priya's expense claim",
        lines: [
          { account: "Mileage allowances", dr: 231 },
          { account: "Travel", dr: 74 },
          { account: "Accommodation", dr: 100 },
          { account: "VAT control", dr: 22 },
          { account: "Employee expenses payable", cr: 427 },
        ],
        narrative: "Travel is the £10 net parking plus the £64 train ticket. VAT is £2 (parking) + £20 (hotel). When Priya is reimbursed: Dr Employee expenses payable £427, Cr Bank £427.",
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "imprest-top-up",
      prompt: "A client runs a **£150** imprest float. At the month end the tin contains **£41** in cash and the vouchers total **£109**. How much should be drawn from the bank to restore the float?",
      answer: 109,
      unit: "£",
      explain: "Under the imprest system the top-up equals the amount spent, which should equal the vouchers, and cash plus vouchers should equal the float.",
      working: "£150 − £41 = **£109**, agreeing to the vouchers (£41 + £109 = £150 ✓).",
    },
    {
      kind: "numeric",
      id: "annual-mileage",
      prompt: "An employee drives **12,400** business miles in her own car during 2026/27. What is the maximum the employer can pay her tax-free for the year under AMAP?",
      answer: 6100,
      unit: "£",
      explain: "55p for the first 10,000 business miles in the tax year, 25p for each mile above that.",
      working: "10,000 × £0.55 = £5,500; 2,400 × £0.25 = £600. Total **£6,100**.",
    },
    {
      kind: "journal",
      id: "post-vouchers",
      prompt: `Post these petty cash vouchers for a VAT-registered client: postage stamps **£15**; cleaning materials **£30** including **£5** VAT (valid receipt); milk **£9**.`,
      accounts: ["Postage", "Cleaning", "Staff welfare", "VAT control", "Petty cash", "Bank – current account", "Sundry expenses"],
      answer: [
        { account: "Postage", dr: 15 },
        { account: "Cleaning", dr: 25 },
        { account: "VAT control", dr: 5 },
        { account: "Staff welfare", dr: 9 },
        { account: "Petty cash", cr: 54 },
      ],
      explain: "Stamps are exempt and milk is zero-rated, so only the cleaning materials carry recoverable VAT. The cash came from petty cash, not the bank. The top-up would be a separate Dr Petty cash, Cr Bank of £54.",
    },
    {
      kind: "classify",
      id: "classify-vat-receipts",
      prompt: "A VAT-registered client's staff hand in these receipts. Can VAT be reclaimed?",
      categories: ["VAT reclaimable (valid receipt)", "No VAT to reclaim"],
      items: [
        { text: "Book of first-class stamps from the Post Office", answer: 1, why: "Exempt." },
        { text: "Printer paper from a stationer, receipt shows VAT number and VAT", answer: 0 },
        { text: "Train ticket to a client meeting", answer: 1, why: "Zero-rated." },
        { text: "Taxi from a driver whose receipt has no VAT number", answer: 1 },
        { text: "Pay-and-display car park run by a company, receipt shows VAT", answer: 0 },
        { text: "Sandwiches for the staff room from a supermarket (cold food)", answer: 1, why: "Most cold food is zero-rated." },
      ],
      explain: "No VAT number or a zero-rated or exempt supply means nothing to reclaim. Only standard- or reduced-rated purchases with a valid VAT receipt qualify.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-amap-rate",
      prompt: "What is the approved mileage rate for the first 10,000 business miles in a car in 2026/27?",
      options: ["45p", "50p", "55p", "25p"],
      answer: 2,
      explain: "From 6 April 2026 the rate for cars and vans is 55p for the first 10,000 business miles (previously 45p), then 25p.",
    },
    {
      kind: "mcq",
      id: "q-imprest-rule",
      prompt: "In an imprest system, at any time:",
      options: ["Cash equals the bank balance", "Cash plus vouchers equals the fixed float", "Vouchers equal the float", "Cash equals last month's top-up"],
      answer: 1,
      explain: "That's the control: whatever has left the tin is represented by a voucher.",
    },
    {
      kind: "mcq",
      id: "q-director-claim",
      prompt: "A director's approved expense claim that hasn't been reimbursed yet is credited to:",
      options: ["Sales", "Director's loan account", "Wages", "Petty cash"],
      answer: 1,
      explain: "The company owes the director, which is recorded in the director's loan account.",
    },
    {
      kind: "mcq",
      id: "q-mileage-vat",
      prompt: "Can a business reclaim VAT on mileage allowances paid to employees?",
      options: ["Yes, 20% of the whole allowance", "Only on the fuel element, with mileage records", "Never", "Only for electric cars"],
      answer: 1,
      explain: "Input tax is limited to the VAT fraction of the fuel element (Notice 700/64), using advisory fuel rates and proper mileage records.",
    },
    {
      kind: "mcq",
      id: "q-commuting",
      prompt: "An employee claims mileage for driving from home to the office where they always work. This is:",
      options: ["Business mileage", "Ordinary commuting, not business travel", "Claimable at 25p", "Claimable if they work late"],
      answer: 1,
      explain: "Travel between home and a permanent workplace is ordinary commuting and doesn't qualify.",
    },
  ],
  sources: [
    { label: "HMRC – Travel, mileage and fuel rates and allowances", url: "https://www.gov.uk/government/publications/rates-and-allowances-travel-mileage-and-fuel-allowances/travel-mileage-and-fuel-rates-and-allowances" },
    { label: "GOV.UK – Expenses and benefits: business travel mileage (rules for tax)", url: "https://www.gov.uk/expenses-and-benefits-business-travel-mileage/rules-for-tax" },
    { label: "VAT on motoring expenses (Notice 700/64)", url: "https://www.gov.uk/guidance/vat-on-motoring-expenses-notice-70064" },
    { label: "GOV.UK – Advisory fuel rates", url: "https://www.gov.uk/guidance/advisory-fuel-rates" },
    { label: "GOV.UK – VAT rates on different goods and services", url: "https://www.gov.uk/guidance/rates-of-vat-on-different-goods-and-services" },
  ],
};
