import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "computing-the-merged-rdec",
  title: "Computing the merged RDEC: the credit, the payment steps and the accounts",
  level: "practitioner",
  minutes: 45,
  summary:
    "Worked computations for the merged R&D expenditure credit: the 20% taxable credit, how it discharges the CT liability, the notional tax deduction at 19% or 25%, the PAYE/NIC cap of £20,000 plus 300%, the remaining payment steps, and how the credit is accounted for above the line.",
  objectives: [
    "Calculate the gross merged RDEC and its effect on taxable profits",
    "Apply the payment steps, including the notional tax deduction at the correct rate",
    "Calculate the PAYE/NIC cap and the amount carried forward when it bites",
    "Post the credit in the accounts and explain the net benefit to the client",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `The merged RDEC applies to accounting periods beginning on or after 1 April 2024. The credit is **20% of qualifying expenditure** (ring-fence trades have different rates). It's **taxable trading income**, so it's included in profits, and then it's applied through a series of statutory **steps** that decide how much discharges tax and how much is paid in cash.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The payment steps (CIRD112100)",
      md: `**Step 1** – the credit (plus any credit carried forward) discharges the company's **CT liability for the period**.
**Step 2** – a **notional tax deduction**: if what's left exceeds the credit claimed net of notional tax, the excess is withheld. The rate is the **main rate (25%)** if the company's profits are chargeable at the main rate (including where marginal relief applies), otherwise the **small profits rate (19%)**, which includes **loss-makers**. The withheld amount can be surrendered to a group company or **carried forward** to discharge CT of later periods. It isn't lost.
**Step 3** – the **PAYE cap**: £20,000 + 300% of the company's relevant PAYE and NIC liabilities for the period (unless exempt). Any excess is **carried forward** as credit for the next period.
**Step 4** – discharge CT of **other periods**.
**Step 5** – optional **surrender to group** members.
**Step 6** – discharge **other HMRC liabilities** (e.g. VAT, PAYE).
**Step 7** – **pay** the balance to the company, if it's a going concern and there's no open enquiry and its PAYE and VAT are up to date.`,
    },
    {
      kind: "table",
      caption: "Rates in the computation (financial year 2026)",
      head: ["Item", "Rate / amount"],
      rows: [
        ["Merged RDEC", "20% of qualifying expenditure"],
        ["CT main rate (profits over £250,000)", "25%"],
        ["CT small profits rate (profits up to £50,000)", "19%"],
        ["Notional tax at step 2", "25% if profits chargeable at main rate (incl. marginal relief); otherwise 19% (incl. loss-makers)"],
        ["PAYE cap", "£20,000 + 300% of relevant PAYE and NIC (pro rata for short periods)"],
      ],
    },
    {
      kind: "md",
      md: `### Worked example 1: a profitable company

Avonmore Systems Ltd (year ended 31 March 2026) has profits of **£400,000** after charging all its costs, and qualifying expenditure of **£250,000**.

| | £ |
|---|---:|
| Credit: £250,000 × 20% | 50,000 |
| Taxable profit: £400,000 + £50,000 | 450,000 |
| CT at 25% | 112,500 |
| Step 1: credit discharges CT | (50,000) |
| **CT still to pay** | **62,500** |

Nothing is left after step 1, so steps 2–7 don't apply. Net benefit: £50,000 credit less £12,500 tax on it = **£37,500** (15% of qualifying spend).`,
    },
    {
      kind: "md",
      md: `### Worked example 2: a loss-making company

Brightwater Bio Ltd (year ended 31 December 2025) has a trading loss of **£300,000** before the credit, qualifying expenditure of **£200,000** and PAYE/NIC liabilities of £50,000 for the year. No other HMRC debts.

| Step | | £ |
|---|---|---:|
| | Credit: £200,000 × 20% | 40,000 |
| | Revised trading loss: £300,000 − £40,000 | (260,000) |
| 1 | CT liability for the period | nil |
| 2 | Credit net of notional tax at 19%: £40,000 × 81% = £32,400. Notional tax deduction £40,000 − £32,400 | (7,600) carried forward |
| 3 | PAYE cap: £20,000 + 300% × £50,000 = £170,000; £32,400 is below the cap | – |
| 7 | **Paid to the company** | **32,400** |

The £7,600 withheld at step 2 is carried forward to discharge future CT. The loss carried forward is £260,000, because the credit is taxable income.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "When the PAYE cap bites",
      md: `Companies with few employees and big subcontractor or EPW costs hit the cap. Example: a loss-maker with a £100,000 credit and only £15,000 of PAYE/NIC. After step 2 (19% notional tax, £19,000 withheld) there's £81,000 left. The cap is £20,000 + £45,000 = **£65,000**, so £16,000 is carried forward as credit to next period and £65,000 continues to steps 4–7.

A company is **exempt** from the cap if its employees create or manage the IP from the R&D (Condition A) and its spend on connected subcontractors and connected EPWs is no more than **15%** of its qualifying expenditure (Condition B).`,
    },
    {
      kind: "md",
      md: `### In the accounts

The merged RDEC is recognised **above the line**, normally as **other operating income** (or as a reduction in R&D costs), in the period the qualifying expenditure is incurred, once there is reasonable assurance the claim will be made and received. The receivable sits in debtors until HMRC pays or the credit is used against CT.

Because the credit is taxable, the company's tax charge also includes tax on the credit. For a loss-maker, the step 2 amount carried forward is effectively a future CT asset.`,
    },
    {
      kind: "journal",
      title: "Recognising Brightwater Bio's credit at the year end",
      narrative: "The gross credit is recognised as income. When HMRC pays £32,400, the remaining £7,600 is reclassified as an amount recoverable against future CT.",
      lines: [
        { account: "R&D expenditure credit receivable", dr: 40000 },
        { account: "Other operating income – R&D expenditure credit", cr: 40000 },
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Explain the net benefit honestly",
      md: `Clients hear "20%" and expect 20% in cash. Show them the net: about **15%** for a main-rate taxpayer, about **16.2%** for a loss-maker or small-profits company (with part of it deferred), and possibly less if the PAYE cap bites. Set expectations before the claim, not after.`,
    },
  ],
  scenario: {
    title: "Year-end computation for Kingfisher Drones Ltd",
    narrative: `Kingfisher Drones Ltd (year ended 30 June 2026, not part of a group) has:
- a tax-adjusted trading loss of **£180,000** before any R&D relief;
- qualifying R&D expenditure of **£350,000** (staff £140,000, unconnected UK subcontractors £210,000 after the 65% restriction);
- PAYE and Class 1 NIC liabilities for the year of **£12,000** (most work is subcontracted, so it doesn't meet the PAYE cap exemption);
- no CT liabilities for other periods; it owes HMRC **£5,000** of VAT for its latest quarter.

The directors expect "£70,000 back from HMRC".`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Credit**: £350,000 × 20% = **£70,000**. Revised trading loss: £180,000 − £70,000 = **£110,000** carried forward.
2. **Step 1**: no CT liability, so the full £70,000 goes to step 2.
3. **Step 2**: loss-maker, so 19%. Net of notional tax: £70,000 × 81% = £56,700. Notional tax deduction: **£13,300**, carried forward against future CT.
4. **Step 3**: PAYE cap = £20,000 + 300% × £12,000 = **£56,000**. £56,700 exceeds the cap by **£700**, which is carried forward as credit for the next period.
5. **Step 4**: no other CT periods.
6. **Step 6**: £5,000 used to settle the VAT debt.
7. **Step 7**: £56,000 − £5,000 = **£51,000** paid in cash.`,
      },
      {
        kind: "table",
        caption: "Where Kingfisher's £70,000 goes",
        head: ["Destination", "£"],
        rows: [
          ["Notional tax carried forward (step 2)", "13,300"],
          ["Credit carried forward over PAYE cap (step 3)", "700"],
          ["VAT debt settled (step 6)", "5,000"],
          ["Cash paid to company (step 7)", "51,000"],
          ["**Total**", "**70,000**"],
        ],
      },
      {
        kind: "callout",
        tone: "warning",
        title: "Tell the directors now",
        md: `The directors expected £70,000. They'll get £51,000 in cash, with £5,000 having cleared VAT and £14,000 carried forward. Put this in writing before the claim is filed, with the loss carried forward reduced to £110,000.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "notional-tax-lossmaker",
      prompt:
        "A loss-making company with no CT liability claims a merged RDEC of £60,000. Its PAYE cap is well above the credit and it has no other HMRC debts. How much cash will HMRC pay at step 7?",
      answer: 48600,
      unit: "£",
      explain: "Loss-makers suffer the notional tax deduction at the small profits rate of 19%; the withheld amount is carried forward.",
      working: "£60,000 × (1 − 19%) = **£48,600**. Notional tax of £11,400 is carried forward.",
    },
    {
      kind: "numeric",
      id: "paye-cap",
      prompt:
        "A loss-making company not exempt from the PAYE cap has a merged RDEC of £150,000. Its relevant PAYE and NIC liabilities for the 12-month period are £20,000. After the step 2 notional tax deduction at 19%, how much credit is carried forward to the next period under step 3?",
      answer: 41500,
      unit: "£",
      explain: "After step 2 the amount is £150,000 × 81% = £121,500. The cap is £20,000 + 300% × £20,000 = £80,000. The excess over the cap is carried forward.",
      working: "£121,500 − £80,000 = **£41,500** carried forward as credit.",
    },
    {
      kind: "numeric",
      id: "profitable-net",
      prompt:
        "A company with profits of £900,000 before the credit (main rate taxpayer) has £400,000 of qualifying expenditure. What is its total CT payable for the period after the credit has discharged part of the liability?",
      answer: 165000,
      unit: "£",
      explain: "The credit is added to taxable profits, CT is computed at 25%, then the credit discharges the liability at step 1.",
      working: "Credit £80,000. Taxable profit £980,000. CT 25% = £245,000. Less credit £80,000 = **£165,000** payable.",
    },
    {
      kind: "journal",
      id: "rdec-journal",
      prompt:
        "A company recognises a merged RDEC of £28,000 for the year, presented as other operating income. Post the year-end entry.",
      accounts: [
        "R&D expenditure credit receivable",
        "Other operating income – R&D expenditure credit",
        "Corporation tax payable",
        "Research and development costs",
        "Deferred income",
        "Bank",
      ],
      answer: [
        { account: "R&D expenditure credit receivable", dr: 28000 },
        { account: "Other operating income – R&D expenditure credit", cr: 28000 },
      ],
      explain:
        "The merged RDEC is recognised above the line as income, with a receivable until it's paid or used against CT. It's not a reduction in the tax charge, and it isn't deferred income where the related costs have been expensed.",
    },
    {
      kind: "mcq",
      id: "step2-rate",
      prompt:
        "A company has profits of £120,000 before the credit and pays CT at the main rate with marginal relief. Its credit isn't fully used at step 1. What notional tax rate applies at step 2?",
      options: ["19%", "25%", "26.5%", "Nil"],
      answer: 1,
      explain: "The main rate applies where the company's profits are chargeable at the main rate, even if marginal relief is available. 19% applies to small-profits companies and loss-makers.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-rate",
      prompt: "What is the rate of the merged R&D expenditure credit (non-ring-fence trades)?",
      options: ["13%", "14.5%", "20%", "86%"],
      answer: 2,
      explain: "20% of qualifying expenditure.",
    },
    {
      kind: "mcq",
      id: "q-taxable",
      prompt: "How is the merged RDEC treated for corporation tax?",
      options: ["It's exempt", "It's taxable trading income", "It reduces the tax charge only", "It's a capital receipt"],
      answer: 1,
      explain: "The credit is taxable as trading income.",
    },
    {
      kind: "mcq",
      id: "q-paye-cap",
      prompt: "What is the PAYE cap for the merged RDEC?",
      options: ["£20,000 + 300% of relevant PAYE and NIC", "£20,000 + 100% of PAYE", "300% of PAYE only", "There is no cap"],
      answer: 0,
      explain: "£20,000 plus 300% of the company's relevant PAYE and NIC liabilities for the period.",
    },
    {
      kind: "mcq",
      id: "q-step2-fate",
      prompt: "What happens to the amount withheld as notional tax at step 2?",
      options: ["It's lost", "It can be surrendered to a group company or carried forward to discharge future CT", "It's paid after 12 months", "It's added to trading losses"],
      answer: 1,
      explain: "The step 2 amount can be surrendered within the group or carried forward against later CT liabilities.",
    },
    {
      kind: "mcq",
      id: "q-step7",
      prompt: "Which is a condition for HMRC to pay the credit in cash at step 7?",
      options: ["The company is profitable", "The company is a going concern", "The company has more than 10 employees", "The company has claimed ERIS before"],
      answer: 1,
      explain: "Payment requires the going concern condition, no open enquiry, and PAYE and VAT liabilities up to date.",
    },
    {
      kind: "mcq",
      id: "q-accounts",
      prompt: "Where is the merged RDEC usually presented in the accounts?",
      options: ["In the tax charge", "Above the line, as other operating income or a reduction in R&D costs", "Directly in reserves", "As deferred income only"],
      answer: 1,
      explain: "As an expenditure credit it's recognised above the line.",
    },
  ],
  sources: [
    { label: "HMRC CIRD manual: new RDEC payment steps (CIRD112100)", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird112100" },
    { label: "HMRC CIRD manual: PAYE cap (CIRD140000)", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird140000" },
    { label: "HMRC CIRD manual: new RDEC overview (CIRD111000)", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird111000" },
    { label: "HMRC: merged R&D expenditure credit scheme and ERIS", url: "https://www.gov.uk/guidance/research-and-development-rd-tax-relief-the-merged-scheme-and-enhanced-rd-intensive-support" },
    { label: "Make a claim for R&D tax relief on your Company Tax Return", url: "https://www.gov.uk/guidance/make-a-claim-for-rd-tax-relief-on-your-company-tax-return" },
  ],
};
