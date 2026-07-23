# Daniel F. — Personal Portfolio

A fast, single-page developer portfolio built with **Tailwind CSS v3**, semantic **HTML5**, and dependency-free **modern JavaScript**. Dark/light theming, an animated code background, scroll-spy navigation, a filterable projects grid, and a contact form — no framework, no runtime dependencies.

**Live site:** https://dfelka.github.io/personal-page/

---

## Features

- 🎨 **Light/dark theme**  OS-preference following
- 🧭 **Floating sidebar** collapses to a drawer on tablet/mobile
- 💻 **Animated "typing code" background** rendered from the site's own source files
- 🗂️ **Data-driven projects grid** with category filters (edit one file, no build needed)
- ✉️ **Contact section** with a client-validated form that composes a message via the visitor's mail app
- 📦 **Zero runtime dependencies** — Tailwind is the only build-time tool

## Tech stack

| Layer | Choice |
|-------|--------|
| Styling | Tailwind CSS v3.4 (CLI build) + a small `@layer components` for reused patterns |
| Markup | Plain HTML5 |
| Behavior | Vanilla ES6 JavaScript |
| Artwork | Inline SVG blueprint drawings |
| Hosting/CI | GitHub Pages via GitHub Actions |

## Project structure

```
personal-page/
├─ index.html                 # the single page
├─ tailwind.config.js         # design tokens (theme.extend)
├─ package.json               # Tailwind build scripts
├─ src/
│  └─ input.css               # Tailwind entry: @tailwind directives + @layer base/components
├─ assets/
│  ├─ css/style.css           # compiled output (linked by index.html)
│  ├─ js/
│  │  ├─ main.js              # all behavior
│  │  └─ projects.js          # project data (edit this to manage the grid)
│  ├─ fonts/                  # self-hosted Inter (woff2)
│  └─ img/projects/           
└─ .github/workflows/deploy.yml
```

## Getting started

**Prerequisites:** [Node.js](https://nodejs.org/) 18+ (for the Tailwind build).

```bash
npm install          # install Tailwind
npm run dev          # watch src/input.css → assets/css/style.css
```

Then open `index.html` (any static server works, e.g. `npx serve`).

### Build for production

```bash
npm run build        # one-off compile
npm run build:min    # minified output
```

## Customization

- **Projects** — edit [`assets/js/projects.js`](assets/js/projects.js): add/remove entries and filter categories. No rebuild required (it's data, not styles).
- **Theme colors / tokens** — brand and surface colors are CSS variables in [`src/input.css`](src/input.css) (`--c-accent`, `--c-page`, …); Tailwind maps them in [`tailwind.config.js`](tailwind.config.js). Change a value, run `npm run build`.
- **Favicon** — an inline SVG "D" in the `<head>` of [`index.html`](index.html); swap the letter/color there.
- **Content** — text, links, and the contact email live in `index.html`.

> After changing anything under `src/` or adding new utility classes in the HTML/JS, run `npm run build` so `assets/css/style.css` stays in sync.

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds Tailwind and publishes to GitHub Pages.

One-time setup: **Settings → Pages → Build and deployment → Source → "GitHub Actions."**


## License

Released under the **[MIT License](LICENSE)** — free to use, modify, and distribute, provided the copyright notice (credit to Daniel F.) is retained.