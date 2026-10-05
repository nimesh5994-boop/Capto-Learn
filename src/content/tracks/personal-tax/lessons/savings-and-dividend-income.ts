import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "savings-and-dividend-income",
  title: "Savings and dividend income: the starting rate, PSA and dividend allowance",
  level: "foundation",
  minutes: 40,
  summary:
    "How savings and dividend income stack on top of non-savings income, the starting rate for savings, the personal savings allowance, the £500 dividend allowance, and the higher dividend rates that apply from 6 April 2026.",
  objectives: [
    "Stack non-savings, savings and dividend income in the right order through the bands",
    "Work out the starting rate for savings and the personal savings allowance a client is entitled to",
    "Apply the £500 dividend allowance and the 2026/27 dividend rates (10.75%, 35.75%, 39.35%)",
    "Explain that the nil-rate allowances still use up the basic rate band",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "table",
      caption: "2026/27 rates on savings and dividends (UK-wide — Scottish taxpayers use these too)",
      head: ["Band", "Savings rate", "Dividend rate"],
      rows: [
        ["Basic rate band (first £37,700 of taxable income)", "20%", "10.75% (ordinary rate)"],
        ["Higher rate (£37,701 – £125,140)", "40%", "35.75% (upper rate)"],
        ["Additional rate (over £125,140)", "45%", "39.35% (additional rate)"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Dividend rates from 6 April 2026",
      md: `Budget 2025 increased the **dividend ordinary rate from 8.75% to 10.75%** and the **upper rate from 33.75% to 35.75%** from 6 April 2026. The additional rate stays at **39.35%**. The dividend allowance remains **£500**.

Budget 2025 also announced that **savings** (and property) income rates will rise by 2 percentage points to 22% / 42% / 47% from **6 April 2027**. For 2026/27 savings are still taxed at 20% / 40% / 45%.`,
    },
    {
      kind: "md",
      md: `### The three nil-rate allowances

1. **Starting rate for savings (SRS): up to £5,000 at 0%.** Available only to the extent that **taxable non-savings income** is below £5,000. Each £1 of taxable non-savings income reduces the £5,000 by £1. Put another way: if non-savings income is under £17,570 (£12,570 + £5,000), some SRS is available.
2. **Personal savings allowance (PSA):** **£1,000** for a basic rate taxpayer, **£500** for a higher rate taxpayer, **nil** for an additional rate taxpayer. Which applies depends on the client's total taxable income (including the savings and dividends).
3. **Dividend allowance:** the first **£500** of dividends is taxed at 0% for everyone.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Allowances are not exemptions",
      md: `Income covered by the SRS, PSA or dividend allowance is still **taxable income taxed at 0%**. It still uses up the basic rate band. So £500 of dividends inside the allowance pushes later dividends into the higher rate sooner. Don't deduct these allowances like the personal allowance.`,
    },
    {
      kind: "md",
      md: `### Order of working

1. Deduct the personal allowance from non-savings income first.
2. Tax **non-savings** income at the bottom of the bands.
3. Then **savings**: SRS (if available), PSA, then the normal savings rate for the band it falls in.
4. Then **dividends** on top: £500 at 0%, then 10.75% / 35.75% / 39.35% depending on the band.

Keep a running total of how much of the £37,700 basic rate band has been used as you go.`,
    },
    {
      kind: "callout",
      tone: "example",
      title: "Starting rate in action",
      md: `Salary £14,000, bank interest £4,500. Taxable non-savings = £14,000 − £12,570 = £1,430 (taxed at 20% = £286). SRS available = £5,000 − £1,430 = £3,570 at 0%. The remaining £930 of interest falls inside the £1,000 PSA at 0%. **Total tax £286.**`,
    },
    {
      kind: "md",
      md: `### ISAs and other exempt income

Interest and dividends inside an **ISA** are exempt and never enter the computation at all. Same for Premium Bond prizes and NS&I Savings Certificates. Always ask whether a client's "savings" are in an ISA before including them.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Owner-managers",
      md: `The classic owner-manager pattern — salary at the personal allowance and the rest as dividends — means the client usually has the full £5,000 SRS available for any interest, because taxable non-savings income is nil. And the 2 percentage point dividend increase from April 2026 changes the salary/dividend comparison; re-run it for every owner-manager client.`,
    },
  ],
  scenario: {
    title: "Ravi Shah, director of Shah Joinery Ltd",
    narrative: `Ravi is the sole director-shareholder of Shah Joinery Ltd (a trading company in Bristol). For 2026/27 he takes:

- Salary: £12,570
- Dividends: £45,000
- Bank interest (not in an ISA): £1,800

He asks how much tax he'll pay on the dividends and how that compares with last year's rates.`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Non-savings:** salary £12,570 − PA £12,570 = **£0 taxable**. Basic rate band used: £0.
2. **Savings £1,800:** taxable non-savings is nil, so the full **£5,000 SRS** is available, covering all £1,800 at 0%. Band used: £1,800.
3. **Dividends £45,000:** first £500 at 0%. Band used: £1,800 + £500 = £2,300.
4. Remaining basic rate band: £37,700 − £2,300 = **£35,400** at 10.75% = **£3,805.50**.
5. Rest of the dividends: £45,000 − £500 − £35,400 = **£9,100** at 35.75% = **£3,253.25**.
6. **Total tax: £7,058.75**, payable through Self Assessment.`,
      },
      {
        kind: "table",
        caption: "Same income, before and after the April 2026 dividend rate rise",
        head: ["Slice", "2025/26 rates", "2026/27 rates"],
        rows: [
          ["£35,400 basic rate dividends", "8.75% = £3,097.50", "10.75% = £3,805.50"],
          ["£9,100 higher rate dividends", "33.75% = £3,071.25", "35.75% = £3,253.25"],
          ["**Total**", "**£6,168.75**", "**£7,058.75**"],
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Explain it in the client's terms",
        md: `"Same dividends, about £890 more tax this year because the rates went up." Also flag that he's a higher rate taxpayer overall (taxable income £46,800 is over £37,700), so his PSA would only be £500 — but the SRS already covers his interest.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "dividend-tax-basic",
      prompt: "Chloe has a salary of £30,000 and dividends of £6,000 in 2026/27. How much tax is due on the **dividends**?",
      answer: 591.25,
      tolerance: 0.5,
      unit: "£",
      explain: "Her taxable income is well inside the basic rate band, so after the £500 allowance the dividends are taxed at the 10.75% ordinary rate.",
      working: "Taxable non-savings £30,000 − £12,570 = £17,430. Dividends £6,000 sit on top: £17,430 + £6,000 = £23,430 < £37,700.\n£500 at 0%; £5,500 × 10.75% = **£591.25**.",
    },
    {
      kind: "numeric",
      id: "psa-higher",
      prompt: "Tom earns a salary of £60,000 and receives £2,000 of bank interest (not in an ISA) in 2026/27. How much tax is due on the **interest**?",
      answer: 600,
      unit: "£",
      explain: "He's a higher rate taxpayer, so his PSA is £500. No starting rate for savings because non-savings income is well over £17,570.",
      working: "PSA £500 at 0%. Remaining £1,500 × 40% = **£600**.",
    },
    {
      kind: "numeric",
      id: "srs-available",
      prompt: "Gwen has pension income of £15,200 and bank interest of £6,000. How much of her interest is taxed at the **starting rate for savings** (0%)?",
      answer: 2370,
      unit: "£",
      explain: "The £5,000 starting rate band is reduced by taxable non-savings income.",
      working: "Taxable non-savings £15,200 − £12,570 = £2,630.\nSRS available £5,000 − £2,630 = **£2,370**. (The next £1,000 is covered by the PSA, and the remaining £2,630 is taxed at 20%.)",
    },
    {
      kind: "mcq",
      id: "dividend-band-use",
      prompt: "Does the £500 of dividends covered by the dividend allowance use up part of the basic rate band?",
      options: ["No — it's exempt income", "Yes — it's taxable at 0% and uses the band", "Only for higher rate taxpayers", "Only if the client has savings income too"],
      answer: 1,
      explain: "The dividend allowance is a 0% rate band, not an exemption, so it counts towards the £37,700.",
    },
    {
      kind: "multi",
      id: "isa-exempt",
      prompt: "Which of these should be left out of the income tax computation entirely? Select all that apply.",
      options: ["Interest on a cash ISA", "Dividends from shares held in a stocks and shares ISA", "Premium Bond prizes", "Interest on a high street savings account", "Dividends from the client's own company"],
      answers: [0, 1, 2],
      explain: "ISA income and Premium Bond prizes are exempt. Ordinary bank interest and dividends from a company are taxable (even if covered by an allowance).",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-div-ordinary",
      prompt: "What is the dividend ordinary rate for 2026/27?",
      options: ["7.5%", "8.75%", "10.75%", "20%"],
      answer: 2,
      explain: "It rose from 8.75% to 10.75% from 6 April 2026.",
    },
    {
      kind: "mcq",
      id: "q-div-upper",
      prompt: "What is the dividend upper rate for 2026/27?",
      options: ["32.5%", "33.75%", "35.75%", "39.35%"],
      answer: 2,
      explain: "35.75% from 6 April 2026. The additional rate stays at 39.35%.",
    },
    {
      kind: "mcq",
      id: "q-psa-additional",
      prompt: "What personal savings allowance does an additional rate taxpayer get?",
      options: ["£1,000", "£500", "£250", "Nil"],
      answer: 3,
      explain: "Additional rate taxpayers get no PSA.",
    },
    {
      kind: "mcq",
      id: "q-div-allowance",
      prompt: "What is the dividend allowance for 2026/27?",
      options: ["£2,000", "£1,000", "£500", "Nil"],
      answer: 2,
      explain: "£500, unchanged since 2024/25.",
    },
    {
      kind: "mcq",
      id: "q-srs-limit",
      prompt: "Above what level of non-savings income is no starting rate for savings available (with a full personal allowance)?",
      options: ["£5,000", "£12,570", "£17,570", "£50,270"],
      answer: 2,
      explain: "£12,570 + £5,000 = £17,570. Taxable non-savings income of £5,000 or more wipes out the starting rate band.",
    },
    {
      kind: "mcq",
      id: "q-savings-2027",
      prompt: "What savings rates apply for 2026/27?",
      options: ["20% / 40% / 45%", "22% / 42% / 47%", "10.75% / 35.75% / 39.35%", "19% / 21% / 42%"],
      answer: 0,
      explain: "The 2 percentage point increase in savings rates takes effect from 6 April 2027, not 2026.",
    },
  ],
  sources: [
    { label: "Income Tax rates and allowances: current and past", url: "https://www.gov.uk/government/publications/rates-and-allowances-income-tax/income-tax-rates-and-allowances-current-and-past" },
    { label: "Tax on savings interest: how much is tax free (GOV.UK)", url: "https://www.gov.uk/apply-tax-free-interest-on-savings/how-much-is-tax-free" },
    { label: "Tax on dividends (GOV.UK)", url: "https://www.gov.uk/tax-on-dividends" },
    { label: "Changes to tax rates for property, savings and dividend income", url: "https://www.gov.uk/government/publications/changes-to-tax-rates-for-property-savings-and-dividend-income/change-to-tax-rates-for-property-savings-and-dividend-income-technical-note" },
    { label: "ITA 2007 s16 – savings income charged at the higher rates", url: "https://www.legislation.gov.uk/ukpga/2007/3/section/16" },
  ],
};
