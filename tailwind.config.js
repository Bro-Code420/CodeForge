/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-tertiary-fixed": "#01210c",
        "on-secondary": "#ffffff",
        "outline": "#161616",
        "background": "#F6F1E8",
        "surface": "#F6F1E8",
        "primary": "#161616",
        "secondary": "#333333",
        "surface-container": "#f2ede4",
        "burgundy": "#5E2A2A"
      },
      borderRadius: {
        "DEFAULT": "0px",
        "lg": "0px",
        "xl": "0px",
        "full": "9999px"
      },
      fontFamily: {
        "masthead": ["Playfair Display", "serif"],
        "headline": ["Playfair Display", "serif"],
        "body": ["Libre Baskerville", "serif"],
        "serif-alt": ["Cormorant Garamond", "serif"],
        "mono": ["IBM Plex Mono", "monospace"],
        "label-caps": ["IBM Plex Mono", "monospace"]
      }
    },
  },
  plugins: [],
}
