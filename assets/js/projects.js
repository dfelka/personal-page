/* ============================================================
   Projects data — EDIT THIS FILE to manage the Projects section.
   No build step needed; just refresh the page after saving.
   ============================================================

   ── Filters ────────────────────────────────────────────────
   PROJECT_FILTERS defines the filter buttons. Keep the first one
   ("all"). To add a category: add a { id, label } here, then use
   that `id` as a project's `cat`. Remove a filter by deleting its
   line (make sure no project still uses that `cat`).

   ── Projects ───────────────────────────────────────────────
   To ADD a project: copy a { ... } block, paste it, edit the fields.
   To REMOVE a project: delete its { ... } block.

     title  – project name (shown on hover)
     tag    – small label under the title
     cat    – must match a filter `id` (other than "all")
     image  – path to an image in assets/img/projects/ (e.g. .svg / .jpg)
     repo   – GitHub URL   ("#" = placeholder / hidden intent)
     url    – live site URL ("#" = placeholder)
   ============================================================ */

window.PROJECT_FILTERS = [
  { id: "all",   label: "All" },
  { id: "web",   label: "Web" },
  { id: "app",   label: "App" },
  { id: "brand", label: "Brand" },
];

window.PROJECTS = [
  {
    title: "Aurora Dashboard",
    tag: "Web App",
    cat: "web",
    image: "assets/img/projects/aurora.svg",
    repo: "https://github.com/dfelka/todoapp",
    url: "https://dfelka.github.io/todoapp/",
  },
  {
    title: "Nomad Travel App",
    tag: "Mobile App",
    cat: "app",
    image: "assets/img/projects/nomad.svg",
    repo: "#",
    url: "#",
  },
  {
    title: "Bloom Identity",
    tag: "Branding",
    cat: "brand",
    image: "assets/img/projects/bloom.svg",
    repo: "#",
    url: "#",
  },
  {
    title: "Ledger Fintech",
    tag: "Web App",
    cat: "web",
    image: "assets/img/projects/ledger.svg",
    repo: "#",
    url: "#",
  },
  {
    title: "Pulse Fitness",
    tag: "Mobile App",
    cat: "app",
    image: "assets/img/projects/pulse.svg",
    repo: "#",
    url: "#",
  },
  {
    title: "Vertex Studio",
    tag: "Branding",
    cat: "brand",
    image: "assets/img/projects/vertex.svg",
    repo: "#",
    url: "#",
  },
];
