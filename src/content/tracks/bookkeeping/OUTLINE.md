# Planned outline (authored index.ts before the interim rebuild)

Unwritten lessons: setting-up-a-client-file, bank-feeds-and-bank-rules, coding-transactions-correctly, sales-and-purchase-ledgers, credit-notes-refunds-and-overpayments, aged-debtors-and-creditors, petty-cash-and-expense-claims, vat-coding-in-the-bookkeeping, loans-and-hire-purchase, payroll-journals, cut-off-and-period-end-adjustments, month-end-routine, management-accounts-pack, catch-up-bookkeeping, review-checklist-and-red-flags

```ts
import type { Track } from "../../types";
import { lesson as clientFile } from "./lessons/setting-up-a-client-file";
import { lesson as bankFeeds } from "./lessons/bank-feeds-and-bank-rules";
import { lesson as coding } from "./lessons/coding-transactions-correctly";
import { lesson as ledgers } from "./lessons/sales-and-purchase-ledgers";
import { lesson as creditNotes } from "./lessons/credit-notes-refunds-and-overpayments";
import { lesson as aged } from "./lessons/aged-debtors-and-creditors";
import { lesson as pettyCash } from "./lessons/petty-cash-and-expense-claims";
import { lesson as vatCoding } from "./lessons/vat-coding-in-the-bookkeeping";
import { lesson as dla } from "./lessons/directors-loan-account-coding";
import { lesson as loans } from "./lessons/loans-and-hire-purchase";
import { lesson as payroll } from "./lessons/payroll-journals";
import { lesson as cutOff } from "./lessons/cut-off-and-period-end-adjustments";
import { lesson as monthEnd } from "./lessons/month-end-routine";
import { lesson as managementAccounts } from "./lessons/management-accounts-pack";
import { lesson as catchUp } from "./lessons/catch-up-bookkeeping";
import { lesson as review } from "./lessons/review-checklist-and-red-flags";

const track: Track = {
  slug: "bookkeeping",
  title: "Bookkeeping in practice",
  icon: "NotebookPen",
  summary:
    "How client books are really kept on cloud accounting software: setting up the file, bank feeds and rules, coding, ledgers, VAT codes, director's loans, finance agreements, payroll journals, month-end, management accounts and cleaning up a mess.",
  order: 2,
  modules: [
    {
      slug: "setting-up-and-day-to-day-coding",
      title: "Setting up and day-to-day coding",
      level: "foundation",
      summary:
        "Getting a client file set up properly and keeping it right day to day: chart of accounts, bank feeds and rules, coding, sales and purchase ledgers, credit notes, aged reports and expenses.",
      lessons: [clientFile, bankFeeds, coding, ledgers, creditNotes, aged, pettyCash],
    },
    {
      slug: "trickier-transactions",
      title: "Trickier transactions",
      level: "practitioner",
      summary:
        "The transactions juniors most often get wrong: VAT tax codes, director's personal spending, loans and hire purchase, payroll journals and cut-off.",
      lessons: [vatCoding, dla, loans, payroll, cutOff],
    },
    {
      slug: "month-end-reporting-and-review",
      title: "Month-end, reporting and review",
      level: "advanced",
      summary:
        "Running a month-end close, producing a management accounts pack, rescuing messy or years-behind books, and reviewing a file before it goes out.",
      lessons: [monthEnd, managementAccounts, catchUp, review],
    },
  ],
};

export default track;

```
