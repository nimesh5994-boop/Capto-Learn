import { Marked, type Tokens } from "marked";

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/*
 * Markdown → HTML for lesson content and Ask Capto answers. Raw HTML in the source is escaped, never
 * rendered (answers come from a model reading third-party pages), and only http(s)/relative links survive.
 */
const md = new Marked({
  gfm: true,
  renderer: {
    html(token: Tokens.HTML | Tokens.Tag) {
      return escapeHtml(token.text);
    },
    link(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Link) {
      const text = this.parser.parseInline(token.tokens);
      const href = token.href ?? "";
      if (!/^(https?:\/\/|\/|#)/i.test(href)) return text;
      const external = /^https?:\/\//i.test(href);
      return `<a href="${escapeHtml(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${text}</a>`;
    },
    image(token: Tokens.Image) {
      return escapeHtml(token.text ?? "");
    },
  },
});

export function renderMarkdown(src: string): string {
  return md.parse(src ?? "", { async: false }) as string;
}

/** Inline-only (no wrapping <p>) — for prompts, options and table cells. */
export function renderInline(src: string): string {
  return md.parseInline(src ?? "", { async: false }) as string;
}
