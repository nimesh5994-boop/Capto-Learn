import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "margin-schemes",
  title: "Margin schemes for second-hand goods",
  level: "practitioner",
  minutes: 30,
  taxYear: "2026/27",
  summary:
    "How dealers in second-hand goods, art, antiques and collectors' items pay VAT only on their profit margin: eligibility, the stock book and invoice rules, the global accounting scheme for low-value items, and how margin sales go on the VAT return.",
  objectives: [
    "Decide whether goods are eligible for a margin scheme",
    "Calculate VAT on a margin scheme sale and recognise when no VAT is due",
    "Apply global accounting to high-volume, low-value stock",
    "Complete boxes 1, 6 and 7 correctly for margin scheme sales and purchases",
  ],
  body: [
    {
      kind: "md",
      md: `If a VAT-registered car dealer buys a used car from a member of the public, no VAT is charged on the purchase. Without a special scheme, the dealer would have to charge 20% VAT on the **full** selling price, and VAT would be charged again on goods that have already borne VAT once, when they were first sold new.

**Margin schemes** fix this. The dealer accounts for VAT only on the **margin**, meaning the selling price less the purchase price. VAT is **1/6 of the margin**, because the margin is treated as VAT-inclusive.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Who and what can use a margin scheme",
      md: `Eligible goods are **second-hand goods, works of art, antiques and collectors' items**. Precious metals, investment gold and precious stones can't be sold under the scheme.

The goods must have been obtained **without VAT being charged**, for example bought from a private individual, from an unregistered business, or from another dealer who sold them under a margin scheme. You **can't** use the scheme for an item you were charged VAT on, so you couldn't reclaim input tax on it anyway.

The scheme is optional, sale by sale. There's no need to apply, but if any of the conditions or record-keeping rules are not met, VAT is due on the **full selling price**.`,
    },
    {
      kind: "table",
      caption: "Margin scheme calculations",
      head: ["Item", "Bought for", "Sold for", "Margin", "VAT (1/6 of margin)"],
      rows: [
        ["Used hatchback", "£8,000", "£10,400", "£2,400", "£400.00"],
        ["Antique dresser", "£1,500", "£2,000", "£500", "£83.33"],
        ["Used van sold at a loss", "£6,000", "£5,500", "−£500", "£0.00. No VAT, and the loss **can't** be set against other margins"],
      ],
    },
    {
      kind: "md",
      md: `### Records and invoices

Margin scheme records are strict, and HMRC tests them on compliance checks.

- **Stock book**, one line per item: stock number (in sequence), date of purchase, purchase invoice number, purchase price, seller's name, description, then the date of sale, sales invoice number, selling price, buyer's name, margin and VAT due.
- **Purchase invoice**: if the seller is a private individual, the dealer writes the purchase invoice and both parties keep a copy. If buying from another VAT-registered dealer, the invoice must carry the margin scheme wording.
- **Sales invoice**: must **not show VAT separately**, and must carry one of the prescribed wordings: "margin scheme - second hand goods", "margin scheme - works of art" or "margin scheme - collectors' items and antiques".

Because the sales invoice shows no VAT, a VAT-registered buyer can't reclaim any input tax on a margin scheme purchase.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Showing VAT on the invoice breaks the scheme",
      md: `If a dealer shows VAT separately on a margin scheme sale (often because a trade customer asks for a "VAT invoice"), the dealer must account for VAT on the **full** selling price. The buyer can't rely on that invoice either. If a trade customer needs to reclaim VAT, sell the item outside the margin scheme with full VAT instead, if the dealer bought it with VAT.`,
    },
    {
      kind: "md",
      md: `### Global accounting

Recording each item separately is impractical for a business selling lots of cheap second-hand goods, such as a vintage clothing shop, a furniture clearance business or a vehicle dismantler. **Global accounting** lets the dealer work out VAT on the **total** margin for the period:

> VAT due = 1/6 × (eligible sales in the period − eligible purchases in the period)

Conditions:
- Each item must have a **purchase price of £500 or less**. Bulk purchases where the combined price is over £500 are fine if no single item is worth more than £500.
- Aircraft, boats and outboard motors, caravans and motor caravans, horses and ponies, and motorcycles and other motor vehicles (except those broken up and sold as scrap) can't be sold under global accounting.
- If purchases exceed sales in a period, the **negative margin is carried forward** to the next period. It isn't repaid.

### The VAT return

| Box | Margin scheme entry |
|---|---|
| 1 | VAT due on the margins (or the global margin) for the period |
| 6 | Full selling price of eligible goods sold, **less** the VAT due on the margin |
| 7 | Full purchase price of eligible goods bought in the period |
| 8 and 9 | Leave margin scheme goods out |`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Other margin-type schemes",
      md: `Auctioneers have their own **auctioneers' scheme**, and businesses that buy in travel and resell it to travellers may fall under the **Tour Operators' Margin Scheme (TOMS)**, which is compulsory where it applies. Both are specialist areas. Flag them for a manager rather than applying the second-hand goods rules.`,
    },
  ],
  scenario: {
    title: "A quarter's margin scheme return for Ridgeway Motors",
    narrative: `Ridgeway Motors is a VAT-registered used-car dealer run by Dev as a sole trader. All its cars are bought from private sellers or as part-exchanges, so no VAT is charged on them. Sales for the quarter to 30 September 2026:

| Stock no. | Car | Bought for | Sold for |
|---|---|---|---|
| 1041 | Ford Fiesta | £6,200 | £7,700 |
| 1042 | VW Golf | £9,500 | £11,300 |
| 1043 | Nissan Qashqai | £11,000 | £10,400 |

Cars bought during the quarter (all still eligible stock): £27,800 in total. Dev's bookkeeper has treated the £29,400 of sales as VAT-inclusive and entered 1/6 of it (£4,900) in box 1: *"Is this right?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**No.** These cars qualify for the margin scheme (bought without VAT, stock book kept), so VAT is due on each margin, not on the full price.

| Car | Margin | VAT (1/6) |
|---|---|---|
| Fiesta | £1,500 | £250.00 |
| Golf | £1,800 | £300.00 |
| Qashqai | −£600 | £0.00 |
| **Total** | | **£550.00** |

The Qashqai loss can't be set against the other two margins. Under the standard margin scheme, each car stands on its own.`,
      },
      {
        kind: "md",
        md: `**Return entries:**
- **Box 1:** £550.00
- **Box 6:** £29,400 − £550 = **£28,850**
- **Box 7:** £27,800 (the purchase price of cars bought in the quarter)

**Check the paperwork.** Each sales invoice should show no VAT and carry the wording "margin scheme - second hand goods". The stock book should show the purchase and sale details for all three cars. Dev's original treatment (£4,900) would have overpaid £4,350 of VAT for the quarter.`,
      },
      {
        kind: "callout",
        tone: "warning",
        title: "Part-exchanges",
        md: `On a part-exchange, the **purchase price** of the car taken in is the part-exchange allowance actually given, and the **selling price** of the car sold is the full price before deducting that allowance. Don't net the two together, or both margins will be wrong.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "single-margin",
      prompt: "An antiques dealer buys a clock from a private seller for £2,850 and sells it under the margin scheme for £3,690. How much VAT is due on the sale?",
      answer: 140,
      unit: "£",
      explain: "VAT is 1/6 of the margin, because the margin is treated as VAT-inclusive.",
      working: "Margin £3,690 − £2,850 = £840. VAT £840 × 1/6 = **£140**.",
    },
    {
      kind: "numeric",
      id: "global-margin",
      prompt:
        "A vintage clothing shop uses global accounting. In the quarter, eligible purchases (each item under £500) total £12,000 and eligible sales total £16,800. The previous quarter had a negative margin of £1,200 carried forward. What VAT is due this quarter?",
      answer: 600,
      unit: "£",
      explain: "Under global accounting a negative margin is carried forward and set against the next period's margin.",
      working: "Margin £16,800 − £12,000 = £4,800. Less negative margin brought forward £1,200 = £3,600. VAT £3,600 × 1/6 = **£600**.",
    },
    {
      kind: "classify",
      id: "eligible",
      prompt: "Can each sale go through the second-hand margin scheme?",
      categories: ["Margin scheme available", "Not available: full VAT on the selling price"],
      items: [
        { text: "Used car bought from a member of the public, stock book kept", answer: 0 },
        { text: "Used car bought from a leasing company that charged VAT on the sale", answer: 1, why: "VAT was charged on the purchase, so the goods aren't eligible." },
        { text: "Painting bought from the artist's estate at a private sale", answer: 0 },
        { text: "Investment gold coins bought from a private collector", answer: 1, why: "Investment gold is excluded from the margin schemes." },
        { text: "Second-hand furniture sold with a VAT invoice showing VAT at 20% on the selling price, at the trade buyer's request", answer: 1, why: "Showing VAT separately takes the sale outside the scheme." },
      ],
      explain:
        "The margin scheme is for eligible goods obtained without VAT being charged, sold on invoices that don't show VAT. If any condition fails, VAT is due on the full price.",
    },
    {
      kind: "mcq",
      id: "box6",
      prompt: "A dealer's margin scheme sales in the quarter are £50,000 and the VAT due on the margins is £1,800. What goes in box 6?",
      options: ["£50,000", "£48,200", "£41,667", "£1,800"],
      answer: 1,
      explain: "Box 6 shows the full selling price of margin scheme goods less the VAT due on the margins: £50,000 − £1,800 = £48,200.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-fraction",
      prompt: "What is the VAT on a margin scheme sale where the margin is £1,200?",
      options: ["£240", "£200", "£120", "Nil"],
      answer: 1,
      explain: "The margin is VAT-inclusive, so VAT = £1,200 × 1/6 = £200.",
    },
    {
      kind: "mcq",
      id: "q-loss",
      prompt: "Under the standard margin scheme, a dealer sells a car for £500 less than it cost. What's the VAT position?",
      options: ["Repayment of 1/6 of the loss", "No VAT on that car, and the loss can't reduce other margins", "The loss reduces the next car's margin", "VAT is due on the full selling price"],
      answer: 1,
      explain: "A negative margin means no VAT on that sale. Only global accounting allows negative margins to be carried forward.",
    },
    {
      kind: "mcq",
      id: "q-global-limit",
      prompt: "What is the per-item purchase price limit for goods sold under global accounting?",
      options: ["£250", "£500", "£1,000", "There's no limit"],
      answer: 1,
      explain: "Each item must have cost £500 or less. A bulk purchase over £500 can still qualify if no single item cost more than £500.",
    },
    {
      kind: "mcq",
      id: "q-buyer-reclaim",
      prompt: "A VAT-registered business buys a used van from a dealer under the margin scheme. How much input tax can it reclaim?",
      options: ["1/6 of the price", "1/6 of the dealer's margin", "None", "20% of the price"],
      answer: 2,
      explain: "A margin scheme invoice doesn't show VAT, so the buyer has no input tax to reclaim.",
    },
    {
      kind: "mcq",
      id: "q-invoice",
      prompt: "Which of these must appear on a margin scheme sales invoice?",
      options: ["The VAT amount", "The words 'margin scheme - second hand goods' (or the relevant wording)", "The dealer's margin", "The purchase price"],
      answer: 1,
      explain: "The invoice must carry the prescribed wording and must not show VAT. The margin and purchase price belong in the stock book, not on the customer's invoice.",
    },
  ],
  sources: [
    { label: "VAT margin schemes (GOV.UK guide)", url: "https://www.gov.uk/vat-margin-schemes" },
    { label: "VAT margin schemes: keeping records", url: "https://www.gov.uk/vat-margin-schemes/keeping-records" },
    { label: "VAT margin schemes: VAT return", url: "https://www.gov.uk/vat-margin-schemes/vat-return" },
    { label: "Using the global accounting VAT margin scheme", url: "https://www.gov.uk/guidance/using-the-global-accounting-vat-margin-scheme" },
    { label: "Using the VAT margin scheme for second-hand vehicles", url: "https://www.gov.uk/guidance/using-the-vat-margin-scheme-for-second-hand-vehicles" },
    { label: "HMRC VAT Margin Schemes manual", url: "https://www.gov.uk/hmrc-internal-manuals/vat-margin-schemes" },
  ],
};
