/* Top-navigation categories. Pure data + a pure grouping function: the server layout works out which NavKeys a
   person may see (permissions live there), then categoriesFor() groups them. Every NavKey belongs to exactly one
   category; order here is the order shown. */
import { BookMarked, GraduationCap, Settings, ShieldCheck, UsersRound, Wrench, type LucideIcon } from "lucide-react";
import type { NavKey } from "@/components/navItems";

export type NavCategoryId = "learn" | "research" | "tools" | "team" | "admin" | "platform";

export type NavCategory = { id: NavCategoryId; label: string; keys: NavKey[]; icon: LucideIcon };

export const NAV_CATEGORIES: NavCategory[] = [
  { id: "learn", label: "Learn", icon: GraduationCap, keys: ["dashboard", "learn", "review", "flashcards", "skillsCheck", "progress", "coach"] },
  { id: "research", label: "Research", icon: BookMarked, keys: ["search", "ask", "saved", "cases", "updates", "register"] },
  { id: "tools", label: "Tools", icon: Wrench, keys: ["rates", "calculators"] },
  { id: "team", label: "Team", icon: UsersRound, keys: ["team", "interviews"] },
  { id: "admin", label: "Admin", icon: Settings, keys: ["admin.users", "admin.roles", "admin.practice", "admin.branding", "admin.billing", "admin.activity", "admin.emails"] },
  { id: "platform", label: "Platform", icon: ShieldCheck, keys: ["platform.firms", "platform.invitations", "platform.emails", "platform.content", "platform.knowledge", "platform.benchmark", "platform.team", "platform.roles"] },
];

/** The categories that have at least one visible item, in fixed order, each holding only its visible keys. */
export function categoriesFor(visibleKeys: Iterable<NavKey>): { id: NavCategoryId; label: string; keys: NavKey[] }[] {
  const visible = new Set(visibleKeys);
  return NAV_CATEGORIES.map(({ id, label, keys }) => ({ id, label, keys: keys.filter((k) => visible.has(k)) })).filter((c) => c.keys.length > 0);
}

/** Which category a key lives in. */
export function categoryOf(key: NavKey): NavCategoryId {
  return NAV_CATEGORIES.find((c) => c.keys.includes(key))!.id;
}

/** Left icon rail: the signed-in person's own pages (plus "My account", added by the rail itself) ... */
export const RAIL_PERSONAL: NavKey[] = ["dashboard", "progress", "coach", "review", "flashcards", "skillsCheck", "saved"];
/** ... and the highlighted quick actions at the bottom. */
export const RAIL_QUICK: NavKey[] = ["learn", "ask", "calculators", "search"];
