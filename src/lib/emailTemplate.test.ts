import { describe, expect, it } from "vitest";
import { renderEmail, renderEmailHtml, renderEmailText } from "./emailTemplate";

const content = {
  heading: "You're invited to review Capto Learn",
  preheader: "Join as Content reviewer — the link expires in 7 days",
  paragraphs: ["Nimesh Patel has invited you to join the Capto Learn team."],
  details: [
    ["Role", "Content reviewer"],
    ["Expires", "28 October 2026"],
  ] as [string, string][],
  button: { label: "Accept the invitation", url: "https://learn.chitta.cloud/invite/abc" },
  reason: "You're receiving this because someone invited you to Capto Learn.",
};

describe("email template", () => {
  it("renders the heading, preview line, details, button and fallback link", () => {
    const html = renderEmailHtml(content);
    expect(html).toContain("You&#39;re invited to review Capto Learn");
    expect(html).toContain("Join as Content reviewer");
    expect(html).toContain(">Content reviewer<");
    expect(html).toContain('href="https://learn.chitta.cloud/invite/abc"');
    expect(html).toContain("copy this link into your browser");
    expect(html).toContain("Capto Cloud Ltd, part of the Affinity Associates Group");
    expect(html).toContain("#a01f62"); // Capto magenta by default
  });
  it("escapes everything a person could type, and refuses unsafe links", () => {
    const html = renderEmailHtml({ heading: "<b>x</b>", paragraphs: ["<script>alert(1)</script>"], button: { label: "Go", url: "javascript:alert(1)" } }, { firmName: "Smith & <Co>" });
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("Smith &amp; &lt;Co&gt;");
    expect(html).not.toContain("javascript:");
  });
  it("uses the firm's name and colour when sending for a firm, and ignores bad colours and data: logos", () => {
    const html = renderEmailHtml(content, { firmName: "Smith & Co", color: "#123456", logoUrl: "data:image/png;base64,xx" });
    expect(html).toContain("Smith &amp; Co");
    expect(html).toContain("via Capto Learn");
    expect(html).toContain("#123456");
    expect(html).not.toContain("data:image");
    expect(renderEmailHtml(content, { color: "red; background:url(x)" })).toContain("#a01f62");
  });
  it("produces a readable plain-text version", () => {
    const text = renderEmailText({ ...content, settingsUrl: "https://learn.chitta.cloud/account" }, { firmName: "Smith & Co" });
    expect(text).toContain("Smith & Co via Capto Learn");
    expect(text).toContain("Role: Content reviewer");
    expect(text).toContain("Accept the invitation: https://learn.chitta.cloud/invite/abc");
    expect(text).toContain("Manage email settings: https://learn.chitta.cloud/account");
    expect(text).not.toMatch(/<[a-z]/i);
  });
  it("returns both parts", () => {
    const r = renderEmail(content);
    expect(r.html.startsWith("<!doctype html>")).toBe(true);
    expect(r.text.length).toBeGreaterThan(50);
  });
});
