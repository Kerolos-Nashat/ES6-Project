if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}
const container = document.getElementById("productDetails");
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

let currentProduct = null;

async function getProduct() {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await response.json();

        currentProduct = product;
        displayProduct(product);
    } catch (error) {
        console.log("Error loading product", error);
    }
}

function displayProduct(product) {
    container.innerHTML = `
        <div class="col-md-6">
            <img src="${product.image}" class="img-fluid product-img">
        </div>

        <div class="col-md-6">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <h4>${product.price} EGP</h4>

            <button class="btn btn-success"
                onclick="addToCart()">
                Add to Cart
            </button>
        </div>
    `;
}

function addToCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(item => item.id === currentProduct.id);

    if (index !== -1) {
        cart[index].quantity += 1;
    } else {
        currentProduct.quantity = 1;
        cart.push(currentProduct);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

getProduct();
