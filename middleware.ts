import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "./src/i18n/settings";

export default createMiddleware({
  defaultLocale,
  locales,
  localeDetection: true,
  localePrefix: "always",
});

export const config = {
  matcher: ["/", "/(zh-CN|en-US)/:path*"],
};
