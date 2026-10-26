/*
 * Starter scenarios: shown as one-click examples on the Tax planning form, and used as the automatic regression set
 * (see score.ts and qa.live.test.ts). Every fact below is invented; none is a real client.
 * `mustCover` lists topics a competent report on that situation cannot leave out, as case-insensitive regular expressions.
 */
import type { ScenarioInput } from "./types";

export interface Starter {
  id: string;
  label: string;
  input: ScenarioInput;
  mustCover: string[];
}

export const STARTERS: Starter[] = [
  {
    "id": "extraction",
    "label": "Extracting surplus cash from a company",
    "input": {
      "title": "Director-shareholder extraction of surplus cash",
      "reference": "",
      "taxYear": "2026/27",
      "facts": "Sole director and 100% shareholder of a UK trading company, aged 58, UK resident and domiciled. The company has retained profits of £420,000, held mostly as cash that the business does not need. It pays the director a salary of £12,570 and the director takes dividends of £40,000 a year. The director's spouse is a basic-rate taxpayer with no other income and owns no shares. The company has no employees other than the director. The director has no other income. The company has been trading for 14 years.",
      "objectives": "Extract the surplus cash over the next three years as tax-efficiently as possible, while keeping open the option of selling the company in about five years.",
      "constraints": "Does not want the whole amount taxed at the additional rate in one year. Will not use aggressive or artificial arrangements. Wants to understand pension contributions as an option."
    },
    "mustCover": [
      "dividend",
      "pension",
      "loans to participators|s455|s 455|director.s loan",
      "annual allowance",
      "spouse|settlements",
      "business asset disposal|BADR"
    ]
  },
  {
    "id": "company-sale",
    "label": "Selling a family company: trade sale, MBO or EOT",
    "input": {
      "title": "Sale of a family trading company: trade sale, MBO or employee ownership trust",
      "reference": "",
      "taxYear": "2026/27",
      "facts": "A married couple each own 50% of a UK trading company that makes bespoke furniture, founded 18 years ago. Both are directors and work full time in the business. It has 42 employees, annual profit of about £1.1m and net assets of £2.4m including £900,000 of cash. A trade buyer has offered £7m for the shares, half payable on completion and half over two years as an earn-out dependent on profit. The management team has separately suggested a management buyout, and the couple have heard about employee ownership trusts. Both are aged 61 and plan to retire and to move to Spain within three years.",
      "objectives": "Choose between the three exit routes on after-tax proceeds and risk, understand Business Asset Disposal Relief and how the earn-out is taxed, and plan for the move abroad.",
      "constraints": "They want certainty on the tax on the cash element before accepting an offer. They do not want the employees to lose their jobs. They are open to staying involved for up to a year."
    },
    "mustCover": [
      "business asset disposal|BADR",
      "earn-out|earn out|contingent|deferred consideration",
      "employee ownership trust|EOT",
      "management buyout|MBO",
      "residen"
    ]
  },
  {
    "id": "landlord-incorporation",
    "label": "Landlord: incorporate or stay personal",
    "input": {
      "title": "Landlord: stay personal or incorporate a property portfolio",
      "reference": "",
      "taxYear": "2026/27",
      "facts": "An individual owns 12 residential buy-to-let properties in their own name, bought over the last 15 years. Total market value is £3.1m and mortgages total £1.2m, with interest of about £68,000 a year. Rental profit before finance costs is about £150,000 a year. The individual also has employment income of £55,000. They manage the properties themselves and spend about 10 hours a week on it, with no employees. They are married and their spouse has no income. They are considering transferring the portfolio into a new limited company, and they would like to leave the properties to their children eventually.",
      "objectives": "Reduce the tax cost of holding the portfolio, understand the cost of incorporating, and decide whether to incorporate, restructure the ownership with the spouse, or keep things as they are.",
      "constraints": "They cannot afford a large upfront tax bill. They want to keep the option of selling individual properties. Their lender has not yet been asked about the transfer."
    },
    "mustCover": [
      "incorporation relief|section 162|s162|s 162",
      "SDLT|stamp duty land tax",
      "finance cost|mortgage interest|section 24|s24",
      "capital gains"
    ]
  },
  {
    "id": "founder-equity",
    "label": "Start-up founders: share options, R&D and pay",
    "input": {
      "title": "Start-up founder: share options for staff, R&D relief and founder remuneration",
      "reference": "",
      "taxYear": "2026/27",
      "facts": "A UK software start-up incorporated 3 years ago with two founders each holding 45% of the ordinary shares and an angel investor holding 10%. Gross assets are £1.6m, there are 14 employees and annual turnover is £1.9m with a loss of £310,000 after about £650,000 of staff costs working on a new platform. The company has not yet claimed any R&D relief. The founders each take a salary of £12,570 and no dividends. The company wants to grant share options to six key employees and is raising a further funding round in about nine months.",
      "objectives": "Set up a tax-efficient share option scheme for the six employees, claim any R&D relief available, and decide how the founders should be paid.",
      "constraints": "Cash is tight, so any repayable tax liability for the company is a problem. The investor will want the arrangements to be conventional. The founders want to avoid employment-related securities problems."
    },
    "mustCover": [
      "EMI|enterprise management incentive",
      "R&D|research and development",
      "dividend|salary",
      "employment-related securities|securities",
      "market value|valuation"
    ]
  },
  {
    "id": "farm-iht",
    "label": "Farming family: inheritance tax planning",
    "input": {
      "title": "Family farming estate: inheritance tax planning after the agricultural and business property relief changes",
      "reference": "",
      "taxYear": "2026/27",
      "facts": "A widowed farmer aged 74 owns 400 acres of owner-occupied farmland worth £5.2m, a farmhouse worth £900,000 and farm buildings, plus farm machinery and livestock worth £450,000. The farming business is run as a sole trade. Other assets are investments of £600,000 and cash of £250,000. There are three adult children, one of whom works on the farm and wants to take over. The farmer has made no lifetime gifts apart from small annual gifts. The late spouse's nil-rate band was not used on the first death and the farmhouse is the farmer's only home.",
      "objectives": "Understand the inheritance tax exposure on death and what could be done now to reduce it while keeping the farm in the family and in operation.",
      "constraints": "The farmer must keep enough income and capital to live on and does not want to lose control of the farm during their lifetime. The child who farms should be able to continue without selling land to pay tax."
    },
    "mustCover": [
      "agricultural property relief|APR",
      "business property relief|BPR",
      "nil.rate band",
      "potentially exempt|seven years|7 years|PET",
      "trust"
    ]
  }
];
