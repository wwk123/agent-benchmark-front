"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/navigation/language-switcher";
import clsx from "clsx";
import { Link, usePathname } from "@/navigation";

const NAV_ITEMS = [
  { href: "/", key: "navigation.home" },
  { href: "/benchmarks", key: "navigation.benchmarks" },
  { href: "/leaderboard", key: "navigation.leaderboard" },
];

export function SiteHeader() {
  const t = useTranslations();
  const pathname = usePathname();
  const normalizedPathRaw = pathname.replace(/^\/(zh-CN|en-US)(?=\/|$)/, "");
  const normalizedPath = normalizedPathRaw === "" ? "/" : normalizedPathRaw;
  const [activePath, setActivePath] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setActivePath(normalizedPath);
  }, [normalizedPath]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      toggleButtonRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const renderNavLink = (item: (typeof NAV_ITEMS)[number], context: "desktop" | "mobile" = "desktop") => {
    const currentPath = activePath;
    const isActive =
      currentPath !== null &&
      (currentPath === item.href || (item.href !== "/" && currentPath.startsWith(`${item.href}/`)));

    return (
      <Link
        key={item.key}
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={clsx(
          "rounded-md transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
          context === "desktop"
            ? "px-1.5 py-1 text-sm font-medium"
            : "w-full px-3 py-2 text-base font-medium",
          isActive
            ? "bg-brand-primary/10 text-brand-primary"
            : "text-text-muted hover:text-brand-primary",
        )}
        onClick={() => setIsOpen(false)}
      >
        {t(item.key as Parameters<typeof t>[0])}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
      <div className="layout-container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2 text-lg font-heading font-semibold text-brand-primary">
            <span className="inline-flex size-6 items-center justify-center rounded-lg bg-brand-accent text-xs font-bold text-surface-contrast">
              {t("branding.shortName")}
            </span>
            {t("branding.siteName")}
          </Link>
          <nav className="hidden items-center gap-3 lg:flex">
            {NAV_ITEMS.map((item) => renderNavLink(item))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Button variant="secondary" asChild>
            <Link href="/leaderboard">{t("cta.viewLeaderboard")}</Link>
          </Button>
          <Button variant="tertiary" asChild>
            <Link href="/login">{t("cta.connectWallet")}</Link>
          </Button>
          <Button asChild>
            <Link href="/submit">{t("cta.start")}</Link>
          </Button>
        </div>

        <button
          ref={toggleButtonRef}
          className="inline-flex size-10 items-center justify-center rounded-full border border-border text-brand-primary transition-colors hover:border-brand-primary/60 hover:text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-haspopup="true"
          aria-label={t("navigation.toggle")}
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
            {isOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-surface/70 backdrop-blur-sm transition-opacity lg:hidden"
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        />
      ) : null}

      <div
        id="mobile-nav"
        className={clsx(
          "lg:hidden",
          "border-b border-border bg-surface px-6 pb-6 pt-4 shadow-lg transition-all duration-200",
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
        aria-hidden={!isOpen}
      >
        <nav className="flex flex-col gap-2">
          {NAV_ITEMS.map((item) => renderNavLink(item, "mobile"))}
        </nav>
        <div className="mt-6 flex flex-col gap-3 border-t border-border/60 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-secondary">{t("navigation.language")}</span>
            <LanguageSwitcher />
          </div>
          <Button
            variant="secondary"
            block
            asChild
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            <Link href="/leaderboard" onClick={() => setIsOpen(false)}>
              {t("cta.viewLeaderboard")}
            </Link>
          </Button>
          <Button
            variant="tertiary"
            block
            asChild
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            <Link href="/login" onClick={() => setIsOpen(false)}>
              {t("cta.connectWallet")}
            </Link>
          </Button>
          <Button
            block
            asChild
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            <Link href="/submit" onClick={() => setIsOpen(false)}>
              {t("cta.start")}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
