async function newPost(event) {
    event.preventDefault(); 

    const title = document.querySelector("#titleInput").value.trim();
    const description = document.querySelector("#bodyInput").value.trim();
    const error = document.querySelector("#error")

    if (title && description) {
        const response = await fetch(`/api/blogPost`, {
            method: "POST",
            body: JSON.stringify({
                title,
                description,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(`${response.statusText}
            
            Blog post did not meet necessary criteria. Please fill out all fields appropriately.
            `);
            error.innerHTML = `${response.statusText}
            
            Blog post did not meet necessary criteria. Please fill out all fields appropriately.
            `;
        }
    }
}

document.querySelector(".createBlogPost").addEventListener("submit", newPost);