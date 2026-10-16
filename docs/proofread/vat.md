# Proofread report: VAT track (October 2026)

Scope: `src/content/tracks/vat/index.ts` and all 16 lessons. All arithmetic in exercises, worked examples, tables and journals was recomputed, and MCQ/multi answer indexes were checked. `npx tsx scripts/validate-content.mts vat` passes (3 modules, 16 lessons, 163 questions) and `npx tsc --noEmit -p .` is clean.

## Changed

- `lessons/flat-rate-scheme.ts:117` (scenario step 1): counted a £180 monitor as a "relevant good" in the limited cost trader test on the grounds that it was under £2,000. Notice 733 says relevant goods exclude "capital expenditure goods of any value" and treats electronic devices (laptops, phones) as capital expenditure. It now excludes the monitor, so relevant goods are £48, not £228. The conclusion (limited cost business, £4,158 due) and the comparison table are unchanged. Source: https://www.gov.uk/guidance/flat-rate-scheme-for-small-businesses-vat-notice-733--2
- `lessons/flat-rate-scheme.ts:75` (limited cost trader rule callout): said only "capital expenditure". It now says "capital expenditure goods of any value", with the laptops and phones example, so readers don't repeat the mistake above. Same source.
- `lessons/flat-rate-scheme.ts:177` (exercise `lct-test`): the £700 of relevant goods included a scanner, which is capital expenditure and so not a relevant good. The items are now "stationery, toner and printer paper". The answer (£6,930) and the explanation are unchanged. Same source.
- `lessons/registration-and-deregistration.ts:121` (deregistration tip): said assets with a "VAT-inclusive value up to £6,000" fall within the £1,000 de minimis. The deemed supply is valued net, so this was confusing. It now says a total net (VAT-exclusive) value up to £5,000. Source: https://www.gov.uk/government/publications/vat-notice-70011-cancelling-your-registration/vat-notice-70011-cancelling-your-registration
- `lessons/land-property-and-togc.ts:32` and `:181`: gave the Scottish major interest as "(20 in Scotland)" next to "more than 21 years", which reads as "more than 20". Notice 708 defines it as the owner's interest or a lease for a term of **not less than 20 years**. Both places now say "20 years or more". Source: https://www.gov.uk/guidance/buildings-and-construction-vat-notice-708
- `lessons/partial-exemption-and-capital-goods-scheme.ts:83` (CGS): the table gave land and buildings a flat 10 intervals. Added the missing exception: for an interest with less than 10 years to run, the period is the complete years plus 1, with a minimum of 3 intervals. Source: https://www.gov.uk/guidance/capital-goods-scheme-notice-7062 (section 6.3)
- `lessons/input-tax-what-you-can-claim.ts:8`: the lesson uses year-dependent figures (£250, £2,000, 4 years) but had no `taxYear`. Added `taxYear: "2026/27"`, as CONTENT_BRIEF requires.

## SUSPECT

- `lessons/partial-exemption-and-capital-goods-scheme.ts` (callout "The 29 July 2026 changes"): says "HMRC's guidance says the new rules apply only where no capital expenditure on the item was incurred before 29 July 2026". Neither Revenue and Customs Brief 7 (2026) nor the current Notice 706/2 says this. The brief applies the new threshold to items "acquired, constructed, refurbished, fitted out, altered or extended on or after 29 July 2026", and keeps existing items in the scheme. The sentence may be right if it comes from another HMRC source, but I couldn't find one. Consider rewording it to the brief's test or removing it.
- `lessons/domestic-reverse-charge-construction.ts` (5% disregard tip): says the disregard "applies only where the customer has notified end user or intermediary status". The technical guide puts the 5% rule next to the sentence "Normal VAT rules will apply if the customer makes an end user or intermediary supplier notification", so the link is ambiguous. I left it unchanged. The guide also says the disregard doesn't apply where the main element is zero-rated, and the lesson doesn't mention this.

## UNVERIFIED

- Section and paragraph references I couldn't confirm against the live notices: Notice 741A "section 6.4" and "section 12"; Notice 703 "paragraph 3.5"; Notice 742A "section 4.2"; VAT (Input Tax) Order art 7(2E). legislation.gov.uk can't be fetched.
- Notice 700/65 para 2.6 says VAT on entertaining overseas customers "may be recoverable when incurred for the purpose of the business". The lesson's "reasonable in scale (e.g. a modest working meal)" is a fair reading, but I couldn't confirm the wording exactly.
- Private school fees standard-rated from 1 January 2025: the GOV.UK rates page I fetched excludes private schools from the education exemption but doesn't state the date. Left as is.
- Late payment penalties "for VAT periods starting on or after 1 April 2025": the GOV.UK page confirms 3% / 3% / 10% a year but didn't show the start date in what I fetched. The interest rate (base + 4% from 6 April 2025) is confirmed.

## Confirmed against official sources this session (no change needed)

- Temporary zero rate for domestic electricity in GB, 1 October 2026 to 31 March 2027, NI stays at 5%, liability may follow the date of consumption (RCB 10 (2026)).
- Temporary 5% rate for children's meals, tickets and family attractions, 25 June to 1 September 2026 (RCB 5 (2026)).
- Fuel scale charges from 1 May 2026, all 8 bands quoted (quarterly and annual), plus the engine-size fallback bands.
- Energy-saving materials zero rate until 31 March 2027.
- CGS: £600,000 threshold and computers removed from 29 July 2026; vessels unchanged at £50,000; adjustment entered in the second period after the interval.
- FRS sector rates (all 11 quoted), 16.5%, £150,000 / £230,000, 1% first-year discount, the £2,000 capital rule, 12-month rejoin bar, PVA and reverse charge excluded from flat rate turnover.
- Registration £90,000 and the historic/future test dates; deregistration de minimis £1,000 and the excluded assets.
- Cash accounting: entry and exit thresholds, the 6-month exit option and its exclusions, payment dating, FRS interaction.
- Partial exemption: rounding and the £400,000/month exception, de minimis and Tests One and Two, annual adjustment timing, items excluded from the standard method.
- Error correction (Method 1/2 limits, Method 1 is not a disclosure, the 4-year rules); penalty points thresholds; Notice 700/12 box 6 and box 7 content (including DRC customers not using box 6); motoring car definition and exempt sale of blocked cars; DRC excluded services; payments on account £2.3m.

## Clean

11 of 16 lessons were checked with no issues: how-vat-works, rates-and-liability, tax-points-and-vat-invoices, vat-returns-and-mtd, daily-vat-query-clinic, motoring-and-fuel-scale-charge, cash-annual-accounting-and-bad-debt-relief, margin-schemes, domestic-reverse-charge-construction (apart from the SUSPECT item), international-services-and-goods, errors-penalties-and-compliance-checks. `index.ts` is also clean.
