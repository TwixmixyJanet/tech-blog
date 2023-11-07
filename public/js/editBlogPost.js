// Same comments as in editPostSubmit

let blogPost = window.location.pathname.split('/');

const editPost = async (event) => {
    event.preventDefault();
    console.log("edit post clicked");

    const comment_body = document.getElementById("editBtn").value.trim();

    console.log(blogPost);

    document.location.assign(`/create/${blogPost[2]}`);
};

const editButton = document.querySelectorAll("#editBtn");

// Generate an edit button for each post
for (let i = 0; i < editButton.length; i++) {
    editButton[i].addEventListener("click", editPost);
}