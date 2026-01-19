/* =========================================================
   MOBIEL MENU (A11Y + PROGRESSIVE ENHANCEMENT)
   - geen ids/classes
   - gebruikt aria-expanded + hidden
   - ESC sluit
   - klik buiten sluit
   - klik op link sluit
   - Met behulp van chatgpt gedaan / wel veel geleerd

========================================================= */

// -----------------------------
// ELEMENTEN OPZOEKEN
// -----------------------------

const nav = document.querySelector("header nav");                 // Selecteert het nav-element in de header
const menuButton = nav?.querySelector(":scope > button");         // Zoekt de hamburgerknop direct binnen nav (veilig met ?.)
const menu = nav?.querySelector("ul");                            // Selecteert het menu (ul) binnen de navigatie

// -----------------------------
// UITVOERDER: menu open/dicht zetten
// -----------------------------
function setMenu(open) {                                          // Functie die het menu opent of sluit
  if (!menuButton || !menu) return;                                // Stopt als knop of menu niet bestaat

  menuButton.setAttribute("aria-expanded", String(open));         // Zet de ARIA-state voor screenreaders
  menu.hidden = !open;                                             // Toont of verbergt het menu visueel

  // website-state: menu open/dicht
  document.body.toggleAttribute("data-menu-open", open);          // Zet globale state op <body>
}

// -----------------------------
// BESLISSERS: wanneer menu open/dicht?
// -----------------------------
if (menuButton && menu) {                                         // Alleen uitvoeren als beide elementen bestaan
  /*
    Progressive enhancement:
    - HTML basis: menu is zichtbaar
    - hamburgerknop is verborgen
    - JS neemt over en maakt menu inklapbaar
  */

  menuButton.hidden = false;                                       // Toont de hamburgerknop zodra JS actief is
  setMenu(false);                                                  // Sluit het menu standaard bij het starten van JS

  // Hamburgerknop
  menuButton.addEventListener("click", () => {                    // Luistert naar klik op de hamburgerknop
    setMenu(menu.hidden === true);                                 // Opent of sluit afhankelijk van huidige status
  });

  // Sluiten met Escape
  document.addEventListener("keydown", (event) => {               // Luistert naar toetsenbord-input
    if (event.key === "Escape") {                                  // Checkt of Escape is ingedrukt
      setMenu(false);                                              // Sluit het menu
    }
  });

  // Klik buiten de navigatie → sluiten
  document.addEventListener("click", (event) => {                 // Luistert naar muisklikken op de pagina
    if (!nav.contains(event.target)) {                             // Checkt of de klik buiten de nav was
      setMenu(false);                                              // Sluit het menu
    }
  });

  // Klik op een link in het menu → sluiten
  menu.addEventListener("click", (event) => {                     // Luistert naar kliks binnen het menu
    if (event.target.matches("a")) {                               // Checkt of er op een link is geklikt
      setMenu(false);                                              // Sluit het menu na navigatie
    }
  });
}


/* =========================================================
   THEMA TOGGLE (light default -> dark via body[data-theme])
   - knop zit in het hamburger menu
   - onthoudt keuze met localStorage
  - Met behulp van chatgpt gedaan / wel veel geleerd
========================================================= */

const themeButton = document.querySelector("[data-theme-toggle]"); // Selecteert de thema-toggle knop in de HTML

function applyTheme(theme) {                                     // Functie die het gekozen thema toepast
  document.body.setAttribute("data-theme", theme);               // Zet het data-theme attribuut op <body> voor CSS

  if (!themeButton) return;                                      // Stopt als de knop niet bestaat

  if (theme === "dark") {                                        // Controleert of het thema donker is
    themeButton.setAttribute("aria-pressed", "true");            // Geeft aan dat de toggle actief is (toegankelijkheid)
    themeButton.textContent = "Thema: donker";                   // Past de zichtbare tekst van de knop aan
  } else {                                                       // Anders (licht thema)
    themeButton.setAttribute("aria-pressed", "false");           // Zet de toggle op niet-actief
    themeButton.textContent = "Thema: licht";                    // Past de tekst aan naar licht thema
  }
}

if (themeButton) {                                               // Checkt of de thema-knop aanwezig is
  const savedTheme = localStorage.getItem("theme");              // Haalt het opgeslagen thema uit localStorage / Zonder deze regel zou mijn site elke keer opnieuw beginnen met hetzelfde thema.
  const startTheme = savedTheme === "dark" ? "dark" : "light";   // Bepaalt het startthema (fallback naar light)

  applyTheme(startTheme);                                        // Past het startthema toe bij het laden

  themeButton.addEventListener("click", () => {                  // Voegt klik-interactie toe aan de knop
    const currentTheme = document.body.getAttribute("data-theme"); // Leest het huidige thema van <body>
    const nextTheme = currentTheme === "dark" ? "light" : "dark";  // Wisselt tussen light en dark

    localStorage.setItem("theme", nextTheme);                    // Slaat het nieuwe thema op
    applyTheme(nextTheme);                                       // Past het nieuwe thema toe

    setMenu(false);                                              // Sluit het mobiele menu na klikken
  });
}

