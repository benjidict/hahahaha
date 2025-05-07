document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav ul");
    const dropdownBtn = document.querySelector(".dropdown-btn");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const authLink = document.getElementById("authLink");
    const cartIcon = document.getElementById("cart-icon");
    const searchResultsContainer = document.getElementById("searchResultsContainer");

    // Dummy data for products, including imageUrl for each product
    const products = [
        { name: "Toner", description: "A refreshing toner to hydrate your skin", price: "₱100", imageUrl: "images/toner.jpg" },
        { name: "Moisturizer", description: "A moisturizer that leaves your skin soft and smooth", price: "₱150", imageUrl: "images/moisturizer.jpg" },
        { name: "Serum", description: "A skin serum with nourishing ingredients", price: "₱200", imageUrl: "images/serum.jpg" },
        { name: "Face Oil", description: "A soothing face oil for all skin types", price: "₱250", imageUrl: "images/face-oil.jpg" }
    ];

    // Toggle Mobile Menu
    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            nav.classList.toggle("show");
        });
    }

    // Toggle Dropdown Menu on Click
    if (dropdownBtn && dropdownMenu) {
        dropdownBtn.addEventListener("click", (event) => {
            event.preventDefault();
            dropdownMenu.classList.toggle("show-dropdown");
        });

        // Close Dropdown when Clicking Outside
        document.addEventListener("click", (event) => {
            if (!dropdownBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.remove("show-dropdown");
            }
        });
    }

    // Search Functionality with Debounce
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");

    // Debounce function to limit how often the search runs
    let debounceTimeout;
    if (searchButton && searchInput) {
        searchInput.addEventListener("input", () => {
            clearTimeout(debounceTimeout); // Clear previous timeout
            debounceTimeout = setTimeout(() => {
                const searchTerm = searchInput.value.trim();
                if (searchTerm === "") {
                    displaySearchResults(products); // Display all products if the search is empty
                } else {
                    const searchResults = products.filter(product => 
                        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.description.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                    displaySearchResults(searchResults);
                }
            }, 300); // Wait for 300ms after the user stops typing
        });
    }

    function displaySearchResults(results) {
        // Clear previous results
        if (searchResultsContainer) {
            searchResultsContainer.innerHTML = "";

            if (results.length > 0) {
                results.forEach(product => {
                    const resultItem = document.createElement("div");
                    resultItem.classList.add("search-result");

                    // Highlight search term in the name and description
                    const regex = new RegExp(`(${searchInput.value.trim()})`, "gi");
                    const highlightedName = product.name.replace(regex, "<span class='highlight'>$1</span>");
                    const highlightedDescription = product.description.replace(regex, "<span class='highlight'>$1</span>");

                    // Create the product's image element
                    const image = document.createElement("img");
                    image.src = product.imageUrl;  // Assuming the image is hosted locally
                    image.alt = product.name;
                    image.classList.add("product-image");

                    // Add product details to the result item
                    resultItem.innerHTML = `
                        <div class="product-info">
                            <h3>${highlightedName}</h3>
                            <p>${highlightedDescription}</p>
                            <p><strong>${product.price}</strong></p>
                        </div>
                    `;

                    // Append the image and info to the result item
                    resultItem.prepend(image);

                    searchResultsContainer.appendChild(resultItem);
                });
            } else {
                searchResultsContainer.innerHTML = "<p>No results found.</p>";
            }
        }
    }

    // Cart Restriction for Guests
    if (cartIcon) {
        cartIcon.addEventListener("click", (event) => {
            if (!localStorage.getItem("loggedIn")) {
                event.preventDefault();
                alert("You must log in to add items to your cart!");
                window.location.href = "login.html"; // Redirect to login if not logged in
            }
        });
    }

    // Handle Login/Logout Button
    function updateAuthStatus() {
        if (localStorage.getItem("loggedIn")) {
            authLink.textContent = "LOG OUT";
            authLink.href = "#";  // Set to "#" to prevent default action (we handle log out in JS)
        } else {
            authLink.textContent = "LOG IN";
            authLink.href = "login.html";
        }
    }

    if (authLink) {
        authLink.addEventListener("click", (event) => {
            if (localStorage.getItem("loggedIn")) {
                event.preventDefault();
                if (confirm("Are you sure you want to log out?")) {
                    localStorage.removeItem("loggedIn");
                    window.location.href = "index.html";  // Redirect to index after logout
                }
            }
        });
    }

    // Initialize Authentication Status on Page Load
    updateAuthStatus();

    // Redirect to guess.html if logged in on index page
    if (window.location.pathname === "/index.html" && localStorage.getItem("loggedIn")) {
        window.location.href = "guess.html"; // Redirect to guess.html if logged in
    }
});
