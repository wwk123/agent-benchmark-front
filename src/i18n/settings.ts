export const locales = ["zh-CN", "en-US"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "zh-CN";

export const localeLabels: Record<Locale, string> = {
  "zh-CN": "中文（简体）",
  "en-US": "English",
};
