import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "flat-rate-scheme",
  title: "The Flat Rate Scheme and limited cost traders",
  level: "practitioner",
  minutes: 35,
  taxYear: "2026/27",
  summary:
    "How the Flat Rate Scheme works: VAT as a fixed percentage of gross turnover, the sector rates, the 1% first-year discount, the 16.5% limited cost trader rate and the test behind it, capital assets, and how to tell whether the scheme still saves the client money.",
  objectives: [
    "Apply the joining and leaving limits for the Flat Rate Scheme",
    "Calculate flat rate turnover and the VAT due using the correct sector percentage",
    "Run the limited cost trader test each period and apply the 16.5% rate",
    "Compare the scheme with standard accounting and post flat rate sales correctly",
  ],
  body: [
    {
      kind: "md",
      md: `Under the **Flat Rate Scheme (FRS)** a small business still charges customers VAT at the normal rate, but it pays HMRC a **fixed percentage of its VAT-inclusive turnover** instead of working out output tax less input tax. It doesn't reclaim input tax on purchases, apart from single capital assets costing £2,000 or more.

The aim is simpler admin. Whether it saves money depends on how the client's costs compare with the assumptions built into its sector percentage.`,
    },
    {
      kind: "table",
      caption: "Key limits (Notice 733)",
      head: ["Rule", "Figure"],
      rows: [
        ["Join if expected taxable turnover (excluding VAT) in the next 12 months is", "£150,000 or less"],
        ["Must leave if total VAT-inclusive income in the year to the scheme anniversary exceeds", "£230,000 (or is expected to exceed £230,000 in the next 30 days alone)"],
        ["First-year discount", "1% off the flat rate for the first 12 months of VAT registration"],
        ["Capital assets", "VAT reclaimable outside the scheme on a single purchase of capital goods costing £2,000 or more including VAT"],
        ["Limited cost business rate", "16.5%, whatever the trade sector"],
        ["Rejoining", "Not within 12 months of leaving"],
      ],
    },
    {
      kind: "table",
      caption: "A selection of sector percentages (GOV.UK, 'Work out your flat rate')",
      head: ["Trade sector", "Flat rate"],
      rows: [
        ["Accountancy or book-keeping", "14.5%"],
        ["Computer and IT consultancy or data processing", "14.5%"],
        ["Management consultancy", "14%"],
        ["Architect, civil and structural engineer or surveyor", "14.5%"],
        ["Labour-only building or construction services", "14.5%"],
        ["Hairdressing or other beauty treatment services", "13%"],
        ["Catering services, including restaurants and takeaways", "12.5%"],
        ["Any other activity not listed elsewhere", "12%"],
        ["Photography", "11%"],
        ["General building or construction services", "9.5%"],
        ["Retailing food, confectionery, tobacco, newspapers or children's clothing", "4%"],
      ],
    },
    {
      kind: "md",
      md: `### Flat rate turnover

The percentage is applied to the **VAT-inclusive** value of all supplies in the period, **including exempt and zero-rated income** (Notice 733 section 6). It leaves out:
- non-business and private income, and bank interest,
- sales of capital assets on which input tax was reclaimed (these are dealt with separately),
- reverse-charge services bought from abroad, and goods imported under postponed VAT accounting. These are accounted for outside the flat rate calculation.

Turnover is normally based on invoices issued, but the client can choose a cash-based turnover method instead.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The limited cost trader test",
      md: `A business is a **limited cost business** for a VAT period if its spending on **relevant goods**, including VAT, is:
- **less than 2%** of its VAT-inclusive flat rate turnover, **or**
- more than 2% but **less than £1,000 a year** (£250 for a quarterly return).

If so, it must use **16.5%** for that period. **Relevant goods** must be used exclusively for the business and exclude:
- capital expenditure,
- food and drink for the business or its staff,
- vehicles, vehicle parts and fuel (unless the business provides transport services),
- **any services** (rent, software subscriptions, accountancy, phone contracts). Only goods count.

The test is run **every return period**, so a business near the line can move between rates from one quarter to the next.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "16.5% usually means FRS costs money",
      md: `At 16.5% of gross turnover, a limited cost trader pays 16.5% × 120 = **19.8% of its net sales**, almost the full 20% output tax, and still can't reclaim input tax. That's usually more than it would pay under standard accounting. Most labour-only contractors (IT contractors, consultants) are better off leaving the scheme. Check every client on FRS at least once a year.`,
    },
    {
      kind: "md",
      md: `### Recording it and filling in the return

- Raise sales invoices with VAT at the normal rate. Customers reclaim that VAT as usual.
- Flat rate VAT due goes in **box 1**. **Box 6** shows flat rate turnover (VAT-inclusive). **Box 4** is normally nil, apart from capital asset claims.
- In the accounts, the difference between the VAT charged to customers and the flat rate VAT paid is extra **income**, which is taxable.

**Capital goods claimed outside the scheme.** If the client reclaims input tax on a capital asset costing £2,000 or more, output tax is due at the normal rate when it's sold, and that sale is left out of flat rate turnover.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Pick the sector by the main activity",
      md: `Choose the sector that matches the business's main activity by turnover, and write down why it was chosen. If the mix changes, review it on each anniversary. HMRC won't normally change a reasonable choice retrospectively, but an unreasonable choice can be corrected back to the start.`,
    },
  ],
  scenario: {
    title: "Is the Flat Rate Scheme still right for Kestrel Data Services Ltd?",
    narrative: `Kestrel Data Services Ltd is a one-person IT contracting company owned by Mei. It registered for VAT three years ago and joined the FRS using the "computer and IT consultancy" rate of 14.5%. For the quarter to 30 September 2026:

- Invoiced to the client agency: £21,000 + £4,200 VAT = **£25,200**
- Goods bought: printer ink and paper £48, a monitor (£180 including VAT), food for meetings £60
- Services bought: accountancy fees, software subscriptions and a co-working desk, about £900 including VAT

Mei asks: *"Which rate should we use this quarter, and are we still better off on the scheme?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: relevant goods.** Ink and paper (£48) and the monitor (£180) are goods used exclusively for the business. The monitor is equipment, but it costs well under £2,000, so it isn't a capital asset that would be reclaimed separately. Count it. Food for meetings is excluded, and **services don't count at all**. Relevant goods: £48 + £180 = **£228**.

**Step 2: the test.** 2% × £25,200 = £504. £228 is less than £504, so Kestrel is a **limited cost business** for this quarter. (It's also below the £250 quarterly figure.)

**Step 3: VAT due.** £25,200 × 16.5% = **£4,158**.`,
      },
      {
        kind: "table",
        caption: "Flat rate compared with standard accounting for the quarter",
        head: ["", "Flat Rate Scheme (16.5%)", "Standard accounting"],
        rows: [
          ["Output tax / flat rate VAT", "£4,158.00", "£4,200.00"],
          ["Input tax reclaimable", "£0.00", "£38.00 (VAT in the ink, paper and monitor) + £150.00 (VAT in the services) = £188.00"],
          ["**Net VAT payable**", "**£4,158.00**", "**£4,012.00**"],
        ],
      },
      {
        kind: "md",
        md: `On standard accounting Kestrel would pay **£146 less** this quarter. The scheme now costs Mei money, so we recommend leaving it from the start of the next quarter. A business can leave the FRS voluntarily at any time by telling HMRC, and can't rejoin for 12 months.

The VAT on the services was estimated at 1/6 of £900 = £150, assuming all those suppliers are VAT registered. Check the actual invoices before advising.`,
      },
      {
        kind: "journal",
        title: "Recording a quarter's sales while still on the scheme",
        narrative: "Kestrel receives £25,200 and pays HMRC £4,158. The £42 difference stays in sales as income.",
        lines: [
          { account: "Trade debtors", dr: 25200 },
          { account: "Sales", cr: 21042 },
          { account: "VAT control (output tax)", cr: 4158 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "builder-frs",
      prompt:
        "A general builder on the FRS (rate 9.5%, not in its first year of registration, and **not** a limited cost business) has invoiced £30,000 + £6,000 VAT of standard-rated work in the quarter. What VAT is due to HMRC?",
      answer: 3420,
      unit: "£",
      explain: "The flat rate is applied to VAT-inclusive turnover, not the net figure.",
      working: "(£30,000 + £6,000) × 9.5% = £36,000 × 9.5% = **£3,420**.",
    },
    {
      kind: "numeric",
      id: "first-year-rate",
      prompt:
        "A newly registered management consultant (sector rate 14%) joins the FRS from the date of registration and is **not** a limited cost business. VAT-inclusive turnover for the first quarter is £18,000. What VAT is due?",
      answer: 2340,
      unit: "£",
      explain:
        "The 1% discount applies for the first 12 months of VAT registration, so the rate is 13%. It's applied to the sector rate. If the business were a limited cost business the discount would apply to 16.5% instead (15.5%).",
      working: "£18,000 × (14% − 1%) = £18,000 × 13% = **£2,340**.",
    },
    {
      kind: "numeric",
      id: "lct-test",
      prompt:
        "An accountancy practice on the FRS has VAT-inclusive turnover of £42,000 for the quarter. It bought £700 of goods including VAT (stationery, toner and a scanner, all used only in the business) and £3,500 of services. Using the limited cost trader test, what flat rate VAT is due for the quarter? (Accountancy sector rate: 14.5%.)",
      answer: 6930,
      unit: "£",
      explain:
        "2% of £42,000 is £840. Relevant goods of £700 are less than £840, so the business is a limited cost business this quarter even though its goods are over £250. Services never count in the test. The 16.5% rate applies instead of 14.5%.",
      working: "Test: 2% × £42,000 = £840. Goods £700 < £840, so it's a limited cost business. VAT due = £42,000 × 16.5% = **£6,930** (compared with £6,090 at 14.5%).",
    },
    {
      kind: "multi",
      id: "relevant-goods",
      prompt: "Which of these purchases count as **relevant goods** for the limited cost trader test? Select all that apply.",
      options: [
        "Stationery and printer paper used only in the office",
        "Monthly accountancy software subscription",
        "A £2,400 laptop (including VAT) reclaimed as a capital asset",
        "Petrol for the director's car",
        "Cleaning products for the office",
        "Sandwiches for a staff training day",
      ],
      answers: [0, 4],
      explain:
        "Only goods used exclusively for the business count. Software subscriptions are services. Capital expenditure, vehicle costs and fuel (for a non-transport business), and food and drink for the business or staff are all specifically excluded.",
    },
    {
      kind: "journal",
      id: "post-frs-capital",
      prompt:
        "A photographer on the FRS buys a single camera body costing £2,400 including £400 VAT, paid from the bank. Post the purchase.",
      accounts: ["Camera equipment (fixed assets)", "VAT control (input tax)", "Bank", "Sales", "Equipment expenses", "Trade creditors"],
      answer: [
        { account: "Camera equipment (fixed assets)", dr: 2000 },
        { account: "VAT control (input tax)", dr: 400 },
        { account: "Bank", cr: 2400 },
      ],
      explain:
        "A single capital asset costing £2,000 or more including VAT is the one case where an FRS user can reclaim input tax, in box 4 outside the scheme. When the camera is sold later, output tax is due at 20% on the sale, outside flat rate turnover.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-frs-join",
      prompt: "What is the turnover limit for joining the Flat Rate Scheme?",
      options: ["Expected taxable turnover of £90,000 or less", "Expected taxable turnover (excluding VAT) of £150,000 or less", "Total income of £230,000 or less", "Expected taxable turnover of £1.35 million or less"],
      answer: 1,
      explain: "Joining is based on expected VAT-exclusive taxable turnover of £150,000 or less. The £230,000 VAT-inclusive limit is the leaving test.",
    },
    {
      kind: "mcq",
      id: "q-frs-turnover",
      prompt: "An FRS user receives £5,000 of exempt rental income in the quarter alongside its standard-rated sales. How is the rent treated?",
      options: ["Ignored, because it's exempt", "Included in flat rate turnover", "Taxed at 20% separately", "It makes the business partly exempt"],
      answer: 1,
      explain: "Flat rate turnover includes all VAT-inclusive supplies, including exempt income such as rent. This can make the scheme expensive for a business with significant exempt income.",
    },
    {
      kind: "mcq",
      id: "q-lct-rate",
      prompt: "What rate applies to a limited cost business on the FRS?",
      options: ["12%", "14.5%", "16.5%", "20%"],
      answer: 2,
      explain: "Limited cost businesses use 16.5% regardless of their sector, or 15.5% during their first year of VAT registration.",
    },
    {
      kind: "mcq",
      id: "q-lct-frequency",
      prompt: "How often must the limited cost trader test be applied?",
      options: ["Once, on joining", "On each scheme anniversary", "For every VAT return period", "Only when HMRC asks"],
      answer: 2,
      explain: "The test is applied for each return period, so the rate can change from one quarter to the next.",
    },
    {
      kind: "mcq",
      id: "q-frs-leave",
      prompt: "When must a business leave the Flat Rate Scheme?",
      options: [
        "When taxable turnover passes £150,000",
        "When VAT-inclusive income in the year to its anniversary exceeds £230,000",
        "When it becomes a limited cost business",
        "After 3 years on the scheme",
      ],
      answer: 1,
      explain: "The compulsory leaving test is total VAT-inclusive income over £230,000 in the year to the anniversary, or the expectation of exceeding £230,000 in the next 30 days alone.",
    },
  ],
  sources: [
    { label: "Flat Rate Scheme for small businesses (VAT Notice 733)", url: "https://www.gov.uk/guidance/flat-rate-scheme-for-small-businesses-vat-notice-733--2" },
    { label: "VAT Flat Rate Scheme: work out your flat rate", url: "https://www.gov.uk/vat-flat-rate-scheme/how-much-you-pay" },
    { label: "FRS7100 – reduction during the first year of VAT registration", url: "https://www.gov.uk/hmrc-internal-manuals/vat-flat-rate-scheme/frs7100" },
    { label: "Tackling aggressive abuse of the VAT Flat Rate Scheme – technical note", url: "https://www.gov.uk/government/publications/tackling-aggressive-abuse-of-the-vat-flat-rate-scheme-technical-note/tackling-aggressive-abuse-of-the-vat-flat-rate-scheme-technical-note" },
  ],
};
