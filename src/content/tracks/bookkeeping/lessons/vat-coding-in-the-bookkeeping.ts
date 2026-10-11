import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "vat-coding-in-the-bookkeeping",
  title: "VAT coding in the bookkeeping",
  level: "practitioner",
  minutes: 40,
  taxYear: "2026/27",
  summary:
    "Choosing the right VAT tax code on every transaction so the VAT return builds itself correctly: standard, reduced and zero-rated, exempt, outside the scope, and reverse charges (construction and services from abroad), with how each one lands in boxes 1, 4, 6 and 7.",
  objectives: [
    "Choose the correct tax code for common sales and purchases",
    "Explain how each tax code feeds boxes 1, 4, 6 and 7 of the VAT return",
    "Account for the domestic reverse charge and reverse charge on services from abroad",
    "Correct miscoded transactions and recognise the classic VAT coding errors",
  ],
  body: [
    {
      kind: "md",
      md: `In cloud software, the VAT return is built automatically from the **tax code** on every transaction. Get the codes right and the return is right. Get them wrong and the return is wrong, however careful the final review. VAT coding is therefore a bookkeeping job, not just a VAT-return job.

The distinction that matters most is between transactions that are **within the scope of VAT** (standard, reduced, zero-rated and exempt) and those that are **outside the scope** (no supply for VAT at all).`,
    },
    {
      kind: "table",
      caption: "The tax codes and where they go on the return",
      head: ["Code", "Examples", "Box 1/4 (VAT)", "Box 6/7 (net value)"],
      rows: [
        ["Standard rate 20%", "Most goods and services, fuel, stationery, professional fees", "VAT at 20% in box 1 (sales) or box 4 (purchases)", "Included"],
        ["Reduced rate 5%", "Domestic fuel and power, children's car seats, mobility aids installed for people aged 60 or over", "VAT at 5%", "Included"],
        ["Zero rate 0%", "Most food, books and newspapers, children's clothes, passenger transport, exports of goods", "Nil", "Included"],
        ["Exempt", "Insurance, most financial services and bank charges, postage stamps, most residential rent", "Nil", "Included"],
        ["No VAT / outside the scope", "Wages, PAYE, dividends, loans, business rates, Companies House fees, MOT certificates, fines, transfers", "Nil", "**Excluded**"],
        ["Reverse charge", "Construction services under the domestic reverse charge; services bought from overseas", "Customer accounts for the VAT (see below)", "Included (see below for which box)"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Zero-rated is not the same as no VAT",
      md: `Zero-rated and exempt supplies are **in** box 6 or 7; outside-the-scope items are **left out**. If wages, loans or HMRC payments are coded "zero-rated" instead of "no VAT", boxes 6 and 7 are inflated, which distorts HMRC's risk checks and can trigger questions. And making exempt supplies can restrict the client's input tax recovery (partial exemption), so exempt sales coding matters too.`,
    },
    {
      kind: "md",
      md: `### The domestic reverse charge (construction)

For most building and construction services supplied between VAT-registered businesses and reported within the Construction Industry Scheme, the **customer**, not the supplier, accounts for the VAT, unless the customer is an end user or intermediary supplier that has told the supplier so in writing.

- **The supplier** invoices without charging VAT, marks the invoice as reverse charge (e.g. "customer to account to HMRC for the VAT"), and includes the net value in **box 6** only.
- **The customer** works out the VAT at the appropriate rate, puts it in **box 1** as output tax and (subject to the normal rules) reclaims it in **box 4**, and includes the net purchase in **box 7**. The net effect on the customer's payment is usually nil.

### Services bought from overseas

When a UK business buys most business services from an overseas supplier (software subscriptions, advertising, consultancy), it accounts for the VAT under the reverse charge: VAT in **box 1** and **box 4**, and the value in **both box 6 and box 7**. A UK business buying an online service from an overseas provider with no UK VAT shown is the classic case.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Where the rules are",
      md: `The VAT return boxes are explained in VAT Notice 700/12 (including the reverse-charge entries in paragraph 4.6). Rates of VAT on specific goods and services are listed in HMRC's guidance *VAT rates on different goods and services*. The domestic reverse charge is in VATA 1994 s55A and HMRC's reverse charge technical guide.`,
    },
    {
      kind: "table",
      caption: "Classic miscodes",
      head: ["Transaction", "Common wrong code", "Right code"],
      rows: [
        ["Insurance premium", "20%", "Exempt"],
        ["Bank charges and interest", "20%", "Exempt"],
        ["Wages, PAYE, pension contributions", "Zero-rated", "No VAT"],
        ["HMRC VAT payment", "20% or zero-rated", "No VAT (and to VAT control)"],
        ["Business rates, Companies House fees", "Zero-rated or 20%", "No VAT"],
        ["Train and air fares", "20%", "Zero-rated"],
        ["Client entertainment", "20% (claimed)", "Blocked: post gross with no VAT"],
        ["Purchase from an unregistered supplier", "20% (assumed)", "No VAT"],
        ["Overseas software subscription", "No VAT", "Reverse charge"],
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Flat Rate Scheme and cash accounting clients",
      md: `- **Flat Rate Scheme:** the client pays a fixed percentage of **gross** turnover and doesn't reclaim input tax (except on a single capital asset costing £2,000 or more including VAT). Purchases are usually coded with no VAT; the software's FRS setting calculates box 1.
- **Cash accounting** (taxable turnover up to £1.35 million to join): VAT is accounted for when cash is received or paid, not on the invoice date. Make sure the scheme is set correctly in the software, because the codes are the same but the timing isn't.`,
    },
  ],
  scenario: {
    title: "Building the VAT return for Northgate Electrical Ltd",
    narrative: `**Northgate Electrical Ltd** is a VAT-registered electrical contractor on the standard scheme (invoice basis). For the quarter to **30 September 2026** the bookkeeping shows:

**Sales**
- Rewiring work for householders (end consumers): **£40,000** net, VAT at 20% charged
- Electrical installation for a main contractor on a new-build site, invoiced under the **domestic reverse charge**: **£25,000** net, no VAT charged

**Purchases**
- Cable and fittings from wholesalers: **£18,000** net + **£3,600** VAT
- A subcontract electrician's invoice under the **domestic reverse charge**: **£10,000** net
- Van insurance: **£1,200** (exempt)
- Wages: **£15,000**`,
    walkthrough: [
      {
        kind: "table",
        caption: "How each item feeds the return",
        head: ["Item", "Box 1", "Box 4", "Box 6", "Box 7"],
        rows: [
          ["Domestic rewiring sales", "8,000", "", "40,000", ""],
          ["Reverse charge sales to main contractor", "", "", "25,000", ""],
          ["Materials", "", "3,600", "", "18,000"],
          ["Subcontractor (reverse charge, 20%)", "2,000", "2,000", "", "10,000"],
          ["Van insurance (exempt)", "", "", "", "1,200"],
          ["Wages (outside the scope)", "", "", "", ""],
          ["**Total**", "**10,000**", "**5,600**", "**65,000**", "**29,200**"],
        ],
      },
      {
        kind: "md",
        md: `**Box 5 (net VAT due)** = £10,000 − £5,600 = **£4,400**.

Note what the reverse charge does: on its sales to the main contractor, Northgate charges no VAT (the contractor accounts for it); on the subcontractor's invoice, Northgate accounts for £2,000 output tax and reclaims £2,000 input tax. The wages don't appear anywhere on the return.`,
      },
      {
        kind: "callout",
        tone: "example",
        title: "If the subcontractor invoice had been coded 'no VAT'",
        md: `Boxes 1 and 4 would each be £2,000 too low, and box 7 would be £10,000 too low. Box 5 wouldn't change, so it might look harmless, but the return would still be wrong, and HMRC can charge penalties for failing to apply the reverse charge.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-tax-codes",
      prompt: "Choose the right tax code for each **purchase** by a VAT-registered UK business.",
      categories: ["Standard 20%", "Zero-rated", "Exempt", "No VAT (outside the scope)", "Reverse charge"],
      items: [
        { text: "Van insurance premium", answer: 2 },
        { text: "Staff wages", answer: 3 },
        { text: "Diesel for the company van, VAT receipt", answer: 0 },
        { text: "Business rates on the workshop", answer: 3 },
        { text: "Subcontract plasterer's invoice marked \"reverse charge: customer to account for VAT\"", answer: 4 },
        { text: "Rail ticket to a client meeting", answer: 1 },
        { text: "Monthly bank account charge", answer: 2 },
        { text: "Design software subscription from a US company, no UK VAT shown", answer: 4, why: "Business services bought from overseas are reverse charged." },
      ],
      explain: "Check first whether there's a supply for VAT at all (wages and rates: no). Then whether it's exempt or zero-rated. Reverse charge applies to domestic construction services between registered businesses and to most services bought from abroad.",
    },
    {
      kind: "numeric",
      id: "box-1",
      prompt: `A VAT-registered business's quarter includes: standard-rated sales **£60,000** net; zero-rated sales **£8,000**; standard-rated purchases **£22,000** net; a domestic reverse charge subcontractor invoice **£6,000** net (20%); a software subscription from an overseas supplier **£2,000** (reverse charge, 20%); insurance **£900**; wages **£14,000**. What is **box 1** (VAT due on sales and other outputs)?`,
      answer: 13600,
      unit: "£",
      explain: "Box 1 includes output VAT on sales plus the VAT the business accounts for under both reverse charges.",
      working: "Sales £60,000 × 20% = £12,000; reverse charge subcontractor £6,000 × 20% = £1,200; overseas software £2,000 × 20% = £400. Total **£13,600**.",
    },
    {
      kind: "numeric",
      id: "box-6",
      prompt: "Using the same quarter, what is **box 6** (total value of sales and all other outputs, excluding VAT)?",
      answer: 70000,
      unit: "£",
      explain: "Box 6 includes standard and zero-rated sales. For services bought from overseas, the customer includes the value in box 6 as well as box 7. For a domestic reverse charge purchase, the customer includes it in box 7 only.",
      working: "£60,000 + £8,000 + £2,000 (overseas services) = **£70,000**",
    },
    {
      kind: "journal",
      id: "correct-insurance",
      prompt:
        "A **£1,200** insurance premium was coded at 20% (VAT inclusive), so the software posted Insurance £1,000 and VAT control £200. Post the correcting journal.",
      accounts: ["Insurance", "VAT control", "Bank – current account", "Trade payables", "Sundry expenses", "Suspense"],
      answer: [
        { account: "Insurance", dr: 200 },
        { account: "VAT control", cr: 200 },
      ],
      explain: "Insurance is exempt, so there's no input tax. The £200 wrongly reclaimed comes out of VAT control and goes back into the insurance cost. In the software, it's simpler to edit the original transaction's tax code, if the period isn't locked.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-wages-box7",
      prompt: "Wages coded as 'zero-rated' instead of 'no VAT' would:",
      options: ["Have no effect", "Overstate box 7", "Overstate box 4", "Understate box 1"],
      answer: 1,
      explain: "Zero-rated items are included in box 7; outside-the-scope items like wages aren't.",
    },
    {
      kind: "mcq",
      id: "q-drc-supplier",
      prompt: "A VAT-registered subcontractor supplies construction services under the domestic reverse charge. On its own VAT return, the supplier:",
      options: ["Includes VAT in box 1", "Includes the net value in box 6 only", "Includes the value in box 7", "Leaves it off the return"],
      answer: 1,
      explain: "The customer accounts for the VAT; the supplier just reports the net value in box 6.",
    },
    {
      kind: "mcq",
      id: "q-exempt-vs-outside",
      prompt: "Which is an exempt supply, rather than outside the scope?",
      options: ["Business rates", "Wages", "Insurance premiums", "A dividend"],
      answer: 2,
      explain: "Insurance is an exempt supply (in boxes 6/7); rates, wages and dividends aren't supplies for VAT at all.",
    },
    {
      kind: "mcq",
      id: "q-overseas",
      prompt: "A UK VAT-registered company buys £1,000 of online advertising from an overseas company that charges no UK VAT. It should:",
      options: ["Ignore VAT", "Apply the reverse charge: £200 in box 1 and £200 in box 4, £1,000 in boxes 6 and 7", "Pay £200 to the supplier", "Code it as exempt"],
      answer: 1,
      explain: "Most business services bought from abroad are reverse charged; a fully taxable business usually has no net cost.",
    },
    {
      kind: "mcq",
      id: "q-cash-threshold",
      prompt: "What is the maximum estimated taxable turnover to join the VAT cash accounting scheme?",
      options: ["£90,000", "£150,000", "£1.35 million", "£1.6 million"],
      answer: 2,
      explain: "A business can join if its estimated VAT taxable turnover is £1.35 million or less.",
    },
    {
      kind: "mcq",
      id: "q-frs-coding",
      prompt: "A Flat Rate Scheme client buys £300 of stationery including VAT. How should the bookkeeping treat the VAT?",
      options: ["Reclaim £50", "No VAT reclaimed: post £300 to stationery", "Reclaim at the flat rate percentage", "Reverse charge it"],
      answer: 1,
      explain: "FRS users don't reclaim input tax except on a single capital asset of £2,000 or more including VAT.",
    },
  ],
  sources: [
    { label: "HMRC VAT Notice 700/12 – how to fill in and submit your VAT Return", url: "https://www.gov.uk/guidance/how-to-fill-in-and-submit-your-vat-return-vat-notice-70012" },
    { label: "HMRC – VAT domestic reverse charge technical guide", url: "https://www.gov.uk/guidance/vat-reverse-charge-technical-guide" },
    { label: "HMRC – How to use the VAT domestic reverse charge if you buy building and construction services", url: "https://www.gov.uk/guidance/how-to-use-the-vat-reverse-charge-if-you-buy-building-and-construction-services" },
    { label: "GOV.UK – VAT rates on different goods and services", url: "https://www.gov.uk/guidance/rates-of-vat-on-different-goods-and-services" },
    { label: "GOV.UK – VAT Cash Accounting Scheme", url: "https://www.gov.uk/vat-cash-accounting-scheme" },
    { label: "GOV.UK – VAT Flat Rate Scheme", url: "https://www.gov.uk/vat-flat-rate-scheme" },
  ],
};
