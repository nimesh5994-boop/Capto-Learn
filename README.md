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

## Ask Capto (`src/lib/research`)

The flow for each question:

1. **Plan:** Claude plans GOV.UK searches in HMRC's own vocabulary.
2. **Search:** the GOV.UK Search API runs those searches, filtered to HMRC manual sections and to guidance and regulation.
3. **Fetch:** the GOV.UK Content API fetches the pages, which are cached for 7 days in `source_cache`.
4. **Select:** BM25 ranking picks the relevant passages.
5. **Answer:** Claude writes a structured, cited answer.
6. **Verify:** `verifyQuote` checks every quote. Confidence can only go down when quotes fail, never up.

Each answer is stored with its token usage in `research_queries`. Plans set a monthly question allowance per firm, and failed attempts don't count against it.

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
- optionally `RESEND_API_KEY` and `EMAIL_FROM`

`npm run build` applies the migrations.
