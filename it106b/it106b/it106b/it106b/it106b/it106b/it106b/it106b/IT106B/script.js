document.addEventListener("DOMContentLoaded", () => {
    // Redirect to guest page if not logged in
    if (!localStorage.getItem('loggedIn')) {
        window.location.href = "guest.html";
    }

    // Logout functionality
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (event) => {
            event.preventDefault();
            if (confirm("Are you sure you want to log out?")) {
                localStorage.removeItem('loggedIn');
                window.location.href = "guest.html";
            }
        });
    }

    // Cart Counter (Persistent)
    let cartCount = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;
    document.getElementById('cart-count').textContent = cartCount;

    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', (event) => {
            event.preventDefault();
            cartCount++;
            document.getElementById('cart-count').textContent = cartCount;
            localStorage.setItem('cartCount', cartCount);
        });
    }
});