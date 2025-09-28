document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector("[data-mobile-nav-toggle]");
  const navLinks = document.querySelector("[data-nav-links]");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const expanded = navLinks.getAttribute("aria-expanded") === "true";
      navLinks.setAttribute("aria-expanded", !expanded);
      navToggle.setAttribute("aria-label", expanded ? "Открыть меню" : "Закрыть меню");
    });
  }

  const yearEl = document.querySelector("[data-current-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
