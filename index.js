const track = document.getElementById('carousel-track');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const slides = track.children;
let currentIndex = 0;

function updateCarousel() {
const width = slides[0].clientWidth;
track.style.transform = `translateX(-${currentIndex * width}px)`;

Array.from(slides).forEach((slide, index) => {
slide.setAttribute('aria-label', `${index + 1} of ${slides.length}`);
});
}

function goToNext() {
currentIndex = (currentIndex + 1) % slides.length;
updateCarousel();
}

function goToPrev() {
currentIndex = (currentIndex - 1 + slides.length) % slides.length;
updateCarousel();
}

nextBtn.addEventListener('click', goToNext);
prevBtn.addEventListener('click', goToPrev);

window.addEventListener('resize', updateCarousel);

let startX = 0;
let endX = 0;

track.addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
track.addEventListener('touchmove', e => endX = e.touches[0].clientX, { passive: true });
track.addEventListener('touchend', () => {
if (startX - endX > 50) goToNext();
else if (endX - startX > 50) goToPrev();
startX = endX = 0;
});

document.addEventListener('keydown', e => {
if (e.key === 'ArrowRight') goToNext();
if (e.key === 'ArrowLeft') goToPrev();
});

updateCarousel();

document.addEventListener("DOMContentLoaded", () => {
const navLinks = document.querySelectorAll("nav a[href^='#']");

function highlightCurrentLink() {
const currentHash = window.location.hash;
navLinks.forEach(link => {
if (link.getAttribute("href") === currentHash) {
link.classList.add("text-black", "font-bold");
} else {
link.classList.remove("text-black", "font-bold");
}
});
}

highlightCurrentLink();

window.addEventListener("hashchange", highlightCurrentLink);
});

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

let isExpanded = false;

if (menuToggle && mobileMenu) {
    // Only add this once, outside of click handler
    mobileMenu.addEventListener("transitionend", (event) => {
        if (event.propertyName === "max-height" && !isExpanded) {
            mobileMenu.classList.add("hidden");
            mobileMenu.style.maxHeight = null; // reset inline style
        }
    });

    menuToggle.addEventListener("click", () => {
        isExpanded = !isExpanded;
        menuToggle.setAttribute("aria-expanded", String(isExpanded));

        if (isExpanded) {
            // Opening menu
            mobileMenu.classList.remove("hidden");
            mobileMenu.style.maxHeight = "0px"; // reset before animating

            requestAnimationFrame(() => {
                mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
                mobileMenu.classList.remove("opacity-0");
                mobileMenu.classList.add("opacity-100");
            });
        } else {
            // Closing menu
            mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";

            requestAnimationFrame(() => {
                mobileMenu.style.maxHeight = "0px";
                mobileMenu.classList.remove("opacity-100");
                mobileMenu.classList.add("opacity-0");
            });
            // Don't add/remove event listener here! It’s handled once above.
        }
    });
}
