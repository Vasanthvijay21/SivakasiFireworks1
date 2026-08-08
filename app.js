// Initialize App
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCategory = 'ALL PRODUCTS';
const WHATSAPP_NUMBER = "917904216920"; // From source

// DOM Elements
const productGrid = document.getElementById('products');
const categoryTabs = document.getElementById('categoryTabs');
const searchInput = document.getElementById('searchInput');
const cartCount = document.getElementById('cartCount');
const cartTotalBtn = document.getElementById('cartTotalBtn');
const floatingCartBtn = document.getElementById('floatingCartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const custState = document.getElementById('custState');
const checkoutForm = document.getElementById('checkoutForm');
const confirmOrderBtn = document.getElementById('confirmOrderBtn');

// Extract Unique Categories
const categories = ['ALL PRODUCTS', ...new Set(products.map(p => p.category))];

function init() {
    renderCategories();
    renderProducts();
    updateCartUI();
    
    // Event Listeners
    searchInput.addEventListener('input', renderProducts);
    floatingCartBtn.addEventListener('click', openCart);
    closeCart.addEventListener('click', () => cartModal.style.display = 'none');
    custState.addEventListener('change', calculateTotals);
    
    // Form Inputs Trigger Recalculation/Validation
    checkoutForm.addEventListener('input', calculateTotals);
    confirmOrderBtn.addEventListener('click', handleCheckout);
    
    // ✨ THE FIX: Event listener for the Cart's Continue Shopping button ✨
    document.getElementById('continueShoppingBtn').addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Event listener for the Success Modal's Continue Shopping button
    document.getElementById('successContinueBtn').addEventListener('click', () => {
        document.getElementById('successModal').style.display = 'none';
        cartModal.style.display = 'none';
    });
}

function renderCategories() {
    categoryTabs.innerHTML = categories.map(cat => 
        `<button class="cat-btn ${cat === currentCategory ? 'active' : ''}" onclick="setCategory('${cat}')">${cat}</button>`
    ).join('');
}

function setCategory(cat) {
    currentCategory = cat;
    renderCategories();
    renderProducts();
}

function renderProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    
    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm);
        const matchesCategory = currentCategory === 'ALL PRODUCTS' || p.category === currentCategory;
        return matchesSearch && matchesCategory;
    });

    productGrid.innerHTML = filteredProducts.map(p => {
        const inCart = cart.find(item => item.id === p.id);
        const qty = inCart ? inCart.quantity : 0;
        
        return `
        <div class="product-card">
            <div class="product-img-placeholder">🎆</div>
            <span class="product-cat">${p.category}</span>
            <h3 class="product-name">${p.name}</h3>
            <span class="product-pack">Pack: ${p.pack}</span>
            <div class="price-container">
                <span class="actual-price">₹${p.actualPrice}</span>
                <span class="discount-price">₹${p.discountPrice}</span>
            </div>
            ${qty > 0 ? `
                <div class="qty-controls">
                    <button class="qty-btn" onclick="updateQty('${p.id}', -1)">-</button>
                    <span class="qty-val">${qty}</span>
                    <button class="qty-btn" onclick="updateQty('${p.id}', 1)">+</button>
                </div>
            ` : `
                <button class="btn-add" onclick="updateQty('${p.id}', 1)">Add to Cart</button>
            `}
        </div>`;
    }).join('');
}

function updateQty(id, change) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    
    if (existing) {
        existing.quantity += change;
        if (existing.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        }
    } else if (change > 0) {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    renderProducts();
    updateCartUI();
    if(cartModal.style.display === 'block') renderCartItems();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.discountPrice * item.quantity), 0);
    
    cartCount.innerText = totalQty;
    cartTotalBtn.innerText = subtotal;
    floatingCartBtn.style.display = totalQty > 0 ? 'block' : 'none';
}

function openCart() {
    renderCartItems();
    cartModal.style.display = 'block';
}

function renderCartItems() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center">Your cart is empty.</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">₹${item.discountPrice} × ${item.quantity} = ₹${item.discountPrice * item.quantity}</div>
                </div>
                <div class="qty-controls" style="width: 100px;">
                    <button class="qty-btn" onclick="updateQty('${item.id}', -1)">-</button>
                    <span class="qty-val">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
                </div>
            </div>
        `).join('');
    }
    calculateTotals();
}

function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.discountPrice * item.quantity), 0);
    const state = custState.value;
    
    let minimum = 5000;
    let gst = 0;
    const packing = 100;
    
    // Exact rules requested
    if (state === 'Tamil Nadu') {
        minimum = 3000; //[cite: 1]
        document.getElementById('gstRow').style.display = 'none';
    } else if (state) {
        minimum = 5000; //[cite: 1]
        gst = Math.round(subtotal * 0.18);
        document.getElementById('gstRow').style.display = 'flex';
    }
    
    const grandTotal = subtotal + gst + packing;
    
    document.getElementById('summarySubtotal').innerText = `₹${subtotal}`;
    document.getElementById('summaryGST').innerText = `₹${gst}`;
    document.getElementById('summaryGrandTotal').innerText = `₹${grandTotal}`;
    
    validateCheckout(subtotal, minimum);
}

function validateCheckout(subtotal, minimum) {
    const warningMsg = document.getElementById('minOrderWarning');
    const formValid = checkoutForm.checkValidity();
    const state = custState.value;
    
    if (cart.length === 0) {
        warningMsg.style.display = 'block';
        warningMsg.innerText = "Cart is empty.";
        confirmOrderBtn.disabled = true;
        return;
    }
    
    if (state && subtotal < minimum) {
        warningMsg.style.display = 'block';
        const diff = minimum - subtotal;
        warningMsg.innerText = state === 'Tamil Nadu' 
            ? `Please add ₹${diff} more to reach the minimum order value of ₹3,000.`
            : `Please add ₹${diff} more to reach the minimum order value of ₹5,000 for orders outside Tamil Nadu.`;
        confirmOrderBtn.disabled = true;
    } else if (!formValid) {
        warningMsg.style.display = 'block';
        warningMsg.innerText = "Please fill all mandatory address details correctly.";
        confirmOrderBtn.disabled = true;
    } else {
        warningMsg.style.display = 'none';
        confirmOrderBtn.disabled = false;
    }
}

function generateOrderId() {
    const now = new Date();
    // Use August 2026 for context format requirements
    const dateStr = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`;
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `SC-${dateStr}-${random}`;
}

function handleCheckout() {
    const orderId = generateOrderId();
    const state = custState.value;
    const subtotal = cart.reduce((sum, item) => sum + (item.discountPrice * item.quantity), 0);
    const packing = 100;
    const gst = state === 'Tamil Nadu' ? 0 : Math.round(subtotal * 0.18);
    const grandTotal = subtotal + gst + packing;
    
    // Generate WhatsApp Text
    let text = `*SIVAKASI CRACKERS*\n*NEW ORDER*\n━━━━━━━━━━━━━━━━━━\n\n`;
    text += `Order ID: ${orderId}\n\n`;
    text += `Customer Name: ${document.getElementById('custName').value.trim()}\n`;
    text += `Mobile: ${document.getElementById('custMobile').value.trim()}\n\n`;
    text += `Address:\n${document.getElementById('custAddress').value.trim()}\n`;
    text += `${document.getElementById('custCity').value.trim()}, ${state} - ${document.getElementById('custPincode').value.trim()}\n\n`;
    
    text += `━━━━━━━━━━━━━━━━━━\n*ORDER DETAILS*\n━━━━━━━━━━━━━━━━━━\n\n`;
    cart.forEach(item => {
        text += `${item.name} × ${item.quantity} = ₹${item.discountPrice * item.quantity}\n`;
    });
    
    text += `\n━━━━━━━━━━━━━━━━━━\n\n`;
    text += `Product Subtotal: ₹${subtotal}\n`;
    text += `Packing Charges: ₹${packing}\n`;
    if (gst > 0) text += `GST 18%: ₹${gst}\n`;
    text += `\n*GRAND TOTAL: ₹${grandTotal}*\n\n`;
    text += `━━━━━━━━━━━━━━━━━━\n\nThank you for ordering from\n*SIVAKASI CRACKERS*`;

    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
    
    // Show Success Modal
    document.getElementById('successOrderId').innerText = orderId;
    document.getElementById('successTotal').innerText = `₹${grandTotal}`;
    document.getElementById('successWhatsAppBtn').href = waUrl;
    
    document.getElementById('successModal').style.display = 'block';
    
    // Clear Cart
    cart = [];
    saveCart();
    renderProducts();
    updateCartUI();
}

// Boot up
window.onload = init;
