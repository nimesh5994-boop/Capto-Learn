import type { Track } from "../../types";
import { lesson as l0 } from "./lessons/directors-duties-and-responsibilities";
import { lesson as l1 } from "./lessons/directors-loan-account-basics";
import { lesson as l2 } from "./lessons/dividends-legality-and-paperwork";
import { lesson as l3 } from "./lessons/s455-charge-and-s458-relief";
import { lesson as l4 } from "./lessons/anti-bed-and-breakfasting-rules";
import { lesson as l5 } from "./lessons/writing-off-a-directors-loan";
import { lesson as l6 } from "./lessons/beneficial-loan-benefit-in-kind";
import { lesson as l7 } from "./lessons/salary-vs-dividend-planning";
import { lesson as l8 } from "./lessons/employer-pension-contributions-as-extraction";
import { lesson as l9 } from "./lessons/alphabet-shares-waivers-and-settlements";
import { lesson as l10 } from "./lessons/closing-a-company-mvl-badr-and-the-taar";

const track: Track = {
  slug: "directors",
  title: "Directors, DLA & profit extraction",
  icon: "Briefcase",
  summary: "Directors' duties, the loan account and s455, dividends, salary planning and getting money out of (or closing) an owner-managed company.",
  order: 10,
  modules: [
    { slug: "foundation", title: "Foundation", level: "foundation", summary: "Duties, the director's loan account and lawful dividends.", lessons: [l0, l1, l2] },
    {
      slug: "practitioner",
      title: "Practitioner",
      level: "practitioner",
      summary: "s455, bed and breakfasting, write-offs, beneficial loans, and salary, dividend and pension planning.",
      lessons: [l3, l4, l5, l6, l7, l8],
    },
    { slug: "advanced", title: "Advanced", level: "advanced", summary: "Alphabet shares and settlements, and closing a solvent company.", lessons: [l9, l10] },
  ],
};

export default track;
