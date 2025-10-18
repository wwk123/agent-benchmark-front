import { useMemo } from "react";

/**
 * 设计 token 统一出口，便于在业务组件中与 Tailwind 配置保持一致。
 * 当主题值在 Tailwind 中更新时，只需同步维护此常量即可。
 */
export const themeTokens = {
  colors: {
    brandPrimary: "#0B1E3C",
    brandPrimaryMuted: "#152649",
    brandAccent: "#1FB6FF",
    brandAccentStrong: "#0EA5E9",
    brandHighlight: "#F9B500",
    surface: {
      base: "#F8FAFC",
      muted: "#F1F5F9",
      contrast: "#FFFFFF",
      inverted: "#0F172A",
    },
    text: {
      primary: "#0F172A",
      secondary: "#334155",
      muted: "#64748B",
      inverted: "#E2E8F0",
    },
    status: {
      success: "#10B981",
      warning: "#F59E0B",
      danger: "#EF4444",
      info: "#0EA5E9",
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
    card: "0 12px 24px rgba(15, 23, 42, 0.08)",
    cardStrong: "0 18px 32px rgba(15, 23, 42, 0.12)",
  },
  transition: {
    quick: "all 150ms ease-out",
  },
} as const;

export type ThemeTokens = typeof themeTokens;

export function useThemeTokens(): ThemeTokens {
  return useMemo(() => themeTokens, []);
}
