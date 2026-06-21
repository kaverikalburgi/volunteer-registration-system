const token =
localStorage.getItem("token");

if (!token) {

    window.location.href =
    "login.html";
}

const form =
document.getElementById(
    "volunteerForm"
);

form.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const phone =
        document.getElementById(
            "phone"
        ).value;

        const address =
        document.getElementById(
            "address"
        ).value;

        const skills =
        document.getElementById(
            "skills"
        ).value;

        const availability =
        document.getElementById(
            "availability"
        ).value;

        const motivation =
        document.getElementById(
            "motivation"
        ).value;

        try {

            const response =
            await fetch(
                "http://localhost:5000/api/volunteer/create",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json",

                        "Authorization":
                        `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        phone,
                        address,
                        skills,
                        availability,
                        motivation
                    })
                }
            );

            const data =
            await response.json();

            if (data.success) {

                alert(
                    "Volunteer Profile Submitted Successfully"
                );

                form.reset();

            } else {

                alert(
                    data.message
                );
            }

        } catch (error) {

            console.log(error);

            alert(
                "Server Error"
            );
        }

    }
);

function logout() {

    localStorage.removeItem(
        "token"
    );

    localStorage.removeItem(
        "user"
    );

    window.location.href =
    "login.html";
}