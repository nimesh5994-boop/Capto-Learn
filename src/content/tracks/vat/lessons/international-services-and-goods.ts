import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "international-services-and-goods",
  title: "International VAT: place of supply, imports, exports and Northern Ireland",
  level: "advanced",
  minutes: 45,
  taxYear: "2026/27",
  summary:
    "Where cross-border services are taxed (B2B and B2C, the main exceptions and the reverse charge), how exports of goods are zero-rated and what evidence is needed, how import VAT works with postponed VAT accounting, and the basics of Northern Ireland's position under the Windsor Framework.",
  objectives: [
    "Apply the general place of supply rules for B2B and B2C services and recognise the main exceptions",
    "Zero-rate exports of goods correctly and know the evidence and time limits",
    "Account for import VAT under postponed VAT accounting and complete the VAT return",
    "Explain how Northern Ireland's treatment of goods differs from Great Britain's",
  ],
  body: [
    {
      kind: "md",
      md: `International VAT splits into two very different sets of rules:
- **Services** are taxed according to the **place of supply** rules (VATA 1994 ss7A–9A, Notice 741A). If the place of supply is outside the UK, there's no UK VAT.
- **Goods** are taxed according to where they physically move. **Exports** are zero-rated if the conditions are met. **Imports** bear import VAT, which a registered business normally accounts for on its return.

Since the end of the Brexit transition period on 31 December 2020, Great Britain treats the EU like any other overseas territory for goods. Northern Ireland is different, and is covered at the end of this lesson.`,
    },
    {
      kind: "table",
      caption: "Place of supply of services: the general rules",
      head: ["Customer", "General rule", "UK supplier to an overseas customer", "Overseas supplier to a UK customer"],
      rows: [
        ["Business (B2B)", "Where the **customer** belongs", "Outside the scope of UK VAT. No UK VAT charged.", "UK customer applies the **reverse charge**"],
        ["Consumer (B2C)", "Where the **supplier** belongs", "UK VAT charged as normal, unless an exception applies (see below)", "No UK VAT (the overseas supplier's own country's rules apply)"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Main exceptions to the general rules (Notice 741A section 6.4)",
      md: `- **Land-related services** (construction, architects working on a specific site, estate agents, hotel accommodation): taxed **where the land is**, B2B or B2C.
- **Admission to events** (conferences, concerts, exhibitions): taxed where the event takes place.
- **Restaurant and catering services**: where they're physically carried out.
- **Passenger transport**: where the transport takes place, in proportion to distance.
- **Short-term hire of means of transport** (up to 30 days, or 90 days for vessels): where the vehicle is put at the customer's disposal.
- **Cultural, educational and entertainment services to consumers** (classroom courses, performances): taxed where they're **performed**.
- **B2C telecoms, broadcasting and electronically supplied services** (apps, downloads, streaming): taxed where the **consumer** belongs. A UK business selling these to EU consumers deals with EU VAT, for example through an EU One Stop Shop registration.
- **Professional and other intangible services to consumers who belong outside the UK** (Notice 741A section 12): services of consultants, lawyers, accountants and engineers, advertising, banking, financial and insurance services, supply of staff and hire of goods (other than means of transport) are taxed where the **customer** belongs. A UK accountant advising a private client who lives in Spain charges no UK VAT.`,
    },
    {
      kind: "md",
      md: `**Proving business status.** To treat an overseas customer as a business (and so not charge UK VAT), hold evidence: an EU VAT number, or for other countries a certificate from the tax authority or other commercial evidence that the customer is in business. **Without evidence, treat the customer as a consumer** and charge UK VAT.

**Return entries for a UK supplier.** Outside-the-scope services to overseas business customers go in **box 6** (net value) with no output tax. The supplier can still **recover input tax** on costs relating to them, as long as the supply would have been taxable if made in the UK.

The **reverse charge on services bought from abroad** was covered in the daily query clinic lesson: output tax in box 1, the same amount in box 4, and the net value in both box 6 and box 7.`,
    },
    {
      kind: "md",
      md: `### Exports of goods

Goods sent from Great Britain to anywhere outside the UK, or from Northern Ireland to a non-EU destination, are **zero-rated** if (Notice 703):
- the goods are **exported within 3 months** of the time of supply, and
- the supplier obtains **valid evidence of export within 3 months**: an export declaration with departure confirmation (MRN), or commercial evidence such as an air waybill, bill of lading or CMR note, plus evidence of the supply itself (order, invoice and payment).

**Direct exports**, where the supplier arranges the transport, are the safest. **Indirect (ex-works) exports**, where the overseas customer collects, need a much higher standard of evidence. If the evidence isn't obtained in time, the supplier must account for **UK VAT**, and if the price was fixed, that VAT comes out of the price (1/6 of it).

Exports go in **box 6** (net value) with nothing in box 1. Keep the evidence for 6 years.`,
    },
    {
      kind: "md",
      md: `### Imports and postponed VAT accounting (PVA)

Import VAT is charged on the customs value of goods **plus** any customs duty and costs of transport to the UK. A VAT-registered business can use **postponed VAT accounting**, with no prior approval needed: it puts its VAT number on the customs declaration, and the import VAT is then accounted for on its VAT return instead of being paid at the border.

**Each month**, download the **monthly postponed import VAT statement** from the Customs Declaration Service. Then:
- **Box 1:** import VAT from the statement
- **Box 4:** the same amount, as input tax (subject to the normal rules)
- **Box 7:** the value of the imports, excluding VAT

If the business **doesn't** use PVA, the VAT is paid at import (often by the freight agent), and the evidence for reclaiming it is the **C79 import VAT certificate**, not the agent's invoice.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Download the statements every month",
      md: `Statements are only available online for a limited time, and they're the evidence for the box 4 claim. Make downloading each client's PVA statement part of the month-end routine, and reconcile it with the import invoices. A missing statement often means the freight agent paid the VAT instead, and you'll need the C79.

Separate rules apply to goods in consignments of **£135 or less** sold to UK customers, where the seller or online marketplace accounts for the VAT at the point of sale.`,
    },
    {
      kind: "md",
      md: `### Northern Ireland basics

Under the **Windsor Framework**, Northern Ireland stays in the UK VAT system but continues to follow **EU VAT rules for goods**. Services follow UK rules throughout the UK.

- Goods moving between **NI and the EU** are not imports or exports. A sale from NI to an EU VAT-registered business can be **zero-rated as a dispatch** (customer's EU VAT number on the invoice, evidence of removal, EC Sales List). Purchases by an NI business from EU suppliers are **acquisitions**: acquisition VAT goes in **box 2**, input tax in box 4, and values in boxes 7 and 9.
- NI businesses trading in goods with the EU identify themselves as trading under the Windsor Framework (in practice an **XI** prefix on their VAT number).
- PVA in NI applies only to goods from outside **both** the UK and the EU.
- Boxes 2, 8 and 9 on the VAT return are only used for these NI–EU goods movements. For a GB business they should normally be nil.`,
    },
  ],
  scenario: {
    title: "A cross-border quarter for Haldane Instruments Ltd",
    narrative: `Haldane Instruments Ltd makes laboratory equipment in Sheffield (Great Britain) and files quarterly VAT returns. In the quarter to 30 September 2026:

1. Sells equipment for £24,000 to a university in **Canada**, shipped by Haldane's own courier. The export declaration and the courier's proof of delivery are on file.
2. Charges a **German** company (EU VAT number on file) £6,000 for remote calibration consultancy.
3. Charges a private individual from **France** £800 for a one-day classroom training course held at its Sheffield premises.
4. Imports components from **China**: customs value £10,000, duty £400, using PVA.

The bookkeeper has charged UK VAT on everything and paid nothing on the imports. Haldane asks us to put it right.`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Canada:** a direct export with evidence held within 3 months, so it's **zero-rated**. Box 6: £24,000. No output tax.
2. **Germany:** a B2B service where the customer belongs in Germany, so it's **outside the scope** of UK VAT. Evidence of business status is held (VAT number). Box 6: £6,000. The invoice should say the customer accounts for any VAT under the reverse charge in its own country.
3. **French consumer:** a B2C educational service, taxed where it's **performed**, which is Sheffield. **Charge UK VAT**: £800 + £160. Box 1: £160, box 6: £800. (If Haldane had instead given a French private individual *consultancy* advice, the Notice 741A section 12 rule would make it outside the scope, because the customer belongs outside the UK.)
4. **China imports:** import VAT = 20% × (£10,000 + £400) = **£2,080**. Box 1 £2,080, box 4 £2,080, box 7 £10,400 (as shown on the monthly PVA statement).`,
      },
      {
        kind: "table",
        caption: "Corrected VAT return entries for these items",
        head: ["Item", "Box 1", "Box 4", "Box 6", "Box 7"],
        rows: [
          ["Export to Canada", "£0", "", "£24,000", ""],
          ["Consultancy to German business", "£0", "", "£6,000", ""],
          ["Training for French consumer", "£160", "", "£800", ""],
          ["Imports from China (PVA)", "£2,080", "£2,080", "", "£10,400"],
          ["**Total**", "**£2,240**", "**£2,080**", "**£30,800**", "**£10,400**"],
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Fix the invoices too",
        md: `The Canadian and German customers were invoiced with UK VAT. Issue credit notes and replacement invoices without VAT. Don't just correct the return, or the customers will hold invoices showing VAT that HMRC has never received.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "pos-classify",
      prompt: "A UK VAT-registered business makes these supplies. Should it charge UK VAT?",
      categories: ["Charge UK VAT", "No UK VAT (outside the scope or zero-rated)"],
      items: [
        { text: "Accountancy services to a US company (evidence of business status held)", answer: 1, why: "B2B general rule: taxed where the customer belongs." },
        { text: "A classroom training course in Birmingham attended by a private individual from Spain", answer: 0, why: "B2C educational services are taxed where they're performed." },
        { text: "Legal advice to a private individual who lives in Spain", answer: 1, why: "Professional services to a consumer belonging outside the UK are supplied where the customer belongs (Notice 741A section 12)." },
        { text: "Architect's design work on a specific building site in Ireland, for an Irish business", answer: 1, why: "Land-related: taxed where the land is, so outside the scope of UK VAT." },
        { text: "Tickets to a conference held in Manchester, sold to a French business", answer: 0, why: "Admission to events: taxed where the event takes place." },
        { text: "Goods shipped directly to a customer in Australia, with export evidence obtained within 3 months", answer: 1, why: "A zero-rated export." },
        { text: "Consultancy for an overseas customer who provides no evidence of being in business", answer: 0, why: "Without evidence of business status, treat the customer as a consumer." },
      ],
      explain: "Identify the type of supply and the customer's status, then check for an exception. Land, events, catering and B2C educational services follow where they physically happen. Professional services to consumers outside the UK follow the customer. Goods follow export rules.",
    },
    {
      kind: "numeric",
      id: "import-vat",
      prompt:
        "A GB business imports goods with a customs value of £15,000. Customs duty is £900 and there are no other costs to add. It uses postponed VAT accounting. What import VAT goes in box 1?",
      answer: 3180,
      unit: "£",
      explain: "Import VAT is charged on the customs value plus duty. Under PVA the same amount goes in box 1 and box 4 (if fully recoverable), and the value in box 7.",
      working: "(£15,000 + £900) × 20% = £15,900 × 20% = **£3,180**.",
    },
    {
      kind: "numeric",
      id: "export-evidence-fail",
      prompt:
        "A client sold goods ex-works to an overseas customer for £12,000, invoiced with no VAT as an export. Four months later it still has no valid evidence that the goods left the UK, and the contract doesn't allow VAT to be added. How much output tax must the client account for?",
      answer: 2000,
      unit: "£",
      explain: "If export evidence isn't obtained within 3 months, the supply is standard-rated. Where the price can't be increased, the VAT comes out of the price received using the VAT fraction.",
      working: "£12,000 × 1/6 = **£2,000**.",
    },
    {
      kind: "mcq",
      id: "pva-evidence",
      prompt: "A client that uses postponed VAT accounting asks what evidence supports the import VAT claimed in box 4. What do you tell them?",
      options: ["The freight agent's invoice", "The monthly postponed import VAT statement", "The supplier's commercial invoice", "No evidence is needed"],
      answer: 1,
      explain: "Under PVA, the monthly statement downloaded from the Customs Declaration Service is the evidence. If VAT was paid at the border instead, the C79 certificate is the evidence.",
    },
    {
      kind: "mcq",
      id: "ni-acquisition",
      prompt: "A Belfast business buys stock from a VAT-registered supplier in Dublin, and the goods are delivered to Belfast. How is the VAT accounted for?",
      options: [
        "Import VAT under postponed VAT accounting",
        "As an acquisition: acquisition VAT in box 2, input tax in box 4, values in boxes 7 and 9",
        "No VAT: it's an intra-EU zero-rated supply",
        "Irish VAT is charged and reclaimed through the UK return",
      ],
      answer: 1,
      explain: "Under the Windsor Framework, goods moving from the EU to NI are acquisitions, not imports. PVA in NI applies only to goods from outside both the UK and the EU.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-b2b",
      prompt: "What is the general place of supply rule for B2B services?",
      options: ["Where the supplier belongs", "Where the customer belongs", "Where the service is performed", "Where the invoice is paid"],
      answer: 1,
      explain: "B2B services are generally supplied where the customer belongs (VATA 1994 s7A). B2C services are generally supplied where the supplier belongs.",
    },
    {
      kind: "mcq",
      id: "q-land",
      prompt: "A UK surveyor values a commercial building in Paris for a UK client. Where is the service supplied?",
      options: ["The UK, where the client belongs", "France, where the land is", "The UK, where the surveyor belongs", "Outside the scope everywhere"],
      answer: 1,
      explain: "Services relating to specific land are supplied where the land is, whoever the customer is.",
    },
    {
      kind: "mcq",
      id: "q-export-time",
      prompt: "Within what period must a supplier obtain evidence of export to zero-rate a direct export?",
      options: ["1 month", "3 months", "6 months", "12 months"],
      answer: 1,
      explain: "Notice 703 paragraph 3.5: 3 months from the time of supply both to export the goods and to obtain valid evidence.",
    },
    {
      kind: "mcq",
      id: "q-pva-approval",
      prompt: "Does a VAT-registered business need HMRC approval to use postponed VAT accounting?",
      options: ["Yes, it must apply in advance", "No, it just enters its VAT number on the customs declaration", "Only for imports over £135", "Only if it files monthly returns"],
      answer: 1,
      explain: "No approval is needed. The VAT registration number goes on the import declaration, and the VAT is accounted for on the return.",
    },
    {
      kind: "mcq",
      id: "q-electronic",
      prompt: "A UK app developer sells app subscriptions to consumers in Germany. Where are these supplies taxed?",
      options: ["The UK", "Germany", "Nowhere: they're digital", "Wherever the servers are"],
      answer: 1,
      explain: "B2C electronically supplied services are taxed where the consumer belongs. The developer must deal with EU VAT, for example through an EU One Stop Shop registration.",
    },
    {
      kind: "mcq",
      id: "q-boxes-gb",
      prompt: "For a business based only in Great Britain, what should boxes 2, 8 and 9 of the VAT return normally show?",
      options: ["Imports and exports", "Nil: they're for Northern Ireland goods movements with the EU", "Reverse charge services", "Zero-rated sales"],
      answer: 1,
      explain: "Since 2021, boxes 2, 8 and 9 only cover movements of goods between Northern Ireland and the EU.",
    },
  ],
  sources: [
    { label: "Place of supply of services (VAT Notice 741A)", url: "https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a" },
    { label: "VAT on goods exported from the UK (VAT Notice 703)", url: "https://www.gov.uk/guidance/vat-on-goods-exported-from-the-uk-notice-703" },
    { label: "Check when you can account for import VAT on your VAT Return", url: "https://www.gov.uk/guidance/check-when-you-can-account-for-import-vat-on-your-vat-return" },
    { label: "Complete your VAT Return to account for import VAT", url: "https://www.gov.uk/guidance/complete-your-vat-return-to-account-for-import-vat" },
    { label: "VAT on movements of goods between Northern Ireland and the EU (Notice 725)", url: "https://www.gov.uk/guidance/vat-on-movements-of-goods-between-northern-ireland-and-the-eu" },
    { label: "How to fill in and submit your VAT Return (VAT Notice 700/12)", url: "https://www.gov.uk/guidance/how-to-fill-in-and-submit-your-vat-return-vat-notice-70012" },
  ],
};
