/*
 * The practice vocabulary the local question bot understands: each concept, the everyday ways people ask about
 * it, HMRC's own wording, and the course it belongs to. Extend freely — order doesn't matter, longer aliases
 * win over shorter ones that overlap.
 */
export interface Concept {
  /** Canonical name, shown to the user ("Understood as: …"). */
  name: string;
  /** Ways people phrase it (lower case). Matched as whole words, plurals and simple typos tolerated. */
  aliases: string[];
  /** HMRC / GOV.UK wording used to search the official guidance. */
  official?: string[];
  /** Course slugs this belongs to, most relevant first. */
  topics: string[];
  /** A general accounting idea that official tax guidance doesn't define — answer from the lessons only. */
  general?: boolean;
  /**
   * The checked answer for "what is …?": the start of the exact lesson sentence (or line) that defines it, plus
   * any follow-on sentences from the same lesson. Verbatim; the bot exam fails if a lesson edit removes one.
   */
  pin?: { lead: string; also?: string[] };
}

export const GLOSSARY: Concept[] = [
  // Accounting basics — what trainees ask first. Official tax guidance doesn't define these.
  { name: "accounting", aliases: ["accounting", "accountancy", "what accounts are for", "purpose of accounts", "why keep accounts", "bookkeeping vs accounting"], topics: ["foundations"], general: true, pin: { lead: "Every client you'll ever work on", also: ["Accounts turn hundreds"] } },
  { name: "the accounting equation", aliases: ["accounting equation", "assets equal liabilities", "assets = liabilities"], topics: ["foundations"], general: true, pin: { lead: "Assets = Capital + Liabilities", also: ["Because the business is separate from its owner", "Profit belongs to the owner, so it increases capital"] } },
  { name: "assets", aliases: ["asset", "assets", "current assets", "non-current assets"], topics: ["foundations"], general: true, pin: { lead: "Element: Asset;" } },
  { name: "liabilities", aliases: ["liability", "liabilities", "current liabilities"], topics: ["foundations"], general: true, pin: { lead: "Element: Liability;" } },
  { name: "drawings", aliases: ["drawings", "drawing", "owner's drawings", "money taken out by the owner"], topics: ["foundations"], general: true, pin: { lead: "It's drawings: money taken out" } },
  { name: "going concern", aliases: ["going concern", "going concern basis"], topics: ["accounts-production", "foundations"], general: true, pin: { lead: "Going concern (FRS 102 Section 3)" } },
  { name: "capital and equity", aliases: ["capital", "equity", "owner's equity", "owners equity", "retained earnings", "reserves"], topics: ["foundations"], general: true, pin: { lead: "Element: Capital;" } },
  { name: "balance sheet", aliases: ["balance sheet", "statement of financial position"], topics: ["foundations", "accounts-production"], general: true, pin: { lead: "The balance sheet (statement of financial position" } },
  { name: "profit and loss account", aliases: ["profit & loss", "income and expenditure", "p and l", "profit and loss", "p&l", "income statement", "profit and loss account", "gross profit", "net profit"], topics: ["foundations", "accounts-production"], general: true, pin: { lead: "The income statement (profit and loss account) covers" } },
  { name: "financial statements", aliases: ["financial statements", "final accounts", "set of accounts"], topics: ["foundations", "accounts-production"], general: true },
  { name: "accounting concepts", aliases: ["accruals concept", "prudence concept", "business entity concept", "entity concept", "accounting concepts", "accounting principles", "consistency", "prudence", "matching concept", "materiality"], topics: ["foundations", "accounts-production"], general: true },

  // Bookkeeping & accounts
  { name: "payroll journals", aliases: ["payroll journal", "payroll journals", "wages journal", "post payroll", "posting payroll"], topics: ["bookkeeping", "payroll"], general: true },
  { name: "journal entry", aliases: ["journals", "journal entries", "journal entry", "journal", "post a journal", "journal posting", "posting journals", "manual journal", "nominal journal"], topics: ["bookkeeping", "foundations"] , general: true, pin: { lead: "The journal is for entries", also: ["Every journal should have a narrative", "A journal without a narrative"] } },
  { name: "double entry", aliases: ["debits and credits", "debit and credit", "double-entry", "double entry", "debit and credit", "debits and credits", "dr and cr", "debit credit"], topics: ["foundations", "bookkeeping"] , general: true, pin: { lead: "Double-entry bookkeeping is simply", also: ["Every transaction is recorded as at least one debit and at least one credit"] } },
  { name: "trial balance", aliases: ["trial balances", "trial balance", "tb"], topics: ["foundations", "accounts-production"] , general: true, pin: { lead: "A trial balance (TB) is a list" } },
  { name: "bank reconciliation", aliases: ["bank reconciliation", "bank rec", "reconcile the bank", "reconciling bank"], topics: ["bookkeeping", "foundations"] , general: true, pin: { lead: "A bank reconciliation explains" } },
  { name: "suspense account", aliases: ["suspense account", "suspense"], topics: ["bookkeeping"] , general: true, pin: { lead: "When a trial balance doesn't balance and you can't find" } },
  { name: "accruals", aliases: ["accrual", "accruals", "accrued expense"], official: ["accruals basis"], topics: ["foundations", "accounts-production"], pin: { lead: "Adjustment: Accrued expense (accrual);" } },
  { name: "prepayments", aliases: ["prepayment", "prepayments", "prepaid"], topics: ["foundations", "accounts-production"], pin: { lead: "Adjustment: Prepaid expense (prepayment);" } },
  // Income-side timing adjustments: the journal runs the opposite way to the expense-side ones above, so they
  // must not share their pinned answers (deferred income is Dr Sales, Cr Deferred income; not a prepayment).
  { name: "accrued income", aliases: ["accrued income"], topics: ["foundations", "accounts-production"], general: true, pin: { lead: "Adjustment: Accrued income;" } },
  { name: "deferred income", aliases: ["deferred income", "income in advance"], topics: ["foundations", "accounts-production"], general: true, pin: { lead: "Adjustment: Deferred income;" } },
  { name: "depreciation", aliases: ["depreciation", "depreciate", "straight line", "reducing balance"], topics: ["foundations", "accounts-production"], pin: { lead: "Depreciation is the way that cost is charged" } },
  { name: "fixed assets", aliases: ["fixed asset", "fixed assets", "tangible assets", "fixed asset register", "capitalise"], topics: ["accounts-production", "foundations"] },
  { name: "year-end adjustments", aliases: ["year end", "year-end", "year end adjustments", "closing entries"], topics: ["accounts-production", "foundations"] },
  { name: "chart of accounts", aliases: ["chart of accounts", "nominal codes", "nominal code", "coding transactions", "coding"], topics: ["bookkeeping"] , general: true },
  { name: "sales and purchase ledgers", aliases: ["sales ledger", "purchase ledger", "aged debtors", "aged creditors", "debtors", "creditors"], topics: ["bookkeeping", "foundations"] },
  { name: "bad debts", aliases: ["bad debt", "bad debts", "write off a debt", "irrecoverable debt"], official: ["bad debt relief"], topics: ["bookkeeping", "vat"] },
  { name: "management accounts", aliases: ["management accounts", "month end", "month-end"], topics: ["bookkeeping"] , general: true },
  { name: "filing accounts", aliases: ["file accounts", "filing accounts", "statutory accounts", "annual accounts", "micro-entity accounts", "frs 105", "frs 102"], topics: ["accounts-production", "cosec"] },
  { name: "working papers", aliases: ["working papers", "review points", "lead schedule"], topics: ["accounts-production", "practice"] , general: true },
  { name: "business records", aliases: ["record keeping", "keep records", "how long keep records", "records retention"], official: ["business records", "keeping records"], topics: ["bookkeeping", "practice"] },

  { name: "capital vs revenue expenditure", aliases: ["capital vs revenue", "capital or revenue", "capital and revenue expenditure", "capital expenditure", "revenue expenditure", "repairs or improvements", "repair or improvement"], topics: ["foundations", "corporation-tax"], general: true },
  { name: "petty cash", aliases: ["petty cash", "cash float", "imprest"], topics: ["bookkeeping"], general: true },
  { name: "catch-up bookkeeping", aliases: ["catch up", "catch-up", "catching up", "behind on bookkeeping", "backlog", "not done bookkeeping", "years of bookkeeping"], topics: ["bookkeeping"], general: true },
  { name: "dormant company", aliases: ["dormant", "dormant company", "dormant accounts", "aa02"], topics: ["cosec", "accounts-production"] },
  { name: "control accounts", aliases: ["control account", "control accounts", "control account reconciliation"], topics: ["foundations", "bookkeeping"], general: true },
  { name: "stock and inventory", aliases: ["stock", "inventory", "closing stock", "stock valuation", "work in progress", "wip"], topics: ["foundations", "accounts-production"], general: true },
  { name: "incomplete records", aliases: ["incomplete records", "missing records", "single entry"], topics: ["foundations"], general: true },

  // VAT
  { name: "VAT", aliases: ["vat", "value added tax"], official: ["VAT guide"], topics: ["vat"], pin: { lead: "VAT is a tax on consumer spending.", also: ["It's charged at each stage", "The result is that only the final consumer"] } },
  { name: "VAT registration", aliases: ["vat reg", "vat registration limit", "registration limit", "vat limit", "when to register for vat", "need to register for vat", "vat registration", "register for vat", "vat threshold", "registration threshold", "deregister", "deregistration"], official: ["VAT registration threshold"], topics: ["vat"] },
  { name: "input tax", aliases: ["input tax", "claim vat back", "reclaim vat", "recover vat", "vat recovery", "claim the vat"], official: ["input tax deduction"], topics: ["vat"], pin: { lead: "Input tax is the VAT a VAT-registered business pays" } },
  { name: "flat rate scheme", aliases: ["flat rate scheme", "flat rate", "frs vat", "limited cost trader"], official: ["VAT Flat Rate Scheme"], topics: ["vat"], pin: { lead: "Under the Flat Rate Scheme (FRS) a small business" } },
  { name: "cash accounting scheme", aliases: ["cash accounting", "cash accounting scheme"], topics: ["vat"] },
  { name: "partial exemption", aliases: ["partially exempt", "partial exempt", "exempt and taxable supplies", "partial exemption", "exempt input tax", "de minimis"], topics: ["vat"] },
  { name: "reverse charge", aliases: ["reverse charge", "domestic reverse charge", "drc"], official: ["VAT domestic reverse charge"], topics: ["vat", "cis"], pin: { lead: "Under the reverse charge the customer, not the supplier, accounts for the VAT.", also: ["The supplier invoices without charging VAT.", "The customer declares output tax on its own VAT return"] } },
  { name: "VAT return", aliases: ["vat return", "vat returns", "mtd for vat", "mtd vat", "making tax digital for vat"], topics: ["vat"] },
  // Plain "MTD" is ambiguous: VAT has been under MTD since 2019 and Income Tax since April 2026, so point at both.
  { name: "Making Tax Digital", aliases: ["making tax digital", "mtd"], official: ["Making Tax Digital"], topics: ["personal-tax", "vat"] },
  { name: "zero-rated and exempt supplies", aliases: ["zero rated", "zero-rated", "exempt", "exemption", "standard rated", "reduced rate"], topics: ["vat"] },
  { name: "business entertainment", aliases: ["entertainment", "client entertaining", "staff party", "staff entertainment"], official: ["business entertainment input tax"], topics: ["vat", "corporation-tax"] },

  // Payroll & pensions
  { name: "FPS and EPS", aliases: ["fps", "full payment submission", "eps", "employer payment summary"], topics: ["payroll"], pin: { lead: "Full Payment Submission (FPS): details of every employee paid" } },
  { name: "PAYE and RTI", aliases: ["pay as you earn", "real time information", "payroll", "paye", "rti", "run payroll"], topics: ["payroll"], pin: { lead: "PAYE (Pay As You Earn) is the system" } },
  { name: "National Insurance", aliases: ["national insurance", "nic", "nics", "employer ni", "employers ni", "employment allowance"], topics: ["payroll", "personal-tax"] },
  { name: "statutory payments", aliases: ["sick pay", "maternity pay", "statutory sick pay", "ssp", "statutory maternity pay", "smp", "paternity pay"], topics: ["payroll"] },
  { name: "benefits in kind", aliases: ["benefits-in-kind", "p11d(b)", "benefit in kind", "benefits in kind", "bik", "p11d", "company car", "payrolling benefits"], official: ["P11D expenses and benefits"], topics: ["payroll", "directors"] },
  { name: "auto-enrolment", aliases: ["auto enrol", "auto-enrol", "autoenrol", "autoenrolment", "enrol them", "pension duties", "auto enrolment", "auto-enrolment", "workplace pension", "pension contributions", "qualifying earnings"], topics: ["pensions", "payroll"], pin: { lead: "Under the Pensions Act 2008 every employer must enrol" } },
  { name: "national minimum wage", aliases: ["minimum wage", "national living wage", "nmw"], topics: ["payroll"] },

  // Directors & companies
  { name: "s455 charge", aliases: ["s455", "section 455", "s455 charge", "s455 tax", "loans to participators", "s458"], official: ["loans to participators", "section 455"], topics: ["directors", "corporation-tax"], pin: { lead: "The close-company loan rules exist to stop", also: ["If a close company makes a loan or advance"] } },
  { name: "director's loan account", aliases: ["director borrowed", "borrowed from the company", "loan from the company", "owes the company", "director paying", "paid personally", "paying personally", "director paid", "directors loan account", "director's loan account", "directors loan", "director loan", "director's loan", "dla", "overdrawn loan account", "overdrawn director", "loan to director"], official: ["loans to participators", "section 455"], topics: ["directors", "corporation-tax"], pin: { lead: "The director's loan account (DLA) is the balance sheet account" } },
  { name: "distributable reserves", aliases: ["distributable reserves", "distributable profits", "realised profits", "profits available for distribution"], topics: ["directors", "foundations"], pin: { lead: "Distributions only out of distributable profits:" } },
  { name: "dividends", aliases: ["dividend", "dividends", "illegal dividend"], topics: ["directors", "personal-tax"], pin: { lead: "A dividend is a distribution of profit to shareholders." } },
  { name: "salary vs dividend", aliases: ["salary or dividend", "salary vs dividend", "profit extraction", "optimal salary"], topics: ["directors"] },
  { name: "confirmation statement", aliases: ["confirmation statement", "cs01", "annual return"], topics: ["cosec"], pin: { lead: "Every company (and every LLP) must deliver a confirmation statement" } },
  { name: "persons with significant control", aliases: ["psc", "persons with significant control", "people with significant control"], topics: ["cosec"], pin: { lead: "The PSC regime makes the people who really own or control a company visible", also: ["The five conditions (CA 2006 Sch 1A)", "They hold more than 25% of the shares", "They hold more than 25% of the voting rights"] } },
  { name: "identity verification", aliases: ["identity verification", "id verification", "verify identity", "acsp"], topics: ["cosec", "practice"] },
  { name: "strike off", aliases: ["strike off", "striking off", "dissolve", "dissolution", "ds01", "close a company"], topics: ["cosec"] },
  { name: "share capital", aliases: ["share capital", "issue shares", "allot shares", "share transfer", "sh01"], topics: ["cosec"] },

  // Corporation tax & R&D
  { name: "corporation tax", aliases: ["corporation tax", "ct"], topics: ["corporation-tax"], pin: { lead: "Corporation tax (CT) is charged on the taxable total profits" } },
  { name: "corporation tax rates", aliases: ["corporation tax rate", "marginal relief", "small profits rate", "associated companies"], topics: ["corporation-tax"] },
  { name: "capital allowances", aliases: ["capital allowances", "annual investment allowance", "aia", "full expensing", "writing down allowance", "wda"], topics: ["corporation-tax", "personal-tax"], pin: { lead: "For most plant and machinery the Annual Investment Allowance (AIA) gives 100% relief" } },
  { name: "corporation tax return", aliases: ["ct600", "corporation tax return", "ct return", "corporation tax deadline", "pay corporation tax"], topics: ["corporation-tax"] },
  { name: "losses", aliases: ["trading loss", "trading losses", "loss relief", "carry back", "carry forward"], topics: ["corporation-tax", "personal-tax"] },
  { name: "R&D relief", aliases: ["r&d", "r and d", "research and development", "rdec", "merged scheme", "eris", "enhanced r&d intensive support", "r&d intensive"], official: ["research and development relief"], topics: ["rd"] },

  // Personal & capital taxes
  { name: "Self Assessment", aliases: ["self assessment", "sa100", "tax return", "personal tax return", "utr", "register for self assessment"], topics: ["personal-tax"] },
  { name: "payments on account", aliases: ["payments on account", "payment on account", "poa"], topics: ["personal-tax"], pin: { lead: "POAs are two advance instalments" } },
  { name: "income tax rates and allowances", aliases: ["personal allowance", "higher rate", "additional rate", "tax bands", "dividend allowance", "savings allowance"], topics: ["personal-tax"] },
  { name: "Making Tax Digital for Income Tax", aliases: ["mtd itsa", "mtd for income tax", "quarterly updates"], topics: ["personal-tax"] },
  { name: "capital gains tax", aliases: ["buy-to-let", "buy to let", "sold a property", "sale of a property", "sold a house", "sold shares", "lettings relief", "private residence", "gain on sale", "capital gains", "cgt", "annual exempt amount", "business asset disposal relief", "badr", "private residence relief"], topics: ["capital-taxes"], pin: { lead: "Capital gains tax (CGT) is charged on the gain" } },
  { name: "inheritance tax", aliases: ["inheritance tax", "iht", "nil rate band", "residence nil rate band", "potentially exempt transfer", "pet"], topics: ["capital-taxes"], pin: { lead: "Inheritance tax (IHT) is charged at 40%" } },

  // IR35, CIS, practice
  { name: "IR35 / off-payroll working", aliases: ["ir35", "off payroll", "off-payroll", "inside ir35", "outside ir35", "employment status", "status determination", "sds", "cest"], official: ["off-payroll working"], topics: ["ir35"], pin: { lead: "IR35 is the shorthand for the intermediaries legislation" } },
  { name: "gross payment status", aliases: ["gross payment status", "gps", "paid gross", "gross status"], topics: ["cis"] },
  { name: "Construction Industry Scheme", aliases: ["construction industry", "cis", "construction industry scheme", "subcontractor", "subcontractors", "cis300", "verify subcontractor"], topics: ["cis"], pin: { lead: "The Construction Industry Scheme (CIS) requires contractors", also: ["The deductions count as advance payments"] } },
  { name: "anti-money laundering", aliases: ["money laundering regulations", "due diligence", "id checks", "client id", "aml", "anti money laundering", "money laundering", "cdd", "customer due diligence", "kyc", "sar", "suspicious activity"], topics: ["practice"], pin: { lead: "Anyone who provides accountancy, bookkeeping" } },
  { name: "engagement letters", aliases: ["engagement letter", "letter of engagement", "professional clearance", "clearance letter"], topics: ["practice"] },
  { name: "penalties and interest", aliases: ["penalty", "penalties", "late filing penalty", "late payment", "interest on late"], topics: ["personal-tax", "corporation-tax", "vat", "cosec"] },
];
