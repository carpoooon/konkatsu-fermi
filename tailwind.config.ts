import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-base)",
        surface: "var(--bg-surface)",
        inverse: "var(--bg-inverse)",
        foreground: "var(--text-primary)",
        "foreground-secondary": "var(--text-secondary)",
        "foreground-muted": "var(--text-muted)",
        "text-inverse": "var(--text-inverse)",
        "accent-navy": "var(--accent-navy)",
        border: "var(--border-default)",
        "border-strong": "var(--border-strong)",
        ring: "var(--border-focus)",
        "gray-900": "var(--gray-900)",
        "gray-700": "var(--gray-700)",
        "gray-600": "var(--gray-600)",
        "gray-400": "var(--gray-400)",
        "gray-200": "var(--gray-200)",
        "gray-100": "var(--gray-100)",
        "gray-50": "var(--gray-50)",
        "status-abundant-bg": "var(--status-abundant-bg)",
        "status-abundant-text": "var(--status-abundant-text)",
        "status-plenty-bg": "var(--status-plenty-bg)",
        "status-plenty-text": "var(--status-plenty-text)",
        "status-narrowed-bg": "var(--status-narrowed-bg)",
        "status-narrowed-text": "var(--status-narrowed-text)",
        "status-rare-bg": "var(--status-rare-bg)",
        "status-rare-text": "var(--status-rare-text)",
        "status-very-rare-bg": "var(--status-very-rare-bg)",
        "status-very-rare-text": "var(--status-very-rare-text)",
        "status-ultra-rare-bg": "var(--status-ultra-rare-bg)",
        "status-ultra-rare-text": "var(--status-ultra-rare-text)",
        "status-legendary-bg": "var(--status-legendary-bg)",
        "status-legendary-text": "var(--status-legendary-text)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        card: "0 1px 3px rgba(8,19,26,0.06)",
        dropdown: "0 4px 12px rgba(8,19,26,0.08)",
        modal: "0 12px 32px rgba(8,19,26,0.12)",
      },
      fontFamily: {
        sans: ["var(--font-family-sans)"],
        number: ["var(--font-family-number)"],
      },
    },
  },
  plugins: [],
};

export default config;
