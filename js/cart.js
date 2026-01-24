if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}

const cartContainer = document.getElementById("cartItems");
const totalSpan = document.getElementById("totalPrice");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty</p>";
        totalSpan.textContent = 0;
        return;
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartContainer.innerHTML += `
            <div class="card mb-3 p-3">
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <img src="${item.image}" class="img-fluid product-img">
                    </div>

                    <div class="col-md-3">
                        <h6>${item.title}</h6>
                        <p>${item.price} EGP</p>
                    </div>

                    <div class="col-md-3 d-flex gap-2 align-items-center">
                        <button class="btn btn-outline-secondary"
                            onclick="decrease(${index})">-</button>

                        <span>${item.quantity}</span>

                        <button class="btn btn-outline-secondary"
                            onclick="increase(${index})">+</button>
                    </div>

                    <div class="col-md-2">
                        ${item.price * item.quantity} EGP
                    </div>

                    <div class="col-md-2">
                        <button class="btn btn-danger"
                            onclick="removeItem(${index})">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    totalSpan.textContent = total;
}

function increase(index) {
    cart[index].quantity++;
    updateCart();
}

function decrease(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }
    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function checkout() {
    localStorage.removeItem("cart");
    window.location.href = "shipped.html";
}


displayCart();
