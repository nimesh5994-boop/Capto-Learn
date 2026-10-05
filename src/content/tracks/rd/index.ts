import type { Track } from "../../types";
import { lesson as l0 } from "./lessons/rd-boundaries";
import { lesson as l1 } from "./lessons/rd-schemes-overview";
import { lesson as l2 } from "./lessons/what-counts-as-rd";

// Interim index built from the lessons written so far — see OUTLINE.md (if present) for the full planned outline.
const track: Track = {
  slug: "rd",
  title: "R&D tax relief",
  icon: "FlaskConical",
  summary: "What counts as R&D, the merged scheme and ERIS, qualifying costs and making robust claims.",
  order: 11,
  modules: [
    { slug: "foundation", title: "Foundation", level: "foundation", summary: "Foundation-level lessons.", lessons: [l0, l1, l2] },
  ],
};

export default track;
