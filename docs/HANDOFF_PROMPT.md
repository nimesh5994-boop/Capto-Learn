You are writing training content for Capto Learn, a UK accountancy staff-training app in C:\Dev\capto-learn.

FIRST read, in full:
1. C:\Dev\capto-learn\docs\CONTENT_BRIEF.md  (the rules — follow them exactly)
2. C:\Dev\capto-learn\src\content\types.ts  (the lesson format)
3. C:\Dev\capto-learn\src\content\tracks\vat\lessons\input-tax-what-you-can-claim.ts  (the gold-standard lesson to match in depth and style)

YOUR TRACKS — write ONLY inside these six folders, one track at a time, in this order:
  src/content/tracks/directors/
  src/content/tracks/pensions/
  src/content/tracks/ir35/
  src/content/tracks/capital-taxes/
  src/content/tracks/cis/
  src/content/tracks/practice/

Track details (slug, title, icon, order, scope):

- directors — "Directors, DLA & profit extraction", icon "Briefcase", order 10. Directors' duties (CA 2006 ss171–177); the director's loan account (credit vs overdrawn; coding personal spending); s455 (VERIFY the rate for 2026/27 loans); 9-month window and s458 relief; anti bed-and-breakfasting (s464C 30-day and £5,000 rules); writing off a DLA (income tax as distribution + Class 1 NIC); beneficial loan BIK (£10,000 threshold, official rate — verify); directors lending to the company; dividend legality and distributable reserves, illegal dividends, minutes/vouchers, waivers, alphabet shares; salary vs dividend planning with VERIFIED 2026/27 figures (employer NIC secondary threshold, Employment Allowance single-director restriction, dividend rates); employer pension contributions as extraction; closing a company (MVL, BADR, s1030A, TAAR).

- pensions — "Pensions & auto-enrolment", icon "PiggyBank", order 6. AE duties (duties start date, declaration of compliance, re-declaration); assessing workers (verify 2026/27 earnings trigger and qualifying earnings band); postponement; opt-in/opt-out/refunds; minimum contributions 8%/3%; directors' exemption; TPR enforcement; net pay vs relief at source; salary sacrifice (verify any announced NIC cap and start date); employer contributions for owner-directors and "wholly and exclusively"; annual allowance, taper, carry forward, MPAA; Lump Sum Allowance / LSDBA; pensions and IHT (verify status/date); higher-rate relief through Self Assessment.

- ir35 — "IR35 & employment status", icon "FileCheck", order 12. Status case law (only cases you can verify: Ready Mixed Concrete, Atholl House, PGMOL Supreme Court 2024, etc.); Chapter 8 vs Chapter 10 ITEPA; small company test (VERIFY thresholds raised from April 2025); CEST and its limits; SDS and disputes; fee-payer duties; Chapter 10 deemed direct payment; Chapter 8 deemed employment payment (5% allowance, worked example); MSC rules; umbrella companies and the April 2026 umbrella PAYE liability (verify); practical advice for contractor clients.

- capital-taxes — "Capital gains & inheritance tax", icon "Landmark", order 8. CGT computation, annual exempt amount and VERIFIED rates; exemptions; PRR (final period, lettings relief); UK residential property 60-day reporting; share matching rules and s104 pool; BADR (verify April 2025 / April 2026 rates and lifetime limit); gift holdover, rollover, incorporation relief; losses; spouses and separation. IHT: nil-rate band, residence nil-rate band and taper, PETs and 7-year rule, taper relief, CLTs and trusts basics, exemptions (annual, small gifts, normal expenditure out of income, spouse), BPR/APR reforms from April 2026 (verify), estate computation, pensions in estates (verify date), IHT400 and deadlines.

- cis — "Construction Industry Scheme", icon "HardHat", order 13. 10–12 lessons. Contractors/subcontractors and deemed contractors; registering; verification; 20%/30%/gross status and gross payment status tests (verify); labour vs materials, excluding VAT; monthly and nil returns, deadlines, penalties; subcontractor statements; reclaiming CIS (Ltd via EPS, sole traders via SA); VAT domestic reverse charge interaction; recent changes (verify); CIS bookkeeping.

- practice — "Practice, ethics & compliance", icon "ShieldCheck", order 15. AML (MLR 2017, supervisors, firm-wide risk assessment, CDD/EDD, PEPs, beneficial owners, record keeping, SARs/MLRO/tipping off/DAML); failure to prevent fraud offence (verify in-force date); ethics (fundamental principles, conflicts, confidentiality, competence); PCRT; engagement letters; client take-on, disengagement and professional clearance; GDPR for practices; HMRC agent authorisation (ASA, 64-8, MTD); HMRC enquiries, information notices, assessment time limits (4/6/20 years), inaccuracy penalties and disclosure reductions; late filing/payment regimes; tribunal route basics; PI insurance and file review.

FILE FORMAT
- Each lesson: src/content/tracks/<track>/lessons/<lesson-slug>.ts exporting `export const lesson: Lesson = {...}` (import type from "../../../types").
- Each track: src/content/tracks/<track>/index.ts doing `export default` a Track (import type from "../../types"), with modules for foundation, practitioner and advanced levels, 10–16 lessons in teaching order.
- After each track run:  npx tsx scripts/validate-content.mts <track>   and fix everything until it prints ✓.

RULES
- Do NOT edit anything outside those six folders. Do NOT edit src/content/index.ts (the main session registers tracks). Do NOT run git commands, npm install, or start the dev server.
- Do NOT launch sub-agents — write the lessons yourself, one at a time (this keeps usage under control).
- Verify every rate, threshold and date on gov.uk / legislation.gov.uk before using it (it is October 2026; current figures are 2026/27). If you can't verify a figure, explain the principle and cite the source instead of stating a number.
- When a track is finished, print a short summary: lessons written, any figures you couldn't verify.
