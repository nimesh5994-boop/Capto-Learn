import type { Track } from "../../types";
import { lesson as l0 } from "./lessons/auto-enrolment-employer-duties";
import { lesson as l1 } from "./lessons/assessing-workers-and-postponement";
import { lesson as l2 } from "./lessons/contributions-opt-out-and-re-enrolment";
import { lesson as l3 } from "./lessons/pension-tax-relief-net-pay-vs-relief-at-source";
import { lesson as l4 } from "./lessons/tpr-enforcement-and-penalties";
import { lesson as l5 } from "./lessons/salary-sacrifice-for-pensions";
import { lesson as l6 } from "./lessons/pensions-for-owner-managed-companies";
import { lesson as l7 } from "./lessons/annual-allowance-and-carry-forward";
import { lesson as l8 } from "./lessons/tapered-annual-allowance-and-mpaa";
import { lesson as l9 } from "./lessons/lump-sum-allowance-and-lsdba";
import { lesson as l10 } from "./lessons/pensions-and-inheritance-tax-from-2027";

const track: Track = {
  slug: "pensions",
  title: "Pensions & auto-enrolment",
  icon: "PiggyBank",
  summary: "Auto-enrolment duties end to end, tax relief, salary sacrifice, owner-director pension planning, the allowances and pensions in the estate.",
  order: 6,
  modules: [
    { slug: "foundation", title: "Foundation", level: "foundation", summary: "Employer duties, assessing workers, contributions and tax relief.", lessons: [l0, l1, l2, l3] },
    {
      slug: "practitioner",
      title: "Practitioner",
      level: "practitioner",
      summary: "Enforcement, salary sacrifice, pensions for owner-directors and the annual allowance.",
      lessons: [l4, l5, l6, l7],
    },
    { slug: "advanced", title: "Advanced", level: "advanced", summary: "Taper and MPAA, tax-free cash and the IHT change from 2027.", lessons: [l8, l9, l10] },
  ],
};

export default track;
