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
  { id: "backend", label: "Backend" },
  { id: "webpage",   label: "Webpage" },
  { id: "webapp",   label: "Web App" },
  { id: "js", label: "JavaScript" },
];

window.PROJECTS = [
  {
    title: "Personal Page",
    tag: "Webpage",
    cat: "webpage",
    image: "assets/img/projects/personal-page.jpg",
    repo: "https://github.com/dfelka/personal-page",
    url: "https://dfelka.github.io/personal-page/",
  },
  {
    title: "Bookshelf API",
    tag: "Backend",
    cat: "backend",
    image: "assets/img/projects/bookshelf-api.jpg",
    repo: "https://github.com/dfelka/bookshelf-api",
    url: "https://bookshelf-api-oyxn.onrender.com/docs",
  },
  {
    title: "To-Do App",
    tag: "Web App",
    cat: "webapp",
    image: "assets/img/projects/todoapp.jpg",
    repo: "https://github.com/dfelka/todoapp",
    url: "https://dfelka.github.io/todoapp/",
  },
  {
    title: "Weather App",
    tag: "Web App",
    cat: "webapp",
    image: "assets/img/projects/weather-app.jpg",
    repo: "https://github.com/dfelka/weather-app",
    url: "https://dfelka.github.io/weather-app/",
  },
  {
    title: "BattleShip game",
    tag: "Web App",
    cat: "webapp",
    image: "assets/img/projects/battleship.jpg",
    repo: "https://github.com/dfelka/battleship",
    url: "https://dfelka.github.io/battleship/",
  },
  {
    title: "Calculator",
    tag: "Web App",
    cat: "webapp",
    image: "assets/img/projects/calculator.jpg",
    repo: "https://github.com/dfelka/calculator",
    url: "https://dfelka.github.io/calculator/",
  },
  {
    title: "Rock-Paper-Scissors game",
    tag: "Web App",
    cat: "webapp",
    image: "assets/img/projects/rock-paper-scissors.jpg",
    repo: "https://github.com/dfelka/rock-paper-scissors",
    url: "https://dfelka.github.io/rock-paper-scissors/",
  },
  {
    title: "TicTacToe game",
    tag: "Web App",
    cat: "webapp",
    image: "assets/img/projects/tictactoe.jpg",
    repo: "https://github.com/dfelka/tic-tac-toe",
    url: "https://dfelka.github.io/tic-tac-toe/",
  },
  {
    title: "Knight Travails",
    tag: "JavaScript",
    cat: "js",
    image: "assets/img/projects/knight-travails.jpg",
    repo: "https://github.com/dfelka/knight-travails",
  },
  {
    title: "Binary Tree",
    tag: "JavaScript",
    cat: "js",
    image: "assets/img/projects/binarytree.jpg",
    repo: "https://github.com/dfelka/binarytree",
  },
  {
    title: "Hashmap",
    tag: "JavaScript",
    cat: "js",
    image: "assets/img/projects/hashmap.jpg",
    repo: "https://github.com/dfelka/hashmap",
  },
  {
    title: "Linked List",
    tag: "JavaScript",
    cat: "js",
    image: "assets/img/projects/linkedlist.jpg",
    repo: "https://github.com/dfelka/linked-list",
  },
];
