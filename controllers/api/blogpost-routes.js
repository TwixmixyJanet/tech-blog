// IMPORTS
const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

// Post route, with authorization, to base URL
router.post('/', withAuth, async (req, res) => {
    console.log(req.body);
    try {
        // Create new blog post, assign to the person logged in
        const newBlogPost = await BlogPost.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newBlogPost);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// Put (update) blog post per ID, with authorization
router.put('/:id', withAuth, async (req, res) => {
    console.log(req.body);
    try {
        // Update blog post based off ID
        const blogPostData = await BlogPost.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        // If not blog post data, return error
        if (!blogPostData) {
            res.status(404).json({ message: "There is no blog post with that ID" });
            return;
        }
        res.status(200).json(blogPostData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Delete route per ID, with authorization
router.delete('/:id', withAuth, async (req, res) => {
    console.log(req.params.id);
    try {
        // Destroy based off ID
        const blogPostData = await BlogPost.destroy({
            where: {
                id: req.params.id,
            },
        });

        // If not valid, return error
        if (!blogPostData) {
            res.status(404).json({ message: "There is no blog post with that ID" });
            return;
        }
        res.status(200).json(blogPostData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// EXPORT
module.exports = router;