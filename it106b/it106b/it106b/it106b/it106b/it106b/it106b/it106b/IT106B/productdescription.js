// productDescriptions.js

const productDescriptions = {
    Toner: {
        description: "A gentle toner that helps balance the skin's pH, tightening pores and refreshing the skin. Ideal for all skin types.",
        ingredients: "Water, Witch Hazel, Glycerin, Aloe Vera, Fragrance.",
        benefits: "Tightens pores, Refreshes skin, Balances pH."
    },
    Moisturizer: {
        description: "A hydrating moisturizer that deeply nourishes and softens the skin, leaving it smooth and glowing.",
        ingredients: "Water, Hyaluronic Acid, Glycerin, Shea Butter, Vitamin E.",
        benefits: "Hydrates skin, Softens texture, Improves elasticity."
    }
};

// Function to display product descriptions
function showProductDescription(productName) {
    const description = productDescriptions[productName];

    if (description) {
        const descriptionContainer = document.getElementById("product-description-container");

        descriptionContainer.innerHTML = `
            <h2>${productName}</h2>
            <p><strong>Description:</strong> ${description.description}</p>
            <p><strong>Ingredients:</strong> ${description.ingredients}</p>
            <p><strong>Benefits:</strong> ${description.benefits}</p>
        `;
    }
}