import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "trading-losses",
  title: "Trading losses: current year, carry back, carry forward and terminal relief",
  level: "practitioner",
  minutes: 40,
  taxYear: "2026/27",
  summary:
    "How a company relieves a trading loss: against total profits of the same period and the previous 12 months, carried forward against total profits (subject to the £5m deductions allowance and 50% restriction), and the 3-year carry back on cessation — plus choosing the order for the best tax result.",
  objectives: [
    "Apply current year and 12-month carry back relief under CTA 2010 s37",
    "Carry losses forward under s45A, including the partial claim and the corporate loss restriction",
    "Apply terminal loss relief under s39 on cessation",
    "Choose the most tax-efficient use of a loss and meet the claim deadlines",
  ],
  body: [
    {
      kind: "md",
      md: `A trading loss arises when the adjusted trading result, after capital allowances, is negative. The loss itself is just a number in the computation (trading profit for the period is nil); relief comes from setting it against other profits. A company has a menu of options, and the order you choose can change the tax saved by thousands of pounds, because of the different rates (19%, 25% and the 26.5% marginal band) in different periods.`,
    },
    {
      kind: "table",
      caption: "The main reliefs for a trading loss",
      head: ["Relief", "Against", "Claim"],
      rows: [
        ["**Current year** (CTA 2010 s37(3)(a))", "Total profits of the loss-making AP (before QCDs)", "Within 2 years of the end of the loss-making AP"],
        ["**Carry back** (s37(3)(b))", "Total profits of the previous **12 months**, after a current year claim", "Same claim; only if the current year claim is made first"],
        ["**Carry forward** (s45A, losses arising from 1 April 2017)", "Total profits of later APs; the company chooses how much to claim", "Within 2 years of the end of the AP in which relief is taken"],
        ["**Terminal loss** (s39)", "Total profits of the previous **3 years**, latest first", "Loss of the final 12 months of trading"],
        ["**Group relief**", "Profits of another group company for the same period (or carried-forward losses)", "See the groups lesson"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "How s37 works",
      md: `- The loss must first be set against **total profits of the same period** (trading, property, interest, gains). You can't carry back without making the current year claim.
- Any remaining loss can then be carried back against total profits of APs falling wholly or partly in the **12 months** before the loss-making AP (time-apportioning an AP that only partly falls in that window).
- Each claim is **all or nothing**: you can't choose to relieve only part of the available profits, even if that wastes the benefit of qualifying charitable donations (which are deducted after loss relief and can't be carried forward).`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Carrying forward and the loss restriction",
      md: `Losses arising from 1 April 2017 that aren't relieved by s37 or group relief are carried forward and can be set against **total profits** of later periods (s45A). The claim is **flexible**: the company chooses how much to use, so it can leave some loss to carry forward further.

The **corporate loss restriction** caps the use of carried-forward losses: a company (or group) can use carried-forward losses in full against the first **£5 million** of profits a year (the **deductions allowance**), but only against **50%** of profits above that. Most owner-managed companies never reach it, but you must know it exists.

Losses carried forward are restricted (to the same trade's profits only, under s45B) where, for example, the trade has become small or negligible. Changes in ownership combined with a major change in the trade can deny relief entirely.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Terminal losses",
      md: `When a trade **ceases**, the loss of the **final 12 months** can be carried back against total profits of the **3 years** before the start of the final period, **latest year first** (s39). This is in addition to the normal current year claim. It's often the most valuable relief for a business winding down, so time the cessation with this in mind.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Choosing the order",
      md: `Compare the **rate of tax saved** in each period. A carry back to a year when profits fell in the marginal relief band saves tax at an effective **26.5%**; using the loss in a future year where profits will be under £50,000 saves only 19%. Also consider cash flow: carry back generates a **repayment now** (with repayment interest), while carry forward only reduces a future bill. And watch for wasted QCDs.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Capital losses are different",
      md: `**Capital losses** (losses on disposals of chargeable assets) can only be set against chargeable gains of the same or later periods. They can't be set against trading or other income, and they can't be carried back. Don't mix them up with trading losses.`,
    },
  ],
  scenario: {
    title: "A bad year for Fairbrook Interiors Ltd",
    narrative: `**Fairbrook Interiors Ltd** (Cheltenham), a kitchen fitter, has a 31 March year end and no associated companies. Lost contracts made 2025/26 a loss-making year:

| Year ended | Trading | Property income | Bank interest |
|---|---:|---:|---:|
| 31 March 2025 | £55,000 profit | £5,000 | — |
| 31 March 2026 | **(£90,000) loss** | — | £2,000 |
| 31 March 2027 (forecast) | £40,000 profit | £6,000 | — |

The directors ask: *"Can we get any tax back?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**1. Current year (2026).** The s37 claim must start with total profits of the loss year: **£2,000** of interest. Loss remaining: £88,000.

**2. Carry back (2025).** Total profits for the year to 31 March 2025: £55,000 + £5,000 = **£60,000**, all relieved. Loss remaining: £28,000.

The 2025 CT was 25% × £60,000 − 3/200 × (£250,000 − £60,000) = £15,000 − £2,850 = **£12,150**. It's all repaid (with repayment interest).

**3. Carry forward (2027).** £28,000 against 2027 total profits of £46,000 under s45A, leaving TTP of **£18,000**, taxed at 19%. (Fairbrook could choose to use less, but there's no reason to: the profits beyond £18,000 would otherwise be taxed at 19% too.)`,
      },
      {
        kind: "table",
        caption: "Loss memorandum",
        head: ["", "Loss", "Profits relieved"],
        rows: [
          ["Loss for the year ended 31 March 2026", "£90,000", ""],
          ["s37 current year (2026)", "(£2,000)", "£2,000"],
          ["s37 carry back (2025)", "(£60,000)", "£60,000"],
          ["s45A carried forward to 2027", "(£28,000)", "£28,000"],
          ["Remaining", "£0", ""],
        ],
      },
      {
        kind: "md",
        md: `**Tax effect.** 2025: repayment of £12,150. 2027: saving of £28,000 × 19% = £5,320. Claim the carry back on the 2026 return (or by amending the 2025 return), within 2 years of 31 March 2026.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "carry-back",
      prompt:
        "A company has a trading loss of £150,000 in its year ended 31 December 2026, and property income of £10,000 in that year. In the year ended 31 December 2025 it had trading profits of £85,000 and a chargeable gain of £20,000. If it claims s37 current year and carry back, how much loss is carried forward?",
      answer: 35000,
      unit: "£",
      explain: "Current year first (£10,000), then the previous 12 months' total profits (£105,000), then carry forward the rest.",
      working: "£150,000 − £10,000 − (£85,000 + £20,000) = **£35,000** carried forward",
    },
    {
      kind: "numeric",
      id: "loss-restriction",
      prompt:
        "A large company has carried-forward trading losses of £12m (all arising after April 2017) and total profits of £13m in its year to 31 March 2027. It has the full £5m deductions allowance. What is the maximum carried-forward loss it can use this year?",
      answer: 9000000,
      unit: "£",
      explain: "Carried-forward losses can be used in full against the first £5m, then against 50% of the profits above £5m.",
      working: "£5m + 50% × (£13m − £5m) = £5m + £4m = **£9m**. TTP £4m; £3m of losses carry forward.",
    },
    {
      kind: "numeric",
      id: "terminal-loss",
      prompt:
        "A company ceases trading on 31 March 2027 with a terminal loss of £70,000 for its final 12 months (no other income that year). Total profits were: year to 31 March 2026 £30,000; 2025 £25,000; 2024 £40,000. Under terminal loss relief, how much of the loss is relieved against the year to 31 March **2024**?",
      answer: 15000,
      unit: "£",
      explain: "Terminal losses are carried back 3 years, latest first.",
      working: "2026: £30,000 → £40,000 left. 2025: £25,000 → £15,000 left. 2024: **£15,000** (of £40,000 profits).",
    },
    {
      kind: "mcq",
      id: "partial-claim",
      prompt: "A company wants to carry back only part of its loss to the previous year, to avoid wasting a qualifying charitable donation. Can it?",
      options: [
        "Yes: s37 claims can be for any amount",
        "No: s37 relief is all or nothing against the available total profits",
        "Yes, but only for carry back, not current year",
        "Only with HMRC's agreement",
      ],
      answer: 1,
      explain: "s37 claims can't be restricted to preserve QCDs. Carry-forward claims (s45A), by contrast, can be for a chosen amount.",
    },
    {
      kind: "classify",
      id: "loss-against-what",
      prompt: "Can each loss be set against the company's **property income** of the same year?",
      categories: ["Yes", "No"],
      items: [
        { text: "Trading loss of the same year (s37)", answer: 0 },
        { text: "Capital loss on the sale of shares", answer: 1, why: "Capital losses only reduce chargeable gains." },
        { text: "Trading loss carried forward from 2020 (s45A)", answer: 0 },
        { text: "Trading loss carried forward where the trade has become negligible (s45B)", answer: 1, why: "s45B losses are restricted to profits of the same trade." },
      ],
      explain: "Trading losses under s37 and s45A can be set against total profits. Capital losses and s45B losses can't.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-carry-back-period",
      prompt: "How far back can a company carry a normal (non-terminal) trading loss?",
      options: ["12 months", "2 years", "3 years", "It can't"],
      answer: 0,
      explain: "12 months under s37, after a current year claim.",
    },
    {
      kind: "mcq",
      id: "q-terminal",
      prompt: "A terminal loss can be carried back against total profits of the previous:",
      options: ["12 months", "2 years", "3 years", "6 years"],
      answer: 2,
      explain: "3 years, latest first.",
    },
    {
      kind: "mcq",
      id: "q-deductions-allowance",
      prompt: "What is the deductions allowance for the corporate loss restriction?",
      options: ["£1m", "£2m", "£5m", "£10m"],
      answer: 2,
      explain: "£5m a year per company or group; 50% of profits above that.",
    },
    {
      kind: "mcq",
      id: "q-claim-deadline",
      prompt: "What is the time limit for a s37 claim?",
      options: ["12 months from the end of the loss-making AP", "2 years from the end of the loss-making AP", "4 years", "With the next year's return"],
      answer: 1,
      explain: "2 years from the end of the AP in which the loss arose (HMRC can accept late claims in limited cases).",
    },
    {
      kind: "mcq",
      id: "q-current-first",
      prompt: "Can a company carry back a trading loss without first claiming against the current year's profits?",
      options: ["Yes", "No: the current year claim must be made first", "Only if the current year has no profits", "Only for terminal losses"],
      answer: 1,
      explain: "Carry back under s37 requires the current year claim first.",
    },
    {
      kind: "mcq",
      id: "q-cf-flex",
      prompt: "Which loss claim lets a company choose how much loss to use?",
      options: ["s37 current year", "s37 carry back", "s45A carry forward", "s39 terminal loss"],
      answer: 2,
      explain: "s45A carry-forward claims can be for a specified amount.",
    },
  ],
  sources: [
    { label: "CTA 2010 s37: relief for trade losses against total profits", url: "https://www.legislation.gov.uk/ukpga/2010/4/section/37" },
    { label: "CTA 2010 s39: terminal losses", url: "https://www.legislation.gov.uk/ukpga/2010/4/section/39" },
    { label: "CTA 2010 s45A: carry forward of post-1 April 2017 losses", url: "https://www.legislation.gov.uk/ukpga/2010/4/section/45A" },
    { label: "CTM04100: Trading losses – relief for losses carried forward", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm04100" },
    { label: "CTM05000: Corporate loss restriction", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm05000" },
  ],
};
