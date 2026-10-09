# Capto Learn

Training and research platform for UK accountancy practices. Two halves:

- **Courses**: 15 tracks from first principles to advanced technical work (bookkeeping, accounts production, VAT, payroll, pensions, personal tax, CGT/IHT, corporation tax, directors/DLA, R&D, IR35, CIS, company secretarial, practice compliance). Every lesson has theory, a worked real-life scenario, auto-marked practical exercises (journals, calculations, classification, multiple choice) and a quiz. Managers assign training and track the team.
- **Ask Capto**: answers practice questions **only** from official sources fetched live for that question: HMRC internal manuals and GOV.UK guidance. Every point must quote its source, and the server checks each quote word for word against the fetched page, so a point is only shown as "verified" when the quote is actually there. ICAEW, ACCA, ATT, CIOT and FRC sites can be searched too; those results are shown separately and are not quote-verified.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3700
```

With no `DATABASE_URL`, the app uses an embedded PGlite Postgres under `.data/`, and migrations are applied automatically. To get test logins, stop the dev server and run `npx tsx scripts/seed-qa.mts`. It reads `QA_PASSWORD` from `.env.local` and creates "QA Test Practice" plus an internal Capto workspace with a super admin and a content reviewer. Ask Capto needs `ANTHROPIC_API_KEY`.

## Content (`src/content`)

- **Location:** lessons are TypeScript files under `tracks/<track>/lessons/`, using the model in `types.ts`. Each track's `index.ts` orders them into Foundation, Practitioner and Advanced modules, and `src/content/index.ts` registers the tracks.
- **Validation:** `npx tsx scripts/validate-content.mts [track]` checks structure. Answers must be in range, journals must balance, ids must be unique, and sources must be on the official allowlist. `scripts/validate-lessons.mts` checks lesson files that aren't in an index yet.
- **Writing rules:** `docs/CONTENT_BRIEF.md`. Some tracks are still partly written; their planned outline is in `tracks/<track>/OUTLINE.md`.
- **Review:** everything in code is an **AI draft**. Platform content reviewers sign lessons off at `/platform/content`. The sign-off records a hash of the lesson content, so a lesson edited later shows as "edited since review" until it is reviewed again. Learners can report problems on any lesson, and those reports go to the same page.
- **Answer security:** marking happens on the server. The browser never receives answers or explanations before the learner submits (see `lib/learning/marking.ts`).

## Capto Knowledge Base (`src/lib/kb`)

This is our own synced copy of the official guidance. It covers 43 core HMRC manuals plus every HMRC and Companies House guidance page on GOV.UK, about 38,000 pages in all. The content is Crown copyright, reused under the Open Government Licence v3.0. The tables are `kb_documents` and `kb_passages`, and passages are indexed with Postgres full-text search (`tsvector` + GIN).

- **Sync bot (`sync.ts`):**
  - Lists every page in each collection with GOV.UK's public timestamp, using the Search API (a few dozen calls).
  - Downloads only new or changed pages, and retires pages that are no longer published.
  - Retires answer-library entries built on a changed page, and records which lessons cite it so content reviewers can check them.
  - Uses no AI, so it costs nothing to run.
  - Is resumable: a run that hits its time budget stops as "partial", and the next run continues.
- **Schedule:** Vercel Cron calls `/api/cron/kb-sync` daily (this needs `CRON_SECRET`). The job only does real work when the weekly check is due (`FULL_SYNC_EVERY_DAYS`) or a previous run paused.
- **Manual sync:** platform admins can press "Sync now" at `/platform/knowledge`.
- **Coverage:** to add more, add a manual slug to `collections.ts`.
- **Guidance search (`/search`):** free, instant, no AI. Postgres finds the candidate passages, and `rerank` orders them by how many of the question's distinctive words they contain.

## Ask Capto (`src/lib/research`)

The flow for each question, cheapest step first:

1. **Plan:** Haiku plans the searches, restates the question in HMRC's vocabulary and grades its complexity.
2. **Answer library:** the firm's earlier verified answers are checked first. A shortlist is made by word overlap, Haiku confirms it's genuinely the same question, and the cited pages must be unchanged in the knowledge base. A match is reused for about 0.3¢.
3. **Retrieve:** passages come from the knowledge base. If it has fewer than 3 relevant pages, the GOV.UK Search and Content APIs are used live instead.
4. **Answer:** Sonnet 5.5 answers simple questions and Opus 5.5 complex ones. A Sonnet answer whose quotes fail verification is redone on Opus.
5. **Verify:** `verifyQuote` checks every quote against the full page text. Confidence can only go down when quotes fail, never up.

Each answer is stored with its route and cache-aware cost (`pricing.ts`) in `research_queries`. Plans set a monthly question allowance per firm. Failed questions and library reuses don't count against it.

## SaaS, roles & plans

This uses the same foundation as Capto Proposals:

- **Tenancy:** firms are the tenants, and signup is invite-only.
- **Firm roles:** Owner, Admin, Training manager, Staff and Trainee.
- **Platform roles:** Super admin, Operations, Content reviewer, Billing and Read-only.
- **Plans:** Trial, Starter, Professional and Practice, with seat limits, Ask Capto allowances and feature gates.
- **Audit log:** included.

Emails in `PLATFORM_ADMIN_EMAILS` are always Super admin.

## Deploy

Vercel + Neon (London), matching the other Capto apps. Set these environment variables:

- `DATABASE_URL`
- `SESSION_SECRET`
- `APP_URL`
- `PLATFORM_ADMIN_EMAILS`
- `ANTHROPIC_API_KEY`
- `CRON_SECRET` (for the weekly knowledge-base sync)
- optionally `RESEND_API_KEY` and `EMAIL_FROM`

`npm run build` applies the migrations.
