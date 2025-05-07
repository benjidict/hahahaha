document.addEventListener("DOMContentLoaded", function () {
    // Function to update the cart item count
    function updateCartItemCount() {
        try {
            const cartData = getCartData();
            const totalItems = cartData.reduce((acc, item) => acc + item.quantity, 0);
            const cartItemCount = document.getElementById('cart-item-count');
            if (cartItemCount) {
                cartItemCount.textContent = totalItems;
            }
        } catch (error) {
            console.error("Error updating cart item count:", error);
        }
    }

    // Function to get cart data from localStorage
    function getCartData() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    // Function to render cart items in the UI
    function renderCartItems() {
        try {
            // Check if the user has already placed an order
            if (localStorage.getItem('orderPlaced') === 'true') {
                // If order is placed, display a message and don't show the cart items
                const cartContainer = document.getElementById('cart-items-container');
                cartContainer.innerHTML = '<p>Your order has been placed. Thank you for shopping with us!</p>';
                return; // Stop further processing
            }

            const cartData = getCartData();
            const cartContainer = document.getElementById('cart-items-container');
            cartContainer.innerHTML = ''; // Clear any existing items

            let totalAmount = 0;
            cartData.forEach(item => {
                totalAmount += parseFloat(item.price) * item.quantity;
                cartContainer.appendChild(createCartItemElement(item));
            });

            // Update total amount
            const totalAmountElement = document.getElementById('total-amount');
            if (totalAmountElement) {
                totalAmountElement.textContent = `₱${totalAmount.toFixed(2)}`;
            }

            updateCartItemCount();
        } catch (error) {
            console.error("Error rendering cart items:", error);
        }
    }

    // Helper function to create the cart item element
    function createCartItemElement(item) {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h3>${item.name}</h3>
                <p>₱${item.price}</p>
                <button class="remove-item" data-item-name="${item.name}">Remove</button>
            </div>
        `;
        return cartItemDiv;
    }

    // Function to handle item removal from cart
    function removeItem(itemName) {
        try {
            let cartData = getCartData();
            cartData = cartData.filter(item => item.name !== itemName);
            localStorage.setItem('cart', JSON.stringify(cartData));
            renderCartItems();
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    }

    // Function to clear the cart
    function clearCart() {
        try {
            localStorage.removeItem('cart');
            renderCartItems();
        } catch (error) {
            console.error("Error clearing the cart:", error);
        }
    }

    // Function to handle shipping selection
    function handleShippingSelection() {
        const modal = createShippingModal();
        document.body.appendChild(modal);
        modal.querySelector('#cancel-shipping').addEventListener('click', closeShippingModal.bind(null, modal));
        modal.querySelector('#confirm-shipping').addEventListener('click', confirmShippingSelection.bind(null, modal));
    }

    // Helper function to create the shipping modal
    function createShippingModal() {
        const modal = document.createElement('div');
        modal.classList.add('shipping-modal');
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Choose Shipping Method</h3>
                <ul>
                    <li><input type="radio" name="shipping" value="standard"> Standard Shipping (3-5 days)</li>
                    <li><input type="radio" name="shipping" value="express"> Express Shipping (1-2 days)</li>
                    <li><input type="radio" name="shipping" value="overnight"> Overnight Shipping</li>
                </ul>
                <button id="confirm-shipping">Confirm Shipping</button>
                <button id="cancel-shipping">Cancel</button>
            </div>
        `;
        return modal;
    }

    // Function to close the shipping modal
    function closeShippingModal(modal) {
        document.body.removeChild(modal);
    }

    // Function to confirm shipping method selection and proceed
    function confirmShippingSelection(modal) {
        const selectedShipping = document.querySelector('input[name="shipping"]:checked');
        if (selectedShipping) {
            localStorage.setItem('shippingMethod', selectedShipping.value);
            closeShippingModal(modal);
            window.location.href = "checkout.html"; // Redirect to confirmation page
        } else {
            alert("Please select a shipping method.");
        }
    }

    // Function to handle user feedback submission
    function handleFeedbackSubmission() {
        const feedbackText = document.getElementById('feedback-text').value;
        const feedbackMessage = document.getElementById('feedback-message');

        if (feedbackText.trim()) {
            localStorage.setItem('userFeedback', feedbackText); // Save feedback in localStorage
            feedbackMessage.textContent = "Thank you for your feedback!";
            document.getElementById('feedback-text').value = ''; // Clear the textarea
        } else {
            feedbackMessage.textContent = "Please enter some feedback before submitting.";
        }
    }

    // Event listener for removing cart items
    document.getElementById('cart-items-container').addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-item')) {
            const itemName = event.target.dataset.itemName;
            removeItem(itemName);
        }
    });

    // Event listener for clearing the cart
    document.getElementById('clear-cart').addEventListener('click', clearCart);

    // Event listener for proceeding to order page
    document.getElementById("proceed-to-order").addEventListener("click", function () {
        localStorage.setItem('orderPlaced', 'true'); // Mark the order as placed
        window.location.href = "checkout.html"; // Redirect to checkout page
    });

    // Event listener for choosing shipping method
    document.getElementById('choose-shipping').addEventListener("click", handleShippingSelection);

    // Feedback functionality
    const submitFeedbackButton = document.getElementById('submit-feedback');
    if (submitFeedbackButton) {
        submitFeedbackButton.addEventListener('click', handleFeedbackSubmission);
    }

    // Render the cart items when the page loads
    renderCartItems();
});
