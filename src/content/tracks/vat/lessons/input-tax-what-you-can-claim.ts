import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "input-tax-what-you-can-claim",
  title: "Input tax: what a client can and can't claim",
  level: "practitioner",
  minutes: 35,
  taxYear: "2026/27",
  summary:
    "The everyday 'can I claim the VAT on this?' question — the four conditions for recovery, the blocked items (entertainment, cars, directors' homes), and how to handle mixed business and private use.",
  objectives: [
    "Apply the four conditions for input tax recovery to any purchase",
    "Spot the statutory blocks: business entertainment, cars and domestic accommodation for directors",
    "Choose the right treatment for road fuel and apportion mixed-use costs",
    "Recognise purchases that carry no VAT to claim at all (exempt, zero-rated, unregistered suppliers)",
  ],
  body: [
    {
      kind: "md",
      md: `Input tax is the VAT a VAT-registered business pays on its purchases. It's recovered by deducting it from output tax on the VAT return. Most of the queries you'll get from clients come down to one question: **is this VAT actually recoverable?** Work through it in the same order every time.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The four conditions",
      md: `VAT can only be claimed as input tax when **all four** are met (VATA 1994 ss24–26):

1. **The client is VAT registered** when the cost is incurred. Pre-registration costs have their own rules, covered below.
2. **The supply was made to the client.** The business, not the director personally or a connected company, is the one receiving the goods or services.
3. **It's used for the business and for making taxable supplies.** Private use and exempt activities don't qualify.
4. **There's evidence**, normally a valid VAT invoice, and the claim is made within **4 years**.`,
    },
    {
      kind: "md",
      md: `### Purchases with no VAT to claim in the first place

Before you get to the blocks, check whether there's any VAT on the purchase at all. A lot of "missing" VAT was never charged:

- **Exempt supplies:** insurance, most bank charges, Royal Mail postage stamps, and residential rent.
- **Zero-rated supplies:** most food from a supermarket, train and air fares, books and newspapers. VAT is charged at 0%, so there's nothing to recover.
- **Outside the scope of VAT:** wages, MOT certificates, congestion charges, Companies House fees, business rates, and fines and penalties.
- **Suppliers that aren't VAT registered:** if there's no VAT number on the invoice, there's no VAT to claim, even if the price looks VAT-inclusive.`,
    },
    {
      kind: "table",
      caption: "The statutory blocks: VAT that cannot be recovered even though it was charged",
      head: ["Cost", "Treatment", "Where the rule is"],
      rows: [
        ["Entertaining UK clients, suppliers or other non-employees", "Blocked", "VAT (Input Tax) Order 1992 art 5"],
        ["Staff entertainment (Christmas party, team meal) for employees only", "Recoverable", "Notice 700/65"],
        ["Entertaining overseas customers", "Recoverable if reasonable in scale (e.g. a modest working meal)", "Notice 700/65"],
        ["Buying a car that's available for private use", "Blocked in full", "Input Tax Order art 7"],
        ["Leasing a car with some private use", "50% of the VAT on the lease charge is blocked", "Input Tax Order art 7(2E)"],
        ["Commercial vans, repairs and servicing on business vehicles", "Recoverable", "Notice 700/64"],
        ["Domestic accommodation for a director or their family", "Blocked", "VATA 1994 s24(3)"],
        ["Goods bought under the second-hand margin scheme", "No VAT shown, so nothing to claim", "Notice 718"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Mixed staff and client events",
      md: `If staff attend a client event as **hosts**, the whole cost is client entertainment and the VAT is blocked. If it's a genuine staff event that a few clients also attend, **apportion** the cost per head and recover only the staff share.`,
    },
    {
      kind: "md",
      md: `### Road fuel: three options

1. **Claim all fuel VAT and account for the fuel scale charge.** The scale charge is a fixed amount of output tax based on the car's CO₂ emissions, and it covers the private use. This works best when private mileage is high.
2. **Claim only the business share.** You need detailed mileage records to support the percentage.
3. **Claim nothing on fuel**, including commercial vehicles. This is simple, but usually means losing money.

For mileage allowances paid to employees, the business can recover the VAT within the **fuel element** of the allowance, using HMRC's advisory fuel rates. It must keep fuel receipts that cover that amount.`,
    },
    {
      kind: "md",
      md: `### Mixed business and private use

If a purchase is used partly for business and partly privately (for example a sole trader's mobile phone contract or broadband), only the **business proportion** is input tax. Use a fair and reasonable method that you can evidence, such as an itemised bill, the proportion of time used for business, or floor area. Write the method on file so it's applied the same way every quarter.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Pre-registration VAT",
      md: `Once a client registers, they can claim VAT they paid **before** registration:
- **Goods** bought in the 4 years before registration, if they're still held at registration (stock and equipment, but not goods already used up or sold).
- **Services** received in the 6 months before registration.

In both cases the goods or services must be for the business that is now registered. Claim them on the first VAT return.`,
    },
    {
      kind: "md",
      md: `### Evidence

- A **full VAT invoice** must show the supplier's VAT number, an invoice number, the date, the customer's name and address, a description, the net amount, the rate and the VAT.
- A **simplified invoice** is allowed for retail sales up to **£250 including VAT**. Most till receipts that show a VAT number are fine.
- If the invoice is lost, HMRC *may* accept alternative evidence, but this is at its discretion. Don't rely on it.
- An invoice made out to the director personally is a warning sign for condition 2.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Flat Rate Scheme clients",
      md: `If the client is on the **Flat Rate Scheme**, none of the above applies day to day: they pay a flat percentage of turnover and **don't reclaim input tax**. The only exception is a single capital asset costing **£2,000 or more including VAT**.`,
    },
  ],
  scenario: {
    title: "Coding a quarter's purchases for Bright Spark Electrical Ltd",
    narrative: `Bright Spark Electrical Ltd is a VAT-registered electrical contractor using standard accounting (not the Flat Rate Scheme). Its director, Priya, has sent the purchase receipts for the quarter and asks: *"Can we claim the VAT on all of these?"*

| # | Item | Gross | VAT shown |
|---|------|------:|----------:|
| 1 | Cable and fittings from wholesaler | £1,200 | £200 |
| 2 | Dinner with a main contractor to discuss a tender | £180 | £30 |
| 3 | Christmas meal for the 6 employees | £540 | £90 |
| 4 | New Transit van | £36,000 | £6,000 |
| 5 | Lease of Priya's Audi (some private use) | £600 | £100 |
| 6 | Van insurance | £1,450 | £0 |
| 7 | Train ticket to a trade show | £96 | £0 |
| 8 | Priya's home broadband (60% business use, invoice to the company) | £36 | £6 |`,
    walkthrough: [
      {
        kind: "md",
        md: `Apply the four conditions first, then check each item against the blocks:

1. **Cable and fittings:** used to make the business's taxable supplies, with a valid invoice. **Claim £200.**
2. **Contractor dinner:** business entertainment of a UK non-employee. **Blocked, so claim £0.** Post the full £180 to entertainment.
3. **Staff Christmas meal:** employees only, so it's staff entertainment. **Claim £90.**
4. **Transit van:** a commercial vehicle, not a car. **Claim £6,000.** It's a capital item, so it goes on the balance sheet net of VAT.
5. **Audi lease:** a car with private use, so 50% of the VAT is blocked. **Claim £50.** The other £50 is added to the lease cost.
6. **Insurance:** exempt, so there's no VAT to claim.
7. **Train ticket:** zero-rated, so there's no VAT to claim.
8. **Broadband:** the invoice is to the company and the use is mixed. **Claim 60% × £6 = £3.60.** Keep a note of how you arrived at the 60%.`,
      },
      {
        kind: "table",
        caption: "Input tax for the quarter",
        head: ["Item", "VAT shown", "Claim", "Reason"],
        rows: [
          ["Cable and fittings", "£200.00", "£200.00", "Taxable business use"],
          ["Contractor dinner", "£30.00", "£0.00", "Client entertainment: blocked"],
          ["Staff Christmas meal", "£90.00", "£90.00", "Staff entertainment"],
          ["Transit van", "£6,000.00", "£6,000.00", "Commercial vehicle"],
          ["Audi lease", "£100.00", "£50.00", "50% lease restriction"],
          ["Broadband", "£6.00", "£3.60", "60% business use"],
          ["**Total**", "", "**£6,343.60**", ""],
        ],
      },
      {
        kind: "journal",
        title: "Posting the Audi lease invoice",
        narrative: "The blocked half of the VAT becomes part of the motor expense, not input tax.",
        lines: [
          { account: "Motor expenses – car lease", dr: 550 },
          { account: "VAT control (input tax)", dr: 50 },
          { account: "Trade creditors", cr: 600 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-purchases",
      prompt: "A VAT-registered marketing agency (standard accounting) sends you these purchases. Classify each one.",
      categories: ["Recoverable in full", "Partly recoverable", "Blocked", "No VAT to claim"],
      items: [
        { text: "Laptop for a designer, from a VAT-registered retailer", answer: 0 },
        { text: "Lunch with a prospective UK client", answer: 2, why: "Business entertainment of a non-employee." },
        { text: "Professional indemnity insurance", answer: 3, why: "Insurance is exempt." },
        { text: "Mobile contract used 70% for business, billed to the company", answer: 1, why: "Recover the business proportion only." },
        { text: "Purchase of a car for the MD, available for private use", answer: 2, why: "Cars with private availability are blocked." },
        { text: "Office team-building day for employees only", answer: 0, why: "Staff entertainment is recoverable." },
        { text: "Invoice from a freelance copywriter with no VAT number", answer: 3, why: "An unregistered supplier can't charge VAT." },
      ],
      explain:
        "Check whether there's any VAT at all (exempt, zero-rated, unregistered supplier), then check the statutory blocks, then apportion any mixed use. Entertaining a non-employee in the UK is always blocked, however business-focused the lunch was.",
    },
    {
      kind: "numeric",
      id: "lease-restriction",
      prompt: "A client leases a car for the sales director, who also uses it privately. The monthly lease invoice is £480 net plus £96 VAT. How much input tax can be claimed **each month**?",
      answer: 48,
      unit: "£",
      explain: "Where a leased car is available for private use, 50% of the VAT on the leasing charge is blocked. The other half is recoverable.",
      working: "£96 × 50% = **£48** recoverable. The other £48 is added to the motor expense.",
    },
    {
      kind: "journal",
      id: "post-entertainment",
      prompt:
        "Post a £240 restaurant bill (including £40 VAT) for taking a UK customer to dinner, paid from the business bank account. Use the accounts given.",
      accounts: ["Entertainment – client (disallowable)", "Staff welfare", "VAT control (input tax)", "Bank", "Trade creditors", "Director's loan account"],
      answer: [
        { account: "Entertainment – client (disallowable)", dr: 240 },
        { account: "Bank", cr: 240 },
      ],
      explain:
        "The VAT is blocked, so it can't go to the VAT control account. The whole £240 is the cost of the entertainment. It's also disallowable for corporation tax, which is why it's useful to keep client entertainment in its own nominal code.",
    },
    {
      kind: "numeric",
      id: "pre-registration",
      prompt:
        "A client registers for VAT on 1 March. Before that it paid VAT of £1,800 on equipment bought 2 years ago (still in use), £300 on stock bought last year that was all sold in January, and £450 on accountancy fees invoiced 4 months before registration. How much pre-registration VAT can it claim?",
      answer: 2250,
      unit: "£",
      explain:
        "Goods are claimable if bought within 4 years and **still held** at registration, so the equipment qualifies but the stock that was sold doesn't. Services are claimable if received within **6 months** before registration, so the accountancy fees qualify.",
      working: "Equipment £1,800 + accountancy £450 = **£2,250**. The stock (£300) is excluded because it had already been sold.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-entertain-overseas",
      prompt: "A client takes a visiting customer from Germany out for a modest working lunch. What's the VAT position?",
      options: ["Blocked: all entertainment is blocked", "Recoverable, as long as the hospitality is reasonable in scale", "Recoverable only at 50%", "Outside the scope of VAT"],
      answer: 1,
      explain: "HMRC accepts input tax on reasonable hospitality for overseas customers. The block applies to entertaining UK non-employees.",
    },
    {
      kind: "mcq",
      id: "q-van",
      prompt: "A company buys a panel van (not a car) for £24,000 plus £4,800 VAT. The director occasionally uses it at weekends. How much VAT can be claimed?",
      options: ["£0", "£2,400", "£4,800", "£4,800 with a fuel scale charge"],
      answer: 2,
      explain:
        "The car block only applies to cars. A commercial van is recoverable in full. Significant private use could require an output tax adjustment, but occasional incidental use is not blocked.",
    },
    {
      kind: "mcq",
      id: "q-frs",
      prompt: "A client on the Flat Rate Scheme buys a £900 (including VAT) printer. Can they reclaim the VAT?",
      options: ["Yes, FRS clients reclaim all input tax", "No, it's under the £2,000 capital goods threshold", "Yes, all capital items qualify", "Only if they leave the scheme"],
      answer: 1,
      explain: "FRS users can only reclaim VAT on a single capital asset costing £2,000 or more including VAT.",
    },
    {
      kind: "mcq",
      id: "q-time-limit",
      prompt: "What is the time limit for claiming input tax that was missed on an earlier return?",
      options: ["12 months", "2 years", "4 years", "6 years"],
      answer: 2,
      explain: "Input tax must be claimed within 4 years of the due date of the return for the period in which it could first have been claimed.",
    },
    {
      kind: "mcq",
      id: "q-simplified",
      prompt: "Up to what VAT-inclusive value can a retailer issue a simplified VAT invoice?",
      options: ["£100", "£250", "£500", "£1,000"],
      answer: 1,
      explain: "Simplified invoices are allowed for retail supplies up to £250 including VAT.",
    },
    {
      kind: "mcq",
      id: "q-director-home",
      prompt: "A company pays for redecorating the director's home, which the director lives in. Is the VAT recoverable?",
      options: ["Yes, if the company pays for it", "Yes, 50%", "No: domestic accommodation for a director is blocked", "Only if the director works from home"],
      answer: 2,
      explain:
        "VATA 1994 s24(3) blocks VAT on goods and services used in connection with domestic accommodation for directors. Expect benefit-in-kind consequences too.",
    },
  ],
  sources: [
    { label: "VAT guide (VAT Notice 700)", url: "https://www.gov.uk/guidance/vat-guide-notice-700" },
    { label: "Business entertainment and VAT (Notice 700/65)", url: "https://www.gov.uk/guidance/business-entertainment-and-vat-notice-70065" },
    { label: "VAT on motoring expenses (Notice 700/64)", url: "https://www.gov.uk/guidance/vat-on-motoring-expenses-notice-70064" },
    { label: "HMRC VAT Input Tax manual", url: "https://www.gov.uk/hmrc-internal-manuals/vat-input-tax" },
    { label: "VAT Act 1994 s24 – input tax and output tax", url: "https://www.legislation.gov.uk/ukpga/1994/23/section/24" },
    { label: "VAT Flat Rate Scheme (Notice 733)", url: "https://www.gov.uk/guidance/flat-rate-scheme-for-small-businesses-vat-notice-733--2" },
  ],
};
