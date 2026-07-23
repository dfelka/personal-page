/** @type {import('tailwindcss').Config} */
const withVar = (v) => `rgb(var(${v}) / <alpha-value>)`;

module.exports = {
  content: ["./index.html", "./assets/js/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Accent stays constant across themes (light tan)
        accent: {
          DEFAULT: "#e3d09c",
          dark: "#d4bd7e",
        },
        // Fixed dark ink — for text ON the accent, and the footer.
        // Does NOT flip with the theme.
        night: "#16171b",
        // Theme-aware tokens, driven by CSS variables (see src/input.css).
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
        display: [
          "Poppins", "system-ui", "-apple-system", "Segoe UI", "sans-serif",
        ],
      },
      maxWidth: {
        site: "1140px",
      },
      boxShadow: {
        soft: "0 18px 40px -20px rgba(20, 22, 30, 0.28)",
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
