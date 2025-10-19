"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/navigation/language-switcher";
import clsx from "clsx";
import { Link } from "@/navigation";

const NAV_ITEMS = [
  { href: "/", key: "navigation.home" },
  { href: "/workflow", key: "navigation.workflow" },
  { href: "/benchmarks", key: "navigation.benchmarks" },
  { href: "/leaderboard", key: "navigation.leaderboard" },
  { href: "/submit", key: "navigation.submit" },
  { href: "/dashboard", key: "navigation.dashboard" },
];

export function SiteHeader() {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
      <div className="layout-container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-brand-primary">
            <span className="inline-flex size-6 items-center justify-center rounded-lg bg-brand-accent text-xs font-bold text-surface-contrast">
              {t("branding.shortName")}
            </span>
            {t("branding.siteName")}
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-text-muted lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link key={item.key} href={item.href} className="transition-colors duration-150 hover:text-brand-primary">
                {t(item.key as Parameters<typeof t>[0])}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Button variant="secondary" asChild>
            <Link href="/leaderboard">{t("cta.viewLeaderboard")}</Link>
          </Button>
          <Button asChild>
            <Link href="/submit">{t("cta.start")}</Link>
          </Button>
        </div>

        <button
          className="inline-flex size-10 items-center justify-center rounded-full border border-border text-brand-primary lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          <span className="sr-only">{t("navigation.toggle")}</span>
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={clsx(
          "border-b border-border bg-surface px-6 pb-6 pt-4 lg:hidden",
          isOpen ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col gap-4 text-base text-text-muted">
          {NAV_ITEMS.map((item) => (
            <Link key={item.key} href={item.href} onClick={() => setIsOpen(false)}>
              {t(item.key as Parameters<typeof t>[0])}
            </Link>
          ))}
        </nav>
        <div className="mt-6 flex flex-col gap-3">
          <LanguageSwitcher />
          <Button variant="secondary" block asChild>
            <Link href="/leaderboard" onClick={() => setIsOpen(false)}>
              {t("cta.viewLeaderboard")}
            </Link>
          </Button>
          <Button block asChild>
            <Link href="/submit" onClick={() => setIsOpen(false)}>
              {t("cta.start")}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
