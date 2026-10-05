import { SOURCE_DOMAINS, type Block, type Exercise, type JournalLine, type Lesson, type Track } from "./types";

/*
 * Structural checks on a Track. Pure — used by scripts/validate-content.ts (authoring) and by
 * content.test.ts (CI), so a broken lesson can never ship.
 */

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const TAX_YEAR = /^\d{4}\/\d{2}$/;

function balanced(lines: JournalLine[]): boolean {
  const dr = lines.reduce((s, l) => s + (l.dr ?? 0), 0);
  const cr = lines.reduce((s, l) => s + (l.cr ?? 0), 0);
  return Math.abs(dr - cr) < 0.005;
}

function lineProblems(lines: JournalLine[], where: string, errors: string[]) {
  if (lines.length < 2) errors.push(`${where}: a journal needs at least two lines`);
  for (const l of lines) {
    const hasDr = typeof l.dr === "number";
    const hasCr = typeof l.cr === "number";
    if (hasDr === hasCr) errors.push(`${where}: line "${l.account}" must have exactly one of dr / cr`);
    const v = l.dr ?? l.cr ?? 0;
    if (!(v > 0) || !Number.isFinite(v)) errors.push(`${where}: line "${l.account}" amount must be a positive number`);
    if (!l.account?.trim()) errors.push(`${where}: a line has no account`);
  }
  if (!balanced(lines)) errors.push(`${where}: debits and credits don't balance`);
}

function blockProblems(b: Block, where: string, errors: string[]) {
  switch (b.kind) {
    case "md":
    case "callout":
      if (!b.md?.trim()) errors.push(`${where}: empty ${b.kind}`);
      break;
    case "table":
      if (b.head.length < 2) errors.push(`${where}: table needs 2+ columns`);
      b.rows.forEach((r, i) => r.length !== b.head.length && errors.push(`${where}: table row ${i + 1} has ${r.length} cells, header has ${b.head.length}`));
      break;
    case "journal":
      lineProblems(b.lines, `${where} journal`, errors);
      break;
    default:
      errors.push(`${where}: unknown block kind ${(b as { kind: string }).kind}`);
  }
}

function exerciseProblems(e: Exercise, where: string, errors: string[]) {
  if (!e.prompt?.trim()) errors.push(`${where}: missing prompt`);
  if (!e.explain?.trim()) errors.push(`${where}: missing explanation`);
  switch (e.kind) {
    case "mcq":
      if (e.options.length < 3) errors.push(`${where}: mcq needs 3+ options`);
      if (new Set(e.options).size !== e.options.length) errors.push(`${where}: duplicate options`);
      if (!Number.isInteger(e.answer) || e.answer < 0 || e.answer >= e.options.length) errors.push(`${where}: answer index out of range`);
      break;
    case "multi":
      if (e.options.length < 3) errors.push(`${where}: multi needs 3+ options`);
      if (!e.answers.length) errors.push(`${where}: multi needs at least one correct answer`);
      if (e.answers.some((a) => !Number.isInteger(a) || a < 0 || a >= e.options.length)) errors.push(`${where}: answer index out of range`);
      if (new Set(e.answers).size !== e.answers.length) errors.push(`${where}: duplicate answers`);
      break;
    case "numeric":
      if (!Number.isFinite(e.answer)) errors.push(`${where}: numeric answer must be a number`);
      if (e.tolerance !== undefined && !(e.tolerance >= 0)) errors.push(`${where}: tolerance must be >= 0`);
      break;
    case "journal": {
      lineProblems(e.answer, `${where} answer`, errors);
      const offered = new Set(e.accounts);
      for (const l of e.answer) if (!offered.has(l.account)) errors.push(`${where}: answer account "${l.account}" isn't in the accounts picker`);
      if (e.accounts.length < e.answer.length + 2) errors.push(`${where}: offer at least two distractor accounts`);
      if (new Set(e.answer.map((l) => l.account)).size !== e.answer.length) errors.push(`${where}: use one line per account in the answer`);
      break;
    }
    case "classify":
      if (e.categories.length < 2) errors.push(`${where}: classify needs 2+ categories`);
      if (e.items.length < 3) errors.push(`${where}: classify needs 3+ items`);
      e.items.forEach((it, i) => (!Number.isInteger(it.answer) || it.answer < 0 || it.answer >= e.categories.length) && errors.push(`${where}: item ${i + 1} answer out of range`));
      break;
    default:
      errors.push(`${where}: unknown exercise kind ${(e as { kind: string }).kind}`);
  }
}

function urlProblem(url: string): string | null {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return "not a valid URL";
  }
  if (u.protocol !== "https:") return "must be https";
  const host = u.hostname.toLowerCase();
  const ok = (SOURCE_DOMAINS as readonly string[]).some((d) => host === d || host.endsWith(`.${d}`));
  return ok ? null : `${host} isn't on the official-source allowlist`;
}

export function lessonProblems(l: Lesson, where: string): string[] {
  const errors: string[] = [];
  if (!KEBAB.test(l.slug)) errors.push(`${where}: slug must be kebab-case`);
  if (!l.title?.trim() || !l.summary?.trim()) errors.push(`${where}: title and summary are required`);
  if (!(l.minutes >= 5 && l.minutes <= 90)) errors.push(`${where}: minutes should be 5–90`);
  if (l.objectives.length < 2) errors.push(`${where}: give at least two objectives`);
  if (l.taxYear !== undefined && !TAX_YEAR.test(l.taxYear)) errors.push(`${where}: taxYear must look like 2026/27`);
  if (l.body.length < 3) errors.push(`${where}: body is too thin (3+ blocks)`);
  l.body.forEach((b, i) => blockProblems(b, `${where} body[${i}]`, errors));
  if (l.scenario) {
    if (!l.scenario.narrative?.trim()) errors.push(`${where}: scenario narrative missing`);
    l.scenario.walkthrough.forEach((b, i) => blockProblems(b, `${where} scenario[${i}]`, errors));
  }
  if (l.exercises.length < 2) errors.push(`${where}: at least two practical exercises`);
  const ids = new Set<string>();
  for (const e of [...l.exercises, ...l.quiz]) {
    if (!KEBAB.test(e.id)) errors.push(`${where}: exercise id "${e.id}" must be kebab-case`);
    if (ids.has(e.id)) errors.push(`${where}: duplicate exercise id "${e.id}"`);
    ids.add(e.id);
  }
  l.exercises.forEach((e) => exerciseProblems(e, `${where} exercise ${e.id}`, errors));
  if (l.quiz.length < 4 || l.quiz.length > 8) errors.push(`${where}: quiz should have 4–8 questions`);
  l.quiz.forEach((q) => {
    if (q.kind !== "mcq") errors.push(`${where} quiz ${q.id}: quiz questions must be mcq`);
    exerciseProblems(q, `${where} quiz ${q.id}`, errors);
  });
  if (!l.sources.length) errors.push(`${where}: cite at least one official source`);
  for (const s of l.sources) {
    const p = urlProblem(s.url);
    if (p) errors.push(`${where}: source "${s.label}" ${p}`);
  }
  return errors;
}

export function trackProblems(t: Track): string[] {
  const errors: string[] = [];
  if (!KEBAB.test(t.slug)) errors.push(`track ${t.slug}: slug must be kebab-case`);
  if (!t.modules.length) errors.push(`track ${t.slug}: no modules`);
  const modSlugs = new Set<string>();
  const lessonSlugs = new Set<string>();
  for (const m of t.modules) {
    if (modSlugs.has(m.slug)) errors.push(`track ${t.slug}: duplicate module slug ${m.slug}`);
    modSlugs.add(m.slug);
    if (!m.lessons.length) errors.push(`${t.slug}/${m.slug}: module has no lessons`);
    for (const l of m.lessons) {
      if (lessonSlugs.has(l.slug)) errors.push(`${t.slug}: duplicate lesson slug ${l.slug}`);
      lessonSlugs.add(l.slug);
      errors.push(...lessonProblems(l, `${t.slug}/${l.slug}`));
    }
  }
  return errors;
}
