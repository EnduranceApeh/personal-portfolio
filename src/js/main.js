import { getFormattedDate } from "./utility.js";
import { fetchData } from "./utility.js";

// Typewriter settings
const texts = ["HI!, I'M ENDURANCE", "WELCOME!"];
const speed = 100;
const eraseSpeed = 50;
const delayBetweenTexts = 1000;
let i = 0;
let j = 0;
let isErasing = false;

// Load Components Dynamically
export async function loadComponent(file, elementId) {
    try {
        const response = await fetch(file);
        const content = await response.text();
        document.getElementById(elementId).innerHTML = content;
        
        console.log(`Loaded ${file} into #${elementId}`);

        // After loading header, initialize scripts that depend on it
        if (elementId === "header") {
            initHeaderScripts();
        }
    } catch (err) {
        console.error(`Error loading ${file}:`, err);
    }
}
//Menu toggle


// Scroll Event Listener for Navbar
window.addEventListener('scroll', () => {
    const navBar = document.querySelector('.nav-bar');
    if (window.scrollY > 10) {
        navBar.classList.add('scrolled');
    } else {
        navBar.classList.remove('scrolled');
    }
});

// Typewriter Animation
function typeWritting() {
    let currentText = texts[j];
    let typeWriterElement = document.querySelector('.typewriter');

    if (!typeWriterElement) {
        console.error("Element with class '.typewriter' not found!");
        return; // Prevent further execution if element is missing
    }

    if (!isErasing && i < currentText.length) {
        typeWriterElement.textContent += currentText.charAt(i);
        i++;
        setTimeout(typeWritting, speed);
    } else if (!isErasing && i === currentText.length) {
        isErasing = true;
        setTimeout(typeWritting, delayBetweenTexts);
    } else if (isErasing && i > 0) {
        typeWriterElement.textContent = currentText.substring(0, i - 1);
        i--;
        setTimeout(typeWritting, eraseSpeed);
    } else {
        isErasing = false;
        j = (j + 1) % texts.length;
        setTimeout(typeWritting, speed);
    }
}

// Initialize Scripts After Header Loads
function initHeaderScripts() {
    console.log("Initializing header scripts...");

    // Ensure .date element exists before modifying
    const dateElement = document.querySelector('.date');
    if (dateElement) {
        dateElement.innerHTML = getFormattedDate();
    } else {
        console.error("Element with class '.date' not found!");
    }

    // Ensure .typewriter exists before starting animation
    if (document.querySelector('.typewriter')) {
        typeWritting();
    } else {
        console.error("Element with class '.typewriter' not found! Typewriting animation skipped.");
    }
}

// Wait for DOM Content Before Running
document.addEventListener("DOMContentLoaded", async () => {
    // Load Header First
    await loadComponent('/src/components/header.html', 'header');
    document.querySelector('.hamburger').addEventListener('click', ()=>{
        console.log('hamburger')
        const navMenu = document.querySelector('#nav-menu')
        console.log(navMenu)
        navMenu.classList.toggle('active')
    })

    // Load Other Data
    try {
        const data = await fetchData('/src/data/projects.json');
        const projects = data.projects;
        projects.forEach(item => console.log(item));
    } catch (error) {
        console.error("Error fetching projects:", error);
    }
});
