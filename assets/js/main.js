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
  if (sidebarToggle) sidebarToggle.addEventListener("click", openSidebar);
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
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id;
        navLinks.forEach((l) =>
          l.classList.toggle("active", l.getAttribute("href") === "#" + id)
        );
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

  /* ---------- Animated counters ---------- */
  const countObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = +el.dataset.count;
        const suffix = el.dataset.suffix || "";
        const dur = 1600;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(eased * target).toLocaleString() + (p === 1 ? suffix : "");
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  $$(".stat-num").forEach((el) => countObs.observe(el));

  /* ---------- Typed text effect ---------- */
  const typedEl = $(".typed");
  if (typedEl) {
    const words = JSON.parse(typedEl.dataset.typed);
    let wi = 0, ci = 0, deleting = false;
    const type = () => {
      const word = words[wi];
      typedEl.textContent = word.slice(0, ci);
      if (!deleting && ci < word.length) {
        ci++;
        setTimeout(type, 90);
      } else if (deleting && ci > 0) {
        ci--;
        setTimeout(type, 45);
      } else {
        if (!deleting) {
          deleting = true;
          setTimeout(type, 1400);
        } else {
          deleting = false;
          wi = (wi + 1) % words.length;
          setTimeout(type, 250);
        }
      }
    };
    type();
  }

  /* ---------- Projects: data + render + filter ---------- */
  // repo = GitHub link, url = live website. Replace "#" with real links.
  const projects = [
    { title: "Aurora Dashboard", cat: "web", tag: "Web App", from: "#ef6d58", to: "#b23a6b", repo: "#", url: "#" },
    { title: "Nomad Travel App", cat: "app", tag: "Mobile App", from: "#5b6ef5", to: "#8b3af5", repo: "#", url: "#" },
    { title: "Bloom Identity", cat: "brand", tag: "Branding", from: "#1a9d6a", to: "#0f6e94", repo: "#", url: "#" },
    { title: "Ledger Fintech", cat: "web", tag: "Web App", from: "#f5a623", to: "#e14b32", repo: "#", url: "#" },
    { title: "Pulse Fitness", cat: "app", tag: "Mobile App", from: "#e14b8a", to: "#7b2ff7", repo: "#", url: "#" },
    { title: "Vertex Studio", cat: "brand", tag: "Branding", from: "#2d3561", to: "#3a2233", repo: "#", url: "#" },
  ];

  // Icons for the per-card action buttons
  const icoGithub = '<svg viewBox="0 0 24 24" class="h-[18px] w-[18px] fill-current"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .321.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>';
  const icoLink = '<svg viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/></svg>';

  const grid = $("#projectsGrid");
  grid.innerHTML = projects
    .map(
      (p) => `
      <article class="card" data-cat="${p.cat}">
        <div class="grid h-full w-full place-items-center text-[1.05rem] font-bold tracking-wide text-white/90"
             style="background:linear-gradient(135deg, ${p.from}, ${p.to});">${p.title}</div>
        <div class="card-overlay">
          <h3 class="mb-0.5 text-[1.15rem] text-white">${p.title}</h3>
          <span class="text-[.85rem] text-white/75">${p.tag}</span>
        </div>
        <div class="card-actions">
          <a href="${p.repo}" target="_blank" rel="noopener" class="card-btn" aria-label="${p.title} — GitHub repository">${icoGithub}</a>
          <a href="${p.url}" target="_blank" rel="noopener" class="card-btn" aria-label="${p.title} — live website">${icoLink}</a>
        </div>
      </article>`
    )
    .join("");

  const filters = $("#filters");
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
