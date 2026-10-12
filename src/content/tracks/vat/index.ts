import type { Track } from "../../types";
import { lesson as l0 } from "./lessons/how-vat-works";
import { lesson as l1 } from "./lessons/rates-and-liability";
import { lesson as l2 } from "./lessons/registration-and-deregistration";
import { lesson as l3 } from "./lessons/tax-points-and-vat-invoices";
import { lesson as l4 } from "./lessons/vat-returns-and-mtd";
import { lesson as l5 } from "./lessons/input-tax-what-you-can-claim";
import { lesson as l6 } from "./lessons/daily-vat-query-clinic";
import { lesson as l7 } from "./lessons/motoring-and-fuel-scale-charge";
import { lesson as l8 } from "./lessons/cash-annual-accounting-and-bad-debt-relief";
import { lesson as l9 } from "./lessons/flat-rate-scheme";
import { lesson as l10 } from "./lessons/margin-schemes";
import { lesson as l11 } from "./lessons/domestic-reverse-charge-construction";
import { lesson as l12 } from "./lessons/partial-exemption-and-capital-goods-scheme";
import { lesson as l13 } from "./lessons/land-property-and-togc";
import { lesson as l14 } from "./lessons/international-services-and-goods";
import { lesson as l15 } from "./lessons/errors-penalties-and-compliance-checks";

const track: Track = {
  slug: "vat",
  title: "VAT",
  icon: "Receipt",
  summary: "From registration and liability to returns, schemes, partial exemption, property, international trade and the daily 'can I claim this?' query.",
  order: 4,
  modules: [
    {
      slug: "foundation",
      title: "Foundation",
      level: "foundation",
      summary: "How VAT works, rates and liability, registration and deregistration, tax points and invoices, and preparing the MTD VAT return.",
      lessons: [l0, l1, l2, l3, l4],
    },
    {
      slug: "practitioner",
      title: "Practitioner",
      level: "practitioner",
      summary: "Input tax recovery, the daily purchase-coding routine, motoring and the fuel scale charge, the cash, annual accounting and flat rate schemes, bad debt relief, margin schemes and the construction reverse charge.",
      lessons: [l5, l6, l7, l8, l9, l10, l11],
    },
    {
      slug: "advanced",
      title: "Advanced",
      level: "advanced",
      summary: "Partial exemption and the Capital Goods Scheme, land and property and TOGCs, international services and goods, and correcting errors, penalties and compliance checks.",
      lessons: [l12, l13, l14, l15],
    },
  ],
};

export default track;
