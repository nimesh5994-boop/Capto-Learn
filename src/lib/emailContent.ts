/*
 * The words of every Capto Learn email, as pure builders: each returns the subject plus template content and brand,
 * ready for renderEmail (lib/emailTemplate.ts). No database or server imports, so every email is unit-tested and can
 * be rendered as a sample. Callers pass only what's safe to show — never secrets, never full answer text.
 */
import { escapeHtml as esc, type EmailBrand, type EmailContent } from "./emailTemplate";

export interface BuiltEmail {
  subject: string;
  content: EmailContent;
  brand: EmailBrand;
}

/** A firm's name and colour for emails sent on its behalf. */
export interface FirmBrand {
  name: string;
  color?: string | null;
}

const firmBrand = (f: FirmBrand): EmailBrand => ({ firmName: f.name, color: f.color ?? null });
const CAPTO: EmailBrand = {};

/** "Friday 24 October 2026". Due dates are stored as the end of a UTC day, so they're shown in UTC. */
export function longDate(d: Date, timeZone = "Europe/London"): string {
  // Built from parts: ICU versions differ on whether a comma follows the weekday.
  const parts = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone }).formatToParts(d);
  const get = (t: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("weekday")} ${get("day")} ${get("month")} ${get("year")}`;
}
export const dueDay = (d: Date) => longDate(d, "UTC");

const firstName = (name: string) => name.trim().split(/\s+/)[0] || name;
const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

/* ───────────── Invitations & access ───────────── */

export function teamInviteEmail(p: { firm: FirmBrand; inviterName: string | null; roleLabel: string; link: string; expiresAt: Date }): BuiltEmail {
  const who = p.inviterName ?? p.firm.name;
  return {
    subject: p.inviterName ? `${p.inviterName} invited you to ${p.firm.name} on Capto Learn` : `You've been invited to ${p.firm.name} on Capto Learn`,
    brand: firmBrand(p.firm),
    content: {
      heading: `Join ${p.firm.name} on Capto Learn`,
      preheader: `${who} has invited you as ${p.roleLabel}. The link expires on ${longDate(p.expiresAt)}.`,
      paragraphs: [
        `${who} has invited you to join ${p.firm.name} on Capto Learn, the firm's training and research platform for UK tax and accounts work.`,
        "Accept the invitation to choose a password and get started.",
      ],
      details: [
        ["Firm", p.firm.name],
        ["Role", p.roleLabel],
        ...(p.inviterName ? ([["Invited by", p.inviterName]] as [string, string][]) : []),
        ["Link expires", longDate(p.expiresAt)],
      ],
      button: { label: "Accept the invitation", url: p.link },
      note: "The link works once. If it has expired, ask the person who invited you to send a new one.",
      reason: `You're receiving this because someone at ${p.firm.name} invited this address to Capto Learn.`,
    },
  };
}

export function platformInviteEmail(p: { inviterName: string; roleLabel: string; roleDescription: string | null; link: string; expiresAt: Date }): BuiltEmail {
  return {
    subject: `${p.inviterName} invited you to Capto Learn as ${p.roleLabel}`,
    brand: CAPTO,
    content: {
      heading: "You're invited to the Capto Learn team",
      preheader: `Join as ${p.roleLabel}. The link expires on ${longDate(p.expiresAt)}.`,
      paragraphs: [`${p.inviterName} has invited you to join the Capto Learn team as ${p.roleLabel}.`, ...(p.roleDescription ? [p.roleDescription] : [])],
      details: [
        ["Role", p.roleLabel],
        ["Invited by", p.inviterName],
        ["Link expires", longDate(p.expiresAt)],
      ],
      button: { label: "Accept the invitation", url: p.link },
      note: "The link works once. If it has expired, ask for a new one.",
      reason: "You're receiving this because someone on the Capto Learn team invited this address.",
    },
  };
}

export function firmInviteEmail(p: { firmName: string; planText: string; link: string; expiresAt: Date }): BuiltEmail {
  return {
    subject: "Your invitation to Capto Learn",
    brand: CAPTO,
    content: {
      heading: `Set up ${p.firmName} on Capto Learn`,
      preheader: `Your firm's invitation to Capto Learn: ${p.planText}. The link expires on ${longDate(p.expiresAt)}.`,
      paragraphs: [
        `You've been invited to set up ${p.firmName} on Capto Learn: structured courses, a Daily 5 review, team training records, and Ask Capto, cited research from HMRC and GOV.UK guidance.`,
        "Create your firm's account, then invite your team.",
      ],
      details: [
        ["Firm", p.firmName],
        ["Plan", p.planText],
        ["Link expires", longDate(p.expiresAt)],
      ],
      button: { label: "Create your firm's account", url: p.link },
      note: "The link works once, for this email address only.",
      reason: "You're receiving this because the Capto Learn team invited your firm.",
    },
  };
}

export function passwordResetEmail(p: { email: string; link: string; expiresText: string; admin?: { name: string; firm: FirmBrand } }): BuiltEmail {
  return {
    subject: "Reset your Capto Learn password",
    brand: p.admin ? firmBrand(p.admin.firm) : CAPTO,
    content: {
      heading: "Choose a new password",
      preheader: `A link to set a new password for ${p.email}. It expires in ${p.expiresText}.`,
      paragraphs: p.admin
        ? [`${p.admin.name} at ${p.admin.firm.name} sent you a link to set a new password for Capto Learn (${p.email}).`]
        : [`Someone asked to reset the password for ${p.email} on Capto Learn.`],
      button: { label: "Choose a new password", url: p.link },
      note: `The link works once and expires in ${p.expiresText}. If you weren't expecting this, you can ignore it; your password won't change.`,
      reason: "You're receiving this because a password reset was requested for your Capto Learn account.",
    },
  };
}

export function welcomeEmail(p: { name: string; firmName: string; appUrl: string; trialDays: number | null }): BuiltEmail {
  const items: [string, string, string][] = [
    ["Invite your team", "Add colleagues one by one, paste a list, or switch on a join link.", "/admin/users"],
    ["Set your branding", "Your logo and colour on certificates and emails.", "/admin/branding"],
    ["Assign a first course", "Pick a course for a person or the whole team, with a due date.", "/team"],
    ["Try Ask Capto", "Ask a tax or accounts question and get an answer cited to HMRC and GOV.UK guidance.", "/ask"],
  ];
  const list = `<ol style="margin:0 0 6px;padding-left:20px;">${items
    .map(
      ([t, d, href]) =>
        `<li style="margin:0 0 10px;"><a href="${esc(p.appUrl + href)}" style="color:#a01f62;font-weight:700;text-decoration:none;">${esc(t)}</a><br /><span style="color:#6b6470;font-size:14px;">${esc(d)}</span></li>`
    )
    .join("")}</ol>`;
  return {
    subject: `Welcome to Capto Learn, ${firstName(p.name)}`,
    brand: CAPTO,
    content: {
      heading: `Welcome to Capto Learn`,
      preheader: `${p.firmName} is set up. Four quick steps to get your team going.`,
      paragraphs: [`Hi ${firstName(p.name)}, ${p.firmName} is set up and ready. Four quick steps to get going:`],
      bodyHtml: list,
      details: p.trialDays ? [["Free trial", `${p.trialDays} days`]] : undefined,
      button: { label: "Open Capto Learn", url: p.appUrl },
      reason: `You're receiving this because you've just created ${p.firmName}'s Capto Learn account.`,
    },
  };
}

/* ───────────── Join link requests ───────────── */

export function joinRequestAdminEmail(p: { firm: FirmBrand; name: string; email: string; link: string }): BuiltEmail {
  return {
    subject: `${p.name} asked to join ${p.firm.name} on Capto Learn`,
    brand: firmBrand(p.firm),
    content: {
      heading: "New request to join your firm",
      preheader: `${p.name} (${p.email}) used your join link and is waiting for approval.`,
      paragraphs: [`${p.name} used ${p.firm.name}'s join link. Their email address isn't on your auto-approved domains, so they're waiting for someone to approve them.`],
      details: [
        ["Name", p.name],
        ["Email", p.email],
      ],
      button: { label: "Review the request", url: p.link },
      note: "Only approve people you recognise. Approving uses a seat on your plan.",
      reason: `You're receiving this because you manage users for ${p.firm.name}.`,
    },
  };
}

export function joinRequestReceivedEmail(p: { firm: FirmBrand; name: string }): BuiltEmail {
  return {
    subject: `Your request to join ${p.firm.name} on Capto Learn`,
    brand: firmBrand(p.firm),
    content: {
      heading: "We've passed on your request",
      preheader: `${p.firm.name} will review it. We'll email you when they decide.`,
      paragraphs: [
        `Hi ${firstName(p.name)}, your request to join ${p.firm.name} on Capto Learn has gone to the firm's admins.`,
        "We'll email you as soon as they decide. Once you're approved, you can sign in with the email and password you chose.",
      ],
      reason: "You're receiving this because you used a firm's Capto Learn join link.",
    },
  };
}

export function joinRequestDecisionEmail(p: { firm: FirmBrand; name: string; approved: boolean; loginUrl: string }): BuiltEmail {
  return p.approved
    ? {
        subject: `You're in: ${p.firm.name} on Capto Learn`,
        brand: firmBrand(p.firm),
        content: {
          heading: "Your request was approved",
          preheader: `Sign in with the email and password you chose.`,
          paragraphs: [`Good news, ${firstName(p.name)}: ${p.firm.name} has approved your request. Sign in with the email and password you chose when you asked to join.`],
          button: { label: "Sign in", url: p.loginUrl },
          reason: "You're receiving this because you asked to join a firm on Capto Learn.",
        },
      }
    : {
        subject: `Your request to join ${p.firm.name} on Capto Learn`,
        brand: firmBrand(p.firm),
        content: {
          heading: "Your request wasn't approved",
          preheader: `${p.firm.name} didn't approve this request.`,
          paragraphs: [
            `Hi ${firstName(p.name)}, ${p.firm.name} hasn't approved your request to join them on Capto Learn.`,
            "If you think this is a mistake, contact the firm directly. They can send you an invitation instead.",
          ],
          reason: "You're receiving this because you asked to join a firm on Capto Learn.",
        },
      };
}

/* ───────────── Training ───────────── */

export function trainingAssignedEmail(p: { firm: FirmBrand; name: string; assignerName: string; title: string; lessons: number; dueDate: Date | null; note: string | null; link: string }): BuiltEmail {
  return {
    subject: `New training from ${p.firm.name}: ${p.title}`,
    brand: firmBrand(p.firm),
    content: {
      heading: "You've been assigned training",
      preheader: `${p.title}${p.dueDate ? `, due ${dueDay(p.dueDate)}` : ""}.`,
      paragraphs: [`Hi ${firstName(p.name)}, ${p.assignerName} has assigned you ${p.title} on Capto Learn.`, ...(p.note ? [`Their note: “${clip(p.note, 500)}”`] : [])],
      details: [
        ["Training", p.title],
        ["Lessons", String(p.lessons)],
        ["Due", p.dueDate ? dueDay(p.dueDate) : "No due date"],
        ["Assigned by", p.assignerName],
      ],
      button: { label: "Start now", url: p.link },
      reason: `You're receiving this because ${p.firm.name} assigned you training on Capto Learn.`,
    },
  };
}

export function trainingReminderEmail(p: { firm: FirmBrand; name: string; title: string; dueDate: Date; done: number; total: number; stage: "due_soon" | "overdue"; link: string; settingsUrl: string }): BuiltEmail {
  const left = p.total - p.done;
  const overdue = p.stage === "overdue";
  return {
    subject: overdue ? `Overdue: ${p.title}` : `Reminder: ${p.title} is due ${dueDay(p.dueDate)}`,
    brand: firmBrand(p.firm),
    content: {
      heading: overdue ? "Your training is now overdue" : "Your training is due soon",
      preheader: `${plural(left, "lesson")} left of ${p.title}.`,
      paragraphs: [
        overdue
          ? `Hi ${firstName(p.name)}, ${p.title} was due on ${dueDay(p.dueDate)} and isn't finished yet. Your firm can see it as overdue.`
          : `Hi ${firstName(p.name)}, a quick reminder that ${p.title} is due on ${dueDay(p.dueDate)}.`,
      ],
      details: [
        ["Training", p.title],
        ["Progress", `${p.done} of ${plural(p.total, "lesson")} done`],
        ["Due", dueDay(p.dueDate)],
      ],
      button: { label: overdue ? "Finish it now" : "Carry on", url: p.link },
      reason: `You're receiving this because ${p.firm.name} assigned you this training.`,
      settingsUrl: p.settingsUrl,
    },
  };
}

export function courseCompletedEmail(p: { firm: FirmBrand; name: string; courseTitle: string; lessons: number; certificateUrl: string }): BuiltEmail {
  return {
    subject: `Congratulations: you've completed ${p.courseTitle}`,
    brand: firmBrand(p.firm),
    content: {
      heading: "Course complete. Well done!",
      preheader: `Your certificate for ${p.courseTitle} is ready.`,
      paragraphs: [`Congratulations, ${firstName(p.name)}: you've finished every lesson in ${p.courseTitle}. Your certificate is ready to view, print or save as PDF for your CPD record.`],
      details: [
        ["Course", p.courseTitle],
        ["Lessons", String(p.lessons)],
      ],
      button: { label: "View your certificate", url: p.certificateUrl },
      note: "The Daily 5 will keep bringing back questions from this course, so it stays fresh.",
      reason: "You're receiving this because you completed a course on Capto Learn.",
    },
  };
}

/* ───────────── Interview tests ───────────── */

export function interviewInviteEmail(p: { firm: FirmBrand; candidateName: string; role: string | null; minutes: number; questions: number; expiresAt: Date; link: string }): BuiltEmail {
  return {
    subject: `Your skills test from ${p.firm.name}`,
    brand: firmBrand(p.firm),
    content: {
      heading: "Your skills test is ready",
      preheader: `${p.minutes} minutes, ${p.questions} questions. Take it by ${longDate(p.expiresAt)}.`,
      paragraphs: [
        `Hi ${firstName(p.candidateName)}, ${p.firm.name} has asked you to take a short technical test${p.role ? ` for the ${p.role} role` : ""}.`,
        "Find a quiet moment: once you start, the timer runs and the test must be finished on the same device in one sitting. It runs in full screen and must be done without AI tools, search engines or anyone else's help; you'll be asked to confirm this before you start.",
      ],
      details: [
        ["Time allowed", `${p.minutes} minutes`],
        ["Questions", String(p.questions)],
        ["Take it by", longDate(p.expiresAt)],
      ],
      button: { label: "Open the test", url: p.link },
      note: "This link is personal to you. Please don't share it.",
      reason: `You're receiving this because ${p.firm.name} invited you to take a skills test.`,
    },
  };
}

export function interviewReceiptEmail(p: { firm: FirmBrand; candidateName: string }): BuiltEmail {
  return {
    subject: `Thank you: your test for ${p.firm.name} is submitted`,
    brand: firmBrand(p.firm),
    content: {
      heading: "Test submitted. Thank you!",
      preheader: `${p.firm.name} has your answers.`,
      paragraphs: [`Thank you, ${firstName(p.candidateName)}. Your answers have gone to ${p.firm.name}, and they'll be in touch about next steps.`],
      reason: `You're receiving this because you took a skills test for ${p.firm.name}.`,
    },
  };
}

/* ───────────── Research register ───────────── */

export function registerChangesEmail(p: { firm: FirmBrand; name: string; reviewerName: string; question: string; note: string; link: string }): BuiltEmail {
  return {
    subject: "Your Ask Capto answer needs changes",
    brand: firmBrand(p.firm),
    content: {
      heading: "A reviewer asked for changes",
      preheader: `${p.reviewerName}: ${clip(p.note, 90)}`,
      paragraphs: [
        `Hi ${firstName(p.name)}, ${p.reviewerName} reviewed one of your Ask Capto answers in ${p.firm.name}'s research register and asked for changes.`,
        `Until it's updated, it won't be reused for colleagues' questions.`,
      ],
      details: [
        ["Question", clip(p.question, 140)],
        ["Reviewer's note", clip(p.note, 600)],
      ],
      button: { label: "Open the answer", url: p.link },
      reason: "You're receiving this because you asked this question in Ask Capto.",
    },
  };
}
