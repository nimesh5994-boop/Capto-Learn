import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "choosing-the-reporting-framework",
  title: "Choosing the framework: FRS 105, FRS 102 Section 1A or full FRS 102, and audit exemption",
  level: "practitioner",
  minutes: 40,
  summary:
    "Using the company size thresholds raised for periods beginning on or after 6 April 2025 to decide between the micro-entity regime (FRS 105), the small companies regime (FRS 102 Section 1A) and full FRS 102; the two-year rule for changing size; who can't use the micro and small regimes; and when a company can claim audit exemption.",
  objectives: [
    "Apply the micro, small and medium thresholds (two of three tests) for periods beginning on or after 6 April 2025",
    "Apply the two-consecutive-years rule when a company crosses a threshold",
    "Compare what FRS 105 and FRS 102 Section 1A require and choose the right framework for a client",
    "Decide whether a company can claim audit exemption, including the members' right to demand an audit",
  ],
  body: [
    {
      kind: "table",
      caption: "Company size thresholds for financial years beginning on or after 6 April 2025 (meet at least two of three)",
      head: ["Size", "Turnover", "Balance sheet total (gross assets)", "Average employees"],
      rows: [
        ["Micro-entity", "Not more than £1m", "Not more than £500,000", "Not more than 10"],
        ["Small", "Not more than £15m", "Not more than £7.5m", "Not more than 50"],
        ["Medium", "Not more than £54m", "Not more than £27m", "Not more than 250"],
        ["Large", "Above medium", "", ""],
      ],
    },
    {
      kind: "md",
      md: `For financial years beginning **before** 6 April 2025 the old limits apply (small: £10.2m turnover and £5.1m balance sheet total; micro: £632,000 and £316,000; medium: £36m and £18m). Turnover limits are pro-rated for periods that aren't 12 months.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The two-year rule (CA 2006 s382 / s384A)",
      md: `A company qualifies as small (or micro) in its **first financial year** if it meets the conditions in that year. After that, its status **only changes** if it meets (or fails) the conditions in **two consecutive years**. So a small company that exceeds the limits for one year stays small; it only becomes medium if it exceeds them again the next year.

The regulations that raised the thresholds include transitional rules on applying the new limits when you look back at earlier years. Check them when a client is near a boundary.`,
    },
    {
      kind: "table",
      caption: "The three frameworks for an owner-managed company",
      head: ["", "FRS 105 (micro-entities)", "FRS 102 Section 1A (small)", "Full FRS 102"],
      rows: [
        ["Who", "Micro-entities that choose it", "Small companies (and micros that prefer it)", "Medium and large companies, or anyone who chooses it"],
        ["Measurement", "Historical cost only: no revaluation, no fair value", "As full FRS 102, including revaluation and fair value options", "Full recognition and measurement"],
        ["Deferred tax", "Not recognised", "Recognised", "Recognised"],
        ["Leases (periods from 1 January 2026)", "Operating / finance distinction kept", "Most leases on balance sheet (Section 20)", "Most leases on balance sheet"],
        ["Notes", "Very few (e.g. advances to directors, guarantees and commitments)", "Reduced set, plus anything needed to give a true and fair view", "Full disclosures"],
        ["True and fair", "Presumed if the regime is followed", "Required; directors may need extra disclosures", "Required"],
        ["Cash flow statement", "No", "No", "Yes (unless exempt)"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Who can't use the micro-entity regime",
      md: `Even if within the limits, the micro-entity regime isn't available to (among others): **public companies**, **charities**, investment undertakings, financial holding undertakings, credit institutions and insurance undertakings, a **parent of a group that isn't small** (or of a small group that prepares group accounts), and a **subsidiary included in consolidated accounts**. Check before you roll a client forward on FRS 105.

The small companies regime also excludes public companies, banks, insurers, e-money issuers and members of an **ineligible group**.`,
    },
    {
      kind: "md",
      md: `### Choosing between FRS 105 and Section 1A

FRS 105 is cheaper and simpler, and shows very little. But consider Section 1A where:
- the client has **investment property** or wants to **revalue** property (FRS 105 requires historical cost);
- a **lender** or investor wants fuller accounts;
- **deferred tax** matters to the picture (e.g. big capital allowances claims);
- the company is likely to grow out of micro status soon.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Audit exemption (CA 2006 s477)",
      md: `A company that qualifies as **small** (for years beginning on or after 6 April 2025: two of £15m turnover, £7.5m balance sheet total, 50 employees) can claim exemption from audit, **unless**:
- it's a **public company** (unless dormant), bank, insurer, e-money issuer, MiFID investment firm, UCITS manager, or has securities traded on a regulated market; or
- it was a member of a group that isn't a small group during the year (subject to the subsidiary exemption under s479A, which needs a parent guarantee); or
- members holding at least **10%** of the shares (by number or value) deposit a written notice requiring an audit, no later than **one month before the end** of the financial year (s476).

The balance sheet must include the **statements** that the company is entitled to exemption under s477, that members haven't required an audit, and that the directors acknowledge their responsibilities.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Record the decision every year",
      md: `Put a short 'framework and exemptions' note at the front of each year's file: the size tests for this year and last year, the framework chosen, audit exemption eligibility and any group or exclusion issues. It takes five minutes and catches the year a client tips over a limit.`,
    },
  ],
  scenario: {
    title: "Framework decisions for three clients (years beginning 1 April 2026)",
    narrative: `1. **Hollins Joinery Ltd**: turnover £780,000, gross assets £410,000, 7 employees. Last year (beginning 1 April 2025): turnover £690,000, gross assets £380,000, 6 employees. No investment property. Standalone company.
2. **Marsh Lane Lettings Ltd**: turnover £180,000, gross assets £2.4m (investment properties), no employees. Wants to show the properties at fair value for its bank.
3. **Tarn Valley Foods Ltd**: turnover £16.4m, gross assets £6.8m, 62 employees this year. Last year: turnover £13.9m, gross assets £6.1m, 48 employees. A shareholder with 12% wrote to the company in August 2026 asking for an audit of the year ending 31 March 2027.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Hollins Joinery.** Meets all three micro tests in both years: **micro-entity**. FRS 105 is fine; small company audit exemption available.

**Marsh Lane Lettings.** Turnover £180,000 and no employees: meets two micro tests even though gross assets exceed £500,000. It **qualifies** as micro, but FRS 105 doesn't allow fair value for investment property. Because the bank wants fair values, use **FRS 102 Section 1A**, where investment property is measured at fair value through profit or loss (with deferred tax).

**Tarn Valley Foods.** This year it exceeds two small limits (turnover £16.4m > £15m; employees 62 > 50); gross assets £6.8m is within. Last year it met all three. Under the two-year rule it **stays small** this year, because it's only the first year of exceeding. It can still use **Section 1A**.

But the shareholder holds 12% and the notice arrived in August 2026, more than one month before the year end of 31 March 2027. Under s476 the company **must have an audit** for that year, despite being small. Engage an auditor now.`,
      },
      {
        kind: "table",
        caption: "Summary",
        head: ["Client", "Size", "Framework", "Audit"],
        rows: [
          ["Hollins Joinery Ltd", "Micro", "FRS 105", "Exempt"],
          ["Marsh Lane Lettings Ltd", "Micro (by size)", "FRS 102 Section 1A (fair value needed)", "Exempt"],
          ["Tarn Valley Foods Ltd", "Small (two-year rule)", "FRS 102 Section 1A", "Required: 12% members' notice"],
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "size-classify",
      prompt: "For a standalone private company, first financial year beginning 1 May 2026, which size is it? (Two of three tests.)",
      categories: ["Micro-entity", "Small", "Medium", "Large"],
      items: [
        { text: "Turnover £950,000; gross assets £620,000; 8 employees", answer: 0, why: "Turnover and employees meet the micro tests." },
        { text: "Turnover £12m; gross assets £8m; 40 employees", answer: 1, why: "Turnover and employees within small." },
        { text: "Turnover £40m; gross assets £20m; 300 employees", answer: 2, why: "Turnover and gross assets within medium." },
        { text: "Turnover £60m; gross assets £30m; 180 employees", answer: 3, why: "Exceeds two medium limits." },
        { text: "Turnover £1.4m; gross assets £450,000; 12 employees", answer: 1, why: "Only one micro test met (gross assets), so it's small." },
      ],
      explain: "Apply the post-6 April 2025 limits and the two-of-three rule.",
    },
    {
      kind: "mcq",
      id: "two-year-rule",
      prompt:
        "A company has been small for years. In the year ended 31 March 2026 it exceeded two of the small limits for the first time. In the year ended 31 March 2027 it's back within all of them. What is its status for the year ended 31 March 2027?",
      options: ["Medium", "Small", "Micro", "It must choose"],
      answer: 1,
      explain: "It needed to exceed the limits in two consecutive years to stop being small. One year over doesn't change its status.",
    },
    {
      kind: "multi",
      id: "audit-required",
      prompt: "Which of these small private companies must still have an audit? Select all that apply.",
      options: [
        "A company whose 15% shareholder deposited a notice requiring an audit two months before the year end",
        "A small company that is a subsidiary of a large group, with no s479A parent guarantee",
        "A small standalone company with a 5% shareholder who asked for an audit",
        "A small company authorised as an e-money issuer",
        "A dormant small company",
      ],
      answers: [0, 1, 3],
      explain:
        "Members holding 10% or more can require an audit by notice at least a month before the year end; membership of a group that isn't small removes the exemption (unless s479A applies); e-money issuers are excluded. A 5% holder can't force an audit alone, and dormant companies have their own exemption.",
    },
    {
      kind: "classify",
      id: "frs105-or-1a",
      prompt: "Each client qualifies as a micro-entity by size. Is FRS 105 suitable, or should you use FRS 102 Section 1A?",
      categories: ["FRS 105 suitable", "Use FRS 102 Section 1A"],
      items: [
        { text: "A sole-director consultancy with a laptop and a bank account", answer: 0 },
        { text: "A company that wants its investment property shown at fair value", answer: 1, why: "FRS 105 doesn't permit fair value." },
        { text: "A small charity company", answer: 1, why: "Charities can't use the micro-entity regime." },
        { text: "A parent company that prepares group accounts", answer: 1, why: "Excluded from the micro regime." },
        { text: "A small trades business whose bank is happy with micro accounts", answer: 0 },
      ],
      explain: "Being within the micro limits isn't enough: check exclusions and whether the client needs fair values or fuller accounts.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-small-turnover",
      prompt: "What is the small company turnover limit for financial years beginning on or after 6 April 2025?",
      options: ["£10.2m", "£12m", "£15m", "£36m"],
      answer: 2,
      explain: "£15m (previously £10.2m).",
    },
    {
      kind: "mcq",
      id: "q-micro-bs",
      prompt: "What is the micro-entity balance sheet total limit for financial years beginning on or after 6 April 2025?",
      options: ["£316,000", "£500,000", "£1m", "£7.5m"],
      answer: 1,
      explain: "£500,000 (previously £316,000), with turnover £1m and 10 employees.",
    },
    {
      kind: "mcq",
      id: "q-frs105-dt",
      prompt: "Does FRS 105 require deferred tax to be recognised?",
      options: ["Yes", "No, deferred tax isn't recognised under FRS 105", "Only on revaluations", "Only for groups"],
      answer: 1,
      explain: "FRS 105 prohibits recognition of deferred tax (and revaluations).",
    },
    {
      kind: "mcq",
      id: "q-audit-notice",
      prompt: "What proportion of shares must members hold to require an audit of a small company?",
      options: ["5%", "10%", "25%", "50%"],
      answer: 1,
      explain: "At least 10% by number or value, by notice at least one month before the year end (s476).",
    },
    {
      kind: "mcq",
      id: "q-leases-105",
      prompt: "From 1 January 2026, how does FRS 105 treat a micro-entity's operating leases?",
      options: ["On balance sheet, like FRS 102", "It keeps the operating / finance lease distinction, so operating leases stay off balance sheet", "Leases are banned", "Only property leases go on balance sheet"],
      answer: 1,
      explain: "The Periodic Review 2024 didn't change lease accounting in FRS 105.",
    },
  ],
  sources: [
    { label: "Companies House: preparing and filing Companies House accounts (size thresholds)", url: "https://www.gov.uk/government/publications/filing-your-companies-house-accounts/life-of-a-company-part-1-accounts" },
    { label: "Audit exemption for private limited companies", url: "https://www.gov.uk/audit-exemptions-for-private-limited-companies" },
    { label: "Companies Act 2006 s382 – companies qualifying as small", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/382" },
    { label: "Companies Act 2006 s477 – small companies: conditions for exemption from audit", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/477" },
    { label: "FRC: FRS 105", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-105/" },
    { label: "ICAEW: small and micro-entity reporting compared", url: "https://www.icaew.com/technical/corporate-reporting/uk-gaap/small-and-micro-entity-reporting/small-and-micro-entity-reporting-compared" },
  ],
};
