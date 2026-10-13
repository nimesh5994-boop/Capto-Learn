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
}

export const GLOSSARY: Concept[] = [
  // Bookkeeping & accounts
  { name: "journal entry", aliases: ["journal entry", "journal", "post a journal", "journal posting", "posting journals", "manual journal", "nominal journal"], topics: ["bookkeeping", "foundations"] },
  { name: "double entry", aliases: ["double entry", "debit and credit", "debits and credits", "dr and cr", "debit credit"], topics: ["foundations", "bookkeeping"] },
  { name: "trial balance", aliases: ["trial balance", "tb"], topics: ["foundations", "accounts-production"] },
  { name: "bank reconciliation", aliases: ["bank reconciliation", "bank rec", "reconcile the bank", "reconciling bank"], topics: ["bookkeeping", "foundations"] },
  { name: "suspense account", aliases: ["suspense account", "suspense"], topics: ["bookkeeping"] },
  { name: "accruals", aliases: ["accrual", "accruals", "accrued expense", "accrued income"], official: ["accruals basis"], topics: ["foundations", "accounts-production"] },
  { name: "prepayments", aliases: ["prepayment", "prepayments", "prepaid", "deferred income"], topics: ["foundations", "accounts-production"] },
  { name: "depreciation", aliases: ["depreciation", "depreciate", "straight line", "reducing balance"], topics: ["foundations", "accounts-production"] },
  { name: "fixed assets", aliases: ["fixed asset", "fixed assets", "tangible assets", "fixed asset register", "capitalise"], topics: ["accounts-production", "foundations"] },
  { name: "year-end adjustments", aliases: ["year end", "year-end", "year end adjustments", "closing entries"], topics: ["accounts-production", "foundations"] },
  { name: "chart of accounts", aliases: ["chart of accounts", "nominal codes", "nominal code", "coding transactions", "coding"], topics: ["bookkeeping"] },
  { name: "sales and purchase ledgers", aliases: ["sales ledger", "purchase ledger", "aged debtors", "aged creditors", "debtors", "creditors"], topics: ["bookkeeping", "foundations"] },
  { name: "bad debts", aliases: ["bad debt", "bad debts", "write off a debt", "irrecoverable debt"], official: ["bad debt relief"], topics: ["bookkeeping", "vat"] },
  { name: "management accounts", aliases: ["management accounts", "month end", "month-end"], topics: ["bookkeeping"] },
  { name: "filing accounts", aliases: ["file accounts", "filing accounts", "statutory accounts", "annual accounts", "micro-entity accounts", "frs 105", "frs 102"], topics: ["accounts-production", "cosec"] },
  { name: "working papers", aliases: ["working papers", "review points", "lead schedule"], topics: ["accounts-production", "practice"] },
  { name: "business records", aliases: ["record keeping", "keep records", "how long keep records", "records retention"], official: ["business records", "keeping records"], topics: ["bookkeeping", "practice"] },

  // VAT
  { name: "VAT registration", aliases: ["vat registration", "register for vat", "vat threshold", "registration threshold", "deregister", "deregistration"], official: ["VAT registration threshold"], topics: ["vat"] },
  { name: "input tax", aliases: ["input tax", "claim vat back", "reclaim vat", "recover vat", "vat recovery", "claim the vat"], official: ["input tax deduction"], topics: ["vat"] },
  { name: "flat rate scheme", aliases: ["flat rate scheme", "flat rate", "frs vat", "limited cost trader"], official: ["VAT Flat Rate Scheme"], topics: ["vat"] },
  { name: "cash accounting scheme", aliases: ["cash accounting", "cash accounting scheme"], topics: ["vat"] },
  { name: "partial exemption", aliases: ["partial exemption", "exempt input tax", "de minimis"], topics: ["vat"] },
  { name: "reverse charge", aliases: ["reverse charge", "domestic reverse charge", "drc"], official: ["VAT domestic reverse charge"], topics: ["vat", "cis"] },
  { name: "VAT return", aliases: ["vat return", "vat returns", "making tax digital", "mtd"], topics: ["vat"] },
  { name: "zero-rated and exempt supplies", aliases: ["zero rated", "zero-rated", "exempt", "exemption", "standard rated", "reduced rate"], topics: ["vat"] },
  { name: "business entertainment", aliases: ["entertainment", "client entertaining", "staff party", "staff entertainment"], official: ["business entertainment input tax"], topics: ["vat", "corporation-tax"] },

  // Payroll & pensions
  { name: "PAYE and RTI", aliases: ["paye", "rti", "fps", "eps", "full payment submission", "run payroll"], topics: ["payroll"] },
  { name: "National Insurance", aliases: ["national insurance", "nic", "nics", "employer ni", "employers ni", "employment allowance"], topics: ["payroll", "personal-tax"] },
  { name: "statutory payments", aliases: ["statutory sick pay", "ssp", "statutory maternity pay", "smp", "paternity pay"], topics: ["payroll"] },
  { name: "benefits in kind", aliases: ["benefit in kind", "benefits in kind", "bik", "p11d", "company car", "payrolling benefits"], official: ["P11D expenses and benefits"], topics: ["payroll", "directors"] },
  { name: "auto-enrolment", aliases: ["auto enrolment", "auto-enrolment", "workplace pension", "pension contributions", "qualifying earnings"], topics: ["pensions", "payroll"] },
  { name: "national minimum wage", aliases: ["minimum wage", "national living wage", "nmw"], topics: ["payroll"] },

  // Directors & companies
  { name: "director's loan account", aliases: ["directors loan", "director loan", "director's loan", "dla", "overdrawn loan account", "overdrawn director", "s455", "section 455", "loan to director"], official: ["loans to participators", "section 455"], topics: ["directors", "corporation-tax"] },
  { name: "dividends", aliases: ["dividend", "dividends", "distributable reserves", "illegal dividend"], topics: ["directors", "personal-tax"] },
  { name: "salary vs dividend", aliases: ["salary or dividend", "salary vs dividend", "profit extraction", "optimal salary"], topics: ["directors"] },
  { name: "confirmation statement", aliases: ["confirmation statement", "cs01", "annual return"], topics: ["cosec"] },
  { name: "persons with significant control", aliases: ["psc", "persons with significant control", "people with significant control"], topics: ["cosec"] },
  { name: "identity verification", aliases: ["identity verification", "id verification", "verify identity", "acsp"], topics: ["cosec", "practice"] },
  { name: "strike off", aliases: ["strike off", "striking off", "dissolve", "dissolution", "ds01", "close a company"], topics: ["cosec"] },
  { name: "share capital", aliases: ["share capital", "issue shares", "allot shares", "share transfer", "sh01"], topics: ["cosec"] },

  // Corporation tax & R&D
  { name: "corporation tax rates", aliases: ["corporation tax rate", "marginal relief", "small profits rate", "associated companies"], topics: ["corporation-tax"] },
  { name: "capital allowances", aliases: ["capital allowances", "annual investment allowance", "aia", "full expensing", "writing down allowance", "wda"], topics: ["corporation-tax", "personal-tax"] },
  { name: "corporation tax return", aliases: ["ct600", "corporation tax return", "ct return", "corporation tax deadline", "pay corporation tax"], topics: ["corporation-tax"] },
  { name: "losses", aliases: ["trading loss", "trading losses", "loss relief", "carry back", "carry forward"], topics: ["corporation-tax", "personal-tax"] },
  { name: "R&D relief", aliases: ["r&d", "r and d", "research and development", "rdec", "merged scheme", "ride", "r&d intensive"], official: ["research and development relief"], topics: ["rd"] },

  // Personal & capital taxes
  { name: "Self Assessment", aliases: ["self assessment", "sa100", "tax return", "personal tax return", "utr", "register for self assessment"], topics: ["personal-tax"] },
  { name: "payments on account", aliases: ["payments on account", "payment on account", "poa"], topics: ["personal-tax"] },
  { name: "income tax rates and allowances", aliases: ["personal allowance", "higher rate", "additional rate", "tax bands", "dividend allowance", "savings allowance"], topics: ["personal-tax"] },
  { name: "Making Tax Digital for Income Tax", aliases: ["mtd itsa", "mtd for income tax", "quarterly updates"], topics: ["personal-tax"] },
  { name: "capital gains tax", aliases: ["capital gains", "cgt", "annual exempt amount", "business asset disposal relief", "badr", "private residence relief"], topics: ["capital-taxes"] },
  { name: "inheritance tax", aliases: ["inheritance tax", "iht", "nil rate band", "residence nil rate band", "potentially exempt transfer", "pet"], topics: ["capital-taxes"] },

  // IR35, CIS, practice
  { name: "IR35 / off-payroll working", aliases: ["ir35", "off payroll", "off-payroll", "inside ir35", "outside ir35", "employment status", "status determination", "sds", "cest"], official: ["off-payroll working"], topics: ["ir35"] },
  { name: "Construction Industry Scheme", aliases: ["cis", "construction industry scheme", "subcontractor", "subcontractors", "gross payment status", "cis300", "verify subcontractor"], topics: ["cis"] },
  { name: "anti-money laundering", aliases: ["aml", "anti money laundering", "money laundering", "cdd", "customer due diligence", "kyc", "sar", "suspicious activity"], topics: ["practice"] },
  { name: "engagement letters", aliases: ["engagement letter", "letter of engagement", "professional clearance", "clearance letter"], topics: ["practice"] },
  { name: "penalties and interest", aliases: ["penalty", "penalties", "late filing penalty", "late payment", "interest on late"], topics: ["personal-tax", "corporation-tax", "vat", "cosec"] },
];
