document.getElementById("registerForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;
    const error = document.getElementById("error");

    if (!name || !email || !password || !confirm) {
        error.textContent = "All fields are required";
        return;
    }

    if (password !== confirm) {
        error.textContent = "Passwords do not match";
        return;
    }

    localStorage.setItem("user", JSON.stringify({ name, email, password }));

    window.location.href = "login.html";
});

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const error = document.getElementById("error");

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            error.textContent = "No registered user found";
            return;
        }

        if (email !== user.email || password !== user.password) {
            error.textContent = "Invalid email or password";
            return;
        }

        localStorage.setItem("isLoggedIn", "true");

        window.location.href = "home.html";
    });
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}
