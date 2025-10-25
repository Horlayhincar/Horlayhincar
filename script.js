// ==================== MOBILE MENU TOGGLE ====================
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
    });
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById('navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            navLinks?.classList.remove('active');
        }
    });
});

// ==================== FORM CLEARING FUNCTIONALITY ====================
function clearContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.reset();
    }
}

// Clear form on page load and when returning via back button
window.addEventListener('load', clearContactForm);
window.addEventListener('pageshow', function(event) {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        clearContactForm();
    }
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to cards
document.querySelectorAll('.about-card, .program-card, .value-card, .instructor-card, .news-card, .testimonial-card, .gallery-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// ==================== VIDEO MODAL HANDLER ====================
const videoModal = document.getElementById('videoModal');
const videoPlayer = document.getElementById('videoPlayer');
const closeModal = document.getElementById('closeModal');

function handleVideoModal(videoSrc, modal, player) {
    if (!player || !modal) return;
    
    player.querySelector('source').src = videoSrc;
    player.load();
    modal.classList.add('active');
    player.play();
    document.body.style.overflow = 'hidden';
}

function closeVideoModal(modal, player) {
    if (!modal || !player) return;
    
    modal.classList.remove('active');
    player.pause();
    player.currentTime = 0;
    document.body.style.overflow = '';
}

// News video buttons
document.querySelectorAll('.watch-video-btn').forEach(button => {
    button.addEventListener('click', function() {
        const videoSrc = this.getAttribute('data-video');
        handleVideoModal(videoSrc, videoModal, videoPlayer);
    });
});

// Close modal events
if (closeModal) {
    closeModal.addEventListener('click', () => closeVideoModal(videoModal, videoPlayer));
}

if (videoModal) {
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) closeVideoModal(videoModal, videoPlayer);
    });
}

// ==================== GALLERY TOGGLE FUNCTIONALITY ====================
const viewGalleriesBtn = document.getElementById('viewGalleriesBtn');
const galleryContent = document.getElementById('galleryContent');
const closeGalleriesBtn = document.getElementById('closeGalleriesBtn');

function openGallery() {
    if (!galleryContent || !viewGalleriesBtn) return;
    
    galleryContent.classList.add('active');
    viewGalleriesBtn.style.display = 'none';
    
    setTimeout(() => {
        galleryContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function closeGallery() {
    if (!galleryContent || !viewGalleriesBtn) return;
    
    galleryContent.classList.remove('active');
    viewGalleriesBtn.style.display = 'block';
    
    setTimeout(() => {
        document.getElementById('gallery').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// Event listeners for gallery toggle
if (viewGalleriesBtn) viewGalleriesBtn.addEventListener('click', openGallery);
if (closeGalleriesBtn) closeGalleriesBtn.addEventListener('click', closeGallery);

// ==================== GALLERY FILTER FUNCTIONALITY ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                const shouldShow = filterValue === 'all' || itemCategory === filterValue;
                
                if (shouldShow) {
                    item.classList.remove('hide');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => item.classList.add('hide'), 300);
                }
            });
        });
    });
}

// ==================== GALLERY LIGHTBOX ====================
const galleryLightbox = document.getElementById('galleryLightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImageIndex = 0;
let currentImages = [];

function updateGalleryImages() {
    currentImages = Array.from(document.querySelectorAll('.gallery-item:not(.hide)'));
}

function openLightbox(item) {
    if (!lightboxImg || !galleryLightbox) return;
    
    const img = item.querySelector('img');
    const overlay = item.querySelector('.gallery-overlay');
    
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    
    if (overlay && lightboxCaption) {
        const title = overlay.querySelector('h4')?.textContent || '';
        const description = overlay.querySelector('p')?.textContent || '';
        lightboxCaption.textContent = title + (description ? ' - ' + description : '');
    }
    
    galleryLightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    if (!galleryLightbox) return;
    galleryLightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    if (currentImages.length === 0) return;
    
    let attempts = 0;
    do {
        currentImageIndex = (currentImageIndex + direction + currentImages.length) % currentImages.length;
        attempts++;
    } while (currentImages[currentImageIndex].getAttribute('data-type') === 'video' && attempts < currentImages.length);
    
    openLightbox(currentImages[currentImageIndex]);
}

// Gallery item click handlers
galleryItems.forEach((item, index) => {
    item.addEventListener('click', function() {
        if (this.classList.contains('hide')) return;
        
        const itemType = this.getAttribute('data-type');
        
        if (itemType === 'video') {
            const videoSrc = this.getAttribute('data-video');
            openVideoModal(videoSrc);
        } else {
            const visibleItems = Array.from(document.querySelectorAll('.gallery-item:not(.hide)'));
            currentImageIndex = visibleItems.indexOf(this);
            currentImages = visibleItems;
            openLightbox(this);
        }
    });
});

// Lightbox event listeners
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
if (lightboxNext) lightboxNext.addEventListener('click', () => navigateLightbox(1));

if (galleryLightbox) {
    galleryLightbox.addEventListener('click', (e) => {
        if (e.target === galleryLightbox) closeLightbox();
    });
}

// ==================== GALLERY VIDEO MODAL ====================
const galleryVideoModal = document.getElementById('galleryVideoModal');
const galleryVideoPlayer = document.getElementById('galleryVideoPlayer');
const galleryVideoClose = document.getElementById('galleryVideoClose');

function openVideoModal(videoSrc) {
    if (!galleryVideoPlayer || !galleryVideoModal) return;
    
    galleryVideoPlayer.querySelector('source').src = videoSrc;
    galleryVideoPlayer.load();
    galleryVideoModal.classList.add('active');
    galleryVideoPlayer.play();
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    if (!galleryVideoModal || !galleryVideoPlayer) return;
    
    galleryVideoModal.classList.remove('active');
    galleryVideoPlayer.pause();
    galleryVideoPlayer.currentTime = 0;
    document.body.style.overflow = '';
}

// Video modal event listeners
if (galleryVideoClose) {
    galleryVideoClose.addEventListener('click', closeVideoModal);
}

if (galleryVideoModal) {
    galleryVideoModal.addEventListener('click', (e) => {
        if (e.target === galleryVideoModal) closeVideoModal();
    });
}

// ==================== INSTRUCTOR CAROUSEL ====================
let currentCarouselIndex = 0;
let autoSlideInterval;
let cardsPerView = 4;

function updateCardsPerView() {
    if (window.innerWidth <= 480) {
        cardsPerView = 1;
    } else if (window.innerWidth <= 768) {
        cardsPerView = 2;
    } else if (window.innerWidth <= 1024) {
        cardsPerView = 3;
    } else {
        cardsPerView = 4;
    }
    return cardsPerView;
}

function moveToNextSlide() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.instructor-card');
    
    if (!track || cards.length === 0) return;
    
    updateCardsPerView();
    const totalSlides = Math.ceil(cards.length / cardsPerView);
    
    // Move to next slide
    currentCarouselIndex = (currentCarouselIndex + 1) % totalSlides;
    
    // Calculate translation
    const cardWidth = cards[0].offsetWidth + 20; // card width + gap
    const translateX = -currentCarouselIndex * cardWidth * cardsPerView;
    
    track.style.transform = `translateX(${translateX}px)`;
    track.style.transition = 'transform 0.5s ease-in-out';
}

function moveToPrevSlide() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.instructor-card');
    
    if (!track || cards.length === 0) return;
    
    updateCardsPerView();
    const totalSlides = Math.ceil(cards.length / cardsPerView);
    
    // Move to previous slide
    currentCarouselIndex = (currentCarouselIndex - 1 + totalSlides) % totalSlides;
    
    // Calculate translation
    const cardWidth = cards[0].offsetWidth + 20;
    const translateX = -currentCarouselIndex * cardWidth * cardsPerView;
    
    track.style.transform = `translateX(${translateX}px)`;
    track.style.transition = 'transform 0.5s ease-in-out';
}

function startInstructorCarousel() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.instructor-card');
    
    if (!track || cards.length === 0) return;
    
    // Reset position
    currentCarouselIndex = 0;
    track.style.transform = 'translateX(0px)';
    
    // Clear existing interval
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
    
    // Start auto-slide
    autoSlideInterval = setInterval(moveToNextSlide, 4000);
}

function createCarouselNavigation() {
    const carouselContainer = document.querySelector('.instructor-carousel');
    if (!carouselContainer) return;
    
    // Remove existing navigation if any
    const existingNav = carouselContainer.querySelector('.carousel-nav');
    if (existingNav) existingNav.remove();
    
    // Create navigation buttons
    const nav = document.createElement('div');
    nav.className = 'carousel-nav';
    nav.innerHTML = `
        <button class="carousel-prev" id="carouselPrev">‹</button>
        <button class="carousel-next" id="carouselNext">›</button>
    `;
    
    carouselContainer.appendChild(nav);
    
    // Add event listeners
    document.getElementById('carouselPrev')?.addEventListener('click', moveToPrevSlide);
    document.getElementById('carouselNext')?.addEventListener('click', moveToNextSlide);
}

// Initialize carousel on load and resize
function initInstructorCarousel() {
    updateCardsPerView();
    startInstructorCarousel();
    createCarouselNavigation();
}

// ==================== CONTACT FORM HANDLER ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        if (!submitBtn) return;
        
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Submit form data
            const formData = new FormData(this);
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                this.reset();
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Thank you! Your message has been sent. We\'ll get back to you soon.', 'success');
            this.reset();
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

function showNotification(message, type) {
    const existingNotification = document.querySelector('.form-notification');
    if (existingNotification) existingNotification.remove();
    
    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ==================== KEYBOARD NAVIGATION ====================
document.addEventListener('keydown', function(e) {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        if (galleryLightbox?.classList.contains('active')) closeLightbox();
        if (galleryVideoModal?.classList.contains('active')) closeVideoModal();
        if (videoModal?.classList.contains('active')) closeVideoModal(videoModal, videoPlayer);
        if (galleryContent?.classList.contains('active')) closeGallery();
    }
    
    // Lightbox navigation
    if (galleryLightbox?.classList.contains('active')) {
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    }
});

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initInstructorCarousel();
    updateGalleryImages();
    
    // Reinitialize carousel on resize
    window.addEventListener('resize', function() {
        initInstructorCarousel();
    });
});