// Landing page transition
document.addEventListener('DOMContentLoaded', () => {
    const landingPage = document.querySelector('.landing-page');
    const mainContent = document.querySelector('.main-content');
    const enterBtn = document.querySelector('.enter-btn');
    const glitchText = document.querySelector('.glitch-text');

    // Add hover effect for glitch animation
    glitchText.addEventListener('mouseenter', () => {
        glitchText.classList.add('glitch-animate');
    });

    glitchText.addEventListener('mouseleave', () => {
        glitchText.classList.remove('glitch-animate');
    });

    // Handle enter button click
    enterBtn.addEventListener('click', () => {
        console.log('Enter button clicked'); // Debug log
        
        // Fade out landing page
        landingPage.style.opacity = '0';
        landingPage.style.transform = 'scale(1.1)';
        
        // Show and fade in main content
        mainContent.classList.remove('hidden');
        requestAnimationFrame(() => {
            mainContent.style.opacity = '1';
        });
        
        // Hide landing page after transition
        setTimeout(() => {
            landingPage.style.display = 'none';
        }, 1000);
    });
});

// Mobile menu functionality
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinksMobile = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksMobile.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksMobile.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Clear form
        this.reset();
    });
}

// Intersection Observer for fade-in animations
const fadeInOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px"
};

const fadeInOnScroll = new IntersectionObserver((entries, fadeInOnScroll) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        entry.target.classList.add('fade-in');
        fadeInOnScroll.unobserve(entry.target);
    });
}, fadeInOptions);

// Apply fade-in animation to sections and cards
document.querySelectorAll('.timeline-item, .education-card, .publication-card, .stat-card, section').forEach(el => {
    el.classList.add('fade-out');
    fadeInOnScroll.observe(el);
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Add hover effect to timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const landingPage = document.querySelector('.landing-page');
    const mainContent = document.querySelector('.main-content');
    const enterBtn = document.querySelector('.enter-btn');
    const glitchText = document.querySelector('.glitch-text');

    // Add hover effect for glitch animation
    glitchText.addEventListener('mouseenter', () => {
        glitchText.classList.add('glitch-animate');
    });

    glitchText.addEventListener('mouseleave', () => {
        glitchText.classList.remove('glitch-animate');
    });

    // Handle enter button click
    enterBtn.addEventListener('click', () => {
        // Fade out landing page
        landingPage.style.opacity = '0';
        landingPage.style.transform = 'scale(1.1)';
        
        // Show main content
        mainContent.classList.remove('hidden');
        mainContent.style.opacity = '0';
        
        // Use setTimeout to ensure proper transition timing
        setTimeout(() => {
            landingPage.style.display = 'none';
            mainContent.style.opacity = '1';
        }, 1000);
    });
});
