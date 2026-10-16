# Proofread report: corporation-tax (October 2026)

Scope: `src/content/tracks/corporation-tax/index.ts` and all 15 lessons. I re-did every numeric exercise and worked example, checked every MCQ, multi, classify and journal answer, and checked every source URL. All 53 original gov.uk URLs return 200. `validate-content.mts corporation-tax` and `tsc --noEmit` both pass after the edits.

## Changed

- `lessons/chargeable-gains-in-companies.ts:88,102,104,112,113`: the factory scenario used an indexation factor of 0.415 for March 2006. HMRC's December 2017 table gives **0.426**. Indexation on £320,000 is now £136,320, the chargeable gain is £289,680 (was £293,200), the gain rolled over is £219,680 (was £223,200), and the new factory's base cost is £560,320 (was £556,800). The June 2012 factor of 0.150 is correct. Source: https://www.gov.uk/government/publications/corporation-tax-on-chargeable-gains-indexation-allowance-2017/indexation-allowance-december-2017
- `lessons/chargeable-gains-in-companies.ts:124,125,128`: the `basic-gain` exercise said the May 2010 factor was 0.237. The HMRC table gives **0.244**. Indexation is now £69,540 and the answer is £236,460 (was £238,455). Same source as above.
- `lessons/chargeable-gains-in-companies.ts:73`: SSE said the company being sold must be trading "immediately after the sale". For disposals from 1 April 2017 this applies only in limited cases, mainly a sale to a connected buyer. The text now says so. Source: https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg53104
- `lessons/chargeable-gains-in-companies.ts:241-242`: added CG53104 and the indexation table as sources.
- `lessons/computing-taxable-trading-profit.ts:60-61`: "late payment interest on tax" was grouped with fines as a plain add-back that is "not incurred for the trade / specifically disallowed". That is misleading. Interest on late-paid CT is relieved as a loan relationship debit, which lesson 4 of this track also says. It now has its own row: add back from trading profit, deduct as a non-trading loan relationship debit, and a note that interest on late-paid PAYE and NIC isn't deductible at all. Source: https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim45740 (added as a source at line 259)
- `lessons/rates-and-marginal-relief.ts:97,123-124`: internal inconsistency. The narrative said the junior's CT was £17,550, the comparison table showed £14,800, and the callout said "two errors had partly cancelled out", which didn't make sense. The narrative now says £14,800, which is the correct result of the junior's own figures. The callout now explains that both input errors (ignoring the associate, leaving out the dividend) increased marginal relief and together understated the tax by £2,000. The reviewed figure of £16,800 was already right. This is an arithmetic and consistency fix, so no source is needed.
- `lessons/who-pays-and-accounting-periods.ts:228`: the 3-month notification rule was cited only to the "set up your company" page, which doesn't state the deadline. Added https://www.gov.uk/guidance/corporation-tax-trading-and-non-trading, which does.

## Verified correct (no change needed)

Checked against sources fetched now:

- HMRC's free CT online filing service closed on 31 March 2026, and paper returns are allowed only with a reasonable excuse or in Welsh (closure guidance page).
- FY2026 rates: 19%/25%, limits £50k/£250k, standard fraction 3/200, ring fence fraction 11/400.
- Main rate WDA is 14% from 1 April 2026 for CT (6 April for IT), with a hybrid rate for straddling periods. The 40% FYA applies from 1 January 2026, excluding cars and second-hand assets, and is open to unincorporated businesses and leasing (not overseas leasing).
- Zero-emission car and chargepoint FYAs run to 31 March 2027 for CT and 5 April 2027 for IT.
- Late payment interest is base rate + 4% from 6 April 2025. Repayment interest is base rate − 1% with a 0.5% floor.
- Instalment rules: thresholds, dates, short APs and associated companies from April 2023.
- The 3-month notification rule.
- Goodwill relief: 6.5% rate, 6x qualifying IP cap, and related-party incorporations excluded from the FY2019 relief (CIRD44050).
- Carried-forward group relief: the surrendering company can't surrender a loss it could use itself (CTM82030/82060).

## SUSPECT

- `lessons/close-companies-and-ct61.ts:103` (and the callout at line 49): Zayn's holiday is treated as a s1064 distribution to his parents. But Imran is a director, and a benefit provided to a member of an employee's family is normally taxed on the employee as a benefit in kind (ITEPA s201). CTA 2010 s1065 takes benefits taxable as employment income out of s1064. If so, the holiday would be a BIK on Imran, deductible for the company with Class 1A NIC, not a distribution. CTM60600 says the extended distribution meaning normally doesn't apply to directors' benefits, but it doesn't deal with family members. I couldn't get the s1065 text (legislation.gov.uk blocks bots), so I left it unchanged. Recommend a specialist review, and possibly reworking the example so that no family member is employed by the company.
- `lessons/groups-and-group-relief.ts:40,149` (`claimant-own-losses` exercise): this says the claimant's available profits are reduced by its brought-forward losses "whether or not it actually claims them". CTM80400 says available total profits are after reliefs "actually claimed or automatically off-set". It applies the "whether or not claimed" rule only to same-period s37(3)(a) losses and excess capital allowances. Since 2017, s45A carry-forward claims are optional, so the statement and the £120,000 answer may be wrong. CTM80400 may also predate the 2017 reforms, so I couldn't prove it either way.
- `lessons/close-companies-and-ct61.ts:42`: the consequences table lists "Trading losses on cessation" as a close company rule. I know of no close-company-specific loss rule; the IHT transfer-of-value point (IHTA s94) is a real one. Possibly a leftover. Not changed.

## UNVERIFIED

- `lessons/quarterly-instalment-payments.ts:39,197`: the de minimis is stated as "£10,000 or less". GOV.UK's instalments page says "less than £10,000". I couldn't check the regulation itself (SI 1998/3175 reg 3) on legislation.gov.uk. It only matters for a liability of exactly £10,000.
- `lessons/intangible-fixed-assets.ts:58`: that a loss on a later sale of restricted goodwill from an incorporation is a non-trading debit only. CIRD44050 and the GOV.UK goodwill page confirm the restriction but don't cover how a disposal debit is treated.
- `lessons/intangible-fixed-assets.ts` (table row on pre-2002 assets): the wording "created or acquired from unrelated parties before 1 April 2002" is unclear, and the July 2020 change bringing some pre-2002 assets acquired from related parties into the regime isn't mentioned. Not checked against CIRD.

## Clean

11 of 15 lessons needed no edits. 7 had no issues at all: capital-allowances-aia-and-first-year-allowances, capital-allowances-pools-cars-and-disposals, structures-and-buildings-allowance, trading-losses, property-income-and-loan-relationships, ct600-filing-payment-and-penalties and hmrc-enquiries-and-time-limits. The other 4 have open SUSPECT or UNVERIFIED items above: close-companies-and-ct61, groups-and-group-relief, intangible-fixed-assets and quarterly-instalment-payments. `index.ts` is clean. who-pays-and-accounting-periods needed only a source addition.
