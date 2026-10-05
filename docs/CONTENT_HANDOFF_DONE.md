# Content handoff: six tracks delivered (4 Oct 2026)

Written per HANDOFF_PROMPT.md / CONTENT_BRIEF.md. Files are on disk in this repo; nothing was committed or pushed.

## Delivered (all registered in src/content/index.ts; `npx tsx scripts/validate-content.mts` passes for all 15 tracks, tsc clean)

| Track slug | Order | Lessons | Questions |
|---|---:|---:|---:|
| directors | 10 | 11 | 105 |
| pensions | 6 | 11 | 99 |
| ir35 | 12 | 10 | 90 |
| capital-taxes | 8 | 11 | 103 |
| cis | 13 | 10 | 90 |
| practice | 15 | 12 | 108 |

## Status
- All lessons are AI drafts: need human review before staff rely on them.
- Not yet done: commit/push, deploy, visual check in the running app (dev server was never started).

## Figures to re-verify (stated from memory or hedged in the lesson text)
- s456 CTA 2010 £15,000 loan exemption; corporation tax marginal relief fraction 3/200
- CIS quarterly-payment threshold (£1,500); April 2026 CIS gross payment status changes (announced, final regulations not confirmed)
- Chapter 8 deemed payment payment deadline (left out); third MSC condition in ITEPA s61B (pointed to the statute)
- BPR/APR transitional rules (pointed to IHTM25500); quick succession relief percentages; IHT400/IHT435 form details
- First-tier Tribunal categories and time limits; TMA s9A enquiry windows; AE records retention (6/4 years); AE postponement notice (6 weeks)
- PCRT: only three of the five tax-planning standards were confirmed

## Gotchas
- Validator allowlist excludes ico.org.uk; legislation.gov.uk links return HTTP 202 to curl even for fake paths, so they cannot be machine-checked (checked by act/chapter/section pattern).
- gov.uk "off-payroll working for clients" page still shows old £10.2m/£5.1m size thresholds; HMRC manual ESM10006A has the 2025 £15m/£7.5m ones (used in the lessons).
- Cross-check numeric exercise answers against their `working` text when editing.
