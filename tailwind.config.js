/** @type {import('tailwindcss').Config} */
const withVar = (v) => `rgb(var(${v}) / <alpha-value>)`;

module.exports = {
  content: ["./index.html", "./assets/js/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      // All colors are CSS variables defined in src/input.css.
      colors: {
        // Brand palette — constant across themes
        accent: {
          DEFAULT: withVar("--c-accent"),
          dark: withVar("--c-accent-dark"),
        },
        night: withVar("--c-night"),      // dark text on accent
        // Surface tokens — flip between light/dark
        page: withVar("--c-page"),        // page background
        surface: withVar("--c-surface"),  // cards / elevated surfaces
        alt: withVar("--c-alt"),          // alt section background
        ink: withVar("--c-ink"),          // headings
        body: withVar("--c-body"),        // body text
        muted: withVar("--c-muted"),      // secondary text
        line: withVar("--c-line"),        // borders
      },
      fontFamily: {
        sans: [
          "Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto",
          "Helvetica", "Arial", "sans-serif",
        ],
      },
      maxWidth: {
        site: "1140px",
      },
      boxShadow: {
        soft: "0 18px 40px -20px rgb(20 22 30 / 0.28)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        bounce2: {
          "0%, 100%": { transform: "translate(-50%, 0)" },
          "50%": { transform: "translate(-50%, 10px)" },
        },
      },
      animation: {
        bounce2: "bounce2 1.8s infinite",
      },
    },
  },
  plugins: [],
};
