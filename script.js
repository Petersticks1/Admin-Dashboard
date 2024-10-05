const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

allSideMenu.forEach((item) => {
    const li = item.parentElement;
    item.addEventListener("click", function () {
        allSideMenu.forEach((i) => {
            i.parentElement.classList.remove("active");
        });
        li.classList.add("active");
    });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
    sidebar.classList.toggle("hide");
});

const searchButton = document.querySelector("#content nav form .form-input button");
const searchButtonIcon = document.querySelector("#content nav form .form-input button .bx");
const searchForm = document.querySelector(" #content nav form");

searchButton.addEventListener("click", function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle("show");
        if (searchForm.classList.contains("show")) {
            searchButtonIcon.classList.replace("bx-search", "bx-x");
        } else {
            searchButtonIcon.classList.replace("bx-x", "bx-search");
        }
    }
});

if (window.innerWidth < 768) {
    sidebar.classList.add("hide");
} else if (window.innerWidth > 576) {
    searchButtonIcon.classList.replace("bx-search", "bx-x");
    searchForm.classList.remove("show");
}

window.addEventListener("resize", function () {
    if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace("bx-x", "bx-search");
        searchForm.classList.remove("show");
    }
});

// To get the current URL path
const currentPath = window.location.pathname;

// Loop through the menu items to find which one matches the current path
allSideMenu.forEach((item) => {
    const li = item.parentElement;
    const href = item.getAttribute("href");

    // If the current URL matches the href of the menu item, mark it as active
    if (currentPath.includes(href)) {
        li.classList.add("active");
    } else {
        li.classList.remove("active");
    }
});

//My store//
// Fetch and display products from Fake Store API
async function fetchProducts() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        const productList = document.getElementById("product-list");

        data.forEach((product) => {
            const productCard = document.createElement("div");
            productCard.className = "product-card";

            // Product Image
            const productImage = document.createElement("img");
            productImage.src = product.image;
            productImage.alt = product.title;
            productCard.appendChild(productImage);

            // Product Title
            const productTitle = document.createElement("h2");
            productTitle.textContent = product.title;
            productCard.appendChild(productTitle);

            // Product Price
            const productPrice = document.createElement("p");
            productPrice.className = "product-price";
            productPrice.textContent = `$${product.price}`;
            productCard.appendChild(productPrice);

            //product Description
            const productDescription = document.createElement("p");
            productDescription.className = "product-description";
            productDescription.textContent = product.description;
            productCard.appendChild(productDescription);

            //product Ratings
            const productRatings = document.createElement("p");
            productRatings.className = "product-ratings";
            productRatings.textContent = `Rating: ${product.rating.rate} / 5`;
            productCard.appendChild(productRatings);

            // Append the product card to the product list
            productList.appendChild(productCard);
        });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Call the function to fetch and display products
fetchProducts();
