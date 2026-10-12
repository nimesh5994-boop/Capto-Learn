import type { Track } from "../../types";
import { lesson as l0 } from "./lessons/year-end-process-and-working-papers";
import { lesson as l1 } from "./lessons/accruals-prepayments-deferred-income";
import { lesson as l2 } from "./lessons/fixed-assets-and-depreciation";
import { lesson as l3 } from "./lessons/stock-and-work-in-progress";
import { lesson as l4 } from "./lessons/sole-trader-and-partnership-year-end";
import { lesson as l5 } from "./lessons/choosing-the-reporting-framework";
import { lesson as l6 } from "./lessons/provisions-contingencies-and-post-balance-sheet-events";
import { lesson as l7 } from "./lessons/directors-loans-dividends-and-related-parties";
import { lesson as l8 } from "./lessons/filing-statutory-accounts";
import { lesson as l9 } from "./lessons/revenue-recognition-frs-102";
import { lesson as l10 } from "./lessons/leases-frs-102";
import { lesson as l11 } from "./lessons/deferred-tax-basics";
import { lesson as l12 } from "./lessons/going-concern-final-review-and-sign-off";

const track: Track = {
  slug: "accounts-production",
  title: "Accounts production & year end",
  icon: "FileSpreadsheet",
  summary:
    "The year-end process and working papers, year-end adjustments, sole trader and partnership accounts, choosing FRS 105 or FRS 102, filing, directors' loans and related parties, the 2026 FRS 102 revenue and lease changes, deferred tax, going concern and sign-off.",
  order: 3,
  modules: [
    {
      slug: "foundation",
      title: "Foundation",
      level: "foundation",
      summary: "How a year-end job runs, working papers, accruals and prepayments, fixed assets and depreciation, and stock and WIP.",
      lessons: [l0, l1, l2, l3],
    },
    {
      slug: "practitioner",
      title: "Practitioner",
      level: "practitioner",
      summary: "Unincorporated businesses and tax adjustments, choosing the reporting framework and audit exemption, provisions and after-date events, directors' loans, dividends and related parties, and filing.",
      lessons: [l4, l5, l6, l7, l8],
    },
    {
      slug: "advanced",
      title: "Advanced",
      level: "advanced",
      summary: "The FRS 102 five-step revenue model and on-balance sheet leases from 2026, deferred tax, and going concern, final review and sign-off.",
      lessons: [l9, l10, l11, l12],
    },
  ],
};

export default track;
