const galleryImages = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

// Open lightbox
galleryImages.forEach((img, index) => {
    img.setAttribute('loading', 'lazy'); // Lazy load
    img.addEventListener('click', () => {
        currentIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden', 'false');
    updateLightbox();
}

function closeLightbox() {
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
}

// Update lightbox content
function updateLightbox() {
    const img = galleryImages[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = img.alt;
}

// Navigation
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? galleryImages.length - 1 : currentIndex - 1;
    updateLightbox();
});
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === galleryImages.length - 1) ? 0 : currentIndex + 1;
    updateLightbox();
});

// Close button
closeBtn.addEventListener('click', closeLightbox);

// Close on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'Escape') closeLightbox();
    }
});
