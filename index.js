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

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
        const expanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!expanded));

        if (!expanded) {
            // Show menu: remove hidden first, then animate max-height and opacity
            mobileMenu.classList.remove("hidden");

            // Allow the browser to paint before animating
            requestAnimationFrame(() => {
                mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px"; // dynamic height
                mobileMenu.classList.remove("opacity-0");
                mobileMenu.classList.add("opacity-100");
            });
        } else {
            // Hide menu: animate max-height and opacity, then add hidden after transition
            mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px"; // set explicit height for transition
            requestAnimationFrame(() => {
                mobileMenu.style.maxHeight = "0px";
                mobileMenu.classList.remove("opacity-100");
                mobileMenu.classList.add("opacity-0");
            });

            // Wait for transition to end before hiding completely
            mobileMenu.addEventListener(
                "transitionend",
                function handler(event) {
                    if (event.propertyName === "max-height") {
                        mobileMenu.classList.add("hidden");
                        mobileMenu.style.maxHeight = null; // reset inline style
                        mobileMenu.removeEventListener("transitionend", handler);
                    }
                }
            );
        }
    });
}

