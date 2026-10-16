import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "chargeable-lifetime-transfers-and-trusts-basics",
  title: "Chargeable lifetime transfers and the basics of trusts for IHT",
  level: "advanced",
  minutes: 40,
  summary:
    "How gifts into discretionary and other relevant property trusts are taxed at 20% as chargeable lifetime transfers, how the top-up charge works if the donor dies within seven years, the ten-year and exit charges, and the types of trust you will meet in practice.",
  objectives: [
    "Distinguish a PET from a chargeable lifetime transfer (CLT)",
    "Calculate the lifetime IHT on a CLT, whether the donor or the trustees pay the tax",
    "Calculate the additional tax if the donor dies within seven years, with taper relief and credit for tax paid",
    "Calculate the maximum ten-year charge on a relevant property trust",
    "Identify the main trust types and the reporting and payment deadlines",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `A **gift to an individual** is a PET. A **gift into most trusts** (in particular a **discretionary trust**) is **immediately chargeable** to IHT: it is a **chargeable lifetime transfer (CLT)**. Trusts are used to keep control of assets, to protect beneficiaries and to plan for IHT. The charges mean that careful numbers are needed before you recommend one.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "CLTs: the rules in outline (IHTA 1984)",
      md: `- A **CLT** is a lifetime transfer that is not a PET: mainly gifts to **relevant property trusts** (such as discretionary trusts) and **companies**.
- The CLT is set against the **nil-rate band**, looking back **seven years** from the date of the transfer at earlier CLTs (PETs only count if they later fail).
- The **excess** over the NRB is charged at the **lifetime rate of 20%** (half the death rate).
- If the **donor pays** the tax, the transfer is **grossed up**: tax = **25%** of the net excess (20/80). If the **trustees pay**, tax is **20%** of the excess (and the trust is worth less).
- If the **donor dies within seven years**, the CLT is re-calculated at the **death rate of 40%**, with **taper relief** if death is more than three years after the transfer and **credit for lifetime tax paid** (there is no refund if the lifetime tax was higher).
- **Payment due:** for transfers **6 April to 30 September**, by **30 April** in the following year; for transfers **1 October to 5 April**, **six months after the end of the month** of the transfer. **Reporting** is on form **IHT100** (see HMRC's guidance for the reporting deadline).
- **CGT:** because a CLT is a disposal, **gift holdover relief** (s260) is available for any asset given into a trust that is a CLT, so no CGT arises on the transfer if the settlor claims it (for a gift to trustees the claim is made by the transferor alone).`,
    },
    {
      kind: "table",
      caption: "Trust types you will meet",
      head: ["Type", "Features", "IHT treatment"],
      rows: [
        ["Bare trust", "Beneficiary is absolutely entitled (often a child); trustee holds as nominee", "Gift is a **PET**; assets are treated as the beneficiary's"],
        ["Discretionary trust", "Trustees decide who benefits and when", "**Relevant property**: CLT on entry; **10-year** and **exit** charges"],
        ["Interest in possession trust (created in lifetime after 22 March 2006)", "A beneficiary has a right to income", "Generally **relevant property** too (except some, e.g. a disabled person's interest; an immediate post-death interest can only arise under a will or intestacy)"],
        ["Immediate post-death interest (IPDI) trust", "Created by a will; life tenant has right to income", "Treated as the **life tenant's estate**; spouse exemption can apply"],
        ["Trust for a disabled person", "Special protections", "Gifts may be PETs; special rules reduce the charges"],
      ],
    },
    {
      kind: "md",
      md: `### Periodic and exit charges on relevant property trusts

- A **ten-year anniversary charge** applies on the value of the trust at each tenth anniversary, at a **maximum of 6%** of the value above the nil-rate band available (the rate is **30% of the 20% lifetime rate** where there are no complicating factors).
- An **exit charge** applies when assets leave the trust (for example a distribution), at a proportion of the last periodic rate, so it is usually **low** in the first ten years.
- **Registration:** trusts must be registered on the HMRC **Trust Registration Service** and kept up to date.
- **Reporting:** an **IHT100** is needed for chargeable events.

### Ordering matters

Lifetime transfers in the past seven years **reduce the NRB** available. Where a **settlor** makes a series of gifts into more than one trust on the same day, the rules for **related settlements** can reduce the NRB for each, so take advice before creating multiple trusts.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "When not to use a trust",
      md: `- Where the client needs **access to the assets** (a GWR problem may arise).
- Where the **annual cost and administration** would outweigh the benefit.
- Where the **spouse exemption** makes a gift to the spouse simpler and cheaper.
- Where the **CGT** holdover isn't available for the asset or the settlor retains an interest (a **settlor-interested trust**).`,
    },
  ],
  scenario: {
    title: "A discretionary trust for the Ferrier grandchildren",
    narrative: `Edwin Ferrier transfers **£425,000** cash into a discretionary trust on **1 June 2026** for his grandchildren. He has made no earlier gifts, has not used his annual exemptions for 2026/27 or 2025/26 (£3,000 each) and can use them. NRB £325,000. The trust is registered with HMRC.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: net transfer after exemptions.** £425,000 − £6,000 (annual exemptions for 2026/27 and 2025/26) = **£419,000**.

**Step 2: against the NRB.** £419,000 − £325,000 = **£94,000** excess.

**Step 3: lifetime IHT.**
- If **Edwin pays** the tax: grossed up at 20/80, tax = £94,000 × 25% = **£23,500**.
- If the **trustees pay**: tax = £94,000 × 20% = **£18,800** (reducing the fund).

**Step 4: payment date.** The transfer was made on 1 June 2026 (between 6 April and 30 September), so tax is due by **30 April 2027**.

**Step 5: if Edwin dies 2 years later** (before 3 years, no taper). Suppose Edwin paid the lifetime tax. The chargeable transfer was **£419,000 + £23,500 = £442,500**. At death rates: (£442,500 − £325,000) × 40% = £117,500 × 40% = **£47,000**. Less lifetime tax paid £23,500 = **£23,500** extra, payable by the trustees. The NRB is also used up for later gifts and his estate.

**Step 6: if he dies 4½ years later.** Taper relief gives 60%: £47,000 × 60% = £28,200 less £23,500 = **£4,700** extra.

**Step 7: the trust's own charges.** At the first ten-year anniversary, if the trust is worth £500,000 and no complicating factors, tax at most (£500,000 − £325,000) × 6% = **£10,500**.

**Step 8: CGT.** If the cash were instead shares in a private company, **gift holdover** (s260) could defer the gain. For cash there is no gain.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "clt-donor-pays",
      prompt: "A donor transfers £400,000 net into a discretionary trust (after exemptions), with no earlier gifts, and pays the IHT personally. NRB £325,000. What is the lifetime IHT (£)?",
      answer: 18750,
      unit: "£",
      explain: "Gross up: tax = net excess × 25% (20/80).",
      working: "Excess £75,000 × 25% = **£18,750**.",
    },
    {
      kind: "numeric",
      id: "clt-trustees-pay",
      prompt: "On the same facts but with the trustees paying the tax, what is the lifetime IHT (£)?",
      answer: 15000,
      unit: "£",
      explain: "Tax at 20% of the excess over the NRB.",
      working: "£75,000 × 20% = **£15,000**.",
    },
    {
      kind: "numeric",
      id: "ten-year",
      prompt: "A discretionary trust is worth £600,000 at its first ten-year anniversary. Assuming NRB £325,000 and a maximum 6% rate, what is the maximum ten-year charge (£)?",
      answer: 16500,
      unit: "£",
      explain: "6% on the value above the NRB.",
      working: "(£600,000 − £325,000) × 6% = £275,000 × 6% = **£16,500**.",
    },
    {
      kind: "numeric",
      id: "top-up",
      prompt: "A CLT of £500,000 gross (no earlier gifts) paid £35,000 lifetime tax. The donor dies 2 years later. NRB £325,000. What additional IHT arises at death (£)?",
      answer: 35000,
      unit: "£",
      explain: "Recalculate at 40%, with no taper relief within 3 years, and credit lifetime tax paid.",
      working: "(£500,000 − £325,000) × 40% = £70,000; less £35,000 paid = **£35,000**.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-clt-rate",
      prompt: "What is the lifetime IHT rate on a CLT above the NRB?",
      options: ["10%", "20%", "36%", "40%"],
      answer: 1,
      explain: "20%.",
    },
    {
      kind: "mcq",
      id: "q-gift-trust",
      prompt: "A gift into a discretionary trust is…",
      options: ["A PET", "A chargeable lifetime transfer", "Exempt", "A gift with reservation"],
      answer: 1,
      explain: "A CLT, immediately chargeable.",
    },
    {
      kind: "mcq",
      id: "q-max-pc",
      prompt: "What is the maximum rate of the ten-year charge?",
      options: ["3%", "6%", "10%", "20%"],
      answer: 1,
      explain: "6% of the excess over the NRB.",
    },
    {
      kind: "mcq",
      id: "q-bare",
      prompt: "A gift into a bare trust for a child is treated as…",
      options: ["A CLT", "A PET", "Exempt only up to £3,000", "A GWR"],
      answer: 1,
      explain: "A PET.",
    },
    {
      kind: "mcq",
      id: "q-pay-date",
      prompt: "A CLT is made on 15 July. When is the lifetime tax due?",
      options: ["15 January", "30 April the following year", "5 April", "31 January the following year"],
      answer: 1,
      explain: "Transfers between 6 April and 30 September are due by 30 April the next year.",
    },
  ],
  sources: [
    { label: "Tell HMRC that Inheritance Tax is due on a gift or trust (IHT100) – GOV.UK", url: "https://www.gov.uk/guidance/tell-hmrc-that-inheritance-tax-is-due-on-a-gift-or-trust-iht100" },
    { label: "IHTM30153 – due date for payment: lifetime transfers chargeable when made", url: "https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm30153" },
    { label: "Inheritance Tax: trusts – GOV.UK", url: "https://www.gov.uk/trusts-taxes" },
    { label: "IHTA 1984 s7 – rates of tax", url: "https://www.legislation.gov.uk/ukpga/1984/51/section/7" },
    { label: "HS295 Relief for gifts and similar transactions (2026) – GOV.UK", url: "https://www.gov.uk/government/publications/relief-for-gifts-and-similar-transactions-hs295-self-assessment-helpsheet/hs295-relief-for-gifts-and-similar-transactions-2026" },
    { label: "TCGA 1992 s260 – gifts on which IHT is chargeable", url: "https://www.legislation.gov.uk/ukpga/1992/12/section/260" },
  ],
};
