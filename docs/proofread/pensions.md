# Proofread: pensions (October 2026)

Scope: `src/content/tracks/pensions/` (index.ts + 11 lessons). All sources fetched 16 October 2026. Validator: `✓ pensions: 3 modules, 11 lessons, 99 questions`; `tsc --noEmit` clean.

Already fixed or confirmed before this pass, so not re-opened: AE record retention (opt-out records 4 years, others 6) and postponement.

## Changed

### auto-enrolment-employer-duties.ts
- `:33`: said the company has duties "for any director with a contract", which implies the director must be auto-enrolled. Now says a director with a contract is a worker, but the company can choose whether to enrol them, and they can still opt in or join. https://www.thepensionsregulator.gov.uk/en/business-advisers/automatic-enrolment-guide-for-business-advisers/director-exemptions-from-automatic-enrolment
- `:57`: "Missing the 5-month deadline does not by itself cause a fine". Now says missing it is a breach: TPR normally issues a compliance notice, and a £400 fixed penalty can follow. The re-enrolment window is now spelled out as three months either side of the third anniversary of staging. Added the TPR enforcement source. https://www.thepensionsregulator.gov.uk/en/employers/warnings-notices-and-payment-of-fines/how-we-enforce ; https://www.thepensionsregulator.gov.uk/en/employers/re-enrolment/next-re-enrolment-i-am-an-employer-with-staff-to-put-back-into-my-pension-scheme/re-enrolling-staff-in-a-pension-scheme-script

### assessing-workers-and-postponement.ts
- `:74`: "Directors with contracts are assessed like any worker". Added that the company can choose not to auto-enrol a director. Added the TPR director exemptions source. (Same TPR director-exemptions URL as above.)
- `:77`: "Apprentices and under-22s … aren't automatically enrolled until 22" implied that apprentices of any age are excluded. Now says under-22s (including younger apprentices), and that apprentices aged 22+ are assessed like any worker. (Language/clarity fix. The age rule itself is unchanged and matches the TPR assessing-the-workforce guidance.)

### contributions-opt-out-and-re-enrolment.ts
- `:40`: said inducing an opt-out is a "criminal offence". TPR lists only two AE criminal offences: wilfully failing to enrol eligible staff, and knowingly giving false information in a declaration. Now says inducement is against the law and TPR enforces it with compliance notices and penalties. https://www.thepensionsregulator.gov.uk/en/employers/warnings-notices-and-payment-of-fines/how-we-enforce ; https://www.thepensionsregulator.gov.uk/en/business-advisers/automatic-enrolment-guide-for-business-advisers/what-happens-if-my-client-doesnt-comply-or-is-late-complying
- `:52`: the re-enrolment window was "six months before to six months after" the third anniversary, which is 12 months. Now a six-month window from three months before to three months after. Added the TPR re-enrolment and enforcement sources. (TPR re-enrolling script URL above.)

### pension-tax-relief-net-pay-vs-relief-at-source.ts
- `:52`: "first payments being rolled out from 2026" isn't supported by GOV.UK. Now says what the source does say: HMRC identifies eligible people from its own records and contacts them in the following tax year to confirm bank details, then pays the top-up directly. https://www.gov.uk/government/publications/low-earners-anomaly-pensions-relief-relating-to-net-pay-arrangements/pensions-relief-relating-to-net-pay-arrangements
- `:84`: the journal credited "Net wages payable £2,401" while ignoring PAYE and NIC, which is misleading. The narrative now says it is simplified and that this figure is before PAYE and NIC. (Accounting clarity, no source needed.)

### tpr-enforcement-and-penalties.ts
- `:33`: the enforcement-ladder row named "inducing opt-out" as a prosecution trigger. Now names the two actual offences: wilfully failing to enrol, and knowingly giving false information in a declaration. (TPR how-we-enforce / business-advisers pages above.)
- `:58`: "employers must report material payment failures to TPR". The legal duty is on the scheme's trustees or managers (within 14 days under the General Code). Rewritten, and the TPR source added. https://www.thepensionsregulator.gov.uk/document-library/code-of-practice/reporting-to-tpr/whistleblowing-reporting-breaches-of-the-law/reporting-payment-failures
- `:176-178` (quiz q-induce): the correct option and explanation said inducement "can be prosecuted". The option now reads "A breach of the law that TPR can enforce with compliance notices and penalties". The explanation lists the real criminal offences. The distractor "A civil dispute only" was reworded so it doesn't overlap with the new correct answer.

### salary-sacrifice-for-pensions.ts
- `:54`: said lower pay may take the employee below "the lower earnings limit or the primary threshold", affecting State Pension. Only the LEL matters, because earnings between the LEL and the PT still count. Now cites the 2026/27 LEL of £6,708 and explains this. https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027

### pensions-for-owner-managed-companies.ts
- `:40`: listed "certain furnished holiday-let profits" as relevant UK earnings. The FHL regime was abolished from 6 April 2025, and FHL income no longer counts for pension relief. Removed and explained, with PIM4165 added as a source. https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim4165
- `:74`: the AE callout said two directors with contracts "are workers and must be assessed". Added that the company can choose whether to enrol a director, who can opt in. Must still declare compliance. (TPR director exemptions URL above, added as a source.)
- `:91` (scenario step 5): said "both over £10,000 earnings", but Elena earns exactly £10,000. Eligible jobholders must have earnings above the trigger. Now says Elena is a non-eligible jobholder (can opt in). It also no longer assumes Marcus has a contract, and notes the director option. https://www.thepensionsregulator.gov.uk/en/document-library/automatic-enrolment-detailed-guidance/3-assessing-the-workforce (para 120: "above the earnings trigger")

### annual-allowance-and-carry-forward.ts
- `:93` (scenario step 4): said the "HMRC spreading rules for very large contributions should be checked" for a £110,000 contribution. Spreading applies only where contributions are more than 210% of the previous period's **and** the excess over 110% is £500,000 or more, so it can't apply here. Now explains this. PTM043400 added as a source. https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm043400

### tapered-annual-allowance-and-mpaa.ts
- `:34`: said threshold income deducts personal contributions "under relief at source or net pay". Only relief at source contributions are deducted, because net pay contributions have already reduced net income. Also clarified that amounts given up under salary sacrifice or flexible remuneration arrangements made after 8 July 2015 are added. https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm057100
- `:35`: said adjusted income adds back contributions "given relief at source or by net pay". Relief at source contributions are not added back, only net pay contributions plus employer inputs. https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm057100
- `:54-56`: listed "a small pot payment in some cases" as an MPAA trigger. Small pots lump sums are not among the trigger events in PTM056520. Replaced with the listed triggers (flexible lifetime annuity that can go down; scheme pension where fewer than 11 others are already receiving one), stated that small pots don't trigger the MPAA, and added PTM056520 as a source. https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm056520

### pensions-and-inheritance-tax-from-2027.ts
- `:21`, `:26`: described the change as policy and told readers to "check the current legislation". It is now legislated in Finance Act 2026. Updated the intro and callout title, noting that some HMRC guidance (for beneficiaries) is still to come. https://www.gov.uk/government/publications/inheritance-tax-on-pensions-technical-note
- `:28`: the death-in-service exclusion is now limited to benefits from the member's current employment immediately before death. Deferred-membership benefits and refunds don't qualify. https://www.gov.uk/government/publications/inheritance-tax-on-pensions-technical-note/technical-note-inheritance-tax-on-pensions (s3.3.4)
- `:30`: "Who pays" now adds the following from the technical note (s2.2, 6, 7):
  - beneficiaries become jointly and severally liable once benefits vest in them;
  - PRs can issue withholding notices (up to 50% of a beneficiary's entitlement);
  - PRs or beneficiaries can issue payment notices (minimum £1,000) requiring the scheme to pay HMRC direct.
- `:31`, `:48`, `:82`: the income tax interaction said to "check … for any relief" and described a full "double charge". The technical note (s8.2) says IHT paid on the death benefit does not count towards the beneficiary's taxable income. Updated the callout, the before/after-75 table row and scenario step 4 to say income tax falls on the amount left after IHT. Also noted that HMRC's beneficiary guidance is still to come.
- `:84`: the scenario record note now refers to Finance Act 2026 and HMRC guidance rather than "current published policy". Technical-note source added to `sources`.

## SUSPECT

- None outstanding beyond the UNVERIFIED items below.

## UNVERIFIED

- **EPN daily rates by headcount** (tpr-enforcement `:42-48`, £50 / £500 / £2,500 / £5,000 / £10,000). TPR's current pages give only the "£50 to £10,000 per day depending on the number of staff" range. The band split matches secondary sources only. Left unchanged.
- **Contribution payment deadline**, the 22nd (electronic) / 19th (cheque) of the following month (auto-enrolment lesson table and MCQ). Provider sources agree, but I didn't find it on a TPR page. Left unchanged.
- **Re-declaration deadline**: "within 5 months" of the re-enrolment date (auto-enrolment table row 8; contributions lesson `:52`). Secondary sources say it is five months after the third anniversary of staging, whatever re-enrolment date is chosen. TPR's own pages didn't state it. Left unchanged.
- **91-day deadline** to tell other schemes after a flexible access statement (taper/MPAA lesson `:61`, quiz q-days). Not found on a fetched PTM page. Left unchanged.
- **Review/appeal mechanics** (tpr-enforcement `:65`): that a notice stays in force during a review or appeal. Not confirmed on a fetched TPR page.
- **Late-enrolment backdating**: "HMRC and TPR both expect the correction" (contributions lesson `:66`). I didn't find the HMRC part. Kept as general wording.
- **Salary sacrifice £2,000 NIC cap from April 2029**: the figures and treatment are confirmed by GOV.UK. Whether it has been enacted isn't stated, but the lesson already describes it as announced.

## Confirmed (no change needed)

- **2026/27 AE thresholds**: trigger £10,000; band £6,240 to £50,270; monthly £520 / £833 / £4,189; weekly £120 / £192 / £967 (DWP review; TPR earnings thresholds).
- **2026/27 pension allowances** (GOV.UK pension schemes rates):
  - annual allowance £60,000;
  - taper thresholds £200,000 / £260,000, minimum £10,000;
  - MPAA £10,000;
  - alternative annual allowance £50,000. PTM056510 shows "£30,000" for 2023-24 onwards, which appears to be an HMRC manual error. The rates table is used.
  - LSA £268,275; LSDBA £1,073,100; OTA £1,073,100.
- **Scheme pays** (PTM056410): charge over £2,000 and inputs to that scheme above the annual allowance.
- **IHT on pensions**: start date 6 April 2027; spouse and charity exemptions; dependants' scheme pensions excluded; PRs liable; BPR/APR don't apply to pension property (technical note s11.2).
- **2026/27 NIC**: PT £12,570; ST £5,000; UEL £50,270; 8% employee and 15% employer.
- **Net pay top-ups**: from 2024/25.
- **Arithmetic**: every numeric exercise, scenario figure, MCQ index and journal re-checked. All correct apart from the Elena earnings-trigger point above.

## Clean

- 1 of 11 lessons checked with no issues: `lump-sum-allowance-and-lsdba.ts`, where the figures, arithmetic and death-benefit rules were all confirmed. `index.ts` is also clean. The other 10 lessons had at least one fix.
