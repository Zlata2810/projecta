// Спільні для всіх сторінок елементи: меню та футер.
const PAGES = [
  { href: "index.html", label: "Головна" },
  { href: "friend or threat.html", label: "Друг чи загроза" },
  { href: "advantagesAI.html", label: "Переваги" },
  { href: "risks.html", label: "Ризики" },
  { href: "education.html", label: "Навчання" }
];

function currentPage() {
  return location.pathname.split("/").pop() || "index.html";
}

function renderHeader() {
  const target = document.getElementById("site-header");
  if (!target) return;

  const current = currentPage();
  const items = PAGES.map((page) => {
    const isActive = page.href === current;
    return `<li class="nav-item"><a href="${page.href}"${isActive ? ' class="active" aria-current="page"' : ""}>${page.label}</a></li>`;
  }).join("");

  target.innerHTML = `
    <nav class="nav-container" aria-label="Головна навігація">
      <ul class="nav-menu">
        <li class="brand-item"><a class="nav-brand" href="index.html">NEURO<span>/</span>LINK</a></li>
        ${items}
      </ul>
    </nav>`;
}

function renderFooter() {
  const target = document.getElementById("site-footer");
  if (!target) return;

  target.innerHTML = `
    <div class="footer-inner">
      <p class="footer-title">NEURO<span>/</span>LINK · Штучний інтелект поруч</p>
      <p class="footer-copy">© ${new Date().getFullYear()} Освітній проєкт про ШІ</p>
    </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
});
