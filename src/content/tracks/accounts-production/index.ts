import type { Track } from "../../types";
import { lesson as l0 } from "./lessons/accruals-prepayments-deferred-income";
import { lesson as l1 } from "./lessons/year-end-process-and-working-papers";

// Interim index built from the lessons written so far — see OUTLINE.md (if present) for the full planned outline.
const track: Track = {
  slug: "accounts-production",
  title: "Accounts production & year end",
  icon: "FileSpreadsheet",
  summary: "Year-end process, working papers and statutory accounts under FRS 105 and FRS 102.",
  order: 3,
  modules: [
    { slug: "foundation", title: "Foundation", level: "foundation", summary: "Foundation-level lessons.", lessons: [l0, l1] },
  ],
};

export default track;
