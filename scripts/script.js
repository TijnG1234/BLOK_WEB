// JavaScript Document

/* =========================================================
   MOBIEL MENU (A11Y + PROGRESSIVE ENHANCEMENT)
   - geen ids/classes
   - gebruikt aria-expanded + hidden
   - ESC sluit
   - klik buiten sluit
   - klik op link sluit
========================================================= */

// -----------------------------
// ELEMENTEN OPZOEKEN
// -----------------------------

const nav = document.querySelector("header nav");
const menuButton = nav?.querySelector(":scope > button");
const menu = nav?.querySelector("ul");

// -----------------------------
// UITVOERDER: menu open/dicht zetten
// -----------------------------
function setMenu(open) {
  if (!menuButton || !menu) return;

  menuButton.setAttribute("aria-expanded", String(open));
  menu.hidden = !open;

  // website-state: menu open/dicht
  document.body.toggleAttribute("data-menu-open", open);
}

// -----------------------------
// BESLISSERS: wanneer menu open/dicht?
// -----------------------------
if (menuButton && menu) {
  /*
    Progressive enhancement:
    - HTML basis: menu is zichtbaar
    - hamburgerknop is verborgen
    - JS neemt over en maakt menu inklapbaar
  */

  // hamburgerknop pas tonen als JS actief is
  menuButton.hidden = false;

  // menu start gesloten zodra JS draait
  setMenu(false);

  // Hamburgerknop
  menuButton.addEventListener("click", () => {
    setMenu(menu.hidden === true);
  });

  // Sluiten met Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenu(false);
    }
  });

  // Klik buiten de navigatie → sluiten
  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target)) {
      setMenu(false);
    }
  });

  // Klik op een link in het menu → sluiten
  menu.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      setMenu(false);
    }
  });
}

/* =========================================================
   THEMA TOGGLE (light default -> dark via body[data-theme])
   - knop zit in het hamburger menu
   - onthoudt keuze met localStorage
========================================================= */

const themeButton = document.querySelector("[data-theme-toggle]");

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);

  if (!themeButton) return;

  if (theme === "dark") {
    themeButton.setAttribute("aria-pressed", "true");
    themeButton.textContent = "Thema: donker";
  } else {
    themeButton.setAttribute("aria-pressed", "false");
    themeButton.textContent = "Thema: licht";
  }
}

if (themeButton) {
  const savedTheme = localStorage.getItem("theme");
  const startTheme = savedTheme === "dark" ? "dark" : "light";

  applyTheme(startTheme);

  themeButton.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);

    // menu sluiten op mobiel
    setMenu(false);
  });
}
