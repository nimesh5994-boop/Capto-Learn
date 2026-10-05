import type { Track } from "../../types";
import { lesson as l0 } from "./lessons/how-vat-works";
import { lesson as l1 } from "./lessons/input-tax-what-you-can-claim";
import { lesson as l2 } from "./lessons/rates-and-liability";
import { lesson as l3 } from "./lessons/registration-and-deregistration";
import { lesson as l4 } from "./lessons/tax-points-and-vat-invoices";
import { lesson as l5 } from "./lessons/vat-returns-and-mtd";

// Interim index built from the lessons written so far — see OUTLINE.md (if present) for the full planned outline.
const track: Track = {
  slug: "vat",
  title: "VAT",
  icon: "Receipt",
  summary: "From registration and liability to returns, schemes, partial exemption and the daily 'can I claim this?' query.",
  order: 4,
  modules: [
    { slug: "foundation", title: "Foundation", level: "foundation", summary: "Foundation-level lessons.", lessons: [l0, l2, l3, l4, l5] },
    { slug: "practitioner", title: "Practitioner", level: "practitioner", summary: "Practitioner-level lessons.", lessons: [l1] },
  ],
};

export default track;
