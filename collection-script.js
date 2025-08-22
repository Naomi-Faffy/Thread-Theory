// Collection page functionality
function addToCart(name, price, image) {
    const item = {
        id: Date.now().toString(),
        name: name,
        price: parseFloat(price.replace('$', '')),
        image: image,
        quantity: 1,
        size: 'M', // Default size
        color: 'Natural' // Default color
    };

    let cart = [];
    
    // Get cart from account manager or localStorage
    if (window.accountManager && window.accountManager.getCurrentUser()) {
        cart = window.accountManager.getCart();
    } else {
        cart = JSON.parse(localStorage.getItem('threadTheoryCart')) || [];
    }

    // Check if item already exists
    const existingItem = cart.find(cartItem => cartItem.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(item);
    }

    // Save cart
    if (window.accountManager && window.accountManager.getCurrentUser()) {
        window.accountManager.updateCart(cart);
    } else {
        localStorage.setItem('threadTheoryCart', JSON.stringify(cart));
    }

    // Update cart counter if available
    if (window.updateCartCounter) {
        window.updateCartCounter();
    }

    // Show notification
    if (window.showNotification) {
        window.showNotification(`${name} added to cart!`, 'success');
    } else {
        alert(`${name} added to cart!`);
    }
}

// Quick view functionality (placeholder)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('quick-view-btn')) {
        e.preventDefault();
        if (window.showNotification) {
            window.showNotification('Quick view coming soon!', 'info');
        } else {
            alert('Quick view coming soon!');
        }
    }
});