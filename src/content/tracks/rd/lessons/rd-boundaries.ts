import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "rd-boundaries",
  title: "The boundaries: where R&D starts, stops and what's excluded",
  level: "foundation",
  minutes: 35,
  summary:
    "Drawing the project boundary correctly: direct R&D activities, qualifying indirect activities, and the work that never qualifies, such as commercial steps, aesthetics, content, production and routine fixes.",
  objectives: [
    "Separate activities that directly contribute to resolving uncertainty from those that don't",
    "Identify the qualifying indirect activities in DSIT Guidelines para 31",
    "Apply the start and end points of R&D (paras 33–34) to a real project timeline",
    "Explain why aesthetic design, content and software built on standard tools usually fall outside R&D",
  ],
  body: [
    {
      kind: "md",
      md: `Once you've established that a project seeks an advance and faces real uncertainty, the next job is to draw its **boundary**. Not everything the client did on the project is R&D. Claims are routinely overstated by including the whole commercial project, from market research to product launch, rather than just the part that resolved the uncertainty.

The DSIT Guidelines split activity into three groups:
1. **Activities that directly contribute** to resolving the scientific or technological uncertainty (paras 26–27). These are R&D.
2. **Qualifying indirect activities** (QIAs) listed in para 31. These are also R&D, even though they don't resolve the uncertainty themselves.
3. **Everything else.** Not R&D.`,
    },
    {
      kind: "table",
      caption: "Direct R&D, qualifying indirect activities, and excluded work",
      head: ["Category", "Examples", "Guidelines"],
      rows: [
        ["Direct R&D", "Scientific or technological planning; design, testing and analysis to resolve the uncertainty; creating software, materials or equipment solely for use in the R&D", "paras 26–27, 36"],
        ["Qualifying indirect activity", "Writing up the original R&D findings; admin, finance and HR **insofar as done for the R&D**; recruiting and paying R&D staff; maintaining R&D equipment; training needed for the project; feasibility studies to direct a specific R&D activity", "para 31"],
        ["Not R&D", "Commercial and financial steps (market research, raising finance, IP and legal work); non-technological aspects of the product; production and distribution; general support services such as cleaning and security not done for the R&D", "paras 28, 37"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "When R&D starts and ends",
      md: `**Para 33:** R&D begins when work to resolve the scientific or technological uncertainty starts, and ends when that uncertainty is resolved or work to resolve it stops. Working out the product requirements, where no scientific or technological questions arise, isn't R&D.

**Para 34:** R&D ends when knowledge is codified in a form a competent professional can use, or when a **prototype or pilot plant with all the functional characteristics** of the final product or process is produced.

After that point, making copies of the prototype, tooling up for production, user trials of consumer reactions and routine bug fixing are not R&D, unless a new genuine uncertainty appears (para 35).`,
    },
    {
      kind: "md",
      md: `### Aesthetic design and content

- **Cosmetic and aesthetic qualities** are not science or technology (para 42). Making a product look better isn't R&D, **unless** achieving the look needs a technological advance. For example, a new coating process that produces a colour effect nobody can currently achieve could be R&D.
- **Content delivered through technology** isn't itself technology (para 43). Writing the lessons for an e-learning platform, the levels of a video game or a website's copy isn't R&D. Building a genuinely new way to create, manipulate or transfer content could be.

### Software

Software is judged by exactly the same test as any other field. The Guidelines' examples make clear that adapting or configuring software using routine methods isn't R&D, even if the business outcome is new. Typical non-qualifying software work:
- building an app or website on a standard framework or platform
- integrating known APIs in a standard way
- user-interface design and look and feel
- routine bug fixing and testing after release`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Finance and HR staff time is limited",
      md: `QIAs include finance, HR and admin activity **only insofar as it's undertaken for the R&D**. A finance director preparing the company's annual accounts, or HR running general recruitment, is not doing R&D, even though R&D staff are paid out of that payroll.

HMRC's guidance on staffing costs (CIRD133000) makes the same point: the costs of corporate HR or finance departments supporting the whole business don't qualify.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Draw the project as a timeline",
      md: `On the file, draw each project as a timeline with three bands: **before** the uncertainty work started, the **R&D window** (start of work on the uncertainty to resolution), and **after**. Then ask each person on the team what they did and when. Staff costs can only be claimed for time within the window, on direct R&D or a QIA.`,
    },
    {
      kind: "callout",
      tone: "example",
      title: "Abortive projects still count",
      md: `A project that fails is still R&D if it sought an advance and the work tried to resolve the uncertainty (paras 10 and 38). If a client spent nine months trying to make a sensor work in seawater and then abandoned it, those nine months can qualify. A failed project is often strong evidence that the uncertainty was real.`,
    },
  ],
  scenario: {
    title: "Lumen Ledger Ltd: drawing the boundary on a fintech project",
    narrative: `Lumen Ledger Ltd is a 12-person software company in Leeds. In the year to 31 December 2025 it built a product that matches bank transactions to invoices automatically. Its CTO, Tom Reeve, explains that the hard part was a new matching method: existing approaches failed when bank references were truncated or misspelled, and published techniques didn't get close to the accuracy they needed. The team tested several approaches before reaching 97% accuracy in May.

The timeline:
- **Jan:** market research with accountancy firms and a pricing model
- **Feb–May:** designing and testing the matching method (the uncertain part)
- **June:** writing up the method and results for the internal knowledge base
- **July–Sept:** building the user interface, styling and onboarding screens on a standard framework
- **Oct–Dec:** marketing launch, customer support, and fixing small bugs reported by users

The developer, Hannah, worked full time on the project all year.`,
    walkthrough: [
      {
        kind: "md",
        md: `Work through the timeline against the Guidelines:

1. **January, market research and pricing:** commercial steps (para 28(a), para 37). **Not R&D.**
2. **February to May, matching method:** design, testing and analysis to resolve the technological uncertainty (para 27). **Direct R&D.**
3. **June, writing up the findings:** preparing the original report of R&D findings is a QIA (para 31(a)). **R&D.**
4. **July to September, user interface:** standard framework, aesthetic and non-technological aspects (paras 28(b), 42). **Not R&D.**
5. **October to December, launch and bug fixes:** commercial and routine work after the uncertainty was resolved (paras 28, 35). **Not R&D.**`,
      },
      {
        kind: "table",
        caption: "Hannah's time on the project",
        head: ["Months", "Activity", "R&D?", "Months counted"],
        rows: [
          ["Jan", "Market research", "No", "0"],
          ["Feb–May", "Matching method", "Yes: direct", "4"],
          ["Jun", "Writing up findings", "Yes: QIA", "1"],
          ["Jul–Sep", "User interface", "No", "0"],
          ["Oct–Dec", "Launch and bug fixes", "No", "0"],
          ["**Total**", "", "", "**5 of 12 (41.7%)**"],
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Evidence to keep",
        md: `Ask Tom for the test results comparing each matching approach and the June write-up. Ask Hannah to confirm her time split, ideally from timesheets or sprint records. HMRC frequently asks how staff time percentages were arrived at.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-activities",
      prompt: "For a qualifying R&D project, classify each activity.",
      categories: ["Direct R&D", "Qualifying indirect activity", "Not R&D"],
      items: [
        { text: "Testing prototype formulations to see which survives heat cycling", answer: 0 },
        { text: "Payroll clerk processing the R&D team's salaries", answer: 1, why: "Paying R&D staff is an ancillary activity essential to the R&D (para 31(c))." },
        { text: "Applying for a patent on the result", answer: 2, why: "IP and legal work are commercial steps (para 28(a))." },
        { text: "Designing the product packaging", answer: 2, why: "Aesthetic and non-technological." },
        { text: "Scientific planning to identify which uncertainties to test first", answer: 0, why: "Scientific or technological planning is direct R&D (para 36)." },
        { text: "Training a technician on a specialist instrument needed for the project", answer: 1, why: "Training required to directly support the R&D project (para 31(d))." },
        { text: "Making 500 copies of the final prototype for sale", answer: 2, why: "Production, after the uncertainty has been resolved." },
      ],
      explain:
        "Direct R&D actually attempts to resolve the uncertainty. QIAs are the specific support activities in para 31, only to the extent they serve the R&D. Commercial, aesthetic and production work is excluded.",
    },
    {
      kind: "numeric",
      id: "staff-percentage",
      prompt:
        "An engineer works on a project for a full 12-month year. Months 1–2: gathering customer requirements (no technical questions). Months 3–8: testing designs to resolve the technological uncertainty. Month 9: writing up the R&D findings. Months 10–12: preparing drawings for production. What percentage of the engineer's time is R&D? (Answer to one decimal place.)",
      answer: 58.3,
      tolerance: 0.1,
      unit: "%",
      explain:
        "Requirements gathering without technical questions comes before the R&D starts (para 33). Months 3–8 are direct R&D and month 9 is a QIA (writing up findings). Production drawings come after the uncertainty is resolved.",
      working: "6 months direct + 1 month QIA = 7 months. 7 ÷ 12 = **58.3%**.",
    },
    {
      kind: "mcq",
      id: "aesthetic-exception",
      prompt:
        "A paint manufacturer wants a metallic finish that shifts colour with temperature. No known pigment does this reliably on exterior surfaces. Is the work to develop it R&D?",
      options: [
        "No: aesthetic work is always excluded",
        "Yes, potentially: achieving an aesthetic effect can need a technological advance, and resolving that uncertainty is R&D",
        "Only the market testing is R&D",
        "No: paint isn't technology",
      ],
      answer: 1,
      explain:
        "Para 42: aesthetic qualities aren't science or technology in themselves, but creating a desired effect through science or technology can require an advance. Resolving that uncertainty is R&D.",
    },
    {
      kind: "multi",
      id: "after-prototype",
      prompt: "A working prototype with all the functional characteristics of the final product has just been proven. Which later activities could still be R&D? Select all that apply.",
      options: [
        "A new, genuine technological problem appears in production that no competent professional could readily fix",
        "Routine bug fixes reported by customers",
        "Making production tooling using standard methods",
        "Consumer trials to test reactions to the product",
      ],
      answers: [0],
      explain:
        "Para 35: new problems involving real scientific or technological uncertainty can need new R&D after production starts. Routine fixes, tooling with known methods and consumer trials are not R&D.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-qia-finance",
      prompt: "The finance director spends 20% of their time on the statutory accounts and 5% managing the R&D project budget. What can be included as R&D?",
      options: ["25%", "20%", "5%", "None: finance staff can never qualify"],
      answer: 2,
      explain: "Finance activity qualifies as a QIA only insofar as it's done for the R&D. Managing the project budget can; preparing the statutory accounts can't.",
    },
    {
      kind: "mcq",
      id: "q-end",
      prompt: "When does R&D end under the DSIT Guidelines?",
      options: [
        "When the product goes on sale",
        "When the uncertainty is resolved, e.g. knowledge is codified or a prototype with all the functional characteristics of the final product exists",
        "At the end of the accounting period",
        "When the first customer complains",
      ],
      answer: 1,
      explain: "Para 34 sets the end point at codified knowledge usable by a competent professional, or a prototype or pilot plant with all the functional characteristics of the final product.",
    },
    {
      kind: "mcq",
      id: "q-content",
      prompt: "An education company writes 200 new interactive lessons for its existing learning app. Is writing the lessons R&D?",
      options: ["Yes: it's new content", "No: content delivered through technology isn't itself technology", "Yes, if the app is cloud-based", "Only if it uses AI"],
      answer: 1,
      explain: "Para 43: content isn't science or technology. Only advances in the technological means of creating or delivering content could be.",
    },
    {
      kind: "mcq",
      id: "q-abortive",
      prompt: "A project to extend battery life by 40% fails after eight months of testing. Can the costs be claimed?",
      options: ["No: only successful projects qualify", "Yes: abortive projects are R&D if they sought an advance", "Only 50% of the costs", "Only if a patent was filed"],
      answer: 1,
      explain: "Paras 10 and 38: what counts is the intention to achieve an advance and the work to resolve the uncertainty, not success.",
    },
    {
      kind: "mcq",
      id: "q-market",
      prompt: "Which of these is a qualifying indirect activity?",
      options: ["Market research to choose product features", "Raising equity to fund the project", "Maintaining the computers used for the R&D", "Designing the product logo"],
      answer: 2,
      explain: "Maintaining R&D equipment, including computers used for R&D, is an ancillary activity listed in para 31(c). The others are commercial or aesthetic.",
    },
  ],
  sources: [
    { label: "DSIT Guidelines: meaning of R&D for tax purposes", url: "https://www.gov.uk/government/publications/guidelines-on-the-meaning-of-research-and-development-for-tax-purposes/meaning-of-research-and-development-for-tax-purposes-guidelines" },
    { label: "CIRD133000: staffing costs under the reformed reliefs", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird133000" },
    { label: "HMRC GfC3: how to identify qualifying R&D activities", url: "https://www.gov.uk/government/publications/help-to-see-if-your-work-qualifies-as-research-and-development-for-tax-purposes-gfc3/how-to-identify-qualifying-rd-activities-part-4" },
    { label: "CIRD81960: application of the Guidelines to software", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird81960" },
  ],
};
