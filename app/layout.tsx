import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import { DM_Sans } from "next/font/google";

// Body voice — DM Sans handles paragraph copy at small sizes
// where Panchang's geometric character becomes tiring.
const bodyFont = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mellasia · Cinematic digital experiences",
  description:
    "Mellasia designs cinematic websites and digital identities for hospitality, beauty, lifestyle and experience-led brands. Independent studio, Zagreb / Worldwide.",
  openGraph: {
    title: "Mellasia · Cinematic digital experiences",
    description:
      "Mellasia designs cinematic websites and digital identities for hospitality, beauty, lifestyle and experience-led brands.",
    siteName: "Mellasia",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" className={bodyFont.variable}>
      <head>
        {/* Fontshare — Gambarino (display), Telma (accent), Panchang (UI). */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=gambarino@400&f[]=telma@400&f[]=panchang@300,400,500,600&display=swap"
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
