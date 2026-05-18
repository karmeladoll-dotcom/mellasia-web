import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mellasia — Creative Agency",
  description:
    "AI-powered restaurant marketing, cinematic storytelling, and digital experiences — from Zagreb to the world.",
  keywords: "creative agency, AI marketing, restaurant marketing, brand identity, video production, Zagreb",
  openGraph: {
    title: "Mellasia — Creative Agency",
    description:
      "AI-powered restaurant marketing, cinematic storytelling, and digital experiences — from Zagreb to the world.",
    url: "https://mellasia.com",
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
