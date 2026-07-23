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
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const dark = root.classList.toggle("dark");
      localStorage.setItem("theme", dark ? "dark" : "light");
      themeToggle.setAttribute("aria-pressed", String(dark));
    });
  }
  // Follow OS changes only while the user hasn't chosen explicitly.
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) root.classList.toggle("dark", e.matches);
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

  /* ---------- Skill bars ---------- */
  const skillObs = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.style.width = e.target.dataset.level + "%";
        obs.unobserve(e.target);
      });
    },
    { threshold: 0.4 }
  );
  $$(".skill-fill").forEach((el) => skillObs.observe(el));

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

  /* ---------- Portfolio: data + render + filter ---------- */
  const projects = [
    { title: "Aurora Dashboard", cat: "web", tag: "Web App", from: "#ef6d58", to: "#b23a6b" },
    { title: "Nomad Travel App", cat: "app", tag: "Mobile App", from: "#5b6ef5", to: "#8b3af5" },
    { title: "Bloom Identity", cat: "brand", tag: "Branding", from: "#1a9d6a", to: "#0f6e94" },
    { title: "Ledger Fintech", cat: "web", tag: "Web App", from: "#f5a623", to: "#e14b32" },
    { title: "Pulse Fitness", cat: "app", tag: "Mobile App", from: "#e14b8a", to: "#7b2ff7" },
    { title: "Vertex Studio", cat: "brand", tag: "Branding", from: "#2d3561", to: "#3a2233" },
  ];

  const grid = $("#portfolioGrid");
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

  /* ---------- Contact form (client-side validation) ---------- */
  const form = $("#contactForm");
  const status = $("#formStatus");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    $$("input, textarea", form).forEach((field) => {
      const valid = field.value.trim() !== "" &&
        (field.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value));
      field.classList.toggle("invalid", !valid);
      if (!valid) ok = false;
    });
    if (!ok) {
      status.textContent = "Please fill in all fields with valid details.";
      status.className = "form-status m-0 text-[.9rem] font-semibold err";
      return;
    }
    // No backend in this minimal build — simulate success.
    status.textContent = "Thanks! Your message has been sent. (Demo — no backend attached.)";
    status.className = "form-status m-0 text-[.9rem] font-semibold ok";
    form.reset();
  });
})();
