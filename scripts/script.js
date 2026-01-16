// JavaScript Document

/* =========================================================
   MOBIEL MENU (A11Y-PROOF)
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
// zoekt de <nav> in de <header>

const menuButton = nav?.querySelector(":scope > button");
// zoekt de hamburgerknop binnen de nav
// ?. voorkomt errors als nav niet bestaat

const menu = nav?.querySelector("ul");
// zoekt het dropdownmenu (<ul>) binnen de nav

// -----------------------------
// UITVOERDER: menu open/dicht zetten
// -----------------------------
function setMenu(open) {
  // veiligheid: als knop of menu niet bestaat, stop
  if (!menuButton || !menu) return;

  // aria-expanded vertelt screenreaders of het menu open is
  menuButton.setAttribute("aria-expanded", String(open));

  // hidden = true  → menu is dicht
  // hidden = false → menu is open
  menu.hidden = !open;
}
// function → hoisted → overal te gebruiken

// -----------------------------
// BESLISSERS: wanneer menu open/dicht?
// -----------------------------
if (menuButton && menu) {
  // menu begint altijd gesloten bij het laden van de pagina
  setMenu(false);

  // Hamburgerknop
  menuButton.addEventListener("click", () => {
    // toggle op basis van huidige hidden-status
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

  if (themeButton) {
    if (theme === "dark") {
      themeButton.setAttribute("aria-pressed", "true");
      themeButton.textContent = "Thema: donker";
    } else {
      themeButton.setAttribute("aria-pressed", "false");
      themeButton.textContent = "Thema: licht";
    }
  }
}

if (themeButton) {
  const savedTheme = localStorage.getItem("theme");
  let startTheme;

  if (savedTheme === "dark") {
    startTheme = "dark";
  } else {
    startTheme = "light";
  }

  applyTheme(startTheme);

  themeButton.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme");
    let nextTheme;

    if (currentTheme === "dark") {
      nextTheme = "light";
    } else {
      nextTheme = "dark";
    }

    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);

    setMenu(false); // menu sluiten op mobiel
  });
}


/* =========================================================
   FAQ ACCORDEON (A11Y)
   - button aria-expanded
   - article hidden
   - werkt alleen op pagina’s waar echt FAQ-items bestaan
========================================================= */

// we proberen nog steeds jouw 3e section te pakken (zoals je CSS/HTML nu is)
const faqSection = document.querySelector("main > section:nth-of-type(3)");

if (faqSection) {
  const faqItems = faqSection.querySelectorAll(":scope > section");

  // extra check: alleen doorgaan als er minimaal 1 item bestaat met button + article
  const hasAccordion = Array.from(faqItems).some((item) => {
    return item.querySelector("button") && item.querySelector("article");
  });

  if (hasAccordion) {
    faqItems.forEach((item) => {
      const button = item.querySelector("button");
      const panel = item.querySelector("article");

      if (!button || !panel) return;

      // Starttoestand: dicht
      panel.hidden = true;
      button.setAttribute("aria-expanded", "false");

      button.addEventListener("click", () => {
        const isOpen = button.getAttribute("aria-expanded") === "true";

        if (isOpen) {
          button.setAttribute("aria-expanded", "false");
          panel.hidden = true;
        } else {
          button.setAttribute("aria-expanded", "true");
          panel.hidden = false;
        }
      });
    });
  }
}
