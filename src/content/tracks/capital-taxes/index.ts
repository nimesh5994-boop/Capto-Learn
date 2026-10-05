import type { Track } from "../../types";
import { lesson as l0 } from "./lessons/cgt-computation-rates-and-annual-exempt-amount";
import { lesson as l1 } from "./lessons/property-gains-prr-lettings-and-60-day-reporting";
import { lesson as l2 } from "./lessons/iht-basics-nil-rate-bands-and-the-estate";
import { lesson as l3 } from "./lessons/share-matching-rules-and-the-section-104-pool";
import { lesson as l4 } from "./lessons/business-asset-disposal-relief";
import { lesson as l5 } from "./lessons/gift-holdover-rollover-and-incorporation-relief";
import { lesson as l6 } from "./lessons/cgt-losses-spouses-and-separation";
import { lesson as l7 } from "./lessons/lifetime-gifts-pets-taper-relief-and-exemptions";
import { lesson as l8 } from "./lessons/chargeable-lifetime-transfers-and-trusts-basics";
import { lesson as l9 } from "./lessons/bpr-and-apr-reforms-from-april-2026";
import { lesson as l10 } from "./lessons/estate-administration-iht400-and-deadlines";

const track: Track = {
  slug: "capital-taxes",
  title: "Capital gains & inheritance tax",
  icon: "Landmark",
  summary: "CGT computations, property gains, shares, BADR and deferral reliefs, then IHT: estates, gifts, trusts, the 2026 BPR/APR reforms and estate administration.",
  order: 8,
  modules: [
    { slug: "foundation", title: "Foundation", level: "foundation", summary: "CGT computation, property gains and the IHT estate and bands.", lessons: [l0, l1, l2] },
    {
      slug: "practitioner",
      title: "Practitioner",
      level: "practitioner",
      summary: "Share matching, BADR, deferral reliefs, losses and spouses, and lifetime gifts.",
      lessons: [l3, l4, l5, l6, l7],
    },
    { slug: "advanced", title: "Advanced", level: "advanced", summary: "Chargeable transfers and trusts, the 2026 BPR/APR reforms and estate administration.", lessons: [l8, l9, l10] },
  ],
};

export default track;
