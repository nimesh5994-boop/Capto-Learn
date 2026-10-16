# Proofread report: cosec (October 2026)

Scope: `src/content/tracks/cosec/index.ts` and all 15 lessons. Every theory block, table, scenario, exercise, quiz item and source was read in full. All numeric workings were re-done; journals checked for balance. All 39 non-legislation source URLs return HTTP 200. Validator: `✓ cosec: 3 modules, 15 lessons, 140 questions`. `npx tsc --noEmit -p .` is clean.

## Changed

- `lessons/companies-house-powers-fees-and-agents.ts:33,43`: the table said the financial penalty power was one of the powers "in force since 4 March 2024", with a flat "up to £10,000". It now says the power applies from 2 May 2024, the statutory cap is £10,000, and Companies House's published tariff runs from £250 to £2,000. Source: https://www.gov.uk/government/publications/companies-house-approach-to-financial-penalties/companies-house-approach-to-financial-penalties (the regulations "took effect on 2 May 2024"; tariff table £250–£2,000).
- `lessons/companies-house-powers-fees-and-agents.ts:214` (quiz q-penalty-max explain): added that the £10,000 is the statutory cap and the published tariff is £250–£2,000. The answer is unchanged. Same source as above.
- `lessons/identity-verification.ts:55`: said penalties had been available "since October 2024". It now says since 2 May 2024 (statutory cap £10,000; tariff £250–£2,000). Same source.
- `lessons/identity-verification.ts:209` (quiz q-penalty-cap explain): "Since October 2024" is now "Since 2 May 2024". Same source.
- `lessons/confirmation-statement.ts:91`: said filing the CS01 early "may move the PSC window for director-PSCs". Companies House says filing early "will not change" the 14-day dates. Corrected. Source: https://www.gov.uk/guidance/when-you-need-to-verify-your-identity-for-companies-house
- `lessons/officers-changes-and-registers.ts:124,128` (exercise tm01-deadline): the exercise counted the resignation date as day 1 and gave 3 Nov → 16 Nov. That clashed with the same lesson's scenario (2 Oct → 16 Oct) and with every other 14-day calculation in the track (CS01, PSC). The prompt is now "within how many days of the resignation", and the working says file by 17 November 2026. The answer of 14 is unchanged. Source: https://www.gov.uk/guidance/people-with-significant-control-pscs (the "within 14 days" convention matches the other lessons).
- `lessons/dividend-paperwork.ts:92`: Lena's line "£70k-odd in reserves" didn't match the figures in the scenario, which total £65,900 (£31,000 + £25,000 + £9,900). It now says "about £66k". This is arithmetic consistency; no external source needed.
- `lessons/strike-off-liquidation-and-restoration.ts:47`: said DS01 is signed by "the director(s) (a majority if more than two)". GOV.UK says it "must be signed by a majority of the company's directors". It now says both must sign when there are two. Source: https://www.gov.uk/strike-off-your-company-from-companies-register/apply-to-strike-off
- `lessons/strike-off-liquidation-and-restoration.ts:87`: said records should be kept "6 years for HMRC, and Companies House recommends keeping them after dissolution". GOV.UK says to keep business records for 7 years after strike-off, plus any employers' liability insurance policy. Corrected. Source: https://www.gov.uk/strike-off-your-company-from-companies-register/close-down-your-company
- `lessons/strike-off-liquidation-and-restoration.ts:174` (quiz q-ds01-3months): the prompt "stopped trading on 15 July", with answer 15 October, conflicted with the scenario's method (last trading day 31 May, so the earliest DS01 is 1 September). The prompt is now "last day of trading was 14 July 2026", so 15 October is consistent. The answer index is unchanged. Source: https://www.gov.uk/strike-off-your-company-from-companies-register (no trading in the last 3 months).
- `lessons/company-types-and-llps.ts:47`: one sentence treated wrongful and fraudulent trading (ss213–214) as a single test. That test is only the wrongful trading test (s214). Fraudulent trading (s213) needs intent to defraud and is also a crime. The two are now split, and the Insolvency Service source is added at line 215. Source: https://www.gov.uk/guidance/director-information-hub-director-duties-upon-insolvency

## SUSPECT

- `lessons/llp-compliance.ts:56`: the default rules are attributed to "LLP Regulations 2001 (reg 7)", but the "no majority can expel a member" rule is in reg 8, not reg 7. I couldn't confirm this because legislation.gov.uk blocks fetching, so the text is unchanged. Suggest "(regs 7 and 8)".

## UNVERIFIED

- `lessons/companies-house-powers-fees-and-agents.ts` and `lessons/identity-verification.ts`: the £10,000 statutory cap (CA 2006 s1132A(4)). Search results quote the subsection, but I couldn't fetch it directly (legislation.gov.uk), and Companies House's own penalty guidance doesn't state the cap. Left as is; it is the widely cited figure.
- `lessons/identity-verification.ts:41`: "LLP members: treated in the same way as directors". Companies House's "When you need to verify" page only names corporate LLP members (as a future phase) and is silent on individual LLP members. Not contradicted.
- `lessons/company-types-and-llps.ts`, `llp-compliance.ts` and others: statutory section references (CA 2006, LLPA 2000, IA 1986, CTA 2010 s1033–s1044, ITTOIA s396B and s863A, FA 1999 Sch 13). The rules described agree with the GOV.UK and HMRC pages I fetched where they cover them, but I couldn't check the section numbers themselves against legislation.gov.uk.

## Verified with no change needed (highlights)

- Fees schedule (updated 25 September 2026): incorporation £100/£124, same-day £156, CS01 £50/£110, name change £20/£30, same-day £85, DS01 £13/£18, charge £14/£24, RT01 £341. The 1 February 2026 fee change is confirmed.
- ECCTA transition plan (updated 5 August 2026): presenter IDV and ACSP-only filing no earlier than November 2027 with at least 6 months' notice; the DD/PSC transition and compliance action from no earlier than end-2026; the April 2028 accounts changes; shareholder information and corporate directors undated.
- IDV rules: personal code is 11 characters; director-PSC window is the 14 days starting the day after the CS date; non-director PSC window is the first 14 days of the birth month; a new PSC provides the code on being added or within 14 days.
- ACSP: registration opened 18 March 2025; report changes within 14 days; keep IDV records for 7 years; sole traders can register.
- Late filing penalties £150/£375/£750/£1,500 and the doubling rule; the appeal grounds that won't succeed.
- AA01 rules: shorten any number of times; extend once in 5 years to a maximum of 18 months, with exceptions; any existing extension is lost; no change once accounts are overdue.
- The registers abolished on 18 November 2025; the register of members is still required; the central-register election has ended.
- Stamp duty on shares: rounding, Certificate 1, nil consideration, Certificate 2, 30 days, the email mailbox.
- LLP small/micro thresholds from 6 April 2025.
- s1030A £25,000 and the 2-year condition (CTM36220).
- Companies House first-year statistics (100,400 companies; 10,200 rejections).
- Dormancy rules (GOV.UK dormant company guide).

## Clean

8 of 15 lessons needed no changes: accounts-deadlines-and-changing-year-end, dormant-companies, incorporating-a-company, llp-compliance (one SUSPECT citation only), people-with-significant-control, share-allotments-and-share-classes, share-buy-backs, share-transfers-and-stamp-duty. `index.ts` is also clean.
