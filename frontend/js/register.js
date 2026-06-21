const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // 🔥 STOP PAGE RELOAD

    const full_name = document.getElementById("full_name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                full_name,
                email,
                password
            })
        });

        const data = await response.json();

        if (data.success) {
            alert("Registration Successful 🎉");

            // better redirect
            window.location.href = "login.html";
        } else {
            alert(data.message || "Registration Failed");
        }

    } catch (error) {
        console.log(error);
        alert("Server Error");
    }
});