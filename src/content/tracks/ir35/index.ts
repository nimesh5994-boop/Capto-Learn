import type { Track } from "../../types";
import { lesson as l0 } from "./lessons/employment-status-tests-employed-or-self-employed";
import { lesson as l1 } from "./lessons/ir35-chapter-8-and-chapter-10-explained";
import { lesson as l2 } from "./lessons/client-size-test-and-status-determination-statements";
import { lesson as l3 } from "./lessons/cest-and-working-practices-evidence";
import { lesson as l4 } from "./lessons/fee-payer-duties-and-deemed-direct-payments";
import { lesson as l5 } from "./lessons/chapter-8-deemed-employment-payment";
import { lesson as l6 } from "./lessons/status-disputes-enquiries-and-penalties";
import { lesson as l7 } from "./lessons/managed-service-companies-and-msc-provider-liability";
import { lesson as l8 } from "./lessons/umbrella-companies-and-paye-liability-from-april-2026";
import { lesson as l9 } from "./lessons/advising-contractors-practical-options";

const track: Track = {
  slug: "ir35",
  title: "IR35 & employment status",
  icon: "FileCheck",
  summary: "Employment status tests, the Chapter 8 and Chapter 10 regimes, the deemed payment calculations, MSCs, umbrellas and advising contractors.",
  order: 12,
  modules: [
    { slug: "foundation", title: "Foundation", level: "foundation", summary: "Status tests, the two regimes and the client size test.", lessons: [l0, l1, l2] },
    { slug: "practitioner", title: "Practitioner", level: "practitioner", summary: "CEST and evidence, fee-payer duties and the Chapter 8 calculation.", lessons: [l3, l4, l5] },
    { slug: "advanced", title: "Advanced", level: "advanced", summary: "Disputes and penalties, MSCs, umbrella companies and advising contractors.", lessons: [l6, l7, l8, l9] },
  ],
};

export default track;
