# Tax planning — how it works and how to test it

Research → Tax planning (`/planning`). A research aid for qualified staff, not advice to a client.

## What it does

1. **Intake.** Title, tax year, the client's situation, objectives, constraints, optional client/matter reference. No client names: the text goes to an AI service.
2. **Break-down.** A cheap model (Haiku) splits the situation into up to six separate tax questions, each about the *rules* for one tax or relief (never a calculation or a multi-route comparison).
3. **Research.** Each question runs as an Ask Capto *expert* answer (HMRC manuals, GOV.UK, professional bodies; every quote checked word for word). Each answer is stored as an ordinary research answer, so it is in the research register and can be reviewed.
4. **Write-up.** Sonnet writes the options, recommendation, anti-avoidance points, assumptions, matters to confirm and next steps from those findings **only** (it is given no sources of its own).
5. **Checks** (`src/lib/planning/report.ts`): issue references must exist; confidence can't exceed the weakest issue; any £ amount or percentage not found in the client situation or findings is flagged under "not settled"; a coverage line states issues answered and points quote-verified.
6. **Outputs.** The scenario page; Word and PDF memorandum (same renderers as Ask Capto reports); review status (approve / needs changes); a Tax planning tab and Excel sheet in the research register; "Edit and re-run"; calculator suggestions ("Work out the numbers").

The report **does not calculate tax**. It points to the calculators.

## Cost

Capped at 40p per scenario (`budget.ts`): each issue is at most the 5p Ask Capto ceiling, plus the break-down and the write-up. Typical runs cost 16–28p and take 1–2 minutes. Each issue counts as one Ask Capto question against the firm's monthly allowance (up to six per scenario).

## Testing

* **Unit tests** (run in CI): `src/lib/planning/*.test.ts` — budget, report checks, memo, scoring, calculator suggestions, long-document PDF rendering.
* **Live regression** (costs money, never runs in CI): five invented scenarios in `src/lib/planning/starters.ts`, scored automatically by `score.ts` (run completed, every issue answered, ≥90% of points quote-verified, ≥2 options each traced to an issue, figures grounded, each `mustCover` topic present).

  ```
  npx tsx scripts/seed-qa.mts        # local test database + QA users (stop the dev server first)
  PLANNING_LIVE_QA=1 PLANNING_QA_OUT=<folder> npx vitest run src/lib/planning/qa.live.test.ts
  # optional: PLANNING_QA_ONLY=2,5 to run some only
  ```

  Writes `qa<N>-metrics.json` (with the score and what failed), `qa<N>.json` (full result) and `qa<N>-memo.pdf` to the folder.

**Limits of the automatic score.** It checks that the report is complete, sourced and grounded. It cannot tell whether the advice is *right*: that needs a qualified reviewer reading the memos. The local database has no copy of the HMRC knowledge base (only the live site does), so local runs use live GOV.UK search and understate real quality; run at least one scenario on the live site and compare.

## Known limits / ideas

* Overall confidence is deliberately conservative (weakest issue wins), so it is often "low"; the coverage line shows the mix.
* "Edit and re-run" re-researches everything (no reuse yet).
* Case law is not used until the National Archives licence is in place.
