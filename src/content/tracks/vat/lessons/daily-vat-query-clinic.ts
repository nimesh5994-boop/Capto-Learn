import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "daily-vat-query-clinic",
  title: "The daily VAT query clinic: coding everyday purchases",
  level: "practitioner",
  minutes: 40,
  summary:
    "A drill on the purchases that land on your desk every day — parking, postage, hotels, software, online ads, Amazon orders, gifts and staff costs — and a five-question routine that gets the VAT coding right every time, including the reverse charge on services bought from overseas.",
  objectives: [
    "Use a fixed five-question routine to decide the VAT treatment of any purchase",
    "Code the common everyday purchases correctly: travel, postage, parking, subscriptions, hotels and staff costs",
    "Recognise when a purchase from an overseas supplier needs the reverse charge, and post it",
    "Spot the purchases where the supply is really made to the director personally",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `The input tax lesson gave you the rules. This lesson is about **speed and consistency**: the bookkeeping queue is full of small receipts, and most errors on a VAT return come from coding dozens of them on autopilot. Work through the same five questions every time and you won't go far wrong.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The five-question routine",
      md: `1. **Is there UK VAT on it at all?** Exempt (insurance, postage stamps, bank charges), zero-rated (train fares, books, most food), outside the scope (fines, MOT fees, Companies House, business rates), or an unregistered supplier — all mean **nothing to claim**.
2. **Who is the supplier?** If it's an **overseas business** selling **services** to your client and charging no UK VAT, your client probably has to apply the **reverse charge**.
3. **Who received the supply?** It must be the business. A personal service for the director (their own tax return, their gym, their home) isn't input tax even if the company pays.
4. **Is it blocked?** Client entertainment, cars with private use, directors' domestic accommodation.
5. **Is use mixed?** Apportion business and private use, and note the method on file.`,
    },
    {
      kind: "table",
      caption: "Quick reference: everyday purchases (client is VAT registered, standard accounting)",
      head: ["Purchase", "Usual VAT position", "Why"],
      rows: [
        ["Train, tube, bus and air fares", "No VAT to claim", "Passenger transport in vehicles with 10+ seats is zero-rated"],
        ["Taxi fare", "Claim only if the receipt shows a VAT number", "Taxis are standard-rated, but many drivers are below the registration threshold"],
        ["Royal Mail stamps", "No VAT to claim", "Universal postal service is exempt"],
        ["Courier delivery (e.g. a parcel firm)", "Recoverable", "Standard-rated business service"],
        ["Off-street car park (private or council)", "Recoverable", "Off-street parking is a standard-rated supply"],
        ["On-street parking meter, parking fine, congestion charge", "No VAT to claim", "Outside the scope: statutory charges and penalties"],
        ["UK hotel for a business trip", "Recoverable", "Standard-rated; employee and proprietor subsistence on business travel is not entertainment"],
        ["Hotel abroad", "Not on the UK return", "The VAT is foreign VAT — reclaim it (if at all) through that country's refund procedure"],
        ["Newspapers, books and e-books", "No VAT to claim", "Zero-rated"],
        ["UK software subscription with a UK VAT number", "Recoverable", "Standard-rated"],
        ["Online ads or software billed from abroad with no UK VAT", "Reverse charge", "B2B services: place of supply is the customer's country"],
        ["Insurance and bank charges", "No VAT to claim", "Exempt (insurance premium tax is not VAT)"],
        ["Companies House fees, vehicle excise duty, business rates", "No VAT to claim", "Outside the scope"],
        ["Gift of a business-branded item to a customer", "Recoverable", "Input tax on business gifts is claimable; output tax arises only if gifts to the same person exceed £50 in 12 months"],
      ],
    },
    {
      kind: "md",
      md: `### The reverse charge on services from overseas

When a UK VAT-registered business buys most **business services** from a supplier that belongs outside the UK — online advertising, cloud software, design work, consultancy — the general rule is that the supply takes place **where the customer belongs**. The overseas supplier doesn't charge UK VAT; instead your client **charges itself** the VAT and, normally, reclaims it on the same return.

On the VAT return:
- **Box 1**: the VAT your client calculates at 20% on the net value
- **Box 4**: the same amount reclaimed (subject to the normal recovery rules)
- **Box 6** and **Box 7**: the net value of the service

For a fully taxable business the net effect is nil, but the entries must still be made, and a partly exempt business or a Flat Rate Scheme user can end up paying real VAT.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "The invoice shows an Irish or US address",
      md: `Many well-known platforms invoice UK business customers from an overseas entity and, if you've given your VAT number, show **no VAT**. Coding these as "no VAT" is the single most common error in small-business bookkeeping. Look at the supplier's address and the invoice wording ("reverse charge", "VAT to be accounted for by the recipient"). If the supplier has charged **UK VAT** with a GB VAT number, treat it as an ordinary UK purchase instead.`,
    },
    {
      kind: "md",
      md: `### Amazon and other marketplaces

A marketplace order may be supplied by Amazon itself or by a third-party seller. Download the **VAT invoice from the seller**: if the seller isn't VAT registered, there's no VAT to claim even if the order confirmation shows a "VAT" line. Without a valid invoice, don't claim.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Paid by the company, supplied to the director",
      md: `Typical examples: the director's personal Self Assessment fee, a personal gym membership, the director's children's school fees, home decoration. The supply is made to the individual for private purposes, so the company has **no input tax** — and the payment is usually a director's loan account debit or a benefit in kind. If in doubt, ask who the service is really for, not who paid the invoice.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Build a coding rules note per client",
      md: `For each bookkeeping client keep a one-page note of recurring suppliers and their treatment ("Google Ads – reverse charge", "Parking app – check receipt", "Director's broadband – 50% business"). Set the same rules in the bookkeeping software. It makes the quarter-end review a check of exceptions instead of a re-code of everything.`,
    },
  ],
  scenario: {
    title: "Clearing the purchase queue for Hartley & Moss Design Ltd",
    narrative: `Hartley & Moss Design Ltd is a VAT-registered graphic design studio in Bristol on standard accounting, quarterly returns, fully taxable. The bookkeeper has flagged these items for the quarter with the note: *"Not sure about these — can you code them?"*

| # | Item | Gross | VAT shown |
|---|------|------:|----------:|
| 1 | Train tickets to a client in London | £184.00 | £0.00 |
| 2 | Council multi-storey car park | £14.40 | £2.40 |
| 3 | Parking fine from the same trip | £70.00 | £0.00 |
| 4 | Online advertising invoice from an Irish company, no VAT, "reverse charge" note | £600.00 | £0.00 |
| 5 | Two nights' UK hotel for the designer visiting a client | £264.00 | £44.00 |
| 6 | Accountant's fee for the director's personal tax return, invoiced to the company | £420.00 | £70.00 |
| 7 | Stamps from the Post Office | £33.00 | £0.00 |
| 8 | Font licence from a UK supplier | £96.00 | £16.00 |`,
    walkthrough: [
      {
        kind: "md",
        md: `Run the five questions on each item:

1. **Train tickets**: zero-rated passenger transport. Nothing to claim.
2. **Car park**: off-street parking is standard-rated. **Claim £2.40.**
3. **Parking fine**: a penalty, outside the scope. Nothing to claim (and it's disallowable for corporation tax too).
4. **Irish advertising**: a B2B service from an overseas supplier. Apply the **reverse charge**: output VAT £600 × 20% = **£120 in box 1**, reclaim **£120 in box 4**, £600 in boxes 6 and 7.
5. **UK hotel**: employee business travel. **Claim £44.**
6. **Director's tax return fee**: the service is for the director personally, so it isn't input tax. Post the full £420 to the director's loan account. **Claim £0.**
7. **Stamps**: exempt. Nothing to claim.
8. **Font licence**: standard-rated business purchase. **Claim £16.**`,
      },
      {
        kind: "table",
        caption: "Effect on the VAT return",
        head: ["Item", "Box 1", "Box 4", "Box 6", "Box 7"],
        rows: [
          ["Car park", "", "£2.40", "", "£12.00"],
          ["Irish advertising (reverse charge)", "£120.00", "£120.00", "£600.00", "£600.00"],
          ["UK hotel", "", "£44.00", "", "£220.00"],
          ["Font licence", "", "£16.00", "", "£80.00"],
          ["**Total from these items**", "**£120.00**", "**£182.40**", "**£600.00**", "**£912.00**"],
        ],
      },
      {
        kind: "journal",
        title: "Posting the reverse-charge advertising invoice",
        narrative: "The supplier is paid £600. The notional VAT is posted to both sides of the VAT control account, so the net cost stays £600.",
        lines: [
          { account: "Advertising", dr: 600 },
          { account: "VAT control (input tax)", dr: 120 },
          { account: "VAT control (output tax)", cr: 120 },
          { account: "Trade creditors", cr: 600 },
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Box 7 includes zero-rated and exempt purchases too",
        md: `The table shows only the items that move boxes 1 and 4. In the real return the train tickets, stamps and other business purchases with no VAT also go into **box 7** (net purchases), although fines, wages and other outside-the-scope items stay out of it.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-everyday",
      prompt: "A VAT-registered consultancy (standard accounting, fully taxable) sends these items. Classify each one.",
      categories: ["Claim the UK VAT shown", "No UK VAT to claim", "Not input tax: blocked or not supplied to the business", "Apply the reverse charge"],
      items: [
        { text: "Flight to Edinburgh for a client meeting", answer: 1, why: "Air passenger transport is zero-rated." },
        { text: "Cloud software billed by a US company, no VAT shown, client's VAT number on invoice", answer: 3, why: "B2B service from an overseas supplier." },
        { text: "Restaurant bill for taking a UK prospect to lunch", answer: 2, why: "UK business entertainment is blocked." },
        { text: "Business insurance renewal", answer: 1, why: "Insurance is exempt; IPT is not VAT." },
        { text: "Courier fee for sending documents to a client, VAT number shown", answer: 0, why: "Standard-rated business service." },
        { text: "Director's personal gym membership, paid by the company", answer: 2, why: "Supplied to the director for private purposes." },
        { text: "Companies House confirmation statement fee", answer: 1, why: "Outside the scope." },
        { text: "Private car park at a train station, VAT receipt", answer: 0, why: "Off-street parking is standard-rated." },
      ],
      explain:
        "Run the routine: is there UK VAT at all; is the supplier overseas (reverse charge); was the supply made to the business; is it blocked; is use mixed. Flights, insurance and statutory fees have no VAT; the US software is reverse-charged; entertainment and the director's gym fail the 'blocked / supplied to the business' tests.",
    },
    {
      kind: "numeric",
      id: "batch-input-tax",
      prompt:
        "A fully taxable VAT-registered client sends these receipts: UK hotel £180 including £30 VAT; staff Christmas meal (employees only) £360 including £60 VAT; dinner with a UK supplier £120 including £20 VAT; office printer paper £48 including £8 VAT; taxi £25 with no VAT number on the receipt. How much **input tax** can be claimed from these receipts?",
      answer: 98,
      unit: "£",
      explain:
        "The hotel, staff party and stationery are recoverable. Entertaining a UK supplier is blocked. A taxi receipt with no VAT number shows no recoverable VAT, even if the fare includes some.",
      working: "£30 (hotel) + £60 (staff meal) + £8 (paper) = **£98**. Supplier dinner £20: blocked. Taxi: nothing to claim.",
    },
    {
      kind: "journal",
      id: "post-reverse-charge",
      prompt:
        "A fully taxable client receives an invoice for £1,500 from a design agency based in Germany for logo work. No VAT is charged and the invoice says 'reverse charge'. The client pays it from the business bank account straight away. Post the entry, including the reverse charge.",
      accounts: ["Design and marketing", "VAT control (input tax)", "VAT control (output tax)", "Bank", "Trade creditors", "Director's loan account", "Suspense"],
      answer: [
        { account: "Design and marketing", dr: 1500 },
        { account: "VAT control (input tax)", dr: 300 },
        { account: "VAT control (output tax)", cr: 300 },
        { account: "Bank", cr: 1500 },
      ],
      explain:
        "The client accounts for 20% × £1,500 = £300 of output tax and reclaims the same £300 as input tax. Only £1,500 leaves the bank. The net values also go in boxes 6 and 7 of the return.",
    },
    {
      kind: "mcq",
      id: "director-fee",
      prompt:
        "A company pays its accountant's invoice of £600 plus £120 VAT for preparing the director's personal Self Assessment return. The invoice is addressed to the company. What's the correct treatment?",
      options: [
        "Claim £120 — the invoice is addressed to the company",
        "Claim £60 — split between company and director",
        "No input tax: the service is supplied for the director's private purposes; debit £720 to the director's loan account",
        "No input tax, but the £720 is an allowable company expense",
      ],
      answer: 2,
      explain:
        "Input tax requires the supply to be made to the business for its business. A personal tax return is the director's own affair, so the VAT isn't recoverable, and the cost is the director's, normally charged to the loan account (or treated as a benefit/earnings).",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-stamps",
      prompt: "Why is there no VAT to reclaim on Royal Mail first-class stamps?",
      options: ["They're zero-rated", "Universal postal services are exempt", "Royal Mail isn't VAT registered", "Postage is outside the scope of VAT"],
      answer: 1,
      explain: "Royal Mail's universal service is exempt. Commercial courier services are standard-rated.",
    },
    {
      kind: "mcq",
      id: "q-reverse-boxes",
      prompt: "A fully taxable client applies the reverse charge to £2,000 of consultancy bought from a US firm. Which entries are made on its VAT return?",
      options: [
        "Nothing — no VAT was charged",
        "£400 in box 4 only",
        "£400 in box 1 and £400 in box 4; £2,000 in boxes 6 and 7",
        "£400 in box 1 only; £2,000 in box 7",
      ],
      answer: 2,
      explain: "Reverse-charged services go in box 1 (VAT due), box 4 (VAT reclaimed), box 6 (as if a supply made) and box 7 (as a purchase).",
    },
    {
      kind: "mcq",
      id: "q-parking-fine",
      prompt: "How should a £70 parking penalty charge notice paid by a VAT-registered company be treated for VAT?",
      options: ["Claim 1/6 as input tax", "Outside the scope: nothing to claim", "Exempt: include in box 7 only", "Blocked like entertainment"],
      answer: 1,
      explain: "Fines and penalties are not consideration for a supply, so they're outside the scope of VAT.",
    },
    {
      kind: "mcq",
      id: "q-foreign-hotel",
      prompt: "A director pays French VAT on a hotel in Lyon during a business trip. How is it treated on the UK VAT return?",
      options: [
        "Claimed in box 4 as normal input tax",
        "Not claimed on the UK return; any recovery would be through France's VAT refund procedure",
        "Reverse charged in boxes 1 and 4",
        "Claimed at 50%",
      ],
      answer: 1,
      explain: "Only UK VAT (and reverse-charge or import VAT accounted for in the UK) is input tax on a UK return. Foreign VAT is reclaimed, if at all, from the foreign tax authority.",
    },
    {
      kind: "mcq",
      id: "q-marketplace",
      prompt: "A client's online marketplace order shows a VAT line, but the third-party seller's invoice has no VAT number. What can be claimed?",
      options: ["The VAT line shown", "1/6 of the gross", "Nothing — without a valid VAT invoice from a registered seller there is no input tax", "Half the VAT line"],
      answer: 2,
      explain: "An unregistered seller cannot charge VAT, and a claim needs a valid VAT invoice. Download the seller's invoice and check the VAT number.",
    },
  ],
  sources: [
    { label: "VAT guide (VAT Notice 700)", url: "https://www.gov.uk/guidance/vat-guide-notice-700" },
    { label: "Place of supply of services (VAT Notice 741A)", url: "https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a" },
    { label: "Business entertainment and VAT (Notice 700/65)", url: "https://www.gov.uk/guidance/business-entertainment-and-vat-notice-70065" },
    { label: "Gifts of goods and services (VAT Notice 700/35)", url: "https://www.gov.uk/guidance/vat-on-business-gifts-and-promotional-items-notice-70035" },
    { label: "How to fill in and submit your VAT Return (VAT Notice 700/12)", url: "https://www.gov.uk/guidance/how-to-fill-in-and-submit-your-vat-return-vat-notice-70012" },
  ],
};
