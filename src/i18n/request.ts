import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales, type Locale } from "./settings";

function isLocale(value: string): value is Locale {
  return locales.some((supportedLocale) => supportedLocale === value);
}

async function loadMessages(locale: Locale) {
  try {
    return (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`[i18n] 未找到 ${locale} 语言文件`, error);
    return (await import(`../messages/${defaultLocale}.json`)).default;
  }
}

export default getRequestConfig(async ({ locale }) => {
    const candidate = typeof locale === "string" ? locale : defaultLocale;
  const normalizedLocale = isLocale(candidate) ? candidate : defaultLocale;

  return {
    locale: normalizedLocale,
    messages: await loadMessages(normalizedLocale),
  };
});

