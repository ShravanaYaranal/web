// Product Data Array
const products = [
    {
        id: 1,
        brand: "WROGN",
        name: "Men Slim Fit Casual Shirt",
        image: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: "4.1",
        reviews: "3.2k",
        currentPrice: 989,
        originalPrice: 2199,
        discount: "(55% OFF)"
    },
    {
        id: 2,
        brand: "Puma",
        name: "Men Printed T-shirt",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: "4.3",
        reviews: "12k",
        currentPrice: 649,
        originalPrice: 1299,
        discount: "(50% OFF)"
    },
    {
        id: 3,
        brand: "Roadster",
        name: "Men Skinny Fit Jeans",
        image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: "3.9",
        reviews: "8.1k",
        currentPrice: 899,
        originalPrice: 1999,
        discount: "(55% OFF)"
    },
    {
        id: 4,
        brand: "Nike",
        name: "Men Revolution 6 Running Shoes",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: "4.5",
        reviews: "22k",
        currentPrice: 2995,
        originalPrice: 3695,
        discount: "(19% OFF)"
    },
    {
        id: 5,
        brand: "HRX by Hrithik Roshan",
        name: "Men Solid Track Pants",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: "4.2",
        reviews: "15k",
        currentPrice: 799,
        originalPrice: 1599,
        discount: "(50% OFF)"
    },
    {
        id: 6,
        brand: "Tommy Hilfiger",
        name: "Men Polo Collar T-shirt",
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: "4.4",
        reviews: "5.4k",
        currentPrice: 1999,
        originalPrice: 2999,
        discount: "(33% OFF)"
    },
    {
        id: 7,
        brand: "HIGHLANDER",
        name: "Men Slim Fit Trousers",
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: "3.8",
        reviews: "2.1k",
        currentPrice: 749,
        originalPrice: 1499,
        discount: "(50% OFF)"
    },
    {
        id: 8,
        brand: "Levis",
        name: "Men Denim Jacket",
        image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: "4.6",
        reviews: "9.8k",
        currentPrice: 2799,
        originalPrice: 3999,
        discount: "(30% OFF)"
    }
];

// Shopping Bag State
let bagItemsCount = 0;
const bagCountElement = document.getElementById('bag-count');

// Render Products
const productContainer = document.getElementById('product-container');

function renderProducts() {
    productContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-img">
                <div class="rating-badge">
                    ${product.rating} <i class="fa-solid fa-star"></i>
                    <span class="separator">|</span>
                    ${product.reviews}
                </div>
                
                <div class="product-actions">
                    <button class="add-to-bag-btn" onclick="addToBag(event, ${product.id})">
                        <i class="fa-solid fa-bag-shopping"></i> Add to Bag
                    </button>
                </div>
            </div>
            <div class="product-details">
                <h3 class="brand">${product.brand}</h3>
                <h4 class="product-name">${product.name}</h4>
                <div class="price-container">
                    <span class="current-price">Rs. ${product.currentPrice}</span>
                    <span class="original-price">Rs. ${product.originalPrice}</span>
                    <span class="discount">${product.discount}</span>
                </div>
            </div>
        `;
        
        productContainer.appendChild(productCard);
    });
}

// Add to Bag Function
window.addToBag = function(event, productId) {
    // Prevent the click from triggering navigation if it were a link
    event.stopPropagation();
    
    // Update counter
    bagItemsCount++;
    bagCountElement.innerText = bagItemsCount;
    
    // Show quick animation
    const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    btn.innerHTML = `<i class="fa-solid fa-check"></i> Added`;
    btn.style.backgroundColor = "#ff3f6c";
    btn.style.color = "white";
    btn.style.borderColor = "#ff3f6c";
    
    // Reset button after 1.5s
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.backgroundColor = "";
        btn.style.color = "";
        btn.style.borderColor = "";
    }, 1500);
}

// Initialize Page
renderProducts();
