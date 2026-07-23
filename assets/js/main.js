/* ============================================================
   SnapFolio-style portfolio — vanilla JS (no dependencies)
   ============================================================ */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ---------- Footer year ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Dark mode toggle ---------- */
  // Initial theme is applied by an inline <head> script (no flash).
  const root = document.documentElement;
  const themeToggle = $("#themeToggle");
  const syncSwitch = () => {
    if (themeToggle) themeToggle.setAttribute("aria-checked", String(root.classList.contains("dark")));
  };
  syncSwitch();
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const dark = root.classList.toggle("dark");
      localStorage.setItem("theme", dark ? "dark" : "light");
      syncSwitch();
    });
  }
  // Follow OS changes only while the user hasn't chosen explicitly.
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      root.classList.toggle("dark", e.matches);
      syncSwitch();
    }
  });

  /* ---------- Typing-code background (3 columns of source) ---------- */
  const codeBg = $("#codeBg");
  if (codeBg) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const N = 44; // number of trailing chars tinted with the accent

    // Fallbacks used when the files can't be fetched (e.g. opened via file://).
    const FB_HTML =
      '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n' +
      '  <title>Daniel F. — Portfolio</title>\n  <link rel="stylesheet" href="assets/css/style.css" />\n' +
      "</head>\n<body>\n  <aside id=\"sidebar\" class=\"sidebar\">\n    <nav id=\"nav\">\n" +
      '      <a href="#hero" class="side-link active">Home</a>\n      <a href="#about" class="side-link">About</a>\n' +
      '      <a href="#projects" class="side-link">Projects</a>\n    </nav>\n  </aside>\n\n' +
      '  <section id="hero" class="relative flex min-h-screen">\n    <div class="panel">\n' +
      '      <h1 class="text-ink">Daniel F.</h1>\n      <p class="text-accent">Software Developer</p>\n' +
      '    </div>\n    <a href="#projects" class="btn btn-primary">View My Work</a>\n  </section>\n</body>\n</html>\n';
    const FB_CSS =
      ":root {\n  --c-accent: 240 60 60;\n  --c-page: 255 255 255;\n  --c-ink: 22 23 27;\n}\n" +
      ".dark {\n  --c-page: 22 23 27;\n  --c-ink: 243 244 246;\n}\n\n" +
      ".btn-primary {\n  background-color: rgb(var(--c-accent));\n  color: rgb(255 255 255);\n  border-radius: 0.75rem;\n}\n\n" +
      ".panel {\n  border: 1px solid rgb(var(--c-line));\n  background-color: rgb(var(--c-alt));\n}\n\n" +
      ".card:hover .card-img {\n  transform: scale(1.08);\n}\n";
    const FB_JS =
      '(function () {\n  "use strict";\n  const $ = (sel, ctx = document) => ctx.querySelector(sel);\n' +
      "  const root = document.documentElement;\n\n" +
      '  const themeToggle = $("#themeToggle");\n  themeToggle.addEventListener("click", () => {\n' +
      '    const dark = root.classList.toggle("dark");\n    localStorage.setItem("theme", dark ? "dark" : "light");\n  });\n\n' +
      "  const spy = new IntersectionObserver((entries) => {\n    entries.forEach((e) => {\n" +
      '      if (e.isIntersecting) e.target.classList.add("in");\n    });\n  });\n})();\n';

    // Distinct start offsets, distinct speeds (each ~40%+ apart), staggered start.
    const cols = [
      { url: "index.html", fb: FB_HTML, start: 0.05, speed: 22, delay: 0 },
      { url: "assets/css/style.css", fb: FB_CSS, start: 0.40, speed: 32, delay: 550 },
      { url: "assets/js/main.js", fb: FB_JS, start: 0.72, speed: 46, delay: 1100 },
    ];

    // Colors (base = gray/toned-white via CSS var, tail fades to accent)
    const parseRGB = (v) => v.trim().split(/[\s,/]+/).map(Number).filter((n) => !isNaN(n));
    let baseRGB = [88, 94, 104], accentRGB = [240, 60, 60];
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      const b = parseRGB(cs.getPropertyValue("--code-base"));
      const a = parseRGB(cs.getPropertyValue("--c-accent"));
      if (b.length >= 3) baseRGB = b;
      if (a.length >= 3) accentRGB = a;
    };
    readColors();
    if (themeToggle) themeToggle.addEventListener("click", () => setTimeout(readColors, 0));
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => setTimeout(readColors, 0));

    const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const mix = (t) => {
      const c = (i) => Math.round(baseRGB[i] + (accentRGB[i] - baseRGB[i]) * t);
      return "rgb(" + c(0) + " " + c(1) + " " + c(2) + ")";
    };

    const startColumn = (text, cfg) => {
      const col = document.createElement("div");
      col.className = "code-col";
      const pre = document.createElement("pre");
      const committed = document.createElement("span");
      const tail = document.createElement("span");
      pre.append(committed, tail);
      col.append(pre);
      codeBg.append(col);

      if (reduceMotion) {
        committed.textContent = text.slice(0, 1400);
        return;
      }

      let pos = Math.floor(text.length * cfg.start);
      let typed = "";
      const renderTail = () => {
        const t = typed.slice(-N);
        let html = "";
        for (let i = 0; i < t.length; i++) {
          html += '<span style="color:' + mix((i + 1) / t.length) + '">' + esc(t[i]) + "</span>";
        }
        tail.innerHTML = html + '<span style="color:' + mix(1) + '">▋</span>';
      };
      const step = () => {
        const ch = text[pos % text.length];
        pos++;
        typed += ch;
        committed.textContent = typed.slice(0, -N);
        renderTail();
        // Reset the column once it overflows (checked only on line breaks).
        if (ch === "\n" && pre.scrollHeight > col.clientHeight + 24) {
          typed = "";
          committed.textContent = "";
        }
        setTimeout(step, cfg.speed + Math.random() * cfg.speed * 0.5);
      };
      setTimeout(step, cfg.delay || 0);
    };

    const load = (c) =>
      fetch(c.url).then((r) => (r.ok ? r.text() : Promise.reject())).catch(() => c.fb);
    Promise.all(cols.map(load)).then((texts) => {
      cols.forEach((c, i) => startColumn(texts[i] || c.fb, c));
    });
  }

  /* ---------- Back-to-top ---------- */
  const toTop = $("#toTop");
  if (toTop) {
    const onScroll = () => {
      toTop.classList.toggle("show", window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Sidebar drawer (tablet / mobile) ---------- */
  const sidebarToggle = $("#sidebarToggle");
  const backdrop = $("#sidebarBackdrop");
  const openSidebar = () => {
    document.body.classList.add("sidebar-open");
    backdrop.hidden = false;
    // next frame so the opacity transition runs
    requestAnimationFrame(() => (backdrop.style.opacity = "1"));
    sidebarToggle.setAttribute("aria-expanded", "true");
  };
  const closeSidebar = () => {
    document.body.classList.remove("sidebar-open");
    backdrop.style.opacity = "0";
    sidebarToggle.setAttribute("aria-expanded", "false");
    setTimeout(() => (backdrop.hidden = true), 300);
  };
  if (sidebarToggle)
    sidebarToggle.addEventListener("click", () =>
      document.body.classList.contains("sidebar-open") ? closeSidebar() : openSidebar()
    );
  if (backdrop) backdrop.addEventListener("click", closeSidebar);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("sidebar-open")) closeSidebar();
  });

  /* ---------- Active nav on scroll (scroll-spy) ---------- */
  const sections = $$("main section, #hero");
  const navLinks = $$(".side-link");
  // Close the drawer when a nav item is tapped (mobile only).
  navLinks.forEach((l) =>
    l.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 1279px)").matches) closeSidebar();
    })
  );
  const scrollDown = $("#scrollDown");
  const mobileActive = $("#mobileActive");
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id;
        const activeLink = navLinks.find((l) => l.getAttribute("href") === "#" + id);
        navLinks.forEach((l) => l.classList.toggle("active", l === activeLink));

        const onHome = id === "hero";
        // Hide the scroll-down arrow whenever Home isn't the active section.
        if (scrollDown) {
          scrollDown.classList.toggle("opacity-0", !onHome);
          scrollDown.classList.toggle("pointer-events-none", !onHome);
        }
        // Mobile bar: show the current section name once past Home.
        if (mobileActive) {
          const label = activeLink ? activeLink.querySelector("span").textContent : "";
          mobileActive.textContent = label;
          mobileActive.classList.toggle("hidden", onHome);
          mobileActive.classList.toggle("inline-flex", !onHome);
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- Scroll reveal ---------- */
  const revealer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  $$(".reveal").forEach((el) => revealer.observe(el));

  /* ---------- Projects: render from assets/js/projects.js ---------- */
  const projects = window.PROJECTS || [];
  const projectFilters = window.PROJECT_FILTERS || [{ id: "all", label: "All" }];

  // Icons for the per-card action buttons
  const icoGithub = '<svg viewBox="0 0 24 24" class="h-[18px] w-[18px] fill-current"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .321.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>';
  const icoLink = '<svg viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/></svg>';

  // Only render a button when its link is a real URL (not a "#" placeholder).
  const isReal = (href) => href && href !== "#";
  const actionBtn = (href, aria, ico) =>
    isReal(href)
      ? `<a href="${href}" target="_blank" rel="noopener" class="card-btn" aria-label="${aria}">${ico}</a>`
      : "";

  // Render filters + cards only when both mount points exist.
  const filters = $("#filters");
  const grid = $("#projectsGrid");
  if (filters && grid) {
    // Filter buttons (first one starts active). Each label shows how many
    // projects it matches, e.g. "All - 6", "Web - 2".
    const countFor = (id) =>
      id === "all" ? projects.length : projects.filter((p) => p.cat === id).length;
    filters.innerHTML = projectFilters
      .map(
        (f, i) =>
          `<button class="filter${i === 0 ? " active" : ""}" data-filter="${f.id}">${f.label} - ${countFor(f.id)}</button>`
      )
      .join("");

    // Project cards
    grid.innerHTML = projects
      .map((p) => {
        const actions = [
          actionBtn(p.repo, p.title + " — GitHub repository", icoGithub),
          actionBtn(p.url, p.title + " — live website", icoLink),
        ].join("");
        return `
        <article class="card" data-cat="${p.cat}">
          <div class="card-media">
            <img class="card-img" src="${p.image}" alt="${p.title}" loading="lazy" />
          </div>
          <div class="card-actions">
            <span class="card-title">${p.title}</span>
            ${actions ? `<div class="card-btns">${actions}</div>` : ""}
          </div>
        </article>`;
      })
      .join("");

    filters.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      $$(".filter", filters).forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      $$(".card", grid).forEach((card) => {
        card.classList.toggle("hide", f !== "all" && card.dataset.cat !== f);
      });
    });
  }
})();
