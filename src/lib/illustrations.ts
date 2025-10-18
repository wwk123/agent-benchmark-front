export const ILLUSTRATIONS = {
  benchmarkHero: "/illustrations/benchmark-hero.svg",
  submissionFlow: "/illustrations/submission-flow.svg",
  dashboardAura: "/illustrations/dashboard-aura.svg",
  loginBackdrop: "/illustrations/login-backdrop.svg",
};

export type IllustrationKey = keyof typeof ILLUSTRATIONS;

export function getIllustration(key: IllustrationKey) {
  return ILLUSTRATIONS[key];
}
