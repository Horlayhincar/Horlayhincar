// ==================== MOBILE MENU TOGGLE ====================
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

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
        videoPlayer.querySelector('source').src = videoSrc;
        videoPlayer.load();
        videoModal.classList.add('active');
        videoPlayer.play();
    });
});

// Close modal when X is clicked
closeModal.addEventListener('click', function() {
    videoModal.classList.remove('active');
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
});

// Close modal when clicking outside the video
videoModal.addEventListener('click', function(e) {
    if (e.target === videoModal) {
        videoModal.classList.remove('active');
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        videoModal.classList.remove('active');
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }
});

// ==================== FORM SUBMISSION HANDLER ====================
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Here you would typically send the data to a server
    // For example, using fetch() to send to your backend
    console.log('Form submitted with data:', data);
    
    // Show success message
    alert('Thank you for registering with AIMAAN! We will contact you shortly with more information about your chosen program.');
    
    // Reset form
    this.reset();
});

// ==================== GALLERY FILTER FUNCTIONALITY ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

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

// Load More Button (Optional - for future expansion)
const loadMoreBtn = document.getElementById('loadMoreBtn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
        // Add functionality to load more images from server
        alert('Load more functionality can be added here to fetch additional images');
    });
}

// Close modal when X is clicked
closeModal.addEventListener('click', function() {
    videoModal.classList.remove('active');
    modalVideo.pause();
    modalVideo.src = '';
});

// Close modal when clicking outside the video
videoModal.addEventListener('click', function(e) {
    if (e.target === videoModal) {
        videoModal.classList.remove('active');
        modalVideo.pause();
        modalVideo.src = '';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        videoModal.classList.remove('active');
        modalVideo.pause();
        modalVideo.src = '';
    }
});

// Automatic Sliding Carousel
let currentIndex = 0;

function startCarousel() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.instructor-card');
    const cardWidth = cards[0].offsetWidth + 20; // Width of each card + gap

    setInterval(() => {
        // Move to the next set of cards
        currentIndex += 4; // Slide by 4 cards at a time
        if (currentIndex >= cards.length) {
            currentIndex = 0; // Loop back to the first set of cards
        }

        // Update the transform property to slide the track
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }, 5000); // Change slides every 5 seconds
}

// Start the carousel when the page loads
document.addEventListener('DOMContentLoaded', startCarousel);