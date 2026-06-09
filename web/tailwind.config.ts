import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        panel: "#0a0a0b",
        "panel-2": "#18181b",
        line: "rgba(255, 255, 255, 0.06)",
        accent: {
          DEFAULT: "#5ee9b5",
          dim: "#009966",
          soft: "rgba(0, 186, 118, 0.10)",
        },
        ink: {
          DEFAULT: "#e4e4e7",
          muted: "#a1a1aa",
          faint: "#71717a",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        blink: "blink 1s steps(1) infinite",
        "fade-up": "fade-up 0.6s ease-out both",
        "pulse-dot": "pulse-dot 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
