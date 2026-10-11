import type { Track } from "../../types";
import { lesson as l0 } from "./lessons/who-pays-and-accounting-periods";
import { lesson as l1 } from "./lessons/rates-and-marginal-relief";
import { lesson as l2 } from "./lessons/computing-taxable-trading-profit";
import { lesson as l3 } from "./lessons/ct600-filing-payment-and-penalties";
import { lesson as l4 } from "./lessons/capital-allowances-aia-and-first-year-allowances";
import { lesson as l5 } from "./lessons/capital-allowances-pools-cars-and-disposals";
import { lesson as l6 } from "./lessons/structures-and-buildings-allowance";
import { lesson as l7 } from "./lessons/trading-losses";
import { lesson as l8 } from "./lessons/property-income-and-loan-relationships";
import { lesson as l9 } from "./lessons/chargeable-gains-in-companies";
import { lesson as l10 } from "./lessons/quarterly-instalment-payments";
import { lesson as l11 } from "./lessons/groups-and-group-relief";
import { lesson as l12 } from "./lessons/close-companies-and-ct61";
import { lesson as l13 } from "./lessons/intangible-fixed-assets";
import { lesson as l14 } from "./lessons/hmrc-enquiries-and-time-limits";

const track: Track = {
  slug: "corporation-tax",
  title: "Corporation tax",
  icon: "Building2",
  summary: "From accounts profit to the CT600: adjustments, capital allowances, losses, groups and payment.",
  order: 9,
  modules: [
    {
      slug: "foundation",
      title: "Foundation",
      level: "foundation",
      summary: "Who pays and for which period, rates and marginal relief, the core computation, and filing, payment and penalties.",
      lessons: [l0, l1, l2, l3],
    },
    {
      slug: "practitioner",
      title: "Practitioner",
      level: "practitioner",
      summary: "Capital allowances and SBA, trading losses, property and interest income, chargeable gains and quarterly instalments.",
      lessons: [l4, l5, l6, l7, l8, l9, l10],
    },
    {
      slug: "advanced",
      title: "Advanced",
      level: "advanced",
      summary: "Groups and group relief, close companies and CT61, intangible fixed assets, and HMRC enquiries and time limits.",
      lessons: [l11, l12, l13, l14],
    },
  ],
};

export default track;
