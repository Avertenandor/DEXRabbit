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

  // DR-011 FIX: Прокрутка наверх при загрузке страницы
  // Проверяем, нужно ли прокрутить наверх
  const shouldScrollToTop = sessionStorage.getItem("scrollToTop") === "true";
  const hasNoHash = window.location.hash === "" || window.location.hash === "#";
  
  if (shouldScrollToTop && hasNoHash) {
    // Очищаем флаг
    sessionStorage.removeItem("scrollToTop");
    
    // Прокручиваем наверх
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
      });
    }, 0);
  }

  // DR-011 FIX: Прокрутка наверх при навигации по внутренним ссылкам
  // Перехватываем клики по внутренним ссылкам (не якорям)
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href) return;

    // Проверяем, что это внутренняя ссылка и не якорь
    const isInternal = href.startsWith("/") || (!href.includes("://") && !href.startsWith("#"));
    const isAnchor = href.startsWith("#");
    
    if (isInternal && !isAnchor) {
      // Запоминаем, что нужно прокрутить наверх после перехода
      sessionStorage.setItem("scrollToTop", "true");
    }
  });
});
