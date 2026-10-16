# Proofreading brief: full accuracy pass (October 2026)

Goal: no incorrect, outdated or misleading content left on the platform. Staff at a UK accountancy practice learn from these lessons and rely on them for client work, so accuracy beats everything else.

Today is October 2026. The current tax year is **2026/27**. Lessons should be right for 2026/27 and should say so where a figure depends on the year.

## Scope (your track only)

`src/content/tracks/<track>/`: every lesson file in `lessons/` and the track's `index.ts`. Read each lesson in full: theory blocks, callouts, tables, the worked scenario, every exercise (prompt, options, answer, explain, working), the quiz, and `sources`.

Do not edit anything outside your track folder. In particular, don't touch `src/content/flashcards/cards.json`; it is refreshed afterwards.

## What to check

1. **Facts:** rates, thresholds, limits, deadlines, penalties, form names and numbers, section references, who it applies to, and dates rules started or end.
2. **Arithmetic:** re-do every numeric exercise and worked example yourself. The `answer` must equal the result of the `working`, and the narrative figures must match the exercise figures. For MCQ and multi, check the `answer` indexes point at the right options. Check journals balance and debit and credit sides are the right way round.
3. **Misleading content:** oversimplifications that would lead someone to a wrong answer on a real client, missing key conditions or exceptions, absolute statements ("always", "never") that aren't true, and rules stated as current that were announced but never enacted (or that were changed later).
4. **Internal consistency:** the same rule stated differently in two lessons of your track, objectives promising something the lesson doesn't cover, and a quiz testing something the lesson never taught.
5. **Sources:** each cited URL should support what the lesson says. Fix or replace a dead or wrong source with the right official page.
6. **Language:** UK English, plain and clear. Fix typos and grammar, but don't restyle text that is already fine.

## The verification rule (most important)

**Never change a figure or rule from memory.** Your training data may be older than these lessons, and several lessons correctly contain 2025 and 2026 changes. Two examples:

- s455 at 35.75% for loans made on or after 6 April 2026.
- BPR/APR 100% allowance of £2.5m from 6 April 2026.

Other examples of facts the lessons already have right:

- CT late-filing penalties doubled for returns with a filing date on or after 1 April 2026.
- VAT capital goods scheme threshold £600k from 29 July 2026.
- MTD for Income Tax from April 2026 for qualifying income over £50k.
- Off-payroll small-company thresholds £15m/£7.5m.

Only change something when an official source you fetch **now** shows it is wrong. Official sources are GOV.UK guidance, HMRC internal manuals on gov.uk, Companies House, The Pensions Regulator, and FRC for accounting standards. Use WebFetch/WebSearch. legislation.gov.uk blocks bots, so use HMRC manuals instead. If you can't verify something either way, leave it and list it in your report as UNVERIFIED. If it looks wrong but you can't prove it, list it as SUSPECT with your reason.

When a fix changes a number, update every place that depends on it: the exercise answer, working, explain, the narrative, and any later step of the worked example.

## Format rules

Keep the TypeScript structure exactly as it is. Follow `docs/CONTENT_BRIEF.md`. Sources must stay on the validator's allowlist. After your edits, run `npx tsx scripts/validate-content.mts <track>` and `npx tsc --noEmit -p .`, and fix anything they report. Don't run the dev server and don't commit.

## Report

Write `docs/proofread/<track>.md`:

- **Changed:** one line per fix, as `file:line` + what was wrong + what it says now + the source URL that proves it.
- **SUSPECT** and **UNVERIFIED:** items you couldn't settle, with reasons.
- **Clean:** a count of lessons checked with no issues.

Then give a short summary as your final message: counts of fixes, suspect and unverified items, plus the three most important fixes.
