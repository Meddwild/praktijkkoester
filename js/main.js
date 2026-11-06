(function () {
  "use strict";

  var body = document.body;
  var desktop = window.matchMedia("(min-width: 992px)");
  var toggles = document.querySelectorAll(".sidebar-toggle");
  var backdrop = document.querySelector(".sidebar-backdrop");

  function isOpen() {
    return desktop.matches
      ? !body.classList.contains("sidebar-collapsed")
      : body.classList.contains("nav-open");
  }

  function sync() {
    toggles.forEach(function (btn) {
      btn.setAttribute("aria-expanded", String(isOpen()));
    });
  }

  function closeDrawer() {
    body.classList.remove("nav-open");
    sync();
  }

  toggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      body.classList.toggle(desktop.matches ? "sidebar-collapsed" : "nav-open");
      sync();
    });
  });

  if (backdrop) backdrop.addEventListener("click", closeDrawer);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDrawer();
  });

  // Leaving mobile layout with the drawer open would keep the page scroll-locked
  desktop.addEventListener("change", function () {
    closeDrawer();
  });

  sync();
})();
