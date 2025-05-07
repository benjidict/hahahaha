document.addEventListener("DOMContentLoaded", function () {

    // Function to render cart items from localStorage
    function renderCartItems() {
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        const checkoutContainer = document.getElementById('checkout-items-container');
        checkoutContainer.innerHTML = ''; // Clear any existing items

        let totalAmount = 0;

        cartData.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');

            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h3>${item.name}</h3>
                    <p>₱${item.price} x ${item.quantity}</p>
                </div>
            `;
            checkoutContainer.appendChild(cartItemDiv);

            totalAmount += parseFloat(item.price) * item.quantity;
        });

        // Update total
        const totalAmountElement = document.getElementById('total-amount');
        if (totalAmountElement) {
            totalAmountElement.textContent = "₱" + totalAmount.toFixed(2); // Adding currency formatting
        } else {
            console.error('Total amount element not found!');
        }
    }

    // Render the cart items when the page loads
    renderCartItems();

    // Handle the form submission for placing the order
    const placeOrderButton = document.getElementById('place-order');
    if (placeOrderButton) {
        placeOrderButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent form submission for now
            
            // Collect shipping info
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const address = document.getElementById('address').value;
            const city = document.getElementById('city').value;
            const postalCode = document.getElementById('postal-code').value;

            if (name && email && address && city && postalCode) {
                // Here you would typically send the order data to the server for processing
                alert("Thank you for your order! We'll ship to: " + name);

                // Optionally, clear the cart after order
                localStorage.removeItem('cart');
                
                // Redirect to a confirmation page or back to home
                window.location.href = "cart.html"; // Redirect to a confirmation page
            } else {
                alert("Please fill in all the shipping details.");
            }
        });
    } else {
        console.error('Place order button not found!');
    }
});
