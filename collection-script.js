// Collection Page Functionality

// Add to cart functionality
function addToCart(productName, productPrice, productImage) {
    // Parse price (remove $ and convert to number)
    const price = parseFloat(productPrice.replace('$', ''));
    
    const product = {
        id: Date.now().toString(),
        name: productName,
        price: price,
        quantity: 1,
        image: productImage || 'placeholder.jpg'
    };

    // Get current cart
    let cart = [];
    if (window.accountManager && window.accountManager.getCurrentUser()) {
        cart = window.accountManager.getCart();
    } else {
        cart = JSON.parse(localStorage.getItem('threadTheoryCart')) || [];
    }

    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    
    if (existingProductIndex > -1) {
        // Increase quantity if product exists
        cart[existingProductIndex].quantity += 1;
    } else {
        // Add new product to cart
        cart.push(product);
    }

    // Save cart
    if (window.accountManager && window.accountManager.getCurrentUser()) {
        window.accountManager.updateCart(cart);
    } else {
        localStorage.setItem('threadTheoryCart', JSON.stringify(cart));
    }

    // Update cart counter
    if (window.updateCartCounter) {
        window.updateCartCounter();
    }

    // Show notification
    if (window.showNotification) {
        window.showNotification(`${productName} added to cart!`, 'success');
    } else {
        alert(`${productName} added to cart!`);
    }
}

// Quick view functionality
document.addEventListener('DOMContentLoaded', function() {
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const productItem = this.closest('.product-item');
            const productName = productItem.querySelector('.product-name').textContent;
            const productPrice = productItem.querySelector('.product-price').textContent;
            const productImage = productItem.querySelector('.image-placeholder p').textContent;
            
            showQuickView(productName, productPrice, productImage);
        });
    });

    // Add hover effects to product items
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.product-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.product-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
});

// Quick view modal functionality
function showQuickView(productName, productPrice, productImage) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('quick-view-modal');
    
    if (!modal) {
        modal = createQuickViewModal();
        document.body.appendChild(modal);
    }
    
    // Populate modal content
    modal.querySelector('.modal-product-name').textContent = productName;
    modal.querySelector('.modal-product-price').textContent = productPrice;
    modal.querySelector('.modal-product-image').textContent = productImage;
    
    // Update add to cart button
    const addToCartBtn = modal.querySelector('.modal-add-to-cart');
    addToCartBtn.onclick = function() {
        addToCart(productName, productPrice, productImage);
        closeQuickView();
    };
    
    // Show modal
    modal.classList.add('active');
}

function createQuickViewModal() {
    const modal = document.createElement('div');
    modal.id = 'quick-view-modal';
    modal.className = 'quick-view-modal';
    
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeQuickView()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <button class="close-modal" onclick="closeQuickView()">&times;</button>
                <div class="modal-body">
                    <div class="modal-image">
                        <div class="image-placeholder">
                            <p class="modal-product-image"></p>
                            <span class="placeholder-text">Your image will go here</span>
                        </div>
                    </div>
                    <div class="modal-info">
                        <h2 class="modal-product-name"></h2>
                        <p class="modal-product-price"></p>
                        <p class="modal-product-description">
                            This beautiful handcrafted piece is made with premium materials and attention to detail. 
                            Each item is unique and made to order, ensuring you receive a one-of-a-kind piece.
                        </p>
                        <div class="modal-actions">
                            <button class="modal-add-to-cart">Add to Cart</button>
                            <button class="modal-contact" onclick="contactForCustomOrder()">Custom Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return modal;
}

function closeQuickView() {
    const modal = document.getElementById('quick-view-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function contactForCustomOrder() {
    const modal = document.getElementById('quick-view-modal');
    const productName = modal.querySelector('.modal-product-name').textContent;
    
    const message = `Hi! I'm interested in a custom order based on the ${productName}. Could we discuss customization options and pricing? Thank you!`;
    const whatsappUrl = `https://wa.me/263786018957?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    closeQuickView();
}

// Add styles for quick view modal
const quickViewStyles = `
    .quick-view-modal {
        position: fixed;
        inset: 0;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .quick-view-modal.active {
        opacity: 1;
        visibility: visible;
    }
    
    .quick-view-modal .modal-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }
    
    .quick-view-modal .modal-content {
        background: white;
        border-radius: 20px;
        max-width: 600px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        transform: scale(0.9) translateY(20px);
        transition: transform 0.3s ease;
    }
    
    .quick-view-modal.active .modal-content {
        transform: scale(1) translateY(0);
    }
    
    .quick-view-modal .close-modal {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #6b7280;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        z-index: 10;
    }
    
    .quick-view-modal .close-modal:hover {
        background: #f3f4f6;
        color: #1f2937;
    }
    
    .quick-view-modal .modal-body {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        padding: 30px;
    }
    
    .quick-view-modal .modal-image {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .quick-view-modal .modal-image .image-placeholder {
        width: 100%;
        height: 250px;
        background: var(--off-white);
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--charcoal);
        border: 2px dashed var(--border-color);
    }
    
    .quick-view-modal .modal-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .quick-view-modal .modal-product-name {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--primary-black);
        margin-bottom: 10px;
    }
    
    .quick-view-modal .modal-product-price {
        font-size: 1.3rem;
        font-weight: 600;
        color: var(--primary-black);
        margin-bottom: 15px;
    }
    
    .quick-view-modal .modal-product-description {
        color: var(--charcoal);
        line-height: 1.6;
        margin-bottom: 25px;
    }
    
    .quick-view-modal .modal-actions {
        display: flex;
        gap: 15px;
    }
    
    .quick-view-modal .modal-add-to-cart,
    .quick-view-modal .modal-contact {
        padding: 12px 24px;
        border: none;
        border-radius: 25px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        flex: 1;
    }
    
    .quick-view-modal .modal-add-to-cart {
        background: var(--primary-black);
        color: white;
    }
    
    .quick-view-modal .modal-add-to-cart:hover {
        background: var(--charcoal);
        transform: translateY(-2px);
    }
    
    .quick-view-modal .modal-contact {
        background: #25D366;
        color: white;
    }
    
    .quick-view-modal .modal-contact:hover {
        background: #128C7E;
        transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
        .quick-view-modal .modal-body {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 20px;
        }
        
        .quick-view-modal .modal-actions {
            flex-direction: column;
        }
    }
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = quickViewStyles;
document.head.appendChild(styleSheet);