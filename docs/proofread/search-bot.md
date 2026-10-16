# Proofread: Level 1 question bot (`src/lib/search/*.ts`), October 2026

Scope: `glossary.ts` (concepts, aliases and pinned definitions), `instant.ts` (instant answers and the "journal for X" lookup), and the hard-coded content in `understand.ts`, `learnRules.ts`, `knowledge.ts`, `localBot.ts`, `botLog.ts`, `grade.ts` and `examQuestions.ts`. Tests were not touched.

Method: I ran every pinned concept through `pinnedAnswer` against the real lessons and printed the full sentences the bot shows. I also ran the exam bank and about 30 extra probe questions (journals, "what is X") to see the real answers, including their Dr/Cr direction.

Nothing in these files hard-codes a rate, threshold or deadline. Every figure the bot shows is quoted verbatim from a lesson. So the factual risks here are routing and pinning: an alias that sends a question to the wrong concept, or a pin that quotes a sentence which is wrong or misleading on its own.

Results after the edits: `npx vitest run src/lib/search` gives 916/916 passing, and the bot exam is 88/88. `npx tsc --noEmit -p .` is clean.

## Changed

1. **`src/lib/search/glossary.ts:45, 49`: "accrued income" was an alias of the *accruals* concept.**
   - What was wrong: "What is accrued income?" and "journal for accrued income" got the accrued **expense** row, "Dr Expense, Cr Accruals; Current liability". That is the wrong journal and the wrong side of the balance sheet. Accrued income is Dr Accrued income, Cr Sales, and it is a current asset.
   - What it says now: "accrued income" is its own concept, pinned to the lesson's row "Adjustment: Accrued income; … Dr Accrued income, Cr Sales; … Current asset".
   - Source: foundations/accruals-and-prepayments table; FRS 102 accrual basis (https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-102/).
2. **`src/lib/search/glossary.ts:46, 50`: "deferred income" was an alias of the *prepayments* concept.**
   - What was wrong: "What is deferred income?" got "A prepayment is the part that relates to next year." "Journal for deferred income" got the prepaid-rent journal "Dr Prepayments £13,500 / Cr Rent". That is the opposite direction and the opposite element: deferred income is a liability, and its journal is Dr Sales, Cr Deferred income.
   - What it says now: "deferred income" is its own concept (aliases "deferred income" and "income in advance"), pinned to "Adjustment: Deferred income; … Dr Sales, Cr Deferred income; … Current liability".
   - Source: same lesson; FRS 102 (link above).
3. **`src/lib/search/glossary.ts:46`: the prepayment pin was a fragment.**
   - What was wrong: "A prepayment is the part that relates to next year." On its own it doesn't say *what* relates to next year, and it gives no balance sheet treatment.
   - What it says now: the pin is the full lesson row "Adjustment: Prepaid expense (prepayment); What it means: Cost paid/recorded this year that relates to next year; Journal: Dr Prepayments, Cr Expense; Balance sheet: Current asset."
4. **`src/lib/search/glossary.ts:41`: the double-entry pin was a fragment.**
   - What was wrong: the answer was only "…a disciplined way of recording both effects." That is meaningless outside the lesson.
   - What it says now: the pin adds the lesson's follow-on sentence "Every transaction is recorded as at least one debit and at least one credit of equal value."
5. **`src/lib/search/glossary.ts:109`: R&D relief had the alias "ride", which is not a term HMRC uses, and had no "ERIS" alias.**
   - What was wrong: "What is ERIS?" was not recognised at all. "ride" (and typo-correction to it, such as "pride" → "ride") could route unrelated questions to R&D.
   - What it says now: "ride" is replaced with "eris" and "enhanced r&d intensive support". "What is ERIS?" now answers from the R&D lesson.
   - Source: https://www.gov.uk/guidance/research-and-development-rd-tax-relief-the-merged-scheme-and-enhanced-rd-intensive-support (names "merged R&D expenditure credit scheme" and "enhanced R&D intensive support (ERIS)", for periods beginning on or after 1 April 2024).

## SUSPECT

- **`glossary.ts:78`: "making tax digital" and "mtd" map only to the *VAT return* concept.**
  - "What is MTD?" answers with the VAT-only MTD rule. MTD for Income Tax has applied from April 2026 for qualifying income over £50k, so the answer is now incomplete for a bare "MTD" question.
  - Not changed: the alias tie-break would need a design decision (for example, ask which MTD), and it is a routing issue rather than a wrong figure. "mtd for income tax" and "mtd itsa" already route correctly.
- **`instant.ts:183`: "journal for drawings" shows the line ": 7; Debit: Drawings; Credit: Bank; £: 500; …"**
  - The direction is correct, but the leading ": 7" comes from an unnamed first table column in the foundations lesson. This is cosmetic and needs a lesson-side fix, which is outside this scope.
- **`glossary.ts:52`: "journal for bad debt" returns VAT bad debt relief (Notice 700/18), not the bookkeeping write-off (Dr Bad debts expense, Cr Trade receivables).**
  - What it shows is not wrong, but it may not be what was asked. The bookkeeping write-off would need a pinned journal line in a bookkeeping lesson.
- **`glossary.ts:68`: "what is the vat registration threshold" is read as a definition question.**
  - It answers with the VAT rate-category table ("Does it count towards the registration threshold?: Yes"), not the threshold figure. No wrong figure is shown, but the answer doesn't answer the question. "vat registration threshold" on its own correctly passes up as a rate question.

## UNVERIFIED

These are lesson facts surfaced verbatim by the bot. They are outside this edit scope and I did not check them against a source:

- SSP from 6 April 2026: £123.25 a week or 80% of AWE, from day one, no LEL (payroll/statutory-sick-pay).
- National Living Wage £12.71 (payroll minimum wage lesson).
- Employment Allowance £10,500 (payroll NIC categories lesson).
- CIS gross payment status: five-year reapplication bar under the 2026 supply-chain fraud rules (cis/gross-payment-status-tests-and-changes).
- PSC pin "The five conditions (CA 2006 Sch 1A)": GOV.UK guidance (https://www.gov.uk/guidance/people-with-significant-control-pscs) groups the conditions differently (three usual ones plus a limited fourth). That does not disprove five statutory conditions, and legislation.gov.uk is blocked, so I left it.

## Clean

These pins were verified against official sources:

- AIA £1 million, cars excluded: https://www.gov.uk/capital-allowances/annual-investment-allowance
- IHT 40% above the threshold: https://www.gov.uk/inheritance-tax
- AA02 is the dormant accounts form: https://www.gov.uk/government/publications/file-your-dormant-accounts-aa02

These pins were checked and showed no issue: accounting, the accounting equation, assets, liabilities, drawings, going concern, capital and equity, balance sheet, P&L, journal entry, trial balance, bank reconciliation, suspense account, accruals, depreciation, VAT, input tax, FRS, reverse charge, FPS, PAYE, auto-enrolment, s455, DLA, distributable reserves, dividends, confirmation statement, corporation tax, payments on account, CGT, IR35, CIS and AML.

The worked journals shown by the bot (depreciation, prepaid rent, payroll, dividends, DLA expense claims, suspense correction) all balance and run the right way.
