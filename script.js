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
        if (navLinks) {
            navLinks.classList.remove('active');
        }
    });
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById('navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
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
        }
    });
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

// Handle all "Watch Video" buttons
document.querySelectorAll('.watch-video-btn').forEach(button => {
    button.addEventListener('click', function() {
        const videoSrc = this.getAttribute('data-video');
        if (videoPlayer && videoModal) {
            videoPlayer.querySelector('source').src = videoSrc;
            videoPlayer.load();
            videoModal.classList.add('active');
            videoPlayer.play();
        }
    });
});

// Close modal when X is clicked
if (closeModal && videoModal && videoPlayer) {
    closeModal.addEventListener('click', function() {
        videoModal.classList.remove('active');
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    });
}

// Close modal when clicking outside the video
if (videoModal && videoPlayer) {
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            videoPlayer.pause();
            videoPlayer.currentTime = 0;
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
        videoModal.classList.remove('active');
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }
});

// ==================== FORM SUBMISSION HANDLER ====================
const registrationForm = document.getElementById('registrationForm');
if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        if (submitBtn) {
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            // Reset button after 3 seconds (in case form doesn't submit)
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// ==================== GALLERY TOGGLE FUNCTIONALITY ====================
const viewGalleriesBtn = document.getElementById('viewGalleriesBtn');
const galleryContent = document.getElementById('galleryContent');
const closeGalleriesBtn = document.getElementById('closeGalleriesBtn');

function openGallery() {
    if (galleryContent) {
        galleryContent.classList.add('active');
        
        // Hide the "View Galleries" button
        if (viewGalleriesBtn) {
            viewGalleriesBtn.style.display = 'none';
        }
        
        // Smooth scroll to gallery content
        setTimeout(() => {
            galleryContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        
        // Initialize gallery items animation
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }
}

function closeGallery() {
    if (galleryContent) {
        galleryContent.classList.remove('active');
        
        // Show the "View Galleries" button again and reset any inline styles
        if (viewGalleriesBtn) {
            viewGalleriesBtn.style.display = 'block';
            viewGalleriesBtn.style.margin = ''; // Reset any margin
            viewGalleriesBtn.style.float = ''; // Reset any float
            viewGalleriesBtn.style.position = ''; // Reset any position
            viewGalleriesBtn.style.left = ''; // Reset any left positioning
            viewGalleriesBtn.style.right = ''; // Reset any right positioning
        }
        
        // Smooth scroll back to top of gallery section
        setTimeout(() => {
            document.getElementById('gallery').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

// Event listeners for gallery toggle
if (viewGalleriesBtn) {
    viewGalleriesBtn.addEventListener('click', openGallery);
}

if (closeGalleriesBtn) {
    closeGalleriesBtn.addEventListener('click', closeGallery);
}

// Close gallery with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && galleryContent && galleryContent.classList.contains('active')) {
        closeGallery();
    }
});

// ==================== GALLERY FILTER FUNCTIONALITY ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hide');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    const itemCategory = item.getAttribute('data-category');
                    if (itemCategory === filterValue) {
                        item.classList.remove('hide');
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.classList.add('hide');
                        }, 300);
                    }
                }
            });
            
            // Update gallery images for lightbox
            updateGalleryImages();
        });
    });
}

// ==================== GALLERY LIGHTBOX (for images) ====================
const galleryLightbox = document.getElementById('galleryLightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImageIndex = 0;
let currentImages = [];

// Function to update gallery images array
function updateGalleryImages() {
    currentImages = Array.from(document.querySelectorAll('.gallery-item:not(.hide)'));
}

// Initialize on page load
updateGalleryImages();

// Open lightbox or video when clicking on gallery item
if (galleryItems.length > 0) {
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            if (!item.classList.contains('hide')) {
                const itemType = item.getAttribute('data-type');
                
                if (itemType === 'video') {
                    // Open video modal
                    const videoSrc = item.getAttribute('data-video');
                    openVideoModal(videoSrc);
                } else {
                    // Open image lightbox
                    const visibleItems = Array.from(document.querySelectorAll('.gallery-item:not(.hide)'));
                    currentImageIndex = visibleItems.indexOf(item);
                    currentImages = visibleItems;
                    openLightbox(item);
                }
            }
        });
    });
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

// Close lightbox
if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

// Close when clicking outside image
if (galleryLightbox) {
    galleryLightbox.addEventListener('click', function(e) {
        if (e.target === galleryLightbox) {
            closeLightbox();
        }
    });
}

// Previous image
if (lightboxPrev) {
    lightboxPrev.addEventListener('click', function(e) {
        e.stopPropagation();
        if (currentImages.length === 0) return;
        
        // Skip videos, only navigate through images
        let attempts = 0;
        do {
            currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
            attempts++;
        } while (currentImages[currentImageIndex].getAttribute('data-type') === 'video' && attempts < currentImages.length);
        
        openLightbox(currentImages[currentImageIndex]);
    });
}

// Next image
if (lightboxNext) {
    lightboxNext.addEventListener('click', function(e) {
        e.stopPropagation();
        if (currentImages.length === 0) return;
        
        // Skip videos, only navigate through images
        let attempts = 0;
        do {
            currentImageIndex = (currentImageIndex + 1) % currentImages.length;
            attempts++;
        } while (currentImages[currentImageIndex].getAttribute('data-type') === 'video' && attempts < currentImages.length);
        
        openLightbox(currentImages[currentImageIndex]);
    });
}

// Keyboard navigation for image lightbox
document.addEventListener('keydown', function(e) {
    if (galleryLightbox && galleryLightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            lightboxPrev.click();
        } else if (e.key === 'ArrowRight') {
            lightboxNext.click();
        }
    }
});

// ==================== GALLERY VIDEO MODAL ====================
const galleryVideoModal = document.getElementById('galleryVideoModal');
const galleryVideoPlayer = document.getElementById('galleryVideoPlayer');
const galleryVideoClose = document.getElementById('galleryVideoClose');

function openVideoModal(videoSrc) {
    if (galleryVideoPlayer && galleryVideoModal) {
        galleryVideoPlayer.querySelector('source').src = videoSrc;
        galleryVideoPlayer.load();
        galleryVideoModal.classList.add('active');
        galleryVideoPlayer.play();
        document.body.style.overflow = 'hidden';
    }
}

function closeVideoModal() {
    if (galleryVideoModal && galleryVideoPlayer) {
        galleryVideoModal.classList.remove('active');
        galleryVideoPlayer.pause();
        galleryVideoPlayer.currentTime = 0;
        document.body.style.overflow = '';
    }
}

// Close video modal when X is clicked
if (galleryVideoClose) {
    galleryVideoClose.addEventListener('click', closeVideoModal);
}

// Close video modal when clicking outside
if (galleryVideoModal) {
    galleryVideoModal.addEventListener('click', function(e) {
        if (e.target === galleryVideoModal) {
            closeVideoModal();
        }
    });
}

// Close video modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && galleryVideoModal && galleryVideoModal.classList.contains('active')) {
        closeVideoModal();
    }
});

// ==================== INSTRUCTOR CAROUSEL FUNCTIONALITY ====================
let currentCarouselIndex = 0;
let autoSlideInterval;
let cardsToShow = 4;

function updateCardsToShow() {
    if (window.innerWidth <= 480) {
        cardsToShow = 1;
    } else if (window.innerWidth <= 768) {
        cardsToShow = 2;
    } else if (window.innerWidth <= 1024) {
        cardsToShow = 3;
    } else {
        cardsToShow = 4;
    }
}

function moveToNextSlide() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.instructor-card');
    
    if (!track || cards.length === 0) return;
    
    // Update cards to show based on current screen size
    updateCardsToShow();
    
    // Calculate total slides
    const totalSlides = Math.ceil(cards.length / cardsToShow);
    
    // Move to the next slide
    currentCarouselIndex = (currentCarouselIndex + 1) % totalSlides;
    
    // Calculate the translateX value
    const cardWidth = cards[0].offsetWidth + 20; // card width + gap
    const translateX = -currentCarouselIndex * cardWidth * cardsToShow;
    
    // Apply the transform
    track.style.transform = `translateX(${translateX}px)`;
}

function startInstructorCarousel() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.instructor-card');
    
    if (!track || cards.length === 0) return;
    
    // Update initial cards to show
    updateCardsToShow();
    
    // Reset position
    currentCarouselIndex = 0;
    track.style.transform = 'translateX(0px)';
    
    // Clear existing interval
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
    
    // Auto slide every 5 seconds
    autoSlideInterval = setInterval(() => {
        moveToNextSlide();
    }, 5000);
}

// Initialize carousel when page loads and on window resize
document.addEventListener('DOMContentLoaded', function() {
    startInstructorCarousel();
    
    // Reinitialize carousel on window resize
    window.addEventListener('resize', function() {
        startInstructorCarousel();
    });
});

// ==================== INITIALIZE GALLERY ON LOAD ====================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery images array
    updateGalleryImages();
});