# Proofread report: personal-tax (October 2026)

Scope: `src/content/tracks/personal-tax/index.ts` and all 15 lessons. Every numeric exercise, worked example, table and journal was re-worked by hand. All matched (answers, workings, narratives, MCQ/multi indexes, journal balances). All 57 cited gov.uk URLs returned HTTP 200. After the edits, `validate-content.mts personal-tax` passed (15 lessons, 145 questions) and so did `tsc --noEmit`.

## Changed

- `lessons/sa-timetable-payments-and-penalties.ts:72-74`: the MTD late payment penalty text left out the first-year 30-day grace period and the rise to 4% for 2027/28. Worse, it said nothing about the new penalty regime reaching all personal SA filers from April 2027, so the "existing SA rules" penalties read as if they would carry on. It now gives the first-year 30-day grace, 4%/4% for 2027/28, and says the old rules apply to 2026/27 and earlier for non-MTD clients, with the new penalties applying to everyone filing a personal SA return from April 2027. Source: https://www.gov.uk/guidance/penalties-for-making-tax-digital-for-income-tax (updated 30 March 2026).
- `lessons/mtd-for-income-tax.ts:89`: the same omission in the MTD penalties callout (no first-year 30-day grace, and no mention that from April 2027 the regime covers all personal SA filers). It now includes both. Source: same as above.
- `lessons/mtd-for-income-tax.ts:58`: said the qualifying care, averaging and SA109 groups were "deferred until at least April 2027". That's misleading: the exemption covers 2026/27 only, and from 2027/28 they join if over the threshold. It now says 2026/27 only, adds SA107, and notes the groups exempt beyond April 2027 with no date set (ministers of religion, MCA/BPA claimants). Source: https://www.gov.uk/guidance/find-out-if-you-can-get-an-exemption-from-making-tax-digital-for-income-tax
- `lessons/mtd-for-income-tax.ts:43` and `:154`: said overseas property rents always count towards qualifying income. They count only if the client was UK resident in the relevant year. The residence condition has been added. Source: https://www.gov.uk/guidance/work-out-your-qualifying-income-for-making-tax-digital-for-income-tax
- `lessons/income-tax-computation.ts:85`: "There's a dedicated lesson on this" (Scottish taxpayers) pointed to a lesson that doesn't exist in this track (internal consistency). It now says savings and dividends still use the UK bands and that the track uses the England, Wales and NI rates. The six Scottish bands from 19% to 48% were confirmed. Source: https://www.gov.uk/government/publications/rates-and-allowances-income-tax/income-tax-rates-and-allowances-current-and-past
- `lessons/fig-regime-and-foreign-income.ts:41` and `:114`: said FIG claims are made "on the SA109 pages" only. The claim is made on SA109, but the amount relieved for each source goes on the supplementary pages (mostly SA106). Both places now say this. Source: https://www.gov.uk/government/publications/foreign-income-and-gains-fig-regime-self-assessment-helpsheet-hs266/hs266-foreign-income-and-gains-fig-regime-2026
- `lessons/property-income.ts:83` (plus a new source at `:249`): "Losses are lost if the business ceases, unless lettings restart within 3 years" stated HMRC's rule of thumb as a hard rule. It now says a gap of under 3 years is normally not treated as a cessation, and a longer gap usually is (PIM2510). Source: https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim2510
- `lessons/property-income.ts:89`: the 2027/28 planning tip gave the new 22/42/47% property rates but didn't say the s24 finance cost reduction moves to 22%. That has been added. Source: https://www.gov.uk/government/publications/changes-to-tax-rates-for-property-savings-and-dividend-income/change-to-tax-rates-for-property-savings-and-dividend-income-technical-note

## Verified correct (no change needed), key items

- 2026/27 PA £12,570, BRB £37,700, ART £125,140; dividend rates 10.75/35.75/39.35%; Scottish bands. Source: GOV.UK rates page.
- Savings and property rates 22/42/47% from 6 April 2027, dividend allowance £500. Source: technical note.
- Class 2 £3.65/week, SPT £7,105, Class 4 6%/2% at £12,570/£50,270. Source: https://www.gov.uk/self-employed-national-insurance-rates
- Child Benefit £27.05/£17.90. Source: https://www.gov.uk/child-benefit-rates
- HICBC through PAYE. Source: https://www.gov.uk/child-benefit-tax-charge/pay-tax-charge-paye
- Homeworking relief removed from 2026/27 (earlier 4 years still claimable). Source: https://www.gov.uk/tax-relief-for-employees/working-at-home
- MTD: no penalties for late quarterly updates in 2026/27; 4-point threshold; £200 penalty; partnership profit share and transition profits excluded; calendar update periods. Source: GOV.UK MTD pages.
- FIG regime: lost allowances, relieved FIG still counted in ANI, deadline (31 Jan 2029 for 2026/27), employment income excluded. Source: HS266 and RFIG.
- TRF 12% (2025/26, 2026/27) and 15% (2027/28). Source: RDRM73400.
- Late payment interest at base rate + 4% from 6 April 2025. Source: HMRC interest rates page.
- Self Serve Time to Pay limit of £30,000. Source: GOV.UK.
- Property cash basis threshold £150,000. Source: PIM1092.
- Discovery time limits of 4, 6 and 20 years. Source: EM3214.
- Triggers for filing a return. Source: who-must-send-a-tax-return.

## SUSPECT

None.

## UNVERIFIED

These are consistent with each other across the track and with established rules, but I didn't fetch an official page for them in this pass:

- legislation.gov.uk citations: TMA 1970 ss7, 9A; ITA 2007 ss16, 23, 35, 55B; ITEPA 2003 ss336, 681C; ITTOIA 2005 s34; FA 2013 Sch 45. The site blocks bots. The URLs were left unchanged.
- SRT test details: the automatic tests, tie definitions, ties table and the 8 split-year cases. RDR3 is live, but I didn't read it in full.
- FHL abolition consequences, the Form 17 60-day rule, the rent-a-room £7,500 limit, and replacement of domestic items relief conditions.
- Employment: the AMAP rates of 45p/25p, P60/P11D dates (31 May / 6 July) and the s343–344 professional subscriptions list.
- Reliefs and penalties: marriage allowance £1,260/£252, the Gift Aid carry-back rule, FA 2007 Sch 24 penalty ranges, and the overpayment relief signature and exclusion conditions.
- HICBC scenario: it uses £2,300 a year of Child Benefit for two children. At the 2026/27 rates a full year would be £2,337.40. The figure is presented as the amount "received", so it isn't wrong.

## Clean

10 of 15 lessons, plus `index.ts`, had no issues: who-must-file-and-registration, employment-income-on-the-return, savings-and-dividend-income, self-employment-trading-income, class-2-and-class-4-nic, partnership-income, marriage-allowance-gift-aid-and-pension-relief, high-income-child-benefit-charge, statutory-residence-test and amending-returns-and-hmrc-enquiries.
