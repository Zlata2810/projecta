// Спільні для всіх сторінок елементи: меню та футер.
const PAGES = [
  { href: "index.html", label: "Головна" },
  { href: "friend or threat.html", label: "Друг чи загроза" },
  { href: "advantagesAI.html", label: "Переваги" },
  { href: "education.html", label: "Навчання" },
  { href: "prompt.html", label: "Структура промптів" }
];

function currentPage() {
  return decodeURIComponent(location.pathname.split("/").pop() || "index.html");
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
        <li class="theme-toggle-item"><button class="theme-toggle" id="theme-toggle" type="button"></button></li>
      </ul>
    </nav>`;
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("site-theme", theme);

  const button = document.getElementById("theme-toggle");
  const nextTheme = theme === "dark" ? "light" : "dark";
  if (button) {
    button.textContent = nextTheme === "light" ? "☀ Світла" : "☾ Темна";
    button.setAttribute("aria-label", `Увімкнути ${nextTheme === "light" ? "світлу" : "темну"} тему`);
  }

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = theme === "light" ? "#f5f6fa" : "#101115";
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

  const savedTheme = localStorage.getItem("site-theme") || "dark";
  setTheme(savedTheme);
  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });
});
