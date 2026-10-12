import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "statutory-residence-test",
  title: "The Statutory Residence Test",
  level: "advanced",
  minutes: 40,
  taxYear: "2026/27",
  summary:
    "Whether someone is UK resident decides whether their worldwide income is taxable here. Working through the Statutory Residence Test in the right order (automatic overseas tests, automatic UK tests, then the sufficient ties test), counting days, the five ties, and an introduction to split years.",
  objectives: [
    "Count UK days correctly, including the deeming rule and exceptional circumstances",
    "Apply the automatic overseas and automatic UK tests in the right order",
    "Identify UK ties and apply the sufficient ties tables for arrivers and leavers",
    "Recognise when split-year treatment may apply",
  ],
  body: [
    {
      kind: "md",
      md: `Since 6 April 2013 an individual's UK residence for a tax year has been decided by the **Statutory Residence Test (SRT)** in FA 2013 Schedule 45. Residence matters because a **UK resident** is generally taxed on **worldwide** income and gains (subject to the FIG regime for new arrivals, covered in the next lesson), while a **non-resident** is generally taxed only on **UK-source** income, such as UK rents, and on gains on UK land.

Residence is decided for the **whole tax year**. If the year needs to be split into a UK part and an overseas part, that's done separately, under the split-year rules.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Work through the tests in this order",
      md: `1. **Automatic overseas tests.** If any one is met, the person is **non-resident**. Stop.
2. **Automatic UK tests.** If any one is met (and no overseas test was), they're **resident**. Stop.
3. **Sufficient ties test.** Compare UK days with the number of UK ties.`,
    },
    {
      kind: "md",
      md: `### Counting days

A **day spent in the UK** is a day on which the person is present in the UK **at midnight**. Days in transit (arriving and leaving the next day without doing anything unrelated to the journey) don't count. Up to **60 days** a year can be ignored if the person was here only because of **exceptional circumstances** beyond their control, such as sudden serious illness or a national emergency, and intended to leave.

**Deeming rule:** someone who was UK resident in at least one of the previous 3 tax years and has at least **3 UK ties** must also count days on which they were in the UK at some point but **not at midnight**, beyond the first **30** such days. This stops people from arranging to leave just before midnight.`,
    },
    {
      kind: "table",
      caption: "Automatic overseas tests: meeting any one makes the person non-resident",
      head: ["Test", "Conditions"],
      rows: [
        ["First", "UK resident in **one or more** of the previous 3 tax years, and **fewer than 16** days in the UK in the year"],
        ["Second", "UK resident in **none** of the previous 3 tax years, and **fewer than 46** days in the UK"],
        ["Third", "Works **full-time overseas** over the year (average 35 hours a week), with **fewer than 91** days in the UK and **fewer than 31** days on which they work more than 3 hours in the UK, and no significant break from the overseas work"],
      ],
    },
    {
      kind: "table",
      caption: "Automatic UK tests: meeting any one (with no overseas test met) makes the person resident",
      head: ["Test", "Conditions"],
      rows: [
        ["First", "**183 days or more** in the UK in the tax year"],
        ["Second", "Has a **UK home** for a period of at least 91 consecutive days, at least 30 of which fall in the year, and is present there on at least 30 days in the year, while having no overseas home or spending fewer than 30 days in any overseas home"],
        ["Third", "Works **full-time in the UK** for a period of 365 days falling at least partly in the year, with more than 75% of their working days in that period being UK work days"],
      ],
    },
    {
      kind: "md",
      md: `### The sufficient ties test

If neither set of automatic tests decides it, count the person's **UK ties** for the year:

| Tie | Broadly, the person has it if… |
|---|---|
| **Family** | Their spouse, civil partner, cohabiting partner or minor child is UK resident (with limited exceptions for children in UK education) |
| **Accommodation** | They have a place to live in the UK available for at least 91 consecutive days in the year, and spend at least one night there (16 nights if it's a close relative's home) |
| **Work** | They work in the UK (more than 3 hours a day) on at least 40 days in the year |
| **90-day** | They spent more than 90 days in the UK in either of the previous 2 tax years |
| **Country** | *Leavers only:* the UK is the country where they were present at midnight most often in the year |

"Leavers" are people who were UK resident in at least one of the previous 3 tax years. "Arrivers" weren't resident in any of them.`,
    },
    {
      kind: "table",
      caption: "How many ties make someone UK resident?",
      head: ["Days in the UK", "Leaver (resident in 1+ of previous 3 years)", "Arriver (resident in none of previous 3 years)"],
      rows: [
        ["Fewer than 16", "Always non-resident (first automatic overseas test)", "Always non-resident"],
        ["16 to 45", "4 or more ties", "Always non-resident (second automatic overseas test)"],
        ["46 to 90", "3 or more ties", "All 4 ties"],
        ["91 to 120", "2 or more ties", "3 or more ties"],
        ["121 to 182", "1 or more ties", "2 or more ties"],
        ["183 or more", "Always resident (first automatic UK test)", "Always resident"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Leaving is harder than arriving",
      md: `A leaver needs **fewer** ties to stay resident than an arriver needs to become resident. Clients emigrating often assume that leaving the UK on a particular date makes them non-resident. If they keep a UK home, a UK-resident spouse and come back often, they can stay UK resident for years. Map out their days and ties **before** they leave.`,
    },
    {
      kind: "md",
      md: `### Split years

A person who is UK resident for the year can have it **split** into a UK part and an overseas part if their circumstances match one of the **eight split-year cases** in Schedule 45 Part 3. Cases 1 to 3 cover leaving the UK (for example, to start full-time work abroad, or as the partner of someone who does). Cases 4 to 8 cover arriving (for example, starting to have only a home in the UK, or starting full-time work here). Split-year treatment is **automatic** if a case applies. It's claimed on the residence pages (**SA109**), and the overseas part is then taxed as if the person were non-resident, with some exceptions.

Keep a **day count diary** and evidence (travel tickets, passport stamps, employment contracts) for any client near the boundaries. HMRC's guidance note **RDR3** and the RFIG manual include detailed examples.`,
    },
  ],
  scenario: {
    title: "Is Marcus still UK resident in 2026/27?",
    narrative: `Marcus has lived in the UK all his life. In June 2026 he moved to Lisbon to semi-retire and do some consultancy, mainly remotely. During 2026/27:
- he spends **105 days** in the UK (counting only midnights), visiting family and working on some UK projects,
- he works in the UK for more than 3 hours on **25 days**,
- his wife stays in their **Surrey house** until it's sold; it's sold in March 2027,
- he stays at the Surrey house whenever he visits,
- he spent 365 days in the UK in 2025/26,
- he spends 160 midnights in Portugal and 100 in other countries.

His consultancy is less than 35 hours a week on average, so the full-time work abroad test can't apply.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Automatic overseas tests.** He was UK resident in the previous 3 years, so the first test needs fewer than 16 days. He spent 105, so it's **not met**. The second test only applies to arrivers. The third (full-time work abroad) isn't met. None apply.

**Automatic UK tests.** Fewer than 183 days. The house in Surrey is a UK home, but he has a home in Lisbon where he spends well over 30 days, so the "only home" test isn't met. He doesn't work full-time in the UK. None apply.

**Sufficient ties test** (leaver, 91 to 120 days, so **2 ties** are needed):`,
      },
      {
        kind: "table",
        caption: "Marcus's UK ties for 2026/27",
        head: ["Tie", "Has it?", "Why"],
        rows: [
          ["Family", "Yes", "His wife is UK resident for the year"],
          ["Accommodation", "Yes", "The Surrey house is available to him all year and he stays there"],
          ["Work", "No", "25 UK work days, which is fewer than 40"],
          ["90-day", "Yes", "More than 90 days in the UK in 2025/26"],
          ["Country", "No", "More midnights in Portugal (160) than in the UK (105)"],
        ],
      },
      {
        kind: "md",
        md: `Marcus has **3 ties** but only needs 2, so he's **UK resident for 2026/27**. His worldwide income, including his Portuguese consultancy fees, is taxable in the UK for the year, unless split-year treatment applies (check the leaving cases) or the UK–Portugal double tax treaty gives relief.

**Looking ahead to 2027/28:** once the house is sold and his wife joins him, he'll lose the family and accommodation ties. With only the 90-day tie (if he spent more than 90 days here in 2026/27), he could spend up to 120 days in the UK and still be non-resident. Help him plan his days.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "automatic-tests",
      prompt: "Apply the automatic tests only. What is each person's status for 2026/27?",
      categories: ["Non-resident (automatic overseas test)", "Resident (automatic UK test)", "Go to the sufficient ties test"],
      items: [
        { text: "UK resident for the previous 10 years; 12 days in the UK this year", answer: 0, why: "First automatic overseas test: fewer than 16 days." },
        { text: "Never been UK resident; 40 days in the UK this year", answer: 0, why: "Second automatic overseas test: fewer than 46 days." },
        { text: "Arrived from Canada; 190 days in the UK this year", answer: 1, why: "183 days or more." },
        { text: "UK resident in all previous years; 60 days in the UK; no full-time work abroad", answer: 2 },
        { text: "Never UK resident before; 100 days in the UK; homes in both the UK and the US", answer: 2 },
      ],
      explain: "Check the automatic overseas tests first, then the automatic UK tests. If neither decides it, the sufficient ties test applies.",
    },
    {
      kind: "numeric",
      id: "ties-needed",
      prompt:
        "Elena moved to the UK from Spain in 2026/27. She had never been UK resident before. She spends 130 days in the UK in the year and doesn't meet any automatic test. What is the **minimum number of UK ties** that would make her UK resident?",
      answer: 2,
      unit: "",
      tolerance: 0,
      explain: "She's an arriver (not resident in any of the previous 3 years). For an arriver with 121 to 182 days, 2 ties are enough.",
      working: "Arriver table, 121 to 182 days: **2** ties.",
    },
    {
      kind: "numeric",
      id: "days-count",
      prompt:
        "During 2026/27 a non-resident client flies into Heathrow on 12 separate trips. On each trip they arrive in the morning and leave on a flight before midnight the same day. They have only 1 UK tie. On a further 40 days they're in the UK at midnight. How many **days spent in the UK** do they have for the SRT?",
      answer: 40,
      unit: "days",
      tolerance: 0,
      explain: "Only days present at midnight count. The deeming rule (counting non-midnight days beyond 30) only applies to someone with at least 3 UK ties who was resident in one of the previous 3 years, and in any case there are only 12 such days.",
      working: "Midnight days: **40**. The 12 same-day visits don't count.",
    },
    {
      kind: "mcq",
      id: "leaver-ties",
      prompt:
        "A leaver (UK resident in each of the last 3 years) spends 50 days in the UK in 2026/27. They have a UK-resident spouse and a UK home they use on visits, but no work tie, no 90-day tie and no country tie. Are they UK resident?",
      options: ["Yes: 2 ties is enough for 46 to 90 days", "No: a leaver with 46 to 90 days needs 3 ties", "Yes: anyone with a UK home is resident", "No: anyone with fewer than 91 days is non-resident"],
      answer: 1,
      explain: "A leaver with 46 to 90 days needs 3 or more ties. With only 2 (family and accommodation), they're non-resident.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-183",
      prompt: "What is the first automatic UK test?",
      options: ["Owning a UK home", "Spending 183 days or more in the UK in the tax year", "Having a UK bank account", "Being a British citizen"],
      answer: 1,
      explain: "183 or more UK days in the tax year makes a person resident, as long as no automatic overseas test is met first.",
    },
    {
      kind: "mcq",
      id: "q-16-days",
      prompt: "A person was UK resident last year and spends 14 days in the UK this year. What is their status?",
      options: ["Resident", "Non-resident under the first automatic overseas test", "It depends on their ties", "Split year automatically"],
      answer: 1,
      explain: "Fewer than 16 days, with UK residence in one or more of the previous 3 years, means automatically non-resident.",
    },
    {
      kind: "mcq",
      id: "q-midnight",
      prompt: "When does a day count as a day spent in the UK for the SRT?",
      options: ["Any day the person sets foot in the UK", "When the person is in the UK at midnight", "Only working days", "Only full 24-hour days"],
      answer: 1,
      explain: "Presence at midnight is the general rule, subject to the transit exception, exceptional circumstances and the deeming rule.",
    },
    {
      kind: "mcq",
      id: "q-country-tie",
      prompt: "Which UK tie applies only to leavers?",
      options: ["Family tie", "Work tie", "Country tie", "90-day tie"],
      answer: 2,
      explain: "The country tie is only considered for people who were UK resident in at least one of the previous 3 tax years.",
    },
    {
      kind: "mcq",
      id: "q-work-tie",
      prompt: "How many UK work days (more than 3 hours) give someone a work tie?",
      options: ["At least 16", "At least 31", "At least 40", "At least 91"],
      answer: 2,
      explain: "Working in the UK for more than 3 hours on at least 40 days in the tax year gives a work tie.",
    },
    {
      kind: "mcq",
      id: "q-split",
      prompt: "Where is split-year treatment reported?",
      options: ["On the SA100 main return only", "On the residence pages (SA109)", "By letter to HMRC", "It can't be reported"],
      answer: 1,
      explain: "Residence, split-year treatment and the FIG regime are reported on the SA109 residence pages.",
    },
  ],
  sources: [
    { label: "Guidance note for the Statutory Residence Test (RDR3)", url: "https://www.gov.uk/government/publications/rdr3-statutory-residence-test-srt/guidance-note-for-statutory-residence-test-srt-rdr3" },
    { label: "HMRC Residence and FIG Regime manual", url: "https://www.gov.uk/hmrc-internal-manuals/residence-and-fig-regime-manual" },
    { label: "Finance Act 2013 Schedule 45 – statutory residence test", url: "https://www.legislation.gov.uk/ukpga/2013/29/schedule/45" },
    { label: "Tax on foreign income: UK residence and tax", url: "https://www.gov.uk/tax-foreign-income/residence" },
  ],
};
