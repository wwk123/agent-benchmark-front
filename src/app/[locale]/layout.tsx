import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { locales, type Locale } from "@/i18n/settings";
import { AppProviders } from "@/providers/app-providers";

type LocaleParams = { locale: string };

type LocaleLayoutProps = {
  children: ReactNode;
  params: LocaleParams;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: Object.fromEntries(locales.map((code) => [code, `/${code}`])),
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AppProviders>
        <SiteHeader />
        <main>{children}</main>
      </AppProviders>
    </NextIntlClientProvider>
  );
}
