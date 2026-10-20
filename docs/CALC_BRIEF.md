# Calculator brief (October 2026)

Capto Learn's calculators are used by UK accountancy staff to learn and to check client work. They must meet the standard of the professional tax software and reference calculators practitioners already use: correct, broad enough for real cases, and clear about what they don't cover.

## Ground rules

- **Accuracy beats everything.** Never hard-code a rate, threshold or band. Read every figure through `rate(taxYear, id)` from `src/content/rates`.
- **Missing figures:** if one isn't in the dataset, add it to **your area's file only** (`src/content/rates/extra/<area>.ts`, for both `"2026/27"` and `"2025/26"`). Check it against a live official page you fetch now (GOV.UK, HMRC manuals, legislation via HMRC manuals), and include its `source`.
- **Don't fill figures from memory.** Your training data predates several 2025/26 and 2026/27 changes. If you can't verify a figure, leave that feature out and say so.
- **Statutory mechanics** that aren't rates, such as a taper of £1 for every £2, may be constants. Each one needs a comment citing the HMRC manual paragraph.
- **Testing:** every calculator gets tests in `src/lib/calc/<area>.test.ts` that reproduce real, checked answers:
  - numeric exercises and worked examples in the lessons under `src/content/tracks/**` (read `answer` and `working`; they were fact-checked in October 2026);
  - HMRC manual or GOV.UK worked examples, with the URL cited in a comment;
  - edge cases such as nil inputs, exact thresholds and tapers fully used.
- **Working:** show it line by line like a professional computation, with each figure's rate and source.

## Files you own (don't edit anyone else's)

- `src/lib/calc/<area>/*.ts`: pure calculation functions, no React. You may import from `src/lib/calc/common.ts` and `parse.ts` but don't change them; copy a helper into your folder if you need a variant.
- `src/components/calc/<area>/*.tsx`: UI components. Reuse `Fields.tsx`, `ResultPanel.tsx` and `useFields.ts` (read them first) without changing them.
- `src/components/calc/registry/<area>.tsx`: add your entries (id, label, one-line summary, component).
- `src/content/rates/extra/<area>.ts`: extra verified figures for your area.
- `src/lib/calc/<area>.test.ts`.

You may also **extend an existing calculator in your area**, for example income tax under personal or corporation tax under business. Its existing tests must keep passing; add to them.

## Coverage: real cases, every element

The user's standard: someone should be able to enter the actual figures from a real client case and get the real answer. So:
- **Inputs:** cover every element that normally appears in that computation, not just the headline ones. Put less common elements under an "More inputs" section so the simple case stays simple.
- **Working backwards:** where practitioners ask for a target result, offer a target mode that solves for the input. Examples:
  - the gross salary needed for a target net pay;
  - the dividend needed for target cash after tax;
  - the pension contribution needed to restore the personal allowance or remove the Child Benefit charge;
  - the profit at which marginal relief ends.
  Use exact solving (bisection over the forward calculation is fine) and test it.
- **Comparisons and what-ifs:** where they're the usual question, put the options side by side, for example salary vs dividend mixes or Flat Rate Scheme vs standard VAT.
- **Out of scope:** when an element genuinely can't be modelled reliably, say so in "What this doesn't cover". Never silently ignore an input.

## Standard for every calculator (match the existing four)

- Plain-English label and short help under each input, with GOV.UK links where useful. Sensible defaults, the current tax year preselected, £ inputs that accept commas, and live recalculation.
- A "Load example" button using a real lesson or GOV.UK example, and a "Clear" button.
- Validation messages for impossible inputs.
- Results: a headline figure, then the working line by line with totals right-aligned and an effective rate where meaningful, each rate linked to its source.
- A "What this doesn't cover" list, and a "Copy working" button.
- Readable at phone width (375px) with no sideways scroll, labelled inputs, and keyboard-accessible controls.

## Before you finish

Run `npx vitest run src/lib/calc src/content/rates` and `npx tsc --noEmit -p .` (ignore errors in `.next/` and in other areas' files that are mid-edit), and eslint on your files. Don't run the dev server and don't commit.

In your final message, list:
- each calculator and what it covers;
- which lesson and GOV.UK examples the tests reproduce;
- the figures you added to the dataset, with their sources;
- the simplifications shown to users;
- anything you couldn't verify.
