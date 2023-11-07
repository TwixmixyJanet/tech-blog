// Function for logout, basically same as login, ultimately redirect to homepage
const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(`${response.statusText}
            
            Logout process did not meet criteria. Please try again.
            `);
    }
};

// Click the logout button
document.querySelector("#logout").addEventListener("click", logout);