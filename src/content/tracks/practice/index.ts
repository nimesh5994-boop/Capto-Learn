import type { Track } from "../../types";
import { lesson as l0 } from "./lessons/aml-framework-supervision-and-firm-wide-risk-assessment";
import { lesson as l1 } from "./lessons/customer-due-diligence-edd-peps-and-beneficial-ownership";
import { lesson as l2 } from "./lessons/sars-mlro-tipping-off-and-daml";
import { lesson as l3 } from "./lessons/ethics-fundamental-principles-conflicts-and-confidentiality";
import { lesson as l4 } from "./lessons/engagement-letters-client-take-on-and-disengagement";
import { lesson as l5 } from "./lessons/pcrt-standards-for-tax-planning-and-tax-conduct";
import { lesson as l6 } from "./lessons/gdpr-for-accountancy-practices";
import { lesson as l7 } from "./lessons/hmrc-agent-authorisation-asa-64-8-and-mtd";
import { lesson as l8 } from "./lessons/hmrc-enquiries-information-notices-and-time-limits";
import { lesson as l9 } from "./lessons/penalties-late-filing-late-payment-and-inaccuracies";
import { lesson as l10 } from "./lessons/failure-to-prevent-fraud-and-economic-crime-duties";
import { lesson as l11 } from "./lessons/tribunal-route-pi-insurance-and-file-review";

const track: Track = {
  slug: "practice",
  title: "Practice, ethics & compliance",
  icon: "ShieldCheck",
  summary: "Anti-money laundering, ethics and PCRT, engagement and take-on, GDPR, HMRC authorisation, enquiries and penalties, and managing risk in the practice.",
  order: 15,
  modules: [
    { slug: "foundation", title: "Foundation", level: "foundation", summary: "AML framework, due diligence, suspicious activity reporting and professional ethics.", lessons: [l0, l1, l2, l3] },
    {
      slug: "practitioner",
      title: "Practitioner",
      level: "practitioner",
      summary: "Engagement, PCRT, data protection, HMRC authority, enquiries and penalties.",
      lessons: [l4, l5, l6, l7, l8, l9],
    },
    { slug: "advanced", title: "Advanced", level: "advanced", summary: "Failure to prevent fraud, disputes, insurance and quality review.", lessons: [l10, l11] },
  ],
};

export default track;
