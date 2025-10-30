// Collection page functionality
function addToCart(name, price, image, productElement) {
    // Get available sizes and colors from the product element
    const sizeElements = productElement.querySelectorAll('.option-group:first-child .option-item');
    const colorElements = productElement.querySelectorAll('.option-group:last-child .option-item');
    
    const sizes = Array.from(sizeElements).map(el => el.textContent.trim());
    const colors = Array.from(colorElements).map(el => el.textContent.trim());
    
    showSizeColorModal(name, price, image, sizes, colors);
}

function showSizeColorModal(name, price, image, sizes, colors) {
    // Remove existing modal if any
    const existingModal = document.getElementById('size-color-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.id = 'size-color-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            padding: 30px;
            max-width: 400px;
            width: 90%;
            border: 1px solid rgba(251, 113, 133, 0.2);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            transform: scale(0.9);
            transition: transform 0.3s ease;
        ">
            <h3 style="
                font-family: serif;
                font-size: 1.5rem;
                color: #1f2937;
                margin-bottom: 20px;
                text-align: center;
            ">${name}</h3>
            
            <div class="size-selection" style="margin-bottom: 20px;">
                <label style="
                    display: block;
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 10px;
                ">Select Size:</label>
                <div class="size-options" style="
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                ">
                    ${sizes.map(size => `
                        <button class="size-option" data-size="${size}" style="
                            padding: 8px 16px;
                            border: 2px solid rgba(251, 113, 133, 0.3);
                            background: rgba(255, 255, 255, 0.8);
                            border-radius: 8px;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            font-weight: 500;
                        ">${size}</button>
                    `).join('')}
                </div>
            </div>
            
            <div class="color-selection" style="margin-bottom: 30px;">
                <label style="
                    display: block;
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 10px;
                ">Select Color:</label>
                <div class="color-options" style="
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                ">
                    ${colors.map(color => `
                        <button class="color-option" data-color="${color}" style="
                            padding: 8px 16px;
                            border: 2px solid rgba(251, 113, 133, 0.3);
                            background: rgba(255, 255, 255, 0.8);
                            border-radius: 8px;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            font-weight: 500;
                        ">${color}</button>
                    `).join('')}
                </div>
            </div>
            
            <div class="modal-actions" style="
                display: flex;
                gap: 15px;
                justify-content: center;
            ">
                <button onclick="closeSizeColorModal()" style="
                    padding: 12px 24px;
                    border: 2px solid rgba(251, 113, 133, 0.3);
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 12px;
                    cursor: pointer;
                    font-weight: 500;
                    color: #374151;
                ">Cancel</button>
                <button id="add-to-cart-confirm" onclick="confirmAddToCart('${name}', '${price}', '${image}')" disabled style="
                    padding: 12px 24px;
                    border: none;
                    background: linear-gradient(135deg, #f87171, #a855f7);
                    color: white;
                    border-radius: 12px;
                    cursor: pointer;
                    font-weight: 500;
                    opacity: 0.5;
                    transition: opacity 0.3s ease;
                ">Add to Cart</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
    
    // Add event listeners for size and color selection
    setupSizeColorSelection();
}

function setupSizeColorSelection() {
    let selectedSize = null;
    let selectedColor = null;
    
    // Size selection
    document.querySelectorAll('.size-option').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.size-option').forEach(b => {
                b.style.background = 'rgba(255, 255, 255, 0.8)';
                b.style.borderColor = 'rgba(251, 113, 133, 0.3)';
            });
            this.style.background = 'rgba(251, 113, 133, 0.2)';
            this.style.borderColor = 'rgba(251, 113, 133, 0.6)';
            selectedSize = this.dataset.size;
            checkSelections();
        });
    });
    
    // Color selection
    document.querySelectorAll('.color-option').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.color-option').forEach(b => {
                b.style.background = 'rgba(255, 255, 255, 0.8)';
                b.style.borderColor = 'rgba(251, 113, 133, 0.3)';
            });
            this.style.background = 'rgba(251, 113, 133, 0.2)';
            this.style.borderColor = 'rgba(251, 113, 133, 0.6)';
            selectedColor = this.dataset.color;
            checkSelections();
        });
    });
    
    function checkSelections() {
        const confirmBtn = document.getElementById('add-to-cart-confirm');
        if (selectedSize && selectedColor) {
            confirmBtn.disabled = false;
            confirmBtn.style.opacity = '1';
            confirmBtn.dataset.size = selectedSize;
            confirmBtn.dataset.color = selectedColor;
        }
    }
}

function closeSizeColorModal() {
    const modal = document.getElementById('size-color-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
        setTimeout(() => modal.remove(), 300);
    }
}

function confirmAddToCart(name, price, image) {
    const confirmBtn = document.getElementById('add-to-cart-confirm');
    const selectedSize = confirmBtn.dataset.size;
    const selectedColor = confirmBtn.dataset.color;

    const item = {
        id: Date.now().toString(),
        name: name,
        price: parseFloat(price.replace('$', '')),
        image: image,
        quantity: 1,
        size: selectedSize,
        color: selectedColor
    };

    // Check if user is logged in
    if (window.accountManager && window.accountManager.getCurrentUser()) {
        // Use API for logged-in users
        addToCartAPI(item);
    } else {
        // Use localStorage for guest users
        addToCartLocal(item);
    }

    closeSizeColorModal();
}

async function addToCartAPI(item) {
    try {
        const token = localStorage.getItem('threadTheoryToken');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                product_id: item.id,
                product_name: item.name,
                product_image: item.image,
                quantity: item.quantity,
                price: item.price,
                size: item.size,
                color: item.color
            })
        });

        const result = await response.json();

        if (result.success) {
            // Update local cart counter
            if (window.updateCartCounter) {
                window.updateCartCounter();
            }

            // Show success notification
            if (window.showNotification) {
                window.showNotification(`${item.name} (${item.size}, ${item.color}) added to cart!`, 'success');
            }
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Add to cart API error:', error);
        // Fallback to localStorage
        addToCartLocal(item);
    }
}

function addToCartLocal(item) {
    let cart = JSON.parse(localStorage.getItem('threadTheoryCart')) || [];

    // Check if item already exists with same size and color
    const existingItem = cart.find(cartItem =>
        cartItem.name === item.name &&
        cartItem.size === item.size &&
        cartItem.color === item.color
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(item);
    }

    // Save cart
    localStorage.setItem('threadTheoryCart', JSON.stringify(cart));

    // Update cart counter if available
    if (window.updateCartCounter) {
        window.updateCartCounter();
    }

    // Show notification
    if (window.showNotification) {
        window.showNotification(`${item.name} (${item.size}, ${item.color}) added to cart!`, 'success');
    } else {
        alert(`${item.name} (${item.size}, ${item.color}) added to cart!`);
    }
}

// Update add to cart buttons to use the new function
document.addEventListener('DOMContentLoaded', function() {
    // Update all add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productItem = this.closest('.product-item');
            const productName = productItem.querySelector('.product-name').textContent;
            const productPrice = productItem.querySelector('.product-price').textContent;
            const productImage = productItem.querySelector('.image-placeholder p').textContent;
            
            addToCart(productName, productPrice, productImage, productItem);
        });
    });
});

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