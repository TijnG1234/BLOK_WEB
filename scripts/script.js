// JavaScript Document
console.log("hi");

/* =========================================================
   MOBIEL MENU
========================================================= */

// pak het <nav> element in de header
const nav = document.querySelector("header nav");

// pak de eerste button in de nav (hamburger)
const menuButton = document.querySelector("header nav > button");

// toggle het aria-attribuut zodat CSS het kan tonen/verbergen
menuButton.addEventListener("click", () => {
    const isOpen = nav.getAttribute("aria-expanded") === "true";
    nav.setAttribute("aria-expanded", !isOpen);
});


/* =========================================================
   FAQ ACCORDEON
========================================================= */

// pak de FAQ-sectie (de derde section in <main>)
const faqSection = document.querySelector("main > section:nth-of-type(3)");

// alle FAQ-items: elke inner <section> binnen de FAQ-sectie
const faqItems = faqSection.querySelectorAll(":scope > section");

faqItems.forEach(item => {

    // de button is altijd het eerste element in het FAQ-item
    const button = item.querySelector("button");

    // het article-element dat moet openen/sluiten
    const panel = item.querySelector("article");

    button.addEventListener("click", () => {

        // check huidige status
        const isOpen = button.getAttribute("aria-expanded") === "true";

        // toggle aria-expanded
        button.setAttribute("aria-expanded", !isOpen);

        // paneel tonen/verbergen
        panel.hidden = isOpen;
    });
});


  