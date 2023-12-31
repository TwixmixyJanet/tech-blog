// Function to add new comment
async function newComment(event) {
    event.preventDefault();
    console.log("new comment clicked");

    // Document selectors
    const comment_body = document.getElementById("comment").value.trim();
    const url = window.location.toString().split('/');
    const blogPost_id = url[url.length - 1];
    const error = document.getElementById("comment-error");

    // IF comment body meets criteria then it will post
    if (comment_body) {
        const response = await fetch('/api/comment', {
            method: "POST",
            body: JSON.stringify({
                blogPost_id,
                comment_body,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        // IF it is good, then page reloads
        if (response.ok) {
            document.location.reload();
        } else {
            // Otherwise send error
            // Pulled error message from Model
            response.json()
            .then(dataErr => {
                error.innerHTML = `<p class="error">${dataErr.errors[0].message}</p>`;
            }); 
        }
    }
}

// Submit event action
document.getElementById("comment-form").addEventListener("submit", newComment);