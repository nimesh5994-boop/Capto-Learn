# Capto Learn — content authoring brief

Capto Learn trains staff at UK accountancy practices, from new-starter bookkeepers up to tax managers.
Every lesson = theory + a realistic UK client scenario worked step by step + practical auto-marked exercises + an end quiz.

## Files
- One folder per track: `src/content/tracks/<track-slug>/`
- `index.ts` — `export default` a `Track` (see `src/content/types.ts`). Import lessons from `./lessons/*`.
- `lessons/<lesson-slug>.ts` — `export const lesson: Lesson = {...}`. One lesson per file.
- Import types relatively: `import type { Lesson } from "../../../types";` (index: `"../../types"`).
- Touch NOTHING outside your own track folder(s).
- Gold-standard example to match in depth and tone: `src/content/tracks/vat/lessons/input-tax-what-you-can-claim.ts`.
- Validate: `npx tsx scripts/validate-content.mts <track-slug>` — must print ✓. Also run `npx tsc --noEmit -p .` scoped mentally to your files (fix any type errors in your files).

## Structure per track
- 3 modules: foundation, practitioner, advanced (`level` on module and its lessons). A track may have more modules if the subject needs it.
- 10–16 lessons per track total, ordered so each builds on the last.
- Each lesson: 20–45 minutes; 6–12 body blocks mixing md / callout / table / journal; a scenario for almost every lesson;
  3–5 exercises using a MIX of kinds (classify, numeric, journal, mcq, multi) — numeric and journal are the most valuable;
  5–6 quiz mcqs; 3–6 sources.

## Accuracy rules (critical — this is professional training)
- UK law and practice only (England & Wales default; note Scottish income tax rates where relevant).
- Current figures are for **tax year 2026/27** (set `taxYear: "2026/27"` on any lesson using rates/thresholds). Today is October 2026.
- BEFORE writing a rate, threshold, deadline, percentage or penalty, VERIFY it on gov.uk (WebFetch / WebSearch restricted to gov.uk, legislation.gov.uk). Recent changes are easy to get wrong (e.g. employer NIC rate and secondary threshold from April 2025, dividend tax rates from April 2026, CGT/BADR rates, MTD for Income Tax from April 2026, Companies House identity verification, FRS 102 periodic review effective 2026, R&D merged scheme, VAT thresholds). If you can't verify a figure, explain the principle and point to the source instead of stating a number.
- Cite the most specific official page: HMRC internal manual paragraph (e.g. https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61505), VAT Notice, legislation section, Companies House guidance. Every source URL must be on the allowlist in `SOURCE_DOMAINS` and must be a real page (check it loads).
- Exercises must be unambiguous with exactly one defensible answer; give full working in `working`/`explain`. Numeric answers in pounds unless `unit` says otherwise. Journals must balance and only use accounts in the picker (plus ≥2 distractors).
- Realistic scenarios: named fictional UK clients (Ltd companies, sole traders, partnerships, landlords, contractors), real-feeling figures, the kind of query a practice actually gets.
- British English. Clear, direct, practical — explain *why*, flag common mistakes (`callout` tone "warning") and practical tips ("tip"), quote the rule ("rule").
- Don't reproduce copyrighted text from ACCA/ICAEW/textbooks; write original explanations. Short quotes of legislation/HMRC guidance (Crown copyright, OGL) are fine.

## When done
Report: track slugs, module/lesson titles, lesson + question counts, any figures you could not verify, and the validator output.
