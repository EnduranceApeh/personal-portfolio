import { getFormattedDate } from "./utility.js";

const texts = ["HI!, I'M ENDURANCE", "WELCOME!"];
const speed = 100;
const eraseSpeed = 50;
const delayBetweenTexts = 1000;
let i = 0;
let j = 0;
let isErasing = false;

async function loadComponent(file, elementId) {
    try {
        const response = await fetch(file);
        const content = await response.text();
        document.getElementById(elementId).innerHTML = content;

    } catch(err) {
        console.log(err)
    }
}

window.addEventListener('scroll', () => {
    const navBar = document.querySelector('.nav-bar');
    if(window.scrollY > 10) {
        navBar.classList.add('scrolled')
        
    }else {
        navBar.classList.remove('scrolled')
    }
})

    

// TYpeWritting Animation
function typeWritting() {
    
    let currentText = texts[j];
    let typeWriterElement = document.querySelector('.typewriter');

    if(!isErasing && i < currentText.length) {
        typeWriterElement.textContent += currentText.charAt(i);
        i++;
        setTimeout(typeWritting, speed)
    }else if (!isErasing && i === currentText.length) {
        isErasing = true;
        setTimeout(typeWritting, delayBetweenTexts);
    }else if (isErasing && i > 0) {
        typeWriterElement.textContent = currentText.substring(0, i - 1);
        i--;
        setTimeout(typeWritting, eraseSpeed);
    }else {
        isErasing = false;
        j = (j + 1) % texts.length;
        setTimeout(typeWritting, speed);
    }
}


loadComponent('/src/components/header.html', 'header')
document.querySelector('.date').innerHTML = getFormattedDate();
typeWritting();

