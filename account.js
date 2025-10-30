//adde Account Manager - Handles user authentication and data management
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

    async register(userData) {
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

        // Save to database
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newUser.name,
                    email: newUser.email,
                    password: newUser.password,
                    user_type: newUser.type,
                    specialty: newUser.specialty,
                    experience_years: newUser.experience,
                    bio: newUser.bio,
                    phone: newUser.phone,
                    address: newUser.address
                })
            });

            const result = await response.json();
            if (result.success) {
                // Update local user with database ID
                newUser.id = result.user.id;
                // Remove duplicate push since we already pushed above
                const userIndex = this.users.findIndex(u => u.id === Date.now().toString());
                if (userIndex > -1) {
                    this.users[userIndex] = newUser;
                }
                localStorage.setItem('threadTheoryUsers', JSON.stringify(this.users));
            } else {
                console.error('Failed to save user to database:', result.message);
                // Still keep user in local storage
            }
        } catch (error) {
            console.error('Failed to save user to database:', error);
            // Still keep user in local storage
        }

        // Auto login
        this.currentUser = newUser;
        localStorage.setItem('threadTheoryCurrentUser', JSON.stringify(newUser));

        // Show profile navigation for creators and redirect
        if (newUser.type === 'creator') {
            // Show profile navigation
            const profileNav = document.getElementById('profile-nav');
            if (profileNav) {
                profileNav.style.display = 'block';
            }
            // Refresh creators page if we're on it
            if (window.location.pathname.includes('creators.html') && window.refreshCreators) {
                window.refreshCreators();
            }
            // Redirect to creator profile setup page
            setTimeout(() => {
                window.location.href = 'creator-profile.html';
            }, 1500);
        } else {
            // Redirect to collections page for customers
            setTimeout(() => {
                window.location.href = 'index.html#collections';
            }, 1500);
        }
        
        return { ok: true, user: newUser };
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            this.currentUser = user;
            localStorage.setItem('threadTheoryCurrentUser', JSON.stringify(user));

            // Sync cart from localStorage to account manager
            this.syncCartOnLogin();

            // Show profile navigation for creators
            if (user.type === 'creator') {
                const profileNav = document.getElementById('profile-nav');
                if (profileNav) {
                    profileNav.style.display = 'block';
                }
            }

            // Redirect based on user type
            if (user.type === 'creator') {
                // Check if creator has completed profile
                if (user.specialty && user.bio) {
                    window.location.href = 'creators.html'; // Go to creators page to view profile
                } else {
                    window.location.href = 'creator-profile.html'; // Go to profile setup
                }
            } else {
                window.location.href = 'index.html#collections';
            }
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

    // Sync localStorage cart with account manager cart when user logs in
    syncCartOnLogin() {
        if (this.currentUser) {
            const localCart = JSON.parse(localStorage.getItem('threadTheoryCart')) || [];
            if (localCart.length > 0 && (!this.currentUser.cart || this.currentUser.cart.length === 0)) {
                // Merge local cart into account cart
                this.currentUser.cart = localCart;
                this.updateUserData();
                // Clear localStorage after syncing
                localStorage.removeItem('threadTheoryCart');
            }
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