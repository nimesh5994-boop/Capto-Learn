/* Navigation entries, shared by the server layout (permissions, quick-jump index) and the client top navigation. */
import {
  Activity,
  BellRing,
  CalendarDays,
  Target,
  Calculator,
  Percent,
  BookOpenCheck,
  Bookmark,
  Building2,
  ClipboardList,
  Compass,
  Layers,
  ClipboardCheck,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  Mail,
  MailCheck,
  MessageSquareQuote,
  MessageCircleHeart,
  Repeat,
  Route,
  TrendingUp,
  Search,
  Database,
  FlaskConical,
  Scale,
  Palette,
  ShieldCheck,
  UserCheck,
  UserCog,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

export type NavKey =
  | "dashboard"
  | "learn"
  | "review"
  | "progress"
  | "coach"
  | "flashcards"
  | "skillsCheck"
  | "search"
  | "updates"
  | "events"
  | "rates"
  | "cases"
  | "calculators"
  | "ask"
  | "planning"
  | "saved"
  | "register"
  | "team"
  | "interviews"
  | "admin.users"
  | "admin.roles"
  | "admin.practice"
  | "admin.branding"
  | "admin.billing"
  | "admin.activity"
  | "admin.emails"
  | "platform.firms"
  | "platform.invitations"
  | "platform.emails"
  | "platform.content"
  | "platform.knowledge"
  | "platform.benchmark"
  | "platform.planningQa"
  | "platform.team"
  | "platform.roles";

export const NAV_ITEMS: Record<NavKey, { href: string; label: string; description: string; icon: LucideIcon; exact?: boolean }> = {
  dashboard: { href: "/", label: "Dashboard", icon: LayoutDashboard, exact: true, description: "Your overview, deadlines and what to do next" },
  learn: { href: "/learn", label: "Courses", icon: GraduationCap, description: "Structured courses from beginner to advanced" },
  review: { href: "/review", label: "Daily 5", icon: Repeat, description: "Five quick questions a day to keep knowledge fresh" },
  flashcards: { href: "/flashcards", label: "Flashcards", icon: Layers, description: "Spaced-repetition cards for key rules and figures" },
  skillsCheck: { href: "/skills-check", label: "Skills check", icon: Compass, description: "Find your gaps with a short skills assessment" },
  progress: { href: "/progress", label: "My progress", icon: TrendingUp, description: "Lessons completed, scores and certificates" },
  coach: { href: "/coach", label: "My coach", icon: MessageCircleHeart, description: "Personal guidance on what to study next" },
  search: { href: "/search", label: "Guidance search", icon: Search, description: "Search HMRC and GOV.UK guidance by topic" },
  updates: { href: "/updates", label: "HMRC updates", icon: BellRing, description: "Recent HMRC and legislation changes that affect you" },
  events: { href: "/events", label: "Events", icon: CalendarDays, description: "Budgets and major changes: what they mean for accountants and clients" },
  rates: { href: "/rates", label: "Rates & allowances", icon: Percent, description: "Verified tax rates and allowances by year" },
  cases: { href: "/cases", label: "Case law", icon: Scale, description: "Searchable tax tribunal and court decisions" },
  calculators: { href: "/calculators", label: "Calculators", icon: Calculator, description: "Income tax, payroll, corporation tax, CGT, IHT and more" },
  ask: { href: "/ask", label: "Ask Capto", icon: MessageSquareQuote, exact: true, description: "Cited answers from HMRC and GOV.UK guidance" },
  planning: { href: "/planning", label: "Tax planning", icon: Route, description: "Work a client scenario through to options, risks and next steps" },
  saved: { href: "/ask/saved", label: "Saved research", icon: Bookmark, description: "Answers and notes you have kept for later" },
  register: { href: "/ask/register", label: "Research register", icon: ClipboardList, description: "A firm-wide record of research and conclusions" },
  team: { href: "/team", label: "Team training", icon: ClipboardCheck, exact: true, description: "Assign training and track your team's progress" },
  interviews: { href: "/team/interviews", label: "Interview tests", icon: UserCheck, description: "Technical tests for hiring and assessing staff" },
  "admin.users": { href: "/admin/users", label: "Users", icon: UsersRound, description: "Invite people, set roles and manage access" },
  "admin.roles": { href: "/admin/roles", label: "Roles", icon: UserCog, description: "Define what each role can see and do" },
  "admin.practice": { href: "/admin/practice", label: "Practice details", icon: Building2, description: "Firm name, contact details and settings" },
  "admin.branding": { href: "/admin/branding", label: "Branding", icon: Palette, description: "Logo and colours for your workspace" },
  "admin.billing": { href: "/admin/billing", label: "Plan & billing", icon: CreditCard, description: "Your subscription, invoices and seats" },
  "admin.activity": { href: "/admin/activity", label: "Activity log", icon: Activity, description: "Who did what, and when" },
  "admin.emails": { href: "/admin/emails", label: "Email activity", icon: MailCheck, description: "Reminders and emails sent to your team" },
  "platform.firms": { href: "/platform", label: "Firms", icon: Building2, exact: true, description: "Every firm on the platform and its status" },
  "platform.invitations": { href: "/platform/invitations", label: "Firm invitations", icon: Mail, description: "Invite new firms to join Capto Learn" },
  "platform.emails": { href: "/platform/emails", label: "Email log", icon: MailCheck, description: "All outgoing platform emails and delivery" },
  "platform.content": { href: "/reviewer", label: "Review centre", icon: BookOpenCheck, description: "Review and approve lesson and course content" },
  "platform.knowledge": { href: "/platform/knowledge", label: "Knowledge base", icon: Database, description: "Source documents behind Ask Capto answers" },
  "platform.benchmark": { href: "/platform/benchmark", label: "Accuracy benchmark", icon: Target, description: "Measure the accuracy of Ask Capto answers" },
  "platform.planningQa": { href: "/platform/planning-qa", label: "Planning QA", icon: FlaskConical, description: "Run and score the tax planning test scenarios on this site" },
  "platform.team": { href: "/platform/team", label: "Platform team", icon: ShieldCheck, description: "Capto staff with platform access" },
  "platform.roles": { href: "/platform/roles", label: "Platform roles", icon: UserCog, description: "Permissions for Capto platform staff" },
};

export type NavGroup = { label: string; items: NavKey[] };
