import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SID - Semantic Interaction Description",
    template: "%s | SID",
  },
  description:
    "Official documentation for the SID (Semantic Interaction Description) standard - an accessibility standard for AI agents, enabling effective interactions with web applications.",
  metadataBase: new URL("https://sid-standard.org"),
  keywords: [
    "SID",
    "Semantic Interaction Description",
    "AI agents",
    "web accessibility",
    "browser automation",
    "web standard",
    "JavaScript API",
  ],
  authors: [{ name: "SID Standard" }],
  creator: "SID Standard",
  openGraph: {
    title: "SID - Semantic Interaction Description",
    description:
      "Official documentation for the SID standard - an accessibility standard for AI agents.",
    url: "https://sid-standard.org",
    siteName: "SID Standard",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SID - Semantic Interaction Description",
    description:
      "A standard that enables AI agents to understand and interact with web applications reliably and efficiently.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sid-standard.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
