import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales, type Locale } from "./settings";

type SupportedLocale = Locale | (string & {});

async function loadMessages(locale: Locale) {
  try {
    return (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`[i18n] 未找到 ${locale} 的消息文件`, error);
    return (await import(`../messages/${defaultLocale}.json`)).default;
  }
}

export default getRequestConfig(async ({ locale }) => {
  const normalizedLocale = (locales.includes(locale as SupportedLocale)
    ? (locale as Locale)
    : defaultLocale) satisfies Locale;

  return {
    locale: normalizedLocale,
    messages: await loadMessages(normalizedLocale),
  };
});
