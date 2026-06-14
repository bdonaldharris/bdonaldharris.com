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
  openGraph: {
    type: "website",
    url: "https://bdonaldharris.com",
    siteName: "B Donald Harris",
    title: "B Donald Harris | Founder, Builder, Technologist & Ecosystem Architect",
    description:
      "B Donald Harris builds at the intersection of AI, software, Black tech ownership, media, and community.",
    images: [
      {
        url: "/images/architectural-noir-signal.png",
        width: 1024,
        height: 1024,
        alt: "Abstract dark editorial network of workflow traces and signal nodes.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "B Donald Harris | Founder, Builder, Technologist & Ecosystem Architect",
    description:
      "Founder of NotableBIT, creator of HindSite, and host of BIT Voices.",
    images: ["/images/architectural-noir-signal.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
