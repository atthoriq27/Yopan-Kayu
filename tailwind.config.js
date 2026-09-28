/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6f3c16",
          dark: "#5a2f10",
          light: "#8c532b",
          container: "#85532b",
          fixed: "#ffdbc7",
          "fixed-dim": "#fbb888",
        },
        secondary: {
          DEFAULT: "#006c47",
          emerald: "#0e8358",
          container: "#92f7c2",
          light: "#e7f5ee",
        },
        tertiary: {
          DEFAULT: "#a36829",
          dark: "#6b3c00",
          light: "#fef6e9",
        },
        surface: {
          DEFAULT: "#faf7f2",
          canvas: "#faf7f2",
          card: "#ffffff",
          muted: "#f4ede3",
          dark: "#1c1c19",
          container: "#f0ede9",
          "container-high": "#ebe8e3",
          "container-low": "#f6f3ee",
          "container-lowest": "#ffffff",
        },
        border: {
          DEFAULT: "#ede5d8",
          sand: "#e7e1d7",
          subtle: "#f0eae0",
        },
        wood: {
          charcoal: "#1c1c19",
          slate: "#52443b",
          subtle: "#85746a",
        }
      },
      fontFamily: {
        serif: ["'Playfair Display'", "'Merriweather'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(111, 60, 22, 0.05)',
        'warm-md': '0 4px 20px rgba(111, 60, 22, 0.08)',
        'warm-lg': '0 12px 32px rgba(111, 60, 22, 0.12)',
        'green-sm': '0 2px 8px rgba(0, 108, 71, 0.15)',
      }
    },
  },
  plugins: [],
}
