import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "estate-administration-iht400-and-deadlines",
  title: "Estate administration: IHT400, excepted estates, deadlines and post-death planning",
  level: "advanced",
  minutes: 40,
  summary:
    "The practical work after a death: deciding whether an IHT400 is needed, the one-year reporting and six-month payment deadlines, valuing the estate, claiming transferred bands, loss-on-sale and quick succession relief, deeds of variation and how to handle pension funds and the April 2027 change.",
  objectives: [
    "Decide whether an estate is an excepted estate or needs an IHT400",
    "State the reporting and payment deadlines and the consequences of paying late",
    "Prepare the basic computation for an IHT400 including debts, exemptions and bands",
    "Explain loss-on-sale relief, quick succession relief and deeds of variation",
    "List the information and records the practice should gather and the key points on pensions",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Estate administration is where all the earlier planning is tested. Executors have a **personal liability** for reporting and paying IHT, a short deadline for payment, and (in most cases) cannot get **probate** until the IHT is paid or arranged. A good practice runs the matter with a **checklist**, a **diary** and early conversations about **funding the tax**.`,
    },
    {
      kind: "table",
      caption: "Do we need an IHT400? (deaths on or after 1 January 2022)",
      head: ["Situation", "Report to HMRC?"],
      rows: [
        ["Estate **below the nil-rate band** (£325,000) with **no chargeable gifts** in the previous 7 years above the limits", "**Excepted estate**: no IHT400; details given on the probate application"],
        ["Gross estate **up to £650,000** where a **transferred nil-rate band** doubles the threshold (both bands available)", "Excepted estate; claim the transfer using **IHT217**"],
        ["Estate where the **spouse/civil partner and charity exemptions** reduce the chargeable estate below the NRB, **gross value up to £3 million**", "Excepted (exempt) estate: no IHT400 (the spouse exemption only counts where both spouses have always been long-term UK resident or UK domiciled)"],
        ["Estate with **foreign assets** over the limits, trusts, **gifts** that exceed limits, or **tax to pay**", "**IHT400** (with supplementary pages) required"],
        ["A **claim to transfer** a deceased spouse's unused NRB or RNRB with an estate that isn't excepted", "IHT400 with **IHT402** (NRB) and the RNRB schedule (IHT435)"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Deadlines (IHT400 estates)",
      md: `- **Report** the estate value using the IHT400 **within one year** (HMRC's guidance; the legislation links the date to the end of the month of death or to the executors first acting). You **cannot apply for probate** until you have reported and (where tax is due on assets other than instalment property) paid, or arranged payment.
- **Pay** the IHT by the **end of the sixth month after the death** to avoid **interest**. For a death on 20 August 2026 that is **28 February 2027**.
- **Interest** runs on unpaid tax from the end of the sixth month.
- **Instalments:** tax on certain property (land, buildings, some shares, businesses, and, from April 2026, all property qualifying for APR/BPR) can be paid in **10 annual instalments**. Interest is **not charged** on the qualifying business and agricultural instalments from April 2026.
- **Direct payment scheme:** executors can ask banks and building societies to pay IHT directly to HMRC from the deceased's accounts before probate.`,
    },
    {
      kind: "md",
      md: `### Valuing the estate

- Assets are valued at **open market value** at the date of death. For **quoted shares** HMRC's "quarter-up" rule applies (the lower of the quarter-up price and the midpoint of the marked bargains); for **property**, use a **professional valuation** where appropriate.
- **Probate value** becomes the heirs' **base cost for CGT**.
- **Joint assets**: half of a jointly-held home normally; a discount may be allowed for the fractional share.
- Include any **gifts in the previous 7 years** and **trust interests** on the IHT400.
- Deduct **debts** (mortgage, credit cards, unpaid tax) and **reasonable funeral costs**.

### Reliefs and planning after death

- **Loss on sale of shares (s179):** if the executors sell **quoted shares** within **12 months** of death at less than the probate value, the loss can be substituted for the original value for IHT. For **land** (s191) the period is **4 years**.
- **Quick succession relief (s141):** if the deceased inherited property from someone who died within five years, relief is given on the IHT paid on the earlier death, tapering from **100%** (within 1 year) to **20%** (within 4 to 5 years).
- **Deed of variation (s142 IHTA; s62 TCGA):** beneficiaries can **redirect** what they inherit by a written deed **within two years** of the death, treated for IHT (and, if the deed so states, CGT) as made by the deceased. Useful to use a spouse exemption, to leave to charity (and possibly bring the rate to 36%), or to use the nil-rate band.
- **Business and agricultural relief, residence nil-rate band** and **transfer of unused bands**: check each carefully and keep the evidence.

### Pensions

For deaths before **6 April 2027** most unused pension funds are **outside the estate**. For deaths on or after that date they will be **in the estate**, with the **personal representatives** responsible for reporting and paying IHT. Ask early for **scheme statements, nominations and the scheme administrator's contact details**, and plan for **funding** the tax.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Executors' pitfalls",
      md: `- Missing the **six-month** payment date and paying **interest**.
- **Forgetting lifetime gifts** (and their annual exemption or normal-expenditure evidence).
- Failing to **claim** transferable NRB/RNRB (it is not automatic).
- Treating **joint property** wrongly (survivorship doesn't remove it from the estate).
- **Distributing** the estate before the IHT position is settled (executors can be personally liable).
- Not keeping **valuation evidence** for the CGT base cost.`,
    },
  ],
  scenario: {
    title: "The estate of Mavis Greenway",
    narrative: `Mavis Greenway, a widow whose husband's NRB and RNRB were **unused** (he left everything to her in 2015), dies on **20 August 2026**. Her estate: house **£600,000** (left to her two children), investments **£500,000** (including quoted shares valued at **£120,000** at death), bank **£50,000**. Funeral costs **£8,000**; debts **£2,000**. She made no lifetime gifts. Her estate is under £2 million. In **October 2026** the executors sell the quoted shares for **£90,000**.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: the net estate.** £600,000 + £500,000 + £50,000 = £1,150,000; less funeral £8,000 and debts £2,000 = **£1,140,000**.

**Step 2: bands.** NRB £325,000 + transferred NRB £325,000 (100%) + RNRB £175,000 + transferred RNRB £175,000 (100%) = **£1,000,000** (the home £600,000 passes to descendants, so the RNRB is available).

**Step 3: IHT.** £1,140,000 − £1,000,000 = £140,000 × 40% = **£56,000**.

**Step 4: report and pay.** An IHT400 is required because tax is payable. Pay by **28 February 2027** and report within a year of the death. Claim the transferred NRB (**IHT402**) and the RNRB (**IHT435**), supplying the husband's papers.

**Step 5: loss on sale.** The shares were valued at £120,000 and sold for £90,000 within 12 months: a loss of **£30,000**. The executors can claim to substitute the sale price, reducing the estate to £1,110,000 and the chargeable estate to £110,000: IHT **£44,000**, a saving of **£12,000** (£30,000 × 40%). Where the IHT relief is claimed, the substituted value is also used for CGT, so the executors cannot claim a CGT loss on the same shares as well. Check the interaction before claiming.

**Step 6: planning.** If one of the children wanted to redirect part of their inheritance to a charity within two years by deed of variation, it could reduce the IHT (and potentially qualify for the 36% rate if the charity gift exceeds 10% of the baseline amount).`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "iht-estate",
      prompt: "An estate (net of liabilities and funeral costs) is £1,140,000. Combined bands available are £1,000,000. What IHT is due at 40% (£)?",
      answer: 56000,
      unit: "£",
      explain: "Estate less bands, at 40%.",
      working: "(£1,140,000 − £1,000,000) × 40% = **£56,000**.",
    },
    {
      kind: "numeric",
      id: "loss-relief",
      prompt: "Executors sell quoted shares within 12 months of death for £30,000 less than their value at death. The estate is taxed at 40% on the margin. What is the IHT saved by loss-on-sale relief (£)?",
      answer: 12000,
      unit: "£",
      explain: "The loss reduces the value of the estate, taxed at 40%.",
      working: "£30,000 × 40% = **£12,000**.",
    },
    {
      kind: "numeric",
      id: "qsr-percent",
      prompt: "A person dies 2 years and 6 months after inheriting property on which IHT was paid. What percentage of the earlier tax is given as quick succession relief (the 1–2 years band is 80%, 2–3 years is 60%)?",
      answer: 60,
      unit: "%",
      explain: "Quick succession relief tapers: 100% (within 1 year), 80%, 60%, 40%, 20%.",
      working: "Death between 2 and 3 years after: **60%**.",
    },
    {
      kind: "classify",
      id: "classify-reporting",
      prompt: "Does the estate normally need an IHT400 (assume deaths from 1 January 2022)?",
      categories: ["IHT400 needed", "Excepted estate (no IHT400)"],
      items: [
        { text: "Estate £280,000, no lifetime gifts, no trusts", answer: 1 },
        { text: "Estate £1.4 million with IHT to pay", answer: 0 },
        { text: "Estate £2.4 million, all left to a UK-resident spouse and charities, net chargeable estate nil", answer: 1, why: "Exempt excepted estate up to £3 million gross where the spouse conditions are met." },
        { text: "Estate with a trust interest and foreign property over the limits", answer: 0 },
      ],
      explain: "Check the excepted estate rules: low value, transferred NRB, or exempt (spouse/charity) with the £3 million limit.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-pay",
      prompt: "When is IHT on an estate due without interest?",
      options: ["On the date of death", "By the end of the sixth month after the death", "With the IHT400 within 12 months", "At probate"],
      answer: 1,
      explain: "By the end of the sixth month after the death.",
    },
    {
      kind: "mcq",
      id: "q-report",
      prompt: "How long do executors have to report the estate on an IHT400?",
      options: ["6 weeks", "6 months", "One year", "Two years"],
      answer: 2,
      explain: "Within one year.",
    },
    {
      kind: "mcq",
      id: "q-var",
      prompt: "How long do beneficiaries have to make a deed of variation that is read back to the date of death?",
      options: ["6 months", "1 year", "2 years", "4 years"],
      answer: 2,
      explain: "Two years from the death.",
    },
    {
      kind: "mcq",
      id: "q-iht402",
      prompt: "Is the transfer of an unused nil-rate band automatic?",
      options: ["Yes", "No: it must be claimed", "Only for farms", "Only for estates under £1m"],
      answer: 1,
      explain: "A claim on the second death using the correct forms.",
    },
    {
      kind: "mcq",
      id: "q-loss-time",
      prompt: "Within what time must quoted shares be sold for loss-on-sale relief?",
      options: ["3 months", "12 months", "4 years", "7 years"],
      answer: 1,
      explain: "12 months for quoted shares; 4 years for land.",
    },
  ],
  sources: [
    { label: "Tell HMRC the value of the estate – GOV.UK", url: "https://www.gov.uk/valuing-estate-of-someone-who-died/tell-hmrc-estate-value" },
    { label: "IHTM06013 – excepted estates: exempt excepted estates", url: "https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm06013" },
    { label: "IHT402 – claim to transfer unused nil rate band", url: "https://assets.publishing.service.gov.uk/media/67eba2faba01abac8e9fe9af/IHT402.pdf" },
    { label: "Work out and apply the residence nil rate band – GOV.UK", url: "https://www.gov.uk/guidance/inheritance-tax-residence-nil-rate-band" },
    { label: "IHTA 1984 s142 – alteration of dispositions taking effect on death", url: "https://www.legislation.gov.uk/ukpga/1984/51/section/142" },
  ],
};
