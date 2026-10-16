import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "pensions-and-inheritance-tax-from-2027",
  title: "Pensions and inheritance tax: the change from 6 April 2027",
  level: "advanced",
  minutes: 35,
  summary:
    "From deaths on or after 6 April 2027 most unused pension funds and death benefits fall into the estate for inheritance tax. What is in and out of scope, who reports and pays, how it interacts with income tax on beneficiaries, and the planning conversations clients now need.",
  objectives: [
    "State the scope of the 2027 change, including the exclusions and the reliefs that stay",
    "Explain who is responsible for reporting and paying the IHT",
    "Compute the IHT effect of including a pension fund in an estate",
    "Explain how this interacts with income tax on beneficiaries and with the lump sum allowances",
    "Identify the planning points to raise with clients now",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `For many years the advice for the well-off was to spend other assets first and leave pensions to pass **outside the estate**, because most pension death benefits (paid at the trustees' discretion) were outside inheritance tax. The Autumn Budget 2024 announced the end of that, and the change is now legislated in **Finance Act 2026**: for deaths on or after **6 April 2027** most **unused pension funds and death benefits** are brought **within the member's estate** for IHT. It is a major change, so every estate-planning conversation with a client who has a significant pension needs revisiting. HMRC's technical note sets out the detail, and some guidance (for example for beneficiaries) is still to be published, so check for updates before advising.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The rules (Finance Act 2026 and HMRC's technical note)",
      md: `- **In scope:** most unused pension funds and death benefits will be treated as part of the estate on **deaths on or after 6 April 2027**, even where the scheme administrator or trustees have discretion over who gets them.
- **Out of scope:** **death-in-service benefits** from registered pension schemes (only benefits from the member's current employment immediately before death; refunds and benefits from deferred membership don't qualify), and **dependants' scheme pensions**.
- **Exemptions continue:** the usual IHT exemptions for benefits passing to a **surviving spouse or civil partner** and to **registered charities** will apply.
- **Who pays:** the **personal representatives (PRs)**, not the pension scheme administrators, are responsible for **reporting and paying** IHT on unused pension funds and death benefits. Once benefits vest in a beneficiary, the beneficiary becomes **jointly and severally liable** with the PRs. PRs can issue a **withholding notice** (the scheme holds back up to 50% of a beneficiary's entitlement) and a PR or beneficiary can issue a **payment notice** (minimum £1,000) requiring the scheme to pay the IHT direct to HMRC. Scheme administrators must provide the information the PRs need.
- **Income tax:** income tax on beneficiaries is not removed. For deaths **at 75 or over**, beneficiaries still pay income tax at their marginal rate on what they receive, so **both** taxes can apply. However, IHT paid on the death benefit **does not count towards the beneficiary's taxable income**, so income tax falls only on the amount left after IHT. HMRC has said further guidance for beneficiaries will follow, so check it before advising on the combined rate.`,
    },
    {
      kind: "md",
      md: `### Estate computation

- Add the **value of the unused fund** to the estate (the same as other assets, at the date of death).
- IHT is charged at **40%** on the part of the taxable estate above the available **nil-rate band** and **residence nil-rate band** (and the **RNRB taper** for estates over £2 million, which now catches pension funds too).
- Reliefs that apply as for other assets: **spouse/civil partner exemption**, **charity exemption**.
- Business Property Relief and Agricultural Property Relief do not apply to pension funds.

### Deaths before and after 75

| | Death before 75 | Death after 75 |
|---|---|---|
| Income tax on beneficiary withdrawals | Normally **nil** | **Marginal rate** |
| IHT (from 2027) | **Yes**, on the fund in the estate | **Yes**, on the fund in the estate |
| Combined effect | IHT only | IHT, then income tax on the amount left after IHT |

### Why the lump sum allowances still matter

The **LSDBA** (£1,073,100) governs the **income tax** treatment of lump sum death benefits (tax-free to a point for deaths before 75). It doesn't stop **IHT**. A pension that is income-tax free to the beneficiary can still be liable to IHT in the estate.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Planning points for clients with significant pensions",
      md: `Raise these as **questions for advice**, not recommendations from a practice without regulated advisers:

1. **Spend the pension earlier?** The relative merit of drawing pension income before ISAs, investments or property needs reviewing, including the income tax cost of drawdown.
2. **Gifts out of surplus income.** Regular gifts from drawdown income may qualify as normal expenditure out of income (immediately exempt) if the conditions are met and records are kept.
3. **Spouse or civil partner:** leaving the fund to a spouse keeps the exemption for the first death but defers the problem.
4. **Life insurance written in trust** to fund the IHT bill.
5. **Nominations and expression of wishes:** keep them up to date, and consider how PRs and the scheme will communicate so the IHT is paid and reported on time.
6. **Records.** Ask clients to list all pension schemes and nominated beneficiaries so the PRs can find them.

Refer to a **regulated financial adviser** for product and investment decisions, and make sure your engagement letter is clear about where your tax advice ends.`,
    },
  ],
  scenario: {
    title: "Estate planning for Pauline Hartwell",
    narrative: `Pauline Hartwell, aged 72, widowed, has a house worth £450,000 she will leave to her two children, investments of £150,000 and a SIPP of £600,000 with nominated beneficiaries (the children). She asks what would change if she died after 6 April 2027. Assume her nil-rate band of £325,000 is fully available and the residence nil-rate band of £175,000 applies (her estate is under £2 million), and no other reliefs.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: IHT before the change** (pension excluded). Estate = £450,000 + £150,000 = £600,000. Less NRB £325,000 and RNRB £175,000 = £500,000 → taxable **£100,000** × 40% = **£40,000**.

**Step 2: IHT after the change** (pension included). Estate = £600,000 + £600,000 = £1,200,000. Less £500,000 → taxable **£700,000** × 40% = **£280,000**.

**Step 3: the extra IHT.** £280,000 − £40,000 = **£240,000**, which is 40% of the £600,000 pension.

**Step 4: income tax.** Pauline is 72, so if she died **before 75** the children would pay no income tax on pension withdrawals (subject to the LSDBA). If she lived beyond 75, withdrawals would be taxed at their marginal rates **in addition** to the IHT, though only on the amount left after IHT.

**Step 5: what to say.** Explain the potential cost, recommend she takes regulated financial advice, and set out the tax-planning options above. Record in the file that figures are illustrative and based on Finance Act 2026 and HMRC guidance at the date of advice.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "iht-pension",
      prompt: "An estate otherwise exceeds the available nil-rate bands by £50,000. A £400,000 pension fund is added to the estate. Assuming no further reliefs, how much extra IHT arises at 40% (£)?",
      answer: 160000,
      unit: "£",
      explain: "The fund is taxed in full at 40% because the bands are already exceeded.",
      working: "£400,000 × 40% = **£160,000**.",
    },
    {
      kind: "numeric",
      id: "iht-total",
      prompt: "An estate of £900,000 (including a £300,000 pension) is taxed after combined nil-rate bands of £500,000. What is the IHT at 40% (£)?",
      answer: 160000,
      unit: "£",
      explain: "Taxable estate £400,000 at 40%.",
      working: "(£900,000 − £500,000) × 40% = **£160,000**.",
    },
    {
      kind: "classify",
      id: "classify-pension-iht",
      prompt: "Is the benefit within the IHT estate for a death on or after 6 April 2027?",
      categories: ["In the estate", "Not in the estate"],
      items: [
        { text: "An unused SIPP fund passing to the member's adult children", answer: 0 },
        { text: "A death-in-service lump sum from a registered scheme", answer: 1 },
        { text: "A dependant's scheme pension from a defined benefit scheme", answer: 1 },
        { text: "Unused drawdown fund held in a personal pension", answer: 0 },
      ],
      explain: "Most unused funds are in scope; death in service and DB dependants' pensions are excluded.",
    },
    {
      kind: "mcq",
      id: "mcq-who-pays",
      prompt: "Who is responsible for reporting and paying IHT on unused pension funds from 2027?",
      options: ["The pension scheme administrator", "The personal representatives", "The beneficiary", "HMRC"],
      answer: 1,
      explain: "The PRs, who already administer the estate.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-date",
      prompt: "From what date are most unused pension funds brought into the estate for IHT?",
      options: ["6 April 2025", "6 April 2026", "6 April 2027", "6 April 2028"],
      answer: 2,
      explain: "Deaths on or after 6 April 2027.",
    },
    {
      kind: "mcq",
      id: "q-exempt",
      prompt: "Does the spouse exemption still apply to pension death benefits?",
      options: ["Yes", "No", "Only to lump sums", "Only to DB schemes"],
      answer: 0,
      explain: "The existing exemption for a surviving spouse or civil partner is maintained.",
    },
    {
      kind: "mcq",
      id: "q-dis",
      prompt: "Which of these is outside the new rules?",
      options: ["A SIPP", "Death-in-service benefits from a registered scheme", "A drawdown fund", "A personal pension"],
      answer: 1,
      explain: "Death-in-service is excluded.",
    },
    {
      kind: "mcq",
      id: "q-rate",
      prompt: "At what rate is IHT charged on an estate above the available nil-rate bands?",
      options: ["20%", "28%", "40%", "45%"],
      answer: 2,
      explain: "40%.",
    },
    {
      kind: "mcq",
      id: "q-income",
      prompt: "A member dies aged 80 with a large unused fund. Which taxes may arise?",
      options: ["IHT only", "Income tax on beneficiaries only", "Both IHT and income tax on withdrawals", "Neither"],
      answer: 2,
      explain: "IHT on the estate and, after 75, income tax on withdrawals by beneficiaries.",
    },
  ],
  sources: [
    { label: "Inheritance Tax on unused pension funds and death benefits – GOV.UK", url: "https://www.gov.uk/government/publications/reforming-inheritance-tax-unused-pension-funds-and-death-benefits/inheritance-tax-on-unused-pension-funds-and-death-benefits" },
    { label: "Technical note: Inheritance Tax on pensions – GOV.UK", url: "https://www.gov.uk/government/publications/inheritance-tax-on-pensions-technical-note/technical-note-inheritance-tax-on-pensions" },
    { label: "Inheritance Tax on pensions: liability, reporting and payment – GOV.UK", url: "https://www.gov.uk/government/consultations/inheritance-tax-on-pensions-liability-reporting-and-payment" },
    { label: "Inheritance Tax rates and thresholds – GOV.UK", url: "https://www.gov.uk/inheritance-tax" },
    { label: "Tax when you receive a pension – GOV.UK", url: "https://www.gov.uk/tax-on-pension" },
  ],
};
