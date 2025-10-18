import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getLocale } from "next-intl/server";
import type { ReactNode } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Agent Benchmark Platform",
  description:
    "Unified Web3 agent benchmarking and execution platform with submission workflow, leaderboard and verifiable proofs.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} bg-surface font-sans text-text-primary antialiased`}>
        {children}
      </body>
    </html>
  );
}
