# Proofread report: capital-taxes (October 2026)

Scope: `src/content/tracks/capital-taxes/index.ts` and all 11 lessons. Every numeric exercise, worked example and MCQ/classify answer index was re-done; all arithmetic was correct. Validator (`npx tsx scripts/validate-content.mts capital-taxes`) and `npx tsc --noEmit -p .` are clean after the edits.

## Verified now against official sources (no change needed)

- CGT 2026/27: AEA £3,000; 18% within the basic-rate band (£37,700), 24% above; trustees/PRs 24%; BADR 18% from 6 April 2026 (14% 2025/26, 10% before). https://www.gov.uk/capital-gains-tax/rates, https://www.gov.uk/business-asset-disposal-relief
- BADR £1m lifetime limit and 2026 rate; claim date 31 January 2029 for 2026/27. HS275 (2026). Anti-forestalling page CG64174 exists and matches.
- Pensions into IHT for deaths on or after 6 April 2027; PRs liable to report and pay; death-in-service benefits and dependants' scheme pensions excluded. https://www.gov.uk/government/publications/inheritance-tax-unused-pension-funds-and-death-benefits/inheritance-tax-unused-pension-funds-and-death-benefits
- NRB £325,000 to 5 April 2031 (GOV.UK thresholds table); RNRB/taper freeze extended to 5 April 2031 by Budget 2025 (OOTLAR: https://www.gov.uk/government/publications/budget-2025-overview-of-tax-legislation-and-rates-ootlar/budget-2025-overview-of-tax-legislation-and-rates-ootlar). Note: the GOV.UK thresholds table still shows the RNRB row ending 5 April 2030.
- Incorporation relief claim required for transfers from 6 April 2026, deadline first anniversary of the 31 January after the tax year (31 January 2029 for 2026/27). CG65735.
- PRR: 9-month final period, 36 months for disabled/care-home, permitted absences, lettings relief (shared occupancy only, lowest of PRR/£40,000/letting gain), 2-year nomination, half a hectare. HS283 (2026).
- 60-day residential property reporting; non-residents report all disposals. GOV.UK report-and-pay page.
- Separation rules from 6 April 2023 (window ends at the earlier of the end of the third tax year after separation and the divorce/dissolution order; unlimited under a formal agreement). CG22420; CG65300 is the correct PRR separation reference.
- BPR/APR £2.5m allowance and IHT435/IHT436 (confirmed previously); IHTM25500 confirms FA 2026 Sch 12 and instalment extension.
- RNRB transfer, excepted-estate £3m exempt-estate limit, CLT payment dates (IHTM30153).

## Changed

- `lessons/iht-basics-nil-rate-bands-and-the-estate.ts:93`: said Edith's RNRB was 100% transferable because her estate passed entirely to her spouse. For a pre-6 April 2017 death, none of the RNRB could have been used, so 100% transfers whoever inherited, unless the taper applied because the estate was over £2m. The lesson now says this and the "check the rules" hedge is removed. https://www.gov.uk/guidance/inheritance-tax-transfer-of-threshold
- `lessons/iht-basics-nil-rate-bands-and-the-estate.ts:46`: the death-in-service line covered only the current "paid under discretion" rule. Added that from 6 April 2027 death-in-service benefits from registered schemes stay outside IHT whether the scheme is discretionary or not. https://www.gov.uk/government/publications/inheritance-tax-unused-pension-funds-and-death-benefits/inheritance-tax-unused-pension-funds-and-death-benefits
- `lessons/iht-basics-nil-rate-bands-and-the-estate.ts` sources: added the two GOV.UK pages above.
- `lessons/business-asset-disposal-relief.ts:54`: the claim deadline was worded "31 January, 12 months after the end of the tax year" (that would point to about 5 April 2028). It now says "first anniversary of the 31 January following the end of the tax year". The date of 31 January 2029 was already right. HS275 (2026): https://www.gov.uk/government/publications/entrepreneurs-relief-hs275-self-assessment-helpsheet/hs275-business-asset-disposal-relief-2026
- `lessons/business-asset-disposal-relief.ts:93`: the same wording fix in scenario step 5.
- `lessons/gift-holdover-rollover-and-incorporation-relief.ts:28-29`: the table said s260 needs a "joint claim by transferor and trustees", and s165 always needs a joint claim. Where the donee is the trustees of a settlement, the transferor claims alone. Both rows are corrected. HS295 (2026): https://www.gov.uk/government/publications/relief-for-gifts-and-similar-transactions-hs295-self-assessment-helpsheet/hs295-relief-for-gifts-and-similar-transactions-2026
- `lessons/gift-holdover-rollover-and-incorporation-relief.ts:147`: the quiz explanation now adds the trustee exception. The answer is unchanged. Source: HS295 (2026).
- `lessons/gift-holdover-rollover-and-incorporation-relief.ts:178`: the HS295 source now points to the 2026 helpsheet instead of the collection page.
- `lessons/chargeable-lifetime-transfers-and-trusts-basics.ts:33`: said s260 holdover applies "if a joint claim is made". It now says the transferor claims alone for a gift to trustees. Source: HS295 (2026), added to the sources list.
- `lessons/chargeable-lifetime-transfers-and-trusts-basics.ts:42`: gave an immediate post-death interest as an example of a lifetime interest-in-possession trust that isn't relevant property. That can't happen, because an IPDI only arises under a will or intestacy. The example is now a disabled person's interest. https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm16061
- `lessons/bpr-and-apr-reforms-from-april-2026.ts:99`: Grace "never married", but step 8 referred to her "surviving spouse" (a spouse surviving her would not pass an allowance to her). It now reads "if Grace had instead been a widow whose late spouse's allowance was entirely unused". This is a logic/language fix with no figures changed. Rule source: IHTM25500/IHTM25530.
- `lessons/estate-administration-iht400-and-deadlines.ts:94`: said the 36% rate applies if the charity gift "exceeds 10%". The test is "at least 10%", as the IHT basics lesson already says. https://www.gov.uk/inheritance-tax
- `lessons/share-matching-rules-and-the-section-104-pool.ts:193`: the source "Capital Gains Tax: shares" pointed to the general CGT page. It is replaced with https://www.gov.uk/tax-sell-shares/same-company (averaging and the 30-day rule).

## SUSPECT

- `lessons/estate-administration-iht400-and-deadlines.ts:29`: the excepted-estate row says "gross estate up to £650,000 where a transferred nil-rate band doubles the threshold (both bands available)". IHTM06024 says that for deaths on or after 1 January 2022 a claim can be made if *some* of the first NRB was unused, so 100% is no longer required. The limits are gross value no more than twice the NRB, plus conditions on the first estate (long-term resident or domiciled, foreign assets of £100,000 or less, no BPR/APR, no settled property). "(both bands available)" looks too strict, but I couldn't read the full text to restate it safely, so it is unchanged. The claim that IHT217 isn't used from 1 January 2022 is also not confirmed.
- `lessons/business-asset-disposal-relief.ts:58`: "BADR gains ... are not subject to the 18/24% split" is true. It doesn't mention that BADR gains use up the basic-rate band before other gains, which can push ordinary gains to 24%. HS275 doesn't address this, so I didn't add it. Consider adding it once checked in the CG manual.

## UNVERIFIED

- `lessons/property-gains-prr-lettings-and-60-day-reporting.ts:55`: the "27 October 2021" start date for the 60-day limit isn't stated on the GOV.UK page I fetched. Left as is; it matches the known change from 30 to 60 days.
- Sections and Acts cited only via legislation.gov.uk (TCGA ss38/104/106A/162/223/58/260, IHTA s3A/s5/s7/s142, FA 1986 s102, FA 2026 contents `ukpga/2026/11`) weren't fetched because the site blocks bots. The FA 2026 chapter number (11) is unconfirmed.
- `lessons/property-gains-prr-lettings-and-60-day-reporting.ts:192`: HS283 (2026) exists but its own opening paragraph has a date typo ("between 6 April 2025 and 5 April 2025"). This is an HMRC error, and the lesson isn't affected.
- `lessons/estate-administration-iht400-and-deadlines.ts:57`: loss on sale of land is relieved within 4 years (s191 three years plus s197A fourth year). Not separately fetched.

## Clean

4 of 11 lessons had no issues and were not edited: `cgt-computation-rates-and-annual-exempt-amount`, `property-gains-prr-lettings-and-60-day-reporting`, `lifetime-gifts-pets-taper-relief-and-exemptions`, `cgt-losses-spouses-and-separation` (separation window and CG65300 reference confirmed). `index.ts` is also clean.
