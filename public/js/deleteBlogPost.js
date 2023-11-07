// Same comments as in editPostSubmit

const deletePost = async (event) => {
    event.preventDefault();
    console.log("clicked delete post");
    console.log(event.target);

    let blogPost = window.location.pathname.split('/');
    console.log(blogPost);

    const response = await fetch(`/api/blogPost/${blogPost[2]}`, {
        method: "DELETE",
    });

    if (response.ok) {
        document.location.assign('/dashboard');
    } else {
        alert(`${response.statusText}
            
            For some reason this post cannot be deleted. Please try again.
            `);
    }
};

const deleteButton = document.querySelectorAll("#deleteBtn");

// Generate a delete button for each post
for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", deletePost);
}