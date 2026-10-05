import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "registration-and-deregistration",
  title: "Registration and deregistration",
  level: "foundation",
  minutes: 40,
  taxYear: "2026/27",
  summary:
    "When a client must register for VAT (the historic and future tests), when they can choose to, how group and divisional registrations work, and how and when to cancel a registration — including the VAT due on stock and assets at deregistration.",
  objectives: [
    "Apply the historic (rolling 12-month) and future (next 30 days) registration tests",
    "Work out the deadline to notify HMRC and the effective date of registration",
    "Advise on voluntary registration and the exception for a temporary breach of the threshold",
    "Explain VAT group and divisional registration and when each is available",
    "Handle deregistration, including the deemed supply of stock and assets",
  ],
  body: [
    {
      kind: "callout",
      tone: "rule",
      title: "Current thresholds (from 1 April 2024, unchanged for 2026/27)",
      md: `- **Registration threshold: £90,000** of taxable turnover.
- **Deregistration threshold: £88,000** of taxable turnover.

The deregistration threshold is set lower so that businesses trading around the limit don't keep registering and deregistering.`,
    },
    {
      kind: "md",
      md: `### What counts as taxable turnover

Taxable turnover is the value (excluding VAT) of everything the business supplies that **isn't exempt or outside the scope**. So it includes standard, reduced **and zero-rated** sales. It also includes reverse-charged services received from abroad. It excludes:

- exempt supplies (for example residential rent, insurance commissions);
- outside-the-scope income (grants, dividends, wages recharges that aren't supplies);
- sales of the business's own **capital assets** (for example selling the old van).

Turnover is tested per **person**, not per business. A sole trader with a café and a plumbing business adds the two together. A partnership and a company owned by the same people are different persons.`,
    },
    {
      kind: "table",
      caption: "The two compulsory registration tests",
      head: ["Test", "When it's triggered", "Tell HMRC by", "Registered from"],
      rows: [
        [
          "Historic (backward look)",
          "At the end of **any month**, taxable turnover for the **previous 12 months** is more than £90,000",
          "30 days after the end of that month",
          "The **first day of the second month** after the month the threshold was exceeded",
        ],
        [
          "Future (forward look)",
          "At **any time**, there are reasonable grounds to expect taxable turnover in the **next 30 days alone** to exceed £90,000",
          "The end of that 30-day period",
          "The **start** of the 30-day period (the date the business realised)",
        ],
      ],
    },
    {
      kind: "callout",
      tone: "example",
      title: "Historic test dates",
      md: `A business's rolling 12-month turnover first goes over £90,000 at the end of **June 2026**. It must tell HMRC by **30 July 2026** and is registered from **1 August 2026**. It must charge VAT on sales from 1 August, whether or not the VAT number has arrived (it can raise invoices showing a VAT-inclusive price and issue proper VAT invoices once the number is issued).`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Use a rolling 12 months, not the tax year",
      md: `The historic test looks back over **any** 12 consecutive months ending at a month end, not the accounting year or tax year. Check it every month for clients near the threshold. A seasonal business (a summer ice-cream van, a Christmas-tree seller) can go over in a single strong month.`,
    },
    {
      kind: "md",
      md: `### If the business registers late

If a business should have registered but didn't, HMRC will register it from the date it **should** have been registered. It owes output tax on every taxable sale since then. If it can't go back to customers to collect the VAT, the VAT is treated as **included** in the price it charged (so it's the price × 1/6 at standard rate). A failure-to-notify penalty can also be charged as a percentage of the VAT lost, depending on whether the failure was careless or deliberate and whether it was disclosed.

### Exception from registration

If the business goes over the threshold only temporarily, it can ask HMRC for an **exception** if it can show taxable turnover in the **next 12 months** will not exceed the **deregistration threshold (£88,000)**. A business that makes only or mainly zero-rated supplies can also ask to be exempted from registration (it would usually be in a repayment position, so it's rarely worth asking).

### Voluntary registration

A business below the threshold can register voluntarily if it makes (or intends to make) taxable supplies.

- **Advantages:** it can recover input tax on costs, it looks established to larger customers, and there's no risk of missing the threshold.
- **Disadvantages:** customers who aren't VAT registered (the public, small traders, exempt businesses such as insurers) effectively pay 20% more, and the business takes on quarterly MTD returns and the penalty regime.

Voluntary registration usually makes sense for a business selling to VAT-registered customers or one making zero-rated supplies.`,
    },
    {
      kind: "md",
      md: `### Group registration

Two or more **bodies corporate** (and in some cases individuals or partnerships that control them) can register as a **VAT group** if they are under **common control** and each is **established or has a fixed establishment in the UK**.

- The group has **one VAT number** and files **one return** through the **representative member**.
- **Supplies between group members are disregarded**: no VAT is charged on intra-group management charges or recharges.
- All members are **jointly and severally liable** for the group's VAT debts.
- If any member makes exempt supplies, the whole group's input tax is subject to **partial exemption**.

### Divisional registration

A single company that runs separate divisions can ask to register each division separately. Every division must register (even a small one), each must be an independent self-accounting unit, and the **company as a whole must be fully taxable**. Unlike a group, the divisions remain one legal person.`,
    },
    {
      kind: "md",
      md: `### Deregistration

| Situation | Rule |
|---|---|
| **Compulsory** | The business stops making taxable supplies (it ceases trading, is sold, or becomes wholly exempt), or the legal entity changes (sole trader incorporates). Tell HMRC within **30 days**. |
| **Voluntary** | HMRC is satisfied taxable turnover in the **next 12 months** will be **£88,000 or less** (again excluding capital asset sales). |
| **Transfer of a going concern** | The buyer can sometimes take over the seller's VAT number. Covered in the advanced module. |

On deregistration the business makes a **deemed supply** of the stock and assets it holds on which it claimed input tax (for example stock, plant, commercial vans, computers). It must account for output tax on their **current value** on the final return, **unless the VAT due would be £1,000 or less**. Cars on which input tax was blocked, items bought from unregistered sellers and goods bought under a margin scheme are left out.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Check the deregistration charge before advising",
      md: `When a client asks to deregister voluntarily, estimate the deemed supply first. A business holding £30,000 of stock would have to pay £6,000 on its final return, which may outweigh the benefit of deregistering. At 20%, assets with a VAT-inclusive value up to **£6,000** stay within the £1,000 de minimis.`,
    },
  ],
  scenario: {
    title: "Does Willow Garden Design need to register?",
    narrative: `**Imogen Clarke** trades as **Willow Garden Design**, a sole-trader garden designer and landscaper. She also lets out a flat. Her monthly figures for the last year (all excluding VAT) are:

| Month | Design and landscaping | Flat rent |
|---|---:|---:|
| Oct 2025 – Feb 2026 (5 months) | £5,000 a month | £900 a month |
| Mar 2026 | £6,500 | £900 |
| Apr 2026 | £8,000 | £900 |
| May 2026 | £9,500 | £900 |
| Jun 2026 | £11,000 | £900 |
| Jul 2026 | £12,000 | £900 |
| Aug 2026 | £12,500 | £900 |
| Sep 2026 | £9,000 | £900 |

In August she also sold her old trailer for £1,500. She has just signed a contract for a hotel garden worth **£95,000**, to be invoiced in full on completion, which she expects within the next 3 weeks. She asks: *"Do I need to register, and from when?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: what's in taxable turnover?** Design and landscaping is standard-rated, so it counts. The flat rent is **exempt** residential letting, so it's excluded. The trailer is a **capital asset**, so its sale is excluded.

**Step 2: historic test (rolling 12 months at each month end).**
The 12 months to **31 August 2026** run from Sep 2025 to Aug 2026. She started trading in October 2025, so the period has 11 months of income:
- Oct 2025 – Feb 2026: 5 × £5,000 = £25,000
- Mar – Aug 2026: £6,500 + £8,000 + £9,500 + £11,000 + £12,000 + £12,500 = £59,500
- Total = **£84,500**. Under £90,000.

The 12 months to **30 September 2026** add September's £9,000: **£93,500**. That's over £90,000, so the historic test is triggered at the end of September.
- Tell HMRC by **30 October 2026**.
- Registered from **1 November 2026**.

**Step 3: future test.** The hotel contract will produce £95,000 of taxable turnover in the next 30 days alone. That's over £90,000, so the future test is triggered **today**. She must tell HMRC by the end of the 30-day period and is registered from **today**, the start of that period.

**Step 4: conclusion.** The future test gives the **earlier** registration date, so that's the one that applies. The £95,000 invoice must include VAT of £19,000, so she should agree with the hotel straight away that the contract price is **plus VAT**. Otherwise the VAT will come out of her price.`,
      },
      {
        kind: "callout",
        tone: "warning",
        title: "Price contracts 'plus VAT' near the threshold",
        md: `If a client near the threshold quotes a price without saying "plus VAT", the price is treated as VAT-inclusive once they're registered. Tell clients approaching the threshold to add "plus VAT if applicable" to quotes now.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-turnover",
      prompt: "A sole trader is checking the registration threshold. Which of these count towards taxable turnover?",
      categories: ["Counts towards taxable turnover", "Excluded"],
      items: [
        { text: "Standard-rated plumbing services", answer: 0 },
        { text: "Zero-rated sales of children's clothing", answer: 0, why: "Zero-rated supplies are taxable supplies." },
        { text: "Rent from a residential buy-to-let flat", answer: 1, why: "Exempt." },
        { text: "Proceeds from selling the business's old van", answer: 1, why: "Sales of capital assets are excluded." },
        { text: "Commission from arranging insurance for customers", answer: 1, why: "Insurance intermediary services are exempt." },
        { text: "Services received from a US software firm subject to the reverse charge", answer: 0, why: "Reverse-charged services count." },
        { text: "A grant from the local council with nothing supplied in return", answer: 1, why: "Outside the scope." },
      ],
      explain: "Taxable turnover means standard, reduced and zero-rated supplies (plus reverse-charged services). Exempt and outside-the-scope income and capital asset sales are left out.",
    },
    {
      kind: "mcq",
      id: "effective-date",
      prompt: "A client's rolling 12-month taxable turnover first exceeds £90,000 at the end of **March 2026**. From what date must it be registered?",
      options: ["1 March 2026", "1 April 2026", "30 April 2026", "1 May 2026"],
      answer: 3,
      explain: "Under the historic test, registration takes effect from the first day of the second month after the month in which the threshold was exceeded: March → 1 May. HMRC must be told by 30 April.",
    },
    {
      kind: "numeric",
      id: "deregistration-charge",
      prompt:
        "A retailer deregisters voluntarily. At deregistration it holds stock with a current net value of **£7,200** (input tax was claimed), shop fittings worth **£1,800** net (input tax claimed) and a car worth **£9,000** (input tax was blocked on purchase). How much output tax must it account for on its final return?",
      answer: 1800,
      unit: "£",
      explain: "Include goods on which input tax was claimed: stock and fittings. Exclude the car because input tax was blocked. The VAT due is over £1,000, so the de minimis doesn't apply and it's all payable.",
      working: "(£7,200 + £1,800) × 20% = **£1,800**. The car is excluded.",
    },
    {
      kind: "numeric",
      id: "late-registration",
      prompt:
        "A self-employed decorator should have registered from 1 March but only realised in August. Between 1 March and 31 July he billed private homeowners **£31,200** in total without charging VAT, and he can't recover VAT from them. How much output tax does he owe HMRC for that period?",
      answer: 5200,
      unit: "£",
      explain: "Where VAT can't be collected from customers, the amount charged is treated as VAT-inclusive, so use the VAT fraction.",
      working: "£31,200 × 1/6 = **£5,200**. He can set against this the input tax on his costs since 1 March, with valid invoices.",
    },
    {
      kind: "mcq",
      id: "group-benefit",
      prompt: "A holding company charges its three trading subsidiaries a management charge each month. All are in the same VAT group. What VAT is charged on the management charges?",
      options: ["20% on each charge", "None: supplies between members of a VAT group are disregarded", "5% reduced rate", "VAT only on the charge to any subsidiary making exempt supplies"],
      answer: 1,
      explain: "Intra-group supplies are disregarded for VAT. This is a key benefit of grouping, particularly where a member is partly exempt and would otherwise suffer irrecoverable VAT on the charge.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-threshold",
      prompt: "What is the VAT registration threshold for 2026/27?",
      options: ["£85,000", "£88,000", "£90,000", "£100,000"],
      answer: 2,
      explain: "£90,000 from 1 April 2024. £88,000 is the deregistration threshold.",
    },
    {
      kind: "mcq",
      id: "q-future-test",
      prompt: "The future test asks whether taxable turnover is expected to exceed £90,000 in which period?",
      options: ["The next 12 months", "The next 30 days alone", "The current tax year", "The next VAT quarter"],
      answer: 1,
      explain: "The future test looks at the next 30 days on their own, for example a single large contract.",
    },
    {
      kind: "mcq",
      id: "q-exception",
      prompt: "A business exceeds the threshold because of a one-off order. When can it ask HMRC for an exception from registration?",
      options: [
        "If turnover in the next 12 months will not exceed £88,000",
        "If turnover in the next 12 months will not exceed £90,000",
        "If the order was zero-rated",
        "Never: registration is always compulsory",
      ],
      answer: 0,
      explain: "An exception may be granted if taxable turnover in the next 12 months will not exceed the deregistration threshold.",
    },
    {
      kind: "mcq",
      id: "q-divisional",
      prompt: "Which condition must be met for divisional registration?",
      options: ["The company must be partly exempt", "Only divisions above the threshold need register", "The company as a whole must be fully taxable", "The divisions must be separate companies"],
      answer: 2,
      explain: "Divisional registration requires the whole corporate body to be fully taxable and every division to register.",
    },
    {
      kind: "mcq",
      id: "q-dereg-de-minimis",
      prompt: "On deregistration, when is no VAT due on the deemed supply of stock and assets?",
      options: ["When the VAT due is £1,000 or less", "When the stock is worth less than £5,000 net", "When the business is under the deregistration threshold", "Never"],
      answer: 0,
      explain: "If the total VAT on the deemed supply is £1,000 or less, it doesn't have to be accounted for.",
    },
    {
      kind: "mcq",
      id: "q-voluntary-downside",
      prompt: "For which client is voluntary registration most likely to be a bad idea?",
      options: [
        "A web developer whose customers are all VAT-registered companies",
        "A greengrocer selling mainly zero-rated fresh produce",
        "A hairdresser whose customers are all members of the public",
        "A start-up buying £40,000 of equipment before trading",
      ],
      answer: 2,
      explain: "The hairdresser's customers can't recover VAT, so registering would either raise prices by 20% or cut margins. The others either sell to VAT-registered customers or would be in a repayment position.",
    },
  ],
  sources: [
    { label: "Register for VAT (GOV.UK)", url: "https://www.gov.uk/register-for-vat" },
    { label: "VAT Notice 700/1: should I be registered for VAT?", url: "https://www.gov.uk/government/publications/vat-notice-7001-should-i-be-registered-for-vat" },
    { label: "Increasing the VAT registration and deregistration thresholds", url: "https://www.gov.uk/government/publications/vat-increasing-the-registration-and-deregistration-thresholds" },
    { label: "Group and divisional registration (VAT Notice 700/2)", url: "https://www.gov.uk/guidance/group-and-divisional-registration-vat-notice-7002" },
    { label: "VAT Notice 700/11: cancelling your registration", url: "https://www.gov.uk/government/publications/vat-notice-70011-cancelling-your-registration/vat-notice-70011-cancelling-your-registration" },
    { label: "VAT Act 1994 Schedule 1 – registration", url: "https://www.legislation.gov.uk/ukpga/1994/23/schedule/1" },
  ],
};
