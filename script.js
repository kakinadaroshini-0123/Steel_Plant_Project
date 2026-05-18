const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    // ================= GET VALUES =================

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    console.log(username);
    console.log(password);

    // ================= VALIDATION =================

    const usernamePattern = /^[0-9]{6}$/;

    if (!usernamePattern.test(username)) {

        alert(
            "User ID must contain exactly 6 digits"
        );

        return;
    }

    // ================= FETCH API =================

    try {

        const response = await fetch(
            "http://localhost:3000/login",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: username,
                    password: password
                })

            }
        );

        // ================= RESPONSE =================

        const data = await response.json();

        console.log(data);

        if (data.success) {

            alert("✅ Login Successful");

        }

        else {

            alert("❌ " + data.message);

        }

    }

    catch (error) {

        console.log(error);

        alert("⚠ Server Error");

    }

});

// ================= SHOW / HIDE PASSWORD =================

const passwordInput =
    document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.innerHTML =
            '<i class="fa-solid fa-eye-slash"></i>';

    }

    else {

        passwordInput.type = "password";

        togglePassword.innerHTML =
            '<i class="fa-solid fa-eye"></i>';

    }

});