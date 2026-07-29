/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#07090e",
          card: "#0f172a",
          border: "#1e293b",
          cyan: "#00f0ff",
          emerald: "#10b981",
          purple: "#a855f7",
          amber: "#f59e0b",
          red: "#ef4444",
          text: "#f8fafc",
          muted: "#94a3b8",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      boxShadow: {
        "neon-cyan": "0 0 15px rgba(0, 240, 255, 0.4)",
        "neon-emerald": "0 0 15px rgba(16, 185, 129, 0.4)",
        "neon-purple": "0 0 15px rgba(168, 85, 247, 0.4)",
      },
    },
  },
  plugins: [],
};
