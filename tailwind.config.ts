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
          primary: "#A78BFA",
          "primary-muted": "#6D28D9",
          accent: "#22D3EE",
          "accent-strong": "#67E8F9",
          highlight: "#22E58E",
          flare: "#E879F9",
          "gradient-start": "#3B1470",
          "gradient-mid": "#1B124C",
          "gradient-end": "#0B1030",
          glow: "rgba(34, 211, 238, 0.35)",
        },
        surface: {
          DEFAULT: "#0F0F1C",
          muted: "#1A1425",
          elevated: "#251E30",
          contrast: "#F4F7FF",
          inverted: "#F8FAFC",
          glass: "rgba(59, 20, 112, 0.45)",
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
        border: {
          DEFAULT: "rgba(148, 163, 209, 0.24)",
          strong: "rgba(124, 58, 237, 0.45)",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "var(--font-noto-sans-sc)",
          "Inter",
          "\"Source Han Sans SC\"",
          "\"Noto Sans SC\"",
          "system-ui",
          "sans-serif",
        ],
        heading: [
          "var(--font-sora)",
          "var(--font-poppins)",
          "var(--font-noto-sans-sc)",
          "\"Noto Sans SC\"",
          "\"Source Han Sans SC\"",
          "Inter",
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
        card: "0 18px 36px rgba(8, 7, 35, 0.45)",
        "card-strong": "0 24px 48px rgba(8, 7, 35, 0.65)",
        "brand-glow": "0 0 60px rgba(34, 211, 238, 0.35)",
        "cta-focus": "0 32px 64px rgba(59, 20, 112, 0.45)",
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
        "card-gradient": "linear-gradient(210deg, rgba(59, 20, 112, 0.82) 0%, rgba(11, 16, 48, 0.78) 100%)",
        "grid-overlay": "radial-gradient(circle at 1px 1px, rgba(34, 211, 238, 0.18) 1px, transparent 0)",
      },
      keyframes: {
        glow: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(34, 211, 238, 0)" },
          "50%": { boxShadow: "0 0 35px rgba(34, 211, 238, 0.45)" },
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
