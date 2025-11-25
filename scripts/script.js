// JavaScript Document
console.log("hi");

document.addEventListener("DOMContentLoaded", function () {
    // Hamburger menu
    const toggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
  
    toggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  
    // FAQ accordeon
    const accordionToggles = document.querySelectorAll(".accordion-toggle");
  
    accordionToggles.forEach((btn) => {
      btn.addEventListener("click", function () {
        const panelId = btn.getAttribute("aria-controls");
        const panel = document.getElementById(panelId);
        const isOpen = btn.getAttribute("aria-expanded") === "true";
  
        btn.setAttribute("aria-expanded", String(!isOpen));
        panel.hidden = isOpen;
      });
    });
  });
  