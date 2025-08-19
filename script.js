// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Update cart counter
function updateCartCounter() {
    let cart = [];
    
    // Check if user is logged in and get their cart
    if (window.accountManager && window.accountManager.getCurrentUser()) {
        cart = window.accountManager.getCart();
    } else {
        cart = JSON.parse(localStorage.getItem('threadTheoryCart')) || [];
    }
    
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Find cart link and add counter
    const cartLink = document.querySelector('a[href="cart.html"]');
    if (cartLink) {
        // Remove existing counter
        const existingCounter = cartLink.querySelector('.cart-counter');
        if (existingCounter) {
            existingCounter.remove();
        }
        
        // Add new counter if there are items
        if (cartCount > 0) {
            const counter = document.createElement('span');
            counter.className = 'cart-counter';
            counter.textContent = cartCount;
            counter.style.cssText = `
                position: absolute;
                top: -8px;
                right: -8px;
                background: #8b5cf6;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            `;
            cartLink.style.position = 'relative';
            cartLink.appendChild(counter);
        }
    }
}

// Update cart counter on page load
document.addEventListener('DOMContentLoaded', updateCartCounter);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links (only for hash links on same page)
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Only prevent default for hash links that exist on current page
        if (href.startsWith('#')) {
            const targetSection = document.querySelector(href);
            if (targetSection) {
                e.preventDefault();
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
        // Let other links work normally (like page navigation)
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        // Simple validation
        if (email && isValidEmail(email)) {
            // Simulate form submission
            showNotification('Thank you for subscribing!', 'success');
            e.target.reset();
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2F4F2F' : type === 'error' ? '#d32f2f' : '#333'};
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Collection button handling
document.addEventListener('DOMContentLoaded', function() {
    const collectionButtons = document.querySelectorAll('.collection-btn');
    collectionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const collectionItem = this.closest('.collection-item');
            const collectionTitle = collectionItem.querySelector('.collection-title').textContent.toLowerCase();
            
            // Map collection names to their respective pages
            const collectionPages = {
                'jerseys': 'jerseys.html',
                'shrugs': 'shrugs.html',
                'skirts': 'skirts.html',
                'dresses': 'dresses.html',
                'tops': 'tops.html',
                'shorts': 'shorts.html',
                'bags': 'bags.html',
                'jumpsuits': 'jumpsuits.html',
                'two piece': 'two-piece.html',
                'bottoms': 'bottoms.html',
                'hats': 'hats.html',
                'accessories': 'accessories.html',
                'shoes': 'shoes.html',
                'hair': 'hair.html',
                'jewellery': 'jewellery.html',
                'men': 'men.html',
                'home': 'home.html',
                'customization': 'customization.html'
            };
            
            const targetPage = collectionPages[collectionTitle];
            if (targetPage) {
                window.location.href = targetPage;
            }
        });
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.section-title, .about-description, .collection-item, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Collection item hover effects
const collectionItems = document.querySelectorAll('.collection-item');
collectionItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const image = item.querySelector('.image-placeholder');
        if (image) {
            image.style.transform = 'scale(1.1)';
        }
    });
    
    item.addEventListener('mouseleave', () => {
        const image = item.querySelector('.image-placeholder');
        if (image) {
            image.style.transform = 'scale(1)';
        }
    });
});

// Add click handlers for collection buttons
const collectionButtons = document.querySelectorAll('.collection-btn');
collectionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const collectionName = button.closest('.collection-item').querySelector('.collection-title').textContent;
        
        // Map collection names to their respective pages
        const collectionPages = {
            'Jerseys': 'jerseys.html',
            'Shrugs': 'shrugs.html',
            'Skirts': 'skirts.html',
            'Dresses': 'dresses.html',
            'Tops': 'tops.html',
            'Shorts': 'shorts.html',
            'Bags': 'bags.html',
            'Jumpsuits': 'jumpsuits.html',
            'Two Piece': 'two-piece.html',
            'Bottoms': 'bottoms.html',
            'Hats': 'hats.html',
            'Accessories': 'accessories.html',
            'Shoes': 'shoes.html',
            'Hair': 'hair.html',
            'Jewellery': 'jewellery.html'
        };
        
        const pageName = collectionPages[collectionName];
        if (pageName) {
            window.location.href = pageName;
        } else {
            showNotification(`${collectionName} collection page coming soon!`, 'info');
        }
    });
});

// Floating bubbles interaction
document.addEventListener('mousemove', (e) => {
    const bubbles = document.querySelectorAll('.bubble');
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    bubbles.forEach((bubble, index) => {
        const rect = bubble.getBoundingClientRect();
        const bubbleX = rect.left + rect.width / 2;
        const bubbleY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(mouseX - bubbleX, 2) + Math.pow(mouseY - bubbleY, 2)
        );
        
        if (distance < 200) {
            const force = (200 - distance) / 200;
            const angle = Math.atan2(bubbleY - mouseY, bubbleX - mouseX);
            const moveX = Math.cos(angle) * force * 20;
            const moveY = Math.sin(angle) * force * 20;
            
            bubble.style.transform = `translate(${moveX}px, ${moveY}px)`;
            bubble.style.opacity = Math.min(0.3, 0.1 + force * 0.2);
        } else {
            bubble.style.transform = 'translate(0, 0)';
            bubble.style.opacity = '0.1';
        }
    });
});

// Smooth page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add loading animation for images (when real images are added)
function addImageLoadingEffect() {
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    
    imagePlaceholders.forEach(placeholder => {
        placeholder.style.position = 'relative';
        placeholder.style.overflow = 'hidden';
        
        // Add shimmer effect
        const shimmer = document.createElement('div');
        shimmer.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            animation: shimmer 2s infinite;
        `;
        
        placeholder.appendChild(shimmer);
    });
    
    // Add shimmer keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize loading effects
document.addEventListener('DOMContentLoaded', addImageLoadingEffect);

// Add scroll-to-top functionality
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Create scroll-to-top button
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--deep-purple);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(177, 156, 217, 0.4);
        backdrop-filter: blur(10px);
    `;
    
    button.addEventListener('click', scrollToTop);
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
};

// Initialize scroll-to-top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);