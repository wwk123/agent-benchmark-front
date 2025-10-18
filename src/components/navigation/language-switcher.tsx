"use client";

import { useCallback, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { localeLabels, locales } from "@/i18n/settings";

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const activeLocale = useLocale();
  const t = useTranslations("navigation");

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const nextLocale = event.target.value;
      startTransition(() => {
        router.replace(pathname, { locale: nextLocale });
      });
    },
    [pathname, router],
  );

  return (
    <label className="inline-flex items-center gap-2 text-sm text-text-muted">
      <span className="sr-only">{t("language")}</span>
      <select
        className="rounded-full border border-border bg-surface-contrast px-4 py-2 text-sm font-medium text-text-primary outline-none transition-all duration-150 ease-out focus-visible:ring-2 focus-visible:ring-brand-accent"
        onChange={handleChange}
        value={activeLocale}
        disabled={isPending}
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeLabels[locale]}
          </option>
        ))}
      </select>
    </label>
  );
}
