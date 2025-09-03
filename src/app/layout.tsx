import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
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
  title: "Tirill og CC's bryllup",
  description: "Tirill og CC's bryllup",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#c4cdbf]">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#c4cdbf]`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
