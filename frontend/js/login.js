const form =
document.getElementById("loginForm");

form.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const email =
        document.getElementById(
            "email"
        ).value;

        const password =
        document.getElementById(
            "password"
        ).value;

        try {

            const response =
            await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },

                    body:JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data =
            await response.json();

            if(data.success){

                localStorage.setItem(
                    "token",
                    data.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        data.user
                    )
                );

                alert(
                    "Login Successful"
                );

                if(
                    data.user.role ===
                    "admin"
                ){

                    window.location.href =
                    "admin-dashboard.html";

                }else{

                    window.location.href =
                    "volunteer-dashboard.html";

                }

            }else{

                alert(
                    data.message
                );
            }

        } catch(error){

            console.log(error);

            alert(
                "Server Error"
            );
        }
    }
);