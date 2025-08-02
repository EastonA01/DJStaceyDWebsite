const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
mobileMenu.classList.toggle("hidden");
});

mobileMenu.querySelectorAll("a").forEach(link =>
link.addEventListener("click", () => {
mobileMenu.classList.add("hidden");
})
);

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

menuToggle.addEventListener("click", () => {
const expanded = menuToggle.getAttribute("aria-expanded") === "true";
menuToggle.setAttribute("aria-expanded", !expanded);
mobileMenu.classList.toggle("hidden");
});
