import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "rates-and-marginal-relief",
  title: "CT rates, marginal relief and associated companies",
  level: "foundation",
  minutes: 40,
  summary:
    "The small profits rate, the main rate and the marginal relief band in between: how to apply the 3/200 fraction, how exempt dividends push up 'augmented profits', and how associated companies and short periods shrink the limits.",
  objectives: [
    "Apply the small profits rate, main rate and marginal relief for financial year 2026",
    "Calculate augmented profits and use them in the marginal relief formula",
    "Identify associated companies and divide the limits correctly",
    "Scale the limits for an accounting period shorter than 12 months",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Corporation tax rates are set for **financial years** (FY), which run from 1 April to 31 March and are named after the calendar year in which they start. FY2026 runs from 1 April 2026 to 31 March 2027. The rates have been unchanged since FY2023, so an accounting period straddling 31 March 2026 doesn't need to be split for rate purposes.`,
    },
    {
      kind: "table",
      caption: "Corporation tax rates for FY2023 to FY2026 (no associated companies, 12-month AP)",
      head: ["Augmented profits", "Rate", "Notes"],
      rows: [
        ["£50,000 or less (lower limit)", "Small profits rate 19%", "On taxable total profits"],
        ["£50,001 to £250,000", "Main rate 25% less marginal relief", "Effective marginal rate of 26.5% on profits in this band"],
        ["Over £250,000 (upper limit)", "Main rate 25%", "No marginal relief"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The marginal relief formula",
      md: `Marginal relief = **F × (U − A) × N / A**

- **F** = standard fraction, **3/200** (1.5%)
- **U** = upper limit (£250,000, adjusted for associated companies and short periods)
- **A** = **augmented profits** = taxable total profits + exempt distributions (dividends) received from companies **outside** the group
- **N** = **taxable total profits** (TTP)

Tax payable = 25% × N − marginal relief. If there are no exempt dividends, N = A and the fraction N/A is simply 1.`,
    },
    {
      kind: "callout",
      tone: "example",
      title: "Quick example",
      md: `TTP £120,000, no dividends received, no associated companies, 12-month AP in FY2026:
- 25% × £120,000 = £30,000
- Marginal relief = 3/200 × (£250,000 − £120,000) × 1 = £1,950
- **CT = £28,050** (an average rate of 23.4%)`,
    },
    {
      kind: "md",
      md: `### Associated companies

The lower and upper limits are **divided by (1 + the number of associated companies)**. Two companies are associated if one controls the other, or both are under the control of the same person or group of persons (CTA 2010 s18E). "Control" broadly means more than 50% of the share capital, votes or rights to income or assets.

- A company counts if it was associated **at any time** in the AP (even for one day).
- **Dormant** companies are ignored, as are **passive holding companies** (no assets other than shares in 51% subsidiaries, no income other than dividends passed up, no gains).
- **Overseas** companies count.
- When testing control, the rights of a person's **associates** (spouse, relatives, business partners) are only attributed to them where there is **substantial commercial interdependence** between the companies: financial, economic or organisational links.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "The same person controlling two unrelated businesses",
      md: `Substantial commercial interdependence is only relevant when you are attributing **someone else's** shares to a person. If the same individual directly owns more than 50% of two companies, they are associated **whatever** the businesses do. A director who owns 100% of a dental practice company and 100% of a buy-to-let company has two associated companies, so both have limits of £25,000 and £125,000.`,
    },
    {
      kind: "md",
      md: `### Short accounting periods

For an AP of less than 12 months, both limits are reduced proportionately: **limit × months in AP / 12**. Combine this with the associated-company division where both apply (e.g. a 6-month AP with one associate: £50,000 × 6/12 ÷ 2 = £12,500).`,
    },
    {
      kind: "table",
      caption: "Limits ready-reckoner (12-month AP)",
      head: ["Associated companies", "Divide by", "Lower limit", "Upper limit"],
      rows: [
        ["0", "1", "£50,000", "£250,000"],
        ["1", "2", "£25,000", "£125,000"],
        ["2", "3", "£16,667", "£83,333"],
        ["3", "4", "£12,500", "£62,500"],
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Ask about other companies at onboarding",
      md: `Associated companies are easy to miss because they may be looked after by another firm. At onboarding and every year-end, ask the directors: *"Do you, your spouse or close family control any other companies, here or abroad?"* Record the answer on the tax file and explain why it matters.`,
    },
  ],
  scenario: {
    title: "Two companies, one owner: Okafor Dental and Okafor Lettings",
    narrative: `Dr Grace Okafor owns 100% of **Okafor Dental Ltd** and 100% of **Okafor Lettings Ltd**, which owns three buy-to-let flats. Both companies have a 31 March year end. A new junior has prepared Okafor Dental Ltd's computation for the year ended 31 March 2027, showing taxable total profits of **£70,000** and CT of £17,550 (25% less marginal relief using £250,000 as the upper limit). The dental company also received **£5,000** of dividends from a FTSE 100 shareholding.

The manager's review note says: *"Check associates and augmented profits."*`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Associated companies:** Grace controls both companies directly, so they are associated. The lettings company holds property and has rental income, so it isn't dormant or a passive holding company. **One associated company: divide limits by 2.** Lower limit £25,000; upper limit £125,000.
2. **Augmented profits:** the FTSE dividend is an exempt distribution from a non-group company, so A = £70,000 + £5,000 = **£75,000**. N = £70,000.
3. **Main rate:** 25% × £70,000 = £17,500.
4. **Marginal relief:** 3/200 × (£125,000 − £75,000) × £70,000 / £75,000 = 0.015 × £50,000 × 0.93333 = **£700**.
5. **CT payable:** £17,500 − £700 = **£16,800**.`,
      },
      {
        kind: "table",
        caption: "Junior's computation vs reviewed computation",
        head: ["", "Junior", "Reviewed"],
        rows: [
          ["Upper limit", "£250,000", "£125,000"],
          ["Augmented profits", "£70,000", "£75,000"],
          ["Marginal relief", "£2,700", "£700"],
          ["CT payable", "£14,800", "£16,800"],
        ],
      },
      {
        kind: "callout",
        tone: "warning",
        title: "Spot the arithmetic too",
        md: `The junior's working note said £17,550, but 25% × £70,000 − 3/200 × £180,000 is £14,800. Two errors had partly cancelled out in the narrative. Always reperform the formula yourself.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "mr-basic",
      prompt:
        "Calder Valley Joinery Ltd has taxable total profits of £180,000 for the year ended 31 March 2027. It has no associated companies and received no dividends. What is its corporation tax liability?",
      answer: 43950,
      unit: "£",
      explain: "Profits are between £50,000 and £250,000, so the main rate applies less marginal relief.",
      working: "25% × £180,000 = £45,000\nMarginal relief = 3/200 × (£250,000 − £180,000) = £1,050\nCT = £45,000 − £1,050 = **£43,950**",
    },
    {
      kind: "numeric",
      id: "mr-associates",
      prompt:
        "Brindley Engineering Ltd has two associated companies throughout the year ended 31 December 2026. Its taxable total profits are £70,000 and it received no dividends. What is its corporation tax liability? (Work to the nearest pound.)",
      answer: 17300,
      unit: "£",
      tolerance: 1,
      explain: "With two associates, divide the limits by 3: lower £16,667, upper £83,333. £70,000 is in the marginal relief band.",
      working: "25% × £70,000 = £17,500\nUpper limit £250,000 ÷ 3 = £83,333.33\nMarginal relief = 3/200 × (£83,333.33 − £70,000) = £200.00\nCT = **£17,300**",
    },
    {
      kind: "numeric",
      id: "short-period",
      prompt:
        "A newly trading company with no associates has a 9-month first accounting period ending 31 December 2026, with taxable total profits of £30,000 and no dividends received. What is its CT liability?",
      answer: 5700,
      unit: "£",
      explain: "For a 9-month AP the lower limit is £50,000 × 9/12 = £37,500. £30,000 is below it, so the small profits rate of 19% applies to all of it.",
      working: "Lower limit £37,500; TTP £30,000 is below it.\n19% × £30,000 = **£5,700**",
    },
    {
      kind: "multi",
      id: "which-associated",
      prompt:
        "Kumar Holdings Ltd is owned 100% by Ravi Kumar. Which of the following companies count as **associated companies** of Kumar Holdings Ltd for its year ended 31 March 2027? Select all that apply.",
      options: [
        "Kumar Retail Ltd, a 100% trading subsidiary of Kumar Holdings Ltd",
        "Kumar Properties Ltd, 100% owned by Ravi personally, which lets two shops to unconnected tenants",
        "Kumar Old Co Ltd, 100% owned by Ravi, dormant throughout the year",
        "Patel Cafés Ltd, 100% owned by Ravi's brother, with no financial, economic or organisational links to Ravi's companies",
        "Kumar Spain SL, a 60% subsidiary trading in Spain",
      ],
      answers: [0, 1, 4],
      explain:
        "Control by the same person makes companies associated whatever their trade (so Kumar Properties counts), and overseas companies count. Dormant companies are ignored. The brother's shares are only attributed to Ravi if there is substantial commercial interdependence, and there isn't, so Patel Cafés is not associated.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-fraction",
      prompt: "What is the standard marginal relief fraction for FY2026?",
      options: ["1/40", "3/200", "3/400", "11/400"],
      answer: 1,
      explain: "The standard fraction has been 3/200 since FY2023. 11/400 is the ring fence fraction for oil and gas profits.",
    },
    {
      kind: "mcq",
      id: "q-augmented",
      prompt: "What are 'augmented profits'?",
      options: [
        "Trading profits plus chargeable gains",
        "Taxable total profits plus exempt dividends received from non-group companies",
        "Accounting profit before tax plus depreciation",
        "Taxable total profits before charitable donations",
      ],
      answer: 1,
      explain: "Augmented profits = TTP + exempt distributions from companies that aren't 51% group companies. They decide the rate band; tax is charged on TTP.",
    },
    {
      kind: "mcq",
      id: "q-effective-rate",
      prompt: "What is the effective marginal rate of CT on each extra pound of profit between the lower and upper limits?",
      options: ["19%", "25%", "26.5%", "30%"],
      answer: 2,
      explain: "25% main rate plus the 1.5% (3/200) of marginal relief clawed back as profits rise gives 26.5%.",
    },
    {
      kind: "mcq",
      id: "q-dormant",
      prompt: "A company had one associated company that was dormant all year. What upper limit applies?",
      options: ["£125,000", "£250,000", "£83,333", "£62,500"],
      answer: 1,
      explain: "Dormant companies are ignored when counting associated companies.",
    },
    {
      kind: "mcq",
      id: "q-sci",
      prompt: "When is 'substantial commercial interdependence' relevant?",
      options: [
        "Always, before any two companies can be associated",
        "Only when attributing the rights of a person's associates (e.g. a spouse) to them",
        "Only for overseas companies",
        "Only for group relief",
      ],
      answer: 1,
      explain: "Direct control by the same person makes companies associated automatically. SCI only governs whether an associate's rights are attributed.",
    },
  ],
  sources: [
    { label: "Corporation Tax rates and allowances", url: "https://www.gov.uk/government/publications/rates-and-allowances-corporation-tax/rates-and-allowances-corporation-tax" },
    { label: "Marginal Relief for Corporation Tax", url: "https://www.gov.uk/guidance/corporation-tax-marginal-relief" },
    { label: "CTM03925 – marginal relief, FY2023 onwards", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm03925" },
    { label: "CTM03945 – associated company definition: exclusions", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm03945" },
    { label: "CTM03950 – substantial commercial interdependence", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm03950" },
    { label: "CTA 2010 s18E – associated companies", url: "https://www.legislation.gov.uk/ukpga/2010/4/section/18E" },
  ],
};
