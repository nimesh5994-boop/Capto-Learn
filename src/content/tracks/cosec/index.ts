import type { Track } from "../../types";
import { lesson as l0 } from "./lessons/company-types-and-llps";
import { lesson as l1 } from "./lessons/identity-verification";
import { lesson as l2 } from "./lessons/incorporating-a-company";
import { lesson as l3 } from "./lessons/officers-changes-and-registers";
import { lesson as l4 } from "./lessons/people-with-significant-control";

// Interim index built from the lessons written so far — see OUTLINE.md (if present) for the full planned outline.
const track: Track = {
  slug: "cosec",
  title: "Company secretarial & Companies House",
  icon: "Landmark",
  summary: "Incorporation, officers, PSCs, identity verification, filings, share changes and strike-off.",
  order: 14,
  modules: [
    { slug: "foundation", title: "Foundation", level: "foundation", summary: "Foundation-level lessons.", lessons: [l0, l1, l2, l3] },
    { slug: "practitioner", title: "Practitioner", level: "practitioner", summary: "Practitioner-level lessons.", lessons: [l4] },
  ],
};

export default track;
