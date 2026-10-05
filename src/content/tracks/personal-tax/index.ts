import type { Track } from "../../types";
import { lesson as l0 } from "./lessons/class-2-and-class-4-nic";
import { lesson as l1 } from "./lessons/employment-income-on-the-return";
import { lesson as l2 } from "./lessons/income-tax-computation";
import { lesson as l3 } from "./lessons/sa-timetable-payments-and-penalties";
import { lesson as l4 } from "./lessons/savings-and-dividend-income";
import { lesson as l5 } from "./lessons/self-employment-trading-income";
import { lesson as l6 } from "./lessons/who-must-file-and-registration";

// Interim index built from the lessons written so far — see OUTLINE.md (if present) for the full planned outline.
const track: Track = {
  slug: "personal-tax",
  title: "Personal tax & Self Assessment",
  icon: "User",
  summary: "Self Assessment end to end: computations, self-employment, property, MTD for Income Tax and residence.",
  order: 7,
  modules: [
    { slug: "foundation", title: "Foundation", level: "foundation", summary: "Foundation-level lessons.", lessons: [l1, l2, l3, l4, l6] },
    { slug: "practitioner", title: "Practitioner", level: "practitioner", summary: "Practitioner-level lessons.", lessons: [l0, l5] },
  ],
};

export default track;
