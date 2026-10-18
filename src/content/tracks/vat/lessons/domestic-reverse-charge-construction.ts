import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "domestic-reverse-charge-construction",
  title: "The domestic reverse charge for building and construction",
  level: "practitioner",
  minutes: 35,
  taxYear: "2026/27",
  summary:
    "Since 1 March 2021, most VAT-registered subcontractors in CIS supply chains no longer charge VAT to their contractor: the contractor accounts for it instead. When the reverse charge applies, the end user and intermediary exceptions, invoicing, and how both sides complete their VAT returns.",
  objectives: [
    "Decide whether the domestic reverse charge applies to a construction supply",
    "Recognise end users and intermediary suppliers, and the importance of written notification",
    "Prepare a correct reverse charge invoice and complete the supplier's VAT return",
    "Post a reverse charge purchase and complete the customer's VAT return",
  ],
  body: [
    {
      kind: "md",
      md: `The **domestic reverse charge (DRC)** for building and construction services started on **1 March 2021** (VATA 1994 s55A). It was brought in to stop a type of fraud in which subcontractors charged VAT, collected it, and disappeared without paying it to HMRC.

Under the reverse charge the **customer**, not the supplier, accounts for the VAT. The supplier invoices without charging VAT. The customer declares output tax on its own VAT return and, if it's entitled to, reclaims the same amount as input tax. For a fully taxable contractor, the net effect is nil.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "When the reverse charge applies: all five conditions",
      md: `1. The supply is of **construction services** within the CIS definition of construction operations.
2. It's **standard-rated or reduced-rated**. Zero-rated work, such as building new houses, is outside the DRC.
3. The **supplier** is VAT registered in the UK.
4. The **customer** is VAT registered in the UK.
5. The payment has to be **reported under CIS**, and the customer is **not an end user or intermediary supplier**.

If any condition fails, normal VAT rules apply and the supplier charges VAT in the usual way.`,
    },
    {
      kind: "table",
      caption: "Services in and out of scope (HMRC DRC guidance)",
      head: ["Inside the DRC (if the other conditions are met)", "Outside the DRC when supplied on their own"],
      rows: [
        ["Constructing, altering, repairing, extending or demolishing buildings and structures", "Architects', surveyors' and consultants' professional services"],
        ["Installing heating, lighting, electrical, drainage, water and fire protection systems", "Manufacture or delivery of building materials and components with no fitting"],
        ["Painting and decorating, internal cleaning during construction", "Security systems such as burglar alarms and CCTV"],
        ["Site clearance, earth-moving, excavation, scaffolding", "Seating, blinds and shutters; signwriting"],
        ["Roads, pipelines, sewers and other civil engineering works", "Supplies of workers by employment businesses"],
      ],
    },
    {
      kind: "md",
      md: `### End users and intermediary suppliers

The reverse charge stops at the end of the construction supply chain. It **doesn't apply** where the customer is:
- an **end user**: a VAT- and CIS-registered business that doesn't sell the construction services on (for example, a property developer or a business having its own premises refitted), or
- an **intermediary supplier**: a VAT- and CIS-registered business connected to an end user (for example, a group company or a landlord passing on works to its tenant).

The customer should **tell the supplier in writing** that it's an end user or intermediary, for example in the contract. Without that notification the supplier has to apply the reverse charge. If the customer fails to notify, the customer becomes liable for the VAT that should have been accounted for under the reverse charge.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "The 5% disregard",
      md: `If a supply mixes reverse charge services with other items, and the reverse charge element is **5% or less** of the total value, the reverse charge element can be disregarded and the whole supply treated under normal VAT rules. It is optional and applies only to a **single supply** where **both** supplier and customer agree from the start of the contract, based on the overall contract value rather than invoice by invoice. It does **not** apply where the predominant element of the single supply is **zero-rated** (for example a new-build block of flats with a small commercial element). No end user or intermediary notification is needed for this disregard.

A separate 5% rule helps end users: a customer that is mainly an end user but re-supplies a small part (under 5% by value) of the services it receives can still give its supplier an end user notification (VATREVCON33200).`,
    },
    {
      kind: "md",
      md: `### Invoicing and the VAT return

The supplier's invoice must:
- say that the reverse charge applies, for example **"Reverse charge: customer to pay the VAT to HMRC"** or "VAT Act 1994 Section 55A applies",
- show the amount of VAT that the customer must account for (or, if the amount can't be shown, the VAT rate), but **not add it to the amount payable**.

| Box | Supplier (subcontractor) | Customer (contractor) |
|---|---|---|
| 1 | Nothing for the DRC sale | VAT on the reverse charge purchase |
| 4 | Normal input tax on its own purchases | Same VAT reclaimed (subject to normal rules) |
| 6 | Net value of the DRC sale | Don't include the purchase as a sale |
| 7 | — | Net value of the purchase |`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Subcontractors often become repayment traders",
      md: `A subcontractor whose sales are mostly under the reverse charge collects little or no output tax but still pays VAT on materials, tools and vans. It will often be in a **repayment** position. Consider **monthly returns** to speed up repayments. Flat Rate Scheme users have to exclude reverse charge sales from flat rate turnover, so the scheme rarely makes sense for them.`,
    },
    {
      kind: "md",
      md: `**CIS deductions still apply.** The contractor still makes CIS deductions from the labour element of payments to the subcontractor. Calculate them on the amount excluding VAT and materials, in exactly the same way as before the DRC.`,
    },
  ],
  scenario: {
    title: "First reverse charge invoices for Cole & Daughter Electrical",
    narrative: `Cole & Daughter Electrical is a VAT-registered partnership and a CIS subcontractor. In September 2026 it completes three jobs:

1. Rewiring offices for **Brightmoor Builders Ltd**, a VAT- and CIS-registered main contractor: £12,000 net.
2. New wiring in a newly built house for a developer, **zero-rated** work: £8,000 net.
3. Installing lighting in a café for the owner, who is VAT registered but not in CIS: £3,000 net.

Brightmoor hasn't given any end-user notification. Jess Cole asks: *"Which of these do I charge VAT on?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Brightmoor:** a construction service, standard-rated, both parties VAT registered, reported under CIS, and Brightmoor is a contractor that sells the work on to its own client (no end-user notice). **Reverse charge applies.** Invoice £12,000 with no VAT and the reverse charge wording, showing £2,400 as the VAT Brightmoor must account for.
2. **New house:** zero-rated, so **outside the DRC**. Invoice £8,000 at 0%.
3. **Café owner:** not in CIS, so the payment isn't reported under CIS. **Normal VAT.** Charge £3,000 + £600 VAT.`,
      },
      {
        kind: "table",
        caption: "Cole & Daughter's sales on its VAT return",
        head: ["Job", "Box 1", "Box 6"],
        rows: [
          ["Brightmoor (reverse charge)", "£0", "£12,000"],
          ["New house (zero-rated)", "£0", "£8,000"],
          ["Café (standard-rated)", "£600", "£3,000"],
          ["**Total**", "**£600**", "**£23,000**"],
        ],
      },
      {
        kind: "journal",
        title: "Brightmoor's entry for the reverse charge purchase",
        narrative: "Brightmoor owes Cole & Daughter £12,000, and accounts for the £2,400 as both output and input tax.",
        lines: [
          { account: "Cost of sales – subcontractors", dr: 12000 },
          { account: "VAT control (input tax)", dr: 2400 },
          { account: "VAT control (output tax)", cr: 2400 },
          { account: "Trade creditors", cr: 12000 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "drc-applies",
      prompt: "In each case the supplier is a VAT-registered CIS subcontractor. Does the domestic reverse charge apply?",
      categories: ["Reverse charge applies", "Normal VAT rules apply"],
      items: [
        { text: "Plastering for a VAT- and CIS-registered main contractor on an office refurbishment", answer: 0 },
        { text: "Plastering for a homeowner's extension", answer: 1, why: "The homeowner isn't VAT registered or in CIS." },
        { text: "Groundworks for a developer that has notified it's an end user", answer: 1, why: "End users are excluded once they've notified the supplier." },
        { text: "Bricklaying on new-build houses for a VAT-registered contractor (zero-rated)", answer: 1, why: "Zero-rated supplies are outside the DRC." },
        { text: "Scaffolding erection for a VAT- and CIS-registered contractor refurbishing a shop", answer: 0 },
        { text: "Architect's design fees invoiced to a main contractor", answer: 1, why: "Professional services aren't construction operations." },
      ],
      explain:
        "Check all five conditions: construction services, standard or reduced rate, both parties VAT registered, reportable under CIS, and the customer isn't an end user or intermediary.",
    },
    {
      kind: "numeric",
      id: "customer-box1",
      prompt:
        "A VAT-registered main contractor receives reverse charge invoices from subcontractors totalling £46,500 net in the quarter, all standard-rated. It's fully taxable. What amount does it add to **box 1** for these invoices?",
      answer: 9300,
      unit: "£",
      explain: "The customer accounts for output tax on reverse charge purchases at the rate that would have applied, and reclaims the same amount in box 4 if it's entitled to.",
      working: "£46,500 × 20% = **£9,300** in box 1, with the same £9,300 in box 4. The net effect is nil.",
    },
    {
      kind: "journal",
      id: "post-drc-purchase",
      prompt: "A fully taxable contractor receives a reverse charge invoice for £5,000 net of standard-rated groundworks. Post the purchase invoice, including the reverse charge VAT.",
      accounts: ["Cost of sales – subcontractors", "VAT control (input tax)", "VAT control (output tax)", "Trade creditors", "Bank", "CIS deductions payable", "Sales"],
      answer: [
        { account: "Cost of sales – subcontractors", dr: 5000 },
        { account: "VAT control (input tax)", dr: 1000 },
        { account: "VAT control (output tax)", cr: 1000 },
        { account: "Trade creditors", cr: 5000 },
      ],
      explain:
        "The creditor is only the net £5,000, because the supplier didn't charge VAT. The £1,000 reverse charge VAT is posted to both sides of the VAT control account. CIS deductions are made when the invoice is paid, not when it's posted.",
    },
    {
      kind: "mcq",
      id: "no-notification",
      prompt:
        "A developer (an end user) forgets to send the end-user notice. The subcontractor applies the reverse charge and invoices without VAT. What's the position?",
      options: [
        "The subcontractor must pay the VAT it didn't charge",
        "The developer must account for the VAT under the reverse charge",
        "No VAT is due because neither party charged it",
        "HMRC splits the VAT between them",
      ],
      answer: 1,
      explain:
        "Without notification, the supplier is right to apply the reverse charge, and the customer is liable to account for the VAT. Notification protects the end user from this.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-start",
      prompt: "From what date did the domestic reverse charge for construction services apply?",
      options: ["1 October 2019", "1 January 2021", "1 March 2021", "1 April 2022"],
      answer: 2,
      explain: "It was postponed twice and finally started on 1 March 2021.",
    },
    {
      kind: "mcq",
      id: "q-zero",
      prompt: "Does the reverse charge apply to zero-rated construction work?",
      options: ["Yes, always", "No: it applies only to standard and reduced-rated services", "Only on new-build houses", "Only if the customer asks"],
      answer: 1,
      explain: "Zero-rated supplies, such as most new-build housing work, are outside the DRC.",
    },
    {
      kind: "mcq",
      id: "q-invoice",
      prompt: "What must a reverse charge invoice show?",
      options: [
        "VAT added to the total due",
        "A statement that the reverse charge applies, and the VAT the customer must account for, not added to the total",
        "No mention of VAT at all",
        "The customer's UTR",
      ],
      answer: 1,
      explain: "The invoice must say the reverse charge applies and show the rate or the VAT amount, without adding it to the amount payable.",
    },
    {
      kind: "mcq",
      id: "q-supplier-box",
      prompt: "Where does the supplier record a reverse charge sale on its own VAT return?",
      options: ["Boxes 1 and 6", "Box 6 only (net value)", "Box 1 only", "It doesn't appear at all"],
      answer: 1,
      explain: "The supplier includes the net value in box 6 and declares no output tax.",
    },
    {
      kind: "mcq",
      id: "q-end-user",
      prompt: "Which of these customers is most likely to be an end user?",
      options: [
        "A main contractor building offices for a client",
        "A VAT- and CIS-registered property developer having flats refurbished to let",
        "A subcontractor passing work to another subcontractor",
        "A builders' merchant",
      ],
      answer: 1,
      explain: "An end user receives the construction services without selling them on. A developer having its own property refurbished is the typical example.",
    },
  ],
  sources: [
    { label: "VAT domestic reverse charge for building and construction services", url: "https://www.gov.uk/guidance/vat-domestic-reverse-charge-for-building-and-construction-services" },
    { label: "VAT reverse charge technical guide", url: "https://www.gov.uk/guidance/vat-reverse-charge-technical-guide" },
    { label: "How to use the VAT reverse charge if you supply building and construction services", url: "https://www.gov.uk/guidance/how-to-use-the-vat-reverse-charge-if-you-supply-building-and-construction-services" },
    { label: "How to use the VAT reverse charge if you buy building and construction services", url: "https://www.gov.uk/guidance/how-to-use-the-vat-reverse-charge-if-you-buy-building-and-construction-services" },
    { label: "VATREVCON25000 – supplies where the reverse charge element is a minor part (5% disregard)", url: "https://www.gov.uk/hmrc-internal-manuals/vat-reverse-charge-for-building-and-construction-services-manual/vatrevcon25000" },
    { label: "VATREVCON33200 – 5% disregard for end users", url: "https://www.gov.uk/hmrc-internal-manuals/vat-reverse-charge-for-building-and-construction-services-manual/vatrevcon33200" },
    { label: "VAT Act 1994 s55A", url: "https://www.legislation.gov.uk/ukpga/1994/23/section/55A" },
  ],
};
