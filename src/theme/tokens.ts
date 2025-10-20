import { useMemo } from "react";

/**
 * 设计 token 统一出口，便于在业务组件中与 Tailwind 配置保持一致。
 * 当主题值在 Tailwind 中更新时，只需同步维护此常量即可。
 */
export const themeTokens = {
  colors: {
    brandPrimary: "#7C3AED",
    brandPrimaryMuted: "#6D28D9",
    brandAccent: "#22D3EE",
    brandAccentStrong: "#67E8F9",
    brandHighlight: "#22E58E",
    brandFlare: "#E879F9",
    surface: {
      base: "#0B1030",
      muted: "#1B124C",
      elevated: "#221A55",
      contrast: "#F4F7FF",
      inverted: "#F8FAFC",
    },
    text: {
      primary: "#E5E7EB",
      secondary: "#C7CED6",
      muted: "#9CA8B9",
      inverted: "#0B1030",
    },
    status: {
      success: "#16A34A",
      warning: "#F59E0B",
      danger: "#EF4444",
      info: "#22D3EE",
    },
  },
  layout: {
    containerMaxWidth: 1440,
    desktopGridGutter: 24,
  },
  spacing: {
    baseUnit: 4,
    stack: [4, 8, 12, 16, 24, 32, 48],
  },
  radii: {
    card: "0.5rem",
    pill: "9999px",
  },
  shadows: {
    card: "0 18px 36px rgba(8, 7, 35, 0.45)",
    cardStrong: "0 24px 48px rgba(8, 7, 35, 0.65)",
  },
  transition: {
    quick: "all 150ms ease-out",
  },
} as const;

export type ThemeTokens = typeof themeTokens;

export function useThemeTokens(): ThemeTokens {
  return useMemo(() => themeTokens, []);
}
