import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        brand: {
          primary: "#0B1E3C",
          "primary-muted": "#152649",
          accent: "#1FB6FF",
          "accent-strong": "#0EA5E9",
          highlight: "#F9B500",
          "gradient-start": "#0B1E3C",
          "gradient-mid": "#103063",
          "gradient-end": "#1FB6FF",
          glow: "rgba(31, 182, 255, 0.35)",
        },
        surface: {
          DEFAULT: "#F8FAFC",
          muted: "#F1F5F9",
          contrast: "#FFFFFF",
          inverted: "#0F172A",
          glass: "rgba(15, 23, 42, 0.65)",
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
        border: {
          DEFAULT: "#E2E8F0",
          strong: "#CBD5F5",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "\"Source Han Sans SC\"",
          "\"Noto Sans SC\"",
          "system-ui",
          "sans-serif",
        ],
      },
      spacing: {
        13: "3.25rem",
        15: "3.75rem",
        18: "4.5rem",
      },
      boxShadow: {
        card: "0 12px 24px rgba(15, 23, 42, 0.08)",
        "card-strong": "0 18px 32px rgba(15, 23, 42, 0.12)",
        "brand-glow": "0 0 32px rgba(31, 182, 255, 0.35)",
        "cta-focus": "0 24px 48px rgba(11, 30, 60, 0.28)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      transitionTimingFunction: {
        "in-out-quart": "cubic-bezier(0.645, 0.045, 0.355, 1)",
      },
      gridTemplateColumns: {
        4: "repeat(4, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))",
        24: "repeat(24, minmax(0, 1fr))",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, var(--tw-gradient-stops))",
        "card-gradient": "linear-gradient(195deg, rgba(11, 30, 60, 0.92) 0%, rgba(11, 30, 60, 0.65) 100%)",
        "grid-overlay": "radial-gradient(circle at 1px 1px, rgba(31, 182, 255, 0.15) 1px, transparent 0)",
      },
      keyframes: {
        glow: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(31, 182, 255, 0)" },
          "50%": { boxShadow: "0 0 35px rgba(31, 182, 255, 0.45)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        glow: "glow 3s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
