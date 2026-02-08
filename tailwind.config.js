const { basename } = require('node:path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,html}"],
  theme: {
    extend: {
      colors: {
        skin: {
          base: "var(--bg-primary)",
          card: "var(--bg-secondary)",
          text: "var(--text-primary)",
          accent: "var(--accent)",
        },
      },
    },
  },
  darkMode: "media",
  prefix: "plasmo-",
  plugins: [],
}