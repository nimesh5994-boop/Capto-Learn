import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "rates-and-liability",
  title: "VAT rates and liability: standard, reduced, zero, exempt, outside the scope",
  level: "foundation",
  minutes: 45,
  taxYear: "2026/27",
  summary:
    "How to decide the VAT liability of a sale, with the real-world examples that trip people up: food and catering, construction, transport and digital products. Plus single and multiple supplies, and the temporary changes in force in 2026.",
  objectives: [
    "Apply the default rule that supplies are standard-rated unless the law says otherwise",
    "Classify common food, catering, construction, transport and digital supplies correctly",
    "Explain the difference between exempt, zero-rated and outside-the-scope income on a client's sales ledger",
    "Distinguish a single (composite) supply from a multiple (mixed) supply and apportion where needed",
  ],
  body: [
    {
      kind: "md",
      md: `**Liability** means which VAT treatment a supply gets. The starting point is simple: **every supply of goods or services is standard-rated at 20% unless the law specifically gives it another treatment**. The exceptions are listed in the VAT Act 1994:

- **Schedule 7A**: reduced rate (5%).
- **Schedule 8**: zero rate (0%).
- **Schedule 9**: exemption.

So the question to ask is never "is this standard-rated?" but "is there a relief that takes it out of the standard rate?" If you can't find one in the schedules or HMRC's Notices, it's 20%.`,
    },
    {
      kind: "table",
      caption: "The main rates for 2026/27",
      head: ["Rate", "Examples"],
      rows: [
        ["Standard 20%", "Most goods and services; adult clothing and footwear; restaurant meals; hot takeaway food; alcohol; soft drinks; software; taxis; repairs to existing buildings; private school fees (from 1 January 2025)"],
        ["Reduced 5%", "Domestic fuel and power (gas, heating oil, and electricity in Northern Ireland); children's car seats; mobility aids for the elderly; nicotine patches and gum; residential conversions; renovating homes empty for 2+ years"],
        ["Zero 0%", "Most food; books, newspapers and e-publications; children's clothing and footwear; public transport in vehicles with 10+ seats; new dwellings; prescriptions dispensed by a pharmacist; exports of goods; sanitary products; installing energy-saving materials in homes (to 31 March 2027)"],
        ["Exempt", "Insurance; finance and loans; residential lets; most land and buildings unless opted; education by eligible bodies; health care by registered professionals; Royal Mail universal postal services; betting and gaming; burial and cremation"],
        ["Outside the scope", "Wages; dividends; true donations and grants; statutory fees (for example the statutory MOT fee, Companies House filing fees); fines; transfers of a going concern; supplies whose place of supply is outside the UK"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Temporary changes in 2026",
      md: `- **Domestic electricity in Great Britain is temporarily zero-rated from 1 October 2026 to 31 March 2027** (normally 5%). Gas and other fuels stay at 5%, and electricity in **Northern Ireland stays at 5%** (Revenue and Customs Brief 10 (2026)).
- A temporary 5% rate for certain children's meals, children's tickets and family attractions applied from 25 June to 1 September 2026 (Revenue and Customs Brief 5 (2026)). It has now ended, but you may see it on returns covering that summer.

Check the rate in force on the **tax point** of each supply when a rate changes mid-period.`,
    },
    {
      kind: "md",
      md: `### Food and catering

The zero rate covers **food of a kind used for human consumption**, but with a list of *excepted items* that are standard-rated, and it never covers **catering**.

| Zero-rated | Standard-rated |
|---|---|
| Bread, meat, fish, fruit, vegetables, milk | **Confectionery** and chocolate-covered biscuits |
| Cakes (including chocolate-covered cakes) and plain or partly-coated biscuits | **Crisps**, roasted nuts and potato-based savoury snacks |
| Tea, coffee and cocoa (dry) | **Ice cream** and frozen yoghurt |
| Cold takeaway sandwiches and salads | **Soft drinks**, fruit juices and bottled water |
| Food sold cold to take away | **Hot takeaway food** (pasties sold hot, fish and chips) |
| Animal feed for livestock | **Pet food** |
| | **Anything eaten on the premises** (catering), including a cold sandwich eaten in the café |

The test for catering is about **where** the food is consumed and whether it's hot, not how healthy it is.`,
    },
    {
      kind: "md",
      md: `### Construction and property

| Work | Liability |
|---|---|
| Building a **new dwelling** (labour and materials by the builder) | Zero |
| First sale or long lease (over 21 years) of a new home by the developer | Zero |
| Repairs, maintenance, extensions and refurbishment of an **existing** home | Standard |
| Converting a non-residential building (an office, a barn) into homes | Reduced 5% |
| Renovating a home that has been **empty for 2 years or more** | Reduced 5% |
| Installing energy-saving materials (insulation, solar panels, heat pumps) in homes | Zero until 31 March 2027 |
| Building a new office, shop or warehouse | Standard |
| Selling an old (over 3 years) commercial building | Exempt, unless the seller has opted to tax |

### Transport

| Supply | Liability |
|---|---|
| Train, bus and coach fares (vehicle with **10 or more seats**) | Zero |
| Domestic and international flights | Zero |
| Taxi and private hire (fewer than 10 seats) | Standard |
| Car hire, car parking | Standard |
| Freight transport within the UK | Standard |
| International freight transport | Zero |

### Digital products

| Supply | Liability |
|---|---|
| E-books, e-newspapers and e-magazines | Zero (since 1 May 2020) |
| Software, apps, music and video streaming subscriptions | Standard |
| Website design and hosting | Standard |
| Online training sold by a commercial (non-eligible) provider | Standard |`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Exempt is not the same as 'outside the scope'",
      md: `Both mean no VAT is charged, but they're coded differently. **Exempt** supplies count in **box 6** of the VAT return and can restrict input tax recovery under partial exemption. **Outside the scope** items (wages, dividends, donations) are left out of the return altogether. Getting the code wrong distorts box 6 and any partial exemption calculation.`,
    },
    {
      kind: "md",
      md: `### One supply or two?

If a business sells several elements for one price, decide whether it's:

- A **single (composite) supply**: one main element with others that are just a better means of enjoying it. The ancillary items take the **liability of the main supply**. Example: a delivery charge on a sofa is part of the standard-rated supply of the sofa; a delivery charge on zero-rated books is zero-rated.
- A **multiple (mixed) supply**: genuinely separate supplies sold together. **Apportion** the price on a fair and reasonable basis, normally by the separate cost or selling price of each element. Example: a gift hamper containing zero-rated cake and tea and standard-rated wine.

Look at the transaction from the point of view of the typical customer: what are they actually buying?`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "When you're not sure, check before invoicing",
      md: `Liability errors are expensive: if a supply you treated as zero-rated is actually standard-rated, the VAT comes out of the price already charged (1/6 of it). Use HMRC's Notices (for example Notice 701/14 for food, Notice 708 for construction) and, for genuinely unclear cases, a non-statutory clearance request to HMRC.`,
    },
  ],
  scenario: {
    title: "Coding the tills for Bramble & Bean café-deli",
    narrative: `**Bramble & Bean Ltd** runs a café with a deli counter in Harrogate. It has just moved to new till software and the manager, **Sian**, sends you the product list to set up the VAT codes:

1. Fresh sourdough loaf to take home — £4.20
2. Cold ham sandwich to take away — £4.80
3. Same cold ham sandwich eaten at a table — £4.80
4. Hot sausage roll from the heated cabinet, to take away — £2.50
5. Flapjack (non-chocolate) — £2.20
6. Chocolate brownie (a cake) — £2.80
7. Bag of crisps — £1.20
8. Bottle of still water — £1.50
9. Pack of ground coffee beans — £7.50
10. Hot cappuccino to take away — £3.20
11. Christmas hamper: £30 of tea, biscuits and jam plus a £20 bottle of wine (cost price split), sold for £60`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Sourdough**: food, not an excepted item, not catering. **Zero.**
2. **Cold sandwich to take away**: cold takeaway food is zero-rated. **Zero.**
3. **Same sandwich eaten in**: consumption on the premises is catering. **Standard.** The till needs an eat-in / takeaway button.
4. **Hot sausage roll**: kept hot in a heated cabinet to be sold hot, so it's hot takeaway food. **Standard.**
5. **Flapjack**: HMRC treats flapjacks as cakes. **Zero.**
6. **Chocolate brownie**: a cake, and cakes are zero-rated even if chocolate. **Zero.**
7. **Crisps**: excepted item. **Standard.**
8. **Bottled water**: beverages are excepted (except tea, coffee, milk and similar). **Standard.**
9. **Ground coffee**: tea and coffee as dry goods are food. **Zero.**
10. **Hot takeaway cappuccino**: hot drinks to take away are hot takeaway food and drink. **Standard.**
11. **Hamper**: a mixed supply. Apportion the £60 on the cost split: £30 / £50 = 60% food (zero) = £36; 40% wine (standard) = £24 VAT-inclusive, containing £24 × 1/6 = **£4 VAT**.`,
      },
      {
        kind: "table",
        caption: "Till codes",
        head: ["Item", "Code", "Why"],
        rows: [
          ["Loaf, cold takeaway sandwich, flapjack, brownie, ground coffee", "Zero", "Food, not catering or excepted"],
          ["Sandwich eaten in", "Standard", "Catering"],
          ["Hot sausage roll, hot cappuccino to go", "Standard", "Hot takeaway"],
          ["Crisps, bottled water", "Standard", "Excepted items"],
          ["Hamper", "Split: £36 zero / £24 standard", "Mixed supply apportioned by cost"],
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-food",
      prompt: "A supermarket and a café ask you to check their VAT codes. Classify each sale.",
      categories: ["Zero-rated", "Standard-rated"],
      items: [
        { text: "Box of plain digestive biscuits", answer: 0 },
        { text: "Chocolate-covered biscuits (fully coated)", answer: 1, why: "Chocolate-covered biscuits are confectionery-type excepted items." },
        { text: "Birthday cake", answer: 0 },
        { text: "Tub of ice cream", answer: 1 },
        { text: "Carton of orange juice", answer: 1, why: "Fruit juice is an excepted beverage." },
        { text: "Pint of milk", answer: 0 },
        { text: "Bag of dog food", answer: 1, why: "Pet food is excepted." },
        { text: "Fish and chips to take away", answer: 1, why: "Hot takeaway food." },
        { text: "Cold pasta salad to take away", answer: 0 },
        { text: "Soup and roll eaten in the café", answer: 1, why: "Catering." },
        { text: "Salted peanuts in shells", answer: 0, why: "Nuts in shells are not excepted; roasted or salted shelled nuts are." },
      ],
      explain:
        "Food is zero-rated unless it's an excepted item (confectionery, crisps and savoury snacks, ice cream, beverages other than tea/coffee/milk, pet food) or it's catering (eaten on the premises or hot takeaway).",
    },
    {
      kind: "classify",
      id: "classify-construction-transport-digital",
      prompt: "Classify these construction, transport and digital supplies.",
      categories: ["Standard 20%", "Reduced 5%", "Zero 0%", "Exempt"],
      items: [
        { text: "Builder constructing a brand-new detached house for a family", answer: 2 },
        { text: "Plumber replacing the boiler in a 1970s house (not a qualifying energy-saving installation)", answer: 0 },
        { text: "Developer converting a disused office block into flats", answer: 1 },
        { text: "Fitting loft insulation in a home in 2026", answer: 2, why: "Energy-saving materials in homes are zero-rated until 31 March 2027." },
        { text: "Train ticket from Leeds to London", answer: 2 },
        { text: "Taxi from the station to the client's office", answer: 0 },
        { text: "Annual subscription to a music streaming service", answer: 0 },
        { text: "E-book downloaded from an online store", answer: 2 },
        { text: "Rent of an old (10-year-old) office building where the landlord has not opted to tax", answer: 3 },
        { text: "Domestic gas supplied to a household", answer: 1 },
      ],
      explain:
        "New homes and energy-saving installations are zero-rated; work on existing homes is standard unless it's a conversion or a long-empty renovation (5%). Public transport in vehicles with 10+ seats is zero-rated but taxis are standard. E-publications are zero-rated, but software and streaming are standard. Commercial rent is exempt unless the landlord opts to tax.",
    },
    {
      kind: "numeric",
      id: "mixed-supply",
      prompt:
        "A garden centre sells a 'Christmas gift box' for **£45 including VAT**. It contains a children's book (cost £6), a box of chocolates (cost £4) and a scented candle (cost £10). It apportions the selling price by cost. How much **output VAT** is due on one gift box?",
      answer: 5.25,
      tolerance: 0.01,
      unit: "£",
      explain: "This is a mixed supply. The book is zero-rated; chocolates and the candle are standard-rated. Apportion the VAT-inclusive price by cost, then apply the VAT fraction to the standard-rated share.",
      working:
        "Total cost £20. Standard-rated share = (£4 + £10) / £20 = 70%. £45 × 70% = £31.50 VAT-inclusive. VAT = £31.50 × 1/6 = **£5.25**. The book share (£13.50) is zero-rated.",
    },
    {
      kind: "numeric",
      id: "electricity-rate-change",
      prompt:
        "A householder's electricity bill (Great Britain) covers 1 September to 30 November 2026 and shows **£420 net** of VAT, with meter readings showing consumption evenly spread over the 91 days (30 days in September, 61 in October–November). The supplier apportions by consumption. How much VAT should the bill show? Round to the nearest penny.",
      answer: 6.92,
      tolerance: 0.02,
      unit: "£",
      explain:
        "Domestic electricity in Great Britain is reduced-rated at 5% up to 30 September 2026 and temporarily zero-rated from 1 October 2026. HMRC allows suppliers to determine the liability by when the energy was consumed, so only September's share bears 5%.",
      working: "September share: £420 × 30/91 = £138.46. VAT at 5% = **£6.92**. October–November (£281.54) is zero-rated.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-default",
      prompt: "A client sells something you can't find in any of the reduced, zero or exempt schedules. What is the liability?",
      options: ["Exempt", "Zero-rated", "Standard-rated", "Outside the scope"],
      answer: 2,
      explain: "Standard rating is the default. Reliefs only apply where the law specifically provides them.",
    },
    {
      kind: "mcq",
      id: "q-sandwich",
      prompt: "A café sells the same cold sandwich to two customers: one takes it away, one eats it at a table. What is the VAT treatment?",
      options: ["Both zero-rated", "Both standard-rated", "Takeaway zero-rated; eat-in standard-rated", "Takeaway standard-rated; eat-in zero-rated"],
      answer: 2,
      explain: "Cold takeaway food is zero-rated; food consumed on the premises is catering and standard-rated.",
    },
    {
      kind: "mcq",
      id: "q-school-fees",
      prompt: "What is the VAT liability of fees charged by a private school for education from 1 January 2025?",
      options: ["Exempt", "Zero-rated", "Standard-rated", "Reduced-rated"],
      answer: 2,
      explain: "From 1 January 2025 education and boarding services provided by private schools for a charge are standard-rated.",
    },
    {
      kind: "mcq",
      id: "q-taxi",
      prompt: "Why are taxi fares standard-rated while bus fares are zero-rated?",
      options: [
        "Taxis are luxury items",
        "The zero rate for passenger transport applies only to vehicles designed to carry 10 or more passengers",
        "Taxi drivers are always VAT registered",
        "Bus companies are exempt",
      ],
      answer: 1,
      explain: "The passenger transport zero rate requires a vehicle with at least 10 seats (including the driver). Taxis and private hire cars fall outside it.",
    },
    {
      kind: "mcq",
      id: "q-delivery",
      prompt: "An online bookshop charges £3.99 delivery on an order of printed books. What is the liability of the delivery charge?",
      options: ["Standard-rated", "Zero-rated, because it's ancillary to the zero-rated books", "Exempt", "Outside the scope"],
      answer: 1,
      explain: "Delivery by the seller is normally ancillary to the supply of goods and follows the liability of the goods.",
    },
    {
      kind: "mcq",
      id: "q-electricity",
      prompt: "In November 2026, what rate of VAT applies to domestic electricity supplied to a home in Belfast?",
      options: ["0%", "5%", "20%", "Exempt"],
      answer: 1,
      explain: "The temporary zero rate from 1 October 2026 to 31 March 2027 applies only in Great Britain. Domestic electricity in Northern Ireland stays at 5%.",
    },
  ],
  sources: [
    { label: "VAT rates on different goods and services", url: "https://www.gov.uk/guidance/rates-of-vat-on-different-goods-and-services" },
    { label: "Food products and VAT (VAT Notice 701/14)", url: "https://www.gov.uk/guidance/food-products-and-vat-notice-70114" },
    { label: "Catering, takeaway food and VAT (VAT Notice 709/1)", url: "https://www.gov.uk/guidance/catering-takeaway-food-and-vat-notice-7091" },
    { label: "Buildings and construction (VAT Notice 708)", url: "https://www.gov.uk/guidance/buildings-and-construction-vat-notice-708" },
    { label: "The VAT treatment of passenger transport (VAT Notice 744A)", url: "https://www.gov.uk/guidance/the-vat-treatment-of-passenger-transport-notice-744a" },
    { label: "Revenue and Customs Brief 10 (2026): temporary zero rate for domestic electricity in Great Britain", url: "https://www.gov.uk/government/publications/revenue-and-customs-brief-10-2026-temporary-zero-rate-of-vat-for-domestic-electricity-in-great-britain/temporary-zero-rate-of-vat-for-domestic-electricity-in-great-britain" },
  ],
};
