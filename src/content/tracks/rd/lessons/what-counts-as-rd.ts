import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "what-counts-as-rd",
  title: "What counts as R&D for tax purposes",
  level: "foundation",
  minutes: 35,
  summary:
    "The DSIT Guidelines definition of R&D: an advance in science or technology, achieved by resolving scientific or technological uncertainty that a competent professional couldn't readily resolve. The test every claim stands or falls on.",
  objectives: [
    "Explain where the tax definition of R&D comes from (CTA 2010 s1138 and the DSIT Guidelines)",
    "Apply the 'advance in science or technology' and 'scientific or technological uncertainty' tests to a client's project",
    "Identify the competent professional and explain why their view matters",
    "Recognise that an advance must be in the overall field, not just new to the client",
  ],
  body: [
    {
      kind: "md",
      md: `Every R&D tax relief claim depends on one question before any numbers are looked at: **is the work actually R&D as the tax legislation defines it?** Most rejected claims fail at this stage. The costs might be accurate, but the project was never R&D.

The tax definition is **not** the everyday meaning of "research and development", and it's not what a client's marketing team calls innovation. It's a specific test set by legislation and by guidelines issued by the Department for Science, Innovation and Technology (**DSIT**). Before 2023 the same guidelines were issued by BEIS, and before that by BIS and the DTI, so older claims and articles refer to the "BEIS Guidelines".`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The statutory definition",
      md: `CTA 2010 s1138 (and the parallel ITA 2007 s1006) say R&D means activities that fall to be treated as R&D under **GAAP**, as modified by the **guidelines** issued by the Secretary of State (the DSIT Guidelines).

The core of the Guidelines (para 3):
> R&D for tax purposes takes place when a project seeks to achieve an advance in science or technology.

The activities that **directly contribute** to achieving that advance, by **resolving scientific or technological uncertainty**, are R&D. Certain **qualifying indirect activities** are R&D too (covered in the next lesson).`,
    },
    {
      kind: "table",
      caption: "The key terms in the DSIT Guidelines",
      head: ["Term", "What it means in practice", "Guidelines"],
      rows: [
        ["Science", "Systematic study of the nature and behaviour of the physical and material universe. Mathematical advances count as science from April 2023. Excludes arts, humanities and social sciences, including economics.", "paras 15A–16"],
        ["Technology", "The practical application of scientific principles and knowledge.", "para 17"],
        ["Advance", "An increase in overall knowledge or capability in a field of science or technology, not just the company's own knowledge.", "paras 6–12, 20–22"],
        ["Uncertainty", "Whether something is scientifically possible or technologically feasible, or how to achieve it in practice, is not readily available or deducible by a competent professional.", "paras 13–14"],
        ["Competent professional", "Someone working in the field who knows the current state of knowledge and practice. Their view sets the baseline and judges whether uncertainty is real.", "paras 13–14, 20, 23"],
        ["Project", "Activities carried out to a method or plan to achieve an advance. A wider commercial project can contain an R&D project, but the commercial parts don't become R&D.", "para 19"],
      ],
    },
    {
      kind: "md",
      md: `### The advance: new to the world, not new to the client

An advance is measured against the **baseline of knowledge and capability in the field** at the time the project started: what is publicly available or readily deducible by a competent professional (para 20). It's not enough that the client hasn't done it before. Routine copying or adaptation of an existing product is not an advance, even if it's completely new to the company (para 22).

Two points often missed: work can still be an advance if a competitor has achieved it but **keeps the method a trade secret** (paras 11 and 21), and a project that **fails** to achieve its advance is still R&D (para 10).

The Guidelines (para 9) give the kinds of project that are R&D. A project that seeks to:
- **extend overall knowledge** or capability in a field of science or technology
- **create a process, material, device, product or service** that incorporates or represents an increase in overall knowledge or capability
- make an **appreciable improvement** to an existing process, material, device, product or service through scientific or technological changes
- use science or technology to **duplicate the effect** of an existing process, material, device, product or service in a new or appreciably improved way, for example a product with exactly the same performance but made in a fundamentally new way

An "appreciable" improvement means more than a minor or routine upgrade. It's the kind of change a competent professional would recognise as a genuine and non-trivial improvement.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "The most common misunderstanding",
      md: `"It's never been done before" is **not** the test. A bespoke website, a new recipe, a one-off building design or a new app for a client can be completely novel *as a product* and still involve no scientific or technological uncertainty at all, because a competent professional could build it using known techniques.

Ask instead: **what did the team not know how to do, that a competent professional in the field also couldn't readily work out?**`,
    },
    {
      kind: "md",
      md: `### Uncertainty: the heart of the claim

Scientific or technological uncertainty exists when knowledge of whether something is scientifically possible or technologically feasible, or how to achieve it in practice, **is not readily available or deducible by a competent professional** working in the field (para 13).

That includes **system uncertainty**: where each component is well understood but how to combine them into a working system isn't readily deducible.

Uncertainties that a competent professional could resolve easily, for example through routine testing, a known method or a quick search of published literature, **don't count** (para 14). Neither does the routine uncertainty that comes with any business project, such as whether it will be finished on time, on budget or will sell.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Find the competent professional early",
      md: `The competent professional is usually the client's own technical lead, such as the CTO, head of engineering or lead chemist. **Interview that person yourself**, not just the finance director. Ask them to describe:
1. The baseline: what was known and possible in the field when the project started?
2. The advance they were aiming for
3. The specific uncertainties, and why a peer couldn't have readily resolved them
4. What they tried, what failed, and what they learned

If they can't answer those four questions in plain language, the claim is at risk.`,
    },
    {
      kind: "callout",
      tone: "example",
      title: "Same sector, different answers",
      md: `- A software house builds an online booking system for a gym using a standard framework and database. **Not R&D**: there's no technological uncertainty for a competent developer.
- The same software house develops a new compression algorithm so video can be analysed on low-power devices at a speed the field doesn't currently achieve. **Potentially R&D**: it seeks an advance in capability, and how to achieve it isn't readily deducible.`,
    },
  ],
  scenario: {
    title: "Ferncroft Engineering Ltd: is the new valve project R&D?",
    narrative: `Ferncroft Engineering Ltd makes industrial valves in Sheffield. The finance director, Gareth Holt, emails: *"An R&D company rang us and says we could claim £60k back for our new product line. Can you look at it?"*

You speak to the engineering manager, Dr Anika Shah. She describes two projects from the year to 31 March 2026:

1. **ValveLine 2**: a refreshed range of existing valves with new colours, a new brand, and a redesigned casing to make them look more modern. Engineering used standard CAD and existing manufacturing methods.
2. **Cryo-seal**: a valve seal that keeps working at −196°C (liquid nitrogen). Existing polymer seals in the industry crack at that temperature. Published research doesn't explain how to make a polymer seal that stays flexible and leak-tight through repeated cycles. Anika's team tested 14 compound formulations; nine failed during thermal cycling before one worked.`,
    walkthrough: [
      {
        kind: "md",
        md: `Take each project through the test in order.

**ValveLine 2**
1. *Advance sought?* No. Colours, branding and the look of the casing are aesthetic choices, not an advance in science or technology.
2. *Uncertainty?* None. A competent mechanical engineer could design the casing using known methods.
3. **Conclusion: not R&D.** None of its costs can be claimed.

**Cryo-seal**
1. *Baseline:* the industry's polymer seals fail at cryogenic temperatures. That's the current state of the field, not just Ferncroft's own experience.
2. *Advance sought:* a seal that performs reliably at −196°C, an appreciable improvement in capability.
3. *Uncertainty:* how to formulate a compound that stays flexible through thermal cycling wasn't available in published knowledge or deducible by a competent materials engineer. The nine failed formulations are good evidence of real uncertainty.
4. **Conclusion: likely R&D**, from the point the team started working on the formulation problem until a working prototype seal was proven.`,
      },
      {
        kind: "table",
        caption: "Summary for the file",
        head: ["Project", "Advance?", "Uncertainty?", "R&D?"],
        rows: [
          ["ValveLine 2 (rebrand and casing redesign)", "No: aesthetic", "No: routine engineering", "No"],
          ["Cryo-seal", "Yes: seal performance beyond the field's baseline", "Yes: formulation not readily deducible", "Likely yes"],
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "What to tell the client",
        md: `Reply to Gareth that only Cryo-seal is likely to qualify, and that you'll need Anika's technical narrative and the failed test records to support it. Warn him that the cold caller's "£60k" figure was produced before anyone had checked which projects qualify.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-projects",
      prompt: "For each project, decide whether it's likely to meet the DSIT definition of R&D.",
      categories: ["Likely R&D", "Not R&D"],
      items: [
        { text: "Developing a battery chemistry that holds charge at −30°C better than anything published", answer: 0 },
        { text: "Building a bespoke e-commerce website for a fashion retailer using Shopify", answer: 1, why: "Known platform and methods, so no technological uncertainty." },
        { text: "A market research study into why customers prefer one product", answer: 1, why: "Social science and commercial research are excluded." },
        { text: "Designing a new sofa range with a more attractive shape", answer: 1, why: "Aesthetic design is not an advance in science or technology." },
        { text: "Developing a process to recycle a composite material that no one has yet separated economically at scale", answer: 0 },
        { text: "Researching the economic impact of a new tax on a client's sector", answer: 1, why: "Economics is a social science and is excluded from 'science'." },
      ],
      explain:
        "R&D needs an advance in science or technology in the field and real scientific or technological uncertainty. Aesthetic, commercial, social science and routine implementation work doesn't meet that test, however new the product is to the market.",
    },
    {
      kind: "mcq",
      id: "baseline",
      prompt:
        "A client's developers have never built a mobile app before. They spend six months learning to build one using standard tools, and it works well. Is this R&D?",
      options: [
        "Yes: it was new and uncertain for the company",
        "No: the advance must be in overall knowledge in the field, not the company's own knowledge",
        "Yes, as long as the app is sold commercially",
        "Only the first three months qualify",
      ],
      answer: 1,
      explain:
        "The Guidelines measure an advance against overall knowledge or capability in the field. A competent app developer could build this using standard tools, so the company's own learning curve isn't R&D.",
    },
    {
      kind: "multi",
      id: "uncertainty-evidence",
      prompt: "Which of these are good evidence that a project faced genuine technological uncertainty? Select all that apply.",
      options: [
        "Records of several failed prototypes and why each one failed",
        "The project went over budget",
        "A literature search showing no published method solved the problem",
        "The client's sales team said the product was 'cutting edge'",
        "A technical lead's explanation of why a peer couldn't readily resolve the problem",
        "The project took longer than planned because a supplier was late",
      ],
      answers: [0, 2, 4],
      explain:
        "Uncertainty is about whether something is technologically possible or how to do it. Failed iterations, a literature search and a competent professional's reasoned view all go to that. Budget overruns, supplier delays and marketing language are business uncertainties, not technological ones.",
    },
    {
      kind: "numeric",
      id: "rd-months",
      prompt:
        "A project ran from 1 January to 31 December 2025. January and February were spent on market research and a business plan. Technical work on the uncertainty started on 1 March. A working prototype that resolved the uncertainty was proven on 31 August. From September the team prepared the product for manufacture using known methods. For how many months of the project was R&D taking place?",
      answer: 6,
      unit: "months",
      explain:
        "R&D starts when work to resolve the scientific or technological uncertainty begins, and ends when the uncertainty is resolved, for example when a working prototype is proven. Market research beforehand and production work afterwards aren't R&D.",
      working: "1 March to 31 August = March, April, May, June, July, August = **6 months**.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-source",
      prompt: "Which guidelines define R&D for UK tax purposes for claims today?",
      options: ["The OECD Frascati Manual", "The DSIT Guidelines (formerly the BEIS Guidelines)", "FRS 102 Section 18 alone", "HMRC's R&D boutique code of practice"],
      answer: 1,
      explain: "CTA 2010 s1138 points to GAAP read with the guidelines issued by the Secretary of State, now the Department for Science, Innovation and Technology.",
    },
    {
      kind: "mcq",
      id: "q-social-science",
      prompt: "A client's project advances understanding of consumer behaviour using new statistical surveys. Is it R&D for tax?",
      options: ["Yes: it's research", "Yes: statistics is maths", "No: social sciences are excluded from 'science' in the Guidelines", "Only if it uses AI"],
      answer: 2,
      explain: "The Guidelines exclude arts, humanities and social sciences, including economics. Using maths as a tool doesn't turn a social science project into R&D.",
    },
    {
      kind: "mcq",
      id: "q-competent",
      prompt: "Who is the 'competent professional' for an R&D claim?",
      options: [
        "The company's accountant",
        "An HMRC inspector",
        "A person working in the relevant field who knows the current state of knowledge and practice",
        "Any director of the company",
      ],
      answer: 2,
      explain: "The competent professional is someone knowledgeable in the field, usually the client's technical lead. Their view on the baseline and the uncertainties is central to the claim.",
    },
    {
      kind: "mcq",
      id: "q-system",
      prompt: "A client combines three well-understood technologies, but how to make them work together reliably isn't readily deducible. What kind of uncertainty is that?",
      options: ["Business uncertainty", "System uncertainty, which can qualify", "Not uncertainty, because each part is known", "Commercial uncertainty"],
      answer: 1,
      explain: "The Guidelines recognise system uncertainty: the components are known but combining them into a working system isn't readily deducible by a competent professional.",
    },
    {
      kind: "mcq",
      id: "q-appreciable",
      prompt: "Which of these best describes an 'appreciable improvement'?",
      options: [
        "Any change the client's customers notice",
        "A genuine, non-trivial improvement through scientific or technological change that a competent professional would recognise",
        "Any improvement that increases sales by 10% or more",
        "A change to the product's appearance",
      ],
      answer: 1,
      explain: "Appreciable means more than minor or routine, judged by a competent professional, and achieved through scientific or technological change, not cosmetic or commercial change.",
    },
  ],
  sources: [
    { label: "DSIT Guidelines: meaning of R&D for tax purposes", url: "https://www.gov.uk/government/publications/guidelines-on-the-meaning-of-research-and-development-for-tax-purposes/meaning-of-research-and-development-for-tax-purposes-guidelines" },
    { label: "CIRD81910: DSIT Guidelines (2023) text", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird81910" },
    { label: "CTA 2010 s1138: research and development", url: "https://www.legislation.gov.uk/ukpga/2010/4/section/1138" },
    { label: "HMRC GfC3: how to identify qualifying R&D activities", url: "https://www.gov.uk/government/publications/help-to-see-if-your-work-qualifies-as-research-and-development-for-tax-purposes-gfc3/how-to-identify-qualifying-rd-activities-part-4" },
  ],
};
