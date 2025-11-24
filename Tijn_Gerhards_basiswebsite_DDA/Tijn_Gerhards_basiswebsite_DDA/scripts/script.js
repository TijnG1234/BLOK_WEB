// JavaScript Document
console.log("hi");

const toggleButton = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

toggleButton.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

