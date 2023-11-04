const deletePost = async(event) => {
    event.preventDefault();
    console.log("delete post clicked");
    console.log(event.target);

    let blogPostId = event.target.getAttribute("data-id");
    console.log('blogpostID', blogPostId);

    const response = await fetch(`/api/blogPost/${blogPostId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        document.location.assign(`/dashboard`);
    } else {
        alert(response.statusText);
    }
};

const editBlogPost = async (event) => {
    event.preventDefault();
    console.log("edit post clicked");

    let blogPostId = event.target.getAttribute("data-id");

    document.location.assign(`/create/${blogPostId}`);
};

const editButton = document.querySelectorAll("#editBtn");

for (let i = 0; i < editButton.length; i++) {
    editButton[i].addEventListener("click", editBlogPost);
}

const deleteButton = document.querySelectorAll("#deleteBtn");

for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", deletePost);
}