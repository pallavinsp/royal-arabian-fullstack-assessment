import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://royalarabian.com"),
  title: { default: "Royal Arabian | Your Fellow Traveller", template: "%s | Royal Arabian" },
  description: "Extraordinary tailor-made journeys, created by Royal Arabian travel specialists.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${inter.variable} ${playfair.variable}`}>{children}</body></html>; }
