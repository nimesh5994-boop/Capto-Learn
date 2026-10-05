# Planned outline (authored index.ts before the interim rebuild)

Unwritten lessons: books-of-prime-entry-and-ledgers, the-trial-balance, accruals-and-prepayments, capital-vs-revenue-expenditure, depreciation-and-disposals, irrecoverable-debts-and-allowances, inventory-valuation-and-closing-stock, bank-reconciliations, control-account-reconciliations, suspense-accounts-and-correcting-errors, sole-trader-accounts-from-a-trial-balance, introduction-to-limited-company-accounts, incomplete-records, partnership-appropriation-basics

```ts
import type { Track } from "../../types";
import { lesson as accountsAndEquation } from "./lessons/accounts-and-the-accounting-equation";
import { lesson as doubleEntry } from "./lessons/double-entry-debits-and-credits";
import { lesson as booksOfPrimeEntry } from "./lessons/books-of-prime-entry-and-ledgers";
import { lesson as trialBalance } from "./lessons/the-trial-balance";
import { lesson as accrualsPrepayments } from "./lessons/accruals-and-prepayments";
import { lesson as capitalRevenue } from "./lessons/capital-vs-revenue-expenditure";
import { lesson as depreciation } from "./lessons/depreciation-and-disposals";
import { lesson as irrecoverableDebts } from "./lessons/irrecoverable-debts-and-allowances";
import { lesson as inventory } from "./lessons/inventory-valuation-and-closing-stock";
import { lesson as bankRec } from "./lessons/bank-reconciliations";
import { lesson as controlAccounts } from "./lessons/control-account-reconciliations";
import { lesson as suspense } from "./lessons/suspense-accounts-and-correcting-errors";
import { lesson as soleTrader } from "./lessons/sole-trader-accounts-from-a-trial-balance";
import { lesson as limitedCompany } from "./lessons/introduction-to-limited-company-accounts";
import { lesson as incompleteRecords } from "./lessons/incomplete-records";
import { lesson as partnerships } from "./lessons/partnership-appropriation-basics";

const track: Track = {
  slug: "foundations",
  title: "Accounting fundamentals",
  icon: "BookOpen",
  summary:
    "Double entry from first principles through to a full set of year-end accounts: debits and credits, ledgers and the trial balance, year-end adjustments, reconciliations, error correction, and sole trader, company and partnership accounts.",
  order: 1,
  modules: [
    {
      slug: "double-entry-from-first-principles",
      title: "Double entry from first principles",
      level: "foundation",
      summary:
        "What accounts are for, the accounting equation, the debit and credit rules, how transactions flow from source documents into the ledgers, and how a trial balance proves the arithmetic.",
      lessons: [accountsAndEquation, doubleEntry, booksOfPrimeEntry, trialBalance],
    },
    {
      slug: "year-end-adjustments-and-reconciliations",
      title: "Year-end adjustments and reconciliations",
      level: "practitioner",
      summary:
        "The adjustments that turn a raw trial balance into accounts: accruals and prepayments, capital vs revenue, depreciation, bad debts, closing stock — plus the reconciliations and error corrections that prove the books are right.",
      lessons: [accrualsPrepayments, capitalRevenue, depreciation, irrecoverableDebts, inventory, bankRec, controlAccounts, suspense],
    },
    {
      slug: "preparing-financial-statements",
      title: "Preparing financial statements",
      level: "advanced",
      summary:
        "Putting it all together: a sole trader's income statement and balance sheet from a trial balance, limited company accounts, rebuilding accounts from incomplete records, and partnership profit-sharing.",
      lessons: [soleTrader, limitedCompany, incompleteRecords, partnerships],
    },
  ],
};

export default track;

```
