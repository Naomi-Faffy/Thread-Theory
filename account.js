// Account Manager - Handles user authentication and data management
class AccountManager {
    constructor() {
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('threadTheoryUsers')) || [];
        this.loadCurrentUser();
    }

    loadCurrentUser() {
        const userData = localStorage.getItem('threadTheoryCurrentUser');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
    }

    register(userData) {
        // Normalize inputs for uniqueness checks
        const email = (userData.email || '').trim().toLowerCase();
        const name = (userData.name || '').trim();

        // Validate required fields
        if (!email || !name || !userData.password) {
            return { ok: false, reason: 'missing_fields' };
        }

        // Enforce unique email
        if (this.users.some(u => (u.email || '').toLowerCase() === email)) {
            return { ok: false, reason: 'email_taken' };
        }

        const newUser = {
            id: Date.now().toString(),
            name: name,
            email: email,
            password: userData.password, // In real app, this would be hashed
            type: userData.type,
            specialty: userData.specialty || '',
            experience: userData.experience || 0,
            bio: userData.bio || '',
            phone: userData.phone || '',
            address: userData.address || '',
            createdAt: new Date().toISOString(),
            cart: [],
            votes: [],
            orders: []
        };

        this.users.push(newUser);
        localStorage.setItem('threadTheoryUsers', JSON.stringify(this.users));
        
        // Auto login
        this.currentUser = newUser;
        localStorage.setItem('threadTheoryCurrentUser', JSON.stringify(newUser));
        
        // Redirect to about page after successful registration
        window.location.href = 'about.html';
        
        return { ok: true, user: newUser };
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            this.currentUser = user;
            localStorage.setItem('threadTheoryCurrentUser', JSON.stringify(user));
            // Redirect to about page after successful login
            window.location.href = 'about.html';
            return true;
        }
        return false;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('threadTheoryCurrentUser');
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getCart() {
        if (this.currentUser) {
            return this.currentUser.cart || [];
        }
        return JSON.parse(localStorage.getItem('threadTheoryCart')) || [];
    }

    updateCart(cart) {
        if (this.currentUser) {
            this.currentUser.cart = cart;
            this.updateUserData();
        } else {
            localStorage.setItem('threadTheoryCart', JSON.stringify(cart));
        }
    }

    addVote(vote) {
        if (this.currentUser) {
            this.currentUser.votes = this.currentUser.votes || [];
            this.currentUser.votes.push(vote);
            this.updateUserData();
        }
    }

    updateUserData() {
        if (this.currentUser) {
            // Update in users array
            const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
            if (userIndex > -1) {
                this.users[userIndex] = this.currentUser;
                localStorage.setItem('threadTheoryUsers', JSON.stringify(this.users));
            }
            
            // Update current user
            localStorage.setItem('threadTheoryCurrentUser', JSON.stringify(this.currentUser));
        }
    }
}

// Initialize account manager globally
window.accountManager = new AccountManager();

// Cart counter functionality
function updateCartCounter() {
    const cartCounters = document.querySelectorAll('.cart-counter');
    let cart = [];
    
    if (window.accountManager && window.accountManager.getCurrentUser()) {
        cart = window.accountManager.getCart();
    } else {
        cart = JSON.parse(localStorage.getItem('threadTheoryCart')) || [];
    }
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCounters.forEach(counter => {
        if (totalItems > 0) {
            counter.textContent = totalItems;
            counter.style.display = 'block';
        } else {
            counter.style.display = 'none';
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Make functions globally available
window.updateCartCounter = updateCartCounter;
window.showNotification = showNotification;

// Initialize cart counter on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCounter();
});