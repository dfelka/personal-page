/* ============================================================
   SnapFolio-style portfolio — vanilla JS (no dependencies)
   ============================================================ */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ---------- Footer year ---------- */
  $("#year").textContent = new Date().getFullYear();

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

  /* ---------- Back-to-top ---------- */
  const toTop = $("#toTop");
  const onScroll = () => {
    toTop.classList.toggle("show", window.scrollY > 500);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

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
  const actionBtn = (href, label, ico) =>
    isReal(href)
      ? `<a href="${href}" target="_blank" rel="noopener" class="card-btn" aria-label="${label}">${ico}</a>`
      : "";

  // Filter buttons (first one starts active)
  const filters = $("#filters");
  filters.innerHTML = projectFilters
    .map(
      (f, i) =>
        `<button class="filter${i === 0 ? " active" : ""}" data-filter="${f.id}">${f.label}</button>`
    )
    .join("");

  // Project cards
  const grid = $("#projectsGrid");
  grid.innerHTML = projects
    .map(
      (p) => `
      <article class="card" data-cat="${p.cat}">
        <div class="card-inner">
          <img class="card-img" src="${p.image}" alt="${p.title}" loading="lazy" />
          <span class="card-title">${p.title}</span>
          <div class="card-actions">
            ${actionBtn(p.repo, p.title + " — GitHub repository", icoGithub)}
            ${actionBtn(p.url, p.title + " — live website", icoLink)}
          </div>
        </div>
      </article>`
    )
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
})();
