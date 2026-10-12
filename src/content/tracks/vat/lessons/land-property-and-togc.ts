import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "land-property-and-togc",
  title: "Land and property, the option to tax, and transfers of a going concern",
  level: "advanced",
  minutes: 45,
  taxYear: "2026/27",
  summary:
    "Property is where VAT mistakes cost the most. The default exemption for land, the main exceptions (new commercial buildings, new homes, parking and hotels), how the option to tax works, and when a business or a let property can be sold with no VAT as a transfer of a going concern.",
  objectives: [
    "Identify the VAT liability of common property transactions",
    "Explain the option to tax: its effect, notification, the permission rules and revocation",
    "Apply the zero rate to the first grant of a major interest in a new dwelling",
    "Test whether a sale qualifies as a transfer of a going concern, including the extra conditions for a let property",
  ],
  body: [
    {
      kind: "md",
      md: `The starting point is that supplies of land and buildings, including sales, leases and lettings, are **exempt** (VATA 1994 Sch 9 Group 1). There are important exceptions that make some property supplies standard-rated or zero-rated, and an **option to tax** that lets the owner of commercial property turn exempt supplies into taxable ones.

Always establish the liability **before** contracts are exchanged. On a property deal, adding 20% after the event can wreck the economics, and **Stamp Duty Land Tax is charged on the VAT-inclusive price**.`,
    },
    {
      kind: "table",
      caption: "Common property transactions and their default VAT liability",
      head: ["Transaction", "Liability", "Notes"],
      rows: [
        ["Sale or lease of an older commercial building (more than 3 years old)", "Exempt", "Standard-rated if the seller or landlord has opted to tax"],
        ["Freehold sale of a **new** commercial building (less than 3 years from completion)", "Standard-rated", "Compulsory; the option to tax isn't needed"],
        ["Letting of residential property", "Exempt", "The option to tax can't apply to dwellings"],
        ["First sale or long lease (major interest) of a new dwelling by the person who built it", "Zero-rated", "A major interest is the freehold or a lease of more than 21 years (20 in Scotland)"],
        ["Hotel and holiday accommodation, car parking, storage, sports facilities, timber and fishing rights", "Standard-rated", "Specific exceptions to the exemption"],
        ["Sale of a let property as a business", "Outside the scope if it's a TOGC", "Strict conditions apply: see below"],
      ],
    },
    {
      kind: "md",
      md: `### New dwellings

The first grant of a **major interest** in a new dwelling by the **person constructing** it is **zero-rated** (Sch 8 Group 5). That means the developer can recover input tax on its build costs while selling the houses with no VAT. Construction services supplied to the developer for a new dwelling are also zero-rated (Notice 708). Conversions of non-residential buildings into homes have their own zero rate for the first sale, and some renovations of long-empty homes qualify for the 5% reduced rate.

A developer that **lets** the new homes instead of selling them makes exempt supplies, and its input tax becomes exempt input tax. This is a common partial exemption trap when a developer can't sell and decides to rent out.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The option to tax (Notice 742A)",
      md: `- **Effect:** the owner's future supplies of that land or building become standard-rated, so it can recover input tax on related costs (purchase VAT, refurbishment, service charges).
- **Scope:** it covers the whole building and land within its curtilage. It's personal to the person who opts. A buyer doesn't inherit the seller's option.
- **Notification:** notify HMRC in writing within **30 days** of the decision, normally on form **VAT1614A**.
- **Permission:** if the owner has made exempt supplies of the property in the previous **10 years**, it needs HMRC's permission (form VAT1614H), unless one of the automatic permission conditions applies.
- **Revocation:** within a **6-month** cooling-off period if nothing has happened since; automatically after **6 years** without any interest in the property; or after **20 years**, if the conditions are met.
- **Doesn't apply to:** dwellings, and buildings intended for relevant residential or charitable use, where the buyer gives the right certificate (for example form VAT1614D for a conversion to homes).`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Opting affects tenants",
      md: `Once a landlord opts, rent is standard-rated. That's harmless for a fully taxable tenant, which reclaims the VAT, but a real 20% cost for a tenant that's an insurer, a bank, a charity, a doctor's surgery or a nursery. Check who the tenants are before recommending an option. Most leases allow the landlord to add VAT, but that can damage the relationship.`,
    },
    {
      kind: "md",
      md: `### Transfer of a going concern (TOGC)

When a business is sold as a going concern, the sale of its assets is treated as **neither a supply of goods nor a supply of services**, so **no VAT** is charged (VAT (Special Provisions) Order 1995 art 5). The TOGC rules are **compulsory**. If the conditions are met, VAT must not be charged.

**Conditions (Notice 700/9):**
1. The assets are transferred as part of the transfer of a **business**, or a part that can operate on its own, as a **going concern**.
2. The buyer intends to use them to carry on the **same kind of business**.
3. If the seller is VAT registered, the buyer is already registered or **becomes registrable** as a result.
4. There's **no significant break** in trading before or immediately after the transfer.
5. The business isn't immediately transferred on again.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Extra conditions for a let property",
      md: `Selling a building with a tenant in place can be a TOGC of a **property rental business**. Where the seller has **opted to tax** (or the building is a new commercial building), the sale is only a TOGC if the **buyer**:
- has **opted to tax** the property and **notified HMRC** no later than the time of supply (normally completion, or an earlier deposit paid to the seller as agent), **and**
- has told the seller that its option **won't be disapplied** by the anti-avoidance rules.

If the buyer hasn't opted in time, the sale isn't a TOGC, and the seller must charge VAT on the full price.`,
    },
    {
      kind: "md",
      md: `**After a TOGC:**
- The buyer may take over the seller's **VAT number** (form VAT68), but then it also takes on the seller's VAT liabilities and history.
- If the buyer doesn't take the number, the seller keeps the records but must give the buyer the information it needs.
- If VAT was charged by mistake on a TOGC, the seller should issue a credit note and refund the buyer. HMRC won't let the buyer reclaim VAT that wasn't properly due.
- A buyer of a building that's still within its CGS adjustment period takes over the remaining intervals.`,
    },
  ],
  scenario: {
    title: "Selling Unit 4, Tamar Trade Park",
    narrative: `Pellow Properties Ltd owns Unit 4, a 15-year-old warehouse let to a logistics company on a 10-year lease. Pellow opted to tax the unit in 2019 and recovered the VAT on a major refurbishment. It has agreed to sell the unit, with the tenant in place, to **Tregear Investments Ltd** for **£1,250,000**, completing on 30 November 2026.

Tregear's solicitor asks whether VAT of £250,000 will be added to the price. If so, Tregear will need bridging finance for the VAT, and SDLT would be calculated on £1,500,000.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Is this a TOGC of a property rental business?**

1. A business is being transferred: letting the unit to a tenant is a property rental business. ✔
2. Tregear will continue to let the unit to the same tenant, so it's the same kind of business. ✔
3. Pellow is VAT registered, so Tregear must be registered or registrable. The rent of the opted unit will be standard-rated, and it is above the registration threshold, so Tregear will register. ✔
4. No break in letting, and no immediate onward sale. ✔
5. **Extra conditions:** Pellow has opted, so Tregear must **opt to tax Unit 4 and notify HMRC before completion**, and confirm to Pellow in writing that its option won't be disapplied. ⚠ This is still outstanding.`,
      },
      {
        kind: "md",
        md: `**Advice:**
- Tregear must notify its option to tax (VAT1614A) **before 30 November 2026** and send Pellow a copy, along with the written non-disapplication confirmation. Pellow's solicitor should see proof of both before completion.
- If those steps are done, the sale is a TOGC: **no VAT**, and SDLT is calculated on £1,250,000 rather than £1,500,000.
- If Tregear misses the deadline, the sale is a standard-rated supply of an opted building: **VAT of £250,000**, and SDLT is calculated on the VAT-inclusive price.
- Pellow should check whether any CGS adjustment periods are still running on its refurbishment. If so, Tregear takes them over.`,
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Put it in the contract",
        md: `The sale contract should include a TOGC clause: both parties intend a TOGC, the buyer warrants that it has opted and notified, and if HMRC later decides it wasn't a TOGC, the buyer pays the VAT on receipt of a VAT invoice. It protects the seller if the conditions turn out not to have been met.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "property-liability",
      prompt: "Classify the VAT liability of each supply. Assume no option to tax unless stated.",
      categories: ["Exempt", "Standard-rated", "Zero-rated", "Outside the scope (TOGC)"],
      items: [
        { text: "A landlord lets a 20-year-old shop to a retailer", answer: 0 },
        { text: "A developer sells the freehold of an office block completed 18 months ago", answer: 1, why: "A freehold sale of a new commercial building is standard-rated." },
        { text: "A housebuilder sells the freehold of a house it has just built", answer: 2, why: "The first grant of a major interest in a new dwelling by the person constructing it." },
        { text: "A landlord that has opted to tax lets a 30-year-old factory", answer: 1, why: "The option to tax makes the rent standard-rated." },
        { text: "A company lets car parking spaces to local commuters", answer: 1, why: "Car parking is an exception to the exemption." },
        { text: "An opted, let office sold to a buyer that opted and notified HMRC before completion, and gave the non-disapplication confirmation", answer: 3 },
      ],
      explain: "Start from exemption, then check the exceptions (new commercial freeholds, parking, hotels and the like), the zero rate for new dwellings, any option to tax, and whether the sale is a TOGC.",
    },
    {
      kind: "numeric",
      id: "vat-not-togc",
      prompt:
        "A seller that opted to tax a let office agrees to sell it for £900,000. The buyer forgets to opt to tax before completion. How much VAT must the seller charge?",
      answer: 180000,
      unit: "£",
      explain: "Without the buyer's option notified by the time of supply, the property rental TOGC conditions fail, and the sale is a standard-rated supply of an opted building.",
      working: "£900,000 × 20% = **£180,000**. SDLT would then be calculated on £1,080,000.",
    },
    {
      kind: "mcq",
      id: "option-notify",
      prompt: "A landlord decides on 3 November 2026 to opt to tax a building it has never let. By when must it notify HMRC?",
      options: ["Within 30 days of the decision", "Within 6 months", "By the next VAT return", "Before the first rent is invoiced, however far away that is"],
      answer: 0,
      explain: "Notice 742A section 4.2: notify in writing within 30 days of the decision, normally on form VAT1614A.",
    },
    {
      kind: "multi",
      id: "togc-conditions",
      prompt: "A VAT-registered café owner sells her café as a going concern to a buyer who will run it as a café. Which of these would **stop** the sale being a TOGC? Select all that apply.",
      options: [
        "The buyer isn't registered and won't need to register because its turnover will be under the threshold",
        "The café closes for a week for redecoration around the handover",
        "The buyer plans to turn the premises into a dentist's surgery",
        "The café is making a loss",
        "The buyer immediately sells the business on to a third party",
      ],
      answers: [0, 2, 4],
      explain:
        "The buyer must be registered or registrable, must carry on the same kind of business, and there must be no immediate onward transfer. A short closure for redecoration doesn't normally matter, and a loss-making business can still be a going concern.",
    },
    {
      kind: "mcq",
      id: "lease-major-interest",
      prompt: "A developer that built a new block of flats in England grants a 15-year lease of one flat. What's the VAT liability?",
      options: ["Zero-rated: first grant by the builder", "Exempt: a lease of 21 years or less isn't a major interest", "Standard-rated", "Outside the scope"],
      answer: 1,
      explain: "Zero-rating needs a major interest: the freehold or a lease of more than 21 years (20 in Scotland). A 15-year lease of a dwelling is exempt.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-default",
      prompt: "What is the default VAT liability of selling or letting land and buildings?",
      options: ["Standard-rated", "Zero-rated", "Exempt", "Outside the scope"],
      answer: 2,
      explain: "VATA 1994 Sch 9 Group 1 makes land and property supplies exempt by default, subject to the exceptions and the option to tax.",
    },
    {
      kind: "mcq",
      id: "q-new-commercial",
      prompt: "For how long is a commercial building 'new', so that a freehold sale is compulsorily standard-rated?",
      options: ["1 year from completion", "3 years from completion", "5 years from completion", "10 years from completion"],
      answer: 1,
      explain: "A building is new for 3 years from completion, meaning the earlier of practical completion and full occupation.",
    },
    {
      kind: "mcq",
      id: "q-permission",
      prompt: "When does a landlord need HMRC's permission to opt to tax?",
      options: ["Always", "If it has made exempt supplies of the property in the previous 10 years, unless an automatic condition applies", "Only for residential property", "Never"],
      answer: 1,
      explain: "Permission is needed after exempt supplies in the previous 10 years, unless one of the automatic permission conditions in Notice 742A is met.",
    },
    {
      kind: "mcq",
      id: "q-revoke",
      prompt: "Within what cooling-off period can an option to tax normally be revoked?",
      options: ["30 days", "6 months", "1 year", "20 years"],
      answer: 1,
      explain: "An option can be revoked within 6 months if no tax advantage has arisen. After that, revocation is generally only possible after 6 years without an interest, or after 20 years.",
    },
    {
      kind: "mcq",
      id: "q-togc-compulsory",
      prompt: "A sale meets all the TOGC conditions, but the buyer asks the seller to charge VAT anyway. What should the seller do?",
      options: ["Charge VAT, because the buyer asked", "Not charge VAT: the TOGC rules are compulsory", "Charge VAT at 5%", "Ask HMRC for permission"],
      answer: 1,
      explain: "If the conditions are met, the transfer is not a supply. VAT charged in error must be refunded, and the buyer can't reclaim it.",
    },
    {
      kind: "mcq",
      id: "q-sdlt",
      prompt: "Why does it matter for SDLT whether VAT is charged on a commercial property purchase?",
      options: ["It doesn't", "SDLT is charged on the VAT-inclusive price", "VAT replaces SDLT", "SDLT is reduced when VAT is charged"],
      answer: 1,
      explain: "SDLT is charged on the chargeable consideration, which includes any VAT. A TOGC that removes the VAT therefore also reduces SDLT.",
    },
  ],
  sources: [
    { label: "Land and property (VAT Notice 742)", url: "https://www.gov.uk/guidance/vat-on-land-and-property-notice-742" },
    { label: "Opting to tax land and buildings (VAT Notice 742A)", url: "https://www.gov.uk/guidance/opting-to-tax-land-and-buildings-notice-742a" },
    { label: "Transfer a business as a going concern (VAT Notice 700/9)", url: "https://www.gov.uk/guidance/transfer-a-business-as-a-going-concern-and-vat-notice-7009" },
    { label: "Buildings and construction (VAT Notice 708)", url: "https://www.gov.uk/guidance/buildings-and-construction-vat-notice-708" },
    { label: "VAT Act 1994 Schedule 9 (exempt supplies)", url: "https://www.legislation.gov.uk/ukpga/1994/23/schedule/9" },
  ],
};
