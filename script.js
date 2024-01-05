// Get the featured products section
const featuredProductsSection = document.getElementById('featured-products');
const navigationLinks = document.querySelectorAll('nav a');
const addToCartButtons = document.querySelectorAll('.product-card button');
const shoppingCartSection = document.getElementById('shopping-cart');
const checkoutButton = document.getElementById('checkout-btn');

// Load existing cart items from local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart display
function updateCartDisplay() {
    const shoppingCartSection = document.getElementById('shopping-cart');
    shoppingCartSection.innerHTML = `
        <h2>Shopping Cart</h2>
        <button id="home-btn" onclick="goHome()">Home</button>
        <ul>
            ${cart.map(item => `
                <li>
                    <span>${item.name} - $${item.price.toFixed(2)}</span>
                    <button class="remove-from-cart-btn" data-product="${item.name}">Remove</button>
                </li>`).join('')}
        </ul>
        <p>Total: $${calculateTotalAmount().toFixed(2)}</p>
    `;

    // Add event listeners to the "Remove" buttons
    const removeButtons = document.querySelectorAll('.remove-from-cart-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.getAttribute('data-product');
            removeFromCart(productName);
        });
    });
}

    // Add event listeners to the "Remove" buttons
    const removeButtons = document.querySelectorAll('.remove-from-cart-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.getAttribute('data-product');
            removeFromCart(productName);
        });
    });
}

// Function to add an item to the cart
function addToCart(name, price) {
    // Check if the item is already in the cart
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        // If it's already in the cart, update the quantity
        existingItem.quantity++;
    } else {
        // If it's not in the cart, add a new item
        cart.push({ name, price, quantity: 1 });
    }

    // Save the updated cart data back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the displayed cart contents
    updateCartDisplay();
}

// Function to remove an item from the cart
function removeFromCart(name) {
    // Find the index of the item in the cart
    const index = cart.findIndex(item => item.name === name);

    if (index !== -1) {
        // Remove the item from the cart
        cart.splice(index, 1);

        // Save the updated cart data back to local storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update the displayed cart contents
        updateCartDisplay();
    }
}

// Calculate the total amount of the items in the cart
function calculateTotalAmount() {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
}

// Function to go back to the home page
function goHome() {
    // Use fetch or other techniques to load the content of the home page dynamically
    // Update the content of the current page based on the fetched data
    alert('Navigating to Home');
}

// Event listener for "Add to Cart" buttons
addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const productCard = event.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseFloat(productCard.querySelector('p').textContent.replace('$', ''));

        addToCart(productName, productPrice);
    });
});

// Event listener for checkout button
checkoutButton.addEventListener('click', () => {
    // Simulate the checkout process (in a real application, you'd redirect to a checkout page)
    alert('Proceeding to Checkout');
});

// Event listener for "Remove from Cart" buttons

// Add a click event listener to the featured products section
featuredProductsSection.addEventListener('click', (event) => {
    // Check if the clicked element is an "Add to Cart" button
    if (event.target.tagName === 'BUTTON') {
        // Get the product details from the clicked product card
        const productCard = event.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseFloat(productCard.querySelector('p').textContent.replace('$', ''));

        addToCart(productName, productPrice);
    }
});

// Update the displayed cart contents on page load
updateCartDisplay();
