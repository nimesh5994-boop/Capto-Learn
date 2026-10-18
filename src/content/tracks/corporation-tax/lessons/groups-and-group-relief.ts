import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "groups-and-group-relief",
  title: "Groups: group relief and chargeable gains groups",
  level: "advanced",
  minutes: 45,
  taxYear: "2026/27",
  summary:
    "The different group definitions in corporation tax — associated companies, the 75% group relief group and the chargeable gains group — how to surrender losses for the best result, corresponding accounting periods, and moving assets, gains and losses around a gains group.",
  objectives: [
    "Distinguish associated companies, group relief groups and chargeable gains groups",
    "Apply the rules for surrendering current-year and carried-forward losses by group relief",
    "Restrict group relief for non-corresponding accounting periods and the claimant's own losses",
    "Explain no gain/no loss transfers, the election to reallocate gains and losses, and the degrouping charge",
  ],
  body: [
    {
      kind: "md",
      md: `"Group" means different things for different CT purposes. Getting the definition wrong is a classic error: a 60% subsidiary is an **associated company** (it divides the rate limits) but can't receive **group relief**; an indirect 72% subsidiary isn't in a group relief group but might be in a **gains group**. Always draw the structure chart with percentages first.`,
    },
    {
      kind: "table",
      caption: "The three relationships",
      head: ["Relationship", "Test", "Effect"],
      rows: [
        ["Associated companies", "One controls the other, or both under common control (> 50%), including by individuals", "Rate limits (£50k/£250k) and instalment thresholds divided"],
        ["Group relief group", "One company holds **≥ 75%** of the other's ordinary shares (directly or indirectly, multiplying through the chain), plus ≥ 75% of distributable profits and assets on a winding up; or both are 75% subsidiaries of a third company", "Losses can be surrendered between members"],
        ["Chargeable gains group", "**≥ 75%** direct holding at each level, and the top company has an **effective interest of more than 50%** in each member", "Assets move at no gain/no loss; gains and losses can be reallocated; rollover relief across the group"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "What can be surrendered (current period)",
      md: `- **Trading losses**: the surrendering company can surrender **any amount**, without first setting them against its own profits.
- **Non-trading loan relationship deficits**, **UK property business losses**, **excess management expenses** and **excess qualifying charitable donations**: only the amount **exceeding the surrendering company's own total profits** of the period.
- **Capital losses can't be group relieved** (but see gains groups below).

The **claimant** sets group relief against its **TTP**, after deducting its own reliefs for the same and earlier periods, but before any loss carried back from a later period. Its own **current-year trading loss and excess capital allowances** are deducted whether or not it actually claims them. Other reliefs, including its own **losses brought forward**, reduce the available profits only to the extent they are actually claimed or set off automatically (CTM80400). Post-April 2017 losses carried forward against total profits (s45A) need a claim, and the company can choose how much to claim. The amount claimed can't exceed the claimant's available profits.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Corresponding accounting periods",
      md: `Relief is only for the period that **overlaps** between the surrendering and claimant companies' accounting periods, and while both are in the group. For each, time-apportion: the maximum is the **lower** of the surrendering company's loss for the overlapping period and the claimant's profits for that period.

Example: surrendering company's year ends 31 December 2026 (loss £80,000); claimant's year ends 31 March 2027 (TTP £100,000). Overlap: 1 April to 31 December 2026 (9 months). Maximum: lower of £80,000 × 9/12 = £60,000 and £100,000 × 9/12 = £75,000 → **£60,000**.`,
    },
    {
      kind: "md",
      md: `### Carried-forward losses

Losses arising from 1 April 2017 that are carried forward can also be surrendered as group relief for carried-forward losses, provided the surrendering company can't use them itself in that period. The claimant must use its own carried-forward losses first, and the **£5m deductions allowance** is shared across the group.

### Payments for group relief

The claimant often pays the surrendering company for the losses. A payment up to the amount of the loss surrendered is **ignored** for CT: not taxable for the receiver, not deductible for the payer.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Chargeable gains groups",
      md: `- **No gain/no loss transfers:** assets transferred between members of a gains group are treated as made at a price giving no gain and no loss (cost plus indexation to December 2017, where relevant). Tax is deferred until the asset leaves the group.
- **Reallocation election:** two members can jointly elect (within 2 years of the end of the AP) to treat a gain or loss as made by the other, so a gain in one company can be matched with a capital loss in another (TCGA 1992 s171A).
- **Rollover relief** works across the gains group as if it were one trade.
- **Degrouping charge:** if a company leaves the group within **6 years** of receiving an asset by a no gain/no loss transfer, still owning it, the deferred gain crystallises. For share sales, it's added to the seller's proceeds for the shares, so it's often covered by the **substantial shareholding exemption**.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Where to put the loss",
      md: `Compare the marginal rate of each possible claimant. With several associated companies the rate limits are divided, so a small group company may have profits in the **marginal band**, where relief saves tax at an effective **26.5%**, more than a large company paying 25%. Then compare with carrying the loss back in the loss-making company itself.`,
    },
  ],
  scenario: {
    title: "Using a subsidiary's loss in the Harrow group",
    narrative: `**Harrow Holdings Ltd** owns:
- **100%** of **Harrow Kitchens Ltd**, which made a trading loss of **£120,000** in the year to 31 March 2027 (and no profits in the previous year);
- **80%** of **Harrow Bathrooms Ltd**, TTP **£180,000**;
- **60%** of **Harrow Tiles Ltd**, TTP **£300,000**.

Harrow Holdings itself has property income giving TTP of **£20,000**. All companies have 31 March year ends, and all are UK trading companies (Holdings is the holding company of a trading group, so it's not a close investment-holding company).

The group FD asks: *"Where should the Kitchens loss go?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**1. Who can claim?** Bathrooms (80%) and Holdings are in the 75% group relief group with Kitchens. **Tiles (60%) isn't**, so it can't claim.

**2. Rate limits.** All four companies are associated (Holdings controls each), so the limits are divided by 4: lower limit **£12,500**, upper limit **£62,500**.

**3. Marginal rates.**
- **Holdings** (TTP £20,000) is in the marginal band (£12,500–£62,500), so each £1 of profit above £12,500 is taxed at an effective **26.5%**.
- **Bathrooms** (TTP £180,000) is above £62,500: **25%**.

**4. Best allocation.** Surrender **£7,500** to Holdings (taking it down to the £12,500 lower limit, saving 26.5%) and **£112,500** to Bathrooms (saving 25%).`,
      },
      {
        kind: "table",
        caption: "Tax saved by the group relief claims",
        head: ["Claimant", "Loss surrendered", "Rate saved", "Tax saved"],
        rows: [
          ["Harrow Holdings Ltd", "£7,500", "26.5%", "£1,987.50"],
          ["Harrow Bathrooms Ltd", "£112,500", "25%", "£28,125.00"],
          ["**Total**", "**£120,000**", "", "**£30,112.50**"],
        ],
      },
      {
        kind: "md",
        md: `**Check Holdings:** CT on £20,000 = 25% × £20,000 − 3/200 × (£62,500 − £20,000) = £5,000 − £637.50 = £4,362.50. CT on £12,500 = 19% × £12,500 = £2,375.00. Saving **£1,987.50** ✓.

**Paperwork.** Kitchens signs a notice of consent to surrender; each claimant claims on its CT600 (supplementary page CT600C). Agree inter-company payments for the losses, which are ignored for CT up to the loss surrendered. Bathrooms' 20% minority shareholders may expect the payment to be at a fair price.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "which-group",
      prompt:
        "P Ltd owns 90% of Q Ltd. Q Ltd owns 80% of R Ltd. P Ltd also owns 60% of S Ltd. Classify each pair.",
      categories: ["Group relief AND gains group", "Gains group only", "Associated only (neither group)"],
      items: [
        { text: "P and Q", answer: 0, why: "90% direct." },
        { text: "P and R", answer: 1, why: "Effective 90% × 80% = 72%: under 75% for group relief, but ≥75% at each level and >50% effective for gains." },
        { text: "Q and R", answer: 0, why: "80% direct." },
        { text: "P and S", answer: 2, why: "60%: control, but below 75%." },
      ],
      explain: "Group relief needs 75% effective ownership (multiplied through the chain). A gains group needs 75% at each level and more than 50% effective for the top company.",
    },
    {
      kind: "numeric",
      id: "corresponding-periods",
      prompt:
        "A Ltd (year ended 30 September 2026) has a trading loss of £96,000. B Ltd, its 100% parent, has TTP of £60,000 for the year ended 31 December 2026. Both were in the group throughout. What is the maximum group relief B Ltd can claim from A Ltd's loss for B's year ended 31 December 2026?",
      answer: 45000,
      unit: "£",
      explain: "The overlap is 1 January to 30 September 2026 (9 months). Take the lower of each company's time-apportioned figure.",
      working: "A's loss for the overlap: £96,000 × 9/12 = £72,000\n\nB's profits for the overlap: £60,000 × 9/12 = £45,000\n\nMaximum **£45,000**",
    },
    {
      kind: "numeric",
      id: "claimant-own-losses",
      prompt:
        "A claimant company has trading profits of £150,000 in its year to 31 March 2027 and its own trading loss brought forward of £30,000, which it claims in full against those profits. A fellow group member wants to surrender a current-year trading loss of £200,000. What is the maximum group relief the claimant can take?",
      answer: 120000,
      unit: "£",
      explain: "Group relief can't exceed the claimant's total profits after reliefs it actually claims (or that are set off automatically) for the same and earlier periods (CTA 2010 s137; CTM80400). Its own current-year trading loss would be deducted even if not claimed, but a brought-forward loss reduces the limit only to the extent it is claimed.",
      working: "£150,000 − £30,000 = **£120,000**",
    },
    {
      kind: "mcq",
      id: "surrender-property-loss",
      prompt:
        "A group company has a UK property business loss of £40,000 and other total profits of £15,000 in the same period. How much of the property loss can it surrender as group relief?",
      options: ["£40,000", "£25,000", "£15,000", "None"],
      answer: 1,
      explain: "Property losses can only be surrendered to the extent they exceed the surrendering company's own total profits: £40,000 − £15,000.",
    },
    {
      kind: "mcq",
      id: "degrouping",
      prompt:
        "In 2024 Parent Ltd transferred a building to its 100% subsidiary at no gain/no loss. In 2027 Parent sells the subsidiary (with the building). What happens to the deferred gain?",
      options: [
        "Nothing: no gain/no loss transfers are permanent",
        "A degrouping charge arises, added to Parent's proceeds for the shares and often covered by the substantial shareholding exemption",
        "The subsidiary pays CT at 25% on the full value of the building",
        "It is rolled over automatically into the share price",
      ],
      answer: 1,
      explain: "Leaving within 6 years of the intra-group transfer triggers a degrouping charge, which for share sales is added to the disposal proceeds of the shares.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-75",
      prompt: "What shareholding is needed for two companies to be in a group relief group?",
      options: ["More than 50%", "At least 51%", "At least 75% (effective)", "100%"],
      answer: 2,
      explain: "75% of ordinary shares plus entitlements to profits and assets.",
    },
    {
      kind: "mcq",
      id: "q-capital-losses",
      prompt: "Can capital losses be surrendered as group relief?",
      options: ["Yes", "No, but gains and losses can be reallocated within a gains group by election", "Only to a parent company", "Only if they arose in the same period"],
      answer: 1,
      explain: "Capital losses aren't group-relievable; the s171A election achieves matching within a gains group.",
    },
    {
      kind: "mcq",
      id: "q-trading-loss-own",
      prompt: "Must a company set its current-year trading loss against its own profits before surrendering it?",
      options: ["Yes, always", "No: trading losses can be surrendered without first using them", "Only if it has property income", "Only for carried-forward losses"],
      answer: 1,
      explain: "Current-year trading losses can be surrendered in any amount.",
    },
    {
      kind: "mcq",
      id: "q-payment",
      prompt: "A claimant pays its fellow subsidiary £20,000 for £80,000 of losses surrendered. How is the payment treated?",
      options: ["Taxable for the receiver", "Deductible for the payer", "Ignored for CT", "A distribution"],
      answer: 2,
      explain: "Payments for group relief up to the amount of the loss are ignored.",
    },
    {
      kind: "mcq",
      id: "q-ngnl",
      prompt: "An asset is transferred between two members of a chargeable gains group. The transfer is treated as made at:",
      options: ["Market value", "The actual price paid", "No gain/no loss", "Zero"],
      answer: 2,
      explain: "Intra-group transfers are at no gain/no loss.",
    },
    {
      kind: "mcq",
      id: "q-associated-vs-group",
      prompt: "A 55% subsidiary is:",
      options: [
        "In the group relief group",
        "An associated company, but not in the group relief group",
        "Neither associated nor grouped",
        "In a chargeable gains group",
      ],
      answer: 1,
      explain: "Over 50% means control (associated); 75% is needed for group relief and gains groups.",
    },
  ],
  sources: [
    { label: "CTA 2010 Part 5: group relief (s99 onwards)", url: "https://www.legislation.gov.uk/ukpga/2010/4/part/5" },
    { label: "CTM80000: Groups and consortia (Company Taxation Manual)", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm80000" },
    { label: "CTM80400: Group relief – claimant company's available total profits", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm80400" },
    { label: "CG45000: Groups of companies (Capital Gains Manual)", url: "https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg45000" },
    { label: "TCGA 1992 s171A: notional transfers within a group", url: "https://www.legislation.gov.uk/ukpga/1992/12/section/171A" },
    { label: "CTM03925: Marginal relief, FY2023 onwards", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm03925" },
  ],
};
