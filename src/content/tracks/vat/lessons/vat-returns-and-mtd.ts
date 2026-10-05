import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "vat-returns-and-mtd",
  title: "Making Tax Digital and the VAT return, box by box",
  level: "foundation",
  minutes: 40,
  taxYear: "2026/27",
  summary:
    "What Making Tax Digital requires of every VAT-registered client, what goes in each of the nine boxes, the filing and payment deadlines, and a practical review checklist before you press submit.",
  objectives: [
    "Explain the MTD for VAT requirements: digital records, digital links and compatible software",
    "Complete boxes 1 to 9 of a VAT return from a client's records",
    "State the filing and payment deadlines for monthly and quarterly returns",
    "Review a draft return using analytical checks and the VAT control account reconciliation",
  ],
  body: [
    {
      kind: "md",
      md: `### Making Tax Digital for VAT

Since periods starting on or after **1 April 2022**, **every VAT-registered business** (whatever its turnover, including voluntary registrations) must follow Making Tax Digital (MTD) unless HMRC has accepted it's exempt (for example on grounds of age, disability, remoteness or religious belief). MTD means:

1. **Digital records.** The business keeps its VAT records in software: its name, address, VAT number and any schemes used, and for each sale and purchase the tax point, the net value and the rate of VAT.
2. **Digital links.** Where more than one piece of software is used (say a spreadsheet feeding bridging software), data must flow between them **digitally** (formula links, import/export, API). Retyping or copy-and-paste between programs isn't allowed.
3. **Submission through MTD-compatible software** via HMRC's API. The old online VAT return form is closed to MTD businesses.

Agents file through their own software with the client authorised on the agent services account.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Deadlines",
      md: `- **Filing and payment:** **1 calendar month and 7 days** after the end of the VAT period. A quarter ending 30 September 2026 is due by **7 November 2026**.
- **Direct Debit:** HMRC collects 3 working days after the extended deadline, so the client needs the Direct Debit set up in time.
- **Annual Accounting Scheme:** 2 months after the year end.
- **Payments on account:** businesses with an annual VAT liability of more than **£2.3 million** make monthly payments on account.`,
    },
    {
      kind: "table",
      caption: "The nine boxes",
      head: ["Box", "What goes in it", "Watch out for"],
      rows: [
        ["1", "VAT due on sales and other outputs", "Also includes reverse-charge output VAT, postponed import VAT, fuel scale charges, and VAT on private use or gifts over £50. Credit notes issued reduce it"],
        ["2", "VAT due on acquisitions of goods from the EU", "**Northern Ireland goods movements only** (see the NI lesson). Nil for most clients"],
        ["3", "Total of boxes 1 and 2", "Calculated by the software"],
        ["4", "VAT reclaimed on purchases and other inputs", "Recoverable input tax only. Leave out blocked VAT (entertainment, cars). Credit notes received reduce it. Includes the input side of reverse charge and import VAT"],
        ["5", "Net VAT to pay or reclaim (box 3 − box 4)", "Should agree with the VAT control account for the period"],
        ["6", "Total value of sales and outputs, excluding VAT", "Include standard, reduced, zero-rated **and exempt** sales, exports, and out-of-scope services that HMRC says to include. Exclude loans, capital introduced, dividends, insurance claims"],
        ["7", "Total value of purchases and inputs, excluding VAT", "Include zero-rated and exempt purchases (for example insurance premiums), imports and reverse-charge services. Exclude wages, PAYE and NIC, business rates, MOT fees, vehicle excise duty, loans"],
        ["8", "Value of goods supplied to EU customers", "Northern Ireland only"],
        ["9", "Value of goods acquired from the EU", "Northern Ireland only"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Boxes 6 and 7 matter",
      md: `It's tempting to treat boxes 6 and 7 as less important because they don't change the VAT payable. But HMRC's risk systems compare them with box 1, box 4, previous periods and the accounts. A box 6 that's much higher than box 1 × 5 without zero-rated or exempt sales to explain it is a red flag, and box 6 also feeds the error correction limit and partial exemption.`,
    },
    {
      kind: "md",
      md: `### Reviewing a return before submission

Work through the same checklist every time:

1. **Reconcile the VAT control account** to box 5. Any difference needs explaining (journals posted to the wrong period, manual adjustments, a payment to HMRC posted to the wrong account).
2. **Compare with the last four quarters**: sales, purchases and net VAT. Investigate swings over about 20%.
3. **Sense-check the ratios**: box 1 ÷ box 6 should be close to 20% for a wholly standard-rated business. A lower ratio needs zero-rated, exempt or out-of-scope sales to explain it.
4. **Review large and unusual items**: capital purchases, one-off sales, anything over a set limit.
5. **Scan for blocked or restricted input tax**: entertainment, cars, private use, invoices addressed to directors.
6. **Check the special items**: reverse charge, import VAT (from the monthly postponed VAT statement), fuel scale charges, bad debt relief, partial exemption.
7. **Check invoices exist** for a sample of input tax claims, especially large ones.
8. **Confirm the client has approved** the return before you submit it under your agent credentials, and keep evidence of that approval.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Keep a VAT file note each quarter",
      md: `A short note of the checks done, the adjustments made and why (for example "Q3: £720 job B moved into period as invoice issued >14 days after completion") saves time next quarter and is your best defence if HMRC asks questions later.`,
    },
  ],
  scenario: {
    title: "Preparing the September 2026 return for Pennine Outdoor Ltd",
    narrative: `**Pennine Outdoor Ltd** sells outdoor clothing and equipment from a shop in Hebden Bridge and online. Its quarter ended **30 September 2026**. It uses standard accounting. From its records (all figures net of VAT unless stated):

**Sales**
- Standard-rated sales (adult clothing, equipment): **£182,400**
- Credit notes issued on standard-rated sales: **£2,400**
- Zero-rated sales of children's clothing: **£23,600**
- Goods exported to a customer in Norway (zero-rated, evidence held): **£14,000**

**Purchases and expenses**
- Stock from UK suppliers: **£96,500 + £19,300 VAT**
- Overheads (utilities, software, repairs): **£18,200 + £3,640 VAT**
- Delivery van: **£28,000 + £5,600 VAT**
- Shop insurance: **£3,100** (exempt)
- Wages: **£41,000**; business rates: **£4,200**
- Goods imported from China using postponed VAT accounting: customs value **£12,000**, import VAT on the monthly statement **£2,400**`,
    walkthrough: [
      {
        kind: "md",
        md: `**Box 1.** Standard-rated sales after credit notes: (£182,400 − £2,400) × 20% = £36,000. Add postponed import VAT of £2,400 (it's accounted for as output tax and reclaimed as input tax). Box 1 = **£38,400.00**.

**Box 2.** No NI–EU goods movements: **£0.00**. **Box 3** = **£38,400.00**.

**Box 4.** Stock £19,300 + overheads £3,640 + van £5,600 (a commercial vehicle, so fully recoverable) + postponed import VAT £2,400 = **£30,940.00**.

**Box 5.** £38,400.00 − £30,940.00 = **£7,460.00 payable**, due by 7 November 2026.

**Box 6.** £180,000 standard-rated (after credit notes) + £23,600 zero-rated + £14,000 export = **£217,600**.

**Box 7.** Stock £96,500 + overheads £18,200 + van £28,000 + insurance £3,100 + imports £12,000 = **£157,800**. Wages and business rates are excluded.

**Boxes 8 and 9:** **£0**.`,
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Review points",
        md: `- Box 1 excluding import VAT ÷ box 6 = £36,000 ÷ £217,600 = 16.5%, below 20% but explained by £37,600 of zero-rated sales.
- The £5,600 van VAT will push net VAT down this quarter. Note it on file so the dip isn't queried.
- Check the postponed VAT figure agrees with the CDS monthly statements for July, August and September.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "box-5",
      prompt: `**Kestrel Print Ltd** has these figures for its quarter (all net of VAT):

- Standard-rated sales £64,000; zero-rated sales of printed books £9,500
- Standard-rated purchases £28,400 (VAT £5,680)
- Staff summer party for employees only £600 + £120 VAT
- Credit note **received** from a paper supplier: £1,000 + £200 VAT

What is the figure for **box 5**?`,
      answer: 7200,
      unit: "£",
      explain: "Box 1 is VAT on standard-rated sales. Box 4 includes the staff party (staff entertainment is recoverable) and is reduced by the VAT on the supplier credit note.",
      working: "Box 1: £64,000 × 20% = £12,800. Box 4: £5,680 + £120 − £200 = £5,600. Box 5: £12,800 − £5,600 = **£7,200** payable.",
    },
    {
      kind: "numeric",
      id: "box-6",
      prompt:
        "A dental practice also sells standard-rated cosmetic whitening. In the quarter it has: exempt NHS and private dental treatment £96,000; standard-rated whitening £14,000 net; rent received from a self-employed hygienist for a room (exempt, no option to tax) £3,000; a bank loan received £25,000; and a sale of an old dental chair for £800 net + VAT. What is **box 6**?",
      answer: 113800,
      unit: "£",
      explain: "Box 6 includes exempt and taxable supplies, including the sale of a capital asset. A loan isn't a supply, so it's excluded.",
      working: "£96,000 + £14,000 + £3,000 + £800 = **£113,800**. The £25,000 loan is excluded.",
    },
    {
      kind: "classify",
      id: "classify-box-7",
      prompt: "Which of these payments go in **box 7** (purchases, excluding VAT)?",
      categories: ["Include in box 7", "Leave out of box 7"],
      items: [
        { text: "Stock purchases from a VAT-registered supplier", answer: 0 },
        { text: "Employees' wages", answer: 1 },
        { text: "Employer's National Insurance", answer: 1 },
        { text: "Professional indemnity insurance premium (exempt)", answer: 0, why: "Exempt purchases are still purchases." },
        { text: "Business rates to the council", answer: 1 },
        { text: "Vehicle excise duty on the van", answer: 1 },
        { text: "Zero-rated train tickets for business travel", answer: 0 },
        { text: "Repayment of a bank loan", answer: 1 },
      ],
      explain:
        "Box 7 is the net value of supplies the business has received, whether standard, reduced, zero-rated or exempt. Wages, NIC, rates, VED, MOT fees and loan movements aren't supplies, so they're excluded.",
    },
    {
      kind: "multi",
      id: "mtd-compliance",
      prompt: "Which of these practices **break** the MTD for VAT digital links rules? Select all that apply.",
      options: [
        "Exporting a CSV from the till system and importing it into the accounting software",
        "Retyping totals from a sales spreadsheet into bridging software",
        "Using bridging software that reads a linked cell range in the client's spreadsheet",
        "Copying and pasting the box figures from a spreadsheet into the filing software",
        "Accounting software filing directly to HMRC through the API",
      ],
      answers: [1, 3],
      explain:
        "Data must pass between programs digitally. Imports, exports, formula links and API calls are fine. Manual retyping or copy-and-paste between programs breaks the chain.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-deadline",
      prompt: "A client's VAT quarter ends on 31 December 2026. When are the return and payment due (not paying by Direct Debit)?",
      options: ["31 January 2027", "7 February 2027", "28 February 2027", "31 March 2027"],
      answer: 1,
      explain: "1 calendar month and 7 days after the period end: 31 January + 7 days = 7 February 2027.",
    },
    {
      kind: "mcq",
      id: "q-mtd-who",
      prompt: "Which VAT-registered businesses must follow MTD for VAT?",
      options: ["Only those over £90,000 turnover", "Only limited companies", "All VAT-registered businesses unless HMRC accepts they're exempt", "Only those filing monthly"],
      answer: 2,
      explain: "MTD for VAT has applied to all VAT-registered businesses, including voluntary registrations, since periods starting on or after 1 April 2022.",
    },
    {
      kind: "mcq",
      id: "q-box2",
      prompt: "When would a business normally complete box 2 of the VAT return?",
      options: ["When it buys services from the EU", "When it imports goods from the EU into Great Britain", "When it's a Northern Ireland business acquiring goods from the EU", "When it claims bad debt relief"],
      answer: 2,
      explain: "Boxes 2, 8 and 9 relate to Northern Ireland movements of goods with the EU. GB imports go through import VAT (usually postponed VAT accounting).",
    },
    {
      kind: "mcq",
      id: "q-exempt-box6",
      prompt: "Should exempt sales be included in box 6?",
      options: ["No, only taxable sales", "Yes, box 6 includes exempt sales", "Only if over £10,000", "Only for partly exempt businesses"],
      answer: 1,
      explain: "Box 6 is total sales and outputs excluding VAT, including exempt supplies.",
    },
    {
      kind: "mcq",
      id: "q-poa",
      prompt: "Above what annual VAT liability must a business make payments on account?",
      options: ["£1.35 million", "£1.6 million", "£2.3 million", "£5 million"],
      answer: 2,
      explain: "The payments on account scheme applies when the annual VAT liability is more than £2.3 million.",
    },
    {
      kind: "mcq",
      id: "q-review-first",
      prompt: "What's the single most useful check before submitting a return?",
      options: [
        "Checking the client's bank balance",
        "Reconciling box 5 to the VAT control account for the period",
        "Comparing box 6 to the annual accounts turnover",
        "Rounding all figures to the nearest pound",
      ],
      answer: 1,
      explain: "The control account reconciliation catches mis-posted journals, wrong periods and missing items before HMRC does.",
    },
  ],
  sources: [
    { label: "How to fill in and submit your VAT Return (VAT Notice 700/12)", url: "https://www.gov.uk/guidance/how-to-fill-in-and-submit-your-vat-return-vat-notice-70012" },
    { label: "VAT Notice 700/22: Making Tax Digital for VAT", url: "https://www.gov.uk/government/publications/vat-notice-70022-making-tax-digital-for-vat" },
    { label: "Record keeping for VAT (VAT Notice 700/21)", url: "https://www.gov.uk/guidance/record-keeping-for-vat-notice-70021" },
    { label: "Completing your VAT Return to account for import VAT", url: "https://www.gov.uk/guidance/complete-your-vat-return-to-account-for-import-vat" },
  ],
};
