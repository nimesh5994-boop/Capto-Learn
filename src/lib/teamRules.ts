/*
 * Pure helpers for adding staff: reading a pasted list of people, and checking an email against a firm's
 * auto-approved domains. Unit-tested.
 */

export interface ListedPerson {
  name: string | null;
  email: string;
}

const EMAIL = /[^\s<>,;"']+@[^\s<>,;"']+\.[a-z]{2,}/i;

/**
 * One person per line, in whatever shape people paste: "jo@firm.co.uk", "Jo Bloggs, jo@firm.co.uk",
 * "Jo Bloggs <jo@firm.co.uk>", "jo@firm.co.uk  Jo Bloggs", or a spreadsheet row with tabs. Several emails
 * on one line separated by commas or semicolons also work. Duplicates are dropped; lines with no email are
 * returned as problems.
 */
export function parsePeople(text: string): { people: ListedPerson[]; problems: string[] } {
  const people: ListedPerson[] = [];
  const problems: string[] = [];
  const seen = new Set<string>();
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const emails = line.match(new RegExp(EMAIL.source, "gi")) ?? [];
    if (!emails.length) {
      problems.push(line);
      continue;
    }
    // A name only makes sense when the line holds one person.
    const name =
      emails.length === 1
        ? line
            .replace(emails[0], "")
            .replace(/[<>"',;\t]+/g, " ")
            .replace(/\s+/g, " ")
            .trim() || null
        : null;
    for (const e of emails) {
      const email = e.toLowerCase();
      if (seen.has(email)) continue;
      seen.add(email);
      people.push({ name, email });
    }
  }
  return { people, problems };
}

/** Normalises what an admin types as allowed domains: "@Firm.co.uk, other.com" → ["firm.co.uk", "other.com"]. */
export function parseDomains(text: string): string[] {
  return [
    ...new Set(
      text
        .split(/[\s,;]+/)
        .map((d) => d.trim().toLowerCase().replace(/^@/, ""))
        .filter((d) => /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(d))
    ),
  ];
}

/** True when the email's domain is one of the firm's (exactly — "firm.co.uk" doesn't admit "notfirm.co.uk"). */
export function domainAllowed(email: string, domains: string[]): boolean {
  const at = email.lastIndexOf("@");
  if (at < 0) return false;
  const d = email.slice(at + 1).toLowerCase();
  return domains.includes(d);
}

/** A join code that's easy to read out and type: no look-alike characters. */
export function newJoinCode(random: (n: number) => number = (n) => Math.floor(Math.random() * n)): string {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const pick = () => Array.from({ length: 4 }, () => alphabet[random(alphabet.length)]).join("");
  return `${pick()}-${pick()}`;
}

/** Roles a join link may give — never admin or owner, which must be granted by a person. */
export const JOIN_ROLES = ["staff", "viewer", "manager"] as const;
export type JoinRole = (typeof JOIN_ROLES)[number];
