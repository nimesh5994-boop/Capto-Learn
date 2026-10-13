import type { Track } from "../../types";
import { lesson as l0 } from "./lessons/company-types-and-llps";
import { lesson as l1 } from "./lessons/incorporating-a-company";
import { lesson as l2 } from "./lessons/officers-changes-and-registers";
import { lesson as l3 } from "./lessons/identity-verification";
import { lesson as l4 } from "./lessons/confirmation-statement";
import { lesson as l5 } from "./lessons/people-with-significant-control";
import { lesson as l6 } from "./lessons/share-allotments-and-share-classes";
import { lesson as l7 } from "./lessons/share-transfers-and-stamp-duty";
import { lesson as l8 } from "./lessons/dividend-paperwork";
import { lesson as l9 } from "./lessons/accounts-deadlines-and-changing-year-end";
import { lesson as l10 } from "./lessons/dormant-companies";
import { lesson as l11 } from "./lessons/share-buy-backs";
import { lesson as l12 } from "./lessons/strike-off-liquidation-and-restoration";
import { lesson as l13 } from "./lessons/companies-house-powers-fees-and-agents";
import { lesson as l14 } from "./lessons/llp-compliance";

const track: Track = {
  slug: "cosec",
  title: "Company secretarial & Companies House",
  icon: "ScrollText",
  summary:
    "Incorporation, officers, identity verification, PSCs, confirmation statements, share changes, dividends, filing deadlines and penalties, dormant companies, buy-backs, strike-off and restoration, Companies House's ECCTA powers and LLPs.",
  order: 14,
  modules: [
    {
      slug: "foundation",
      title: "Foundation",
      level: "foundation",
      summary: "Company types and LLPs, incorporating a company, officers and registers, identity verification and the annual confirmation statement.",
      lessons: [l0, l1, l2, l3, l4],
    },
    {
      slug: "practitioner",
      title: "Practitioner",
      level: "practitioner",
      summary: "PSCs, issuing and transferring shares, dividend paperwork, accounting reference dates and late filing penalties, and dormant companies.",
      lessons: [l5, l6, l7, l8, l9, l10],
    },
    {
      slug: "advanced",
      title: "Advanced",
      level: "advanced",
      summary: "Share buy-backs, closing and restoring companies, Companies House's ECCTA powers, fees and the ACSP regime, and LLP compliance.",
      lessons: [l11, l12, l13, l14],
    },
  ],
};

export default track;
