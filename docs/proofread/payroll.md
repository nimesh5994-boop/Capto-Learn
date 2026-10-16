# Proofread report: payroll track (October 2026)

Scope: `src/content/tracks/payroll/index.ts` and all 15 lessons. Every numeric exercise, worked example, journal and MCQ answer index was re-done by hand. All other arithmetic checked out. Core 2026/27 figures were checked against the live HMRC page "Rates and thresholds for employers 2026 to 2027": PAYE bands, NIC thresholds, category rates, Class 1A/1B, SSP, family pay, recovery rates, student and postgraduate loans, NMW/NLW, AMAPs, advisory fuel rates, Employment Allowance and the Apprenticeship Levy. Every cited source URL loads (HTTP 200). The legislation.gov.uk link returns 202, as expected for a site that blocks bots.

Validator: `✓ payroll: 3 modules, 15 lessons, 152 questions`. `npx tsc --noEmit -p .`: clean.

## Changed

- `lessons/student-and-postgraduate-loans.ts:50`: Said to use **Plan 1** when a starter doesn't know their plan. HMRC's default is **Plan 5** until an SL1 arrives, and the plan with the lowest threshold where there's more than one. It now says that. Source: https://www.gov.uk/guidance/special-rules-for-student-loans
- `lessons/student-and-postgraduate-loans.ts:88`: The worked example repeated the Plan 1 default. It now says HMRC's default is Plan 5. Same source.
- `lessons/student-and-postgraduate-loans.ts:28`: Plan 2 was described as "English/Welsh students who started from Sept 2012 to July 2023". Welsh students who started after July 2023 are still on Plan 2 (Plan 5 is England only). It now says "English students Sept 2012 to July 2023; Welsh students from Sept 2012". Source: https://www.gov.uk/repaying-your-student-loan/which-repayment-plan-you-are-on
- `lessons/leavers-p45-and-year-end.ts:47`: Said NIC on a post-P45 payment uses the earnings period "of the week (or month) in which it's paid". CWG2 1.14 says regular payments use the usual earnings period and irregular ones (accrued holiday, an unexpected bonus, arrears) use a **weekly** earnings period. Rewritten to match. Source: https://www.gov.uk/government/publications/cwg2-further-guide-to-paye-and-national-insurance-contributions/2026-to-2027-employer-further-guide-to-paye-and-national-insurance-contributions
- `lessons/leavers-p45-and-year-end.ts:109` and `:117`: Lena's late £250 overtime claim was given **no employee or employer NIC** because monthly thresholds were used. It's an irregular arrears payment, so a weekly earnings period applies: employee NIC £0.64 ((£250 − £242) × 8%) and employer NIC £23.10 ((£250 − £96) × 15%). The narrative and the table are updated. Same source (CWG2 1.14).
- `lessons/leavers-p45-and-year-end.ts:72` and `:196`: Week 53 in a leap year was given as "4 April". CWG2 1.13 says 4 **or** 5 April. The tax wording now says "single period's free pay (week 1 table), not cumulatively". Same source (CWG2 1.13).
- `lessons/termination-payments.ts:30, :52, :54, :95, :99`: Statutory redundancy pay was treated as part of the **relevant termination award** that PENP comes out of. EIM13874 says statutory redundancy pay is **not** within the RTA. It is added back only when the £30,000 threshold is applied. The table, the order-of-working steps and Simon's walkthrough are rewritten: RTA £38,000, PENP £13,500, s401 total (£24,500 + £8,000) £32,500. The figures are unchanged. Source: https://www.gov.uk/hmrc-internal-manuals/employment-income-manual/eim13874
- `lessons/termination-payments.ts:138-142`: Exercise `s401-taxable` said the RTA "includes statutory redundancy". The prompt now splits the package (£6,000 statutory redundancy plus £46,000 compensation). The working applies PENP to the RTA only, then adds statutory redundancy back. The answer is unchanged at £12,000. Same source.
- `lessons/rti-reporting-and-paying-hmrc.ts:87`: Merged the "first failure" and "within 3 days" exemptions into one condition ("first late filing … if … within 3 days"). They are separate exemptions, and the first-failure one doesn't apply to annual schemes. Now listed as three separate exemptions. Source: https://www.gov.uk/what-happens-if-you-dont-report-payroll-information-on-time
- `lessons/correcting-errors-and-payroll-journals.ts:29`: The fix for a wrong NIC category letter in the current year was oversimplified ("report the correct letter on the next FPS"). It now gives HMRC's method: on the next FPS, report the incorrect letter with zero NIC fields (apart from any repayment or recovery) and the correct letter with correct year-to-date NIC. Source: https://www.gov.uk/payroll-errors/correcting-your-fps-or-eps

## SUSPECT

None.

## UNVERIFIED

- `lessons/nic-categories-and-employment-allowance.ts:75`: "Claims for previous years (up to 4 years back) involve a state aid declaration". GOV.UK's how-to-claim page confirms the de minimis state aid question appears in the previous-year steps, but none of the pages fetched give the number of years.
- `lessons/benefits-in-kind-p11d-and-class-1a.ts:76`: "Registration for benefits not yet mandated opens from November 2026 for 2027/28". The mandatory-payrolling policy paper doesn't give a registration window. The April 2027 and April 2028 phases, the loans/accommodation carve-out and the one-year easement for non-deliberate inaccuracies **were** verified.
- `lessons/expenses-and-mileage-allowances.ts:55`: Advice that employers who taxed the excess over 45p in April and May 2026 "may need to correct those pay periods". This follows logically from the retrospective change (verified: announced 21 May 2026, effective 6 April 2026), but the policy paper gives no correction guidance.
- `lessons/setting-up-as-an-employer.ts:50`: The employer's liability insurance exemption for a company whose only employee is a director owning 50% or more. The GOV.UK register-employer page doesn't cover exemptions, and the HSE page wasn't fetched.
- `lessons/statutory-sick-pay.ts`: The gov.uk employer pages confirm day-one PIW ("at least one full working day"), the £123.25/80% rate, 28 weeks, linking and the SSP1 deadlines. They don't restate the abolition of waiting days and the LEL test or the 6 April 2026 date, though these are consistent with the HMRC 2026/27 rates page. Nothing contradicts the lesson.

## Clean

10 of 15 lessons checked with no issues: setting-up-as-an-employer, starters-and-tax-codes, calculating-paye-and-nic, nic-categories-and-employment-allowance, directors-nic-annual-earnings-period, statutory-sick-pay, family-statutory-payments-and-recovery, minimum-wage-and-holiday-pay, benefits-in-kind-p11d-and-class-1a, expenses-and-mileage-allowances. The track `index.ts` is also clean.
