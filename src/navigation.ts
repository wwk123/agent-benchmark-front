import { createNavigation } from "next-intl/navigation";
import { defaultLocale, locales } from "./i18n/settings";

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  defaultLocale,
  localePrefix: "always",
});
