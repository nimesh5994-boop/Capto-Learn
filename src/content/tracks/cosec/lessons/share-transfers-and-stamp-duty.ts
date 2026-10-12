import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "share-transfers-and-stamp-duty",
  title: "Share transfers and stamp duty",
  level: "practitioner",
  minutes: 35,
  summary:
    "Moving existing shares from one person to another: checking the articles, the stock transfer form, calculating and paying stamp duty (and when none is due), registering the transfer, transmission on death, and the knock-on PSC, confirmation statement and tax points.",
  objectives: [
    "Check the articles for pre-emption on transfer and directors' power to refuse registration",
    "Calculate stamp duty on a stock transfer form, including rounding and the £1,000 certificate",
    "Register a transfer correctly and deal with the follow-up filings",
    "Flag the capital gains tax consequences for gifts and transfers between family members",
  ],
  body: [
    {
      kind: "md",
      md: `A **transfer** is the sale or gift of shares that already exist. Unlike an allotment, the company's share capital doesn't change and nothing is filed at Companies House at the time. But the company still has work to do, and if it's done badly the register of members, the PSC register and the confirmation statement all end up wrong.`,
    },
    {
      kind: "md",
      md: `### Step 1: read the articles

- **Pre-emption on transfer.** The Companies Act doesn't give shareholders pre-emption rights on a *transfer*, but many bespoke articles and shareholders' agreements do: a shareholder who wants to sell must first offer the shares to the others at a fair value.
- **Directors' discretion.** Under the private company **model articles (art 26)** the directors may refuse to register a transfer. If they refuse, they must send the transferee notice of refusal with **reasons** as soon as practicable and within **2 months** (CA 2006 s771).
- **Shareholders' agreement.** Check for drag-along, tag-along and good/bad leaver clauses, especially where an employee shareholder is leaving.`,
    },
    {
      kind: "md",
      md: `### Step 2: the stock transfer form

Fully paid shares in a private company are transferred on a **stock transfer form** (J30) signed by the transferor. It shows the company, the number and class of shares, the **consideration**, and the transferee's details. Partly paid shares need the transferee's signature too.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Stamp duty on a stock transfer form",
      md: `- Stamp duty is charged at **0.5%** of the consideration (Finance Act 1999 Sch 13), **rounded up to the nearest £5**.
- If the consideration is **£1,000 or less** and the transfer isn't part of a larger transaction over £1,000, complete **Certificate 1** on the form: no duty, and the form doesn't need to go to HMRC.
- A **gift** has no consideration: enter "Nil" as the consideration. No duty is due and no certificate is needed. Certain other transfers (e.g. on divorce or dissolution of a civil partnership) are exempt using **Certificate 2**.
- Where duty is due, pay it and send the form to HMRC (by email to the Stamp Duty mailbox) **within 30 days** of the form being signed and dated. Late payment brings interest and possibly penalties.`,
    },
    {
      kind: "table",
      caption: "Stamp duty examples",
      head: ["Consideration", "0.5%", "Duty payable", "Comment"],
      rows: [
        ["£800", "£4", "Nil", "Certificate 1 (£1,000 or less)"],
        ["£1,000", "£5", "Nil", "Certificate 1 still applies: the limit is *£1,000 or less*"],
        ["£1,001", "£5.005", "£10", "Rounded up to the next £5"],
        ["£18,240", "£91.20", "£95", "Rounded up to the next £5"],
        ["Gift to daughter", "n/a", "Nil", "Consideration 'Nil'; no certificate needed"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Don't register an unstamped transfer",
      md: `A company shouldn't enter a transfer in its register of members unless the form has been properly stamped by HMRC or carries a valid certificate. If you register a transfer on an unstamped form where duty was due, you're helping to create a defect that buyers' solicitors will find on due diligence.`,
    },
    {
      kind: "md",
      md: `### Step 3: register the transfer

Once the directors approve the transfer (board minute) and the form is stamped or certified:

1. Enter the transferee in the **register of members** with the date and the shares; reduce or remove the transferor.
2. Cancel the old share certificate and issue a new one within **2 months** (s776).
3. Check the **PSC position** for both parties (crossing 25%, 50% or 75%), and file PSC01, PSC04 or PSC07 within the deadlines.
4. Show the transfer on the **next confirmation statement**'s shareholder information.

### Transmission on death or bankruptcy

When a shareholder dies, the shares pass by **transmission** to their personal representatives, not by transfer. The PRs produce the grant of probate (or letters of administration) and can either be registered themselves or transfer the shares directly to the beneficiary. A transfer by PRs to a beneficiary under the will is for no consideration, so no stamp duty is payable.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Tax points to flag to the client",
      md: `- **Spouses / civil partners** living together: the transfer is at no gain / no loss for CGT.
- **Gifts to anyone else connected** (children, siblings): a disposal at **market value** for CGT, even though no money changes hands. Gift holdover relief (TCGA 1992 s165) may be available for shares in an unquoted trading company.
- **Employees** acquiring shares cheaply may have an employment income charge.
- Transfers to a spouse to share dividend income can engage the **settlements legislation** if the shares carry little more than a right to income.

You're the company secretary on the paperwork, but you're also the tax adviser who'll be asked about it next January. Raise it now.`,
    },
  ],
  scenario: {
    title: "A departing shareholder at Pennine Fabrications Ltd",
    narrative: `Pennine Fabrications Ltd has 10,000 £1 ordinary shares: Stuart Bell 6,000, Rachel Ward 2,500 and Ian Moss 1,500. All are directors. Ian is retiring and has agreed to sell his 1,500 shares to Stuart for **£46,500**. The company's bespoke articles say a selling shareholder must first offer shares to all other shareholders pro rata at the agreed price. Rachel has said in writing she doesn't want any of Ian's shares.

Separately, Rachel wants to **give** 500 of her shares to her son Tom, aged 24.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Ian to Stuart**

1. **Articles.** Ian must offer his shares to Stuart and Rachel pro rata. Rachel's written waiver lets all 1,500 go to Stuart. Keep it on file.
2. **Stock transfer form.** Consideration £46,500. Duty: 0.5% × £46,500 = £232.50, rounded up to **£235**. Pay HMRC and email the form within 30 days of signing.
3. **Board approval.** Minute the directors' approval of the transfer, subject to stamping.
4. **Register.** Stuart: 7,500 shares (75%). Ian: nil. New certificate to Stuart; Ian's certificate cancelled.
5. **PSC.** Stuart moves from 60% ("more than 50% but less than 75%") to 75% ("75% or more"): file **PSC04**. Ian (15%) wasn't a PSC, so nothing to file for him. File **TM01** for Ian as a director if he's also stepping down.

**Rachel to Tom (gift)**

6. **Stamp duty.** Consideration "Nil": no duty and no certificate needed.
7. **CGT.** Rachel is treated as disposing of 500 shares at market value. Talk to her about gift holdover relief before she signs.
8. **PSC.** Rachel drops from 25% to 20%. At 25% she wasn't a PSC (the test is *more than* 25%), so no PSC filing. Tom at 5% isn't a PSC.
9. **Confirmation statement.** Both transfers go in the shareholder information on the next CS01.`,
      },
      {
        kind: "table",
        caption: "Register of members after both transfers",
        head: ["Shareholder", "Before", "After", "%"],
        rows: [
          ["Stuart Bell", "6,000", "7,500", "75%"],
          ["Rachel Ward", "2,500", "2,000", "20%"],
          ["Tom Ward", "0", "500", "5%"],
          ["Ian Moss", "1,500", "0", "0%"],
          ["**Total**", "**10,000**", "**10,000**", "**100%**"],
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "stamp-duty-calc",
      prompt: "A shareholder sells 3,000 shares in a private company for £18,240. How much stamp duty is payable on the stock transfer form?",
      answer: 95,
      unit: "£",
      explain: "Stamp duty is 0.5% of the consideration, rounded up to the nearest £5.",
      working: "0.5% × £18,240 = £91.20, rounded up to the next £5 = **£95**.",
    },
    {
      kind: "numeric",
      id: "stamp-duty-threshold",
      prompt:
        "Two separate, unconnected stock transfer forms are signed: one for £950 and one for £12,020. What is the total stamp duty payable across both?",
      answer: 65,
      unit: "£",
      explain:
        "The £950 transfer qualifies for Certificate 1 (consideration of £1,000 or less, not part of a larger transaction), so no duty. The £12,020 transfer is chargeable.",
      working: "£950: nil. £12,020 × 0.5% = £60.10, rounded up to **£65**. Total **£65**.",
    },
    {
      kind: "classify",
      id: "stamp-duty-treatment",
      prompt: "How is each stock transfer treated for stamp duty?",
      categories: ["Duty payable: send to HMRC", "No duty: Certificate 1 (£1,000 or less)", "No duty: nil consideration / exempt"],
      items: [
        { text: "Sale of 100 shares to a co-director for £650", answer: 1 },
        { text: "Gift of 200 shares by a father to his son", answer: 2, why: "No consideration, so enter 'Nil'." },
        { text: "Sale of 50% of a company to a management buy-in team for £120,000", answer: 0 },
        { text: "Transfer by executors to the beneficiary named in the will", answer: 2, why: "No consideration passes to the estate." },
        { text: "Sale of 400 shares for £1,500", answer: 0, why: "Above £1,000, so duty of £7.50 rounded up to £10." },
      ],
      explain: "Check the consideration first. Over £1,000: 0.5% rounded up to £5. £1,000 or less: Certificate 1. No consideration (gifts, transfers to beneficiaries): no duty.",
    },
    {
      kind: "mcq",
      id: "refusal-to-register",
      prompt: "The directors of a company with model articles decide not to register a transfer to a competitor. What must they do?",
      options: [
        "Nothing: they can simply ignore the form",
        "Send the transferee notice of refusal with reasons as soon as practicable and within 2 months",
        "Apply to Companies House for permission",
        "Register it anyway — directors can't refuse a transfer",
      ],
      answer: 1,
      explain: "Model articles art 26 lets directors refuse; CA 2006 s771 requires notice of refusal and reasons within 2 months.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-sd-rate",
      prompt: "What is the rate of stamp duty on a stock transfer form for shares in a UK company?",
      options: ["0.25%", "0.5%", "1%", "1.5%"],
      answer: 1,
      explain: "0.5% of the consideration, rounded up to the nearest £5.",
    },
    {
      kind: "mcq",
      id: "q-sd-deadline",
      prompt: "Where stamp duty is due, by when must it be paid and the form sent to HMRC?",
      options: ["7 days after signing", "14 days after signing", "30 days after signing", "With the company's next CT600"],
      answer: 2,
      explain: "Within 30 days of the form being signed and dated, to avoid interest and penalties.",
    },
    {
      kind: "mcq",
      id: "q-transfer-ch",
      prompt: "How does Companies House find out about a share transfer in a private company?",
      options: ["An SH01 within one month", "A stock transfer form filed within 14 days", "Through the shareholder information on the next confirmation statement", "It doesn't need to know"],
      answer: 2,
      explain: "Transfers aren't filed at the time; they're reported in the shareholder information on the next CS01. Any resulting PSC change is filed separately.",
    },
    {
      kind: "mcq",
      id: "q-gift-cgt",
      prompt: "A director gives shares in her trading company to her adult son. What is the CGT position?",
      options: [
        "No disposal because no money changes hands",
        "No gain / no loss, as for spouses",
        "A disposal at market value, with gift holdover relief potentially available",
        "Exempt because stamp duty is nil",
      ],
      answer: 2,
      explain: "A gift to a connected person is a disposal at market value. Holdover relief under TCGA 1992 s165 may defer the gain for shares in an unquoted trading company.",
    },
    {
      kind: "mcq",
      id: "q-transmission",
      prompt: "A shareholder dies. How do the shares reach the beneficiary named in the will?",
      options: [
        "Automatically, on the date of death",
        "By transmission to the personal representatives, who may then transfer them to the beneficiary",
        "By a new allotment to the beneficiary",
        "The company must buy them back",
      ],
      answer: 1,
      explain: "Shares pass by operation of law to the personal representatives, who produce the grant and then either register or transfer the shares.",
    },
  ],
  sources: [
    { label: "HMRC: Stamp Duty on shares", url: "https://www.gov.uk/guidance/stamp-duty-on-shares" },
    { label: "Finance Act 1999 Schedule 13 – stamp duty: instruments chargeable", url: "https://www.legislation.gov.uk/ukpga/1999/16/schedule/13" },
    { label: "Companies Act 2006 s771 – procedure on transfer being lodged", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/771" },
    { label: "Model articles for private companies limited by shares", url: "https://www.legislation.gov.uk/uksi/2008/3229/schedule/1" },
    { label: "HMRC Capital Gains manual: gifts of business assets (CG66910)", url: "https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg66910" },
  ],
};
