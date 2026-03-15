import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${playfairDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
