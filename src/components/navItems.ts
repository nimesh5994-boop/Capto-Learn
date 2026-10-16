/* Navigation entries, shared by the server layout (permissions, quick-jump index) and the client sidebar. */
import {
  Activity,
  BellRing,
  BookOpenCheck,
  Bookmark,
  Building2,
  Compass,
  Layers,
  ClipboardCheck,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  Mail,
  MessageSquareQuote,
  MessageCircleHeart,
  Repeat,
  TrendingUp,
  Search,
  Database,
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
  | "ask"
  | "saved"
  | "team"
  | "interviews"
  | "admin.users"
  | "admin.roles"
  | "admin.practice"
  | "admin.branding"
  | "admin.billing"
  | "admin.activity"
  | "platform.firms"
  | "platform.invitations"
  | "platform.content"
  | "platform.knowledge"
  | "platform.team"
  | "platform.roles";

export const NAV_ITEMS: Record<NavKey, { href: string; label: string; icon: LucideIcon; exact?: boolean }> = {
  dashboard: { href: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  learn: { href: "/learn", label: "Courses", icon: GraduationCap },
  review: { href: "/review", label: "Daily 5", icon: Repeat },
  flashcards: { href: "/flashcards", label: "Flashcards", icon: Layers },
  skillsCheck: { href: "/skills-check", label: "Skills check", icon: Compass },
  progress: { href: "/progress", label: "My progress", icon: TrendingUp },
  coach: { href: "/coach", label: "My coach", icon: MessageCircleHeart },
  search: { href: "/search", label: "Guidance search", icon: Search },
  updates: { href: "/updates", label: "HMRC updates", icon: BellRing },
  ask: { href: "/ask", label: "Ask Capto", icon: MessageSquareQuote, exact: true },
  saved: { href: "/ask/saved", label: "Saved research", icon: Bookmark },
  team: { href: "/team", label: "Team training", icon: ClipboardCheck, exact: true },
  interviews: { href: "/team/interviews", label: "Interview tests", icon: UserCheck },
  "admin.users": { href: "/admin/users", label: "Users", icon: UsersRound },
  "admin.roles": { href: "/admin/roles", label: "Roles", icon: UserCog },
  "admin.practice": { href: "/admin/practice", label: "Practice details", icon: Building2 },
  "admin.branding": { href: "/admin/branding", label: "Branding", icon: Palette },
  "admin.billing": { href: "/admin/billing", label: "Plan & billing", icon: CreditCard },
  "admin.activity": { href: "/admin/activity", label: "Activity log", icon: Activity },
  "platform.firms": { href: "/platform", label: "Firms", icon: Building2, exact: true },
  "platform.invitations": { href: "/platform/invitations", label: "Firm invitations", icon: Mail },
  "platform.content": { href: "/reviewer", label: "Review centre", icon: BookOpenCheck },
  "platform.knowledge": { href: "/platform/knowledge", label: "Knowledge base", icon: Database },
  "platform.team": { href: "/platform/team", label: "Platform team", icon: ShieldCheck },
  "platform.roles": { href: "/platform/roles", label: "Platform roles", icon: UserCog },
};

export type NavGroup = { label: string; items: NavKey[] };
