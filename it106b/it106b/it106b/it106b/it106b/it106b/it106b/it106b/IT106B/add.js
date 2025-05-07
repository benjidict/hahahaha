document.addEventListener("DOMContentLoaded", function () {
    const addProductForm = document.getElementById("addProductForm");

    // Handle form submission to add a new product
    addProductForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent page reload

        // Get input values
        const name = document.getElementById("productName").value;
        const price = parseFloat(document.getElementById("productPrice").value);
        const description = document.getElementById("productDescription").value;
        const image = document.getElementById("productImage").value;
        const rating = parseInt(document.getElementById("productRating").value);

        // Validate the input (Basic validation)
        if (!name || !price || !description || !image || !rating) {
            alert("Please fill out all fields.");
            return;
        }

        // Retrieve current products from localStorage
        const products = JSON.parse(localStorage.getItem("products")) || [];

        // Add the new product to the products array
        products.push({ name, price, description, image, rating });

        // Save updated products back to localStorage
        localStorage.setItem("products", JSON.stringify(products));

        // Clear the form inputs
        addProductForm.reset();

        // Optionally, regenerate the product cards on the page
        // You could either trigger a reload of the page or update product list manually
        alert("Product added successfully!");

        // You can trigger an update of the products list in `product.js` after adding
        const event = new Event('productsUpdated');
        window.dispatchEvent(event);
    });
});