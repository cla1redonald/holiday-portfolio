import type { Metadata } from "next";
import { DM_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roami — Your World, Better Explored",
  description:
    "Roami learns how you travel, finds city break deals you'd love, and tells you if the price is right. No filters, no dropdowns — just say what you want.",
  openGraph: {
    title: "Roami — Your World, Better Explored",
    description:
      "Roami learns how you travel, finds city break deals you'd love, and tells you if the price is right. No filters, no dropdowns — just say what you want.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roami — Your World, Better Explored",
    description:
      "Roami learns how you travel, finds city break deals you'd love, and tells you if the price is right. No filters, no dropdowns — just say what you want.",
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
        className={`${dmSans.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
