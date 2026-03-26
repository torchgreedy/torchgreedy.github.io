localStorage.removeItem('theme'); // Clear any stale light-mode preference

// Typing animation for tagline
const typingText = document.getElementById('typing-text');
const textToType = typingText.textContent;
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;

let charIndex = 0;
let isDeleting = false;
let textArray = [
    "Data Science Enthusiast",
    "Machine Learning Enthusiast",
    "AI Researcher",
];
let textArrayIndex = 0;

function typeText() {
    const currentText = textArray[textArrayIndex];

    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        // Pause at end of typing
        isDeleting = true;
        setTimeout(typeText, newTextDelay);
    } else if (isDeleting && charIndex === 0) {
        // Move to next text after completely deleted
        isDeleting = false;
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        setTimeout(typeText, typingDelay);
    } else {
        // Continue typing or deleting
        setTimeout(typeText, isDeleting ? erasingDelay : typingDelay);
    }
}

// Start the typing animation after a delay
setTimeout(typeText, newTextDelay);

// Scroll animations
const sections = document.querySelectorAll('.about-section, .experience-section');
const scrollTopBtn = document.querySelector('.scroll-top');

function checkScroll() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight * 0.8) {
            section.classList.add('visible');
        }
    });

    // Show/hide scroll to top button
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

// Project modals
const modals = document.querySelectorAll('.modal');
const modalBtns = document.querySelectorAll('.view-details-btn[data-project]');
const closeBtns = document.querySelectorAll('.close-modal');

modalBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project');
        const modal = document.getElementById(projectId + '-modal');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
});

closeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
});

window.addEventListener('click', function(event) {
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
});

// Scroll to top functionality
scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Check scroll position on page load and scroll
window.addEventListener('load', checkScroll);
window.addEventListener('scroll', checkScroll);
