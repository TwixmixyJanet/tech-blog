// Splits the current URL mathname into an array of strings
let blogPost = window.location.pathname.split('/');

// Function to handle the submission of edits to a blog post
const submitEdit = async (event) => {
    event.preventDefault();
    const title = document.getElementById("titleInput").value;
    const description = document.getElementById("bodyInput").value;

    // IF title and description are true then post
    if (title && description) {
        // Using the split blogpost array of strings
        // http://localhost:3001/blogPost/1
        const response = await fetch(`/api/blogPost/${blogPost[2]}`, {
            method: "PUT",
            body: JSON.stringify({
                title,
                description,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        // IF ok then redirect to dashboard
        if (response.ok) {
            document.location.assign('/dashboard');
        } else {
            alert(`${response.statusText}
            
            Blog post did not meet necessary criteria. Please fill out all fields appropriately.
            `);
        }
    }
};

// Submit button document selector and event listester
const submitButton = document.getElementById("submitEdit");
submitButton.addEventListener("submit", submitEdit);