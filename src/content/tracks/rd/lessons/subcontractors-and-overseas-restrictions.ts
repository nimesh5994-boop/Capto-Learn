import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "subcontractors-and-overseas-restrictions",
  title: "Contracted-out R&D and the overseas restrictions",
  level: "practitioner",
  minutes: 40,
  summary:
    "Under the merged scheme, who claims when R&D is contracted out (the decision-maker), how much of a contractor payment qualifies (65% unconnected; lower of payment and the contractor's costs if connected), the joint election, and the restriction on R&D carried out overseas.",
  objectives: [
    "Decide whether the customer or the contractor can claim for contracted-out R&D under the merged scheme",
    "Calculate qualifying contractor expenditure for connected and unconnected contractors",
    "Apply the overseas restriction to contractor and EPW costs, and recognise the narrow exception",
    "Advise a client who does R&D for customers on whether it can claim",
  ],
  body: [
    {
      kind: "md",
      md: `Under the old regimes, an SME could claim for R&D it subcontracted out, while a large-company customer's subcontractor could sometimes claim under RDEC for work done *for* someone else. The result was double claims and confusion. For accounting periods beginning on or after **1 April 2024**, the merged scheme and ERIS use one approach: **the company that decides to undertake the R&D is the one that claims.**`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "When R&D is 'contracted out' (CTA 2009 s1133)",
      md: `A company (A) contracts out R&D when it enters into a contract for activities that include R&D, **and** it is reasonable to assume that A **intended or contemplated** R&D of that sort when it entered into the contract. HMRC's guidance says this needs a specific appreciation of what R&D will be done; mere awareness that some problem-solving might be involved isn't enough.

- The **customer (A)** can claim for the R&D it contracts out (subject to the rules below).
- The **contractor (B)** can't claim for R&D contracted out to it, but **can** claim for its own R&D that the customer didn't intend or contemplate (e.g. where B decides how to meet a fixed-price specification and has to resolve uncertainties itself).
- If the customer is an **"irrelievable client"** (not within the charge to UK tax for that work, or an ineligible company), the contractor can claim even though it isn't the decision-maker.`,
    },
    {
      kind: "table",
      caption: "Qualifying contractor expenditure for the customer",
      head: ["Relationship", "Qualifying amount", "Legislation"],
      rows: [
        ["Unconnected contractor", "**65%** of the payment relating to UK R&D (or qualifying overseas R&D)", "CTA 2009 s1136"],
        ["Connected contractor", "The **lower of** the payment and the contractor's own relevant expenditure (staffing, EPWs, consumables, software, cloud, data) on the work, provided the contractor accounts for it under GAAP", "CTA 2009 s1134"],
        ["Unconnected, jointly elected to be treated as connected", "As for connected; election is irrevocable, made in writing within **2 years** of the end of the AP in which the contract was entered into", "CTA 2009 s1135"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Sub-subcontracting",
      md: `For a connected contractor, its payments to its *own* subcontractors aren't part of its relevant expenditure, so they don't flow through to the customer's claim. Map the supply chain before you assume the connected-party route gives a bigger figure.`,
    },
    {
      kind: "md",
      md: `### The overseas restrictions

For accounting periods beginning on or after 1 April 2024, two categories are restricted:

- **Contractor payments**: only the portion relating to R&D undertaken **in the UK** qualifies.
- **EPW payments**: only where the workers' earnings are subject to **UK PAYE** (see the staffing lesson).

The exception (CTA 2009 s1138A) applies where the R&D must take place overseas because the **conditions needed for it are not present in the UK**, are present where it's done, and it would be **wholly unreasonable** to replicate them in the UK. Conditions can be **geographical, environmental or social** (e.g. a particular disease population, terrain, climate) or **legal or regulatory** (e.g. a regulator requires a trial in that country). **Cost and the availability of workers are disregarded**: "it's cheaper in India" or "we couldn't recruit developers in the UK" never qualifies.

Staffing costs of the claimant's own employees aren't restricted by location, nor are consumables or software.

**Northern Ireland:** an NI-registered SME claiming **ERIS** isn't subject to the overseas restrictions on contractor and EPW payments (unless it can and does opt out of the NI rules). The restrictions still apply to merged RDEC claims.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Evidence for overseas work",
      md: `If a client relies on the exception, keep the evidence HMRC suggests: a vendor selection note explaining why the overseas provider was chosen, regulator correspondence, and meeting notes showing the conditions weren't available in the UK.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Clients who do R&D for their customers",
      md: `Software houses, engineering consultancies and contract research organisations used to claim for client work under the old RDEC. Under the merged scheme, if the customer intended or contemplated the R&D, the **customer** claims and the contractor can't. Read the contracts and statements of work. Where both parties might claim, HMRC treats an agreement between them about who claims as persuasive, unless it's unreasonable.`,
    },
  ],
  scenario: {
    title: "Three contractors for Calder Robotics Ltd",
    narrative: `Calder Robotics Ltd (year ended 30 September 2026, merged RDEC) is developing an autonomous crop-picking robot. It used three contractors on the project:

1. **Pennine Vision Ltd** (unconnected, UK): paid £80,000 to develop a novel fruit-recognition algorithm specified by Calder. All work in the UK.
2. **Calder Electronics Ltd** (a sister company, connected): paid £60,000 to build and test control boards. Its own costs on the work were staff £38,000, consumables £7,000 and a payment to its own subcontractor £5,000.
3. **AgriTest Brasil Ltda** (unconnected, Brazil): paid £40,000 to run field trials of the robot in Brazil because Calder wanted to test during the UK winter at lower cost.`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Decision-maker.** Calder specified each piece of R&D, so it intended the R&D: **Calder claims**, and the contractors can't claim for this work.
2. **Pennine Vision.** Unconnected, UK work: 65% × £80,000 = **£52,000**.
3. **Calder Electronics.** Connected: the lower of the payment (£60,000) and its relevant expenditure. Its relevant expenditure is staff £38,000 + consumables £7,000 = £45,000; the £5,000 paid to its own subcontractor is excluded. Qualifying: **£45,000**.
4. **AgriTest Brasil.** The R&D was undertaken wholly overseas. Is it necessary? The reasons given are seasonal timing and cost. Cost is disregarded. Could crops in a suitable growing season be found elsewhere, e.g. in UK glasshouses or by waiting for the UK season? Unless the client can show the conditions genuinely don't exist in the UK and it would be wholly unreasonable to replicate them, this is **excluded: £0**. Discuss with the client and record the reasoning.`,
      },
      {
        kind: "table",
        caption: "Qualifying contractor expenditure",
        head: ["Contractor", "Basis", "Qualifying"],
        rows: [
          ["Pennine Vision Ltd", "65% × £80,000", "£52,000"],
          ["Calder Electronics Ltd", "Lower of £60,000 and £45,000", "£45,000"],
          ["AgriTest Brasil Ltda", "Overseas, exception not met", "£0"],
          ["**Total**", "", "**£97,000**"],
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "unconnected-split",
      prompt:
        "A company pays an unconnected contractor £70,000 for R&D. The contractor did £50,000 of the work in Leeds and £20,000 at its Indian office because rates are lower there. What is the qualifying contractor expenditure?",
      answer: 32500,
      unit: "£",
      explain: "Only the UK portion qualifies (lower cost is disregarded for the overseas exception), at 65% for an unconnected contractor.",
      working: "£50,000 × 65% = **£32,500**.",
    },
    {
      kind: "numeric",
      id: "connected-lower-of",
      prompt:
        "A company pays a connected group company £120,000 for R&D carried out in the UK. The group company's relevant costs on the work were: staff £84,000, EPWs (qualifying amount) £9,000, consumables £6,000, and £15,000 paid to a further subcontractor. What is the qualifying expenditure?",
      answer: 99000,
      unit: "£",
      explain:
        "For a connected contractor, the claim is the lower of the payment and the contractor's relevant expenditure. The contractor's own payments to subcontractors aren't relevant expenditure.",
      working: "Relevant expenditure: £84,000 + £9,000 + £6,000 = £99,000. Lower of £120,000 and £99,000 = **£99,000**.",
    },
    {
      kind: "classify",
      id: "who-claims",
      prompt: "Under the merged scheme, who is entitled to claim for the R&D in each case?",
      categories: ["Customer", "Contractor", "Neither"],
      items: [
        { text: "A UK manufacturer commissions a design consultancy to solve a specific heat-dissipation problem it has identified", answer: 0, why: "The customer intended the R&D." },
        { text: "A software house delivers a fixed-price website to a café and, unknown to the café, develops a genuinely novel caching technique to meet the brief", answer: 1, why: "The customer didn't intend or contemplate that R&D." },
        { text: "A UK contract research lab does R&D for an overseas company that isn't within the charge to UK tax", answer: 1, why: "An irrelievable client: the contractor can claim." },
        { text: "A UK charity (not trading) commissions R&D from a UK lab", answer: 1, why: "A person not acting in the course of a trade within the charge is an irrelievable client." },
      ],
      explain: "The decision-maker (the party that intended or contemplated the R&D) claims. A contractor can claim for its own unintended R&D, or where the customer is an irrelievable client.",
    },
    {
      kind: "mcq",
      id: "overseas-exception",
      prompt: "Which reason could allow overseas contractor R&D to qualify under s1138A?",
      options: [
        "Developers in the UK are hard to recruit",
        "The overseas provider is 40% cheaper",
        "A regulator in that country requires the clinical trial to be run there for the product to be approved",
        "The overseas provider has a faster turnaround",
      ],
      answer: 2,
      explain: "Legal or regulatory requirements can satisfy the conditions test. Cost and availability of workers are expressly disregarded.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-decision-maker",
      prompt: "Under the merged scheme, who generally claims for contracted-out R&D?",
      options: ["Always the contractor", "The party that decides to undertake the R&D (usually the customer that intended it)", "Both parties, splitting it 50:50", "Whichever is larger"],
      answer: 1,
      explain: "The decision-maker claims; the contractor can't claim for R&D contracted out to it.",
    },
    {
      kind: "mcq",
      id: "q-unconnected-rate",
      prompt: "What proportion of a payment to an unconnected UK contractor for R&D qualifies?",
      options: ["50%", "65%", "80%", "100%"],
      answer: 1,
      explain: "65% of the relevant portion (CTA 2009 s1136).",
    },
    {
      kind: "mcq",
      id: "q-election-time",
      prompt: "Within what time must a joint election to treat an unconnected contractor as connected be made?",
      options: ["90 days", "1 year", "2 years from the end of the AP in which the contract was entered into", "With the CT600"],
      answer: 2,
      explain: "The election must be in writing within 2 years of the end of the accounting period in which the contract was entered into, and can't be extended.",
    },
    {
      kind: "mcq",
      id: "q-overseas-employees",
      prompt: "Are a claimant's own employees' staffing costs restricted if they work from an overseas office?",
      options: [
        "Yes, they are excluded",
        "No, the overseas restriction applies to contractor and EPW payments, not the claimant's own staffing costs",
        "Only for ERIS",
        "Only if they aren't directors",
      ],
      answer: 1,
      explain: "The overseas restrictions target contracted-out R&D and EPWs.",
    },
    {
      kind: "mcq",
      id: "q-overseas-cost",
      prompt: "Is lower cost a valid reason for overseas R&D to qualify?",
      options: ["Yes, if more than 30% cheaper", "No, cost is disregarded", "Yes, for SMEs", "Only for software"],
      answer: 1,
      explain: "Cost and the availability of workers are expressly disregarded under s1138A.",
    },
  ],
  sources: [
    { label: "HMRC CIRD manual: contracted-out R&D overview (CIRD161000)", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird161000" },
    { label: "HMRC CIRD manual: reformed reliefs – contractor payments (CIRD138000)", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird138000" },
    { label: "HMRC CIRD manual: overseas restrictions – conditions (CIRD151000)", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird151000" },
    { label: "HMRC CIRD manual: overseas restrictions overview (CIRD150500)", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird150500" },
    { label: "HMRC: merged R&D expenditure credit scheme and ERIS", url: "https://www.gov.uk/guidance/research-and-development-rd-tax-relief-the-merged-scheme-and-enhanced-rd-intensive-support" },
  ],
};
