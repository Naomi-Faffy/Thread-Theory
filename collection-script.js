// Collection Page Specific JavaScript

// Product interaction handlers
document.addEventListener('DOMContentLoaded', () => {
    // Quick view button handlers
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productName = btn.closest('.product-item').querySelector('.product-name').textContent;
            showNotification(`Quick view for ${productName} - Feature coming soon!`, 'info');
        });
    });

    // Add to cart button handlers
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productName = btn.closest('.product-item').querySelector('.product-name').textContent;
            showNotification(`${productName} added to cart!`, 'success');
        });
    });

    // Product item click handlers
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.addEventListener('click', () => {
            const productName = item.querySelector('.product-name').textContent;
            showNotification(`Opening ${productName} details - Feature coming soon!`, 'info');
        });
    });
});

// Enhanced product hover effects
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

// Smooth scroll for back button
const backBtn = document.querySelector('.back-btn');
if (backBtn) {
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'index.html#collections';
    });
}

// Image placeholder interaction
const imagePlaceholders = document.querySelectorAll('.image-placeholder');
imagePlaceholders.forEach(placeholder => {
    placeholder.addEventListener('click', () => {
        showNotification('Click here to upload your product image!', 'info');
    });
});

// Notification system (reuse from main script if not already loaded)
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
        background: ${type === 'success' ? 'var(--deep-purple)' : type === 'error' ? '#d32f2f' : 'var(--primary-purple)'};
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 30px rgba(177, 156, 217, 0.3);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
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

// Add loading animation for when images are uploaded
function addImageUploadEffect() {
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    
    imagePlaceholders.forEach(placeholder => {
        // Add upload hint on hover
        placeholder.addEventListener('mouseenter', () => {
            const hintText = placeholder.querySelector('.placeholder-text');
            if (hintText) {
                hintText.textContent = 'Click to upload image';
                hintText.style.color = 'var(--primary-purple)';
            }
        });
        
        placeholder.addEventListener('mouseleave', () => {
            const hintText = placeholder.querySelector('.placeholder-text');
            if (hintText) {
                hintText.textContent = 'Your image will go here';
                hintText.style.color = '';
            }
        });
    });
}

// Initialize upload effects
document.addEventListener('DOMContentLoaded', addImageUploadEffect);

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

// Observe product items for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
});