// Collection Page Navigation Script
// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

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

// Handle navigation links for collection pages
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // If it's a hash link (like #home, #collections), redirect to homepage
        if (href.startsWith('#')) {
            e.preventDefault();
            if (href === '#home') {
                window.location.href = 'index.html';
            } else {
                window.location.href = 'index.html' + href;
            }
        }
        // Otherwise, let the link work normally (for direct page links)
    });
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('threadTheoryCart')) || [];

// Update cart counter
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('threadTheoryCart')) || [];
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
                background: #dc3545;
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

function addToCart(productName, productPrice, productImage) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('threadTheoryCart', JSON.stringify(cart));
    
    // Show notification
    showNotification(`${productName} added to cart!`);
    
    // Update cart counter
    updateCartCounter();
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #25D366;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 600;
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

// Add event listeners to all "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', function() {
    // Update cart counter on page load
    updateCartCounter();
    
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productItem = this.closest('.product-item');
            const productName = productItem.querySelector('.product-name').textContent;
            const productPrice = productItem.querySelector('.product-price').textContent.replace('$', '');
            const productImage = productItem.querySelector('.product-img').src;
            
            addToCart(productName, productPrice, productImage);
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
    const animateElements = document.querySelectorAll('.collection-title, .collection-description, .product-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Product item hover effects
const productItems = document.querySelectorAll('.product-item');
productItems.forEach(item => {
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

// Smooth page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

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
        background: var(--primary-black);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
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