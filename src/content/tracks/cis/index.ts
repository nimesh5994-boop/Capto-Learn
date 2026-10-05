import type { Track } from "../../types";
import { lesson as l0 } from "./lessons/cis-scope-contractors-subcontractors-and-construction-operations";
import { lesson as l1 } from "./lessons/registering-and-verifying-subcontractors";
import { lesson as l2 } from "./lessons/working-out-the-cis-deduction";
import { lesson as l3 } from "./lessons/monthly-returns-nil-returns-and-penalties";
import { lesson as l4 } from "./lessons/gross-payment-status-tests-and-changes";
import { lesson as l5 } from "./lessons/subcontractor-statements-and-reclaiming-cis-deductions";
import { lesson as l6 } from "./lessons/vat-domestic-reverse-charge-and-cis";
import { lesson as l7 } from "./lessons/cis-bookkeeping-and-reconciliations";
import { lesson as l8 } from "./lessons/cis-compliance-risks-and-hmrc-checks";
import { lesson as l9 } from "./lessons/cis-changes-from-april-2026-and-advising-construction-clients";

const track: Track = {
  slug: "cis",
  title: "Construction Industry Scheme",
  icon: "HardHat",
  summary: "Contractors and subcontractors, verification and deduction rates, monthly returns, gross payment status, the VAT reverse charge, bookkeeping and the 2026 changes.",
  order: 13,
  modules: [
    { slug: "foundation", title: "Foundation", level: "foundation", summary: "Scope, registration and verification, and working out the deduction.", lessons: [l0, l1, l2] },
    {
      slug: "practitioner",
      title: "Practitioner",
      level: "practitioner",
      summary: "Returns and penalties, gross payment status, the subcontractor's side, the VAT reverse charge and bookkeeping.",
      lessons: [l3, l4, l5, l6, l7],
    },
    { slug: "advanced", title: "Advanced", level: "advanced", summary: "Compliance risks and HMRC checks, and the 2026 changes in practice.", lessons: [l8, l9] },
  ],
};

export default track;
