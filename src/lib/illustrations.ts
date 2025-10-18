export const ILLUSTRATIONS = {
  benchmarkHero: {
    light: "/illustrations/benchmark-hero.light.svg",
    dark: "/illustrations/benchmark-hero.dark.svg",
  },
  submissionFlow: {
    light: "/illustrations/submission-flow.light.svg",
    dark: "/illustrations/submission-flow.dark.svg",
  },
  dashboardAura: {
    light: "/illustrations/dashboard-aura.light.svg",
    dark: "/illustrations/dashboard-aura.dark.svg",
  },
  loginBackdrop: {
    light: "/illustrations/login-backdrop.light.svg",
    dark: "/illustrations/login-backdrop.dark.svg",
  },
  sparkles: {
    lottie: "/illustrations/sparkles.lottie.json",
  },
} as const;

export type IllustrationKey = keyof typeof ILLUSTRATIONS;

export function getIllustration(key: IllustrationKey, theme: "light" | "dark" = "light") {
  const asset = ILLUSTRATIONS[key];
  if ("light" in asset && "dark" in asset) {
    return asset[theme];
  }
  return "lottie" in asset ? asset.lottie : undefined;
}
