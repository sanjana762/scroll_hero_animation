/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050816",
        card: "rgba(255,255,255,0.06)",
        soft: "rgba(255,255,255,0.12)"
      },
      letterSpacing: {
        hero: "0.6em"
      },
      boxShadow: {
        glow: "0 20px 60px rgba(0,0,0,0.35)"
      }
    }
  },
  plugins: []
};