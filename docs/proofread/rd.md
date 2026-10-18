# Proofread: R&D tax relief (`rd`), October 2026

Scope: `src/content/tracks/rd/index.ts` and all 11 lessons. Every numeric exercise, worked example, journal and MCQ/multi index was re-worked; all figures agree. Checked against GOV.UK guidance, the CIRD manual and the DSIT Guidelines, all fetched on 16 October 2026. `validate-content.mts rd` passes (11 lessons, 101 questions) and `tsc --noEmit` is clean.

## Changed

- `claim-notification-and-additional-information.ts:31-33`: the 3-year exemption didn't mention that a claim HMRC rejected by removing it from the return doesn't count. It also didn't mention the alternative of having the claim itself (in a return or amendment) reach HMRC within the notification period. Both are now added. Source: https://www.gov.uk/guidance/tell-hmrc-that-youre-planning-to-claim-research-and-development-rd-tax-relief
- `claim-notification-and-additional-information.ts:45`: the notification table said the form asks for the "number of R&D projects; a short overview". It now says "a summary of the high-level planned R&D activities (no evidence is needed at this stage)". Source: same page.
- `claim-notification-and-additional-information.ts:84-91`: the AIF project-description list had 5 headings. HMRC lists 6, so the sixth is now added ("the tax relief claimed and the qualifying costs"), and heading 5 now adds "and whether they were resolved". Source: https://www.gov.uk/guidance/submit-detailed-information-before-you-claim-research-and-development-rd-tax-relief
- `claim-notification-and-additional-information.ts:102`: the time limit text mixed up accounting period and period of account, and left out long periods of account. It now gives 2 years for a 12-month AP, 24 months from the last day of a period of account of 18 months or less, and 42 months from the first day of a longer one. Source: https://www.gov.uk/guidance/make-a-claim-for-rd-tax-relief-on-your-company-tax-return
- `claim-notification-and-additional-information.ts:120`: the Fenwick walkthrough now also says no claim reached HMRC in a return within the window, to match the alternative route above. Source: notification guidance above.
- `compliance-red-flags-and-professional-responsibility.ts:19`: "a further 19% overclaimed" couldn't be found in HMRC's publication. It's replaced with HMRC's stated figure: "around half of claims contained some non-compliance". Source: https://www.gov.uk/government/publications/compliance-approach-to-research-and-development-tax-reliefs/hmrcs-approach-to-research-and-development-tax-reliefs
- `qualifying-staffing-costs-and-epws.ts:65`: added the merged-scheme/ERIS rule that every category of expenditure must be paid before the claim is made (s1139A). Source: https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird132000
- `subcontractors-and-overseas-restrictions.ts:60`: a key exception was missing. NI-registered SMEs claiming ERIS aren't subject to the overseas contractor and EPW restrictions (unless they opt out); the restrictions still apply under the merged RDEC. Source: https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird150500
- `consumables-software-data-and-cloud.ts:31-32`: the data licence and cloud rows didn't say that costs for qualifying indirect activities don't qualify. Both rows now say so. Sources: https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird135000 and https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird122200
- `consumables-software-data-and-cloud.ts:40` and the sources list: the sold-consumables rule cited only the old-scheme page CIRD82300. It now cites s1126A and CIRD136000 (reformed reliefs), and CIRD136000 is added to the sources. Source: https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird136000

## SUSPECT

- `old-sme-scheme-and-transitional-periods.ts` (straddle callout, line 54): the lesson applies the 40% R&D-intensive 14.5% rate to April–December 2023 spend in a 1 January–31 December 2023 period. The GOV.UK SME page supports this ("periods that begin before 1 April 2024 and end on or after 1 April 2023"). But the CIRD127000 table shows the 40% test for accounting periods beginning on or after 1 April 2023. The two official sources conflict, so I left it unchanged.

## UNVERIFIED

- `claim-notification-and-additional-information.ts` CT600 section: whether box 656 should be ticked when the company is exempt from notification. The guidance only says "to confirm you've submitted the claim notification form".
- `old-sme-scheme-and-transitional-periods.ts:48`: the AIF being required for claims made on or after 8 August 2023. HMRC's compliance page confirms agents had to be named from August 2023, but I didn't find the exact date for the AIF.
- `rd-boundaries.ts:44`: the paragraph references for after-prototype activities (copies, tooling, consumer trials, bug fixing) attributed to paras 34–35. Para 35's summary confirms new uncertainties and routine fault fixing; I couldn't confirm the rest of the list.
- `subcontractors-and-overseas-restrictions.ts:58`: "the claimant's own employees' staffing costs aren't restricted by location". This fits CIRD150500, which restricts only contractor and EPW payments, but no official page says it in terms.
- `qualifying-staffing-costs-and-epws.ts`: Class 1A NIC being excluded. CIRD133100 lists only secondary Class 1 NIC as included, and doesn't mention Class 1A.

## Clean

5 of 11 lessons had no issues: `what-counts-as-rd`, `rd-boundaries`, `rd-schemes-overview`, `computing-the-merged-rdec` and `eris-for-rd-intensive-smes`. `index.ts` is also clean.

Confirmed as correct:
- merged RDEC 20%
- notional tax at 25% for main-rate companies (including marginal relief) and 19% for others, including loss-makers
- the 7 payment steps
- PAYE cap of £20,000 + 300%: the excess is carried forward under the merged RDEC; a claim over the cap is invalid under ERIS
- cap exemption conditions A and B (15%)
- ERIS: 30% intensity including companies connected on at least one day, grace rule, 86%/186%, 14.5%
- HMRC's £136k/£5,220 example
- 65% rule, connected lower-of rule, the 2-year election
- s1138A conditions
- DSIT paragraph numbers, including para 31(a)–(g)
- old SME and old RDEC rates
- the 2020–21 error and fraud figures of 16.7% and 24.4%
- PCRT revised version from 1 January 2026

## Resolution (final pass)

- 14.5% R&D-intensive rate in a 1 Jan–31 Dec 2023 period: **Left (confirmed correct)**. CIRD123000 says FA 2024 lets R&D-intensive SMEs claim 14.5% (40% intensity) for accounting periods that end on or after 1 April 2023 and begin before 1 April 2024, so the lesson and the GOV.UK SME page are right. CIRD127000's table is a summary heading, not a conflict. Added CIRD123000 as a source at `lessons/old-sme-scheme-and-transitional-periods.ts:181`. Source: https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird123000.
