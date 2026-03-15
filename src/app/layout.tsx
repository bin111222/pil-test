import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAllCollectionsForNav } from "@/lib/shopify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "PIL India | Trusted Healthcare for Every Home",
  description:
    "Science-backed medicines, personal care, pet wellness, and pain relief from a pharma company with 38+ years of trust. Your partner in trusted care.",
  keywords: ["PIL India", "healthcare", "pharma", "medicines", "personal care", "pet care", "pain relief"],
  openGraph: {
    title: "PIL India | Trusted Healthcare for Every Home",
    description: "38+ years of pharmaceutical excellence. Science-backed wellness for your whole family.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const collections = await getAllCollectionsForNav();

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${playfairDisplay.variable} antialiased`}
      >
        <Header collections={collections} />
        {children}
        <Footer collections={collections} />
      </body>
    </html>
  );
}
