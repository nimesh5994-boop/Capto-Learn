import type { Track } from "../../types";
import { lesson as l0 } from "./lessons/directors-loan-account-coding";

// Interim index built from the lessons written so far — see OUTLINE.md (if present) for the full planned outline.
const track: Track = {
  slug: "bookkeeping",
  title: "Bookkeeping in practice",
  icon: "NotebookPen",
  summary: "Real practice workflow on cloud software: bank feeds, coding, ledgers, month-end and management accounts.",
  order: 2,
  modules: [
    { slug: "practitioner", title: "Practitioner", level: "practitioner", summary: "Practitioner-level lessons.", lessons: [l0] },
  ],
};

export default track;
