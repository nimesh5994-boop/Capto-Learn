import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader, Public_Sans } from "next/font/google";
import "./globals.css";

// Same type system as Capto Sign / Capto Extract.
const displayFont = Newsreader({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"] });
const bodyFont = Public_Sans({ variable: "--font-body", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const monoFont = IBM_Plex_Mono({ variable: "--font-data", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  // Browser tabs always read just "Capto Learn" (like Capto Sign and Ledger) — page titles never show.
  title: { default: "Capto Learn", template: "Capto Learn" },
  description: "UK accountancy training and cited research for practice teams.",
};

// Applies the stored theme choice before first paint (shared "capto-theme" key with the other Capto apps).
const themeInitScript = `try{var t=localStorage.getItem("capto-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t;}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
