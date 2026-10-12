import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "motoring-and-fuel-scale-charge",
  title: "Motoring costs and the fuel scale charge",
  level: "practitioner",
  minutes: 35,
  taxYear: "2026/27",
  summary:
    "Cars versus vans, buying and leasing cars, repairs, selling a car, employee mileage allowances, and the three ways to deal with road fuel, including how to look up and post the fuel scale charge using the rates from 1 May 2026.",
  objectives: [
    "Apply the car input tax block and its exceptions, and the 50% lease restriction",
    "Choose between the three road fuel options for a client",
    "Look up the correct fuel scale charge and calculate the output tax",
    "Reclaim VAT on the fuel element of mileage allowances with the right evidence",
  ],
  body: [
    {
      kind: "md",
      md: `Motoring is the biggest single source of input tax errors in small businesses. The rules depend on **what the vehicle is** (car or commercial vehicle), **what the cost is** (buying, leasing, repairs or fuel) and **whether there's private use**. Work through those three questions in order.`,
    },
    {
      kind: "table",
      caption: "Vehicle costs at a glance (Notice 700/64)",
      head: ["Cost", "Car available for private use", "Van or other commercial vehicle"],
      rows: [
        ["Buying the vehicle", "Input tax blocked in full", "Recoverable (adjust if there's significant private use)"],
        ["Leasing or hiring", "50% of the VAT on the rental is blocked", "Recoverable"],
        ["Repairs and maintenance", "Recoverable in full if the business pays and there's some business use", "Recoverable"],
        ["Road fuel", "Choose one of the three fuel options below", "Recoverable, or the business share only if there's private use"],
        ["Accessories fitted after purchase", "Recoverable if for business use (e.g. a sat nav for business journeys)", "Recoverable"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The car block and its exceptions",
      md: `Input tax on buying a **car** is blocked unless the car is used **exclusively for business** and **not available** for private use (VAT (Input Tax) Order 1992 art 7). In practice that's limited to:
- cars bought for **resale** by a motor dealer,
- cars used mainly as a **taxi**, for **self-drive hire** or as a **driving school** car,
- genuine **pool cars**, kept at business premises overnight and not allocated to one person.

"Available" is the key word. A car parked at the director's house overnight is available for private use, even if they say they never use it privately.`,
    },
    {
      kind: "md",
      md: `**Car or van?** For VAT, a car is a vehicle built or adapted mainly to carry passengers, or one with roofed rear accommodation and rear side windows. Vehicles with a **payload of one tonne or more**, vehicles that seat only one person or 12 or more, and vehicles of 3 tonnes or more unladen are not cars. Double-cab pick-ups are a common trap: check the payload on the manufacturer's specification, and don't rely on what the client calls the vehicle. Fitting rear seats or side windows to a van can turn it into a car.

**Selling a car.** If input tax was blocked when the car was bought, the sale is **exempt**: no VAT is charged and no VAT invoice is issued (Notice 700/64 section 7). If input tax was reclaimed, for example on a taxi or pool car, VAT is due on the full selling price.

### Road fuel: three options

1. **Reclaim all the fuel VAT and account for the fuel scale charge** on each car with private fuel. The scale charge is output tax that covers the private use.
2. **Reclaim only the business fuel**, supported by detailed mileage records (business and private miles for each vehicle).
3. **Reclaim no fuel VAT at all**, on any vehicle, including vans. This is simple, but rarely the best value.

If the client uses the scale charge, it must apply it to **every** car where fuel is provided for private use; it can't mix methods car by car. The "claim nothing" option covers **all** road fuel, in vans as well as cars.`,
    },
    {
      kind: "table",
      caption: "Extract from the VAT road fuel scale charges, 1 May 2026 to 30 April 2027 (VAT-inclusive charge and the VAT within it)",
      head: ["CO₂ band (g/km)", "Quarterly charge", "VAT due (quarter)", "Annual charge", "VAT due (year)"],
      rows: [
        ["120 or less", "£163", "£27.17", "£657", "£109.50"],
        ["130", "£261", "£43.50", "£1,051", "£175.17"],
        ["140", "£294", "£49.00", "£1,182", "£197.00"],
        ["150", "£328", "£54.67", "£1,314", "£219.00"],
        ["165", "£377", "£62.83", "£1,508", "£251.33"],
        ["175", "£409", "£68.17", "£1,640", "£273.33"],
        ["200", "£492", "£82.00", "£1,971", "£328.50"],
        ["225 or more", "£574", "£95.67", "£2,297", "£382.83"],
      ],
    },
    {
      kind: "callout",
      tone: "example",
      title: "Using the table",
      md: `1. Take the car's CO₂ figure from the V5C and **round down** to the nearest multiple of 5. 168 g/km uses the **165** band.
2. Pick the column for the VAT return period: monthly, quarterly or annual.
3. The VAT due is **1/6 of the charge**. It goes in **box 1**, and the charge net of VAT goes in **box 6**.
4. If the car was only used for part of the period, scale the charge down in proportion.
5. Use the new table from the start of the first VAT period beginning on or after **1 May**. The rates change every year.

If a car has no CO₂ figure, use the band for its engine size: up to 1,400cc is band 140, over 1,400cc up to 2,000cc is band 175, and over 2,000cc is band 225 or more.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Electric cars",
      md: `There's no fuel scale charge for electricity. VAT on charging at work or at a public charger is recoverable on the **business use** of the car, so detailed mileage records are needed. An employer can't recover VAT on electricity an employee buys to charge at home, because that supply is made to the employee. Don't apply the scale charge table to a fully electric car.`,
    },
    {
      kind: "md",
      md: `### Mileage allowances paid to employees

When a business pays employees a mileage allowance for business journeys in their own cars, it can reclaim the VAT included in the **fuel element** of the allowance. The fuel element is worked out using HMRC's **advisory fuel rates** for the car's engine size and fuel type, which are published quarterly.

> Input tax = business miles × advisory fuel rate × 1/6

The employer must hold **VAT receipts for fuel** that cover at least the fuel element and are dated on or before the end of the claim period (Notice 700/64 section 9). Without receipts there's no claim. Nothing can be reclaimed on the rest of the mileage allowance, which covers wear and tear and other running costs.`,
    },
  ],
  scenario: {
    title: "Fuel for the directors of Hollin Bank Landscapes Ltd",
    narrative: `Hollin Bank Landscapes Ltd files quarterly VAT returns (quarters ending March, June, September and December). It has:
- two vans used by the crews, with no private use,
- a company car for Sarah, the director, with CO₂ emissions of **143 g/km**. The company pays for all of its fuel, including Sarah's private mileage, and doesn't keep mileage logs.

For the quarter to 30 September 2026, fuel invoices total £2,160 including £360 VAT: £1,500 for the vans (£250 VAT) and £660 for Sarah's car (£110 VAT). The bookkeeper asks: *"Can we claim all £360?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**Option 2** (business fuel only) isn't available, because there are no mileage logs. Compare options 1 and 3:

- **Option 3 (claim nothing):** loses all £360, including the £250 on the vans, which have no private use.
- **Option 1 (claim everything plus a scale charge):** claim £360 and account for the scale charge on Sarah's car.

**Scale charge:** 143 g/km rounds **down** to the **140** band. The quarter to 30 September 2026 starts on 1 July 2026, after 1 May, so use the 2026/27 table: quarterly charge **£294**, VAT **£49.00**.

Net effect of option 1: £360 − £49 = **£311** of VAT recovered. Option 1 is clearly better.`,
      },
      {
        kind: "table",
        caption: "VAT return entries for fuel, quarter to 30 September 2026",
        head: ["Box", "Entry", "Amount"],
        rows: [
          ["Box 1", "Fuel scale charge output tax", "£49.00"],
          ["Box 4", "Fuel input tax (vans and car)", "£360.00"],
          ["Box 6", "Scale charge net of VAT", "£245.00"],
          ["Box 7", "Fuel net of VAT", "£1,800.00"],
        ],
      },
      {
        kind: "journal",
        title: "Posting the fuel scale charge",
        narrative: "The output tax on the scale charge is a cost to the company, charged to motor expenses.",
        lines: [
          { account: "Motor expenses – fuel", dr: 49 },
          { account: "VAT control (output tax)", cr: 49 },
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Diary it for 1 May",
        md: `Put a recurring reminder in each motoring client's file to update the scale charge every year from the first VAT period beginning on or after 1 May. Software often keeps last year's figure until someone changes it.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "scale-charge-vat",
      prompt:
        "A client with quarterly returns pays all the fuel for a director's car with CO₂ emissions of **152 g/km** and reclaims all its fuel VAT. What output tax is due on the fuel scale charge for the quarter to 31 December 2026?",
      answer: 54.67,
      tolerance: 0.01,
      unit: "£",
      explain: "Round 152 down to the 150 band. The quarterly charge from 1 May 2026 is £328, and the VAT element is 1/6 of that.",
      working: "£328 × 1/6 = **£54.67**.",
    },
    {
      kind: "numeric",
      id: "part-period",
      prompt:
        "A company with quarterly returns provides a car with CO₂ emissions of **200 g/km** to a sales manager from 1 November 2026, part-way through its quarter to 31 December 2026, and pays all the fuel. The car is used for 2 of the 3 months. What output tax is due for the quarter?",
      answer: 54.67,
      tolerance: 0.01,
      unit: "£",
      explain: "When a car is only used for part of a period, the scale charge is reduced in proportion.",
      working: "Quarterly charge, band 200: £492, so VAT is £82.00. For 2 of the 3 months: £82.00 × 2/3 = **£54.67**.",
    },
    {
      kind: "numeric",
      id: "mileage-fuel",
      prompt:
        "An employee drives 1,200 business miles in their own petrol car in a quarter. The employer pays a mileage allowance and holds fuel receipts covering the fuel element. Assume the relevant advisory fuel rate is **14p per mile**. How much input tax can the employer reclaim?",
      answer: 28,
      unit: "£",
      explain: "Only the fuel element of the allowance carries VAT, worked out with the advisory fuel rate, and the VAT is 1/6 of that VAT-inclusive fuel cost.",
      working: "Fuel element: 1,200 × £0.14 = £168. VAT: £168 × 1/6 = **£28**.",
    },
    {
      kind: "classify",
      id: "vehicle-costs",
      prompt: "A VAT-registered plumbing company has these motoring costs. Classify the VAT on each.",
      categories: ["Recoverable in full", "50% recoverable", "Blocked"],
      items: [
        { text: "Buying a new van for an engineer", answer: 0 },
        { text: "Buying a new car for the director, kept at their home", answer: 2, why: "A car available for private use: blocked." },
        { text: "Monthly lease of the director's car (some private use)", answer: 1, why: "50% of the VAT on car leasing is blocked where there's private use." },
        { text: "Servicing and new tyres for the director's company car", answer: 0, why: "Repairs and maintenance are recoverable where there's business use." },
        { text: "Buying a car used solely as a driving school car", answer: 0, why: "Driving school cars are an exception to the block." },
      ],
      explain: "Buying a car with private availability is blocked. Leasing one is 50% blocked. Running costs such as repairs are recoverable. Commercial vehicles are recoverable.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-round",
      prompt: "A car's CO₂ emissions are 189 g/km. Which fuel scale charge band applies?",
      options: ["185", "190", "180", "225 or more"],
      answer: 0,
      explain: "Round down to the nearest multiple of 5: 189 becomes 185.",
    },
    {
      kind: "mcq",
      id: "q-scale-box",
      prompt: "Where does the VAT on a fuel scale charge go on the VAT return?",
      options: ["Deducted from box 4", "Box 1", "Box 7", "It isn't shown"],
      answer: 1,
      explain: "The scale charge is output tax and goes in box 1. The charge net of VAT goes in box 6.",
    },
    {
      kind: "mcq",
      id: "q-electric",
      prompt: "A company pays to charge a director's fully electric company car. How is the VAT handled?",
      options: ["Fuel scale charge, band 120 or less", "Reclaim the business share of the charging costs", "Blocked in full", "Reclaim in full with no adjustment for private use"],
      answer: 1,
      explain: "Electricity isn't road fuel for the scale charge. Recover the VAT on the business use, supported by records.",
    },
    {
      kind: "mcq",
      id: "q-sale-car",
      prompt: "A company sells a car on which input tax was blocked when it was bought. It sells for less than it cost. What VAT is due on the sale?",
      options: ["20% of the sale price", "1/6 of the sale price", "None: the sale is exempt", "VAT on the loss"],
      answer: 2,
      explain: "Where input tax was blocked on purchase, the sale of the car is exempt, so no VAT is charged and no VAT invoice is issued.",
    },
    {
      kind: "mcq",
      id: "q-mileage-evidence",
      prompt: "What evidence must an employer hold to reclaim VAT on the fuel element of mileage allowances?",
      options: ["Nothing: it's automatic", "A mileage log only", "VAT fuel receipts covering at least the fuel element", "The employee's V5C"],
      answer: 2,
      explain: "HMRC requires VAT fuel receipts covering the fuel element claimed, as well as mileage records supporting the business miles.",
    },
    {
      kind: "mcq",
      id: "q-change-date",
      prompt: "A client's VAT quarter runs from 1 April to 30 June 2026. Which scale charge table should it use?",
      options: ["The 2026/27 table, because the period ends after 1 May", "The 2025/26 table, because the period began before 1 May 2026", "Half of each", "Whichever is lower"],
      answer: 1,
      explain: "The new rates apply from the start of the first VAT period beginning on or after 1 May. This quarter began on 1 April, so the old table still applies to it.",
    },
  ],
  sources: [
    { label: "VAT on motoring expenses (VAT Notice 700/64)", url: "https://www.gov.uk/guidance/vat-on-motoring-expenses-notice-70064" },
    { label: "VAT road fuel scale charges from 1 May 2026 to 30 April 2027", url: "https://www.gov.uk/guidance/vat-road-fuel-scale-charges-from-1-may-2026-to-30-april-2027" },
    { label: "Road fuel scale charge tables for VAT (collection)", url: "https://www.gov.uk/government/collections/road-fuel-scale-charge-tables-for-vat" },
    { label: "Advisory fuel rates", url: "https://www.gov.uk/guidance/advisory-fuel-rates" },
    { label: "VAT (Input Tax) Order 1992 art 7", url: "https://www.legislation.gov.uk/uksi/1992/3222/article/7" },
  ],
};
