// Account Management System for Thread Theory

class AccountManager {
    constructor() {
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('threadTheoryUsers')) || [];
        this.init();
    }

    init() {
        // Check if user is already logged in
        const savedUser = localStorage.getItem('threadTheoryCurrentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showDashboard();
        }

        // Set up event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Register form
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }
    }

    handleLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        // Find user
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('threadTheoryCurrentUser', JSON.stringify(user));
            this.showDashboard();
            this.showNotification('Welcome back!', 'success');
        } else {
            this.showNotification('Invalid email or password', 'error');
        }
    }

    handleRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const userData = {
            id: Date.now().toString(),
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            phone: formData.get('phone'),
            role: formData.get('role'),
            joinDate: new Date().toISOString(),
            votes: [],
            orders: [],
            cart: []
        };

        // Add creator-specific data
        if (userData.role === 'creator') {
            userData.specialty = formData.get('specialty');
            userData.experience = formData.get('experience');
            userData.bio = formData.get('bio');
            userData.products = [];
            userData.commissions = [];
            userData.rating = 5;
            userData.completedProjects = 0;
        }

        // Check if email already exists
        if (this.users.find(u => u.email === userData.email)) {
            this.showNotification('Email already registered', 'error');
            return;
        }

        // Save user
        this.users.push(userData);
        localStorage.setItem('threadTheoryUsers', JSON.stringify(this.users));
        
        this.currentUser = userData;
        localStorage.setItem('threadTheoryCurrentUser', JSON.stringify(userData));
        
        this.showDashboard();
        this.showNotification('Account created successfully!', 'success');
    }

    showDashboard() {
        // Hide login/register tabs
        document.querySelector('.account-tabs').style.display = 'none';
        document.getElementById('login-tab').style.display = 'none';
        document.getElementById('register-tab').style.display = 'none';
        
        // Show dashboard
        const dashboard = document.getElementById('user-dashboard');
        dashboard.style.display = 'block';
        
        // Populate user info
        document.getElementById('user-name').textContent = this.currentUser.name;
        document.getElementById('user-role-display').textContent = 
            this.currentUser.role.charAt(0).toUpperCase() + this.currentUser.role.slice(1);
        document.getElementById('user-email-display').textContent = this.currentUser.email;
        document.getElementById('user-join-date').textContent = 
            new Date(this.currentUser.joinDate).toLocaleDateString();

        // Show creator-specific actions
        if (this.currentUser.role === 'creator') {
            document.getElementById('creator-actions').style.display = 'contents';
        }

        // Update cart counter
        if (window.updateCartCounter) {
            window.updateCartCounter();
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('threadTheoryCurrentUser');
        
        // Show login/register tabs
        document.querySelector('.account-tabs').style.display = 'flex';
        document.getElementById('login-tab').style.display = 'block';
        document.getElementById('user-dashboard').style.display = 'none';
        
        // Reset to login tab
        switchTab('login');
        
        this.showNotification('Logged out successfully', 'success');
        
        // Redirect to home after a short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }

    getCurrentUser() {
        return this.currentUser;
    }

    updateUser(userData) {
        if (!this.currentUser) return false;
        
        // Update current user
        Object.assign(this.currentUser, userData);
        
        // Update in users array
        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            this.users[userIndex] = this.currentUser;
            localStorage.setItem('threadTheoryUsers', JSON.stringify(this.users));
            localStorage.setItem('threadTheoryCurrentUser', JSON.stringify(this.currentUser));
            return true;
        }
        return false;
    }

    addVote(collections) {
        if (!this.currentUser) return false;
        
        const vote = {
            id: Date.now().toString(),
            collections: collections,
            timestamp: new Date().toISOString()
        };
        
        this.currentUser.votes.push(vote);
        this.updateUser(this.currentUser);
        return true;
    }

    getCart() {
        return this.currentUser ? this.currentUser.cart : JSON.parse(localStorage.getItem('threadTheoryCart')) || [];
    }

    updateCart(cart) {
        if (this.currentUser) {
            this.currentUser.cart = cart;
            this.updateUser(this.currentUser);
        } else {
            localStorage.setItem('threadTheoryCart', JSON.stringify(cart));
        }
    }

    showNotification(message, type = 'info') {
        // Use the existing notification system from script.js
        if (window.showNotification) {
            window.showNotification(message, type);
        } else {
            alert(message);
        }
    }
}

// Global functions for UI interactions
function switchTab(tabName) {
    // Remove active class from all tabs and buttons
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and button
    document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

function selectRole(role) {
    // Remove selected class from all role cards
    document.querySelectorAll('.role-card').forEach(card => card.classList.remove('selected'));
    
    // Add selected class to clicked card
    event.target.closest('.role-card').classList.add('selected');
    
    // Set role value
    document.getElementById('user-role').value = role;
    
    // Show/hide creator fields
    const creatorFields = document.getElementById('creator-fields');
    const registerBtn = document.getElementById('register-btn');
    
    if (role === 'creator') {
        creatorFields.style.display = 'block';
        // Make creator fields required
        document.getElementById('creator-specialty').required = true;
        document.getElementById('creator-experience').required = true;
    } else {
        creatorFields.style.display = 'none';
        // Remove required from creator fields
        document.getElementById('creator-specialty').required = false;
        document.getElementById('creator-experience').required = false;
    }
    
    // Enable register button
    registerBtn.disabled = false;
}

// Dashboard action functions
function viewProfile() {
    accountManager.showNotification('Profile management coming soon!', 'info');
}

function viewOrders() {
    accountManager.showNotification('Order history coming soon!', 'info');
}

function viewCart() {
    window.location.href = 'cart.html';
}

function viewVotes() {
    const user = accountManager.getCurrentUser();
    if (user && user.votes.length > 0) {
        const lastVote = user.votes[user.votes.length - 1];
        accountManager.showNotification(`Your last vote: ${lastVote.collections.join(', ')}`, 'info');
    } else {
        accountManager.showNotification('No votes recorded yet. Visit the Vote page!', 'info');
    }
}

function manageProducts() {
    accountManager.showNotification('Product management coming soon!', 'info');
}

function viewCommissions() {
    accountManager.showNotification('Commission management coming soon!', 'info');
}

function logout() {
    accountManager.logout();
}

// Initialize account manager when page loads
let accountManager;
document.addEventListener('DOMContentLoaded', function() {
    accountManager = new AccountManager();
});

// Export for use in other scripts
window.AccountManager = AccountManager;
window.accountManager = accountManager;