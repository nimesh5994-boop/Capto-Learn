import type { Track } from "../../types";
import { lesson as l0 } from "./lessons/rates-and-marginal-relief";
import { lesson as l1 } from "./lessons/who-pays-and-accounting-periods";

// Interim index built from the lessons written so far — see OUTLINE.md (if present) for the full planned outline.
const track: Track = {
  slug: "corporation-tax",
  title: "Corporation tax",
  icon: "Building2",
  summary: "From accounts profit to the CT600: adjustments, capital allowances, losses, groups and payment.",
  order: 9,
  modules: [
    { slug: "foundation", title: "Foundation", level: "foundation", summary: "Foundation-level lessons.", lessons: [l0, l1] },
  ],
};

export default track;
