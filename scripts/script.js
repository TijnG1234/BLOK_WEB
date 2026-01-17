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

  // ✅ website-state: menu open/dicht
  document.body.toggleAttribute("data-menu-open", open);
}

// -----------------------------
// BESLISSERS: wanneer menu open/dicht?
// -----------------------------
if (menuButton && menu) {
  /*
    Progressive enhancement:
    - HTML basis: menu staat zichtbaar (geen hidden in HTML)
    - JS: mag 'm bij load sluiten
  */

  // Forceer basisstaat zichtbaar voordat we het 'enhancen'
  // (handig als iemand per ongeluk toch nog hidden in HTML liet staan)
  menu.hidden = false;

  // Menu begint gesloten zodra JS draait
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

    // menu sluiten op mobiel (best effort)
    setMenu(false);
  });
}

/* =========================================================
   FAQ ACCORDEON (A11Y + PROGRESSIVE ENHANCEMENT)
   - button aria-expanded
   - panel hidden (door JS gezet, niet in HTML)
   - werkt alleen op pagina’s waar FAQ bestaat
========================================================= */

const faqSection = document.querySelector("main > section:nth-of-type(3)");

if (faqSection) {
  // Jij gebruikt items als sections binnen de FAQ-section
  const faqItems = faqSection.querySelectorAll(":scope > section");

  const hasAccordion = Array.from(faqItems).some((item) => {
    return item.querySelector("button") && item.querySelector("article");
  });

  if (hasAccordion) {
    faqItems.forEach((item) => {
      const button = item.querySelector("button");
      const panel = item.querySelector("article");

      if (!button || !panel) return;

      /*
        Progressive enhancement:
        - HTML basis: panel is zichtbaar (geen hidden in HTML)
        - JS: zet panel bij load dicht
      */
      panel.hidden = true;
      button.setAttribute("aria-expanded", "false");

      button.addEventListener("click", () => {
        const isOpen = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!isOpen));
        panel.hidden = isOpen;
      });
    });
  }
}
