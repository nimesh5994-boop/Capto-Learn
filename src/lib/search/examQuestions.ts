/*
 * The question bank for the bot exam (botExam.test.ts) and the eyeball report (scripts/bot-report.mts).
 * Questions are written the way staff actually type them: short, misspelt, slangy, or full client scenarios.
 *
 * expect.concept   — the concept the bot should recognise first
 * expect.topic     — the course it should route to
 * expect.intent    — what kind of question it is
 * expect.instant   — "lesson" | "none": whether Level 1 should answer from a lesson, or pass up to Ask Capto
 * expect.from      — course the instant answer must come from
 * expect.lead      — the instant answer's first sentence must mention one of these
 * expect.entry     — the answer must show a Dr and a Cr line (journal questions); entryMentions: about what
 */
import type { Intent } from "./understand";

export interface ExamCase {
  q: string;
  level: "simple" | "medium" | "hard";
  expect: { concept?: string; topic?: string; intent?: Intent; instant?: "lesson" | "none"; from?: string; lead?: string[]; entry?: boolean; entryMentions?: string[] };
}

const simple = (q: string, e: ExamCase["expect"]): ExamCase => ({ q, level: "simple", expect: e });
const medium = (q: string, e: ExamCase["expect"]): ExamCase => ({ q, level: "medium", expect: e });
const hard = (q: string, e: ExamCase["expect"]): ExamCase => ({ q, level: "hard", expect: e });

export const EXAM_QUESTIONS: ExamCase[] = [
  // ── Accounting basics (foundations)
  simple("what is accounting", { concept: "accounting", intent: "definition", topic: "foundations", instant: "lesson", from: "foundations", lead: ["reliable record", "account"] }),
  simple("what is accountancy?", { concept: "accounting", instant: "lesson", from: "foundations" }),
  simple("What is a balance sheet?", { concept: "balance sheet", intent: "definition", instant: "lesson", from: "foundations", lead: ["balance sheet"] }),
  simple("what is a profit and loss account", { concept: "profit and loss account", intent: "definition", instant: "lesson", lead: ["profit", "income statement"] }),
  simple("what's an asset", { concept: "assets", intent: "definition", instant: "lesson", from: "foundations", lead: ["asset"] }),
  simple("what are liabilities", { concept: "liabilities", intent: "definition", instant: "lesson", from: "foundations", lead: ["liabilit"] }),
  simple("what is the accounting equation", { concept: "the accounting equation", intent: "definition", instant: "lesson", from: "foundations", lead: ["equation", "assets"] }),
  simple("what is depreciation", { concept: "depreciation", intent: "definition", instant: "lesson", lead: ["depreciat"] }),
  simple("what is double entry", { concept: "double entry", intent: "definition", instant: "lesson", from: "foundations", lead: ["debit", "double entry", "double-entry"] }),
  simple("explain debits and credits", { concept: "double entry", instant: "lesson", from: "foundations", lead: ["debit", "credit", "double-entry"] }),
  simple("what is a trial balance", { concept: "trial balance", intent: "definition", instant: "lesson", from: "foundations", lead: ["trial balance"] }),
  simple("what is an accrual", { concept: "accruals", intent: "definition", instant: "lesson", lead: ["accru"] }),
  simple("what is a prepayment", { concept: "prepayments", intent: "definition", instant: "lesson", lead: ["prepa"] }),
  simple("what is a suspense account", { concept: "suspense account", intent: "definition", instant: "lesson", lead: ["suspense"] }),
  simple("what are drawings", { concept: "drawings", intent: "definition", instant: "lesson", lead: ["drawings"] }),
  simple("what is going concern", { concept: "going concern", intent: "definition", instant: "lesson", lead: ["going concern"] }),
  medium("difference between capital and revenue expenditure", { concept: "capital vs revenue expenditure", instant: "lesson", from: "foundations", lead: ["capital", "revenue"] }),
  medium("what is the difference between a balance sheet and a profit and loss", { topic: "foundations", instant: "lesson", lead: ["balance sheet", "income statement"] }),
  medium("how do I prepare a trial balance", { concept: "trial balance", intent: "how_to", instant: "lesson", lead: ["trial balance"] }),
  medium("how to correct an error using a suspense account", { concept: "suspense account", intent: "how_to", instant: "lesson", from: "foundations", lead: ["suspense"] }),

  // ── Journals for specific things ("what's the journal for X?") — must show X's Dr/Cr entry
  simple("what is jpurnal entry for depreciation", { instant: "lesson", from: "foundations", entry: true, entryMentions: ["depreciation"] }),
  simple("depreciation journal", { instant: "lesson", from: "foundations", entry: true, entryMentions: ["depreciation"] }),
  simple("double entry for depreciation", { instant: "lesson", from: "foundations", entry: true, entryMentions: ["depreciation"] }),
  simple("dr cr for depreciation", { instant: "lesson", from: "foundations", entry: true, entryMentions: ["depreciation"] }),
  simple("how do I post the depreciation journal", { instant: "lesson", from: "foundations", entry: true, entryMentions: ["depreciation"] }),
  simple("journal for an accrual", { instant: "lesson", from: "foundations", entry: true, entryMentions: ["accru"] }),
  simple("what is the journal entry for a prepayment", { instant: "lesson", from: "foundations", entry: true, entryMentions: ["prepa", "prepaid"] }),

  // ── Bookkeeping
  simple("how to post joournal entry?", { concept: "journal entry", intent: "how_to", instant: "lesson", from: "foundations", lead: ["journal"] }),
  simple("how do I do a bank reconciliation", { concept: "bank reconciliation", intent: "how_to", instant: "lesson", lead: ["bank", "reconcil"] }),
  simple("bank rec steps", { concept: "bank reconciliation", instant: "lesson" }),
  medium("how should I code a director paying a business expense personally", { concept: "director's loan account", instant: "none" }),
  medium("how do I post a payroll journal", { concept: "payroll journals", intent: "how_to", instant: "lesson", from: "bookkeeping", lead: ["payroll"] }),
  medium("how do I deal with petty cash", { concept: "petty cash", intent: "how_to", instant: "lesson", lead: ["petty cash"] }),
  medium("what goes in a management accounts pack", { concept: "management accounts", instant: "lesson", lead: ["management accounts"] }),
  hard("client hasn't done bookkeeping for 3 years, how do I catch up", { concept: "catch-up bookkeeping", intent: "how_to", instant: "lesson", lead: ["catch"] }),

  // ── VAT
  simple("vat registration threshold", { concept: "VAT registration", topic: "vat", intent: "rate" }),
  simple("vat reg limit", { concept: "VAT registration", topic: "vat" }),
  simple("what is the flat rate scheme", { concept: "flat rate scheme", intent: "definition", topic: "vat", instant: "lesson", from: "vat", lead: ["flat rate"] }),
  simple("what is cash accounting for vat", { concept: "cash accounting scheme", topic: "vat", instant: "lesson", from: "vat", lead: ["cash accounting"] }),
  simple("what is input tax", { concept: "input tax", intent: "definition", topic: "vat", instant: "lesson", from: "vat", lead: ["input tax"] }),
  simple("what is the reverse charge", { concept: "reverse charge", intent: "definition", instant: "lesson", lead: ["customer, not the supplier"] }),
  medium("can I claim VAT back on a staff party?", { concept: "input tax", topic: "vat", instant: "none" }),
  medium("is vat recoverable on client entertaining", { concept: "business entertainment", topic: "vat", instant: "none" }),
  medium("when is a vat return due", { concept: "VAT return", intent: "deadline", topic: "vat" }),
  hard("client on flat rate scheme spends little on goods — are they a limited cost trader and what rate applies?", { concept: "flat rate scheme", topic: "vat", instant: "none" }),
  hard("partially exempt business: how do I work out how much input tax is recoverable", { concept: "partial exemption", topic: "vat", instant: "none" }),

  // ── Payroll & pensions
  simple("what is PAYE", { concept: "PAYE and RTI", intent: "definition", topic: "payroll", instant: "lesson", lead: ["paye"] }),
  simple("what is an FPS", { concept: "FPS and EPS", topic: "payroll", instant: "lesson", lead: ["full payment submission"] }),
  simple("what is auto enrolment", { concept: "auto-enrolment", intent: "definition", topic: "pensions", instant: "lesson", from: "pensions", lead: ["enrol"] }),
  simple("what is ssp", { concept: "statutory payments", topic: "payroll", instant: "lesson", from: "payroll" }),
  medium("how do I report benefits in kind", { concept: "benefits in kind", intent: "how_to", topic: "payroll", instant: "none" }),
  medium("employer ni rate this year", { concept: "National Insurance", intent: "rate", topic: "payroll" }),
  hard("employee earns £9,000 a year, do I have to auto enrol them?", { concept: "auto-enrolment", topic: "pensions", instant: "none" }),

  // ── Directors & companies
  simple("what is a directors loan account", { concept: "director's loan account", intent: "definition", topic: "directors", instant: "lesson", lead: ["loan"] }),
  simple("dla overdrawn", { concept: "director's loan account", topic: "directors" }),
  simple("what is s455", { concept: "s455 charge", topic: "directors", instant: "lesson", lead: ["455", "close-company loan"] }),
  medium("What is the s455 rate on an overdrawn director's loan?", { concept: "director's loan account", intent: "rate", topic: "directors" }),
  medium("salary vs dividend for a director", { concept: "salary vs dividend", topic: "directors", instant: "none" }),
  medium("what are distributable reserves", { concept: "distributable reserves", intent: "definition", instant: "lesson", lead: ["realised profits"] }),
  hard("director borrowed £40k from the company and repaid it after year end, what tax applies and can we get it back?", { concept: "director's loan account", topic: "directors", instant: "none" }),

  // ── Company secretarial
  simple("When is the confirmation statement due?", { concept: "confirmation statement", intent: "deadline", topic: "cosec" }),
  simple("what is a confirmation statement", { concept: "confirmation statement", intent: "definition", topic: "cosec", instant: "lesson", from: "cosec", lead: ["confirmation statement"] }),
  simple("what is a PSC", { concept: "persons with significant control", intent: "definition", topic: "cosec", instant: "lesson", from: "cosec", lead: ["own or control"] }),
  medium("how do I strike off a company", { concept: "strike off", intent: "how_to", topic: "cosec", instant: "lesson", lead: ["strike", "dissol", "ds01"] }),
  medium("late filing penalty for company accounts", { concept: "penalties and interest", intent: "penalty" }),
  hard("company is dormant but has a director's loan — can it file dormant accounts?", { topic: "cosec", instant: "none" }),

  // ── Corporation tax & R&D
  simple("corporation tax rate", { concept: "corporation tax rates", intent: "rate", topic: "corporation-tax" }),
  simple("what is marginal relief", { concept: "corporation tax rates", intent: "definition", topic: "corporation-tax", instant: "lesson", lead: ["marginal relief"] }),
  simple("what is the annual investment allowance", { concept: "capital allowances", intent: "definition", instant: "lesson", lead: ["100% relief"] }),
  simple("ct600 deadline", { concept: "corporation tax return", intent: "deadline", topic: "corporation-tax" }),
  medium("what counts as R&D for tax", { concept: "R&D relief", topic: "rd", instant: "none" }),
  hard("software company with £400k R&D spend — merged scheme or ERIS, and what's the benefit?", { concept: "R&D relief", topic: "rd", instant: "none" }),

  // ── Personal & capital taxes
  simple("self assessment deadline", { concept: "Self Assessment", intent: "deadline", topic: "personal-tax" }),
  simple("what are payments on account", { concept: "payments on account", intent: "definition", topic: "personal-tax", instant: "lesson", lead: ["advance instalments"] }),
  simple("personal allowance", { concept: "income tax rates and allowances", topic: "personal-tax" }),
  simple("what is capital gains tax", { concept: "capital gains tax", intent: "definition", topic: "capital-taxes", instant: "lesson", lead: ["gain"] }),
  simple("what is the nil rate band", { concept: "inheritance tax", intent: "definition", topic: "capital-taxes", instant: "lesson", lead: ["nil rate band", "nil-rate band"] }),
  medium("how much is badr", { concept: "capital gains tax", intent: "rate", topic: "capital-taxes" }),
  hard("client sold a buy-to-let they once lived in — how is the gain worked out and is any relief available?", { concept: "capital gains tax", topic: "capital-taxes", instant: "none" }),

  // ── IR35, CIS, practice
  simple("what is IR35", { concept: "IR35 / off-payroll working", intent: "definition", topic: "ir35", instant: "lesson", from: "ir35", lead: ["ir35", "off-payroll"] }),
  medium("is my contractor inside IR35", { concept: "IR35 / off-payroll working", topic: "ir35", instant: "none" }),
  simple("what is CIS", { concept: "Construction Industry Scheme", intent: "definition", topic: "cis", instant: "lesson", from: "cis", lead: ["construction industry scheme", "cis"] }),
  medium("how do subcontractors get gross payment status under CIS", { concept: "gross payment status", topic: "cis", instant: "lesson", lead: ["gross payment", "test"] }),
  simple("what is AML", { concept: "anti-money laundering", intent: "definition", topic: "practice", instant: "lesson", lead: ["money laundering"] }),
  medium("what checks do I do for customer due diligence", { concept: "anti-money laundering", topic: "practice" }),
  simple("what is an engagement letter", { concept: "engagement letters", intent: "definition", topic: "practice", instant: "lesson", lead: ["engagement letter"] }),

  // ── Off-topic / unknown — must not invent an answer
  simple("something unusual about widgets", { instant: "none" }),
  simple("what's the weather tomorrow", { instant: "none" }),
];
