import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { PROFILE } from "@/lib/knowledge";
import { CursorGlow } from "@/components/CursorGlow";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://muhammedsalim.dev"),
  title: `${PROFILE.name} | ${PROFILE.title} — Production AI`,
  description: PROFILE.subtitle,
  openGraph: {
    title: `${PROFILE.name} | ${PROFILE.title}`,
    description: PROFILE.subtitle,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PROFILE.name} | ${PROFILE.title}`,
    description: PROFILE.subtitle,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={`${GeistSans.className} grid-bg min-h-screen antialiased`}>
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
