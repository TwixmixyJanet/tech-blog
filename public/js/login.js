// LOGIN function
const loginForm = async (event) => {
    event.preventDefault();
    // DOCUMENT CONNECTIONS
    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
    const error = document.getElementById("login-error");

    // IF email and password are true then fetch user login api, stringifying content
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });

        // IF response is good then redirect to homepage
        if (response.ok) {
            document.location.replace('/');
        } else {
            console.log(response);
            response.json()
            .then(dataErr => {
                error.innerHTML = `<p class="error">${dataErr.message}</p>`;
            }); 
        }
    }
};
// Same for below!
const signupForm = async (event) => {
    event.preventDefault();

    const name = document.querySelector("#name-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
    const error = document.getElementById("signup-error");

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: { "Content-Type": "application/json" },
        });
        console.log(response.json);
        if (response.ok) {
            document.location.replace('/');
        } else {
            response.json()
            .then(dataErr => {
                console.log(dataErr);
                let errorString = dataErr.errors.map(error => 
                    error.message
                    ).join("<br />");
                error.innerHTML = `<p class="error">${errorString}<br />
                Please try again.</p>`;
            });
        }
    }
};

document.querySelector(".login-form").addEventListener("submit", loginForm);
document.querySelector(".signup-form").addEventListener("submit", signupForm);