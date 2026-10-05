import type { Track } from "../../types";
import { lesson as l0 } from "./lessons/setting-up-as-an-employer";

// Interim index built from the lessons written so far — see OUTLINE.md (if present) for the full planned outline.
const track: Track = {
  slug: "payroll",
  title: "Payroll",
  icon: "Wallet",
  summary: "Running a compliant UK payroll: PAYE, NIC, RTI, statutory payments, benefits and year end.",
  order: 5,
  modules: [
    { slug: "foundation", title: "Foundation", level: "foundation", summary: "Foundation-level lessons.", lessons: [l0] },
  ],
};

export default track;
