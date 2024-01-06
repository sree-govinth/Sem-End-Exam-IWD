const introTextElement = document.getElementById('intro-text');
const skills = ['Web Developer', 'Graphic Designer', 'Problem Solver']; // Add your skills here

let currentSkillIndex = 0;

function updateIntroText() {
    const currentSkill = skills[currentSkillIndex];
    const textArray = currentSkill.split('');

    let displayText = "I'm a ";
    let timeout = 0;

    textArray.forEach((char, index) => {
        setTimeout(() => {
            displayText += char;
            introTextElement.textContent = displayText;
        }, timeout);

        timeout += 100; // Adjust the typing speed (milliseconds per character)
    });

    setTimeout(() => {
        currentSkillIndex = (currentSkillIndex + 1) % skills.length;
        updateIntroText();
    }, 3000 ); // Change skill every 5 seconds
}

updateIntroText(); // Start the typing effect

function scrollToNextPage() {
    const nextPage = document.getElementById('aboutme');

    if (nextPage) {
        nextPage.scrollIntoView({ behavior: 'smooth' });
    }
}

const sections = document.querySelectorAll('section'); 
const navLinks = document.querySelectorAll('nav a');

function changeActiveLink() {
    let currentSectionId = '';

    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= 100 && rect.bottom >= 50) {
            currentSectionId = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('scroll', changeActiveLink);

// for project navigation
const projects = document.querySelectorAll('.project');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let currentProjectIndex = 0;

function showProject(index) {
    projects.forEach((project, i) => {
        if (i === index) {
            project.style.opacity = '1';
            project.style.transform = 'translateX(0)';
        } else {
            project.style.opacity = '0';
            project.style.transform = 'translateX(-100%)';
        }
    });
}

function updateProject(direction) {
    currentProjectIndex += direction;

    if (currentProjectIndex < 0) {
        currentProjectIndex = projects.length - 1;
    } else if (currentProjectIndex >= projects.length) {
        currentProjectIndex = 0;
    }

    showProject(currentProjectIndex);
}

// Set up initial display
showProject(currentProjectIndex);

// Button click events
prevButton.addEventListener('click', () => updateProject(-1));
nextButton.addEventListener('click', () => updateProject(1));

// Automatic sliding every 5 seconds
setInterval(() => {
    updateProject(1);
}, 5000);
