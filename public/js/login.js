const loginForm = async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(`${response.statusText}
            
            Login does not match internal system records. Please try again.
            `);
        }
    }
};

const signupForm = async (event) => {
    event.preventDefault();

    const name = document.querySelector("#name-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(`${response.statusText}
            
            Information does not meet criteria. Please try again.
            `);
        }
    }
};

document.querySelector(".login-form").addEventListener("submit", loginForm);
document.querySelector(".signup-form").addEventListener("submit", signupForm);