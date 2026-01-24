if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}

const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentIndex = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
}

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
});

setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}, 3000);


const container = document.getElementById("products");

let allProducts = [];

async function getProducts() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const products = await response.json();

        allProducts = products.map(p => ({
            ...p,
            size: ["S", "M", "L"][Math.floor(Math.random() * 3)]
        }));

        displayProducts(allProducts);
        localStorage.setItem("products", JSON.stringify(allProducts));

    } catch (error) {
        console.log("Error fetching products", error);
    }
}

function displayProducts(products) {
    container.innerHTML = "";

    products.forEach(product => {
        container.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card h-100 p-3">

                    <a href="productDetails.html?id=${product.id}"
                       class="text-decoration-none text-dark">

                        <img src="${product.image}"
                             class="card-img-top product-img">

                        <h6 class="mt-2">${product.title}</h6>
                    </a>

                    <p>${product.price} EGP</p>
                    <p>Size: ${product.size}</p>

                    <button class="btn btn-primary w-100"
                        onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    });
}


function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = allProducts.find(p => p.id === id);

    const index = cart.findIndex(item => item.id === id);

    if (index !== -1) {
        cart[index].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}


function sortByPrice() {
    const sorted = [...allProducts].sort((a, b) => a.price - b.price);
    displayProducts(sorted);
}


function filterBySize(size) {
    const filtered = allProducts.filter(p => p.size === size);
    displayProducts(filtered);
}


function filterByCategory(category) {
    const filtered = allProducts.filter(p => p.category === category);
    displayProducts(filtered);
}

function showAll() {
    displayProducts(allProducts);
}

if (container) {
    getProducts();
}
