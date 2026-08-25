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
  metadataBase: new URL("https://www.mellasia.com"),
  title: {
    default: "Mellasia | Web Design Studio Zagreb",
    template: "%s | Mellasia",
  },
  description:
    "Mellasia designs cinematic websites and digital identities for hospitality, beauty, lifestyle and experience-led brands. Independent studio, Zagreb / Worldwide.",
  applicationName: "Mellasia",
  authors: [{ name: "Karmela Sen", url: "https://www.mellasia.com" }],
  creator: "Karmela Sen",
  publisher: "Mellasia",
  category: "Web design studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Mellasia | Web Design Studio Zagreb",
    description:
      "Mellasia designs cinematic websites and digital identities for hospitality, beauty, lifestyle and experience-led brands.",
    url: "https://www.mellasia.com",
    siteName: "Mellasia",
    locale: "hr_HR",
    type: "website",
    images: [
      {
        url: "/forno/forno-still.jpg",
        width: 1600,
        height: 900,
        alt: "Mellasia cinematic web design for an experience-led hospitality brand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mellasia | Web Design Studio Zagreb",
    description:
      "Cinematic websites and digital identities for hospitality, beauty and experience-led brands.",
    images: ["/forno/forno-still.jpg"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.mellasia.com/#organization",
  name: "Mellasia",
  url: "https://www.mellasia.com",
  email: "hello@mellasia.com",
  founder: {
    "@type": "Person",
    name: "Karmela Sen",
  },
  foundingDate: "2026",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Zagreb",
    addressCountry: "HR",
  },
  areaServed: ["Croatia", "Europe", "Worldwide"],
  sameAs: [
    "https://www.instagram.com/mellasia/",
    "https://www.linkedin.com/in/karmela-sen-22244683/",
    "https://www.youtube.com/@Mellasia",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" className={bodyFont.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
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
