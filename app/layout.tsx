import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  metadataBase: new URL("https://bdonaldharris.com"),
  title: {
    default: "B Donald Harris | Founder, Builder, Technologist & Ecosystem Architect",
    template: "%s | B Donald Harris",
  },
  description:
    "B Donald Harris is the founder of NotableBIT, creator of HindSite, and host of BIT Voices. He builds at the intersection of AI, software, Black tech ownership, media, and community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
