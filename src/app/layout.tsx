import type { Metadata } from "next";
import localFont from "next/font/local";
import { getLocale } from "next-intl/server";
import type { ReactNode } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";

const inter = localFont({
  src: [
    { path: "../../public/fonts/inter/Inter-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/inter/Inter-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/inter/Inter-SemiBold.ttf", weight: "600", style: "normal" },
  ],
  display: "swap",
  variable: "--font-inter",
});

const sora = localFont({
  src: [
    { path: "../../public/fonts/sora/Sora-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/sora/Sora-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/sora/Sora-Bold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-sora",
});

const poppins = localFont({
  src: [
    { path: "../../public/fonts/poppins/Poppins-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/poppins/Poppins-Bold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-poppins",
});

const notoSansSc = localFont({
  src: [
    { path: "../../public/fonts/noto-sans-sc/NotoSansSC-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/noto-sans-sc/NotoSansSC-Bold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-noto-sans-sc",
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
      <body
        className={`${inter.variable} ${sora.variable} ${poppins.variable} ${notoSansSc.variable} bg-surface font-sans text-text-primary antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
