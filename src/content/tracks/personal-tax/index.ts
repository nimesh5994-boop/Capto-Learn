import type { Track } from "../../types";
import { lesson as l0 } from "./lessons/who-must-file-and-registration";
import { lesson as l1 } from "./lessons/income-tax-computation";
import { lesson as l2 } from "./lessons/employment-income-on-the-return";
import { lesson as l3 } from "./lessons/savings-and-dividend-income";
import { lesson as l4 } from "./lessons/sa-timetable-payments-and-penalties";
import { lesson as l5 } from "./lessons/self-employment-trading-income";
import { lesson as l6 } from "./lessons/class-2-and-class-4-nic";
import { lesson as l7 } from "./lessons/partnership-income";
import { lesson as l8 } from "./lessons/property-income";
import { lesson as l9 } from "./lessons/mtd-for-income-tax";
import { lesson as l10 } from "./lessons/marriage-allowance-gift-aid-and-pension-relief";
import { lesson as l11 } from "./lessons/high-income-child-benefit-charge";
import { lesson as l12 } from "./lessons/statutory-residence-test";
import { lesson as l13 } from "./lessons/fig-regime-and-foreign-income";
import { lesson as l14 } from "./lessons/amending-returns-and-hmrc-enquiries";

const track: Track = {
  slug: "personal-tax",
  title: "Personal tax & Self Assessment",
  icon: "User",
  summary: "Self Assessment end to end: computations, self-employment, partnerships, property, MTD for Income Tax, reliefs, residence and foreign income, and dealing with HMRC.",
  order: 7,
  modules: [
    {
      slug: "foundation",
      title: "Foundation",
      level: "foundation",
      summary: "Who must file, the income tax computation, employment income, savings and dividends, and the SA timetable, payments on account and penalties.",
      lessons: [l0, l1, l2, l3, l4],
    },
    {
      slug: "practitioner",
      title: "Practitioner",
      level: "practitioner",
      summary: "Self-employment and NIC, partnership income, property income, MTD for Income Tax, marriage allowance, Gift Aid and pension relief, and the High Income Child Benefit Charge.",
      lessons: [l5, l6, l7, l8, l9, l10, l11],
    },
    {
      slug: "advanced",
      title: "Advanced",
      level: "advanced",
      summary: "The Statutory Residence Test, foreign income and the FIG regime, and amending returns, payments on account and HMRC enquiries.",
      lessons: [l12, l13, l14],
    },
  ],
};

export default track;
