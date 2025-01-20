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
  title: "Message Your MP About Wealth Inequality | UK Parliament Contact Tool",
  description: "Easy-to-use tool helping UK citizens contact their Members of Parliament about wealth inequality. Find your MP by postcode and send a personalized email.",
  keywords: "message mp, contact mp, wealth inequality uk, mp email tool, parliament contact",
  openGraph: {
    title: "Message Your MP About Wealth Inequality",
    description: "Easy-to-use tool helping UK citizens contact their Members of Parliament about wealth inequality.",
    type: "website",
    url: "https://messageyourmp.com/", // Replace with your actual domain
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
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
