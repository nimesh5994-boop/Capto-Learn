import type { Track } from "../../types";
import { lesson as l0 } from "./lessons/setting-up-as-an-employer";
import { lesson as l1 } from "./lessons/starters-and-tax-codes";
import { lesson as l2 } from "./lessons/calculating-paye-and-nic";
import { lesson as l3 } from "./lessons/rti-reporting-and-paying-hmrc";
import { lesson as l4 } from "./lessons/leavers-p45-and-year-end";
import { lesson as l5 } from "./lessons/nic-categories-and-employment-allowance";
import { lesson as l6 } from "./lessons/directors-nic-annual-earnings-period";
import { lesson as l7 } from "./lessons/statutory-sick-pay";
import { lesson as l8 } from "./lessons/family-statutory-payments-and-recovery";
import { lesson as l9 } from "./lessons/student-and-postgraduate-loans";
import { lesson as l10 } from "./lessons/minimum-wage-and-holiday-pay";
import { lesson as l11 } from "./lessons/benefits-in-kind-p11d-and-class-1a";
import { lesson as l12 } from "./lessons/expenses-and-mileage-allowances";
import { lesson as l13 } from "./lessons/termination-payments";
import { lesson as l14 } from "./lessons/correcting-errors-and-payroll-journals";

const track: Track = {
  slug: "payroll",
  title: "Payroll",
  icon: "Wallet",
  summary: "Running a compliant UK payroll: PAYE, NIC, RTI, statutory payments, benefits and year end.",
  order: 5,
  modules: [
    {
      slug: "foundation",
      title: "Foundation",
      level: "foundation",
      summary: "Setting up a PAYE scheme, new starters and tax codes, calculating tax and NIC, RTI reporting and payment, leavers and year end.",
      lessons: [l0, l1, l2, l3, l4],
    },
    {
      slug: "practitioner",
      title: "Practitioner",
      level: "practitioner",
      summary: "NIC category letters and Employment Allowance, directors' NIC, SSP, family statutory payments, student loans, minimum wage and holiday pay.",
      lessons: [l5, l6, l7, l8, l9, l10],
    },
    {
      slug: "advanced",
      title: "Advanced",
      level: "advanced",
      summary: "Benefits in kind and payrolling, expenses and mileage, termination payments, and correcting errors and payroll journals.",
      lessons: [l11, l12, l13, l14],
    },
  ],
};

export default track;
