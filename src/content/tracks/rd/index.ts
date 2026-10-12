import type { Track } from "../../types";
import { lesson as l0 } from "./lessons/what-counts-as-rd";
import { lesson as l1 } from "./lessons/rd-boundaries";
import { lesson as l2 } from "./lessons/rd-schemes-overview";
import { lesson as l3 } from "./lessons/qualifying-staffing-costs-and-epws";
import { lesson as l4 } from "./lessons/consumables-software-data-and-cloud";
import { lesson as l5 } from "./lessons/subcontractors-and-overseas-restrictions";
import { lesson as l6 } from "./lessons/claim-notification-and-additional-information";
import { lesson as l7 } from "./lessons/computing-the-merged-rdec";
import { lesson as l8 } from "./lessons/eris-for-rd-intensive-smes";
import { lesson as l9 } from "./lessons/old-sme-scheme-and-transitional-periods";
import { lesson as l10 } from "./lessons/compliance-red-flags-and-professional-responsibility";

const track: Track = {
  slug: "rd",
  title: "R&D tax relief",
  icon: "FlaskConical",
  summary:
    "What counts as R&D, the merged RDEC and ERIS, qualifying costs, contracted-out and overseas rules, claim notification and the AIF, computing the credit, and making robust, defensible claims.",
  order: 11,
  modules: [
    {
      slug: "foundation",
      title: "Foundation",
      level: "foundation",
      summary: "The DSIT definition of R&D, drawing project boundaries, and which relief scheme applies to which period.",
      lessons: [l0, l1, l2],
    },
    {
      slug: "practitioner",
      title: "Practitioner",
      level: "practitioner",
      summary: "Qualifying staffing, EPW, consumable, software, data and cloud costs; contracted-out R&D and overseas restrictions; claim notification and the AIF; computing the merged RDEC.",
      lessons: [l3, l4, l5, l6, l7],
    },
    {
      slug: "advanced",
      title: "Advanced",
      level: "advanced",
      summary: "ERIS for loss-making R&D-intensive SMEs, the old SME scheme and straddling periods, and HMRC compliance, boutique red flags and professional responsibility.",
      lessons: [l8, l9, l10],
    },
  ],
};

export default track;
