import type { Track } from "../../types";
import { lesson as l0 } from "./lessons/accounts-and-the-accounting-equation";
import { lesson as l1 } from "./lessons/double-entry-debits-and-credits";

// Interim index built from the lessons written so far — see OUTLINE.md (if present) for the full planned outline.
const track: Track = {
  slug: "foundations",
  title: "Accounting fundamentals",
  icon: "BookOpen",
  summary: "Double entry from first principles to a full set of year-end accounts.",
  order: 1,
  modules: [
    { slug: "foundation", title: "Foundation", level: "foundation", summary: "Foundation-level lessons.", lessons: [l0, l1] },
  ],
};

export default track;
