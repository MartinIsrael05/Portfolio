import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { PrefsProvider } from "@/lib/prefs";
import { profile } from "@/content/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://martinisrael.vercel.app"),
  title: "Martín Israel",
  description:
    "Frontend developer y tecnólogo multimedial en Buenos Aires. Interfaces web, video experimental, instalaciones interactivas y diseño sonoro.",
  openGraph: {
    title: "Martín Israel",
    description:
      "Frontend developer y tecnólogo multimedial en Buenos Aires. Interfaces web, video experimental, instalaciones interactivas y diseño sonoro.",
    type: "website",
    locale: "es_AR",
    images: ["/media/umbra-marina/poster.jpg"],
  },
  alternates: { canonical: "/" },
  authors: [{ name: profile.name, url: profile.github }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0b0d" },
    { media: "(prefers-color-scheme: light)", color: "#f4f3f0" },
  ],
};

/** Aplica el tema guardado antes del primer pintado para evitar un flash. */
const themeScript = `
try {
  var t = localStorage.getItem('mi.theme');
  document.documentElement.setAttribute('data-theme', t === 'light' ? 'light' : 'dark');
  var l = localStorage.getItem('mi.lang');
  if (l === 'en' || l === 'es') document.documentElement.lang = l;
} catch (e) {
  document.documentElement.setAttribute('data-theme', 'dark');
}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${bricolage.variable} ${geist.variable} ${geistMono.variable}`}>
        <PrefsProvider>{children}</PrefsProvider>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
